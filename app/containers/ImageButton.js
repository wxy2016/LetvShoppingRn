import React from 'react';
import {
  Image,
  View,
} from 'react-native';

var {FocusableView} = require('react-native-tv-focusable-view');

class ImageButton extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View>
          <Image style={this.props.iconStyle}  source={{ uri:this.props.adv_img}}/>
      </View>
  
    );
  }
}

module.exports = FocusableView(ImageButton, true);