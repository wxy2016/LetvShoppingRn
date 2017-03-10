import React from 'react';
import {
  TouchableOpacity
} from 'react-native';

var {FocusableView} = require('react-native-tv-focusable-view');

var LeftButton=require('./LeftButton');



class LeftButtonTouch extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <TouchableOpacity   underlayColor ='#eef0f3' onPress={()=>this.ontouch(this.props.index)}>
             <LeftButton left_bg={this.props.left_bg} icon={this.props.icon} category_name={this.props.category_name} font_color={this.props.font_color} index={this.props.index} ontouch={() => this.select(index)}/>
        </TouchableOpacity>  
    );
  }
  ontouch(index){
    this.props.ontouch(index);
}
}

module.exports = FocusableView(LeftButtonTouch, true);