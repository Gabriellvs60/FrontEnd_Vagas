import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Main from './pages/main';
import Usuario from './pages/usuario';
import CadastroUsuario from './pages/cadastroUsuario';

const Routes = () => (
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/usuarios/:id" component={Usuario} />
        <Route path="/cadastroUsuario/" component={CadastroUsuario} />
    </Switch>
    </BrowserRouter>
);

export default Routes