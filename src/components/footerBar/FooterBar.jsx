import React, { Component } from 'react';
import {TabBar  } from 'antd-mobile'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import ('./index.scss')
class FooterBar extends Component {
    static propTypes = {
        navList: PropTypes.array.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        
        const {pathname } = this.props.history.location
        const {navList,chatMsgList } = this.props
        const {unReadCount} = chatMsgList
        
        return ( 
            <TabBar className='footer-bar'>
                {
                    navList.map(nav=>{
                        if(nav.title === '信息'){
                            return <TabBar.Item badge={unReadCount} title={nav.title} key={nav.path} icon={{uri:require(`../../assets/img/nav/${nav.icon}.png`).default}} selectedIcon={{uri:require(`../../assets/img/nav/${nav.icon}-selected.png`).default}}
                            selectedIcon={{uri:require(`../../assets/img/nav/${nav.icon}-selected.png`).default}} selectedIcon={{uri:require(`../../assets/img/nav/${nav.icon}-selected.png`).default}}
                            selected={pathname===nav.path} onPress={()=>this.props.history.replace(nav.path)}></TabBar.Item>

                        }else{
                            return <TabBar.Item title={nav.title} key={nav.path} icon={{uri:require(`../../assets/img/nav/${nav.icon}.png`).default}} selectedIcon={{uri:require(`../../assets/img/nav/${nav.icon}-selected.png`).default}}
                            selectedIcon={{uri:require(`../../assets/img/nav/${nav.icon}-selected.png`).default}} selectedIcon={{uri:require(`../../assets/img/nav/${nav.icon}-selected.png`).default}}
                            selected={pathname===nav.path} onPress={()=>this.props.history.replace(nav.path)}></TabBar.Item>
                        }
                    })
                }
            </TabBar>
         );
    }
}
 
export default connect(
    state=>({
        chatMsgList:state.chatMsgList
    })
)(withRouter(FooterBar));