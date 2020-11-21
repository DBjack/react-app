import React, { Component } from 'react';
import { List,Result,Button,WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
const { Item} = List
const {Brief} = Item

class Personal extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {user } = this.props
        return ( 
            <div>
                <Result 
                    title={user.userName}
                    message={user.job}  
                    img={<img src={user.header.icon.default}></img>}>
                </Result>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item multipleLine>
                        <Brief>姓名：{user.userName}</Brief>
                        <Brief>公司：{user.company}</Brief>
                        <Brief>职位：{user.job}</Brief>
                    </Item>
                </List>
            </div>
         );
    }
}
 
export default connect(
    state=>({user:state.user})
)(Personal)