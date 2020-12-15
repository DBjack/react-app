import React, { Component } from "react";
import {
  NavBar,
  WhiteSpace,
  InputItem,
  Button,
  List,
  Toast,
  Picker,
  TextareaItem,
  Icon,
} from "antd-mobile";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";

import { connect } from "react-redux";
import { update, errorMsg } from "../../redux/action";
import HeaderAvatar from "../../components/header-avatar/header-avatar";
import "./index.scss";

const sexList = [
  {
    label: "男",
    value: "man",
  },
  {
    label: "女",
    value: "female",
  },
];
const professionList = [
  {
    label: "人事经理",
    value: "人事经理",
  },
  {
    label: "招聘助理",
    value: "招聘助理",
  },
  {
    label: "老板",
    value: "老板",
  },
];

class BossInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      sex: [],
      company: "",
      profession: "",
      header: {},
    };
  }

  // 操作input
  handleChange(type, val) {
    this.setState({
      [type]: val,
    });
  }
  // 选择头像
  selectAvatar = (avatar, i) => {
    this.setState({
      header: avatar,
    });
  };
  // 保存
  clickSave = () => {
    this.props.update(this.state);
  };
  render() {
    const { header } = this.state;
    const { redirectTo, msg } = this.props.user;

    let avatar;

    if (header.text) {
      avatar = (
        <div>
          <span>已选择头像</span>
          <img src={header.icon} alt="头像" className="ml-2" />
        </div>
      );
    }

    if (msg) {
      Toast.info(msg, 1);
      this.props.errorMsg();
    }

    if (redirectTo && redirectTo != "/bossinfo") {
      return <Redirect to={redirectTo}></Redirect>;
    }
    return (
      <div className="main">
        <NavBar
          icon={
            <Icon type="left" onClick={this.props.history.goBack.bind(null)} />
          }
        >
          补全个人信息
        </NavBar>
        <HeaderAvatar selectAvatar={this.selectAvatar}></HeaderAvatar>
        <List className="list-input">
          <List.Item>{avatar}</List.Item>
          <InputItem
            placeholder="请输入姓名"
            onChange={(val) => this.handleChange("name", val)}
          >
            姓名
          </InputItem>

          <WhiteSpace></WhiteSpace>
          <Picker
            cols={1}
            data={sexList}
            onChange={(val) => this.handleChange("sex", val)}
            value={this.state.sex}
          >
            <List.Item arrow="horizontal">性别</List.Item>
          </Picker>

          <WhiteSpace></WhiteSpace>
          <InputItem
            placeholder="请输入公司名称"
            onChange={(val) => this.handleChange("company", val)}
          >
            公司名称
          </InputItem>

          <WhiteSpace></WhiteSpace>

          <Picker
            cols={1}
            data={professionList}
            onChange={(val) => this.handleChange("profession", val)}
            value={this.state.profession}
          >
            <List.Item arrow="horizontal">职位</List.Item>
          </Picker>
          <WhiteSpace></WhiteSpace>

          <Button type="primary" onClick={this.clickSave}>
            保存
          </Button>
        </List>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), {
  update,
  errorMsg,
})(BossInfo);
