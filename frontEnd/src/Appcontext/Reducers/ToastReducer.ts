export const IToastTypes = {
    SHOW: 'SHOW_TOAST',
}

export interface IToastState {
    type: 'success' | 'warning' | 'info' | 'danger'
    message: string
}

export interface ITOASTACTION {
    type: 'SHOW_TOAST'
    payload: any,
    reducer: 'TOAST'
}

export const showToastModel = (type: IToastState['type'], message: string) => ({
    type: 'SHOW_TOAST',
    payload: { type, message },
    reducer: 'TOAST'
})

interface IinitialState {
    TOAST: IToastState
}

interface IToast {
    initialState: IinitialState
    TOAST(state: IinitialState, action: ITOASTACTION): IinitialState
}

export const Toast: IToast = {
    initialState: {
        TOAST: { type: 'success', message: '' }
    },
    TOAST: (state = Toast.initialState, action) => {
        switch (action.type) {
            case IToastTypes.SHOW:
                return { ...state, TOAST: action.payload };
            default:
                return state;
        }
    }
}