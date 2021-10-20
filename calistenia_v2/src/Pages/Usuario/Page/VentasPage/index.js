import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, TouchableOpacity, ScrollView, Linking, Platform } from 'react-native';
import BarraSuperior from '../../../../Components/BarraSuperior';
import Buscador from '../../../../Components/Buscador';
import FloatButtom from '../../../../Components/FloatButtom';
import SSRolesPermisos, { SSRolesPermisosValidate } from '../../../../SSRolesPermisos';
import { SScrollView2, SView, SOrdenador, SPage, SButtom, SImage, SLoad, SNavigation } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Usuario from '../..';

class VentasPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        curPage: 1,
      }
    };
    this.select = SNavigation.getParam("select");

  }
  componentDidMount() {
    var object = {
      component: "usuario",
      version: "2.0",
      type: "getAll",
      estado: "cargando",
      cabecera: "registro_administrador",
      key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
    }
    SSocket.send(object);

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

  render() {

    const getLista = () => {
      var data = Usuario.Actions.getAll(this.props);
      var dataRU = SSRolesPermisos.Events.getUsuarioRol("d16d800e-5b8d-48ae-8fcb-99392abdf61f", this.props)
      if (!data) return <SLoad />
      if (!dataRU) return <SLoad />
      if (!this.state.buscador) {
        return <View />
      }
      var objFinal = {};
      Object.keys(data).map((key) => {
        if (!dataRU[key]) {
          return;
        }
        objFinal[key] = data[key];
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
          height: 50,
          margin: 4,
          borderRadius: 10,
          backgroundColor: "#66000044"
        }} onPress={() => {
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
                backgroundColor: "#ff999933",
                borderRadius: 100,
                overflow: "hidden"
              }}>
                <SImage src={SSocket.api.root + "usuario_" + key+`?date=${new Date().getTime()/500}`} />

              </View>
              <View style={{
                flex: 1,
                justifyContent: "center"
              }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#fff",
                  textDecorationLine: (obj.estado == 0 ? "line-through" : "none"),
                }}>{obj["Nombres"] + " " + obj["Apellidos"]}</Text>
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
            <SView col={"xs-12"} center>
              {getLista()}
            </SView>
          </SScrollView2>
          <FloatButtom  onPress={() => {
            SNavigation.navigate("registro")
          }} />
        </View>
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(VentasPage);