import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { ProductoService } from '@/app/services/producto.service';
import {
    createProductoAction, createProductoFail, createProductoSuccess,
    deleteProductoAction, deleteProductoFail, deleteProductoSuccess,
    loadProductosAction, loadProductosFail, loadProductosSuccess,
    updateProductoAction, updateProductoFail, updateProductoSuccess
} from '../actions/producto.actions';

@Injectable()
export class ProductoEffects {

    constructor(
        private actions$: Actions,
        private productoService: ProductoService,
        private toastr: ToastrService
    ) { }

    loadProductosEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(loadProductosAction),
            exhaustMap(() =>
                this.productoService.fetchLoadProductos().pipe(
                    map(productos => loadProductosSuccess({ productos })),
                    catchError(error => {
                        console.error(error);
                        return of(loadProductosFail({ error }));
                    })
                )
            )
        )
    );

    createProductoEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(createProductoAction),
            exhaustMap(({ producto }) =>
                this.productoService.createProducto(producto).pipe(
                    map((res: any) => {
                        this.toastr.success('Producto creado exitosamente', 'Éxito');
                        return createProductoSuccess({ producto: res.producto });
                    }),
                    catchError(error => {
                        this.toastr.error('Error al crear el producto', 'Error');
                        return of(createProductoFail({ error }));
                    })
                )
            )
        )
    );

    updateProductoEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(updateProductoAction),
            exhaustMap(({ producto }) =>
                this.productoService.updateProducto(producto).pipe(
                    map(updatedProducto => {
                        this.toastr.success('Producto actualizado exitosamente', 'Éxito');
                        return updateProductoSuccess({ producto: updatedProducto });
                    }),
                    catchError(error => {
                        this.toastr.error('Error al actualizar el producto', 'Error');
                        return of(updateProductoFail({ error }));
                    })
                )
            )
        )
    );


    deleteProductoEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteProductoAction),
            exhaustMap(({ id }) =>
                this.productoService.deleteProducto(id).pipe(
                    map(() => {
                        this.toastr.warning('Producto eliminado exitosamente', 'Éxito');
                        return deleteProductoSuccess({ id });
                    }),
                    catchError(error => {
                        this.toastr.error('Error al eliminar el producto', 'Error');
                        return of(deleteProductoFail({ error }));
                    })
                )
            )
        )
    );

}
