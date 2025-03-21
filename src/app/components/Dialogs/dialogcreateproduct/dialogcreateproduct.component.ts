import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TuiButton, TuiDataList, TuiDropdown, TuiError, TuiTextfield } from '@taiga-ui/core';
import { TuiInputModule, TuiTextareaModule, } from '@taiga-ui/legacy';

import { Categoria } from '@/app/models/categoria.models';
import { createProductoAction } from '@/app/state/actions/producto.actions';
import { AppState } from '@/app/state/app.state';
import { selectCategoriaState } from '@/app/state/selectors/categoria.selectors';
import { TuiDataListWrapper, TuiTabs } from '@taiga-ui/kit';
import { TuiComboBoxModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';


@Component({
  selector: 'app-dialogcreateproduct',
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
  templateUrl: './dialogcreateproduct.component.html',
  styleUrl: './dialogcreateproduct.component.scss'
})
export class DialogcreateproductComponent {

  productoForm: FormGroup;
  categorias: Categoria[] = [];
  marcas = ['Genérico', 'Samsung', 'Apple', 'Xiaomi', 'Huawei'];
  modelos = ['Genérico', 'Modelo A', 'Modelo B', 'Modelo C'];


  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
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
      this.store.dispatch(createProductoAction({
        producto: {
          ...nuevoProducto,
          categoria_nombre: this.getCategoriaNombre(nuevoProducto.categoria),
        }
      }));
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
