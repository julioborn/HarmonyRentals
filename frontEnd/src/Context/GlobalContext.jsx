import React, { createContext, useReducer } from 'react';

export const GlobalContext = createContext({});

const globalInitialState = {
    auth: {
        isLogged: !!sessionStorage.getItem('token'),
        usuario: null,
        nombre: null,
        apellido: null,
          isClient: false,
        isAdmin: false,
        token: null,
        data: [],
        
    },
    dates:{
        startDate:null,
        endDate:null,
    },

    register: {
        user: null,
        error: null,
    },
    theme: {
        mode: 'light',
        light: {
            primaryColor: '#16213E',
            backgroundColor: '#FFFFFF',
            fontColor: '#16213E',
        },
        dark: {
            primaryColor: '#FFFFFF',
            backgroundColor: '#16213E',
            fontColor: '#FFFFFF',
        },
    },
    favorites: [],
};

const globalReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                auth: {
                    isLogged: true,
                    user: action.payload.user,
                    isClient: false,
                    isAdmin: false,
                    token: null,
                    data: [],
                },
            };
        case 'LOGOUT':
            return {
                ...state,
                auth: {
                    isLogged: false,
                    user: null,
                    isClient: false,
                    isAdmin: false,
                    token: null,
                    data: [],
                },
            };
        case 'REGISTER':
            return {
                ...state,
                register: {
                    user: action.payload.user,
                    error: action.payload.error,
                },
            };
        case 'ADD_FAVORITE':
            const newFavorites = [...state.favorites, action.payload];
            return {
                ...state,
                favorites: newFavorites,
            };
        case 'SET_FAVORITES':
            return {
                ...state,
                favorites: action.payload,
            };
        case 'REMOVE_FAVORITE':
            const favoritoId = action.payload;
            const updatedFavorites = state.favorites.filter(
                (favorito) => favorito.id !== favoritoId
            );
            return {
                ...state,
                favorites: updatedFavorites,
            };
        case 'REMOVE_ALL_FAVORITES':
            return {
                ...state,
                favorites: [],
            };
            
            case 'UPDATE_DATES':
                return {
                  ...state,
                  dates: {
                    
                    startDate: action.payload.startDate,
                    endDate: action.payload.endDate,
                  },
                };
        default:
            return state;
    }
};

export const GlobalContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, globalInitialState);

    return (
        <GlobalContext.Provider value={{ state, dispatch: dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};
