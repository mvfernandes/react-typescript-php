import { IREDUCERS_ACTION } from "Appcontext/types";


export interface ILogado {
    id: string | number,
}

export const setTaxas = (logado: ILogado) => ({
    type: 'SET_LOGADO',
    payload: logado,
    reducer: 'LOGADO'
});

const INITIAL_STATE: ILogado = {
    id: '',
};

const ACTIONS = (state = { LOGADO: INITIAL_STATE }, action: IREDUCERS_ACTION) => {
    switch (action.type) {
        case 'SET_LOGADO':
            const logado = { ...state.LOGADO, ...action.payload };
            return { taxas: logado };
        default:
            return state;
    }
}

export const LOGADO = {
    INITIAL_STATE,
    ACTIONS
}