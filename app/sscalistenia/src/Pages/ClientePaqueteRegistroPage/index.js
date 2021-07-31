import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import ActionButtom from '../../Component/ActionButtom';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import AppParams from '../../Params';
import Svg from '../../Svg';
// import FotoPerfilComponent from '../../Component/FotoPerfilComponent';
// import ServicioDePaquete from './ServicioDePaquete';
import SSCrollView from '../../Component/SScrollView';
import Paquete from '../../Component/Paquete';
import Usuario from './Usuario';
import SCalendar from '../../Component/SCalendar';
import { SPopupOpen, SDate, SView, SInput, SButtom, SScrollView2 } from '../../SComponent';
import ConfirmarPaquete from './ConfirmarPaquete';
// import RolDeUsuario from './RolDeUsuario';
var _ref = {};
class ClientePaqueteRegistroPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      servicios: {},
      usuarios: [this.props.navigation.getParam("key_usuario", false)],
      usuariosData: [],
      task: {
        descripcion: "Servicio",
        fecha_inicio: new SDate(),
        fecha_fin: false
      }
    };

  }
  getClientes() {
    if (!this.state.paquete) {
      return <View />
    }
    var DATA = []
    for (let i = 0; i < this.state.paquete.participantes; i++) {
      DATA.push(<SView props={{
        col: "xs-12 sm-9 md-6 xl-4",
        variant: "center",
      }} style={{
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
            this.props.navigation.navigate("ClientesPageSelect", {
              select: (data) => {
                this.state.usuariosData[i] = data;
                this.state.usuarios[i] = data.key;
                this.setState({ ...this.state })
              }
            })
          }} />
        <SView props={{
          col: "xs-12",
          direction: "row"
        }}>
          {this.getCalendar()}
          {/* <SInput props={{
            col: "xs-6",
            type: "fecha",
            customStyle: "calistenia",
          }} /> */}
          <SView style={{
            width: "100%",
            height: 100,
          }}></SView>
        </SView>
      </SView>)
    }
    return <SView props={{
      col: "xs-12",
      direction: "row",
      variant: "center"
    }}>
      {DATA}
    </SView>
  }
  getCalendar = () => {
    return <SCalendar
      task={this.state.task}
      onChange={({ fecha_inicio, fecha_fin }) => {
        this.setState({ task: { ...this.state.task, fecha_inicio, fecha_fin } })
      }} />
  }
  render() {
    this.key_usuario = this.props.navigation.getParam("key_usuario", false);
    this.key_paquete = this.props.navigation.getParam("key_paquete", false);
    if (this.props.state.paqueteVentaReducer.estado == "exito" && this.props.state.paqueteVentaReducer.type == "registro") {
      this.props.state.paqueteVentaReducer.estado = "";
      this.props.navigation.goBack();
    }



    return (
      <View style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#000"
      }}>
        <BackgroundImage />

        <BarraSuperior duration={500} title={"Agregar paquete a usuario"} navigation={this.props.navigation} goBack={() => {
          this.props.navigation.goBack();
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
                // backgroundColor:"#fff",
                // justifyContent: 'center',
              }}>
                <Text style={{
                  fontSize: 22,
                  color: "#fff",
                  width: "95%",
                  textAlign: "center",
                  marginBottom: 8,
                }}>Datos de venta</Text>
                <Paquete key_paquete={this.key_paquete} onLoad={(paquete) => {
                  if (!this.state.task.fecha_fin) {
                    this.state.paquete = paquete;
                    this.state.task.fecha_fin = new SDate();
                    this.state.task.fecha_fin.addDay(paquete.dias - 1);
                    this.state.task.dias = paquete.dias;
                    this.setState({ ...this.state });
                  }
                }} />
              </View>
              <Text style={{
                width: "95%",
                fontSize: 12,
                color: "#fff",
                marginTop: 8,
                marginBottom: 4,
              }}>Clientes</Text>
              {this.getClientes()}
              <SButtom props={{
                type: "danger",
              }} onPress={() => {
                SPopupOpen({
                  key: "confirmarPaquete",
                  content: (
                    <ConfirmarPaquete data={{
                      key_paquete: this.key_paquete,
                      key_usuario: this.key_usuario,
                      usuarios: this.state.usuarios,
                      usuariosData: this.state.usuariosData,
                      fecha_inicio: this.state.task.fecha_inicio.toString("yyyy-MM-dd"),
                      fecha_fin: this.state.task.fecha_fin.toString("yyyy-MM-dd")
                    }} />
                  )
                })
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