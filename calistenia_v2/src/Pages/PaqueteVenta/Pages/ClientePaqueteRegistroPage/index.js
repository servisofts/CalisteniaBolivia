import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import BarraSuperior from '../../../../Components/BarraSuperior';
import Paquete from '../../../Paquete/Component/Paquete';
import Usuario from './Usuario';
import { SPopupOpen, SDate, SView, SInput, SButtom, SScrollView2, SPopup, SNavigation, SPage, STheme } from 'servisofts-component';
import TiposDePago from './TiposDePago';
import SCalendar from './SCalendar';
// import RolDeUsuario from './RolDeUsuario';
var _ref = {};
class ClientePaqueteRegistroPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicios: {},
      usuarios: [SNavigation.getParam("key_usuario")],
      usuariosData: [],
      tipoPago: {},
      tasks: {},
    };
    this.key_usuario = SNavigation.getParam("key_usuario", false);
    this.key_paquete = SNavigation.getParam("key_paquete", false);
  }
  getCalendaio(i, usuario) {
    if (!usuario) return <View />
    if (!this.state.paquete) return <View />
    return <SView col="xs-10" >
      <SCalendar
        task={this.state.tasks[i]}
        onChange={(date) => {
          this.state.tasks[i] = {
            fecha: date,
            dias: this.state.paquete.dias
          }
          this.setState({ ...this.state })
          // this.state.tasks[i]=;
        }} />
      <SView style={{
        width: "100%",
        height: 100,
      }}></SView>
    </SView>
  }
  getClientes() {
    if (!this.state.paquete) {
      return <View />
    }
    var DATA = []
    for (let i = 0; i < this.state.paquete.participantes; i++) {
      if (!this.state.tasks[i]) {
        this.state.tasks[i] = {
          fecha: new SDate(new SDate().toString("yyyy-MM-dd"), "yyyy-MM-dd"),
          dias: this.state.paquete.dias
        }
      }
      DATA.push(<SView col="xs-12 sm-9 md-6 xl-4" center style={{
        // justifyContent:"flex-start",
        padding: 12,
      }}>
        <Usuario key_usuario={this.state.usuarios[i]} onLoad={(usr) => {
          // console.log(usr);
          if (!this.state.usuariosData[i]) {
            this.state.usuariosData[i] = usr;
            this.state.usuarios[i] = usr.key;
            this.setState({ ...this.state })
          }
          if (this.state.usuariosData[i].key != usr.key) {
            this.state.usuariosData[i] = usr;
            this.state.usuarios[i] = usr.key;
            this.setState({ ...this.state })
          }
        }}
          onPress={() => {

            SNavigation.navigate("VentasSelect", {
              select: (data) => {
                this.state.usuariosData[i] = data;
                this.state.usuarios[i] = data.key;
                this.setState({ ...this.state })
              }
            })
          }} />
        <SView col={"xs-10"}>
          <TiposDePago
            paquete={this.state.paquete}
            calcularFaltante={() => {
              return this.calcularFaltante();
            }}
            usuario={this.state.usuarios[i]}
            tipoPago={this.state.tipoPago[i]}
            setTipoPago={(tipoPago) => {
              this.state.tipoPago[i] = tipoPago;
              this.setState({ ...this.state })
            }} />
        </SView>
        {this.getCalendaio(i, this.state.usuarios[i])}
      </SView>)
    }
    return <SView col={"xs-12"} row center style={{
      alignItems: "flex-start"
    }}>
      {DATA}
    </SView>
  }
  continue() {
    SNavigation.navigate("ClientePaqueteRegistroConfirmacion", {
      key_paquete: this.key_paquete,
      key_usuario: this.key_usuario,
      usuarios: this.state.usuarios,
      usuariosData: this.state.usuariosData,
      tasks: this.state.tasks,
      dataPagos: this.state.tipoPago
    })
  }
  calcularFaltante() {
    if (!this.state.paquete) {
      return 0;
    }
    if (this.state.paquete.precio > 0) {
      if (!this.state.tipoPago) {
        return 0;
      }
      if (!this.state.usuarios) {
        return 0;
      }
      var monto = 0;
      Object.keys(this.state.tipoPago).map((key) => {
        var tipoPago = this.state.tipoPago[key];
        if (!tipoPago) return;
        Object.keys(tipoPago).map((key_t_p) => {
          var t_p = tipoPago[key_t_p];
          if (!t_p) return;
          monto += parseFloat(t_p.monto);
        })

      })
      return monto;
    }
    return 0;
  }
  render() {


    return (
      <View style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: STheme.color.background
      }}>
        {SPage.backgroundComponent}

        <BarraSuperior duration={500} title={"Agregar paquete a usuario"} goBack={() => {
          SNavigation.goBack();
        }} {...this.props} />
        <View style={{
          width: "100%",
          flex: 1,
        }}>
          <SScrollView2
            disableHorizontal
            style={{
              width: "100%",
              height: "100%"
            }} >
            <View style={{
              width: "100%",
              alignItems: 'center',
              paddingBottom: 100,
            }}>
              <View style={{
                width: "100%",
                maxWidth: 800,
                alignItems: "center",

                // justifyContent: 'center',
              }}>
                <Text style={{
                  fontSize: 22,
                  color: STheme.color.text,
                  width: "95%",
                  textAlign: "center",
                  marginBottom: 8,
                }}>Datos de venta</Text>
                <Paquete key_paquete={this.key_paquete} onLoad={(paquete) => {
                  if (!this.state.paquete) {
                    this.state.paquete = paquete;
                    this.setState({ ...this.state });
                  }
                }} />
              </View>
              <Text style={{
                width: "95%",
                fontSize: 12,
                color: STheme.color.text,
                marginTop: 8,
                marginBottom: 4,
              }}>Clientes</Text>
              {this.getClientes()}
              <SButtom props={{
                type: "danger",
              }} onPress={() => {
                if (!this.state.paquete) {
                  SPopup.alert("No se encontro el paquete.")
                  return
                }
                if (this.state.paquete.precio > 0) {
                  if (!this.state.tipoPago) {
                    SPopup.alert("No se encontro el tipo de pago.")
                    return;
                  }
                  if (!this.state.usuarios) {
                    SPopup.alert("No se encontro el cliente.")
                    return;
                  }
                  var monto = this.calcularFaltante();
                  if (monto <= 0) {
                    SPopup.alert("Seleccione un metodo de pago.")
                    return;
                  }
                  if (monto < this.state.paquete.precio) {
                    SPopup.confirm({
                      title: `Bs. ${monto} no es suficiente para el paquete, esta seguro de continuar? `, onPress: () => {
                        this.continue();
                      }
                    })
                    return;
                  }
                  // if (this.state.tipoPago[]) {
                  //   SPopup.alert("No se encontro el tipo de pago.")
                  //   return;
                  // }
                }
                this.continue();

              }}>
                Continuar
              </SButtom>
            </View>
          </SScrollView2>
        </View>

      </View>
    );
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(ClientePaqueteRegistroPage);