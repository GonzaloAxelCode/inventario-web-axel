import { Venta } from '@/app/models/venta.models';
import { createReducer, on } from '@ngrx/store';
import {
    cancelarVenta,
    cancelarVentaError,
    cancelarVentaExito,
    cargarVentasTienda,
    cargarVentasTiendaError,
    cargarVentasTiendaExito,
    crearVenta,
    crearVentaError,
    crearVentaExito
} from '../actions/venta.actions';

export interface VentaState {
    ventas: Venta[];
    loading: boolean;
    error?: any;
}

export const initialState: VentaState = {
    ventas: [],
    loading: false,
    error: null
};

export const ventaReducer = createReducer(
    initialState,

    // Cargar ventas por tienda
    on(cargarVentasTienda, state => ({
        ...state,
        loading: true
    })),
    on(cargarVentasTiendaExito, (state, { ventas }) => ({
        ...state,
        ventas,
        loading: false
    })),
    on(cargarVentasTiendaError, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),

    // Crear venta
    on(crearVenta, state => ({
        ...state,
        loading: true
    })),
    on(crearVentaExito, (state, { venta }) => ({
        ...state,
        ventas: [...state.ventas, venta],
        loading: false
    })),
    on(crearVentaError, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),
    on(cancelarVenta, state => ({
        ...state,
        loading: true
    })),
    on(cancelarVentaExito, (state, { ventaId }) => ({
        ...state,
        ventas: state.ventas.map(venta =>
            venta.id === ventaId ? { ...venta, estado: 'Cancelada' } : venta
        ),
        loading: false
    })),
    on(cancelarVentaError, (state, { error }) => ({
        ...state,
        error,
        loading: false
    }))
);
