import { DialogcreatetiendaComponent } from '@/app/components/dialogcreatetienda/dialogcreatetienda.component';
import { Component } from '@angular/core';
import { TuiAppearance, TuiButton, tuiDialog } from '@taiga-ui/core';
import { FormaddtiendaComponent } from "../../components/formaddtienda/formaddtienda.component";
import { TabletiendasComponent } from "../../components/tabletiendas/tabletiendas.component";

@Component({
  selector: 'app-tiendas',
  standalone: true,
  imports: [FormaddtiendaComponent, TabletiendasComponent, TuiButton, TuiAppearance],
  templateUrl: './tiendas.component.html',
  styleUrl: './tiendas.component.scss'
})
export class TiendasComponent {
  private readonly dialog = tuiDialog(DialogcreatetiendaComponent, {
    dismissible: true,
    label: 'Nuevo Tienda',
    size: "l"
  });
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
