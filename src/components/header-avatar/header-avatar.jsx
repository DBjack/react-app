import React, { Component } from 'react';
import {Grid } from 'antd-mobile'

let avatarList =  Array.from(new Array(20)).map((item,i)=>({
    icon: require(`../../assets/img/头像${i+1}.png`),
    text : `头像${i+1}`
}))


 
class HeaderAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <Grid data={avatarList} columnNum={5} onClick={this.props.selectAvatar}></Grid>
        );
    }
}
 
export default HeaderAvatar;