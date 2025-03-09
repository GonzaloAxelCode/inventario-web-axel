import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getTokensFromLocalStorage } from './localstorage-functions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const { accessToken }: any = getTokensFromLocalStorage();


        if (accessToken) {
            const cloned = request.clone({
                setHeaders: {
                    Authorization: `JWT ${accessToken}`
                }
            });
            return next.handle(cloned);
        }
        return next.handle(request);
    }
}
