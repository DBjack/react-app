import React, { Component } from 'react';
import {List } from 'antd-mobile'
import {connect } from 'react-redux'
import workerCard  from '../../components/workerCard/workerCard'
import WorkerCard from '../../components/workerCard/workerCard';
class Dashen extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount(){
        
    }

    redirectDetail=(userid)=>{
        this.props.history.push(`/chat/${userid}`)
    }

    render() { 
        const {userList } = this.props
        
        const users = userList.filter(user=>user.type === 'work')
        
        return ( 
            <div>
            {
                users.map(user=>{ 
                   return <List onClick={this.redirectDetail.bind(null,user._id)}>
                        <List.Item key={user._id}>
                            <WorkerCard card={user}></WorkerCard>
                        </List.Item>
                    </List>
                })
            }
            </div>
         );
    }
}
 
export default connect(
    state=>({userList:state.userList})
)(Dashen)