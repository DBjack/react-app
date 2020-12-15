import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Badge, SearchBar, Icon } from "antd-mobile";
import dayjs from "dayjs";
import RcQueueAnim from "rc-queue-anim";

import "./message.scss";
class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 跳转到聊天页面
  redirectChat = (userid) => {
    this.props.history.push(`/chat/${userid}`);
  };

  render() {
    const { user, chatMsgList, userList } = this.props;
    const { users, chatMsg } = chatMsgList;

    let lastChatObjs = {};
    // 遍历所有消息列表，取出chatid的最后一项
    chatMsg.map((chat) => {
      chat.unReadCount = 0;
      const chatid = chat.chat_id;

      // 如果read状态为false，未读数就是1
      if (chat.to === user._id && !chat.read) {
        chat.unReadCount = 1;
      }

      if (chat.to === user._id) {
        //  如果存在，则比较create_time的大小
        if (lastChatObjs[chatid]) {
          if (lastChatObjs[chatid]["create_time"] < chat["create_time"]) {
            lastChatObjs[chatid] = chat;
          }
        } else {
          chat.unReadCount++;
          lastChatObjs[chatid] = chat;
        }
      }
    });

    // 取出之后，进行排序
    let messages = Object.values(lastChatObjs);

    messages.sort((m, n) => {
      return m.create_time > n.create_time;
    });

    return (
      <List>
        <SearchBar placeholder="输入姓名查找联系人" maxLength={8} />
        <RcQueueAnim>
          {messages.map((message) => {
            // 获取对应的用户信息
            const userinfo = userList.find((user) => user._id === message.from);

            return (
              <List.Item
                key={message._id}
                onClick={this.redirectChat.bind(null, message.from)}
                extra={
                  <Badge
                    text={message.unReadCount}
                    size="small"
                    className="message-badge"
                  ></Badge>
                }
              >
                <div className="message-item">
                  <div className="message-avatar">
                    <img src={userinfo.header.icon} alt="" className="mr-2" />
                  </div>
                  <main>
                    <div className="message-user">
                      <div>
                        <span>{userinfo.name}</span>
                        <span className="profession">
                          {userinfo.profession}
                        </span>
                      </div>
                      <span className="createTime">
                        {dayjs(message.create_time).format("MM-DD")}
                      </span>
                    </div>
                    <div className="message-content">{message.content}</div>
                  </main>
                </div>
              </List.Item>
            );
          })}
        </RcQueueAnim>
      </List>
    );
  }
}

export default connect((state) => ({
  user: state.user,
  userList: state.userList,
  chatMsgList: state.chatMsgList,
}))(Message);
