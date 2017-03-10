import React from 'react';
import {
  Animated,
  Image,
  Text,
  StyleSheet,
  View,
  ToastAndroid,
  TouchableWithoutFeedback
} from 'react-native';

var {FocusableView} = require('react-native-tv-focusable-view');

var {LeView} = require('react-native-tv-focusable-view');

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

class LeftButton extends React.Component {
  constructor() {
    super();
  }
press(){
  ToastAndroid.show('121',1000);
}
  render() {
    return (
      <TouchableWithoutFeedback accessible={false} onPress={()=>this.props.onFocused()}>
      <View style={styles.category}>
        <Image style={styles.item} source={this.props.left_bg}>
          <Image style={styles.icon}  source={this.props.icon}/>
          <Text style = {[styles.font,this.props.font_color]}> {this.props.category_name} </Text>
        </Image>
      </View>
      </TouchableWithoutFeedback>
  
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#069ff1',
    height: 160,
    width: 200
  },
 font: {
    width: 160,
    height: 40,
    fontSize: 26,
    fontWeight: 'bold',
  },
  focus: {
    borderRadius:4,
    borderWidth:2,
    borderColor: '#eee',
    overflow: 'visible'
  },
 item: {
    flex: 1,
    width: width/5,
    height: 116,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'stretch',
  },
  icon: {
    resizeMode: 'stretch',
    width: 40,
    marginLeft: 30,
    alignItems: 'center',
    height: 40,
  },
  blur: {
    borderWidth: 0
  },

  titleNormal: {
    height: 40,
    textAlign: 'center',
    color: '#666',
    fontSize: 20
  },
  category: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 86,
  },
  titleFocus: {
    height: 40,
    textAlign: 'center',
    color: '#fff',
    fontSize: 20
  }
});

module.exports = FocusableView(LeftButton, true);