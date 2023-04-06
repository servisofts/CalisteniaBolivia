import { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SLoad, SNavigation, SPage, STheme, SView } from 'servisofts-component';
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


  EditarPerfil() {
    return <SButtom style={{ width: 30, height: 30 }}
      onPress={() => { SNavigation.navigate("registro", { key: this.key }) }}>
      <SIcon name={"Edit"} style={{ width: 30, height: 30 }} />
    </SButtom>
  }

  valido_CI(ci) {
    return <Text style={{ fontSize: 16, color: (ci.length < 7 ? "red" : STheme.color.text), }}>{"CI: " + ci}</Text>

  }

  valido_Telefono(telefono) {
    return <Text style={{
      fontSize: 16, color: (
        telefono.length < 8
          || telefono.charAt(0) !== "7"
          && telefono.charAt(0) !== "6"
          && telefono.charAt(0) !== "+"
          ? "red" : STheme.color.text),
    }}>{" Telefono: " + telefono}</Text>
  }

  valido_Correo(correo) {
    return <Text style={{ fontSize: 16, color: (correo.length < 12 ? "red" : STheme.color.text), }}>{"Correo: " + correo}</Text>
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
      <SView border={"red"} style={{
        width: "100%",
        alignItems: "center"
      }}>
        <Text style={{
          color: STheme.color.text,
          fontSize: 18,
          textTransform: "capitalize",
          fontWeight: "bold"
        }}>{this.data["Nombres"] + " " + this.data["Apellidos"]}</Text>
        {this.valido_CI(this.data?.CI)}
        {this.valido_Telefono(this.data?.Telefono)}
        {this.valido_Correo(this.data?.Correo)}
      </SView>
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