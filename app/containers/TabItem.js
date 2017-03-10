import React from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';

var {FocusableView} = require('react-native-tv-focusable-view');

var {LeView} = require('react-native-tv-focusable-view');

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
class TabItem extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View style={{width:width/this.props.length,height:66,backgroundColor:this.props.bgColor,alignItems: 'center',justifyContent: 'center',}}>
      <Text style={styles.titleFont}>{this.props.topic_ttitle}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    titleFont: {
    fontSize: 32,
    color: '#f0ffff',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
});

module.exports = FocusableView(TabItem, true);