import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiAppearance, TuiButton, TuiDataList, TuiDropdown, TuiTextfield } from '@taiga-ui/core';
import { TuiBadge, TuiDataListWrapper } from '@taiga-ui/kit';
import { TuiInputModule, TuiSelectModule, TuiTextareaModule, TuiTextfieldControllerModule } from "@taiga-ui/legacy";

import { Categoria } from '@/app/models/categoria.models';
import { loadInventarios } from '@/app/state/actions/inventario.actions';
import { AppState } from '@/app/state/app.state';
import { InventarioState } from '@/app/state/reducers/inventario.reducer';
import { selectCategoriaState } from '@/app/state/selectors/categoria.selectors';
import { selectInventario } from '@/app/state/selectors/inventario.selectors';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
// import { TuiDialogContext } from '@taiga-ui/core';
import { TuiDialogContext } from '@taiga-ui/core';

import { injectContext } from '@taiga-ui/polymorpheus';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialogselectproducts',
  standalone: true,
  imports: [CommonModule,

    FormsModule,
    ReactiveFormsModule,

    TuiDataListWrapper,
    TuiDataList,

    TuiDropdown,
    TuiSelectModule,


    TuiTextareaModule,
    TuiButton,

    TuiTextfield,
    TuiTextfieldControllerModule,
    TuiInputModule, TuiAppearance, TuiAppearance, TuiTable, TuiBadge, TuiInputModule
  ],
  templateUrl: './dialogselectproducts.component.html',

  styleUrl: './dialogselectproducts.component.scss'
})
export class DialogselectproductsComponent {


  inventariosState$?: Observable<InventarioState>;
  inventarioForm2!: FormGroup;

  allColumns = [
    { key: 'id', label: 'ID' },
    { key: 'producto', label: 'Producto' },
    { key: 'tienda', label: 'Tienda' },
    { key: 'cantidad', label: 'Cantidad' },
    { key: 'costo_compra', label: 'Costo Compra' },
    { key: 'costo_venta', label: 'Costo Venta' },


  ];
  filteredData: any = []
  allColumnKeys = this.allColumns.map(c => c.key);
  displayedColumns = [...this.allColumnKeys];
  categorias: Categoria[] = [];

  protected readonly context = injectContext<TuiDialogContext<boolean>>();

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.store.dispatch(loadInventarios({ tiendaId: 1 }));
    this.inventariosState$ = this.store.select(selectInventario)
  }
  ngOnInit() {
    this.store.select(selectCategoriaState).subscribe((state) => {
      this.categorias = state.categorias;
      console.log(state)
    });
  }
  getCategoriaNombre = (id: number): string => {
    const categoria = this.categorias.find((c) => c.id === id);
    return categoria ? categoria.nombre : '';
  };
  getInventarioValue(inventario: any, key: string): any {
    return inventario[key as keyof any];
  }
  cerrarDialogo(product: any) {
    this.context.completeWith(product); // O true si necesitas devolver un valor

  }

}
