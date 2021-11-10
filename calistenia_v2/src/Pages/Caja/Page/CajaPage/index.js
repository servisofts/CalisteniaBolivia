import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SHr, SNavigation, SScrollView, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import EstadoCaja from './EstadoCaja';
import Movimientos from './Movimientos';
import Sucursal from './Sucursal';
import Menu from './Menu/index';
import FloatButtom from '../../../../Components/FloatButtom/index';
import CajasActivas from './CajasActivas';
import { SPage, SStorage } from 'servisofts-component';
import BarraSuperior from '../../../../Components/BarraSuperior';

var _sucursal;
export default class CajaPage extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      sucursal: _sucursal,
      activa: false,
      montoEnCaja: 0,
    };
  }
  componentDidMount() {
    SStorage.getItem("sucursal", (vl) => {
      this.setState({ key_sucursal: vl });
    })
  }

  getFB() {
    if (!this.state.activa) return <View />
    return <FloatButtom label={"+"} onPress={() => {
      if (!this.state.activa.key) {
        return null;
      }
      this.props.navigation.navigate("CajaMovimientoRegistroPage", { key_caja: this.state.activa.key });
    }} />
  }
  render() {
    _sucursal = this.state.sucursal;
    return (<SPage title={"Caja"} hidden disableScroll>
      <BarraSuperior title={"Caja"} goBack={() => {
        SNavigation.goBack();
      }} />
      <SView col={"xs-12"} style={{
        flex: 1,
        width: "100%",
      }}>
        <SScrollView2 disableHorizontal style={{
          width: "100%"
        }}>
          <SView col={"xs-12"} center>
            <SHr />
            <Sucursal
              navigation={this.props.navigation}
              key_sucursal={this.state.key_sucursal}
              sucursal={this.state.sucursal}
              key_caja={this.state.key_caja}
              setSucursal={(suc) => {
                SStorage.setItem("sucursal", suc.key)
                this.setState({ sucursal: suc, key_sucursal: suc.key });
              }}
            />
            <SHr />
            <CajasActivas sucursal={this.state.sucursal} key_caja={this.state.key_caja} />
            <SHr />
            <EstadoCaja
              montoEnCaja={this.state.montoEnCaja}
              navigation={this.props.navigation}
              sucursal={this.state.sucursal}
              setKeySucursal={(suc, key_caja) => {
                if (!this.state.key_sucursal) {
                  this.setState({ key_sucursal: suc, key_caja: key_caja });
                }
              }} />
            <Menu />
            <Movimientos setActiva={(caja) => {
              if (!this.state.activa) {
                this.setState({ activa: caja })
              }
            }} />
          </SView>
          <SView style={{
            height: 20,
          }}></SView>

        </SScrollView2>
        {this.getFB()}
      </SView>
    </SPage>
    );
  }
}
