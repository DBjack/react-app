import React, { Component } from 'react';
import {TabBar  } from 'antd-mobile'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'

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
        console.log(this)
        const {pathname } = this.props.history.location
        const {navList } = this.props
        return ( 
            <TabBar className='footer-bar'>
                {
                    navList.map(nav=>{
                        return <TabBar.Item title={nav.title} key={nav.path} icon={{uri:require(`../../assets/img/nav/${nav.icon}.png`).default}} selectedIcon={{uri:require(`../../assets/img/nav/${nav.icon}-selected.png`).default}}
                        selectedIcon={{uri:require(`../../assets/img/nav/${nav.icon}-selected.png`).default}} selectedIcon={{uri:require(`../../assets/img/nav/${nav.icon}-selected.png`).default}}
                        selected={pathname===nav.path} onPress={()=>this.props.history.replace(nav.path)}></TabBar.Item>
                    })
                }
            </TabBar>
         );
    }
}
 
export default withRouter(FooterBar);