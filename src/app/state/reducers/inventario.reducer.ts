import { Inventario } from '@/app/models/inventario.models';
import { createReducer, on } from '@ngrx/store';
import {
    actualizarInventario,
    actualizarInventarioFail,
    actualizarInventarioSuccess,
    createInventario,
    createInventarioFail,
    createInventarioSuccess,
    eliminarInventarioAction,
    eliminarInventarioFail,
    eliminarInventarioSuccess,
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
    on(actualizarInventario, state => ({
        ...state,
        loading: true
    })),
    on(actualizarInventarioSuccess, (state, { newInventario }) => ({
        ...state,

        inventarios: state.inventarios.map(i =>
            i.id === newInventario.id ? { ...i, ...newInventario } : i
        ),
        loading: false
    })),
    on(actualizarInventarioFail, (state, { error }) => ({
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
    })),
    //eliminar
    on(eliminarInventarioAction, state => ({
        ...state,
        loading: true
    })),
    on(eliminarInventarioSuccess, (state, { inventarioId }) => ({
        ...state,
        inventarios: state.inventarios.filter(i => inventarioId !== i.id),
        loading: false
    })),
    on(eliminarInventarioFail, (state, { error }) => ({
        ...state,
        errors: error,
        loading: false
    }))

);

