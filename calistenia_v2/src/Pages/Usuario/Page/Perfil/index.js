import { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { SHr, SImage, SNavigation, SPage, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import BarraSuperior from '../../../../Components/BarraSuperior';
import * as SImageImput from '../../../../Components/SImageImput';
import CerrarSession from './CerrarSession';

// import AppParams from '../../Params';
// import FilePreview from '../CarpetasPage/FilePreview';
// import * as SImageImput from '.././../Component/SImageImput';
// import moment from 'moment';
// import SImage from '../../Component/SImage';
// import CerrarSession from './CerrarSession';


class Perfil extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    // this.props.dispatch({
    //     component: "image",
    //     type: "cambio",
    //     url: AppParams.urlImages + "usuario_" + this.props.state.usuarioReducer.usuarioLog.key,
    // })
  }
  getPerfil() {
    var usuario = this.props.state.usuarioReducer.usuarioLog
    if (!usuario) {
      return null;
    }
    return (
      <View style={{
        width: "95%",
        height: 130,
        borderBottomWidth: 1,
        borderColor: "#aaa",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
      }}>
        <View style={{
          width: 100,
          height: 100,
          justifyContent: "center",
          alignItems: "center"
        }}>
          <TouchableOpacity style={{
            width: "90%",
            height: "90%",
            backgroundColor: STheme.color.card,
            borderRadius: 4,
            overflow: "hidden",
          }} onPress={() => {
            SImageImput.choseFile({
              servicio: "root",
              service: "usuario",
              component: "usuario",
              type: "subirFoto",
              estado: "cargando",
              key: usuario.key,
              key_usuario: usuario.key,
            }, (resp) => {
              this.props.dispatch({
                component: "image",
                type: "cambio",
                url: SSocket.api.root + "usuario/" + this.props.state.usuarioReducer.usuarioLog.key,
              })
            });
          }}>
            <SImage src={`${SSocket.api.root}${"usuario/" + this.props.state.usuarioReducer.usuarioLog.key + `?date=${new Date().getTime()}`}`} style={{
              width: "100%",
              height: "100%",
            }} />


          </TouchableOpacity>
        </View>
        <SView style={{
          flex: 1,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "red"
        }}
          onPress={() => { SNavigation.navigate("registro", { key: this.props.state.usuarioReducer.usuarioLog.key }) }}
        >
          <View style={{
            width: "95%",
            flex: 1,
            alignItems: "center",
            flexDirection: "row"
          }}>
            <Text style={{
              flex: 5,
              fontSize: 20,
              fontWeight: "bold",
              color: STheme.color.text,
            }}>{usuario["Nombres"] + " " + usuario["Apellidos"]} </Text>
          </View>
          <View style={{
            width: "95%",
            flex: 1,
          }}>
            <Text style={{
              width: "90%",
              fontSize: 14,
              color: "#bbb"
            }}>{usuario["CI"]} </Text>
            <Text style={{
              width: "90%",
              fontSize: 14,
              color: "#bbb"
            }}>{usuario["Correo"]} </Text>
            <Text style={{
              width: "90%",
              fontSize: 14,
              color: "#bbb"
            }}>{usuario["Telefono"]} </Text>
            {/* <Text style={{
                            width: "90%",
                            fontSize: 10,
                            color: "#bbb"
                        }}>Fecha de registro: {new SDate(usuario.fecha_on).toString("dd/MM/yyyy")} </Text> */}
          </View>
        </SView>
      </View >
    )
  }
  render() {
    var usuario = this.props.state.usuarioReducer.usuarioLog
    if (!usuario) {
      SNavigation.replace("inicio");
      return null;
    }
    return (
      <SPage hidden>
        <BarraSuperior duration={500} title={"Perfil de usuario"} goBack={() => {
          SNavigation.goBack()
        }} />
        <View style={{
          width: "100%",
          flex: 1,
          // justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "#000"
        }}>
          <SView card col={"xs-11 sm-10 md-8 lg-6 xl-4"} center>
            {this.getPerfil()}
            <SHr />
            <CerrarSession />
            <SHr />
          </SView>
        </View>
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(Perfil);