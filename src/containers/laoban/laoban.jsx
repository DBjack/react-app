import React, { Component } from "react";
import { List, SearchBar, Drawer } from "antd-mobile";
import { connect } from "react-redux";
import RcQueueAnim from "rc-queue-anim";
import AddWork from "../addwork/addwork";
import "./index.scss";

class Laoban extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentDidMount() {}

  redirectDetail = (userid) => {
    this.props.history.push(`/detail/${userid}`);
  };

  // 显示添加工作面板
  showDrawer = () => {
    this.setState({
      open: true,
    });
  };
  // 隐藏工作
  hideDrawer = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { workList } = this.props;

    return (
      <div className="work-list">
        <SearchBar placeholder="Search" maxLength={8} />
        <div className="plus-btn" onClick={this.showDrawer}>
          +
        </div>
        <RcQueueAnim>
          {workList.length > 0 &&
            workList.map((work) => {
              return (
                <List
                  onClick={this.redirectDetail.bind(null, work.creator._id)}
                >
                  <List.Item>
                    <img src="" alt="" />
                    <div>
                      <h5>{work.company}</h5>
                      <span>{work.company}</span>
                      <span>{work.workTime}</span>
                      <span>{work.education}</span>
                    </div>
                    <h5>{work.salary}</h5>
                  </List.Item>
                </List>
              );
            })}
        </RcQueueAnim>
        <Drawer
          open={this.state.open}
          docked={false}
          sidebar={<AddWork hideDrawer={this.hideDrawer}></AddWork>}
          style={{
            minHeight: document.documentElement.clientHeight,
          }}
        ></Drawer>
      </div>
    );
  }
}

export default connect((state) => ({ workList: state.workList }))(Laoban);
