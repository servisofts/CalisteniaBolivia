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
    };

  }
  render() {
    this.key_usuario = this.props.navigation.getParam("key_usuario", false);
    this.key_paquete = this.props.navigation.getParam("key_paquete", false);
    if (this.props.state.paqueteUsuarioReducer.estado == "exito" && this.props.state.paqueteUsuarioReducer.type == "registro") {
      this.props.state.paqueteUsuarioReducer.estado = "";
      alert("Se registro")

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

              <Text style={{
                color: "#fff",
                fontSize: 16,
              }}>Agregar un paquete.</Text>
              <View style={{
                width: "100%",
                maxWidth: 600,
                alignItems: 'center',
                // justifyContent: 'center',
              }}>

                <Paquete key_paquete={this.key_paquete} />

                <Text style={{
                  color: "#fff",
                  fontSize: 16,
                }}>Se va a asignar un paquete al usuario {this.key_usuario}.</Text>
                <ActionButtom label={"Crear"} cargando={this.props.state.paqueteUsuarioReducer.estado == "cargando"} onPress={() => {
                  var object = {
                    component: "paqueteUsuario",
                    type: "registro",
                    estado: "cargando",
                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                    data: {
                      key_paquete: this.key_paquete,
                      key_usuario: this.key_usuario,
                      fecha_inicio: new Date(),
                      fecha_fin: new Date(),
                    }
                  }
                  // alert(JSON.stringify(object));
                  this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
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