import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SView } from '../../../../SComponent';

export default class ConfirmacionUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SView 
      props={{
          customStyle:"primary"
      }}
      style={{
          width:"100%",
          height:100
      }}>

      </SView>
    );
  }
}
