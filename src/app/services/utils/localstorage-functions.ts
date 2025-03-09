

import { TokenPair } from "src/app/models/auth.models";



export function getTokensFromLocalStorage(): TokenPair {
    if (typeof window !== 'undefined' && window.localStorage) {
        const accessToken = localStorage?.getItem('accessToken') || '';
        const refreshToken = localStorage?.getItem('refreshToken') || '';
        return {
            accessToken: accessToken || '',
            refreshToken: refreshToken || '',
        };
    }
    return {
        accessToken: '',
        refreshToken: '',
    };
}

export function saveTokensToLocalStorage(tokens: TokenPair) {
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('accessToken', tokens?.accessToken || '');
        localStorage.setItem('refreshToken', tokens?.refreshToken || '');
    }
}

export function clearTokensLocalstorage() {
    localStorage?.removeItem('accessToken');
    localStorage?.removeItem('refreshToken');
}



