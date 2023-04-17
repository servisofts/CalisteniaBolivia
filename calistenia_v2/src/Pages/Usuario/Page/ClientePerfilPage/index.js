import { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { SButtom, SHr, SLoad, SNavigation, SOrdenador, SPage, STheme, SView } from 'servisofts-component';
// import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../../../Components/BarraSuperior';
import FotoPerfilUsuario from '../../../../Components/FotoPerfilUsuario';
import Model from '../../../../Model';
import HuellasDeUsuario from '../../../../Services/zkteco/Components/usuario_huella/Components/HuellasDeUsuario';
import SincronizarUsuario from '../../../../Services/zkteco/Components/usuario_huella/Components/SincronizarUsuario';
import PaquetesDeUsuario from './PaquetesDeUsuario';
// import PaquetesDeUsuario from './PaquetesDeUsuario';
// import SSCrollView from '../../Component/SScrollView';
import SSocket from 'servisofts-socket';

import Paquete from '../../../Paquete';
import Sucursal from '../../../Sucursal';
import sucursal_usuario from '../../../sucursal_usuario';
class ClientePerfilPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return { headerShown: false, }
  }
  constructor(props) {
    super(props);
    this.key = SNavigation.getParam("key", false);
    this.bandera = false;
    this.state = {};
  }
  componentDidMount() { }

  EditarPerfil() {
    if (this.bandera) return <SButtom style={{ width: 60, height: 30, position: "absolute", right: 0, top: 0, backgroundColor: "green" }}
      onPress={() => { SNavigation.navigate("registro", { key: this.key }) }}>
      {/* <SIcon name={"Edit"} style={{ width: 30, height: 30 }} /> */}
      <Text style={{ fontSize: 16, color: STheme.color.text }}>EDITAR</Text>
    </SButtom>
  }
  valido_CI(ci) {
    if (ci.length < 7) this.bandera = true;
    return <Text style={{ fontSize: 16, color: (ci.length < 7 ? "red" : STheme.color.text), }}>{"CI: " + ci}</Text>
  }
  valido_Telefono(telefono) {
    if (telefono.length < 8 || telefono.charAt(0) !== "7" && telefono.charAt(0) !== "6" && telefono.charAt(0) !== "+") this.bandera = true;
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
    if (correo.length < 12) this.bandera = true;
    return <Text style={{ fontSize: 16, color: (correo.length < 12 ? "red" : STheme.color.text), }}>{"Correo: " + correo}</Text>
  }


  getPerfil() {
    this.data = Model.usuario.Action.getByKey(this.key);
    if (!this.data) return <SLoad />
    return <SView center style={{ width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: STheme.color.card }}>
      <SView center border={(this.bandera ? "green" : "transparent")} style={{
        width: "100%",
        maxWidth: 400,
        alignItems: "center"
      }}>

        <SHr />
        <SHr />


        <SView style={{
          width: 180,
          height: 180,
        }} center>
          <FotoPerfilUsuario usuario={this.data} />
        </SView>


        <Text style={{
          color: STheme.color.text,
          fontSize: 18,
          textTransform: "capitalize",
          fontWeight: "bold"
        }}>{this.data["Nombres"] + " " + this.data["Apellidos"]}</Text>
        {this.valido_CI(this.data?.CI)}
        {this.valido_Telefono(this.data?.Telefono)}
        {this.valido_Correo(this.data?.Correo)}
        <SHr />
        <SHr />

        {this.EditarPerfil()}


      </SView>
      <SHr />
      <HuellasDeUsuario key_usuario={this.data?.key} />
      <SHr />
      <SincronizarUsuario key_usuario={this.data?.key} />
      <SHr />
      <SHr />
    </SView >
  }

  exportar(_key) {
    var reducer = this.props.state.paqueteVentaReducer;
    var data = reducer.usuario[_key];
    if (!data) {
      if (reducer.estado == "cargando") return null;
      if (reducer.estado == "error") return <Text>ERROR</Text>
      var object = {
        component: "paqueteVenta",
        type: "getAllByUsuario",
        estado: "cargando",
        key_usuario: _key
      }
      SSocket.send(object, true);
      // return <View />
    }
    return new SOrdenador([
      { key: "fecha_inicio", order: "desc", peso: 1 },
    ]).ordernarObject(data).map((key) => {

      var obj = data[key];

      if (!sucursal_usuario.Actions.isActive(obj.key_sucursal, this.props)) return null;

      var usuarios = Model.usuario.Action.getAll();
      if (!usuarios) return <SLoad />
      // var usuario = Object.values(usuarios).find(aux => aux.key == obj.key_usuario);
      var usuario = usuarios[obj.key_usuario];

      var paquetes = Paquete.Actions.getAll(this.props);
      if (!paquetes) return null;
      // var paquete = Object.values(paquetes).find(aux => aux.key == obj.key_paquete);
      var paquete = paquetes[obj.key_paquete];

      var sucursales = Sucursal.Actions.getAll(this.props);
      if (!sucursales) return null;
      // var sucursal = Object.values(sucursales).find(aux => aux.key == obj.key_sucursal);
      var sucursal = sucursales[obj.key_sucursal];

      console.log("aqui ", obj, " pack ", paquete.descripcion, " sucursal ", sucursal.descripcion, " usuario ", usuario.Nombres);
    })
    // return <Text style={{ fontSize: 16, color: STheme.color.text }}>Correo </Text>
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
            {this.exportar(this.key)}
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