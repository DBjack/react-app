import React, { Component } from 'react';
import {Grid } from 'antd-mobile'







class HeaderAvatar extends Component {
    constructor(props) {
        super(props);
        this.avatarList =[]
        for (var i = 0; i < 20; i++) { 
            const text = `头像${i+1}`
            this.avatarList.push({text, icon: require(`../../assets/img/${text}.png`).default   }) 
        }
        console.log(this.avatarList) 
        this.state = {  }
    }
    render() { 
        return (  
            <Grid data={this.avatarList} columnNum={5} onClick={this.props.selectAvatar}></Grid>
        );
    }
}
 
export default HeaderAvatar;