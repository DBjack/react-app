import React, { Component } from "react";
import { ListView } from "antd-mobile";

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  row = (rowData, sectionID, rowID) => {
    return <div>11</div>;
  };
  body = (props) => {
    return <div className="am-list-body my-body">111</div>;
  };
  header = (props) => {
    return <div>111</div>;
  };
  render() {
    const { row, body, dataSource, header } = this.props;
    return (
      <ListView
        ref={(el) => (this.lv = el)}
        dataSource={dataSource}
        renderHeader={() => <span>header</span>}
        renderFooter={() => (
          <div style={{ padding: 30, textAlign: "center" }}>
            {this.state.isLoading ? "Loading..." : "Loaded"}
          </div>
        )}
        renderSectionHeader={header}
        renderBodyComponent={body}
        renderRow={row}
        // renderSeparator={separator}
        style={{
          height: this.state.height,
          overflow: "auto",
        }}
        pageSize={4}
        onScroll={() => {
          console.log("scroll");
        }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}

export default CardList;
