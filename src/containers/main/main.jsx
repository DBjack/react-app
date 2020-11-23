import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink,Switch, Redirect } from 'react-router-dom'
import {NavBar } from 'antd-mobile'
import  Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { getRedirectTo } from '../../utils';
import {getUserInfo,getWorkInfo } from '../../redux/action'

import BossInfo from '../bossinfo/bossinfo'
import WorkerInfo from '../workerinfo/workerinfo'
import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Personal from '../personal/personal'
import Detail from '../detail/detail'
import Chat from '../chat/chat'
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
            path:'/laoban'
        },
        {
            title:'大神',
            icon:'dashen',
            path:'/dashen'
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
        const userid = Cookies.get('userid')
        const { user } = this.props
        
        if(userid && !user.id){
            this.props.getUserInfo()
        }
        this.props.getWorkInfo()
    }
    render() {
        const { navList} = this
        const { pathname} = this.props.history.location
        
        const {user } = this.props
        const _id = Cookies.get('userid')

        // 如果_id不存在，直接跳转到登录页
        if(!_id){
            return <Redirect to='/login'></Redirect>
        }else{
            // 如果_id存在，useid不存在，说明没有操作登录，但是之前登陆过
            if(!user._id){
                return null
            }else {
                if(pathname === '/'){
                    const redirectTo = getRedirectTo(user.type,user.header)
                    return <Redirect to={redirectTo}></Redirect>
                }
            }
        }


        // 如果是主界面路由显示头部和底部
        const mainPath =navList.find(nav=>nav.path==pathname)
        return ( 
            <div>
                {mainPath ? <NavBar>主页</NavBar> : null}
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/workerinfo' component={WorkerInfo}></Route>
                    <Route path='/laoban' component={Laoban}></Route>
                    <Route path='/dashen' component={Dashen}></Route>
                    <Route path='/message' component={Message}></Route>
                    <Route path='/personal'  component={Personal}></Route>
                    <Route path='/detail/:userid'  component={Detail}></Route>
                    <Route path='/chat/:userid'  component={Chat}></Route>
                </Switch>
                {mainPath ? <FooterBar  navList={navList} ></FooterBar> : null}
                </div>
         );
    }
}
 
export default connect(
    state=>({user:state.user}),
    {
        getUserInfo,
        getWorkInfo
    }
)(Main);