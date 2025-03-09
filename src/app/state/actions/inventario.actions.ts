import { Inventario, InventarioCreate } from '@/app/models/inventario.models';
import { createAction, props } from '@ngrx/store';

export enum InventarioActionTypes {
    LOAD_INVENTARIOS = '[Inventario] Load Inventarios',
    LOAD_INVENTARIOS_SUCCESS = '[Inventario] Load Inventarios Success',
    LOAD_INVENTARIOS_FAIL = '[Inventario] Load Inventarios Fail',

    CREATE_INVENTARIO = '[Inventario] Create Inventario',
    CREATE_INVENTARIO_SUCCESS = '[Inventario] Create Inventario Success',
    CREATE_INVENTARIO_FAIL = '[Inventario] Create Inventario Fail',

    UPDATE_STOCK = '[Inventario] Update Stock',
    UPDATE_STOCK_SUCCESS = '[Inventario] Update Stock Success',
    UPDATE_STOCK_FAIL = '[Inventario] Update Stock Fail',

    AJUSTAR_STOCK = '[Inventario] Ajustar Stock',
    AJUSTAR_STOCK_SUCCESS = '[Inventario] Ajustar Stock Success',
    AJUSTAR_STOCK_FAIL = '[Inventario] Ajustar Stock Fail',

    VERIFICAR_STOCK = '[Inventario] Verificar Stock',
    VERIFICAR_STOCK_SUCCESS = '[Inventario] Verificar Stock Success',
    VERIFICAR_STOCK_FAIL = '[Inventario] Verificar Stock Fail'
}

// Cargar inventarios por producto o tienda
export const loadInventarios = createAction(
    InventarioActionTypes.LOAD_INVENTARIOS,
    props<{ tiendaId: number }>()
);
export const loadInventariosSuccess = createAction(
    InventarioActionTypes.LOAD_INVENTARIOS_SUCCESS,
    props<{ inventarios: Inventario[] }>()
);
export const loadInventariosFail = createAction(
    InventarioActionTypes.LOAD_INVENTARIOS_FAIL,
    props<{ error: any }>()
);

// Crear inventario
export const createInventario = createAction(
    InventarioActionTypes.CREATE_INVENTARIO,
    props<{ inventario: InventarioCreate }>()
);
export const createInventarioSuccess = createAction(
    InventarioActionTypes.CREATE_INVENTARIO_SUCCESS,
    props<{ inventario: Inventario }>()
);
export const createInventarioFail = createAction(
    InventarioActionTypes.CREATE_INVENTARIO_FAIL,
    props<{ error: any }>()
);

// Actualizar stock
export const updateStock = createAction(
    InventarioActionTypes.UPDATE_STOCK,
    props<{ inventarioId: number; cantidad: number }>()
);
export const updateStockSuccess = createAction(
    InventarioActionTypes.UPDATE_STOCK_SUCCESS,
    props<{ inventario: Inventario }>()
);
export const updateStockFail = createAction(
    InventarioActionTypes.UPDATE_STOCK_FAIL,
    props<{ error: any }>()
);

// Ajustar stock
export const ajustarStock = createAction(
    InventarioActionTypes.AJUSTAR_STOCK,
    props<{ inventarioId: number; cantidad: number }>()
);
export const ajustarStockSuccess = createAction(
    InventarioActionTypes.AJUSTAR_STOCK_SUCCESS,
    props<{ inventarioId: number, cantidad: number }>()
);
export const ajustarStockFail = createAction(
    InventarioActionTypes.AJUSTAR_STOCK_FAIL,
    props<{ error: any }>()
);

// Verificar stock
export const verificarStock = createAction(
    InventarioActionTypes.VERIFICAR_STOCK,
    props<{ inventarioId: number }>()
);
export const verificarStockSuccess = createAction(
    InventarioActionTypes.VERIFICAR_STOCK_SUCCESS,
    props<{ estado: string; inventario: Inventario }>()
);
export const verificarStockFail = createAction(
    InventarioActionTypes.VERIFICAR_STOCK_FAIL,
    props<{ error: any }>()
);
