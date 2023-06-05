import React, { createContext, useReducer } from 'react';


export const GlobalContext = createContext({});


const globalInitialState = {
    auth: {
        isLogged: !!sessionStorage.getItem('token'),
        user: null,
        isClient: false,
        isAdmin: false,
        token:null,
        data: [],
    },
    register: {
        user: null,
        error: null,
    },
    theme: {
        mode: 'light',
    },
};

const globalReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
      const { token, email } = action.payload;
      const parsedToken = JSON.parse(token);
      sessionStorage.setItem('token', token);

      return {
        ...state,
        auth: {
          ...state.auth,
          isLogged: true,
          token: parsedToken,
          user: email,
          isAdmin: parsedToken.data.rol === 'admin', 
          isClient:parsedToken.data.rol === 'usuario',
        },
      };
    case 'LOGOUT':
      sessionStorage.clear();
      return {
        ...state,
        auth: {
          ...state.auth,
          isLogged: false,
          isAdmin: false, 
          isClient:false,
          user:null
        },
      };
        case 'REGISTER_SUCCESS':
        case 'REGISTER_ERROR':
            return {
                ...state,
                register: (state.register, action),
            };
        case 'SET_CLIENT':
        case 'SET_ADMIN':
            return {
                ...state,
                auth: (state.auth, action),
            };
        case 'TOGGLE_THEME':
            return {
                ...state,
                theme: (state.theme, action),
            };
        default:
            return state;
    }
};




const GlobalContextProvider = ({ children }) => {
    // Initialize the state using the global reducer and initial state
    const [state, dispatch] = useReducer(globalReducer, globalInitialState);

    const contextValue = { state, dispatch };

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider;