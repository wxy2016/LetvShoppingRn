
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

var {FocusableView} = require('react-native-tv-focusable-view');

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
export default class ShopItem extends Component {
 
  constructor(props) {
    super(props);
   
 
 
}
  render() {
    return (
        <View style={styles.item}>
          <Image source={{ uri: this.props.list_img_url }} style={styles.iconStyle}/>
          <View style={{backgroundColor:'transparent',height:88}}>
          <Text numberOfLines={2} style={styles.nameFont}>{this.props.product_name}</Text>
          <View style={{ flexDirection: 'row', alignItems:'flex-end',}}>
          <Text style={styles.priceFont}>￥{this.props.price}</Text>
          <Text style={styles.originalpriceFont}>￥{this.props.original_price}</Text>
          </View>
          </View>
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
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom:10,
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

module.exports = FocusableView(ShopItem, true);