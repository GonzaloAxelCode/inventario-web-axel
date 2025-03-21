import { Tienda, TiendaState } from '@/app/models/tienda.models';
import { desactivateTiendaAction, loadTiendasAction } from '@/app/state/actions/tienda.actions';
import { AppState } from '@/app/state/app.state';
import { selectTiendaState } from '@/app/state/selectors/tienda.selectors';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { TuiBadge } from '@taiga-ui/kit';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tabletiendas',
  standalone: true,
  imports: [CommonModule, FormsModule, TuiTable, TuiBadge, TuiAppearance, TuiButton],
  templateUrl: './tabletiendas.component.html',
  styleUrl: './tabletiendas.component.scss'
})
export class TabletiendasComponent implements OnInit {

  tiendasState$?: Observable<TiendaState>;
  allColumns = [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'direccion', label: 'Dirección' },



    { key: 'ruc', label: 'RUC' },
    { key: 'activo', label: 'Activo' },

  ];
  filteredData: any = []
  allColumnKeys = this.allColumns.map(c => c.key);
  displayedColumns = [...this.allColumnKeys];

  editingId: number | any = null;
  editedTienda: Partial<Tienda> = {};

  constructor(private store: Store<AppState>, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.store.dispatch(loadTiendasAction());
    this.tiendasState$ = this.store.select(selectTiendaState);

  }



  onEditTienda(tienda: Tienda) {
    this.editingId = tienda.id;
    this.editedTienda = { ...tienda };
  }

  onUpdateTienda() {
    console.log('Datos actualizados:', this.editedTienda);

    this.editingId = null;
  }

  onCancelEdit() {
    this.editingId = null;
  }
  onToggle(tienda: Tienda) {
    const newTienda = { ...tienda, activo: !tienda.activo };
    this.store.dispatch(desactivateTiendaAction({ id: newTienda.id, activo: newTienda.activo }));
  }


  getTiendaValue(venta: Tienda, key: string): any {
    return venta[key as keyof Tienda];
  }
}
