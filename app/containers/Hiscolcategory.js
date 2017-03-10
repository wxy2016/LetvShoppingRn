
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  ListView,
  TouchableOpacity, // 不透明度触摸
  Alert,
  View
} from 'react-native';
// 导入json数据
var hiscolcategoryData = require('../constants/hiscolcategory.json');
var categoryIcon = '';
var tempDataSource = [];
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var LeftButton=require('./LeftButton');//左侧列表
export default class Hiscolcategory extends Component {
  constructor(props) {
    super(props);
    var dataBase = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: dataBase.cloneWithRows(hiscolcategoryData.data),
      categoryIndex: 0,
      tempDataSource: hiscolcategoryData.data,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this) }
          />
      </View>

    );
  }
  renderRow(rowData, sectionID, rowID) {
    var selected = this.state.categoryIndex == rowID;
    var icon = rowData.title=='收藏' ? require('../img/ic_collection_normal.png') : require('../img/ic_history.png');
    var left_bg = selected ? require('../img/left_bg_focus.png') : require('../img/nocheck.png');
    var font_color = selected ? styles.font_select_color : styles.font_normal_color;
    return (
       <LeftButton key={rowID} focus={rowID==0?true:false}   left_bg={left_bg} icon={icon} category_name={rowData.title} font_color={font_color} index={rowID}  onFocused={() => this.select(rowID)}/>
    );
  }
  select(rowID) {
    this.props.onSelect(rowID)
    let newData = JSON.parse(JSON.stringify(this.state.tempDataSource));
    this.setState(
      {
        dataSource: this.state.dataSource.cloneWithRows(newData),
        categoryIndex: rowID,
      });
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    width: width / 5,
    height: 116,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'stretch',
  },
  icon: {
    resizeMode: 'stretch',
    width: 40,
    marginLeft: 30,
    alignItems: 'center',
    height: 40,
  },
  category: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 114,
  },
  category_bg_select: {
    backgroundColor: '#d7ead6',
  },
  category_bg_normal: {
    backgroundColor: '#33FFFFFF',
  },
  line: {
    backgroundColor: '#eef0f3',
    height: 1,
  },
  font: {
    width: 160,
    height: 40,
    fontSize: 26,
    fontWeight: 'bold',
  },
  font_select_color: {
    color: '#f0ffff',
  },
  font_normal_color: {
    color: '#FFFFFF50',
  },
});