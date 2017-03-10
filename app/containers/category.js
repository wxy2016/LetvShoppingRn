
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  ListView,
  TouchableOpacity, // 不透明度触摸
  Alert,
  View,
  ScrollView,
  ToastAndroid
} from 'react-native';
// 导入json数据
var categoryData = require('../constants/category.json');
var LeftButton=require('./LeftButton');
var {LeView} = require('react-native-tv-focusable-view');
var categoryIcon = '';
var tempDataSource = [];
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
class Category extends Component {
  constructor(props) {
    super(props);
    var dataBase = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: dataBase,
      categoryIndex: 0,
      tempDataSource: [],
    };
  }
  getCategoryData(){
    fetch('https://lebuy.scloud.letv.com/api/v3/category?versionName=5.8.210T_0922&ui=5.8&user-prefer-language=zh-cn&region=CN&mac=b01bd21b816b&hwVersion=H3000&version=V1401RCN01C058210D09221T&model=MAX455B&_time=1476339825607&_ak=letv_lebuy&_sign=e04198ab6d49a75d27f43f7fd92a5fa7')
    .then((response)=>response.json())
    .then((responseJson)=>{
      this.setState(
        {
          dataSource:this.state.dataSource.cloneWithRows(this.state.tempDataSource.concat(responseJson.data)),
          tempDataSource:this.state.tempDataSource.concat(responseJson.data)  
        }
      )
    })
    .catch(function(e){
      console.log(e+'getCategoryData error');
    })
  }
  componentWillMount(){
    this.getCategoryData();
  }
  //  <TouchableOpacity   underlayColor ='#eef0f3' onPress={() => this.select(index) } style = {styles.category}>
  //  </TouchableOpacity>  
  render() {
      
        var productImgList=this.state.tempDataSource.map((item,index)=>{
            var selected = this.state.categoryIndex == index;
            var icon = selected ? require('../img/ic_sale.png') : require('../img/ic_sale_normal.png');
            var left_bg = selected ? require('../img/left_bg_focus.png') : require('../img/nocheck.png');
            var font_color = selected ? styles.font_select_color : styles.font_normal_color;
            var isfocus=index==0?true:false;
        return (   
            <LeftButton key={index} focus={isfocus}   left_bg={left_bg} icon={icon} category_name={item.category_name} font_color={font_color} index={index}  onFocused={() => this.select(index)}/>
      )
    })
    return (
          <ScrollView>
          <LeView isWrapper={true}>
              {productImgList}
          </LeView>
          </ScrollView>
    );
  }
      // <LeView isWrapper={true}>
      //   <ListView
      //     dataSource={this.state.dataSource}
      //     renderRow={this.renderRow.bind(this) }
      //     />
      //      </LeView>
  // renderRow(rowData, sectionID, rowID) {
  //   var selected = this.state.categoryIndex == rowID;
  //   var icon = selected ? require('../img/ic_sale.png') : require('../img/ic_sale_normal.png');
  //   var left_bg = selected ? require('../img/left_bg_focus.png') : require('../img/nocheck.png');
  //   var font_color = selected ? styles.font_select_color : styles.font_normal_color;
  //   var isfocus=rowID==0?true:false;
  //   return (
               
  //     <TouchableOpacity   underlayColor ='#eef0f3' onPress={() => this.select(rowID) } style = {styles.category}>
         
  //        <LeftButton focus={isfocus}   left_bg={left_bg} icon={icon} category_name={rowData.category_name} font_color={font_color} onPress={() => this.select(rowID)} onFocused={() => this.select(rowID)}/>
        
  //     </TouchableOpacity>  
    
  //   );
  // }
  //  <TouchableOpacity   underlayColor ='#eef0f3' onPress={() => this.select(rowID) } style = {styles.category}>
  //  </TouchableOpacity>   
    //<TouchableOpacity   underlayColor ='#eef0f3' onPress={() => this.select(rowID) } style = {styles.category}>
      //</TouchableOpacity>
      //  <Image style={styles.item} source={left_bg}>
      //     <Image style={styles.icon}  source={icon}/>
      //     <Text style = {[styles.font, font_color]}> {rowData.category_name} </Text>
      //   </Image>

    
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
    height: 86,
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
module.exports = Category;