import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {  Tag,WhiteSpace} from 'antd-mobile'
import './index.scss'
class workerCard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {card } = this.props
        return (
            <div className='worker-card'>
                <img src="" alt=""/>
                <div className='px-1'>
                    <div className='d-flex ai-center jc-between'>
                    <h3>{card.profession}</h3>
                    <span>{card.salary.join('-')}元</span>
                    </div>
                    <div>
                        <img src={card.header.icon} alt="" className='mr-2'/>
                        <span className='mr-2'>{card.name}</span>
                        <Tag className='mr-2' small>{card.age}岁</Tag>
                        <Tag className='mr-2' small>{card.workTime}年</Tag>
                        <Tag className='mr-2' small>{card.education}</Tag>
                    </div>
                    <div className='mt-4'>
                        <span>{card.description}</span>
                    </div>
                </div>
                                
            </div>
          );
    }
}
workerCard.propTypes = {
    card: PropTypes.object.isRequired   
}
 
export default workerCard;