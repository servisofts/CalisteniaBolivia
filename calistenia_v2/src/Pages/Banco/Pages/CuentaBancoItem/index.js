import { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { SMath, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
let component = "cuentaBanco";

class CuentaBancoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  getAllMovimientos = (key_cuenta_banco) => {
    var reducer = this.props.state["cuentaBancoMovimientoReducer"];
    if (!reducer.data[key_cuenta_banco]) {
      if (reducer.estado == "cargando") {
        return false;
      }
      SSocket.send({
        component: "cuentaBancoMovimiento",
        type: "getAllByKeyCuentaBanco",
        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        key_cuenta_banco: key_cuenta_banco,
        estado: "cargando"
      })
      return false;
    }
    var data = reducer.data[key_cuenta_banco];
    return data;
  }
  getTotal(key_cuenta_banco) {
    var data = this.getAllMovimientos(key_cuenta_banco);
    if (!data) return "0";
    var total = 0;
    Object.keys(data).map((key) => {
      total += data[key].monto;
    })
    return total.toFixed(2) + "";
  }
  getAll = () => {
    var reducer = this.props.state.cuentaBancoReducer;
    var keyBanco = this.props.key_banco;
    var data = reducer.data[keyBanco];
    if (!data) {
      if (reducer.estado == "cargando") {
        return <Text>Cargando</Text>;
      }
      SSocket.send({
        component: component,
        type: "getAll",
        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        key_banco: this.props.key_banco,
        estado: "cargando"
      })
      return <Text></Text>;
    }
    // return Object.keys(data).map((key) => {
    var obj = data[this.props.key_cuenta_banco];
    if (!obj) return <Text></Text>;
    if (obj.estado == 0) return <View />
    return (
      <SView col={"xs-11.6"} key={obj.key} style={{
        height: 50,
      }} >
        <SView style={{
          width: "100%",
          height: "100%",
          borderRadius: 4,
          backgroundColor: STheme.color.card,
        }} row center>

          <SView style={{
            flex: 1,
            height: "100%",
            justifyContent: "center",
            paddingStart: 4,
            // alignItems: "center",
          }}>
            <SText fontSize={16}>{obj.codigo}</SText>
            <SText color={STheme.color.lightGray} >{obj.descripcion}</SText>

          </SView>
          <SView style={{
            width: 100,
            height: 40,
          }} center >
            <SView style={{
              width: 95,
              height: 35,
              overflow: "hidden",
            }} center card>
              <SText>Saldo total {SMath.formatMoney(this.getTotal(obj.key))}</SText>
              {/* <SText> {SMath.formatMoney(this.getTotal(obj.key))}</SText> */}
            </SView>
          </SView>
          <SView style={{
            width: 20,
            height: 40,
          }} center >
            <SText color={STheme.color.lightGray} >Bs.</SText>
          </SView>
          <SView width={8} />
        </SView>
      </SView>
    );
    // })

  }
  render() {
    if (!this.props.key_banco) {
      return <View />
    }

    return (
      <SView col={"xs-12"} center row >
        {this.getAll()}
      </SView>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(CuentaBancoItem);