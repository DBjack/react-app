import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Button, NavBar, Icon, Tag } from "antd-mobile";
import { Map, Marker } from "react-amap";
import "./index.scss";
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
        <NavBar
          icon={
            <Icon type="left" onClick={this.props.history.goBack.bind(null)} />
          }
        >
          招聘详情
        </NavBar>
        <div className="detail">
          <div className="detail-title">
            <span className="profession">{workInfo.profession}</span>
            <span className="salary">{workInfo.salary}</span>
          </div>
          <div className="detail-tag">
            <span>
              <i className="iconfont icon-dizhi"></i>
              {workInfo.address}
            </span>
            <span>
              <i className="iconfont icon-gongzuojingyan"></i>
              {workInfo.workTime}
            </span>
            <span>
              <i className="iconfont icon-xueli"></i>
              {workInfo.education}
            </span>
          </div>
          <div className="detail-user">
            <img src={workInfo.creator.header.icon} alt="" />
            <div>
              <span className="name">{workInfo.creator.name}</span>
              <br />
              <span>{workInfo.creator.company}</span> ·
              <span>{workInfo.creator.profession}</span>
            </div>
          </div>
          <div className="detail-content">
            <h4>职位详情</h4>
            <div className="tag">
              {workInfo.skills.map((skill) => (
                <Tag small>{skill}</Tag>
              ))}
            </div>

            <div className="detail">{workInfo.description}</div>
          </div>
          <div className="detail-map">
            <Map>
              <Marker position={{ longitude: 120, latitude: 30 }} />
            </Map>
          </div>
          <div className="detail-tip">
            <span className="title">
              <i className="iconfont icon-jinggao"></i>
              温馨提示
            </span>
            <div className="content">
              该Boss承诺名下所有职位不向您收费，如有不实，请立即举报
            </div>
          </div>
          <Button
            type="primary"
            className="detail-btn"
            onClick={this.redirectChat.bind(null, workInfo.creator._id)}
          >
            立即沟通
          </Button>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ workList: state.workList }))(Detail);
