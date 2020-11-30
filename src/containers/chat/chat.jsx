import React, { Component } from 'react';
import {  Button,TextareaItem,WhiteSpace,List,WingBlank} from 'antd-mobile'
import { sendMsg } from '../../redux/action'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import WorkerCard from '../../components/workerCard/workerCard'
import './index.scss'
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            content:''
         }
    }

    sendMsg=()=>{
        const { userid:from } = this.props.match.params
        const to = Cookies.get('userid')
        const { content } = this.state

        this.props.sendMsg({
            from,
            to,
            content
        })
    }

    // 获取input的值
    changeInput=(content)=>{
        this.setState({
            content
        })
    }

    render() {
         const toid = this.props.match.params.userid
        const { userList }  = this.props
        const card = userList.find(user=>user._id === toid)

        // const workInfo = workList.map(work=>{
        //     if(work.user._id === toid){
        //         return work
        //     }
        // })
        // console.log(workInfo,123)
        
        return (
            <div>
                
                <WorkerCard card ={card}></WorkerCard>
                <WhiteSpace></WhiteSpace>
                <div className='chat-footer'>

                <TextareaItem placeholder='请输入...' onChange={val=>this.changeInput(val)}>
                </TextareaItem>
                <Button onClick={this.sendMsg} className='chat-button'>发送</Button>
                </div>

                
            </div>
          );
    }
}
 
export default connect(
    state=>({
        user:state.user,
        userList:state.userList,
        workList: state.workList,
        chatMsgList:state.chatMsgList
    }),
    {
        sendMsg
    }
)(Chat);