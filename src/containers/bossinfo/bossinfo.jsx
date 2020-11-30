import React, { Component } from 'react';
import {NavBar,WhiteSpace,InputItem,Button,List,Toast,Picker,TextareaItem } from 'antd-mobile'
import { BrowserRouter as Router, Route, NavLink ,Redirect} from 'react-router-dom'

import {connect } from 'react-redux'
import { update} from '../../redux/action'
import HeaderAvatar from '../../components/header-avatar/header-avatar'
import './index.scss'



const ageList = new Array(100).fill(1).map((age,i)=>({
    label:i+1,
    value:i+1,
}))
const workTimes = [[...new Array(20).fill(1).map((age,i)=>({
    label:i,
    value:i,
}))],[...new Array(20).fill(1).map((age,i)=>({
    label:i+1,
    value:i+1,
}))]]
const salaryList = [[...new Array(30).fill(1).map((age,i)=>({
    label:(i+1)*1000,
    value:(i+1)*1000,
}))],[...new Array(30).fill(1).map((age,i)=>({
    label:(i+2)*1000,
    value:(i+2)*1000,
}))]]





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
    console.log(avatar,i,11122)
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
               <img src={header.icon} alt="头像" className='ml-2'/>
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
                
                    <NavBar>补全个人信息</NavBar>
                    <HeaderAvatar selectAvatar={this.selectAvatar}></HeaderAvatar>
                    <List className='list-input'>
                        <List.Item>
                    {avatar}
                        </List.Item>
                    <InputItem placeholder='请输入姓名' onChange={val=>this.handleChange('name',val)}>姓名</InputItem>
                    
                    <WhiteSpace></WhiteSpace>
                    <InputItem placeholder='请输入职业' onChange={val=>this.handleChange('profession',val)}>职业</InputItem>
                   <Picker cols={1} data={ageList} 
                       onChange={val=>this.handleChange('age',val)}
                       format={label=>{
                           if(label>0){
                               return label + '岁'
                           }
                       }}
                        value = {this.state.age}>
                       <List.Item arrow="horizontal">
                              年龄
                       </List.Item>
                   </Picker>
                   
                    <WhiteSpace></WhiteSpace>
                    <Picker cols={2} data={workTimes} 
                       onChange={val=>this.handleChange('workTime',val)}
                       format={label=>{
                           if(label.length>0){
                               return label.join('-') + '年'
                           }
                       }}
                       cascade={false}
                       extra="请选择"
                        value = {this.state.workTime}>
                       <List.Item arrow="horizontal">
                              工作年限
                       </List.Item>
                   </Picker>
                    <WhiteSpace></WhiteSpace>
                    <Picker cols={2} data={salaryList} 
                       onChange={val=>this.handleChange('salary',val)}
                       format={label=>{
                           if(label.length>0){
                               return label.join('-') + '元'
                           }
                       }}
                       cascade={false}
                       extra="请选择"
                        value = {this.state.salary}>
                       <List.Item arrow="horizontal">
                              期望薪资
                       </List.Item>
                   </Picker>
                    <WhiteSpace></WhiteSpace>
                        <TextareaItem title='描述' autoHeight></TextareaItem>
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