import React, { useMemo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Menu from './Components/Menu';
import NavBar from './Components/Navbar';
import Routes from './Routes';
import { HashRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SnackBarComp from 'Components/UI/SnacBarComp';
import { Container, CustomTheme } from './StyleApp';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: '#fff',
      main: '#661484',
      // dark: '#000'
    },
    // secondary: {
    //   main: '#f44336',
    // },
  }
});

const App: React.FC = () => {

  return useMemo(() => (
    <MuiThemeProvider theme={theme}>

      <HashRouter>

        <CssBaseline />
        <CustomTheme />

        <NavBar />
        <Menu />

        <Container pt={75}>
          <Routes />
        </Container>


        <SnackBarComp />

      </HashRouter>
    </MuiThemeProvider>

  ), [])

}
export default React.memo(App);
