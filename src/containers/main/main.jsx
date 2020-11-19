import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink,Switch, Redirect } from 'react-router-dom'
import {NavBar } from 'antd-mobile'
import  Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { getRedirectTo } from '../../utils';

import BossInfo from '../bossinfo/bossinfo'
import WorkerInfo from '../workerinfo/workerinfo'
import Home from '../home/home'
import FooterBar from '../../components/footerBar/FooterBar'


class Main extends Component {
    
    constructor(props) {
        super(props);
        this.state = {  }
    }
    navList = [
        {
            title:'老板',
            icon:'laoban',
            path:'/'
        },
        {
            title:'大神',
            icon:'dashen',
            path:'/home'
        },
        {
            title:'信息',
            icon:'message',
            path:'/message'
        },
        {
            title:'个人中心',
            icon:'personal',
            path:'/personal'
        },
    ]
    componentDidMount(){
        const _id = Cookies.get('userid')
        const {userid,type,header} = this.props.user

        // 如果_id不存在，直接跳转到登录页
        if(!_id){
            return <Redirect to='/login'></Redirect>
        }else{
            // 如果_id存在，useid不存在，说明没有操作登录，但是之前登陆过
            if(userid){
                const redirectTo = getRedirectTo(type,header)
                return <Redirect to={redirectTo}></Redirect>
            }else {
                return null
            }
        }

    }
    render() { 
        const { navList} = this
        console.log(this,11)
        return ( 
            <div>
                <NavBar>主页</NavBar>
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/workerinfo' component={WorkerInfo}></Route>
                    <Route path='/home' component={Home}></Route>
                </Switch>
                <FooterBar navList={navList}></FooterBar>
            </div>
         );
    }
}
 
export default connect(
    state=>({user:state.user})
)(Main);