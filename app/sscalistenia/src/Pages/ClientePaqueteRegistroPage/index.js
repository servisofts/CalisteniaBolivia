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
import { SPopupOpen, SDate } from '../../SComponent';
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
      DATA.push(<Usuario key_usuario={this.state.usuarios[i]} onLoad={(usr) => {
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
        }} />)
    }
    return DATA;
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

          <SSCrollView style={{
            width: "100%",
            height: "100%"

          }} >

            <View style={{
              width: "100%",
              // maxWidth: 600,
              alignItems: 'center',
              // justifyContent: 'center',
            }}>

              {/* <Text style={{
                color: "#fff",
                fontSize: 16,
              }}>Agregar un paquete.</Text> */}
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
                    this.state.task.fecha_fin.addDay(paquete.dias-1);
                    this.state.task.dias = paquete.dias;
                    this.setState({ ...this.state });
                  }
                }} />
                <Text style={{
                  width: "95%",
                  fontSize: 12,
                  color: "#fff",
                  marginTop: 8,
                  marginBottom: 4,
                }}>Clientes</Text>
                {this.getClientes()}
                <Text style={{
                  fontSize: 12,
                  color: "#fff",
                  marginTop: 8,
                  marginBottom: 4,
                }}>Selecciona la fecha inicio</Text>
                <SCalendar task={this.state.task} onChange={({ fecha_inicio, fecha_fin }) => {
                  this.setState({ task: { ...this.state.task, fecha_inicio, fecha_fin } })
                }} />

                {/* <Text style={{
                  color: "#fff",
                  fontSize: 16,
                }}>Se va a asignar un paquete al usuario {this.key_usuario}.</Text> */}
                <ActionButtom label={"Crear"} cargando={this.props.state.paqueteUsuarioReducer.estado == "cargando"} onPress={() => {
                  console.log(this.state.usuariosData)
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

                }} />
              </View>

            </View>
          </SSCrollView>
        </View>

      </View>
    );
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(ClientePaqueteRegistroPage);