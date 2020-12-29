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
import { getUserListInfo } from "../../redux/action";
import RcQueueAnim from "rc-queue-anim";
import AddWork from "../addwork/addwork";
import "./index.scss";

class Dashen extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      open: false,
      dataSource: ds,
      pageNum: 1,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.props.getUserListInfo({
      pageNum: this.state.pageNum,
    });
  }

  redirectDetail = (userid) => {
    this.props.history.push(`/detail/${userid}`);
  };
  onEndReached = () => {
    const { userList } = this.props;
    debugger;
    let { pageNum } = this.state;
    if (userList.length > 9 && -pageNum * 10 > 9) {
      pageNum++;
      this.props.getUserListInfo({ pageNum });
      return;
    }
    this.setState({
      isLoading: false,
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
          <h4>{rowData.profession}</h4>
          <div className="salary">{rowData.salary}</div>
        </div>
        <div className="row-tag">
          <Tag small>{rowData.workTime}</Tag>
          <Tag small>{rowData.age}岁</Tag>
          <Tag small>{rowData.education}</Tag>
        </div>
        <div className="company">
          <span className="mr-2">{rowData.company}</span>
          <span>{rowData.scale}人</span>
        </div>
        <div className="row-user">
          <div className="d-flex ai-center">
            <img src={rowData.header && rowData.header.icon} alt="user" />
            {rowData.text}·{rowData.profession}
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
    let { userList } = this.props;
    userList = userList.filter((user) => user.type === "worker");
    console.log(userList, 123);
    return (
      <div className="work-list">
        <SearchBar placeholder="Search" maxLength={8} />

        <PullToRefresh>
          <ListView
            ref={(el) => (this.lv = el)}
            dataSource={dataSource.cloneWithRows(userList)}
            // renderHeader={() => <span>header</span>}
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
            onScroll={() => {
              console.log("scroll");
            }}
            useBodyScroll={false}
            scrollRenderAheadDistance={500}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={10}
          />
        </PullToRefresh>
      </div>
    );
  }
}

export default connect((state) => ({ userList: state.userList }), {
  getUserListInfo,
})(Dashen);
