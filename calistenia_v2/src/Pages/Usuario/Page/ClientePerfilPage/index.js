import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { SHr, SLoad, SNavigation, SPage, SSCrollView, SScrollView2, STheme, SView } from 'servisofts-component';
import Usuario from '../..';
// import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../../../Components/BarraSuperior';
import FotoPerfilUsuario from '../../../../Components/FotoPerfilUsuario';
import Model from '../../../../Model';
import HuellasDeUsuario from '../../../../Services/zkteco/Components/usuario_huella/Components/HuellasDeUsuario';
import SincronizarUsuario from '../../../../Services/zkteco/Components/usuario_huella/Components/SincronizarUsuario';
import PaquetesDeUsuario from './PaquetesDeUsuario';
// import PaquetesDeUsuario from './PaquetesDeUsuario';
// import SSCrollView from '../../Component/SScrollView';

class ClientePerfilPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    }
  }
  constructor(props) {
    super(props);
    this.key = SNavigation.getParam("key", false);
    this.state = {};
  }
  componentDidMount() { // B

  }

  getPerfil() {
    this.data = Model.usuario.Action.getByKey(this.key);
    if (!this.data) return <SLoad />
    return <View style={{
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <View style={{
        width: 180,
        height: 180,
      }}>
        <FotoPerfilUsuario usuario={this.data} />
      </View>
      <View style={{
        width: "100%",
        alignItems: "center"
      }}>
        <Text style={{
          color: STheme.color.text,
          fontSize: 18,
          textTransform: "capitalize",
          fontWeight: "bold"
        }}>{this.data["Nombres"] + " " + this.data["Apellidos"]}</Text>
        <Text style={{
          color: STheme.color.text,
          fontSize: 16,
          textTransform: "capitalize",
        }}>{"CI " + this.data["CI"]}</Text>
        {/* <Text style={{
          color: STheme.color.text,
          fontSize: 16,
          textTransform: "capitalize",
        }}>{"CI " + this.data["CI"]}</Text> */}
      </View>
      <SHr />
      <SHr />
      <HuellasDeUsuario key_usuario={this.data?.key} />
      <SHr />
      <SincronizarUsuario key_usuario={this.data?.key} />
      <SHr />
      <SHr />
    </View >
  }
  render() {
    return (
      <SPage hidden >
        <BarraSuperior duration={500} title={"Perfil de cliente"} navigation={this.props.navigation} goBack={() => {
          SNavigation.goBack()
        }} {...this.props} />
        <ScrollView>
          <SView col={"xs-12"} center>
            {this.getPerfil()}
            <SView col={"xs-11 md-8 xl-6"} center>
              <PaquetesDeUsuario key_usuario={this.key} navigation={this.props.navigation} />
            </SView>
          </SView>
        </ScrollView>
      </SPage >
    );
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(ClientePerfilPage);