import { User } from '@/app/models/user.models';

import { clearAuthDataFromLocalStorage } from '@/app/services/utils/localstorage-functions';
import { createReducer, on } from '@ngrx/store';
import { clearTokensAction } from '../actions/auth.actions';
import {
    createUserAction,
    createUserFail,
    createUserSuccess,
    deleteUserAction,
    deleteUserFail,
    deleteUserSuccess,
    desactivateUserAction,
    desactivateUserFail,
    desactivateUserSuccess,
    loadUserAction,
    loadUserFail,
    loadUsersAction,
    loadUsersFail,
    loadUsersSuccess,
    loadUserSuccess,
    updateUserAction,
    updateUserFail,
    updateUserSuccess
} from '../actions/user.actions';

export interface UserState {
    users: User[];
    user: User,
    loadingUsers: boolean;
    errors: any;
}

export const initialStateUser: UserState = {
    users: [],
    loadingUsers: false,
    errors: {},
    user: {
        id: 0,
        username: '',
        first_name: '',
        last_name: '',
        photo_url: '',
        date_joined: new Date(),
        is_active: false,
        is_staff: false,
        is_superuser: false,
        es_empleado: false,
        desactivate_account: false,
        permissions: {
            can_make_sale: false,
            can_cancel_sale: false,
            can_create_inventory: false,
            can_modify_inventory: false,
            can_update_inventory: false,
            can_delete_inventory: false,
            can_create_product: false,
            can_update_product: false,
            can_delete_product: false,
            can_create_category: false,
            can_modify_category: false,
            can_delete_category: false,
            can_create_supplier: false,
            can_modify_supplier: false,
            can_delete_supplier: false,
            can_create_store: false,
            can_modify_store: false,
            can_delete_store: false,
            view_sale: false,
            view_inventory: false,
            view_product: false,
            view_category: false,
            view_supplier: false,
            view_store: false,
        }
    },
};

export const userReducer = createReducer(
    initialStateUser,

    // Cargar usuarios
    on(loadUsersAction, state => ({
        ...state,
        loadingUsers: true
    })),
    on(loadUsersSuccess, (state, { users }) => ({
        ...state,
        users,
        loadingUsers: false
    })),
    on(loadUsersFail, (state, { error }) => ({
        ...state,
        errors: error,
        loadingUsers: false
    })),

    // Crear usuario
    on(createUserAction, state => ({
        ...state,
        loadingUsers: true
    })),
    on(createUserSuccess, (state, { user }) => ({
        ...state,
        users: [...state.users, user],
        loadingUsers: false
    })),
    on(createUserFail, (state, { error }) => ({
        ...state,
        errors: error,
        loadingUsers: false
    })),

    // Actualizar usuario
    on(updateUserAction, state => ({
        ...state
    })),
    on(updateUserSuccess, (state, { user }) => ({
        ...state,
        users: state.users.map(u => u.id === user.id ? user : u)
    })),
    on(updateUserFail, (state, { error }) => ({
        ...state,
        errors: error
    })),

    // Desactivar usuario
    on(desactivateUserAction, state => ({
        ...state
    })),
    on(desactivateUserSuccess, (state, { id }) => ({
        ...state,
        users: state.users.map(user =>
            user.id === id ? { ...user, is_active: !user.is_active } : user
        )
    })),
    on(desactivateUserFail, (state, { error }) => ({
        ...state,
        errors: error
    })),

    // Eliminar usuario
    on(deleteUserAction, state => ({
        ...state
    })),
    on(deleteUserSuccess, (state, { id }) => ({
        ...state,
        users: state.users.filter(user => user.id !== id)
    })),
    on(deleteUserFail, (state, { error }) => ({
        ...state,
        errors: error
    })),
    on(clearTokensAction, (state) => {
        clearAuthDataFromLocalStorage()
        return {
            ...state,
            isAuthenticated: false,
            refreshToken: '',
            accessToken: '',
        }
    }),
    // Cargar un usuario por ID
    on(loadUserAction, state => ({
        ...state,

    })),
    on(loadUserSuccess, (state, { user }) => ({
        ...state,
        user,

    })),
    on(loadUserFail, (state, { error }) => ({
        ...state,
        errors: error,

    })),
);
