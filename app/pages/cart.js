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
  View
} from 'react-native';
var Pay = require('./pay');
var LeButton = require('../containers/LeButton');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };

  }
  componentDidMount() {
    this.setState({
      count: this.props.count,
    });
  }
  render() {
    return (
      <Image
        style={styles.bg}
        source={require('../img/pic_shopping_pay_bg.jpg') }>
        <View style={styles.title}>
          <Image
            style={styles.icon}
            source={require('../img/ic_back.png') }
            />
          <Text style={styles.titleFont}>购物车</Text>
        </View>
        <View style={styles.content}>

          <Text style={styles.textFont}>您选中了{this.state.count}件商品</Text>
          <TouchableOpacity activeOpacity={0.5} onPress={() => this.onClick() }>
            <Image source={require('../img/btn_icon.png') } style={styles.buttonStyle}>
              <Text style={styles.titleFont}>立即支付</Text>
            </Image>

          </TouchableOpacity>

          <LeButton style={styles.leButtonStyle} text='调用原生自定义button'/>
        </View>
      </Image>

    );
  }
  onClick() {
    const { navigator } = this.props;//得到全局的navigator
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if (navigator) {
      navigator.push({
        title: 'Pay',
        component: Pay,
        params: {
          count: this.state.count,
        }
      })
    }
  }

}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    flexDirection: 'column',
    width: width,
    height: height,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    width: width,
    height: 100,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomColor: '#FFFFFF33',
    borderBottomWidth: 0.5,
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
  icon: {
    resizeMode: 'stretch',
    width: 40,
    marginLeft: 30,
    alignItems: 'center',
    height: 40,
  },
  textFont: {
    width: width / 6,
    height: 100,
    fontSize: 26,
    color: 'red',
    justifyContent: 'center',
  },

  buttonStyle: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
    leButtonStyle: {
    width: 212,
    height: 56,
    marginTop:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = Cart;
