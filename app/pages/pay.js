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
  ToastAndroid,
  View
} from 'react-native';
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

class Pay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paySuccess: false,
      count:0,
    }
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
            <Text style={styles.titleFont}>订单支付</Text>
          </View>
          <View style={styles.content}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.onClick() }>
              <Image source={this.state.paySuccess ? require('../img/btn_unable.png') : require('../img/btn_icon.png') } style={styles.buttonStyle}>
                <Text style={styles.titleFont}>{this.state.paySuccess ? '支付完成' : '点击支付'}</Text>
              </Image>

            </TouchableOpacity>
          </View>
        </Image>

    );
  }
  onClick() {
    ToastAndroid.show('支付成功，返回继续浏览', ToastAndroid.SHORT);
    this.setState(
      {
        paySuccess: true,
        count:0,
      });
  }
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: width,
    height: height,
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
  icon: {
    resizeMode: 'stretch',
    width: 40,
    marginLeft: 30,
    height: 40,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
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

  buttonStyle: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
});

module.exports = Pay;
