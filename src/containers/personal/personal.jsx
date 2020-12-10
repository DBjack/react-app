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
                    title={user.name}
                    message={user.profession}  
                    img={<img src={user.header.icon}></img>}>
                </Result>
                
                <List>
                    <Item arrow="horizontal" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png">附件简历</Item>
                    <Item arrow="horizontal" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png">管理求职意向</Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item arrow="horizontal" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png">个人主页</Item>
                    <Item arrow="horizontal" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png">牛人问答</Item>
                    <Item arrow="horizontal" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png">我的客服</Item>
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