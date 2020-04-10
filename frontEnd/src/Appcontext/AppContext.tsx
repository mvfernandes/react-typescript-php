import React from 'react';
import { Menu } from './Reducers/MenuReducer';
import { Toast } from './Reducers/ToastReducer';
import { ICombinedReducers, IREDUCERS_ACTION } from './types';
import { LOGADO } from './Reducers/Logado';

// const initialStates = { ...Menu.initialState, ...Toast.initialState };
// const combinedReducers:any = { MENU: Menu.MENU, TOAST: Toast.TOAST };

// const REDUCERS = (state = initialStates, action: any) => {

//     if (Object.keys(combinedReducers).includes(action.reducer)) {
//         return combinedReducers[action.reducer](state, action);
//     }
//     return undefined;
// }

// export const AppContext = React.createContext({}as any);

// export const AppContextProvider = (props: { children: JSX.Element }) => {

//     const [state, dispatch] = React.useReducer(REDUCERS, initialStates);

//     return (
//         <AppContext.Provider value={{ state, dispatch }}>
//             {props.children}
//         </AppContext.Provider>
//     )
// };


interface IInitial {
    [string: string]: any
}

const initialStates = { ...Menu.initialState, ...Toast.initialState, LOGADO: LOGADO.INITIAL_STATE };

const combinedReducers: ICombinedReducers = { MENU: Menu.MENU, TOAST: Toast.TOAST, LOGADO: LOGADO.ACTIONS };

const REDUCERS = (state = initialStates, action: IREDUCERS_ACTION) => {

    const Keys: string[] = Object.keys(combinedReducers);

    if (Keys.find(str => str === action.reducer)) {
        return combinedReducers[action.reducer](state, action);
    }
    return;
};

export const AppContext = React.createContext<{ state: IInitial, dispatch: Function }>({
    state: initialStates,
    dispatch: REDUCERS
});

export const AppContextProvider = (props: { children: JSX.Element }) => {

    const [state, dispatch] = React.useReducer(REDUCERS, initialStates);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {props.children}
        </AppContext.Provider>
    );
};

