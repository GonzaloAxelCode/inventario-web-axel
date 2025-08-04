import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiDataList, TuiDropdown, TuiError, TuiNumberFormat, TuiTextfield } from '@taiga-ui/core';
import { TuiInputModule, TuiTextareaModule, } from '@taiga-ui/legacy';

import { TuiDataListWrapper, TuiTabs } from '@taiga-ui/kit';
import { TuiComboBoxModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';


import { TIENDA_ID } from '@/app/constants/tienda-vars';
import { Producto, ProductoState } from '@/app/models/producto.models';
import { TiendaState } from '@/app/models/tienda.models';
import { createInventario } from '@/app/state/actions/inventario.actions';
import { AppState } from '@/app/state/app.state';
import { ProveedorState } from '@/app/state/reducers/proveedor.reducer';
import { selectAuth } from '@/app/state/selectors/auth.selectors';
import { selectProductoState } from '@/app/state/selectors/producto.selectors';
import { selectProveedorState } from '@/app/state/selectors/proveedor.selectors';
import { selectTiendaState } from '@/app/state/selectors/tienda.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiAppearance } from '@taiga-ui/core';
import { TuiDataListWrapperComponent, TuiInputNumber } from '@taiga-ui/kit';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dialogcreateinventario',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    TuiTextareaModule,
    TuiError,
    TuiButton,
    TuiDataListWrapper,
    TuiDataList,
    TuiTextfield,
    FormsModule, TuiComboBoxModule,
    TuiSelectModule, TuiTabs, TuiDropdown,
    TuiDataListWrapperComponent,
    TuiInputNumber,
    TuiTextfieldControllerModule,
    TuiInputModule, TuiAppearance, TuiTable, TuiNumberFormat],
  providers: [

  ],
  templateUrl: './dialogcreateinventario.component.html',
  styleUrl: './dialogcreateinventario.component.scss'
})
export class DialogcreateinventarioComponent implements OnInit {

  tiendasState$?: Observable<TiendaState>
  userId: number = 0;
  inventarioForm2!: FormGroup;
  productos: Producto[] = [];
  tiendas: any[] = [];
  proveedores: any[] = [];

  constructor(private fb: FormBuilder, private store: Store<AppState>) {

  }
  ngOnInit() {

    this.store.pipe(select(selectAuth)).subscribe(authState => {
      this.userId = Number(authState?.id_user) || 0;
    });
    this.store.select(selectProductoState).subscribe((state: ProductoState) => {
      this.productos = state.productos;
    });
    this.store.select(selectProveedorState).subscribe((state: ProveedorState) => {
      this.proveedores = state.proveedores;
    });
    this.store.select(selectTiendaState).subscribe((state: TiendaState) => {
      this.tiendas = state.tiendas;
    });
    this.inventarioForm2 = this.fb.group({
      producto: [null, Validators.required],
      tienda: [TIENDA_ID, Validators.required],
      proveedor: [null, Validators.required],
      responsable: [this.userId],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      stock_minimo: [1, [Validators.required, Validators.min(0)]],
      stock_maximo: [100, [Validators.required, Validators.min(1)]],
      costo_compra: [1, [Validators.required,]],
      costo_venta: [1, [Validators.required,]],
      descripcion: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.inventarioForm2.valid) {

      const preparedData = {
        ...this.inventarioForm2.value,
        producto: this.inventarioForm2.value.producto.id,
        tienda: TIENDA_ID,
        proveedor: this.inventarioForm2.value.proveedor.id,
      }

      this.store.dispatch(createInventario({ inventario: preparedData }));
    } else {

    }
  }


}
