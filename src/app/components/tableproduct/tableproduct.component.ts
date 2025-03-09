import { Producto, ProductoState } from '@/app/models/producto.models';
import { deleteProductoAction } from '@/app/state/actions/producto.actions';
import { AppState } from '@/app/state/app.state';
import { selectProductoState } from '@/app/state/selectors/producto.selectors';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TuiResponsiveDialogService } from '@taiga-ui/addon-mobile';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiAlertService, TuiButton } from '@taiga-ui/core';
import { TUI_CONFIRM, TuiBadge, TuiConfirmService, TuiRadio } from '@taiga-ui/kit';
import { Observable } from 'rxjs';

import type { TuiConfirmData } from '@taiga-ui/kit';

@Component({
  selector: 'app-tableproduct',
  standalone: true,
  imports: [
    CommonModule,
    TuiBadge,
    TuiRadio,
    FormsModule,
    TuiTable,
    TuiButton
  ],
  templateUrl: './tableproduct.component.html',
  styleUrl: './tableproduct.component.scss',
  providers: [TuiConfirmService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableproductComponent implements OnInit {
  productosState$?: Observable<ProductoState>;

  editingId: number | null = null;
  editedProducto: Partial<Producto> = {};

  allColumns = [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'descripcion', label: 'Descripción' },
    { key: 'precio', label: 'Precio' },
    { key: 'categoria', label: 'Categoría' },
    { key: 'sku', label: 'SKU' },
    { key: 'marca', label: 'Marca' },
    { key: 'modelo', label: 'Modelo' },
    { key: 'fechaCreacion', label: 'Fecha Creación' },
    { key: 'activo', label: 'Activo' },
  ];
  filteredData: any = []
  allColumnKeys = this.allColumns.map(c => c.key);
  displayedColumns = [...this.allColumnKeys];
  private readonly dialogs = inject(TuiResponsiveDialogService);
  private readonly alerts = inject(TuiAlertService);
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.productosState$ = this.store.select(selectProductoState);

  }

  onEditProducto(producto: any): void {
    this.editingId = producto.id;
    this.editedProducto = { ...producto };
  }

  onCancelEdit(): void {
    this.editingId = null;
    this.editedProducto = {} as Producto;
  }

  onUpdateProducto(): void {
    if (this.editingId !== null) {
      this.onCancelEdit();
    }
  }
  protected onDeleteProducto(id: any): void {
    const data: TuiConfirmData = {
      content: '¿Estás seguro de que deseas eliminar este producto?',
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
          console.log('Producto eliminado con ID:', id);
          this.store.dispatch(deleteProductoAction({ id }));
          this.alerts.open('Producto eliminado exitosamente.').subscribe();
        } else {
          console.log('Eliminación cancelada');
          this.alerts.open('Eliminación cancelada.').subscribe();
        }
      });
  }

}
