import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink,Switch } from 'react-router-dom'


import BossInfo from '../bossinfo/bossinfo'
import WorkerInfo from '../workerinfo/workerinfo'


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Switch>
                <Route path='/bossinfo' component={BossInfo}></Route>
                <Route path='/workerinfo' component={WorkerInfo}></Route>
            </Switch>
         );
    }
}
 
export default Main;