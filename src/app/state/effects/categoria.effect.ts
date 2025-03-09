import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { CategoriaService } from '@/app/services/categoria.service';
import {
    createCategoriaAction, createCategoriaFail, createCategoriaSuccess,
    deleteCategoriaAction, deleteCategoriaFail, deleteCategoriaSuccess,
    loadCategorias, loadCategoriasFail, loadCategoriasSuccess,
    updateCategoriaAction, updateCategoriaFail, updateCategoriaSuccess
} from '../actions/categoria.actions';
import { AppState } from '../app.state';

@Injectable()
export class CategoriaEffects {

    constructor(
        private actions$: Actions,
        private categoriaService: CategoriaService,
        private store: Store<AppState>,
        private toastr: ToastrService // Inyectamos el servicio de Toastr
    ) { }

    // Efecto para cargar categorías con notificación de éxito y error
    loadCategoriasEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCategorias),
            exhaustMap(() =>
                this.categoriaService.fetchCategorias().pipe(
                    map(categorias => {

                        return loadCategoriasSuccess({ categorias });
                    }),
                    catchError(error => {

                        return of(loadCategoriasFail({ error }));
                    })
                )
            )
        )
    );

    // Efecto para crear una categoría con notificación de éxito y error
    createCategoriaEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(createCategoriaAction),
            exhaustMap(({ categoria }) =>
                this.categoriaService.createCategoria(categoria).pipe(
                    map(createdCategoria => {
                        this.toastr.success('Categoría creada exitosamente', 'Éxito');
                        return createCategoriaSuccess({ categoria: createdCategoria });
                    }),
                    catchError(error => {
                        this.toastr.error('Error al crear la categoría', 'Error');
                        return of(createCategoriaFail({ error }));
                    })
                )
            )
        )
    );

    // Efecto para actualizar una categoría con notificación de éxito y error
    updateCategoriaEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(updateCategoriaAction),
            exhaustMap(({ categoria }) =>
                this.categoriaService.updateCategoria(categoria).pipe(
                    map(updatedCategoria => {
                        this.toastr.success('Categoría actualizada exitosamente', 'Éxito');
                        return updateCategoriaSuccess({ categoria: updatedCategoria });
                    }),
                    catchError(error => {
                        this.toastr.error('Error al actualizar la categoría', 'Error');
                        return of(updateCategoriaFail({ error }));
                    })
                )
            )
        )
    );

    // Efecto para eliminar una categoría con notificación de éxito y error
    deleteCategoriaEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteCategoriaAction),
            exhaustMap(({ id }) =>
                this.categoriaService.deleteCategoria(id).pipe(
                    map(() => {
                        this.toastr.success('Categoría eliminada exitosamente', 'Éxito');
                        return deleteCategoriaSuccess({ id });
                    }),
                    catchError(error => {
                        this.toastr.error('Error al eliminar la categoría', 'Error');
                        return of(deleteCategoriaFail({ error }));
                    })
                )
            )
        )
    );
}
