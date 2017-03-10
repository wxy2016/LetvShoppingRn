
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
var TabItem=require('../containers/TabItem');//topic TabItem
var ShopItem=require('../containers/ShopItem');//商品item
var {LeView} = require('react-native-tv-focusable-view');
import {getJson} from '../containers/getSignatureUrl';
import ProductInfo from './ProductInfo';
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
export default class TabsTopic extends Component {
 
  constructor(props) {
    super(props);
    let data = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: data,
      topic_id:'',
      bgimg: 'http://static.scloud.letv.com/res/8c82bff5-e25a-46ae-832a-bc01924f189b.jpg',
      GoodsData:[],
      offset:0,
      topic_tabs:[],
      tabItemID:0,
      topic_tid:'',
    };
  }
 
 getTopicData(topic_id,topic_tid,offset,index){
     if(topic_tid!='')
     topic_tid=" topic_tid:"+topic_tid;
   getJson("topic_id:"+topic_id+topic_tid+" limit:50 offset:"+offset,"https://lebuy.scloud.letv.com/api/v3/topic",(responseJson)=>{
     if(responseJson.data.list.length>1){
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(responseJson.data.list),
          GoodsData:responseJson.data.list,
          topic_id:topic_id,
          bgimg:responseJson.data.info.bgimg,   
          topic_tabs:responseJson.data.info.topic_tabs,
          tabItemID:index,
        })
     }
     else
        ToastAndroid.show("已到底部",1000);
      });
 }

 componentWillMount(){
   this.getTopicData(this.props.topic_id,this.state.topic_tid,this.state.offset,0);
 }
    _onFocused(index){
        this.getTopicData(this.state.topic_id,this.state.topic_tabs[index].topic_tid,this.state.offset,index);
    }
  render() {
    
    var TabTitles=this.state.topic_tabs.map((item,index)=>{
        let TabItemColor=this.state.tabItemID==index?'#ff6000':'#000000';
        return (
        <TabItem key={index} focus={index==0?true:false} bgColor={TabItemColor} length={this.state.topic_tabs.length} topic_ttitle={item.topic_ttitle} onFocused={()=>{this._onFocused(index)}}/>
      )
    })

    return (
        <Image
          style={styles.bg}
          source={{uri: this.state.bgimg}}
          >
          <LeView isWrapper={true} style={{ flexDirection: 'row',width:width,height:66,backgroundColor: '#000000', marginTop: 166, alignItems: 'center', justifyContent: 'space-around',}}>
          {TabTitles}
          </LeView>
          <ListView navigator={this.props.navigator}
            style={styles.listView}
            contentContainerStyle={styles.contentContainerStyle}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this) }
     
            onEndReachedThreshold={10}
            enableEmptySections={true}
            />
        </Image>
    );
  }

 renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => this.onClick(rowData.product_id) }>
         <LeView isWrapper={false}>
         <ShopItem list_img_url={rowData.list_img_url} product_name={rowData.product_name} price={rowData.price}  original_price={rowData.original_price} onPress={() => this.onClick(rowData.product_id) }/>
         </LeView>
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
    alignItems: 'center',
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
  nameFont:{
    height:40,
    marginTop:6,
    color:'#f0ffff',
    fontSize:16,
    flexWrap: 'wrap',
  },
  titleFont: {
    fontSize: 32,
    color: '#f0ffff',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  priceFont: {
    fontSize: 24,
    color: '#ffac00',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  originalpriceFont:{
    fontSize: 12,
    color: '#66ffffff',
    fontWeight: 'bold',
    paddingLeft: 10,
    textDecorationLine:'line-through',
  },
  item: {
    width:212,
    height:300,
    paddingLeft: 10,
    paddingTop: 10,
  },
  iconStyle: {
    width: 200,
    height: 212,
    borderTopLeftRadius: 16,
    borderTopRightRadius:16,
    resizeMode: 'stretch',
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

