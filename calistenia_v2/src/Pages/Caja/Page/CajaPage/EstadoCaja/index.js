import { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { SButtom, SInput, SMath, SNavigation, SPopup, SPopupOpen, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import PopupCerrar from './PopupCerrar';
import PopupConfirmarCierre from './PopupConfirmarCierre';

class EstadoCaja extends Component {
  constructor(props) {
    super(props);
    this.state = {
      montoDefault: "200.00"
    };
  }
  componentDidMount() {
    this.getActiva();
  }
  getActiva() {
    var obj = {
      component: "caja",
      type: "getActiva",
      estado: "cargando",
      key_usuario: this.props.state.usuarioReducer.usuarioLog.key
    }
    SSocket.send(obj, true);
  }

  getBtn() {
    if (!this.props.sucursal) {
      return <SText style={{ color: STheme.color.darkGray, fontSize: 10 }}>Seleccione su sucursal para continuar</SText>
    }
    return <SButtom props={{ type: "danger", variant: "confirm" }}
      onPress={() => {
        // var value = this.inputr.getValue();
        // if (!value) {
        // value = this.state.montoDefault;
        // }
        var obj = {
          component: "caja",
          type: "registro",
          estado: "cargando",
          key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
          data: {
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            monto: this.montoCaja,
            key_sucursal: this.props.sucursal.key
          }
        }
        SSocket.send(obj, true);
      }}>Abrir</SButtom>
  }
  getMontoCajaAntigua() {
    if (!this.props.sucursal) {
      return <View />
    }
    var data = this.props.state.sucursalReducer.monto[this.props.sucursal.key];
    if (!data) {
      if (this.props.state.sucursalReducer.estado == "cargando") {
        return <View />
      }
      var obj = {
        component: "sucursal",
        type: "getMontoCaja",
        estado: "cargando",
        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        key_sucursal: this.props.sucursal.key
      }
      SSocket.send(obj, true);
      return <View />
    }
    if (!data.monto) {
      data.monto = 0;
    }
    this.montoCaja = data.monto;
    // if (this.montoCaja % 1 != 0) this.montoCaja = this.montoCaja.toFixed(2);
    // return <SText>{JSON.stringify(data,"\s","\t")}</SText>
    return <SInput {...{ col: "xs-12", customStyle: "calistenia", type: "money", label: "Monto en caja", variant: "small", }} value={SMath.formatMoney(data.monto) + ""} editable={false} />
  }
  apertura() {
    if (this.activa) {
      return <View />
    }
    return (
      <SView col={"xs-10"} center center >
        {this.getMontoCajaAntigua()}
        <SView col={"xs-12"} style={{ height: 4, }}></SView>
        {/* <SInput ref={(ref) => { this.inputr = ref }} props={{ col: "xs-12", customStyle: "calistenia", type: "money", label: "Monto de apertura", variant: "small" }} placeholder={this.state.montoDefault} />, */}
        {this.getInfo()}
        <SView col={"xs-12"} style={{ height: 16, }}></SView>
        {this.getBtn()}
        <SView col={"xs-12"} style={{ height: 20, }}></SView>
      </SView>
    );
  }
  getBtnClose() {
    if (!this.activa) {
      return <View />
    }
    if (this.getMonto() < 0) {
      return <View />
    }
    return <SButtom props={{ type: "danger", variant: "default", }}
      style={{
        width: 100,
        height: 30,
      }}
      onPress={() => {
        SPopup.open({
          key: "ConfirmarCierreCaja",
          content: < PopupConfirmarCierre data={this.activa} onSelect={(select) => {
            if (select == "banco") {
              SPopupOpen({
                key: "cerrarCaja",
                content: <PopupCerrar data={this.activa} total={this.total} navigation={this.props.navigation} />
              })
            } else {
              var total = this.getMonto()
              var obj = {
                component: "caja",
                type: "cierre",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                data: {
                  key_caja: this.activa.key,
                  monto_salvar: total,
                  key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                }
              }
              SSocket.send(obj);
              SNavigation.navigate("ReciboCaja", { key: this.activa.key });
            }
            SPopup.close("ConfirmarCierreCaja");
          }} />
        })


      }
      }> cerrar la caja</SButtom >
  }
  getMonto() {
    if (!this.activa) {
      return 0
    }
    var reducer = this.props.state.cajaMovimientoReducer;
    var data = reducer.data[this.activa.key];
    if (!data) {
      return 0;
    }
    var total = 0;
    var keys = Object.keys(data);
    for (var i = 0; i < keys.length; i++) {
      var obj = data[keys[i]];
      total += obj.monto;
    }
    if (total % 1 != 0) total = total.toFixed(2);
    return total;
  }
  getMontoEnCaja() {
    if (!this.activa) {
      return <View></View>
    }
    return <SView style={{
      width: 150,
      height: 50,
      backgroundColor: STheme.color.card,
      borderRadius: 8,
    }} center>
      <SView row >
        <SText style={{ fontSize: 10, }}> Bs. </SText>
        <SText style={{ fontSize: 18, }}>{this.getMonto()}</SText>
      </SView>
    </SView>
  }
  cierre() {
    if (!this.activa) {
      return <View />
    }
    return (
      <SView center col={"xs-10"} style={{
        flex: 1,
        justifyContent: "space-evenly"
      }}>

        <SView style={{
          width: "100%",
        }} center>
          <SText style={{ color: STheme.color.darkGray, fontSize: 10, }}>{"Monto actual en caja."}</SText>
        </SView>
        {this.getMontoEnCaja()}
        <SView col={"xs-12"} style={{ height: 50, }}></SView>
        {this.getBtnClose()}
        <SView col={"xs-12"} style={{ height: 50, }}></SView>
        {/* <SButtom type={"danger"}>MOLINETE</SButtom> */}
        {/* <SView col={"xs-12"} style={{ height: 50, }}></SView> */}

      </SView>
    );
  }
  getInfo() {
    if (!this.props.sucursal) {
      return <View />
    }
    if (this.activa) {
      return <View />
    }
    return <SView style={{
      width: "100%",
    }} center>
      <SText style={{ color: STheme.color.lightGray, fontSize: 10, }}>{"El monto en caja, representa el monto salvado en el último cierre de caja de esta sucursal."}</SText>
    </SView>
  }
  render() {
    this.activa = this.props.state.cajaReducer.usuario[this.props.state.usuarioReducer.usuarioLog.key];
    if (!this.props.sucursal) {
      if (this.activa) {
        if (this.props.setKeySucursal) {
          this.props.setKeySucursal(this.activa.key_sucursal, this.activa.key);
        }
      }
    }
    if (this.props.state.cajaReducer.estado == "exito" && this.props.state.cajaReducer.type == "registro") {
      this.props.state.cajaReducer.estado = "";
      this.props.state.sucursalReducer.monto = {};
    }

    return (
      <SView col="xs-11 md-6 xl-4" style={{
        backgroundColor: STheme.color.card,
        borderRadius: 8,
        marginTop: 8,
        minHeight: 50,
      }} center>
        {this.apertura()}
        {this.cierre()}
        <SText style={{
          width: 100,
          position: "absolute",
          right: 4,
          bottom: 4,
          fontSize: 10,
          color: STheme.color.darkGray
        }} center>Estado de caja:  {!this.activa ? "Cerrada" : "Activa"}</SText>
      </SView>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(EstadoCaja);