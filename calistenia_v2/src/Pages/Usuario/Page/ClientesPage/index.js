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
import Paquete_Item from './Paquete_Item';
import { SText } from 'servisofts-component';
import Sucursal from '../../../Sucursal';

class ClientesPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        curPage: 1,
      }
    };

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
  getSucursal(key_sucursal) {
    var data = Sucursal.Actions.getByKey(key_sucursal, this.props);
    if (!data) return <View />
    return <SView>
      <SText>Sucursal: {data.descripcion}</SText>
    </SView>
  }
  getUsuario(key_usuario) {
    var data = Usuario.Actions.getByKey(key_usuario, this.props);
    if (!data) return <View />
    return <SView>
      <SText>Admin: {data.Nombres}</SText>
    </SView>
  }
  render() {

    const getLista = () => {
      var data = Usuario.Actions.getAll(this.props);
      var ClientesActivos = Usuario.Actions.getAllClientesActivos(this.props);
      if (!data) return <SLoad />
      if (!ClientesActivos) return <SLoad />
      if (!this.state.buscador) {
        return <View />
      }

      var objFinal = {};
      Object.keys(ClientesActivos).map((key) => {
        objFinal[key] = {
          ...data[key],
          vijencia: ClientesActivos[key],
          fecha_inicio: ClientesActivos[key].fecha_on,
          fecha_fin: ClientesActivos[key].fecha_fin,
        };
      });

      var isRecuperar = SSRolesPermisosValidate({ page: "UsuarioPage", permiso: "recuperar_eliminado" });
      return this.pagination(
        new SOrdenador([
          { key: "Peso", order: "desc", peso: 4 },
          { key: "fecha_fin", order: "asc", peso: 3 },
        ]).ordernarObject(
          this.state.buscador.buscar(objFinal)
        )
      ).map((key) => {
        var obj = data[key];
        var vijencia = objFinal[key]["vijencia"];
        return <TouchableOpacity style={{
          width: "90%",
          maxWidth: 600,
          padding: 4,
          height: 100,
          margin: 4,
          borderRadius: 10,
          backgroundColor: "#66000044"
        }} onPress={() => {
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
                backgroundColor: "#ff999933",
                borderRadius: 100,
                overflow: "hidden"
              }}>
                <SImage src={SSocket.api.root + "usuario_" + key} />
              </View>
              <View style={{
                flex: 1,
                justifyContent: "center"
              }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#fff",
                  textTransform: "capitalize",
                  textDecorationLine: (obj.estado == 0 ? "line-through" : "none"),
                }}>{obj["Nombres"] + " " + obj["Apellidos"]}</Text>
                {this.getSucursal(vijencia["caja"].key_sucursal)}
                {this.getUsuario(vijencia["caja"].key_usuario)}


                <Text style={{ fontSize: 10, color: "#fff", }}>{vijencia.paquete.nombre}</Text>
              </View>
              <SView center>
                <View style={{
                  width: 40,
                  height: 40,
                  marginRight: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ff999933",
                  borderRadius: 100,
                  overflow: "hidden"
                }}>
                  <SImage src={SSocket.api.root + "paquete_" + vijencia.paquete.key} />
                </View>
                <Text style={{ fontSize: 10, color: "#fff", textTransform: "lowercase" }}>{vijencia.paquete.descripcion}</Text>
              </SView>
            </View>

          </View>
          <Paquete_Item data={vijencia} paquete={vijencia.paquete} />
        </TouchableOpacity>
      })
    }
    return (
      <SPage hidden disableScroll>
        <BarraSuperior title={"Clientes"} navigation={this.props.navigation} goBack={() => {
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
          <FloatButtom esconder={!SSRolesPermisosValidate({ page: "UsuarioPage", permiso: "crear" })} onPress={() => {
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
export default connect(initStates)(ClientesPage);