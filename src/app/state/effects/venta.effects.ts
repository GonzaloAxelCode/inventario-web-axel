
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { VentaService } from '@/app/services/venta.service';
import {
    cargarVentasTienda,
    cargarVentasTiendaError,
    cargarVentasTiendaExito,
    crearVenta,
    crearVentaError,
    crearVentaExito
} from '../actions/venta.actions';
import { AppState } from '../app.state';

@Injectable()
export class VentaEffects {

    constructor(
        private actions$: Actions,
        private ventaService: VentaService,
        private store: Store<AppState>,
        private toastr: ToastrService
    ) { }


    loadVentasTiendaEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(cargarVentasTienda),
            exhaustMap(({ tiendaId }) =>
                this.ventaService.getVentasPorTienda(tiendaId).pipe(
                    map(ventas => {

                        return cargarVentasTiendaExito({ ventas });
                    }),
                    catchError(error => {

                        return of(cargarVentasTiendaError({ error }));
                    })
                )
            )
        )
    );


    createVentaEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(crearVenta),
            exhaustMap(({ venta }) =>
                this.ventaService.createVenta(venta).pipe(
                    map(createdVenta => {
                        this.toastr.success('Venta creada exitosamente', 'Éxito');
                        return crearVentaExito({ venta: createdVenta });
                    }),
                    catchError(error => {
                        this.toastr.error('Error al crear la venta', 'Error');
                        return of(crearVentaError({ error }));
                    })
                )
            )
        )
    );
}
