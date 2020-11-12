import React, { Component } from 'react';
import { NavBar, Button, List, InputItem, WhiteSpace,Radio,WingBlank,Toast } from 'antd-mobile'
import {connect } from 'react-redux'
import { register } from '../../redux/action'
import Logo from '../../components/logo/logo.jsx'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userName:'',
            password:'',
            rePassword:'',
            type:'',
            userError:false
         }
    }

    handleChange=(type,val)=>{
        this.setState({
            [type]:val
        })

        if(type==='userName'){

            if(val.length<11){
                this.setState({
                    userError:true
                })
            }else{
                this.setState({
                    userError:false
                })
            }
        }
        console.log(this.state)
    }

    register=()=>{
        this.props.register(this.state)
    }

    toLogin=()=>{
        this.props.history.push('/login')
    }

    onErrorClick = () => {
        if (this.state.userError) {
          Toast.info('用户名不得小于11位数');
        }
      }

    render() {
        const { msg }  = this.props.user
        console.log(this.props)
        return ( 
            <div>
                <NavBar>注册</NavBar>
                <Logo></Logo>
                    {
                        msg ? <div>{msg}</div> : null
                    }
                <WingBlank>
                <List>
                    <InputItem   placeholder="请输入用户名" error={this.state.userError} onErrorClick={this.onErrorClick} onChange={val=>this.handleChange('userName',val)}>用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem placeholder="请输入密码" onChange={val=>this.handleChange('password',val)}>密码</InputItem>
                    <WhiteSpace/>
                    <InputItem placeholder="请输入确认密码" onChange={val=>this.handleChange('rePassword',val)}>确认密码</InputItem>
                    <WhiteSpace/>
                    <List.Item>
                        <span className='mr-2'>用户类型</span>
                        <Radio onChange={val=>this.handleChange('type','boss')}>老板</Radio>
                        <Radio onChange={val=>this.handleChange('type','work')}>大神</Radio>
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
 
export default connect(
    state=>({user:state.user}),
    {register}
)(Register);


