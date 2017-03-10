import React, { Component, PropTypes } from 'react';
import {
    requireNativeComponent,
    Text,
    View
} from 'react-native';

let iface = {
    name: 'LeButton',
    propTypes: {
        text: PropTypes.string,
         ...View.propTypes
    },
};
module.exports = requireNativeComponent('LeButton', iface);
