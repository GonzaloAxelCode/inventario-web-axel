import { CreateVenta, Venta } from '@/app/models/venta.models';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { URL_BASE } from './utils/endpoints';

@Injectable({
    providedIn: 'root',
})
export class VentaService {
    private siteURL = URL_BASE + "/api";
    private http = inject(HttpClient);

    // Obtener ventas por tienda
    getVentasPorTienda(tiendaId: number): Observable<Venta[]> {
        return this.http.get<Venta[]>(`${this.siteURL}/ventas/tienda/${tiendaId}/`).pipe(
            catchError(error => {
                console.error('Error al obtener ventas por tienda', error);
                return throwError(error);
            })
        );
    }

    // Crear una nueva venta
    createVenta(venta: CreateVenta): Observable<Venta> {
        return this.http.post<Venta>(`${this.siteURL}/ventas/crear/`, venta).pipe(
            catchError(error => {
                console.error('Error al crear la venta', error);
                return throwError(error);
            })
        );
    }
    // Cancelar una venta
    cancelarVenta(ventaId: number): Observable<Venta> {
        return this.http.patch<Venta>(`${this.siteURL}/ventas/cancelar/${ventaId}/`, {}).pipe(
            catchError(error => {
                console.error('Error al cancelar la venta', error);
                return throwError(error);
            })
        );
    }

}
