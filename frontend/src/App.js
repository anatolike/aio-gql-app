import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Auth from "./auth";
import Messages from "./components/Messages";

import Home from './site/pages/Home';
import Registration from './site/pages/Registration';
import Login from './site/pages/Login';

import Main from './cabinet/pages/Main'
import CabinetRoute from "./components/CabinetRoute/CabinetRoute";
import AlreadyAuthRoute from "./components/AlreadyAuthRoute";

const App = () => (
  <Messages>
    <Auth>
      <Switch>
        <Route exact path="/" component={Home} />
        <AlreadyAuthRoute exact path="/login" component={Login} />
        <AlreadyAuthRoute exact path="/registration" component={Registration} />
        <CabinetRoute exact path="/cabinet" component={Main} />
      </Switch>
    </Auth>
  </Messages>
);

export default App;
