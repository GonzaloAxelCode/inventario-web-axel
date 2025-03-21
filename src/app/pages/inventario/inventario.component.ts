import { DialogcreateinventarioComponent } from '@/app/components/Dialogs/dialogcreateinventario/dialogcreateinventario.component';
import { Inventario } from '@/app/models/inventario.models';
import { Producto, ProductoState } from '@/app/models/producto.models';
import { TiendaState } from '@/app/models/tienda.models';
import { DialogEditInventarioDetailService } from '@/app/services/ui/dialog-edit-inventario.service';
import { createInventario, eliminarInventarioAction, loadInventarios } from '@/app/state/actions/inventario.actions';
import { AppState } from '@/app/state/app.state';
import { InventarioState } from '@/app/state/reducers/inventario.reducer';
import { ProveedorState } from '@/app/state/reducers/proveedor.reducer';
import { selectInventario } from '@/app/state/selectors/inventario.selectors';
import { selectProductoState } from '@/app/state/selectors/producto.selectors';
import { selectProveedorState } from '@/app/state/selectors/proveedor.selectors';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TuiResponsiveDialogService } from '@taiga-ui/addon-mobile';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiAppearance, TuiButton, TuiDataList, tuiDialog, TuiTextfield } from '@taiga-ui/core';
import { TUI_CONFIRM, TuiBadge, TuiConfirmData, TuiConfirmService, TuiDataListWrapper, tuiValidationErrorsProvider } from '@taiga-ui/kit';
import { TuiBlockDetails } from '@taiga-ui/layout';
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


    TuiSelectModule,


    TuiTextareaModule,
    TuiButton,

    TuiTextfield,
    TuiTextfieldControllerModule,
    TuiInputModule, TuiAppearance, TuiAppearance, TuiTable, TuiBadge,
    TuiBlockDetails

  ],
  providers: [tuiValidationErrorsProvider({
    required: 'Required field',
  }), TuiConfirmService],
  templateUrl: './inventario.component.html',

  styleUrl: './inventario.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventarioComponent implements OnInit {
  inventariosState$?: Observable<InventarioState>;
  tiendasState$?: Observable<TiendaState>
  inventarioForm2!: FormGroup;
  productos: Producto[] = [];
  proveedores: any[] = [];
  private readonly dialogs = inject(TuiResponsiveDialogService);

  private readonly dialogEditInventarioService = inject(DialogEditInventarioDetailService);
  allColumns = [
    { key: 'id', label: 'ID' },
    { key: 'producto_nombre', label: 'Producto' },
    { key: 'tienda_nombre', label: 'Tienda' },
    { key: 'proveedor_nombre', label: 'Proveedor' },
    { key: 'stock_minimo', label: 'Stock Mínimo' },
    { key: 'stock_maximo', label: 'Stock Máximo' },
    { key: 'costo_compra', label: 'Costo Compra' },
    { key: 'costo_venta', label: 'Costo Venta' },
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

      const preparedData = {
        ...this.inventarioForm2.value,
        producto: this.inventarioForm2.value.producto.id,
        proveedor: this.inventarioForm2.value.proveedor.id,
      }
      console.log('Formulario enviado:', preparedData);
      this.store.dispatch(createInventario({ inventario: preparedData }));
    } else {
      console.log('Formulario inválido');
    }
  }
  getInventarioValue(inventario: any, key: string): any {
    return inventario[key as keyof any];
  }
  getColorClass(cantidad: number): string {
    if (cantidad >= 1 && cantidad <= 3) {
      return 'text-red-500'; // Rojo si quedan entre 1 y 3
    } else if (cantidad >= 4 && cantidad <= 10) {
      return 'text-yellow-400'; // Amarillo si quedan entre 4 y 10
    } else {
      return 'text-green-400'; // Verde si quedan 11 o más
    }
  }

  eliminarInventario(inventarioId: number) {

    const data: TuiConfirmData = {
      content: '¿Estás seguro de que deseas eliminar este inventario?',
      yes: 'Eliminar', // Botón de confirmación
      no: 'Cancelar',  // Botón de cancelar
    };

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Confirmación de Eliminación',
        size: 's',
        data,
      })
      .subscribe((confirm) => {
        if (confirm) {

          this.store.dispatch(eliminarInventarioAction({ inventarioId }));
          //this.alerts.open('Inventario eliminado exitosamente.').subscribe();
        } else {
          console.log('Eliminación cancelada');
          //this.alerts.open('Eliminación cancelada.').subscribe();
        }
      });
  }


  protected showDialogEditInventario(currentInventario: Partial<Inventario>): void {
    this.dialogEditInventarioService.open(currentInventario).subscribe((result: any) => {
    });
  }
}