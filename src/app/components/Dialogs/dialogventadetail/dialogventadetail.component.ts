import { ComprobanteElectronico, Venta } from '@/app/models/venta.models';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TuiAmountPipe } from '@taiga-ui/addon-commerce';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiAppearance, TuiDialogContext, TuiNumberFormat, TuiTitle } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import { injectContext } from '@taiga-ui/polymorpheus';

@Component({
  selector: 'app-dialogventadetail',
  standalone: true,
  imports: [CommonModule, TuiNumberFormat, TuiAmountPipe, TuiCardLarge, TuiAppearance, TuiTitle, TuiTable],
  templateUrl: './dialogventadetail.component.html',
  styleUrl: './dialogventadetail.component.scss'
})
export class DialogventadetailComponent {
  protected readonly context = injectContext<TuiDialogContext<boolean, Partial<Venta>>>();
  public venta: Partial<Venta> = this.context.data ?? {};

  public comprobante: ComprobanteElectronico = this.venta?.comprobante ?? {} as ComprobanteElectronico;

  public productos_json = (() => {
    try {
      return this.venta.productos_json ? JSON.parse(this.venta.productos_json) : [];
    } catch (error) {
      console.error("Error al parsear productos_json:", error);
      return [];
    }
  })();
  constructor() {
    console.log(this.venta)

  }
  getValorVentaRedondeado(valor: number): string {
    return valor.toFixed(2);
  }
}
