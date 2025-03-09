import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { UserService } from '@/app/services/user.service';
import {
    createUserAction, createUserFail, createUserSuccess,
    deleteUserAction, deleteUserFail, deleteUserSuccess,
    desactivateUserAction, desactivateUserFail, desactivateUserSuccess,
    loadUsersAction, loadUsersFail, loadUsersSuccess,
    updateUserAction, updateUserFail, updateUserSuccess
} from '../actions/user.actions';
import { AppState } from '../app.state';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private store: Store<AppState>,
        private toastr: ToastrService // Servicio de notificaciones
    ) { }

    // Efecto para cargar usuarios
    loadUsersEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUsersAction),
            exhaustMap(() =>
                this.userService.fetchUsers().pipe(
                    map(users => loadUsersSuccess({ users })),
                    catchError(error => of(loadUsersFail({ error })))
                )
            )
        )
    );

    // Efecto para crear un usuario
    createUserEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(createUserAction),
            exhaustMap(({ user }) =>
                this.userService.createUser(user).pipe(
                    map((data: any) => {
                        this.toastr.success('Usuario creado exitosamente', 'Éxito');
                        return createUserSuccess({ user: data.user });
                    }),
                    catchError(error => {
                        this.toastr.error('Error al crear el usuario', 'Error');
                        return of(createUserFail({ error }));
                    })
                )
            )
        )
    );

    // Efecto para actualizar un usuario
    updateUserEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(updateUserAction),
            exhaustMap(({ user }) =>
                this.userService.updateUser(user).pipe(
                    map((res: any) => {
                        this.toastr.success('Usuario actualizado exitosamente', 'Éxito');
                        return updateUserSuccess({ user: res.user });
                    }),
                    catchError(error => {
                        this.toastr.error('Error al actualizar el usuario', 'Error');
                        return of(updateUserFail({ error }));
                    })
                )
            )
        )
    );

    // Efecto para desactivar un usuario
    desactivateUserEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(desactivateUserAction),
            exhaustMap(({ id, is_active }) =>
                this.userService.desactivateUser(id, is_active).pipe(
                    map(() => {
                        this.toastr.success('Usuario actualizado', 'Éxito');
                        return desactivateUserSuccess({ id });
                    }),
                    catchError(error => {
                        this.toastr.error('Error al actualizar el usuario', 'Error');
                        return of(desactivateUserFail({ error }));
                    })
                )
            )
        )
    );

    // Efecto para eliminar un usuario
    deleteUserEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteUserAction),
            exhaustMap(({ id }) =>
                this.userService.deleteUser(id).pipe(
                    map(() => {
                        this.toastr.success('Usuario eliminado exitosamente', 'Éxito');
                        return deleteUserSuccess({ id });
                    }),
                    catchError(error => {
                        this.toastr.error('Error al eliminar el usuario', 'Error');
                        return of(deleteUserFail({ error }));
                    })
                )
            )
        )
    );
}
