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
  Navigator,
  Platform,
  BackAndroid,
  ToastAndroid,
  View
} from 'react-native';
var Home = require('./app/pages/home');

class LetvShoppingRn extends Component {
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
      // BackAndroid.addEventListener('sss',this.onBackAndroid,true);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  onBackAndroid = () => {
    const navigator = this.refs.navigator;
    const routers = navigator.getCurrentRoutes();
    if (routers.length > 1) {
      navigator.pop();
      return true;//接管默认行为
    } else {

      //到了主页了
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
        return false;
      }
      this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
      return true;
    }
    // return false;//默认行为

  };
  render() {
    let defaultName = 'Home';
    let defaultComponent = Home;
    return (
      <Navigator
        initialRoute={{ name: defaultName, component: defaultComponent }}
        //配置场景
        ref="navigator"
        configureScene=
        {
          (route) => {

            //这个是页面之间跳转时候的动画，具体有哪些？可以看这个目录下，有源代码的: node_modules/react-native/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js

            return Navigator.SceneConfigs.PushFromRight;
          }
        }
        renderScene={
          (route, navigator) => {
            let Component = route.component;
            return <Component {...route.params} navigator={navigator} />
          }
        } />
    );
  }
}

AppRegistry.registerComponent('LetvShoppingRn', () => LetvShoppingRn);
