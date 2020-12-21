import React, { Component } from "react";
import { List, SearchBar, Drawer, ListView, Tag } from "antd-mobile";
import { connect } from "react-redux";
import RcQueueAnim from "rc-queue-anim";
import AddWork from "../addwork/addwork";
import "./index.scss";

class Laoban extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      open: false,
      dataSource: ds,
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
  toDetail = (id) => {
    this.props.history.push(`/detail/${id}`);
  };

  row = (rowData, sectionID, rowID) => {
    console.log(rowData);
    return (
      <div className="row" onClick={this.toDetail.bind(null, rowData._id)}>
        <div className="row-header">
          <h4>
            {rowData.profession}
            <Tag small className="ml-2">
              {rowData.workType}
            </Tag>
          </h4>
          <div className="salary">{rowData.salary}</div>
        </div>
        <div className="row-tag">
          <Tag small>{rowData.workTime}</Tag>
          <Tag small>{rowData.age}岁</Tag>
          <Tag small>{rowData.education}</Tag>
          {rowData.skills.map((skill) => (
            <Tag small>{skill}</Tag>
          ))}
        </div>
        <div className="company">
          <span className="mr-2">{rowData.company}</span>
          <span>{rowData.scale}人</span>
        </div>
        <div className="row-user">
          <div className="d-flex ai-center">
            <img
              src={rowData.creator.header && rowData.creator.header.icon}
              alt="user"
            />
            {rowData.creator.name}·{rowData.creator.profession}
          </div>
          <span className="address">{rowData.address}</span>
        </div>
      </div>
    );
  };
  body = (props) => {
    return <div className="am-list-body my-body">11212</div>;
  };
  header = (props) => {
    return <div>推荐</div>;
  };
  separator = (sectionID, rowID) => (
    <div
      key={`${sectionID}-${rowID}`}
      style={{
        backgroundColor: "#F5F5F9",
        height: 8,
        borderTop: "1px solid #ECECED",
        borderBottom: "1px solid #ECECED",
      }}
    />
  );
  render() {
    const { dataSource } = this.state;
    const { workList } = this.props;

    return (
      <div className="work-list">
        <SearchBar placeholder="Search" maxLength={8} />
        <div className="plus-btn" onClick={this.showDrawer}>
          +
        </div>

        <ListView
          ref={(el) => (this.lv = el)}
          dataSource={dataSource.cloneWithRows(workList)}
          // renderHeader={() => <span>header</span>}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: "center" }}>
              {this.state.isLoading ? "Loading..." : "Loaded"}
            </div>
          )}
          renderSectionHeader={this.header}
          renderBodyComponent={this.body}
          renderRow={this.row}
          renderSeparator={this.separator}
          style={{
            height: document.documentElement.clientHeight,
            overflow: "auto",
          }}
          pageSize={4}
          onScroll={() => {
            console.log("scroll");
          }}
          useBodyScroll={false}
          scrollRenderAheadDistance={500}
          // onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />

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
