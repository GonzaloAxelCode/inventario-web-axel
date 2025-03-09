import { Inventario } from '@/app/models/inventario.models';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { URL_BASE } from './utils/endpoints';

@Injectable({
    providedIn: 'root',
})
export class InventarioService {
    private siteURL = URL_BASE + '/api';
    private http = inject(HttpClient);
    // Obtener inventarios por tienda
    fetchInventariosPorTienda(tiendaId: number): Observable<Inventario[]> {
        return this.http.get<Inventario[]>(`${this.siteURL}/inventarios/tienda/${tiendaId}/`).pipe(
            catchError(error => throwError(error))
        );
    }

    // Crear nuevo inventario
    createInventario(inventario: Partial<Inventario>): Observable<Inventario> {
        return this.http.post<Inventario>(`${this.siteURL}/inventarios/create/`, inventario).pipe(
            catchError(error => {
                console.log(error)
                return throwError(error)
            })
        );
    }

    // Actualizar stock (agregar cantidad)
    updateStock(inventarioId: number, cantidad: number): Observable<any> {
        return this.http.patch(`${this.siteURL}/inventarios/actualizar-stock/${inventarioId}/`, { cantidad }).pipe(
            catchError(error => throwError(error))
        );
    }

    // Ajustar stock (sumar o restar cantidad)
    ajustarStock(inventarioId: number, cantidad: number): Observable<any> {
        return this.http.patch(`${this.siteURL}/inventarios/ajustar-stock/${inventarioId}/`, { cantidad }).pipe(
            catchError(error => throwError(error))
        );
    }

    // Verificar stock de un inventario
    verificarStock(inventarioId: number): Observable<any> {
        return this.http.get(`${this.siteURL}/inventarios/verificar-stock/${inventarioId}/`).pipe(
            catchError(error => throwError(error))
        );
    }
}
