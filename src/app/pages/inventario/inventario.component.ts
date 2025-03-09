import { DialogcreateinventarioComponent } from '@/app/components/dialogcreateinventario/dialogcreateinventario.component';
import { Producto, ProductoState } from '@/app/models/producto.models';
import { TiendaState } from '@/app/models/tienda.models';
import { createInventario, loadInventarios } from '@/app/state/actions/inventario.actions';
import { AppState } from '@/app/state/app.state';
import { InventarioState } from '@/app/state/reducers/inventario.reducer';
import { ProveedorState } from '@/app/state/reducers/proveedor.reducer';
import { selectInventario } from '@/app/state/selectors/inventario.selectors';
import { selectProductoState } from '@/app/state/selectors/producto.selectors';
import { selectProveedorState } from '@/app/state/selectors/proveedor.selectors';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiAppearance, TuiButton, TuiDataList, tuiDialog, TuiDialogService, TuiTextfield } from '@taiga-ui/core';
import { TuiBadge, TuiDataListWrapper, TuiDataListWrapperComponent, TuiInputNumber, tuiValidationErrorsProvider } from '@taiga-ui/kit';
import { TuiInputModule, TuiSelectModule, TuiTextareaModule, TuiTextfieldControllerModule } from "@taiga-ui/legacy";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [
    CommonModule,

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
    TuiInputModule, TuiAppearance, TuiAppearance, TuiTable, TuiBadge

  ],
  providers: [tuiValidationErrorsProvider({
    required: 'Required field',
  }),],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent implements OnInit {
  inventariosState$?: Observable<InventarioState>;
  tiendasState$?: Observable<TiendaState>
  inventarioForm2!: FormGroup;
  productos: Producto[] = [];
  proveedores: any[] = [];
  private readonly dialogs = inject(TuiDialogService);

  allColumns = [
    { key: 'id', label: 'ID' },
    { key: 'producto', label: 'Producto' },
    { key: 'tienda', label: 'Tienda' },
    { key: 'proveedor', label: 'Proveedor' },
    { key: 'responsable', label: 'Responsable' },
    { key: 'cantidad', label: 'Cantidad' },
    { key: 'stock_minimo', label: 'Stock Mínimo' },
    { key: 'stock_maximo', label: 'Stock Máximo' },
    { key: 'costo_compra', label: 'Costo Compra' },
    { key: 'costo_venta', label: 'Costo Venta' },

    { key: 'descripcion', label: 'Descripción' },

  ];
  filteredData: any = []
  allColumnKeys = this.allColumns.map(c => c.key);
  displayedColumns = [...this.allColumnKeys];
  private readonly dialog = tuiDialog(DialogcreateinventarioComponent, {
    dismissible: true,
    label: 'Crear Inventario',
    size: "l"
  });
  constructor(private fb: FormBuilder, private store: Store<AppState>) {

    this.store.dispatch(loadInventarios({ tiendaId: 1 }));
    this.inventariosState$ = this.store.select(selectInventario)
  }

  protected showDialog(): void {
    this.dialog().subscribe({
      next: (data) => {
        console.info(`Dialog emitted data = ${data}`);
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
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
  getInventarioValue(inventario: any, key: string): any {
    return inventario[key as keyof any];
  }
}