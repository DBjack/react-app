import React, { Component } from 'react';
import {TabBar  } from 'antd-mobile'
import PropTypes from 'prop-types'
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
        const {navList } = this.props
        return ( 
            <TabBar>
                {
                    navList.map(item=>{
                        return <TabBar.Item title={item.title} key={item.path} icon={{uri:require(`../../assets/img/nav/${item.icon}.png`)}}></TabBar.Item>
                    })
                }
            </TabBar>
         );
    }
}
 
export default FooterBar;