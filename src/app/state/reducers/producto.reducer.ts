import { ProductoState } from '@/app/models/producto.models';
import { createReducer, on } from '@ngrx/store';
import {
    createProductoAction,
    createProductoFail,
    createProductoSuccess,
    deactivateProductoAction,
    deactivateProductoFail,
    deactivateProductoSuccess,
    deleteProductoAction,
    deleteProductoFail,
    deleteProductoSuccess,
    loadProductosAction,
    loadProductosFail,
    loadProductosSuccess,
    updateProductoAction,
    updateProductoFail,
    updateProductoSuccess
} from '../actions/producto.actions';

const initialState: ProductoState = {
    productos: [],
    loadingProductos: false,
    errors: {}
};

export const productoReducer = createReducer(
    initialState,
    on(loadProductosAction, state => ({
        ...state,
        loadingProductos: true
    })),
    on(loadProductosSuccess, (state, { productos }) => ({
        ...state,
        productos,
        loadingProductos: false
    })),
    on(loadProductosFail, (state, { error }) => ({
        ...state,
        errors: error,
        loadingProductos: false
    })),
    on(createProductoAction, state => ({
        ...state,
        loadingProductos: true
    })),
    on(createProductoSuccess, (state, { producto }) => ({
        ...state,
        productos: [...state.productos, { ...producto }],
        loadingProductos: false
    })),
    on(createProductoFail, (state, { error }) => ({
        ...state,
        errors: error,
        loadingProductos: false
    })),
    on(updateProductoAction, state => ({
        ...state,
    })),
    on(updateProductoSuccess, (state, { producto }) => ({
        ...state,
        productos: state.productos.map(p => p.id === producto.id ? producto : p)
    })),
    on(updateProductoFail, (state, { error }) => ({
        ...state,
        errors: error,
    })),
    on(deactivateProductoAction, state => ({
        ...state,
    })),
    on(deactivateProductoSuccess, (state, { id }) => ({
        ...state,
        productos: state.productos.map(p => p.id === id ? { ...p, activo: !p.activo } : p)
    })),
    on(deactivateProductoFail, (state, { error }) => ({
        ...state,
        errors: error,
    })),
    on(deleteProductoAction, state => ({
        ...state,
    })),
    on(deleteProductoSuccess, (state, { id }) => ({
        ...state,
        productos: state.productos.filter(p => p.id !== id)
    })),
    on(deleteProductoFail, (state, { error }) => ({
        ...state,
        errors: error,
    })),
);
