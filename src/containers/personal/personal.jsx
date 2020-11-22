import React, { Component } from 'react';
import { List,Result,Button,WhiteSpace,Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import  Cookies from 'js-cookie'
import { resetUser } from '../../redux/action'


const { Item} = List
const {Brief} = Item

class Personal extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

// 退出
    logout=()=>{
        Modal.alert('退出','是否退出当前账号？',[
            {
                text:'取消',
                onPress:()=>{
                    console.log('取消')
                }
            },
            {
                text: '确认',
                onPress:()=>{
                    Cookies.remove('userid')
                    this.props.resetUser()
                }
            }
        ])
    }

    render() { 
        const {user } = this.props
        return ( 
            <div>
                <Result 
                    title={user.userName}
                    message={user.job}  
                    img={<img src={user.header.icon}></img>}>
                </Result>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item multipleLine>
                        <Brief>姓名：{user.userName}</Brief>
                        <Brief>公司：{user.company}</Brief>
                        <Brief>职位：{user.job}</Brief>
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                <Button type='warning' onClick={this.logout}>退出登录</Button>
                </List>
            </div>
         );
    }
}
 
export default connect(
    state=>({user:state.user}),
    {
        resetUser
    }
)(Personal)