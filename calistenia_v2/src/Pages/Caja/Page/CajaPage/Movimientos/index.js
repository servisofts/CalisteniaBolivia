import { Component } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { SButtom, SDate, SIcon, SMath, SNavigation, SOrdenador, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Model from '../../../../../Model';
import TipoPago from '../../../../TipoPago';
//import SSocket from 'servisofts-socket';
// import Actions from '../../../../Actions'

const changeTipoPago = {
  "efectivo": "Efectivo",
  "tarjeta": "Tarjeta",
  "transferencia": "Transferencia",
  "cheque": "Cheque",
}


class Movimientos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sucursal: false
    };
  }
  componentDidMount() {
    this.activa = this.props.state.cajaReducer.usuario[this.props.state.usuarioReducer.usuarioLog.key];
    if (!this.activa) return;
    SSocket.send({
      component: "cajaMovimiento",
      type: "getByKeyCaja",
      key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
      key_caja: this.activa.key,
      estado: "cargando"
    }, true);
  }
  getCajaTipoMovimientos() {
    var reducer = this.props.state.cajaTipoMovimientoReducer;
    var data = reducer.data;
    if (!data) {
      if (reducer.estado == "cargando") return false;
      if (reducer.estado == "error") return false;
      SSocket.send({
        component: "cajaTipoMovimiento",
        type: "getAll",
        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        estado: "cargando"
      }, true);
      return false;
    }
    return data;
  }
  getMovimientos(key_caja) {
    var reducer = this.props.state.cajaMovimientoReducer;
    var data = reducer.data[key_caja];
    if (!data) {
      if (reducer.estado == "cargando") return false;
      if (reducer.estado == "error") return false;
      SSocket.send({
        component: "cajaMovimiento",
        type: "getByKeyCaja",
        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        key_caja: key_caja,
        estado: "cargando"
      }, true);
      return false;
    }
    return data;
  }
  getIcon(monto) {
    return <SIcon name={(monto >= 0 ? "Ingreso" : "Egreso")} style={{ width: 34, height: 34, }} />
  }
  getUsuario(data) {
    if (!data.data) return <View />
    if (!data.data.key_usuario) return <View />
    var usuarios = Model.usuario.Action.getAll();
    if (!usuarios) return <View />
    var usr = usuarios[data.data.key_usuario];
    if (!usr) return <View />
    return <SText style={{
      textTransform: "capitalize",
      color: "white"
    }} onPress={() => {
      SNavigation.navigate("ClientePerfilPage", {
        key: usr.key
      })
    }}>{usr.Nombres} {usr.Apellidos}</SText>
  }
  getIconTipoPago(type, data) {
    // alert(JSON.stringify(data))
    // return <SText>{JSON.stringify(data.data)}</SText>
    if (!data.data) return <SIcon name={"Money"} style={{ width: 34, height: 34, }} />;
    return <SView style={{ width: 34, height: 34, }}>{TipoPago.Actions.getIcon(data.data.key_tipo_pago)}</SView>;
  }
  getIconTipo(type, monto) {
    switch (type.key) {
      case "1": return <SIcon name="Add" style={{ width: 34, height: 34, }} />; //apertura
      case "3": return <SIcon name="Paquete" style={{ width: 34, height: 34, }} />; //venta_servicio
      case "4": return <SIcon name={"Caja"} style={{ width: 34, height: 34, }} />; //movimiento de caja
      default: return <SIcon name="Add" style={{ width: 34, height: 34, }} />;
    }
  }
  getLista() {
    var movimientos = this.getMovimientos(this.activa.key);
    if (!movimientos) return <ActivityIndicator color={STheme.color.text} />;
    var tipoMovimientos = this.getCajaTipoMovimientos();
    if (!tipoMovimientos) return <ActivityIndicator color={STheme.color.text} />;
    this.moviminetos = movimientos;

    return new SOrdenador([{ key: "fecha_on", order: "desc", peso: 1 }]).ordernarObject(movimientos).map((key, index) => {
      var timpoMovimiento = tipoMovimientos[movimientos[key].key_caja_tipo_movimiento];
      var monto = movimientos[key].monto;
      if (monto % 1 != 0) monto = monto.toFixed(2);

      if (movimientos[key].estado == "3") return null;
      // if (movimientos[key].estado == "3" || movimientos[key].descripcion == "Cancelacion de servicio") return null;

      // Traspaso a bancos ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss

      return (
        <View key={index} style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center", padding: 4 }}>
          <View style={{ backgroundColor: STheme.color.card, width: "100%", height: 70, borderRadius: 4, flexDirection: "row", }}>
            <SView style={{
              flex: 1,
              height: "100%",
              padding: 4,
            }}
              props={{ direction: "row" }}
            >
              <SView col={"xs-12"} >
                <Text style={{ color: STheme.color.text, fontSize: 14 }}>{movimientos[key].descripcion}</Text>
                <Text style={{ color: STheme.color.darkGray, fontSize: 10 }}>{new SDate(movimientos[key].fecha_on).toString("MONTH, dd  - hh:mm")}</Text>
                {this.getUsuario(movimientos[key])}
              </SView>

            </SView>

            <SView style={{
              width: 40,
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}>
              {this.getIconTipoPago(timpoMovimiento, movimientos[key])}
            </SView>
            <SView style={{
              width: 40,
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}>
              {this.getIconTipo(timpoMovimiento, movimientos[key].monto)}
            </SView>
            <SView style={{
              width: 40,
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}>
              {this.getIcon(movimientos[key].monto)}
            </SView>
            <View style={{
              width: 90,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}>
              <Text style={{ color: STheme.color.text, fontSize: 10, height: 20, }}>Bs.</Text>
              <Text style={{ color: STheme.color.text, fontSize: 16, }}>{SMath.formatMoney(monto)}</Text>
            </View>
          </View>
        </View >
      )
    })
  }
  getDetalle(mensaje, icon, monto) {
    return <SView col={"xs-4 md-3 xl-2"} center style={{
      height: 70,
    }}>
      <SText style={{
        fontSize: 10,
        textAlign: "center"
      }}>{mensaje}</SText>

      <SView style={{
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
      }}>
        {icon}
      </SView>


      <SText style={{
        fontSize: 10,
        textAlign: "center"
      }}> {monto} bs</SText>
    </SView>
  }
  getTipoPago() {
    var reducer = this.props.state.tipoPagoReducer;
    var data = reducer.data;
    if (!data) {
      if (reducer.estado == "cargando") return false;
      var object = {
        component: "tipoPago",
        type: "getAll",
        estado: "cargando",
        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
      }
      SSocket.send(object, true);
      return false;
    }
    return data;
  }
  getInfo() {
    var tiposPagos = this.getTipoPago();
    if (!tiposPagos) return <View />

    var total = { ingreso: 0, egresoCaja: 0, egresoTraspasoBanco: 0 }
    var total_tipo_pago = {}
    var total_tipo_movimiento = {}



    // tarea6  ✅ ✅ ✅
    if (this.moviminetos) {
      Object.values(this.moviminetos).map((o) => {
        // if (o.estado == "3" || o.descripcion == "Cancelacion de servicio") return null;
        if (o.estado == "3") return null;
        // alvarosiles
        console.log("ostia", o)
        if (o.monto >= 0) {
          total.ingreso += o.monto;

          if (!total_tipo_pago[o.key_tipo_pago]) total_tipo_pago[o.key_tipo_pago] = 0
          total_tipo_pago[o.key_tipo_pago] += o.monto;

          if (!total_tipo_movimiento[o.key_caja_tipo_movimiento]) total_tipo_movimiento[o.key_caja_tipo_movimiento] = 0
          total_tipo_movimiento[o.key_caja_tipo_movimiento] += o.monto;
        }
        else {
          if (o.key_tipo_pago == "2" || o.descripcion == "Traspaso a bancos" || o.descripcion == "Transferencia por apertura" || o.descripcion == "Transferencia por cierre") {
            total.egresoTraspasoBanco += o.monto;
          } else {
            total.egresoCaja += o.monto;
          }
        }

        // if (!total_tipo_pago[o.key_tipo_pago]) total_tipo_pago[o.key_tipo_pago] = 0
        // total_tipo_pago[o.key_tipo_pago] += o.monto;

        // if (o.monto >= 0) { total_tipo_pago[o.key_tipo_pago] += o.monto; }

        // if (!total_tipo_movimiento[o.key_caja_tipo_movimiento]) total_tipo_movimiento[o.key_caja_tipo_movimiento] = 0
        // total_tipo_movimiento[o.key_caja_tipo_movimiento] += o.monto;
      })
    }


    // tarea6  ✅ ✅ ✅

    return <SView center col={"xs-12 md-10 xl-8"} row>
      <SView col={"xs-12"} height={32} center style={{ borderBottomWidth: 1, borderBottomColor: STheme.color.card }}></SView>
      <SView col={"xs-12"} height={32} center>
        <SText style={{ color: STheme.color.darkGray }}>Informacion</SText>
      </SView>
      {this.getDetalle("Ingreso de caja", this.getIcon(1), SMath.formatMoney(total.ingreso))}
      {this.getDetalle("Egreso de caja", this.getIcon(-1), SMath.formatMoney(total.egresoCaja))}
      {this.getDetalle("Egreso de traspaso a bancos", this.getIcon(-1), SMath.formatMoney(total.egresoTraspasoBanco))}

      <SView col={"xs-12"} height={32} center style={{ borderBottomWidth: 1, borderBottomColor: STheme.color.card }}></SView>
      <SView col={"xs-12"} height={32} center>
        <SText style={{ color: STheme.color.darkGray }}>Tipos de pagos</SText>
      </SView>
      {Object.keys(tiposPagos).map((key, index) => {
        return this.getDetalle(changeTipoPago[tiposPagos[key].descripcion], this.getIconTipoPago(null, { data: { key_tipo_pago: key } }),
          SMath.formatMoney(total_tipo_pago[key] ?? 0))
      })}
      <SView col={"xs-12"} height={32} center>
        <SText style={{ color: STheme.color.darkGray, fontSize: 10, }}>Los pagos en tarjeta y transferecia se ingresan automaticamente al banco.</SText>
      </SView>
      <SView col={"xs-12"} height={32} center style={{ borderBottomWidth: 1, borderBottomColor: STheme.color.card }}></SView>
      <SView col={"xs-12"} height={32} center>
        <SText style={{ color: STheme.color.darkGray }}>Tipos de movimientos</SText>
      </SView>
      {this.getDetalle("Movimiento de apertura", this.getIconTipo({ key: "1" }), SMath.formatMoney(total_tipo_movimiento[1] ?? 0))}
      {this.getDetalle("Movimiento de venta de paquete", this.getIconTipo({ key: "3" }), SMath.formatMoney(total_tipo_movimiento[3] ?? 0))}
      {this.getDetalle("Movimiento de caja", this.getIconTipo({ key: "4" }), SMath.formatMoney(total_tipo_movimiento[4] ?? 0))}

      <SView col={"xs-12"} height={32} center style={{ borderBottomWidth: 1, borderBottomColor: STheme.color.card }}></SView>

    </SView>

  }

  render() {
    this.activa = this.props.state.cajaReducer.usuario[this.props.state.usuarioReducer.usuarioLog.key];
    if (!this.activa) return <View />;
    if (this.props.setActiva) this.props.setActiva(this.activa);
    return (
      <SView col={"xs-12"} center style={{
        marginTop: 16,
      }}>

        <SView style={{ height: 16 }}></SView>
        <SText props={{ type: "primary" }}>Movimientos</SText>
        <SView col={"xs-12 md-8 xl-6"}>
          {this.getLista()}
          <SView col={"xs-12"} style={{
            height: 50,
          }}>

          </SView>
        </SView>
        {this.getInfo()}
        <SView col={"xs-12"} height={32} ></SView>
        <SButtom type={"danger"} onPress={() => {
          SNavigation.navigate("punto_venta", { key_sucursal: this.activa.key_sucursal });
        }}>MOLINETE</SButtom>
        <SView col={"xs-12"} height={62} center></SView>
      </SView>
    )
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(Movimientos);