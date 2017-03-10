
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
  ToastAndroid,
  RefreshControl
} from 'react-native';
var FocusableView = require('react-native-tv-focusable-view');

import {getJson} from '../containers/getSignatureUrl';
import ProductInfo from './ProductInfo';
var ImageButton=require('../containers/ImageButton');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var category_id;

export default class MoreGoods extends Component {
  constructor(props) {
    super(props);
    let data = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: data,
      categoryTitle:'',
      bgImgUrl: 'http://static-scloud.cp21.ott.cibntv.net/res/1861087e-8476-4a32-8bfb-8873befe4c63.jpg',
      more_url:'',
      moreGoodsData:[],
      offset:0,
    };
  }
 
 getMoreGoodsData(category_id,offset){
   getJson("category_id:"+category_id+" limit:100 offset:"+offset,"https://lebuy.scloud.letv.com/api/v3/category/product",(responseJson)=>{
     if(responseJson.data.length>1){
        ToastAndroid.show("更多商品",1000);
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(this.state.moreGoodsData.concat(responseJson.data)),
          moreGoodsData:this.state.moreGoodsData.concat(responseJson.data),
          offset:this.state.offset+100,      
        })
     }
     else
        ToastAndroid.show("已到底部",1000);
      });
 }

 componentDidMount(){
   this.setState({
   more_url:this.props.more_url,
   categoryTitle:this.props.categoryTitle,
   })
   this.getMoreGoodsData(this.props.category_id,this.state.offset);
   category_id=this.props.category_id;
 }

  render() {
    return (
 <View style={styles.container}>
        <Image
          style={styles.bg}
          source={{ uri: this.state.bgImgUrl }}
          >
          <View style={styles.title}>
           
            <TouchableOpacity onPress={() => this.onBackClick()}>
             <Image
               style={styles.icon}
              source={require('../img/ic_back.png')}
            />
            </TouchableOpacity>
             <Text style={styles.titleFont}>{this.state.categoryTitle}</Text>
          </View>
          <ListView navigator={this.props.navigator}
            style={styles.listView}
            contentContainerStyle={styles.contentContainerStyle}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this) }
            onEndReached={this._onRefresh.bind(this)}
            onEndReachedThreshold={2000}
            enableEmptySections={true}
            />
        </Image>
      </View>
    );
  }
  

  _onRefresh(){
   
    this.getMoreGoodsData(category_id,this.state.offset);

  }
 renderRow(rowData, sectionID, rowID) {
    //alert(index++);
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => this.onClick(rowData.product_id) }>
         <ImageButton focus={rowID==0?true:false} adv_img={ rowData.list_img_url} iconStyle={styles.iconStyle} onPress={() => that.onClick(rowData.product_id, rowID) }/>
      </TouchableOpacity>

    );
  }
  
  onBackClick(){
  const { navigator } = this.props;
    if (navigator) {
         //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:了
        navigator.pop();
    }
  }
  onClick(product_id) {
    const { navigator } = this.props;//得到全局的navigator
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if (navigator) {
      navigator.push({
        name: 'ProductInfo',
        component: ProductInfo,
        params:{
         productId:product_id,
        }
      })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  bg: {
    flex: 1,
    flexDirection: 'column',
    width: width,
    height: height,
    alignItems: 'flex-start',
  },
  leftBg: {
    width: width / 6,
    height: height,
    resizeMode: 'stretch',
    justifyContent: 'center',
  },
  title: {
    width: 40,
    height: 40,
    marginTop: 30,
    marginLeft: 30,

    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  icon: {
    resizeMode: 'stretch',
    marginLeft: 30,
    height: 40,
    alignItems: 'center',
  },
  titleFont: {
    width: 160,
    height: 40,
    fontSize: 32,
    color: '#f0ffff',
    fontWeight: 'bold',
    paddingLeft: 10,
    alignItems: 'center',
  },
  item: {
    paddingLeft: 20,
    paddingTop: 20,
  },
  iconStyle: {
    width: 220,
    height: 300,
    borderRadius: 16,
    resizeMode: 'stretch',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },

  listView: {
    marginLeft: 30,
    marginRight: 50,
  },
  contentContainerStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  refreshStyle: {
    justifyContent: 'center',
  },
});

