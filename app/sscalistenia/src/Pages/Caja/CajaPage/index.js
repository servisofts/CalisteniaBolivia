import React, { Component } from 'react';
import { View, Text } from 'react-native';
import BackgroundImage from '../../../Component/BackgroundImage';
import BarraSuperior from '../../../Component/BarraSuperior';
import CalisPage from '../../../Component/CalisPage';
import { SText, STheme, SView } from '../../../SComponent';
import AperturaCaja from './AperturaCaja';
import EstadoCaja from './EstadoCaja';
import Sucursal from './Sucursal';

export default class CajaPage extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      sucursal: false
    };
  }

  render() {
    return (<CalisPage {...this.props} title={"Caja"}>
      <SView props={{
        col: "xs-12",
        variant: "center",
      }} style={{
        marginTop: 8,
      }}>

        <Sucursal navigation={this.props.navigation} key_sucursal={this.state.key_sucursal} sucursal={this.state.sucursal} setSucursal={(suc) => { this.setState({ sucursal: suc }) }} />
        <EstadoCaja navigation={this.props.navigation} sucursal={this.state.sucursal} setKeySucursal={(suc) => {
          if (!this.state.key_sucursal) {
            this.setState({ key_sucursal: suc })
          }
        }} />
      </SView>
    </CalisPage>
    );
  }
}
