import { Producto, ProductoCreate } from '@/app/models/producto.models';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { URL_BASE } from './utils/endpoints';

@Injectable({
    providedIn: 'root',
})
export class ProductoService {
    private siteURL = URL_BASE + "/api";
    private http = inject(HttpClient);

    fetchLoadProductos(): Observable<Producto[]> {
        return this.http.get<Producto[]>(`${this.siteURL}/productos/`).pipe(
            catchError(error => throwError(error))
        );
    }

    getProducto(id: number): Observable<Producto> {
        return this.http.get<Producto>(`${this.siteURL}/productos/${id}/`).pipe(
            catchError(error => throwError(error))
        );
    }

    createProducto(producto: ProductoCreate): Observable<Producto> {
        return this.http.post<Producto>(`${this.siteURL}/productos/create/`, producto).pipe(
            catchError(error => {
                console.log(error);
                return throwError(error);
            })
        );
    }

    updateProducto(producto: Producto): Observable<Producto> {
        return this.http.put<Producto>(`${this.siteURL}/productos/update/${producto.id}/`, producto).pipe(
            catchError(error => {
                console.log(error);
                return throwError(error);
            })
        );
    }

    deactivateProducto(id: number, activo: boolean): Observable<any> {
        return this.http.patch(`${this.siteURL}/productos/update/${id}/`, { activo }).pipe(
            catchError(error => throwError(error))
        );
    }

    deleteProducto(id: number): Observable<any> {
        return this.http.delete(`${this.siteURL}/productos/delete/${id}/`).pipe(
            catchError(error => throwError(error))
        );
    }
}
