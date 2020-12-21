import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Button } from "antd-mobile";

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
        <List>
          <List.Item>职位：{workInfo.profession}</List.Item>
          <List.Item>描述：{workInfo.description}</List.Item>
        </List>
        <div>跟他沟通：{workInfo.name}</div>
        <Button type="primary">沟通</Button>
      </div>
    );
  }
}

export default connect((state) => ({ workList: state.workList }))(Detail);
