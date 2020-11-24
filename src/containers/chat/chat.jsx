import React, { Component } from 'react';
import {  Button,TextareaItem} from 'antd-mobile'
import { sendMsg } from '../../redux/action'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
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
        return (
            <div>
                <TextareaItem onChange={val=>this.changeInput(val)}></TextareaItem>
                <Button onClick={this.sendMsg}>发送</Button>
            </div>
          );
    }
}
 
export default connect(
    state=>{},
    {
        sendMsg
    }
)(Chat);