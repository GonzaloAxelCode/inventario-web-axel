import { Venta } from '@/app/models/venta.models';
import { DialogVentaDetailService } from '@/app/services/ui/dialog-venta-detail.service';
import { cancelarVenta, cargarVentasTienda } from '@/app/state/actions/venta.actions';
import { AppState } from '@/app/state/app.state';
import { selectVentaState } from '@/app/state/selectors/venta.selectors';
import { CommonModule, NgForOf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TuiResponsiveDialogService } from '@taiga-ui/addon-mobile';
import { TuiTable } from '@taiga-ui/addon-table';
import { tuiCountFilledControls } from '@taiga-ui/cdk';
import { TuiAppearance, TuiButton, TuiDataList, TuiDropdown, TuiLink, TuiTextfield } from '@taiga-ui/core';
import { TUI_CONFIRM, TuiBadge, TuiChevron, TuiConfirmData, TuiConfirmService, TuiDataListWrapper, TuiFilter, TuiSegmented, TuiStatus, TuiSwitch } from '@taiga-ui/kit';
import { TuiAppBar, TuiSearch } from '@taiga-ui/layout';
import { TuiInputDateModule, TuiInputModule, TuiSelectModule, TuiTextfieldControllerModule } from "@taiga-ui/legacy";
import { map, Observable, of } from 'rxjs';

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
    TuiBadge, TuiButton, TuiAppearance, TuiStatus, TuiSegmented, NgForOf,
    ReactiveFormsModule,
    TuiButton,
    TuiChevron,
    TuiDataListWrapper,
    TuiFilter,
    TuiLink,
    TuiSearch,
    TuiSegmented,
    TuiSwitch,
    TuiTextfield,
  ],

  templateUrl: './ventas.component.html',
  providers: [
    { provide: 'Pythons', useValue: ['Python One', 'Python Two', 'Python Three'] }, TuiConfirmService
  ],
  styleUrl: './ventas.component.scss'
})

export class VentasComponent implements OnInit {
  ventasState$: Observable<{ ventas: Venta[] }> = of({ ventas: [] });
  ventas: any[] = []
  private readonly dialogs = inject(TuiResponsiveDialogService);
  allColumns = [
    { key: 'fecha_realizacion', label: 'Fecha Realización' },
    { key: 'metodo_pago', label: 'Método de Pago' },
  ];
  private readonly dialogServiceVentaDetail = inject(DialogVentaDetailService);
  filteredData: any = []
  allColumnKeys = this.allColumns.map(c => c.key);
  displayedColumns = [...this.allColumnKeys];
  constructor(private fb: FormBuilder, private store: Store<AppState>) {

  }
  ngOnInit() {
    this.store.dispatch(cargarVentasTienda({ tiendaId: 1 }))
    this.ventasState$ = this.store.select(selectVentaState);
    this.ventasState$.subscribe(ventas => {
      this.ventas = ventas.ventas;
      this.filteredData = this.ventas;
      console.log(ventas)
    })
  }
  getVentaValue(venta: Venta, key: string): any {
    return venta[key as keyof Venta];
  }

  eliminarVenta(ventaId: number) {

    const data: TuiConfirmData = {
      content: '¿Estás seguro de que deseas cancelar esta Venta? ',
      yes: 'Si', // Botón de confirmación
      no: 'No',  // Botón de cancelar
    };

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Confirmación de  Cancelacion',
        size: 's',
        data,
      })
      .subscribe((confirm) => {
        if (confirm) {

          this.store.dispatch(cancelarVenta({ ventaId }));

        } else {
          console.log('Eliminación cancelada');
          //this.alerts.open('Eliminación cancelada.').subscribe();
        }
      });
  }


  protected readonly form = new FormGroup({
    search: new FormControl(),
    select: new FormControl(),
    date: new FormControl(),
    switch: new FormControl(),
    filter: new FormControl(),
    segmented: new FormControl(),
  });

  protected readonly items = inject<readonly string[]>('Pythons' as any);
  protected readonly filters = ['Python', 'JavaScript', 'TypeScript'];
  protected readonly segments = [null, 'Unread', 'Archived'];

  protected readonly count = toSignal(
    this.form.valueChanges.pipe(map(() => tuiCountFilledControls(this.form))),
    { initialValue: 0 },
  );

  protected showDialogVentaDetail(venta: Partial<Venta>): void {
    console.log(venta)
    this.dialogServiceVentaDetail.open(venta).subscribe((result: any) => {
    });
  }
}
