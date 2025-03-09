import { User } from '@/app/models/user.models';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { URL_BASE } from './utils/endpoints';


@Injectable({
    providedIn: 'root',
})
export class UserService {
    private siteURL = `${URL_BASE}/api`;
    private http = inject(HttpClient);

    // Obtener todos los usuarios
    fetchUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.siteURL}/usuarios/`).pipe(
            catchError(error => {
                console.error(error);
                return throwError(error);
            })
        );
    }

    // Crear un usuario
    createUser(user: Partial<User>): Observable<User> {
        return this.http.post<User>(`${this.siteURL}/usuarios/create/`, user).pipe(
            catchError(error => {
                console.error(error);
                return throwError(error);
            })
        );
    }

    // Actualizar un usuario
    updateUser(user: Partial<User>): Observable<User> {
        return this.http.put<User>(`${this.siteURL}/usuarios/update/${user.id}/`, user).pipe(
            catchError(error => {
                console.error(error);
                return throwError(error);
            })
        );
    }

    // Desactivar un usuario (cambiar is_active)
    desactivateUser(id: number, is_active: boolean): Observable<User> {
        return this.http.patch<User>(`${this.siteURL}/usuarios/update/${id}/`, { is_active }).pipe(
            catchError(error => {
                console.error(error);
                return throwError(error);
            })
        );
    }

    // Eliminar un usuario
    deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.siteURL}/usuarios/delete/${id}/`).pipe(
            catchError(error => {
                console.error(error);
                return throwError(error);
            })
        );
    }
}
