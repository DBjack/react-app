import React, { Component } from 'react';
import logo from '../../assets/img/logo.png'

import ('./logo.scss')

class Logo extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className='logo'>
                <img src={logo} alt="logo" className='logo-img'/>
            </div>
         );
    }
}
 
export default Logo;