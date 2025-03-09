import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiDataList, TuiDropdown, TuiError, TuiTextfield } from '@taiga-ui/core';
import { TuiInputModule, TuiTextareaModule, } from '@taiga-ui/legacy';

import { TuiDataListWrapper, TuiTabs } from '@taiga-ui/kit';
import { TuiComboBoxModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';


import { Producto, ProductoState } from '@/app/models/producto.models';
import { TiendaState } from '@/app/models/tienda.models';
import { createInventario, loadInventarios } from '@/app/state/actions/inventario.actions';
import { loadProductosAction } from '@/app/state/actions/producto.actions';
import { loadProveedores } from '@/app/state/actions/proveedor.actions';
import { AppState } from '@/app/state/app.state';
import { ProveedorState } from '@/app/state/reducers/proveedor.reducer';
import { selectProductoState } from '@/app/state/selectors/producto.selectors';
import { selectProveedorState } from '@/app/state/selectors/proveedor.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiAppearance } from '@taiga-ui/core';
import { TuiDataListWrapperComponent, TuiInputNumber } from '@taiga-ui/kit';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-dialogcreateinventario',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextareaModule,
    TuiError,
    TuiButton,
    TuiDataListWrapper,
    TuiDataList,
    TuiTextfield,
    FormsModule, TuiComboBoxModule,
    TuiSelectModule, TuiTabs, TuiTextfieldControllerModule, TuiDropdown, CommonModule,

    FormsModule,
    ReactiveFormsModule,

    TuiDataListWrapper,
    TuiDataList,
    TuiDataListWrapperComponent,

    TuiSelectModule,

    TuiInputNumber,
    TuiTextareaModule,
    TuiButton,

    TuiTextfield,
    TuiTextfieldControllerModule,
    TuiInputModule, TuiAppearance, TuiAppearance, TuiTable,],
  templateUrl: './dialogcreateinventario.component.html',
  styleUrl: './dialogcreateinventario.component.scss'
})
export class DialogcreateinventarioComponent implements OnInit {

  tiendasState$?: Observable<TiendaState>
  inventarioForm2!: FormGroup;
  productos: Producto[] = [];
  proveedores: any[] = [];

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.inventarioForm2 = this.fb.group({
      producto: [null, Validators.required],
      tienda: [1],
      proveedor: [null, Validators.required],
      responsable: [1],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      stock_minimo: [1, [Validators.required, Validators.min(0)]],
      stock_maximo: [100, [Validators.required, Validators.min(1)]],
      costo_compra: [0.1, [Validators.required, Validators.min(0.1)]],
      costo_venta: [0.1, [Validators.required, Validators.min(0.1)]],
      descripcion: ['', Validators.required]
    });
    this.store.dispatch(loadProductosAction())
    this.store.dispatch(loadProveedores())


    this.store.dispatch(loadInventarios({ tiendaId: 1 }));

  }


  ngOnInit() {

    this.store.select(selectProductoState).subscribe((state: ProductoState) => {
      this.productos = state.productos;
    });
    this.store.select(selectProveedorState).subscribe((state: ProveedorState) => {
      this.proveedores = state.proveedores;
    });
  }
  onSubmit(): void {
    if (this.inventarioForm2.valid) {
      console.log('Formulario enviado:', this.inventarioForm2.value);
      const preparedData = {
        ...this.inventarioForm2.value,
        producto: this.inventarioForm2.value.producto.id,
        proveedor: this.inventarioForm2.value.proveedor.id,
      }
      this.store.dispatch(createInventario({ inventario: preparedData }));
    } else {
      console.log('Formulario inválido');
    }
  }

}
