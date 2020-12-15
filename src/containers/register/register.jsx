import React, { Component } from "react";
import {
  NavBar,
  Button,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  WingBlank,
  Toast,
  Picker,
} from "antd-mobile";
import { connect } from "react-redux";
import { register, errorMsg } from "../../redux/action";
import Logo from "../../components/logo/logo.jsx";
import { Redirect } from "react-router-dom";
import { types } from "@babel/core";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      rePassword: "",
      type: "",
      userError: false,
    };
  }

  types = [
    {
      label: "招聘者",
      value: "boss",
    },
    {
      label: "求职者",
      value: "worker",
    },
  ];

  // 输入框改变
  handleChange = (type, val) => {
    this.setState({
      [type]: val,
    });

    if (type === "userName") {
      this.setState({
        userError: val.length < 6 ? true : false,
      });
    }
  };

  //   注册
  register = () => {
    this.props.register({ ...this.state, type: this.state.type[0] });
  };

  // 已经有账号
  hasAccount = () => {
    this.props.history.push("/login");
  };

  onErrorClick = () => {
    if (this.state.userError) {
      Toast.info("用户名不得小于6位数");
    }
  };

  render() {
    const { msg, redirectTo } = this.props.user;

    if (redirectTo) {
      return <Redirect to={redirectTo}></Redirect>;
    }

    if (msg) {
      Toast.info(msg, 1);
      this.props.errorMsg();
    }

    return (
      <div>
        <NavBar>注册</NavBar>
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem
              placeholder="请输入用户名"
              error={this.state.userError}
              onErrorClick={this.onErrorClick}
              onChange={(val) => this.handleChange("userName", val)}
            >
              用户名
            </InputItem>
            <WhiteSpace />
            <InputItem
              placeholder="请输入密码"
              onChange={(val) => this.handleChange("password", val)}
              type="password"
            >
              密码
            </InputItem>
            <WhiteSpace />
            <InputItem
              placeholder="请输入确认密码"
              onChange={(val) => this.handleChange("rePassword", val)}
              type="password"
            >
              确认密码
            </InputItem>
            <WhiteSpace />
            <Picker
              cols={1}
              data={this.types}
              value={this.state.type}
              onChange={(v) => this.handleChange("type", v)}
              onOk={(v) => this.handleChange("type", v)}
            >
              <List.Item arrow="horizontal">用户类型</List.Item>
            </Picker>
            <WhiteSpace></WhiteSpace>
            <Button type="primary" onClick={this.register}>
              注册
            </Button>
            <WhiteSpace />
            <Button onClick={this.hasAccount}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), {
  register,
  errorMsg,
})(Register);
