import React, { Component } from 'react';
import { NavBar, Button, List, InputItem, WhiteSpace,Radio,WingBlank } from 'antd-mobile'

import Logo from '../../components/logo/logo.jsx'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userName:'',
            password:'',
            rePassword:'',
            type:''
         }
    }

    handleChange=(type,val)=>{
        this.setState({
            ['type']:val
        })
    }

    register=()=>{

    }

    toLogin=()=>{
        this.props.history.push('/login')
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
                    <InputItem onChange={val=>this.handleChange('rePassword',val)}>确认密码</InputItem>
                    <WhiteSpace/>
                    <List.Item>
                        <span className='mr-2'>用户类型</span>
                        <Radio onChecked={val=>this.handleChange('type','boss')}>老板</Radio>
                        <Radio onChecked={val=>this.handleChange('type','work')}>大神</Radio>
                    </List.Item>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.register}>注册</Button>
                    <WhiteSpace/>
                    <Button onClick={this.toLogin}>已有账户</Button>
                </List>
                </WingBlank>
            </div>
         );
    }
}
 
export default Register;