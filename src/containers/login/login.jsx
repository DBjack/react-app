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
} from "antd-mobile";
import { connect } from "react-redux";
import { login, errorMsg } from "../../redux/action";
import Logo from "../../components/logo/logo.jsx";
import { Redirect } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
    };
  }

  //   输入框的值改变时触发
  handleChange = (type, val) => {
    this.setState({
      [type]: val,
    });
  };

  //   登录
  login = () => {
    this.props.login(this.state);
  };

  // 没有注册账号
  noAccount = () => {
    this.props.history.push("/register");
  };

  render() {
    const { redirectTo, msg } = this.props.user;

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
            <InputItem onChange={(val) => this.handleChange("userName", val)}>
              用户名
            </InputItem>
            <WhiteSpace />
            <InputItem
              onChange={(val) => this.handleChange("password", val)}
              type="password"
            >
              密码
            </InputItem>
            <WhiteSpace />
            <Button type="primary" onClick={this.login}>
              登录
            </Button>
            <WhiteSpace />
            <Button onClick={this.noAccount}>还没有账户</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), { login, errorMsg })(
  Register
);
