import { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { SButtom, SImage, SLoad, SNavigation, SOrdenador, SPage, SScrollView2, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Usuario from '../..';
import BarraSuperior from '../../../../Components/BarraSuperior';
import Buscador from '../../../../Components/Buscador';
import FloatButtom from '../../../../Components/FloatButtom';
import Model from '../../../../Model';
import { SSRolesPermisosValidate } from '../../../../SSRolesPermisos';

class VentasPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        curPage: 1,
      }
    };


  }
  componentDidMount() {
    // var object = {
    //   service: "usuario",
    //   component: "usuario",
    //   version: "2.0",
    //   type: "getAll",
    //   estado: "cargando",
    //   cabecera: "registro_administrador",
    //   key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
    // }
    // SSocket.send(object);

  }
  pagination = (listaKeys) => {
    if (!listaKeys) {
      return [];
    }
    if (listaKeys.length <= 0) {
      return [];
    }
    var pageLimit = 50
    var tamanho = listaKeys.length;
    var nroBotones = Math.ceil(tamanho / pageLimit);
    if (this.state.pagination.curPage > nroBotones) {
      this.state.pagination.curPage = nroBotones;
    }
    var actual = pageLimit * (this.state.pagination.curPage - 1);
    return listaKeys.slice(0, actual + pageLimit);
  }
  getRecuperar(data, isRecuperar) {
    if (!isRecuperar) {
      return <View />
    }
    if (data.estado != 0) {
      return <View />
    }
    return <SButtom
      props={{
        type: "danger",
        variant: "confirm"
      }}
      onPress={() => {
        Usuario.Actions.editar({
          ...data,
          estado: 1,
        }, this.props)
      }} >Recuperar</SButtom>
  }
  valido_CI(ci) {
    return <Text style={{ color: (ci.length < 7 ? "red" : STheme.color.text), }}>{"CI: " + ci}</Text>
  }
  valido_Telefono(telefono) {
    return <Text style={{
      color: (
        telefono.length < 8
          || telefono.charAt(0) !== "7"
          && telefono.charAt(0) !== "6"
          && telefono.charAt(0) !== "+"
          ? "red" : STheme.color.text),
    }}>{"Telefono: " + telefono}</Text>
  }
  valido_Correo(correo) {
    return <Text style={{ color: (correo.length < 12 ? "red" : STheme.color.text), }}>{"Correo: " + correo}</Text>
  }
  render() {
    const getLista = () => {
      var data = Model.usuario.Action.getAll();
      // var dataRU = SSRolesPermisos.Events.getUsuarioRol("d16d800e-5b8d-48ae-8fcb-99392abdf61f", this.props)
      var dataRU = Model.usuarioRol.Action.getAllByKeyRol("d16d800e-5b8d-48ae-8fcb-99392abdf61f");
      if (!data) return <SLoad />
      if (!dataRU) return <SLoad />
      if (!this.state.buscador) {
        return <View />
      }
      var objFinal = {};
      Object.keys(dataRU).map((key) => {
        var rol_user = dataRU[key];
        if (!rol_user.key_usuario) return;
        if (!rol_user.estado) return;
        if (!data[rol_user.key_usuario]) {
          return;
        }
        if (!data[rol_user.key_usuario].estado) return;
        objFinal[rol_user.key_usuario] = data[rol_user.key_usuario]
      });
      var isRecuperar = SSRolesPermisosValidate({ page: "UsuarioPage", permiso: "recuperar_eliminado" });
      return this.pagination(
        new SOrdenador([
          { key: "Peso", order: "desc", peso: 4 },
          { key: "Nombres", order: "asc", peso: 2 },
          { key: "Apellidos", order: "asc", peso: 1 },
        ]).ordernarObject(
          this.state.buscador.buscar(objFinal)
        )
      ).map((key) => {
        var obj = data[key];
        return <TouchableOpacity style={{
          width: "90%",
          maxWidth: 600,
          height: 60,
          margin: 4,
          borderRadius: 10,
          backgroundColor: STheme.color.card
        }} onPress={() => {
          // return;
          this.select = SNavigation.getParam("select");
          if (this.select) {
            this.select(obj);
            SNavigation.goBack();
            return;
          }
          SNavigation.navigate("ClientePerfilPage", {
            key: key
          })
        }}>
          <View style={{
            flex: 1,
            justifyContent: "center"
          }}>
            <View style={{
              flexDirection: "row",
              height: "100%",
              width: "100%",
              alignItems: "center"
            }}>
              <View style={{
                width: 40,
                height: 40,
                marginRight: 8,
                justifyContent: "center",
                alignItems: "center",
                // padding: 1,
                // borderRadius: 200,
                backgroundColor: STheme.color.card,
                borderRadius: 100,
                overflow: "hidden"
              }}>
                <SImage src={SSocket.api.root + "usuario/" + key + `?date=${new Date().getTime() / 500}`} />

              </View>
              <View row style={{
                flex: 1,
                justifyContent: "center"
              }}>
                <Text style={{
                  fontSize: 14,
                  color: STheme.color.text,
                  textDecorationLine: (obj.estado == 0 ? "line-through" : "none"),
                }}>{obj["Nombres"] + " " + obj["Apellidos"]} {this.valido_CI(obj?.CI)}</Text>
                <Text style={{
                  fontSize: 12,
                  width: 400,
                  color: STheme.color.text,
                  textDecorationLine: (obj.estado == 0 ? "line-through" : "none"),
                }}>{this.valido_Telefono(obj?.Telefono)}</Text>
                <Text style={{
                  fontSize: 12,
                  width: 400,
                  color: STheme.color.text,
                  textDecorationLine: (obj.estado == 0 ? "line-through" : "none"),
                }}>{this.valido_Correo(obj?.Correo)}</Text>

              </View>
              {this.getRecuperar(obj, isRecuperar)}
            </View>
          </View>
        </TouchableOpacity>
      })
    }
    return (
      <SPage hidden disableScroll>
        <BarraSuperior title={"Ventas"} navigation={this.props.navigation} goBack={() => {
          SNavigation.goBack();
        }} />
        <Buscador placeholder={"Buscar por CI, Nombres, Apellidos, Correo o Telefono."} ref={(ref) => {
          if (!this.state.buscador) this.setState({ buscador: ref });
        }} repaint={() => { this.setState({ ...this.state }) }}
        />
        <View style={{
          flex: 1,
          width: "100%",
        }}>
          <SScrollView2
            disableHorizontal
            onScroll={(evt) => {
              var evn = evt.nativeEvent;
              var posy = evn.contentOffset.y + evn.layoutMeasurement.height;
              var heigth = evn.contentSize.height;
              if (heigth - posy <= 0) {
                this.state.pagination.curPage += 1;
                this.setState({ ...this.state })
              }
            }}
          >
            <SView col={"xs-12"} center> {getLista()} </SView>
          </SScrollView2>
          <FloatButtom onPress={() => { SNavigation.navigate("registro") }} />
          <SButtom style={{ position: "absolute", top: 5, right: 50, backgroundColor: "salmon", borderRadius: 4 }} onPress={() => { SNavigation.navigate("cliente/historial"); }}>Historial</SButtom>
          <SButtom type={"danger"} style={{ position: "absolute", top: 70, right: 50, backgroundColor: "#D68910" }} onPress={() => { SNavigation.navigate("cliente/comparacion"); }}>Comparación</SButtom>
          <SButtom style={{ position: "absolute", top: 140, right: 50, backgroundColor: "#1D8348", borderRadius: 4 }} onPress={() => { SNavigation.navigate("cliente/comparacion"); }}>Cumpleaños📆</SButtom>
        </View>
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(VentasPage);