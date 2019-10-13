import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Main from './pages/main';
import Usuario from './pages/usuario';

const Routes = () => (
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/usuarios/:id" component={Usuario} />
    </Switch>
    </BrowserRouter>
);

export default Routes