import React, { Component } from 'react';
import {NavBar,WhiteSpace,InputItem,Button,List,Toast } from 'antd-mobile'
import { BrowserRouter as Router, Route, NavLink ,Redirect} from 'react-router-dom'

import {connect } from 'react-redux'
import { update} from '../../redux/action'
import HeaderAvatar from '../../components/header-avatar/header-avatar'
import './index.scss'



class BossInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:'',
            company:'',
            job:'',
            header:{},
            isSave:false
         }
    }

    // 操作input
    handleChange(type,val){
        this.setState({
            [type]:val
        })
    }
    // 选择头像
 selectAvatar=(avatar,i)=>{
    this.setState({
        header:avatar
    })
console.log(this.state)
}  
    // 保存
    clickSave=()=>{
        console.log(this.state,111)
        this.props.update(this.state)
        this.setState({
            isSave:true
        })
    }
    render() { 
        const {header,isSave} =  this.state
        const {redirectTo,msg} = this.props.user

        let avatar 
        
        if(header.text){
            avatar = <div>
               <span>已选择头像</span>
               <img src={header.avatar} alt="头像"/>
           </div>
        }
        if(isSave && msg){
            Toast.info(msg)
        }


        if(isSave && redirectTo){
            this.setState({
                isSave:false
            })
            return <Redirect to={redirectTo}></Redirect>
        }
        return ( 
            <div className='main'>
                
                    <NavBar>招聘人员信息</NavBar>
                    <HeaderAvatar selectAvatar={this.selectAvatar}></HeaderAvatar>
                    <List className='list-input'>
                        <List.Item>
                    {avatar}
                        </List.Item>
                    <InputItem placeholder='请输入姓名' onChange={val=>this.handleChange('name',val)}>姓名</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem  placeholder='请输入公司名称' onChange={val=>this.handleChange('company',val)}>公司</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem  placeholder='请输入招聘岗位' onChange={val=>this.handleChange('job',val)}>招聘岗位</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.clickSave}>保存</Button>
                    </List>
                
            </div>
         );
    }
}
 
export default connect(
    state=>({user:state.user}),
    {
        update
    }
)(BossInfo);