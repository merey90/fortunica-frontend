import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import HomePage from './pages/home-page';
import NotFoundPage from './pages/not-found-page';
import Client from './../containers/client/client';
import User from './../containers/user/user';

class AppRoute extends Component {
    render() {
        const history = createHistory();
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/client" component={Client}/>
                    <Route path="/user" component={User}/>
                    <Route path="*" component={NotFoundPage}/>
                </Switch>
            </Router>
        );
    }
}

export default AppRoute;