
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

import {getJson} from '../containers/getSignatureUrl';
import ProductInfo from './ProductInfo';
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var ShopItem=require('../containers/ShopItem');//商品item
export default class TimeLimitBuy extends Component {
 
  constructor(props) {
    super(props);
    let data = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: data,
      topic_id:'',
      bgimg: 'http://static.scloud.letv.com/res/8c82bff5-e25a-46ae-832a-bc01924f189b.jpg',
      GoodsData:[],
      offset:0,
      begin_time:'',
      end_time:'',
      update_time:'',
      limitTimes:'',
      limitTimesTitle:'',
    };
  }
 
 getTopicData(topic_id,offset){
   getJson("topic_id:"+topic_id+" limit:50 offset:"+offset,"https://lebuy.scloud.letv.com/api/v3/topic",(responseJson)=>{
     if(responseJson.data.list.length>1){
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(this.state.GoodsData.concat(responseJson.data.list)),
          GoodsData:this.state.GoodsData.concat(responseJson.data.list),
          topic_id:topic_id,
          bgimg:responseJson.data.info.bgimg,
          begin_time:responseJson.data.info.begin_time,
          end_time:responseJson.data.info.end_time,
          update_time:responseJson.data.info.update_time,
          offset:this.state.offset+50,      
        })
     }
     else
        ToastAndroid.show("已到底部",1000);
      });
 }

 componentWillMount(){
   this.getTopicData(this.props.topic_id,this.state.offset);
 }
  componentWillUnmount() { 
      clearInterval(this.interval);
  }
  getTimeStr(limitTime){
    let day=Math.floor(limitTime/(24*3600*1000));
    let hours=limitTime%(24*3600*1000)
    let hour=Math.floor(hours/(3600*1000));
    let minutes=hours%(3600*1000);
    let minute=Math.floor(minutes/(60*1000));
    let seconds=minutes%(60*1000);
    let second=Math.floor(seconds/1000);
            
    if(day>0){
        return day+"天 "+hour+":"+minute+":"+second;
      }else if(hour>0){
        return hour+":"+minute+":"+second;
      }else if(minute>0){
        return minute+":"+second;
      }else{
        return second+"秒";
      }
  }
componentDidMount(){
  this.interval=setInterval(() => { 

            let limitTimess='';
            let limitTimesTitle='';

            if(((new Date()).valueOf()-this.state.begin_time*1000)<0){
              limitTimesTitle='距开始时间还有：';
              limitTimess=this.getTimeStr(this.state.begin_time*1000-(new Date()).valueOf());
            }else if(((new Date()).valueOf()-this.state.end_time*1000)<0){
              limitTimesTitle='距结束时间还有：';
              limitTimess=this.getTimeStr(this.state.end_time*1000-(new Date()).valueOf());
            }else{
               limitTimesTitle='活动已经结束';
               limitTimess='';
            }

            this.setState({
                limitTimes:limitTimess,
                limitTimesTitle:limitTimesTitle,
            });
      },  
      1000  
    );  
}
  render() {
    return (
        <Image
          style={styles.bg}
          source={{uri: this.state.bgimg}}
          >
          <View style={{width:width,height:66,backgroundColor: '#000000', marginTop: 166, alignItems: 'center', justifyContent: 'center',}}>
          <Text style={styles.titleFont}>{this.state.limitTimesTitle}{this.state.limitTimes}</Text>
          </View>
          <ListView navigator={this.props.navigator}
            style={styles.listView}
            contentContainerStyle={styles.contentContainerStyle}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            onEndReachedThreshold={10}
            enableEmptySections={true}
            />
        </Image>
    );
  }
        //  onEndReached={this._onRefresh.bind(this)}
  // _onRefresh(){
   
  //   this.getMoreGoodsData(this.props.topic_id,this.state.offset);

  // }
 renderRow(rowData, sectionID, rowID) {
    //alert(index++);
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => this.onClick(rowData.product_id) }>
        <ShopItem focus={rowID==0?true:false} list_img_url={rowData.list_img_url} product_name={rowData.product_name} price={rowData.price}  original_price={rowData.original_price} onPress={() => this.onClick(rowData.product_id) }/>
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

