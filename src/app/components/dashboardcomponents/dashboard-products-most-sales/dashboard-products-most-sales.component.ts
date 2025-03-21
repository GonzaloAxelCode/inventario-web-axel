import { AsyncPipe, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { TuiLegendItem, TuiRingChart } from '@taiga-ui/addon-charts';
import { TuiAmountPipe } from '@taiga-ui/addon-commerce';
import { TuiHovered, tuiSum } from '@taiga-ui/cdk';
@Component({
  selector: 'app-dashboard-products-most-sales',
  standalone: true,

  imports: [AsyncPipe, NgForOf, TuiAmountPipe, TuiHovered, TuiLegendItem, TuiRingChart],

  templateUrl: './dashboard-products-most-sales.component.html',
  styleUrl: './dashboard-products-most-sales.component.scss'
})
export class DashboardProductsMostSalesComponent {
  protected activeItemIndex = NaN;

  protected readonly value = [13769, 12367, 10172, 3018, 2592];
  protected readonly sum = tuiSum(...this.value);
  protected readonly labels = ['Food', 'Cafe', 'OSS', 'Taxi', 'Other'];

  protected isItemActive(index: number): boolean {
    return this.activeItemIndex === index;
  }

  protected onHover(index: number, hovered: boolean): void {
    this.activeItemIndex = hovered ? index : NaN;
  }
}
