/**
 * 入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {Provider } from 'react-redux'
import {store} from './redux/store.js'

import Register from './containers/register/register.jsx'
import Login from './containers/login/login.jsx'
import Main from './containers/main/main.jsx'

import ('./assets/css/global.scss')
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path='/' exact component={Login}></Route>
                <Route path='/register' component={Register}></Route>
                <Route path='/login' component={Login}></Route>
                <Route component={Main}></Route>
            </Switch>
        </Router>
    </Provider>
,document.getElementById('root'))