import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from 'Routes/PrivateRoute';
import { AppContext } from 'Appcontext/AppContext';
import { IListMenuState } from "Appcontext/Reducers/MenuReducer";

class Router extends React.PureComponent {
  static contextType = AppContext;

  private auth = (route: string) =>
    this.context.state.listMenu.find((m: IListMenuState) => m.route === route);

  render() {

    return (
      <Suspense fallback={<div>Carregando...</div>}>
        <Switch>

          <Route
            exact
            path="/"
            component={lazy(() => import("Pages/Home"))}
          />

          <PrivateRoute
            exact
            isAuthenticated={this.auth("usuarios")}
            path="/usuarios"
            component={lazy(() => import("Pages/Usuarios"))}
          />

          <PrivateRoute
            isAuthenticated={this.auth("clientes")}
            exact
            path="/clientes"
            component={lazy(() => import("Pages/Clientes"))}
          />

          <PrivateRoute
            isAuthenticated={this.auth("perfil")}
            exact
            path="/perfil"
            component={lazy(() => import("Pages/Perfil"))}
          />

          <Route
            path='*'
            exact
            component={lazy(() => import("Pages/NotFound"))}
          />
        </Switch>
      </Suspense>

    );
  }
};

export default (Router);
