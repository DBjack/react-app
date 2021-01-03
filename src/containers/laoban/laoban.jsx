import React, { Component } from "react";
import {
  List,
  SearchBar,
  Drawer,
  ListView,
  Tag,
  PullToRefresh,
} from "antd-mobile";
import { connect } from "react-redux";
import { getWorkInfo } from "../../redux/action";
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
      isLoading: true,
    };
  }

  componentWillMount() {
    this.props.getWorkInfo({
      pageNum: 1,
    });
  }

  redirectDetail = (userid) => {
    this.props.history.push(`/detail/${userid}`);
  };

  /**
   * @description: 触顶刷新
   * @param {*}
   * @return {*}
   */
  onEndReached = () => {
    const { pagination, workList } = this.props.work;
    let { pageNum, total } = pagination;

    let isEnd = total - (pageNum - 1) * 10 > 9;
    if (isEnd) {
      pageNum++;
      this.props.getWorkInfo({ pageNum });
      return;
    }
    this.setState({
      isLoading: false,
    });
  };

  /** 下拉刷新
   * @description:
   * @param {*}
   * @return {*}
   */
  onRefresh = () => {
    this.props.getWorkInfo({ pageNum: 1 });
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
  /**
   * @description: 列表每一行的渲染
   * @param {*} rowData
   * @param {*} sectionID
   * @param {*} rowID
   * @return {*}
   */
  row = (rowData, sectionID, rowID) => {
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
    const { dataSource, endReached } = this.state;
    const { workList } = this.props.work;

    return (
      <div className="work-list">
        <SearchBar placeholder="Search" maxLength={8} />
        <div className="plus-btn" onClick={this.showDrawer}>
          +
        </div>
        <Drawer
          open={this.state.open}
          docked={false}
          sidebar={<AddWork hideDrawer={this.hideDrawer}></AddWork>}
          style={{
            minHeight: document.documentElement.clientHeight,
          }}
        ></Drawer>

        <PullToRefresh onRefresh={this.onRefresh}>
          <ListView
            ref={(el) => (this.lv = el)}
            dataSource={dataSource.cloneWithRows(workList)}
            renderFooter={() => (
              <div style={{ padding: 30, textAlign: "center" }}>
                {this.state.isLoading
                  ? "Loading..."
                  : "-------我是有底线的-------"}
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
            useBodyScroll={false}
            scrollRenderAheadDistance={500}
            onScroll={() => {
              console.log("scroll");
            }}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={10}
          />
        </PullToRefresh>
      </div>
    );
  }
}

export default connect((state) => ({ work: state.work }), {
  getWorkInfo,
})(Laoban);
