
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
import Hiscolcategory from '../containers/Hiscolcategory';
var Cart = require('./cart');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
// 导入json数据
var hiscolData = require('../constants/hiscol.json');
import Realm from 'realm';//realm 数据库
var ImageButton=require('../containers/ImageButton');//商品item
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
var Hisproduct=realm.objects('Good').filtered('colOrHis = "His"');
var Colproduct=realm.objects('Good').filtered('colOrHis = "Col"');
var index = 0;
var data = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
export default class HisCol extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: data.cloneWithRows(Colproduct),
      bgImgUrl: 'http://static.scloud.letv.com/res/8c82bff5-e25a-46ae-832a-bc01924f189b.jpg',
    };
  }
 
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.bg}
          source={{ uri: this. state.bgImgUrl }}
          >
          <Image
            style={styles.leftBg}
            source={require('../img/lepay_hb_menubg.png') }
            >
            <View style={styles.title}>
              <Image
                style={styles.icon}
                source={require('../img/ic_back.png') }
                />
              <Text style={styles.titleFont}>收藏/历史</Text>
            </View>
            <Hiscolcategory
              style={{ flex: 1 }}
              onSelect={this.selectCategory.bind(this) }/>

          </Image>
          <ListView navigator={this.props.navigator}
            style={styles.listView}
            contentContainerStyle={styles.contentContainerStyle}
            dataSource={this.state.dataSource}
            enableEmptySections = {true}
            renderRow={this.renderRow.bind(this) }
            />
        </Image>
      </View>

    );
  }
  renderRow(rowData) {
    //alert(index++);
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => this.onClick(rowData.product_type) }>
       <ImageButton adv_img={rowData.product_img} iconStyle={styles.iconStyle} onPress={() => this.onClick(rowData.product_type) }/>
      </TouchableOpacity>
    );
  }
  selectCategory(category_id) {
    if(category_id=='0')
    this.setState({
      dataSource: data.cloneWithRows(Colproduct),
    });
    else
    this.setState({
      dataSource: data.cloneWithRows(Hisproduct),
    });
  }
  onClick(type) {
    const { navigator } = this.props;//得到全局的navigator
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if (navigator) {
      type=='HisCol'?
      navigator.push({
        name: 'HisCol',
        component: HisCol,
      })
      :
      navigator.push({
        name: 'Cart',
        component: Cart,
      })

    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
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
    marginTop: 80,
  },
  contentContainerStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
});
