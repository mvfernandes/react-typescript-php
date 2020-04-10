import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { IMenuProps, IMenuState } from './types';
import { AppContext } from 'Appcontext/AppContext';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuService from 'Services/MenuService';
import Icones from './Icones';
import { IMenuTypes, IListMenuState } from 'Appcontext/Reducers/MenuReducer';
import { withRouter } from "react-router-dom";


class Menu extends React.PureComponent<IMenuProps, IMenuState> {
    static contextType = AppContext;

    private service = new MenuService();

    private toggleDrawer = (open: boolean) => {
        this.context.dispatch({ type: IMenuTypes.OPEN_MENU, payload: open, reducer: 'MENU' });
    }

    private pushMenu = (route: string) => {
        if ('/' + route !== this.props.history.location.pathname) {

            sessionStorage.setItem('_route', route);
            this.props.history.push(route);
        }
    }

    componentDidMount = () => {
        this.service.getMenus()
            .then((Result: any) => {
                this.context.dispatch({ type: IMenuTypes.SET_LIST_MENU, payload: Result.Data, reducer: 'MENU' });
                setTimeout(() => {
                    const route = sessionStorage.getItem('_route');
                    if (route && route !== "/") {
                        this.pushMenu(route);
                    }
                }, 500)
            })
            .catch(msg => console.log(msg));
    }

    render() {

        if (this.context.state.listMenu.length === 0) return null;

        return (
            <SwipeableDrawer
                open={this.context.state.openMenu}
                onClose={() => this.toggleDrawer(false)}
                onOpen={() => this.toggleDrawer(true)}
            >
                <div
                    role="presentation"
                    style={{ width: 250, padding: 10 }}
                    onClick={() => this.toggleDrawer(false)}
                    onKeyDown={() => this.toggleDrawer(false)}
                >
                    <List>
                        {
                            this.context.state.listMenu.map((menu: IListMenuState) => {
                                return (

                                    <ListItem
                                        key={menu.id}
                                        button
                                        onClick={() => this.pushMenu(menu.route)}
                                    >
                                        <ListItemIcon>{<Icones icone={menu.icon} />}</ListItemIcon>
                                        <ListItemText primary={menu.text} />
                                    </ListItem>

                                )
                            })
                        }
                        <Divider />
                    </List>
                </div>
            </SwipeableDrawer >
        )
    }
}

export default withRouter(Menu);