import { Component } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { ExportExcel, SDate, SHr, SIcon, SMath, SNavigation, SOrdenador, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Model from '../../../../../Model';

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
      //todo
      component: "cajaMovimiento", type: "getByKeyCaja", key_usuario: this.props.state.usuarioReducer.usuarioLog.key, key_caja: this.activa.key, estado: "cargando"
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
      fontSize: 10,
      color: "#999"
    }} onPress={() => {
      SNavigation.navigate("ClientePerfilPage", {
        key: usr.key
      })
    }}>{usr.Nombres} {usr.Apellidos} </SText>
  }
  getUsuarioNombre(data) {
    if (!data.data) return;
    if (!data.data.key_usuario) return;
    var usuarios = Model.usuario.Action.getAll();
    if (!usuarios) return;
    var usr = usuarios[data.data.key_usuario];
    if (!usr) return;
    let aux = usr.Nombres + " " + usr.Apellidos
    return aux;
  }
  getIconTipoPago(type, data) {
    // alert(JSON.stringify(data))
    // return <SText>{JSON.stringify(data.data)}</SText>
    if (!data.data) return <SIcon name={"Money"} style={{ width: 34, height: 34, }} />;

    // console.log("chau ",data.data.)

    switch (data.data.key_tipo_pago) {
      case "1": return <SIcon name={"Money"} style={{ width: 34, height: 34, }} />;
      case "2": return <SIcon name={"Card"} style={{ width: 34, height: 34, }} />;
      case "3": return <SIcon name={"Tranfer"} style={{ width: 34, height: 34, }} />;
      case "4": return <SIcon name={"Cheque"} style={{ width: 34, height: 34, }} />;
      default: return <SIcon name={"Money"} style={{ width: 34, height: 34, }} />;
    }
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

      //alvaro aqui le pusiste
      if (movimientos[key].estado == "3") return null;
      // if (movimientos[key].estado == "3" && movimientos[key].descripcion == "Venta de servicio") return null;
      // if (movimientos[key].estado == "3" && movimientos[key].descripcion == "Traspaso a bancos") return null;

      return (
        <View key={index} style={{ width: "100%", alignItems: "center", justifyContent: "center", padding: 4 }}>
          <View style={{ backgroundColor: STheme.color.card, width: "100%", minHeight: 50, borderRadius: 4, flexDirection: "row", }}>
            {/* <SText>{key}</SText> */}
            <SView style={{
              flex: 1,
              height: "100%",
              padding: 4,
            }}
              props={{ direction: "row" }}
            >
              <SView col={"xs-12"} >
                <Text style={{ color: "#999", fontSize: 9 }}>{new SDate(movimientos[key].fecha_on).toString("MONTH, dd  - hh:mm")}</Text>
                <Text style={{ color: STheme.color.text, fontSize: 14 }}>{movimientos[key].descripcion}</Text>
                {this.getUsuario(movimientos[key])}
              </SView>
              {/* <SText>{JSON.stringify(movimientos[key])}</SText> */}
            </SView>


            <SView style={{
              width: 200,
              paddingBottom: 4,
              paddingTop: 4,
            }} center row>
              <SView row col={"xs-12 sm-8"} center>
                <SView style={{
                  width: 40,
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }} center>
                  {this.getIconTipoPago(timpoMovimiento, movimientos[key])}
                </SView>
                <SView style={{
                  width: 40,
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }} center>
                  {this.getIconTipo(timpoMovimiento, movimientos[key].monto)}
                </SView>
                <SView style={{
                  width: 40,
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }} center>
                  {this.getIcon(movimientos[key].monto)}
                </SView>
              </SView>
              <SView col={"xs-12 sm-4"} center>
                <View style={{
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row"
                }}>
                  <Text style={{ color: STheme.color.text, fontSize: 10, height: 20, }}>Bs.</Text>
                  <Text style={{ color: STheme.color.text, fontSize: 14, }}>{SMath.formatMoney(movimientos[key].monto)}</Text>
                </View>
              </SView>
            </SView>

          </View>
        </View >
      )
    })
  }
  // tarea6
  getDetalle(mensaje, icon, monto) {

    return <SView col={"xs-4 md-3 xl-2"} center style={{
      height: 70,
    }}>
      <SText style={{
        fontSize: 10,
        textAlign: "center"
      }}>{mensaje}</SText>

      <SView style={{
        width: 35, height: 35, justifyContent: "center", alignItems: "center",
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

    // console.log("asu madre ", this.dataExport)
    // tarea6  ✅ ✅ ✅
    if (this.moviminetos) {
      Object.values(this.moviminetos).map((o) => {
        if (o.estado == 0 || o.estado == 3) return null;
        if (o.descripcion == "Cancelacion de servicio") return null;
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
      })
    }


    // tarea6  ✅ ✅ ✅


    return <SView center col={"xs-12 md-10 xl-8"} row >
      <SView col={"xs-12"} height={32} center style={{ borderBottomWidth: 1, borderBottomColor: STheme.color.card }}></SView>
      <SView col={"xs-12"} height={32} center>
        <SText style={{ color: "#999" }}>Informacion</SText>
      </SView>
      {this.getDetalle("Ingreso de caja", this.getIcon(1), SMath.formatMoney(total.ingreso))}
      {this.getDetalle("Egreso de caja", this.getIcon(-1), SMath.formatMoney(total.egresoCaja))}
      {this.getDetalle("Egreso de traspaso a bancos", this.getIcon(-1), SMath.formatMoney(total.egresoTraspasoBanco))}

      <SView col={"xs-12"} height={32} center style={{ borderBottomWidth: 1, borderBottomColor: STheme.color.card }}></SView>
      <SView col={"xs-12"} height={32} center>
        <SText style={{ color: "#999" }}>Tipos de pagos</SText>
      </SView>
      {Object.keys(tiposPagos).map((key, index) => {
        return this.getDetalle(changeTipoPago[tiposPagos[key].descripcion], this.getIconTipoPago(null, { data: { key_tipo_pago: key } }), SMath.formatMoney(total_tipo_pago[key] ?? 0))
      })}
      <SView col={"xs-12"} height={32} center>
        <SText style={{ color: "#999", fontSize: 10, }}>Los pagos en tarjeta y transferecia se ingresan automaticamente al banco.</SText>
      </SView>
      <SView col={"xs-12"} height={32} center style={{ borderBottomWidth: 1, borderBottomColor: STheme.color.card }}></SView>
      <SView col={"xs-12"} height={32} center>
        <SText style={{ color: "#999" }}>Tipos de movimientos</SText>
      </SView>
      {this.getDetalle("Movimiento de apertura", this.getIconTipo({ key: "1" }), SMath.formatMoney(total_tipo_movimiento[1] ?? 0))}
      {this.getDetalle("Movimiento de venta de paquete", this.getIconTipo({ key: "3" }), SMath.formatMoney(total_tipo_movimiento[3] ?? 0))}
      {this.getDetalle("Movimiento de caja", this.getIconTipo({ key: "4" }), SMath.formatMoney(total_tipo_movimiento[4] ?? 0))}

      <SView col={"xs-12"} height={32} center style={{ borderBottomWidth: 1, borderBottomColor: STheme.color.card }}></SView>
      <SView col={"xs-12"} height={62} center></SView>

    </SView>

  }
  // monto quemado
  render() {
    this.activa = this.props.caja;
    if (!this.activa) return <View />;
    if (this.props.setActiva) this.props.setActiva(this.activa);

    console.log("aqui ", this.moviminetos)

    return (
      <SView col={"xs-12"} center style={{
        marginTop: 16,
      }}>

        <ExportExcel
          header={[
            // { key: "fecha", label: "fecha", width: 100 },
            { key: "nombre", label: "Nombre", width: 160 },
            { key: "efectivo", label: "Efectivo", width: 60 },
            { key: "transferencia", label: "Transferencia", width: 90 },
            { key: "tarjeta", label: "Tarjeta", width: 60 },
            { key: "apertura", label: "Apertura", width: 60 },
            { key: "ingreso", label: "Ingreso", width: 60 },
            { key: "egreso", label: "Egreso", width: 60 },
            { key: "transferenciaPorCierre", label: "transferencia PorCierre", width: 200 },
            { key: "transferenciaPorApertura", label: "transferencia PorApertura", width: 200 }
          ]}
          getDataProcesada={() => {
            var dataExport = {};

            var total = 0;

            var monto = {
              apertura: 0, ingreso: 0, egreso: 0, efectivo: 0, transferencia: 0, tarjeta: 0, transpasoBanca: 0, transferenciaPorApertura: 0, transferenciaPorCierre: 0
            }


            let ordenar = Object.values(this.moviminetos);

            // ostiasput
            ordenar.sort(function (a, b) {
              return new SDate(a.fecha_on).getTime() - new SDate(b.fecha_on).getTime();
            });

            // console.log("miradas ", this.moviminetos)
            ordenar.map((obj, i) => {
              if (obj.estado == 0 || obj.estado == 3 || obj.descripcion == "Traspaso a bancos") return null;

              total += obj.monto;

              if (obj?.descripcion == "apertura") {
                monto.apertura = obj.monto;
              }
              else {
                monto.apertura = "";
              }

              if (obj?.descripcion == "Venta de servicio" && obj.key_tipo_pago == "1") {
                monto.efectivo = obj.monto;
              } else {
                monto.efectivo = "";
              }
              if (obj?.descripcion == "Venta de servicio" && obj.key_tipo_pago == "2") {
                monto.tarjeta = obj.monto;
              } else {
                monto.tarjeta = "";
              }
              if (obj?.descripcion == "Venta de servicio" && obj.key_tipo_pago == "3") {
                monto.transferencia = obj.monto;
              } else {
                monto.transferencia = "";
              }

              if (obj?.descripcion == "Transferencia por cierre") {
                monto.transferenciaPorCierre = obj.monto;
              } else {
                monto.transferenciaPorCierre = "";
              }

              if (obj?.descripcion == "Transferencia por apertura") {
                monto.transferenciaPorApertura = obj.monto;
              } else {
                monto.transferenciaPorApertura = "";
              }


              if (obj?.key_caja_tipo_movimiento == "4" && obj.monto < 0) {
                monto.egreso = obj.monto;
              } else {
                monto.egreso = "";
              }

              if (obj?.key_caja_tipo_movimiento == "4" && obj?.monto > 0) {
                monto.ingreso = obj.monto;
              } else {
                monto.ingreso = "";
              }

              if (obj?.descripcion == "apertura") {
                monto.apertura = obj.monto;
              }
              else {
                monto.apertura = "";
              }


              // if (obj.descripcion == "Traspaso a bancos") {

              // }


              let nombreSangro = this.getUsuarioNombre(obj);

              var toInsert = {
                fecha: obj?.fecha_on,
                nombre: nombreSangro ?? obj.descripcion,
                efectivo: monto?.efectivo,
                transferencia: monto?.transferencia,
                tarjeta: monto?.tarjeta,
                apertura: monto?.apertura,
                ingreso: monto?.ingreso,
                egreso: monto?.egreso,
                transferenciaPorCierre: monto?.transferenciaPorCierre,
                transferenciaPorApertura: monto?.transferenciaPorApertura,
              }

              dataExport[i] = toInsert
            })
            return dataExport
          }}
        />
        <SHr height={10} />
        <SText props={{ type: "primary" }}>Movimientos</SText>
        <SView col="xs-12 md-8 xl-6">
          {this.getLista()}
          <SView col={"xs-12"} style={{
            height: 50,
          }}>
          </SView>
        </SView>
        {this.getInfo()}

      </SView>
    )
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(Movimientos);