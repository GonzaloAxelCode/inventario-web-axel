import { Venta } from '@/app/models/venta.models';
import { cargarVentasTienda } from '@/app/state/actions/venta.actions';
import { AppState } from '@/app/state/app.state';
import { selectVentaState } from '@/app/state/selectors/venta.selectors';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiButton, TuiDataList, TuiDropdown } from '@taiga-ui/core';
import { TuiDataListWrapper } from '@taiga-ui/kit';
import { TuiAppBar } from '@taiga-ui/layout';
import { TuiInputDateModule, TuiInputModule, TuiSelectModule, TuiTextfieldControllerModule } from "@taiga-ui/legacy";
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    FormsModule,
    TuiAppBar,
    TuiDropdown,
    TuiDataListWrapper,
    TuiTable,
    TuiInputDateModule,
    TuiTextfieldControllerModule,
    TuiDataList,
    TuiSelectModule,
    TuiButton
  ],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent implements OnInit {
  form: FormGroup;
  clientes: string[] = ['Juan Pérez', 'María López', 'Carlos Sánchez', 'Ana Gómez'];

  ventasState$: Observable<{ ventas: Venta[] }> = of({ ventas: [] });
  estados: string[] = ['Pendiente', 'Pagado', 'Anulado'];
  estadosSunat: string[] = ['Aceptado', 'Rechazado', 'Enviado'];
  puntosVenta: string[] = ['Accesorios', 'General']
  ventas: any[] = []

  allColumns = [
    { key: 'id', label: 'ID' },
    { key: 'cliente', label: 'Cliente' },
    { key: 'usuario', label: 'Usuario' },
    { key: 'tienda', label: 'Tienda' },
    { key: 'fecha_realizacion', label: 'Fecha Realización' },
    { key: 'total', label: 'Total' },
    { key: 'metodo_pago', label: 'Método de Pago' },
    { key: 'estado', label: 'Estado' },
    { key: 'tipo_comprobante', label: 'Tipo de Comprobante' },
    { key: 'serie', label: 'Serie' },
    { key: 'numero', label: 'Número' },
    { key: 'documento_cliente', label: 'Documento Cliente' }
  ];
  filteredData: any = []
  allColumnKeys = this.allColumns.map(c => c.key);
  displayedColumns = [...this.allColumnKeys];
  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.form = this.fb.group({
      firstDate: [null],
      endDate: [null],
      puntoVenta: [null],
      cliente: [''],
      estado: [null],
      estadoSunat: [null],
      serie: [''],
      numeroDocumento: ['']
    });


  }
  ngOnInit() {
    this.store.dispatch(cargarVentasTienda({ tiendaId: 3 }))
    this.ventasState$ = this.store.select(selectVentaState);
  }
  getVentaValue(venta: Venta, key: string): any {
    return venta[key as keyof Venta];
  }
}
