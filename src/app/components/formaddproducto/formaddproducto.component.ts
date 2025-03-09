import { Categoria } from '@/app/models/categoria.models';
import { createProductoAction } from '@/app/state/actions/producto.actions';
import { AppState } from '@/app/state/app.state';
import { selectCategoriaState } from '@/app/state/selectors/categoria.selectors';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TuiButton, TuiDataList, TuiDropdown, TuiError, TuiTextfield } from '@taiga-ui/core';

import { TuiDataListWrapper, TuiTabs } from '@taiga-ui/kit';
import { TuiComboBoxModule, TuiInputModule, TuiSelectModule, TuiTextareaModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';


@Component({
  selector: 'app-formaddproducto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextareaModule,
    TuiError,
    TuiButton,
    TuiDataListWrapper,
    TuiDataList,
    TuiTextfield,
    FormsModule, TuiComboBoxModule,
    TuiSelectModule, TuiTabs, TuiTextfieldControllerModule, TuiDropdown
  ],
  templateUrl: './formaddproducto.component.html',
  styleUrl: './formaddproducto.component.scss'
})
export class FormaddproductoComponent {
  productoForm: FormGroup;
  categorias: Categoria[] = [];
  marcas = ['Genérico', 'Samsung', 'Apple', 'Xiaomi', 'Huawei'];
  modelos = ['Genérico', 'Modelo A', 'Modelo B', 'Modelo C'];
  tabs = ['Cargadores', 'Cables USB', 'Protectores de pantalla', 'Audífonos', 'Carcasas'];

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [
        null,
        [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)], // Solo decimales positivos
      ],
      sku: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]], // Exactamente 4 dígitos
      marca: ['Genérico', Validators.required], // Valor por defecto
      modelo: ['Genérico', Validators.required], // Valor por defecto
      categoria: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.store.select(selectCategoriaState).subscribe((state) => {
      this.categorias = state.categorias;
      console.log(state)
    });
  }

  onSubmit() {
    if (this.productoForm.valid) {
      const nuevoProducto = this.productoForm.value;
      this.store.dispatch(createProductoAction({ producto: nuevoProducto }));
    }
  }

  getCategoriaNombre = (id: number): string => {
    const categoria = this.categorias.find((c) => c.id === id);
    return categoria ? categoria.nombre : '';
  };
  validateNumberInput(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    const charStr = String.fromCharCode(charCode);

    // Permitir solo números y el punto (.)
    if (!charStr.match(/[\d.]/) || (charStr === '.' && (event.target as HTMLInputElement).value.includes('.'))) {
      event.preventDefault();
    }
  }
  protected activeItemIndex = 0;

}
