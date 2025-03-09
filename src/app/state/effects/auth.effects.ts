import { AuthService } from '@/app/services/auth.service';
import { saveTokensToLocalStorage } from '@/app/services/utils/localstorage-functions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import {
    checkTokenAction,
    checkTokenActionFail,
    checkTokenActionSuccess,
    loginInAction,
    loginInActionFail,
    loginInActionSuccess
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions, private authService: AuthService) { }

    // eslint-disable-next-line unicorn/consistent-function-scoping
    loginEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(loginInAction),
            exhaustMap(({ username, password }) =>
                this.authService.fetchCreateToken({ username, password }).pipe(
                    map((response: any) => {
                        saveTokensToLocalStorage({
                            accessToken: response?.access,
                            refreshToken: response?.refresh,
                        });

                        return loginInActionSuccess({
                            refreshToken: response?.refresh,
                            accessToken: response?.access,
                            isAuthenticated: true,
                            isLoadingLogin: false,
                            isLoadingLogout: false,
                        });
                    }),
                    catchError((error) =>
                        of(
                            loginInActionFail({
                                refreshToken: '',
                                accessToken: '',
                                isAuthenticated: false,
                                errors: error?.error,
                                isLoadingLogin: false,
                                isLoadingLogout: false,
                            })
                        )
                    )
                )
            )
        )
    );

    // eslint-disable-next-line unicorn/consistent-function-scoping
    checkTokenEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(checkTokenAction),
            exhaustMap(() =>
                this.authService.fetchCheckAuthenticated().pipe(
                    map((response: any) =>
                        response ? checkTokenActionSuccess() : checkTokenActionFail()
                    ),
                    catchError(() => of(checkTokenActionFail()))
                )
            )
        )
    );
}
