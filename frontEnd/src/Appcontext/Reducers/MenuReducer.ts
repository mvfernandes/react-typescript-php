export const IMenuTypes = {
    OPEN_MENU: 'OPEN_MENU',
    SET_LIST_MENU: 'SET_LIST_MENU'
}

export interface IListMenuState {
    id: string
    icon: string
    text: string
    route: string
}

export interface IMENUACTION {
    type: 'OPEN_MENU' | 'SET_LIST_MENU'
    payload: any,
    reducer: 'MENU'
}

interface IinitialState {
    openMenu: boolean,
    listMenu: IListMenuState[]
}

interface IMenu {
    initialState: IinitialState
    MENU(state: { openMenu: boolean, listMenu: IinitialState["listMenu"] }, action: IMENUACTION): IinitialState
}

export const Menu: IMenu = {
    initialState: {
        openMenu: false,
        listMenu: []
    },
    MENU: (state = Menu.initialState, action) => {
        switch (action.type) {
            case 'OPEN_MENU':
                return { ...state, openMenu: action.payload };
            case 'SET_LIST_MENU':
                return { ...state, listMenu: action.payload };
            default:
                return state;
        }
    }
}