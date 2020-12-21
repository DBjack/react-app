import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Button, NavBar, Icon, Tag } from "antd-mobile";
import { Map, Marker } from "react-amap";
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  redirectChat = (userid) => {
    this.props.history.push(`/chat/${userid}`);
  };

  render() {
    const { id } = this.props.match.params;
    const { workList } = this.props;

    const workInfo = workList.find((work) => {
      return work._id === id;
    });
    return (
      <div>
        <NavBar icon={<Icon type="left" onClick={this.props.hideDrawer} />}>
          招聘详情
        </NavBar>
        <div className="detail-title">
          <h2>{workInfo.profession}</h2>
          <span className="salary">{workInfo.salary}</span>
        </div>
        <div className="detail-user">
          <img src={workInfo.creator.header.icon} alt="" />
          <span>{workInfo.creator.name}</span>
          <span>{workInfo.creator.company}</span>
          <span>{workInfo.creator.profession}</span>
        </div>
        <div>
          <h3>职位详情</h3>
          <div className="tag">
            {workInfo.skills.map((skill) => (
              <Tag small>{skill}</Tag>
            ))}
          </div>
          <span>职位描述</span>
          <div>{workInfo.description}</div>
          <div style={{ width: 800, height: 600 }}>
            <Map>
              <Marker position={{ longitude: 120, latitude: 30 }} />
            </Map>
          </div>
        </div>
        <div>跟他沟通：{workInfo.name}</div>
        <Button type="primary">沟通</Button>
      </div>
    );
  }
}

export default connect((state) => ({ workList: state.workList }))(Detail);
