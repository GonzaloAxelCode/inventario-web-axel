import { DialogventadetailComponent } from '@/app/components/Dialogs/dialogventadetail/dialogventadetail.component';
import { Venta } from '@/app/models/venta.models';
import { Injectable, inject } from '@angular/core';
import { TuiDialogOptions, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { Observable } from 'rxjs';

export interface VentaDialogOptions extends TuiDialogOptions<any> {
    data: Partial<Venta>; // Agregamos los datos que queremos enviar
}


@Injectable({
    providedIn: 'root',
})
export class DialogVentaDetailService {
    private readonly dialogService = inject(TuiDialogService);

    open(data: Partial<Venta>): Observable<boolean> {
        const component = new PolymorpheusComponent(DialogventadetailComponent);
        const options: Partial<VentaDialogOptions> = {
            dismissible: true,
            size: "auto",
            data
        };

        return this.dialogService.open(component, options);
    }
}
