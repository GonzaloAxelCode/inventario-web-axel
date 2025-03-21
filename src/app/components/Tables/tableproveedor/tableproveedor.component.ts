import { Proveedor } from '@/app/models/proveedor.models';
import { loadProveedores } from '@/app/state/actions/proveedor.actions';
import { AppState } from '@/app/state/app.state';
import { ProveedorState } from '@/app/state/reducers/proveedor.reducer';
import { selectProveedores } from '@/app/state/selectors/proveedor.selectors';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiAppearance, TuiButton, tuiDialog } from '@taiga-ui/core';
import { TuiBadge, TuiRadio } from '@taiga-ui/kit';
import { Observable } from 'rxjs';
import { DialogcreateproveedorComponent } from '../../Dialogs/dialogcreateproveedor/dialogcreateproveedor.component';
@Component({
  selector: 'app-tableproveedor',
  standalone: true,
  imports: [CommonModule, FormsModule, TuiTable, CommonModule,

    TuiRadio,
    FormsModule,
    TuiTable, TuiButton, TuiAppearance, TuiBadge
  ],
  templateUrl: './tableproveedor.component.html',
  styleUrl: './tableproveedor.component.scss'
})
export class TableproveedorComponent implements OnInit {



  private readonly dialog = tuiDialog(DialogcreateproveedorComponent, {
    dismissible: true,
    label: 'Nuevo Proveedor',
    size: "l"
  });
  editingId: number | null = null;
  editedProveedor: Partial<Proveedor> = {};
  proveedoresState$?: Observable<ProveedorState>;
  constructor(private store: Store<AppState>) { }

  allColumns = [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'direccion', label: 'Direccion' },
    { key: 'telefono', label: 'Telefono' },
    { key: 'tipo_producto', label: 'Tipos de producto' },




  ];
  filteredData: any = []
  allColumnKeys = this.allColumns.map(c => c.key);
  displayedColumns = [...this.allColumnKeys];
  ngOnInit() {
    this.store.dispatch(loadProveedores());
    this.proveedoresState$ = this.store.select(selectProveedores);

  }
  getProveedorValue(proveedor: Proveedor, key: string): any {
    return proveedor[key as keyof Proveedor];
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
}
