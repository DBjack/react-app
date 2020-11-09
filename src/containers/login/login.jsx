import React, { Component } from 'react';
import { NavBar, Button, List, InputItem, WhiteSpace,Radio,WingBlank } from 'antd-mobile'

import Logo from '../../components/logo/logo.jsx'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userName:'',
            password:'',
         }
    }

    handleChange=(type,val)=>{
        this.setState({
            ['type']:val
        })
    }

    login=()=>{

    }

    toRegister=()=>{
        this.props.history.push('/register')
    }

    render() { 
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
 
export default Register;