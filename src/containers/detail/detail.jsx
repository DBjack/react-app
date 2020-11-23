import React, { Component } from 'react';
import {connect } from 'react-redux'
import { List,Button } from 'antd-mobile'

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    redirectChat=(userid)=>{
        this.props.history.push(`/chat/${userid}`)
    }

    render() { 
        const { userid } = this.props.match.params
        const {workList } = this.props
        const workInfo = workList.find(work=>{
            return work.user._id === userid
        })
        return ( 
            <div>
                <List>
            <List.Item>
                职位：{workInfo.work}
            </List.Item>
            <List.Item>
                描述：{workInfo.content}
            </List.Item>
                </List>
        <div>跟他沟通：{workInfo.user.userName}</div>
        <Button type='primary' onClick={this.redirectChat.bind(null,userid)}>沟通</Button>
            </div>
         );
    }
}
 
export default connect(
    state=>({workList:state.workList})
)(Detail);