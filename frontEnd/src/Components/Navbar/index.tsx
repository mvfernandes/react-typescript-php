import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AppContext } from '../../Appcontext/AppContext';
import MenuService from 'Services/MenuService';

const NavBar = () => {
    const service = new MenuService();
    const contextType: any = React.useContext(AppContext);

    const toggleDrawer = React.useCallback((open: boolean) => {
        contextType.dispatch({ type: 'OPEN_MENU', payload: open, reducer: 'MENU' })
    }, [contextType]);

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton onClick={() => toggleDrawer(true)} edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" >PHP React</Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={async () => {
                            await service.logout();
                            window.location.reload();
                        }}
                    >
                        <ExitToAppIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default React.memo(NavBar);