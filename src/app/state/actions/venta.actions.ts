import { CreateVenta, Venta } from '@/app/models/venta.models';
import { createAction, props } from '@ngrx/store';

// Definir los tipos de acción
export enum VentaActionTypes {
    CARGAR_VENTAS_TIENDA = '[Venta] Cargar Ventas por Tienda',
    CARGAR_VENTAS_TIENDA_EXITO = '[Venta] Cargar Ventas por Tienda Éxito',
    CARGAR_VENTAS_TIENDA_ERROR = '[Venta] Cargar Ventas por Tienda Error',

    CREAR_VENTA = '[Venta] Crear Venta',
    CREAR_VENTA_EXITO = '[Venta] Crear Venta Éxito',
    CREAR_VENTA_ERROR = '[Venta] Crear Venta Error',

    CANCELAR_VENTA = '[Venta] Cancelar Venta',
    CANCELAR_VENTA_EXITO = '[Venta] Cancelar Venta Exito',
    CANCELAR_VENTA_ERROR = '[Venta] Cancelar Venta Error',
}

// Acciones para obtener ventas por tienda
export const cargarVentasTienda = createAction(
    VentaActionTypes.CARGAR_VENTAS_TIENDA,
    props<{ tiendaId: number }>()
);

export const cargarVentasTiendaExito = createAction(
    VentaActionTypes.CARGAR_VENTAS_TIENDA_EXITO,
    props<{ ventas: Venta[] }>()
);

export const cargarVentasTiendaError = createAction(
    VentaActionTypes.CARGAR_VENTAS_TIENDA_ERROR,
    props<{ error: any }>()
);

// Acciones para crear una venta
export const crearVenta = createAction(
    VentaActionTypes.CREAR_VENTA,
    props<{ venta: CreateVenta }>()
);

export const crearVentaExito = createAction(
    VentaActionTypes.CREAR_VENTA_EXITO,
    props<{ venta: Venta }>()
);

export const crearVentaError = createAction(
    VentaActionTypes.CREAR_VENTA_ERROR,
    props<{ error: any }>()
);



export const cancelarVenta = createAction(
    VentaActionTypes.CANCELAR_VENTA,
    props<{ ventaId: number }>()
);

export const cancelarVentaExito = createAction(
    VentaActionTypes.CANCELAR_VENTA_EXITO,
    props<{ ventaId: number }>()
);

export const cancelarVentaError = createAction(
    VentaActionTypes.CANCELAR_VENTA_ERROR,
    props<{ error: any }>()
);