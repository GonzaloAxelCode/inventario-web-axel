import { Component } from '@angular/core';
import { TuiAxes, TuiBarChart } from '@taiga-ui/addon-charts';
import { tuiCeil } from '@taiga-ui/cdk';
@Component({
  selector: 'app-dashboard-low-stock',
  standalone: true,
  imports: [TuiAxes, TuiBarChart],

  templateUrl: './dashboard-low-stock.component.html',
  styleUrl: './dashboard-low-stock.component.scss'
})
export class DashboardLowStockComponent {
  protected readonly value = [
    [3660, 8281, 1069, 9034, 5797, 6918, 8495, 3234, 6204, 1392, 2088, 8637, 8779],
    [3952, 3671, 3781, 5323, 3537, 4107, 2962, 3320, 8632, 4755, 9130, 1195, 3574],
  ];

  protected readonly labelsX = ['Jan 2019', 'Feb', 'Mar', ''];
  protected readonly labelsY = ['0', '10 000'];

  protected getHeight(max: number): number {
    return (max / tuiCeil(max, -3)) * 100;
  }
}
