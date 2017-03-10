
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
  RefreshControl,
  ScrollView,
} from 'react-native';


import {getJson} from '../containers/getSignatureUrl';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

export default class ProductInfo extends Component {
  constructor(props) {
    super(props);
    let data1 = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    let data2 = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: data1,
      dataSource2: data2,
      bgImgUrl: 'http://static-scloud.cp21.ott.cibntv.net/res/1861087e-8476-4a32-8bfb-8873befe4c63.jpg',
      productInfo:[],
      productImgList:[],
      productImgListleftCenter:[],
    };
  }
 
 componentDidMount(){
   getJson("product_ids:"+this.props.productId+" type:id","https://lebuy.scloud.letv.com/api/v3/product/info",(responseJson)=>{
     
     this.setState({
          dataSource:this.state.dataSource.cloneWithRows(this.state.productImgList.concat(responseJson.data[0].detail_imgs)),
          dataSource2:this.state.dataSource2.cloneWithRows(this.state.productImgListleftCenter.concat(responseJson.data[0].skus[0].imgs)),
          productImgListleftCenter:responseJson.data[0].skus[0].imgs,
          productImgList:responseJson.data[0].detail_imgs,
          productInfo:responseJson.data,     
        })
      });
 }
 
    render() {
    let productInfo=this.state.productInfo;
    if(productInfo.length>0){
    var list_img_url=productInfo[0].list_img_url;
    var product_desc=productInfo[0].product_desc;
    var shop_name=productInfo[0].skus[0].shop_name;

    var sku_name=productInfo[0].skus[0].sku_name;
    var price=productInfo[0].skus[0].price;
    var original_price=productInfo[0].skus[0].original_price
    ;
    var shop_contact_number=productInfo[0].skus[0].shop_contact_number;
    }
    var productImgList=this.state.productImgList.map((item)=>{
        return (
       <Image source={{ uri: item}} style={styles.iconStyle1}/>
      )
    })
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
                <Text style={styles.titleFont}>商品详情</Text>
              </View>
      <ScrollView style={styles.ScrollView}>
         <View style={{flex:1,flexDirection: 'row',width: width,}}>
          <View style={{width:440, marginLeft: 138,flexDirection: 'column',alignItems: 'center'}}>
          
          <Image source={{ uri: list_img_url}} style={styles.leftTopContent}>
              <Text style={{fontSize: 20,}}>{shop_name} 咨询电话:{shop_contact_number}</Text>
          </Image>

          <ListView 
            horizontal = {true}
            dataSource={this.state.dataSource2}
            renderRow={this.renderRow.bind(this) }
            enableEmptySections={true}
            />
        </View>

        <View style={{width:width/2, marginLeft: 20,flexDirection: 'column',}}>
          <Text style={{marginTop: 44,fontSize: 40,color:'#f0f8ff'}}>{sku_name}</Text>
          <Text style={{fontSize: 40,color:'#f0f8ff'}}>现价:{price} 原价:{original_price}</Text>
          <Text style={{fontSize: 20,color:'#f0f8ff'}}>{product_desc}</Text>
        </View>
        </View>
        <View style={{marginTop: 44,marginLeft: 138,}}>
         {productImgList}
        </View>
      </ScrollView>
          </Image>
      </View>
    );
  }
  
  renderRow(rowData) {
    //alert(index++);
    return (
        <View style={styles.item}>
          <Image source={{ uri: rowData}} style={styles.iconStyle}/>
        </View>
    );
  }
    
  onBackClick(){
  const { navigator } = this.props;
    if (navigator) {
         //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:了
        navigator.pop();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  ScrollView:{
    flex: 1,
    width: width,
  },
  leftTopContent:{
    width: 440,
    height: 440,
    marginTop: 44,
   alignItems: 'flex-end'
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
    paddingRight: 12,
    paddingTop: 20,
  },
  iconStyle: {
    width: 100,
    height: 100,

  },
    iconStyle1: {
    width: width,
    height: height,
  },

  refreshStyle: {
    justifyContent: 'center',
  },
});

