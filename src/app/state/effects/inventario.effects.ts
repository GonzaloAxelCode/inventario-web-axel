import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { InventarioService } from '@/app/services/inventario.service';
import {
    ajustarStock,
    ajustarStockFail,
    ajustarStockSuccess,

    createInventario,

    createInventarioFail,
    createInventarioSuccess,

    loadInventarios,

    loadInventariosFail,
    loadInventariosSuccess,

    updateStock,

    updateStockFail,
    updateStockSuccess
} from '../actions/inventario.actions';

@Injectable()
export class InventarioEffects {

    constructor(
        private actions$: Actions,
        private inventarioService: InventarioService,
        private toastr: ToastrService
    ) { }

    loadInventariosEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(loadInventarios),
            exhaustMap(({ tiendaId }) =>
                this.inventarioService.fetchInventariosPorTienda(tiendaId).pipe(
                    map(inventarios => {
                        console.log(inventarios)
                        return loadInventariosSuccess({ inventarios })
                    }),
                    catchError(error => {
                        console.error(error);

                        return of(loadInventariosFail({ error }));
                    })
                )
            )
        )
    );

    createInventarioEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(createInventario),
            exhaustMap(({ inventario }) =>
                this.inventarioService.createInventario(inventario).pipe(
                    map((res: any) => {
                        this.toastr.success('Inventario creado exitosamente', 'Éxito');
                        return createInventarioSuccess({ inventario: res });
                    }),
                    catchError(error => {
                        this.toastr.error('Error al crear el inventario', 'Error');
                        return of(createInventarioFail({ error }));
                    })
                )
            )
        )
    );

    updateStockEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(updateStock),
            exhaustMap(({ inventarioId, cantidad }) =>
                this.inventarioService.updateStock(inventarioId, cantidad).pipe(
                    map((res) => {
                        this.toastr.success('Stock actualizado exitosamente', 'Éxito');
                        return updateStockSuccess({ inventario: res.inventario });
                    }),
                    catchError(error => {
                        this.toastr.error('Error al actualizar el stock', 'Error');
                        return of(updateStockFail({ error }));
                    })
                )
            )
        )
    );

    ajustarStockEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(ajustarStock),
            exhaustMap(({ inventarioId, cantidad }) =>
                this.inventarioService.ajustarStock(inventarioId, cantidad).pipe(
                    map(() => {
                        this.toastr.success('Stock ajustado exitosamente', 'Éxito');
                        return ajustarStockSuccess({ inventarioId, cantidad });
                    }),
                    catchError(error => {
                        this.toastr.error('Error al ajustar el stock', 'Error');
                        return of(ajustarStockFail({ error }));
                    })
                )
            )
        )
    );

}
