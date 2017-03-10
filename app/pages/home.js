/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  ListView,
  TouchableOpacity, // 不透明度触摸
  Alert,
  NativeModules,
  View,
} from 'react-native';
var Category = require('../containers/category');
var Cart = require('./cart');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
// 导入json数据
var goodData = require('../constants/good.json');
var goodsData = require('../constants/goods.json');
//从本地json文件拿到商品url
import goodsUrl from '../constants/goodsUrl.json';

//历史收藏界面
import HisCol from './HisCol';

//
var ImageButton=require('../containers/ImageButton');
var {LeView} = require('react-native-tv-focusable-view');
//更多界面

import MoreGoods from './MoreGoods';//更多商品页

import TimeLimitBuy from './TimeLimitBuy';//秒杀活动页

import TabsTopic from './TabsTopic';//多tab活动页

//realm数据库

import Realm from 'realm';

import NativeSignatureUrl from '../containers/NativeSignatureUrl';


const GoodSchema={
  name:'Good',
  properties:{
      product_id:'string',
      product_img:'string',
      category_id:'string',
      product_type:'string',
      have_mmsid:'string',
      product_name:'string',
      merchant_id:'string',
      colOrHis:'string',
      }
}
var realm=new Realm({schema:[GoodSchema]});

var index = 0;
var data = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: data,
      categoryTitle: '今日特卖',
      category_id:'',
      bgImgUrl: 'http://static.scloud.letv.com/res/8c82bff5-e25a-46ae-832a-bc01924f189b.jpg',
      categoryData: [],
      goodsUrlData: goodsUrl,
      goodsData: [],
      count: 0,
      more_url:'',
    }; 
  }
  _pressButton() {
    const { navigator } = this.props;
    if (navigator) {
      //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:了
      navigator.pop();
    }
  }
  //获取分类数据
  getCategoryData() {
    fetch('https://lebuy.scloud.letv.com/api/v3/category?versionName=5.8.210T_0922&ui=5.8&user-prefer-language=zh-cn&region=CN&mac=b01bd21b816b&hwVersion=H3000&version=V1401RCN01C058210D09221T&model=MAX455B&_time=1476339825607&_ak=letv_lebuy&_sign=e04198ab6d49a75d27f43f7fd92a5fa7')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            categoryData: this.state.categoryData.concat(responseJson.data),
          }
        )
      })
      .catch(function (e) {
        console.log(e + 'getCategoryData error');
      })
  }
  //获取每个分类的商品数据
  getGoodsData(rowID){
    let categoryUrl=this.state.goodsUrlData.data[rowID].category_url;
    let moreUrl=this.state.goodsUrlData.data[rowID].more_url;
    fetch(categoryUrl)
    .then((response)=>response.json())
    .then((responseJson)=>{
      this.setState(
        {
          dataSource:this.state.dataSource.cloneWithRows(responseJson.data),
          goodsData:responseJson.data,
          categoryTitle:this.state.categoryData[rowID].category_name,
          category_id:this.state.categoryData[rowID].category_id,
          bgImgUrl:this.state.categoryData[rowID].bgimg,
          more_url:moreUrl,
        }
      )
    })
    .catch(function(e){
      console.log(e+'getCategoryData error');
    })
  }
  //在画界面之前初始化数据
  componentWillMount() {
    this.getCategoryData();
    this.getGoodsData(0);
  }

  render() {
    return (
      <Image
        style={styles.bg}
        source={{ uri: this.state.bgImgUrl }}
        >
        <Image
          style={styles.leftBg}
          source={require('../img/lepay_hb_menubg.png') }
          >
          <View style={styles.title}>
            <Image
              style={styles.icon}
              source={require('../img/ic_logo.png') }
              />
            <Text style={styles.titleFont}>购物</Text>
          </View>
          <Category
            style={{ flex: 1 }}
            onSelect={this.selectCategory.bind(this) }/>
         </Image>
        <ListView
          style={styles.listView}
          initialListSize={12}
          contentContainerStyle={styles.contentContainerStyle}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this) }
          />          
      </Image>
    );
  }
  renderRow(rowData, sectionID, rowID) {
    let that = this;
    let adv_img=rowData.adv_img;
    let iconStyle=styles.iconOneStyle;

    if((rowID==1&&this.state.categoryTitle=='今日特卖')||rowID==0&&this.state.categoryTitle!=='今日特卖')
        iconStyle=styles.iconOneStyle;
    else if((rowID==2||rowID==3)&&this.state.categoryTitle=='今日特卖')
        iconStyle=styles.iconTwoStyle;
    else
       iconStyle=styles. iconStyle;
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => that.onClick(rowData, rowID) }>
        <LeView isWrapper={false} >
        <ImageButton adv_img={adv_img} iconStyle={iconStyle} onPress={() => that.onClick(rowData, rowID) }/>
        </LeView>
      </TouchableOpacity>
    )
    // else if((rowID==2||rowID==3)&&this.state.categoryTitle=='今日特卖')
    // return (
    //   <TouchableOpacity activeOpacity={0.5} style={styles.item} onPress={() => that.onClick(rowData, rowID) }>
    //     <Image source={{ uri: rowData.adv_img }} style={styles.iconTwoStyle}/>
    //   </TouchableOpacity>
    // )
    // else
    //   return (
    //     <TouchableOpacity activeOpacity={0.5} style={styles.item} onPress={() => that.onClick(rowData, rowID) }>
    //       <Image source={{ uri: rowData.adv_img }} style={styles.iconStyle}/>
    //     </TouchableOpacity>
    //   )
  }
  selectCategory(category_id) {
    this.getGoodsData(category_id);
  }
  onClick(rowData, rowID) {

    let that = this;
    let str = null;
    this.setState({
      count: this.state.count + 1,
    });
    str = '点击数量：' + this.state.count + '-->rowID' + rowID;
    // alert(str);
    const { navigator } = this.props;//得到全局的navigator
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if (navigator) {
      // if (rowID == 0) {
      //   navigator.push({
      //     name: 'HisCol',
      //     component: HisCol,
      //   })
      // } else if (rowID == 1) {
      //   NativeModules.MyNativeModule.rnCallNative('rn调用原生模块的方法');
      // } else {
      //   navigator.push({
      //     name: 'Cart',
      //     component: Cart,
      //     params: {
      //       count: this.state.count,
      //     }
      //   })
      // }

      if(rowData.ci_type=='5')
      navigator.push({
        name: 'HisCol',
        component: HisCol,
      })
      else if(rowData.ci_type=='13')
      navigator.push({
        name: 'MoreGoods',
        component: MoreGoods,
        params:{
         more_url:this.state.more_url,
         categoryTitle:this.state.categoryTitle,
         category_id:this.state.category_id,
        }
      })
      else if(rowData.ci_type=='4'&&rowData.ext.topic_type=='4')
      navigator.push({
        name: 'TimeLimitBuy',
        component: TimeLimitBuy,
        params:{
         topic_id:rowData.ext.topic_id,
        }
      })
      else if(rowData.ci_type=='4'&&rowData.ext.topic_type=='3')
      navigator.push({
        name: 'TabsTopic',
        component: TabsTopic,
        params:{
         topic_id:rowData.ext.topic_id,
        }
      })
      else{
      realm.write(()=>{
      realm.create('Good',{
        product_id:rowData.ext.product_id+'',
        product_img:rowData.adv_img+'',
        category_id:rowData.ext.category_id+'',
        product_type:rowData.ext.product_type+'',
        have_mmsid:rowData.ext.have_mmsid+'',
        product_name:rowData.ext.product_name+'',
        merchant_id:rowData.ext.merchant_id+'',
        colOrHis:'His'
      });
    });
    navigator.push({
        name: 'Cart',
        component: Cart,
    })
    }
     
    }
  }
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    flexDirection: 'row',
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
    width: width / 6,
    height: 114,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    resizeMode: 'stretch',
    width: 40,
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
    marginLeft: 20,
    marginTop: 20,
  },
  iconStyle: {
    width: 220,
    height: 300,
    borderRadius: 20,
    resizeMode: 'stretch',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  iconTwoStyle: {
    width: 460,
    height: 300,
    borderRadius: 20,
    resizeMode: 'stretch',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  iconOneStyle: {
    width: 700,
    height: 300,
    borderRadius: 20,
    resizeMode: 'stretch',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  listView: {
    marginRight: 20,
    marginTop: 80,
  },
  contentContainerStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});

module.exports = Home;

