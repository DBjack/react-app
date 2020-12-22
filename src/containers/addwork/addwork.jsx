import React, { Component } from "react";
import {
  NavBar,
  WhiteSpace,
  InputItem,
  Button,
  List,
  Toast,
  Icon,
  Picker,
  Tag,
  TextareaItem,
} from "antd-mobile";
import { connect } from "react-redux";
import { addWorkInfo } from "../../redux/action";

import "./index.scss";

const ageList = new Array(100).fill(1).map((age, i) => ({
  label: i + 18,
  value: i + 18,
}));
const workTimes = [
  {
    label: "1年以下",
    value: "1年以下",
  },
  {
    label: "1-3年",
    value: "1-3年",
  },
  {
    label: "3-5年",
    value: "3-5年",
  },
  {
    label: "5年以上",
    value: "5年以上",
  },
];
const scaleList = [
  {
    label: "100-500",
    value: "100-500",
  },
  {
    label: "500-1000",
    value: "500-1000",
  },
  {
    label: "1000-5000",
    value: "1000-5000",
  },
  {
    label: "5000-10000",
    value: "5000-10000",
  },
];
const workTypeList = [
  {
    label: "代招",
    value: "代招",
  },
  {
    label: "急聘",
    value: "急聘",
  },
  {
    label: "外包",
    value: "外包",
  },
];
const educations = [
  {
    label: "高中",
    value: "高中",
  },
  {
    label: "本科",
    value: "本科",
  },
  {
    label: "硕士",
    value: "硕士",
  },
  {
    label: "博士",
    value: "博士",
  },
];
const salaryList = [
  [
    {
      label: "5000-10000",
      value: "5000-10000",
    },
    {
      label: "10k-20k",
      value: "10k-20k",
    },
    {
      label: "30-50k",
      value: "30k-50k",
    },
    {
      label: "50k",
      value: "50k",
    },
  ],
  [
    {
      label: "13薪",
      value: "13薪",
    },
    {
      label: "15薪",
      value: "15薪",
    },
    {
      label: "16薪",
      value: "16薪",
    },
  ],
];

class AddWork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      profession: "",
      age: [],
      workTime: [],
      education: [],
      skills: [],
      description: "",
      salary: [],
      scale: [],
      workType: [],
      address: "",
    };
  }

  // 操作input
  handleChange = (type, val) => {
    this.setState({
      [type]: val,
    });
  };
  //   改变skill
  changeSkill(skill, v) {
    const { skills } = this.state;
    if (v) {
      skills.push(skill);
    } else {
      let i = skills.indexOf(skill);
      i > 0 && skills.splice(i, 1);
    }
    this.setState({
      skills,
    });
  }

  // 添加
  clickSave = () => {
    console.log(this.state, 111);
    this.props.addWorkInfo(this.state);
    this.props.hideDrawer();
  };

  render() {
    const { showAdd } = this.props;
    return (
      <div className="add-work">
        <div className="main">
          <NavBar icon={<Icon type="left" onClick={this.props.hideDrawer} />}>
            发布招聘信息
          </NavBar>
          <List className="list-input">
            <WhiteSpace></WhiteSpace>
            <InputItem
              placeholder="请输入公司名称"
              onChange={(val) => this.handleChange("company", val)}
            >
              公司
            </InputItem>
            <WhiteSpace></WhiteSpace>
            <Picker
              cols={1}
              data={scaleList}
              onChange={(val) => this.handleChange("scale", val)}
              value={this.state.scale}
              format={(val) => {
                if (val.length > 0) {
                  return val + "人";
                }
              }}
            >
              <List.Item arrow="horizontal">公司规模</List.Item>
            </Picker>
            <WhiteSpace></WhiteSpace>
            <InputItem
              placeholder="请输入职业名称"
              onChange={(val) => this.handleChange("profession", val)}
            >
              招聘岗位
            </InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem
              placeholder="请输入地址"
              onChange={(val) => this.handleChange("address", val)}
            >
              地址
            </InputItem>
            <WhiteSpace></WhiteSpace>
            <Picker
              cols={1}
              data={workTypeList}
              onChange={(val) => this.handleChange("workType", val)}
              value={this.state.workType}
            >
              <List.Item arrow="horizontal">岗位类型</List.Item>
            </Picker>
            <WhiteSpace></WhiteSpace>
            <Picker
              cols={1}
              data={ageList}
              onChange={(val) => this.handleChange("age", val)}
              format={(label) => {
                if (label > 0) {
                  return label + "岁";
                }
              }}
              value={this.state.age}
            >
              <List.Item arrow="horizontal">年龄要求</List.Item>
            </Picker>

            <WhiteSpace></WhiteSpace>
            <Picker
              cols={1}
              data={workTimes}
              onChange={(val) => this.handleChange("workTime", val)}
              extra="请选择"
              value={this.state.workTime}
            >
              <List.Item arrow="horizontal">工作年限</List.Item>
            </Picker>
            <WhiteSpace></WhiteSpace>
            <Picker
              cols={1}
              data={educations}
              onChange={(val) => this.handleChange("education", val)}
              extra="请选择"
              value={this.state.education}
            >
              <List.Item arrow="horizontal">教育水平</List.Item>
            </Picker>
            <Picker
              cols={2}
              cascade={false}
              data={salaryList}
              onChange={(val) => this.handleChange("salary", val)}
              extra="请选择"
              value={this.state.salary}
            >
              <List.Item arrow="horizontal">薪资水平</List.Item>
            </Picker>
            <WhiteSpace></WhiteSpace>
            <div className="skills">
              <List.Item>技能要求</List.Item>
              <Tag onChange={(val) => this.changeSkill("html", val)}>html</Tag>
              <Tag onChange={(val) => this.changeSkill("css", val)}>css</Tag>
              <Tag onChange={(val) => this.changeSkill("javaScript", val)}>
                javaScript
              </Tag>
              <Tag onChange={(val) => this.changeSkill("Vue", val)}>Vue</Tag>
              <Tag onChange={(val) => this.changeSkill("React", val)}>
                React
              </Tag>
              <Tag onChange={(val) => this.changeSkill("Angular", val)}>
                Angular
              </Tag>
              <Tag onChange={(val) => this.changeSkill("nodejs", val)}>
                nodeJs
              </Tag>
              <Tag onChange={(val) => this.changeSkill("mongoDB", val)}>
                mongoDB
              </Tag>
            </div>
            <WhiteSpace></WhiteSpace>

            <TextareaItem
              count={300}
              rows={5}
              title="描述"
              autoHeight
              onChange={(val) => this.handleChange("description", val)}
              value={this.state.description}
            ></TextareaItem>
            <WhiteSpace></WhiteSpace>
            <Button type="primary" onClick={this.clickSave}>
              添加
            </Button>
            <WhiteSpace></WhiteSpace>
            <Button onClick={this.props.hideDrawer}>取消</Button>
          </List>
        </div>
      </div>
    );
  }
}

export default connect(null, {
  addWorkInfo,
})(AddWork);
