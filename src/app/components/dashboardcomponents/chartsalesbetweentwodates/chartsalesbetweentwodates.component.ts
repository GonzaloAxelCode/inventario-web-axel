


import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiAxes, TuiLineDaysChart } from '@taiga-ui/addon-charts';
import { TuiTable } from '@taiga-ui/addon-table';
import type { TuiDayLike, TuiStringHandler } from '@taiga-ui/cdk';
import { TUI_IS_E2E, TuiDay, TuiDayRange, TuiMonth, tuiPure } from '@taiga-ui/cdk';
import { TUI_MONTHS, TuiAppearance, TuiButton } from '@taiga-ui/core';
import { TuiSegmented } from '@taiga-ui/kit';
import { TuiCardMedium } from '@taiga-ui/layout';
import { TuiInputDateRangeModule } from '@taiga-ui/legacy';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-chartsalesbetweentwodates',
  standalone: true,
  imports: [CommonModule, TuiButton, TuiAppearance, TuiTable, TuiSegmented, TuiCardMedium, AsyncPipe,
    FormsModule,
    NgIf,
    TuiAxes,
    TuiInputDateRangeModule,
    TuiLineDaysChart,],
  templateUrl: './chartsalesbetweentwodates.component.html',
  styleUrls: ['./chartsalesbetweentwodates.component.scss']
})
export class ChartsalesbetweentwodatesComponent {
  private readonly isE2E = inject(TUI_IS_E2E);
  private readonly months$ = inject(TUI_MONTHS);

  protected range = new TuiDayRange(
    TuiDay.currentLocal(),
    TuiDay.currentLocal().append({ year: 1 }),
  );

  protected readonly maxLength: TuiDayLike = { month: 12 };

  protected readonly xStringify$: Observable<TuiStringHandler<TuiDay>> =
    this.months$.pipe(
      map(
        (months) =>
          ({ month, day }) =>
            `${months[month]}, ${day}`,
      ),
    );

  protected get value(): ReadonlyArray<[TuiDay, number]> {
    return this.computeValue(this.range);
  }

  @tuiPure
  protected computeLabels$({
    from,
    to,
  }: TuiDayRange): Observable<ReadonlyArray<string | null>> {
    return this.months$.pipe(
      map((months) => [
        ...Array.from(
          { length: TuiMonth.lengthBetween(from, to) + 1 },
          (_, i) => months[from.append({ month: i }).month] ?? '',
        ),
        null,
      ]),
    );
  }

  protected readonly yStringify: TuiStringHandler<number> = (y) =>
    `${(10 * y).toLocaleString('en-US', { maximumFractionDigits: 0 })} $`;

  @tuiPure
  private computeValue({ from, to }: TuiDayRange): ReadonlyArray<[TuiDay, number]> {
    return new Array(TuiDay.lengthBetween(from, to) + 1)
      .fill(0)
      .reduce<
        ReadonlyArray<[TuiDay, number]>
      >((array, _, i) => [...array, [from.append({ day: i }), this.isE2E ? 100 : (i ? (array[i - 1]?.[1] ?? 0) : 100) + Math.random() * 10 - 5]], []);
  }
}

