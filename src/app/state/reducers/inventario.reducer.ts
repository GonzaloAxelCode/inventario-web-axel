import { Inventario } from '@/app/models/inventario.models';
import { createReducer, on } from '@ngrx/store';
import {
    ajustarStock,
    ajustarStockFail,
    ajustarStockSuccess,
    createInventario,
    createInventarioFail,
    createInventarioSuccess,
    loadInventarios,
    loadInventariosFail,
    loadInventariosSuccess,
    updateStock,
    updateStockFail,
    updateStockSuccess,
    verificarStock,
    verificarStockFail,
    verificarStockSuccess
} from '../actions/inventario.actions';

export interface InventarioState {
    inventarios: Inventario[];
    loading: boolean;
    errors: any;
}

const initialState: InventarioState = {
    inventarios: [],
    loading: false,
    errors: null
};

export const inventarioReducer = createReducer(
    initialState,

    // Cargar inventarios
    on(loadInventarios, state => ({
        ...state,
        loading: true
    })),
    on(loadInventariosSuccess, (state, { inventarios }) => ({
        ...state,
        inventarios,
        loading: false
    })),
    on(loadInventariosFail, (state, { error }) => ({
        ...state,
        errors: error,
        loading: false
    })),

    // Crear inventario
    on(createInventario, state => ({
        ...state,
        loading: true
    })),
    on(createInventarioSuccess, (state, { inventario }) => ({
        ...state,
        inventarios: [...state.inventarios, inventario],
        loading: false
    })),
    on(createInventarioFail, (state, { error }) => ({
        ...state,
        errors: error,
        loading: false
    })),

    // Actualizar stock
    on(updateStock, state => ({
        ...state,
        loading: true
    })),
    on(updateStockSuccess, (state, { inventario }) => ({
        ...state,
        inventarios: state.inventarios.map(i => i.id === inventario.id ? inventario : i),
        loading: false
    })),
    on(updateStockFail, (state, { error }) => ({
        ...state,
        errors: error,
        loading: false
    })),

    // Ajustar stock
    on(ajustarStock, state => ({
        ...state,
        loading: true
    })),
    on(ajustarStockSuccess, (state, { inventarioId, cantidad }) => ({
        ...state,

        loading: false
    })),
    on(ajustarStockFail, (state, { error }) => ({
        ...state,
        errors: error,
        loading: false
    })),

    // Verificar stock
    on(verificarStock, state => ({
        ...state,
        loading: true
    })),
    on(verificarStockSuccess, (state, { inventario }) => ({
        ...state,
        inventarios: state.inventarios.map(i => i.id === inventario.id ? inventario : i),
        loading: false
    })),
    on(verificarStockFail, (state, { error }) => ({
        ...state,
        errors: error,
        loading: false
    }))
);

