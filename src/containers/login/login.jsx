import React, { Component } from 'react';
import { NavBar, Button, List, InputItem, WhiteSpace,Radio,WingBlank, Toast } from 'antd-mobile'
import { connect} from 'react-redux'
import {login } from '../../redux/action'
import Logo from '../../components/logo/logo.jsx'
import { Redirect } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userName:'',
            password:'',
            isLogin:false
         }
    }

    handleChange=(type,val)=>{
        this.setState({
        [type]:val
        })
    }

    login=()=>{
        this.setState({
            isLogin:true
        })
        this.props.login(this.state)
    }

    toRegister=()=>{
        this.props.history.push('/register')
    }

    render() {
        const {isLogin} = this.state
        const {redirectTo,msg }  = this.props.user
        console.log(msg,111)
        if(redirectTo){
            return <Redirect to={redirectTo}></Redirect>
        }
        if(msg && isLogin){
            Toast.info(msg)
            this.setState({
                isLogin:false
            })
        }
        return ( 
            <div>
                <NavBar>注册</NavBar>
                <Logo></Logo>
                <WingBlank>
                <List>
                    <InputItem onChange={val=>this.handleChange('userName',val)}>用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem onChange={val=>this.handleChange('password',val)}>密码</InputItem>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.login}>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.toRegister}>还没有账户</Button>
                </List>
                </WingBlank>
            </div>
         );
    }
}
 
export default connect(
    state=>({user:state.user}),
    {login}
)(Register);