import React, { Component } from 'react';
import {List } from 'antd-mobile'
import {connect } from 'react-redux'
class Laoban extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount(){
        
    }

    redirectDetail=(userid)=>{
        this.props.history.push(`/detail/${userid}`)
    }

    render() { 
        const {workList } = this.props

        return ( 
            <div>
            {
                workList.map(work=>{ 
                   return <List onClick={this.redirectDetail.bind(null,work.user._id)}>
                        <List.Item>
                            <img src="" alt=""/>
                            <div>
                                <h5>{work.work}</h5>
                                <span>{work.company}</span>
                                <span>{work.city}</span>
                                <span>{work.worktime}</span>
                                <span>{work.education}</span>
                            </div>
                                <h5>{work.salary}</h5>
                        </List.Item>
                    </List>
                })
            }
            </div>
         );
    }
}
 
export default connect(
    state=>({workList:state.workList})
)(Laoban)