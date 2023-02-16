import { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { SHr, SLoad, SMath, SText, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Sucursal from '../../../../Sucursal';
import sucursal_usuario from '../../../../sucursal_usuario';
let component = "cuentaBanco";

class CuentasLista extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }



  getMovimientos(key_cuenta_banco) {
    var reducer = this.props.state["cuentaBancoMovimientoReducer"];
    if (!reducer.data[key_cuenta_banco]) {
      return;
    }
    return reducer.data[key_cuenta_banco];
  }
  getAllMontoCuenta = (key_cuenta_banco) => {
    var movimientos = this.getMovimientos(key_cuenta_banco);
    if (!movimientos) {
      return 0;
    }
    var monto = 0;
    Object.keys(movimientos).map((key) => {
      monto += movimientos[key].monto;
    })
    if (monto % 1 > 0) monto = monto.toFixed(2);
    return monto;
  }
  getAll = () => {
    var reducer = this.props.state.cuentaBancoReducer;
    var keyBanco = this.props.data.key;
    var data_sucursal_cuenta = Sucursal.SucursalTipoPagoCuentaBanco.getAll(this.props);
    if (!reducer.data[keyBanco]) {
      if (reducer.estado == "cargando") {
        return <Text>Cargando</Text>;
      }
      SSocket.send({
        component: component,
        type: "getAll",
        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        key_banco: this.props.data.key,
        estado: "cargando"
      })
      return <Text></Text>;
    }
    var data = reducer.data[keyBanco];
    if (!data) {
      return <Text></Text>;
    }
    if (!data_sucursal_cuenta) return <SLoad />
    return Object.keys(data).map((key) => {
      var obj = data[key];
      if (obj.estado == 0) return <View />
      var arr_active = Object.values(data_sucursal_cuenta).filter(i => i.key_cuenta_banco == obj.key);
      var isActive = false;
      // if (arr_active.length > 0) {
      arr_active.map((itm) => {
        if (!isActive) {
          isActive = sucursal_usuario.Actions.isActive(itm.key_sucursal, this.props);
        }
      })

      // vani con esto se desolculta
      // if (!isActive) {
      //     return null;
      // }
      // }
      return (
        <SView col={"xs-12"} key={obj.key} center style={{
          paddingTop: 4,
          paddingBottom: 4,
        }} onPress={() => {
          if (this.props.onSelect) {
            this.props.onSelect(obj);
            return;
          }
          this.props.navigation.navigate("CuentaMovimientosPage", {
            key_banco: this.props.data.key, key: obj.key
          });
        }}>
          <SView col={"xs-11.8"} style={{
            height: 60,
          }} center card>
            <SView style={{
              width: "100%",
            }} row>
              <SView style={{
                flex: 1,
                height: "100%",
                justifyContent: "center",
                paddingStart: 4,
                // alignItems: "center",
              }}>
                <SText style={{
                  fontSize: 16,
                }} >{obj.codigo}</SText>
                <SText style={{
                  color: "#999"
                }} >{obj.descripcion}</SText>

              </SView>

              {/* <View style={{ width: 110, height: 50, justifyContent: "center", alignItems: "center" }} > */}


              <SView style={{
                width: 200,
                // height: "100%",
                justifyContent: "flex-end",
                paddingStart: 4,
                paddingEnd: 4,
                // alignItems: "center",
              }} row  >

                {/* <SView center {this.getAllMontoCuenta(obj.key)  0 ? card ?? "blue"} card style={{ padding: 4, }}> */}

                <SView card center style={{ padding: 4, }}>
                  {/* Banca Lista (BancoPage) formatear monto moneda */}
                  <SText>{`Bs. ${SMath.formatMoney(this.getAllMontoCuenta(obj.key))}`}</SText>
                </SView>

              </SView>
            </SView>
            {/* <SView col={"xs-12"} style={{
                            flex: 1,
                        }}>
                            <MovimientosGraphic data={this.getMovimientos(obj.key)} />
                        </SView> */}
          </SView>

        </SView>
      );
    })

  }
  render() {
    if (!this.props.data) {
      return <View />
    }

    return (
      <SView col={"xs-12"} center row style={{
        // marginBottom: 32,
      }}>
        <SHr />
        {this.getAll()}
      </SView>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(CuentasLista);