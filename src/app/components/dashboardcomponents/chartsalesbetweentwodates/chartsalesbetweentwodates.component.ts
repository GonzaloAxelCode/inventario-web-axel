import { TIENDA_ID } from '@/app/constants/tienda-vars';
import { cargarVentasRangoFechasTienda } from '@/app/state/actions/venta.actions';
import { AppState } from '@/app/state/app.state';
import { selectVentaState } from '@/app/state/selectors/venta.selectors';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TuiAxes, TuiLineDaysChart } from '@taiga-ui/addon-charts';
import { TuiTable } from '@taiga-ui/addon-table';
import type { TuiDayLike, TuiStringHandler } from '@taiga-ui/cdk';
import { TuiDay, TuiDayRange, TuiMonth, tuiPure } from '@taiga-ui/cdk';
import { TUI_MONTHS, TuiAppearance, TuiButton } from '@taiga-ui/core';
import { TuiInputDateRangeModule } from '@taiga-ui/legacy';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-chartsalesbetweentwodates',
  standalone: true,
  imports: [
    CommonModule,
    TuiButton,
    TuiAppearance,
    TuiTable,

    AsyncPipe,
    FormsModule,
    NgIf,
    TuiAxes,
    TuiInputDateRangeModule,
    TuiLineDaysChart,
  ],
  templateUrl: './chartsalesbetweentwodates.component.html',
  styleUrls: ['./chartsalesbetweentwodates.component.scss'],
})
export class ChartsalesbetweentwodatesComponent implements OnInit {

  protected readonly axisYSecondaryLabels = [
    's/. 300', 's/. 600', 's/. 900', 's/. 1200', 's/. 1500',
    's/. 1800', 's/. 2100', 's/. 2400', 's/. 2700', 's/. 3000',
  ];
  private readonly store = inject(Store<AppState>);
  private readonly months$ = inject(TUI_MONTHS);

  // Rango actual como BehaviorSubject para manejar cambios reactivamente
  private _range = new BehaviorSubject<TuiDayRange>(
    new TuiDayRange(
      new TuiDay(2025, 0, 1),
      TuiDay.currentLocal().append({ day: 1 })
    )
  );

  // Observable público del rango
  range$ = this._range.asObservable();

  // Getter para el valor actual (solo lectura)
  get range(): TuiDayRange {
    return this._range.value;
  }

  protected readonly maxLength: TuiDayLike = { month: 12 };

  // Datos reactivos
  protected salesData$ = this.store.select(selectVentaState).pipe(
    map((state: any) => state.salesDateRangePerDay),

    distinctUntilChanged()
  );

  protected readonly xStringify$ = this.months$.pipe(
    map(months => ({ month, day }: TuiDay) => `${months[month]}, ${day}`)
  );

  protected readonly yStringify: TuiStringHandler<number> = (y) =>
    `S/. ${y.toLocaleString('en-US', { maximumFractionDigits: 0, signDisplay: 'exceptZero', style: "decimal", })}`;

  // Valor computado reactivo
  protected value$ = combineLatest([this.salesData$, this.range$]).pipe(
    switchMap(([data, range]) =>
      of(this.computeValue(range, this.processData(data)))
    ),
    tap()
  );

  // Labels reactivos
  protected labels$ = this.range$.pipe(
    switchMap(range => this.computeLabels$(range))
  );

  ngOnInit() {
    this.loadInitialData();
  }
  allSalesYear() {
    const fromDate = new Date(2025, 0, 1);
    const toDate = new Date(2025, 11, 31);

    const newRange: TuiDayRange = new TuiDayRange(
      new TuiDay(2025, 0, 1),
      new TuiDay(2025, 11, 31)
    );


    this.store.dispatch(cargarVentasRangoFechasTienda({
      tiendaId: TIENDA_ID,
      fromDate,
      toDate
    }));
    this._range.next(newRange);
  }
  private loadInitialData(): void {
    const initialRange = this.range;
    this.store.dispatch(cargarVentasRangoFechasTienda({
      tiendaId: TIENDA_ID,
      fromDate: new Date(initialRange.from.year, initialRange.from.month, initialRange.from.day),
      toDate: new Date(initialRange.to.year, initialRange.to.month, initialRange.to.day)
    }));

  }

  // Método para actualizar el rango
  onRangeChange(newRange: TuiDayRange): void {
    // Actualizar el BehaviorSubject
    this._range.next(newRange);

    // Disparar la carga de nuevos datos
    this.store.dispatch(cargarVentasRangoFechasTienda({
      tiendaId: TIENDA_ID,
      fromDate: new Date(newRange.from.year, newRange.from.month, newRange.from.day),
      toDate: new Date(newRange.to.year, newRange.to.month, newRange.to.day)
    }));
  }

  @tuiPure
  private processData(data: Array<[string, number]>): Array<[TuiDay, number]> {
    return data?.map(([dateString, value]) => {
      const dateParts = dateString.split(',').map(Number);
      const day = new TuiDay(dateParts[0], dateParts[1], dateParts[2]);
      return [day, value];
    }) || [];
  }

  @tuiPure
  private computeValue(
    range: TuiDayRange,
    salesData: Array<[TuiDay, number]>
  ): ReadonlyArray<[TuiDay, number]> {
    const dayCount = TuiDay.lengthBetween(range.from, range.to) + 1;

    return Array.from({ length: dayCount }, (_, i) => {
      const currentDay = range.from.append({ day: i });
      const found = salesData.find(([day]) => day.daySame(currentDay));
      return [currentDay, found?.[1] ?? 0];
    });
  }

  @tuiPure
  computeLabels$(range: TuiDayRange): Observable<ReadonlyArray<string | null>> {
    return this.months$.pipe(
      map(months => [
        ...Array.from(
          { length: TuiMonth.lengthBetween(range.from, range.to) + 1 },
          (_, i) => months[range.from.append({ month: i }).month] ?? ''
        ),
        null,
      ])
    );
  }
}