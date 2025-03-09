import { User } from '@/app/models/user.models';
import { clearTokensLocalstorage } from '@/app/services/utils/localstorage-functions';
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
    loadUsersAction,
    loadUsersFail,
    loadUsersSuccess,
    updateUserAction,
    updateUserFail,
    updateUserSuccess
} from '../actions/user.actions';

export interface UserState {
    users: User[];
    loadingUsers: boolean;
    errors: any;
}

const initialState: UserState = {
    users: [],
    loadingUsers: false,
    errors: {}
};

export const userReducer = createReducer(
    initialState,

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
        clearTokensLocalstorage()
        return {
            ...state,
            isAuthenticated: false,
            refreshToken: '',
            accessToken: '',
        }
    })
);
