import React, { Component } from "react";
import {
  Button,
  TextareaItem,
  WhiteSpace,
  List,
  WingBlank,
  InputItem,
  Grid,
  NavBar,
  Icon,
} from "antd-mobile";
import { sendMsg, updateRedMsg } from "../../redux/action";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import WorkerCard from "../../components/workerCard/workerCard";
import "./index.scss";
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      showEmj: false,
    };
  }

  sendMsg = () => {
    const { userid: to } = this.props.match.params;
    const userid = Cookies.get("userid");
    const from = userid.slice(3).slice(0, -1);
    const { content } = this.state;

    this.props.sendMsg({
      from,
      to,
      content,
    });
    this.setState({ content: "", showEmj: false });
  };

  componentWillMount() {
    this.emojis = [
      "😀",
      "😂",
      "😍",
      "😊",
      "😁",
      "😭",
      "😜",
      "😝",
      "😄",
      "😡",
      "😀",
      "😥",
      "🙃",
      "😋",
      "👍",
      "👌",
      "❤",
      "😱",
      "🐷",
      "🤩",
      "🤔",
      "🤨",
      "😑",
      "😶",
      "🙄",
      "😏",
      "😏",
      "😣",
      "😥",
      "😮",
      "🤐",
      "😯",
      "😪",
      "😫",
      "😫",
      "😴",
      "😌",
      "😛",
      "😜",
      "😝",
    ];
    this.emojis = this.emojis.map((value) => ({ text: value }));
  }

  componentDidMount() {
    const from = this.props.match.params.userid;
    const to = this.props.user._id;
    this.props.updateRedMsg(from, to);

    window.scrollTo(0, document.body.scrollHeight);
  }

  componentWillUnmount() {
    const from = this.props.match.params.userid;
    const to = this.props.user._id;
    this.props.updateRedMsg(from, to);
  }

  // 切换表情
  toggleShow = () => {
    const isShow = !this.state.showEmj;
    this.setState({
      showEmj: isShow,
    });
    // 异步手动派发 resize 事件,解决表情列表显示的 bug
    if (isShow) {
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 0);
    }
  };

  render() {
    const toid = this.props.match.params.userid;
    const { userList, chatMsgList, user } = this.props;
    const { users, chatMsg } = chatMsgList;
    // 获取card信息
    const card = userList.find((user) => user._id === toid);

    return (
      <div>
        <div className="chat-top">
          <NavBar
            icon={
              <Icon
                type="left"
                onClick={this.props.history.goBack.bind(null)}
              />
            }
          >
            聊天
          </NavBar>

          <WorkerCard card={card}></WorkerCard>
        </div>
        <WhiteSpace></WhiteSpace>
        <div className="chat-body">
          {chatMsg.map((chat) => {
            // 我发送的消息
            if (chat.from === user._id) {
              return (
                <div className="chat-content mychat">
                  <img src={user.header.icon} alt="" />
                  <span>{chat.content}</span>
                </div>
              );
            } else {
              return (
                <div className="chat-content">
                  <img src={card.header.icon} alt="" />
                  <span>{chat.content}</span>
                </div>
              );
            }
          })}
        </div>
        <div className="chat-footer">
          <InputItem
            placeholder="请输入"
            value={this.state.content}
            onChange={(content) => this.setState({ content })}
            onFocus={(val) => this.setState({ showEmj: false })}
            extra={
              <span className="text">
                <span className="mr-1" onClick={this.toggleShow}>
                  😀
                </span>
                <span onClick={this.sendMsg}>发送</span>
              </span>
            }
          ></InputItem>
          {this.state.showEmj ? (
            <Grid
              data={this.emojis}
              columnNum={8}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={(item) => {
                this.setState({
                  content: this.state.content + item.text,
                });
              }}
            ></Grid>
          ) : null}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    userList: state.userList,
    workList: state.workList,
    chatMsgList: state.chatMsgList,
  }),
  {
    sendMsg,
    updateRedMsg,
  }
)(Chat);
