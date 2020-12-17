import React, { Component } from "react";
import { List, SearchBar, Icon, ActionSheet } from "antd-mobile";
import { connect } from "react-redux";
import RcQueueAnim from "rc-queue-anim";

import WorkerCard from "../../components/workerCard/workerCard";
import AddWork from "../addwork/addwork";

import "./index.scss";
class Dashen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdd: false,
    };
  }

  componentDidMount() {}

  redirectDetail = (userid) => {
    this.props.history.push(`/chat/${userid}`);
  };

  // 添加工作
  addWork = () => {
    this.setState({
      showAdd: true,
    });
  };
  // 隐藏工作
  hidden = () => {
    this.setState({
      showAdd: false,
    });
  };

  render() {
    const { userList } = this.props;

    const users = userList.filter((user) => user.type === "work");

    return (
      <div className="work-list">
        <SearchBar placeholder="Search" maxLength={8} />
        <div className="plus-btn" onClick={this.addWork}>
          +
        </div>
        <List>
          <RcQueueAnim>
            {users.map((user) => {
              return (
                <List.Item
                  key={user._id}
                  onClick={this.redirectDetail.bind(null, user._id)}
                >
                  <WorkerCard card={user}></WorkerCard>
                </List.Item>
              );
            })}
          </RcQueueAnim>
        </List>

        {/* <AddWork hidden={this.hidden} showAdd={this.state.showAdd}></AddWork> */}
      </div>
    );
  }
}

export default connect((state) => ({ userList: state.userList }))(Dashen);
