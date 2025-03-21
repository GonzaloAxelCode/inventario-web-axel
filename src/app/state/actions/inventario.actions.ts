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

    ACTUALIZAR_INVENTARIO = '[Inventario] Actualizacion',
    ACTUALIZAR_INVENTARIO_SUCCESS = '[Inventario] Actualizacion Success',
    ACTUALIZAR_INVENTARIO_FAIL = '[Inventario] Actualizacion Fail',


    VERIFICAR_STOCK = '[Inventario] Verificar Stock',
    VERIFICAR_STOCK_SUCCESS = '[Inventario] Verificar Stock Success',
    VERIFICAR_STOCK_FAIL = '[Inventario] Verificar Stock Fail',
    ELIMINAR_INVENTARIO = '[Inventario] Eliminar Inventario',
    ELIMINAR_INVENTARIO_SUCCESS = '[Inventario] Eliminar Inventario Success',
    ELIMINAR_INVENTARIO_FAIL = '[Inventario] Eliminar Inventario Fail'
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
export const actualizarInventario = createAction(
    InventarioActionTypes.ACTUALIZAR_INVENTARIO,
    props<{ newInventario: Partial<Inventario> }>()
);
export const actualizarInventarioSuccess = createAction(
    InventarioActionTypes.ACTUALIZAR_INVENTARIO_SUCCESS,
    props<{ newInventario: Partial<Inventario> }>()
);
export const actualizarInventarioFail = createAction(
    InventarioActionTypes.ACTUALIZAR_INVENTARIO_FAIL,
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
//eliminar
export const eliminarInventarioAction = createAction(
    InventarioActionTypes.ELIMINAR_INVENTARIO,
    props<{ inventarioId: number }>()
);
export const eliminarInventarioSuccess = createAction(
    InventarioActionTypes.ELIMINAR_INVENTARIO_SUCCESS,
    props<{ inventarioId: number }>()
);
export const eliminarInventarioFail = createAction(
    InventarioActionTypes.ELIMINAR_INVENTARIO_FAIL,
    props<{ error: any }>()
);

