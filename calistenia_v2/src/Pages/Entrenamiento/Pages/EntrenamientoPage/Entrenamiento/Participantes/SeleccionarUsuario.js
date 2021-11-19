
import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import { View, Text, Button, TouchableOpacity, ScrollView, Linking, Platform, ActivityIndicator } from 'react-native';
import Buscador from '../../../../../../Components/Buscador';
import { SView, SOrdenador, SImage, SDate, SScrollView2, SText, SPage, SIcon } from 'servisofts-component';
import Paquete_Item from './Paquete_Item';
import SSocket from 'servisofts-socket'
import Sucursal from '../../../../../Sucursal';
import Usuario from '../../../../../Usuario';
class SeleccionarUsuario extends Component {
  static navigationOptions = {
    title: "Lista de usuario.",
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        curPage: 1,
      }
    };
    // SSNavigation.setProps(props);

  }
  componentDidMount() {

  }
  sendMail = (to) => {
    if (Platform.OS == "web") return;
    var subject = "Solicitud";
    var body = "";
    var options = {};
    const { cc, bcc } = options;

    let url = `mailto:${to}`;

    // Create email link query
    const query = qs.stringify({
      subject: subject,
      body: body,
      cc: cc,
      bcc: bcc
    });

    if (query.length) {
      url += `?${query}`;
    }

    // check if we can use this link

    Linking.openURL(url);
  };
  callNumber = (phone) => {
    if (Platform.OS == "web") return;
    console.log('callNumber ----> ', phone);
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    }
    else {
      phoneNumber = `tel:${phone}`;
    }

    Linking.openURL(phoneNumber);
  };
  pagination = (listaKeys) => {
    var pageLimit = 10
    if (!listaKeys) {
      return [];
    }
    if (listaKeys.length <= 0) {
      return [];
    }

    var tamanho = listaKeys.length;
    var nroBotones = Math.ceil(tamanho / pageLimit);
    if (this.state.pagination.curPage > nroBotones) {
      this.state.pagination.curPage = nroBotones;
    }
    var actual = pageLimit * (this.state.pagination.curPage - 1);

    // console.log(actual);
    // console.log(actual + pageLimit);
    return listaKeys.slice(0, actual + pageLimit);
  }
  getSucursal(key_sucursal) {
    var data = Sucursal.Actions.getAll(this.props);
    if (!data) return <View />
    var obj = data[key_sucursal]
    if(!obj) return <View />
    return <SView>
      <SText>Sucursal: {obj.descripcion}</SText>
    </SView>
  }
  getUsuario(key_usuario) {
    var data = Usuario.Actions.getAll(this.props);
    if (!data) return <View />
    var obj = data[key_usuario]
    return <SView>
      <SText>Admin: {obj.Nombres}</SText>
    </SView>
  }
  render() {

    const getLista = () => {
      var cabecera = "registro_administrador";
      var data = this.props.state.usuarioReducer.data[cabecera];
      if (!data) {
        if (this.props.state.usuarioReducer.estado == "cargando") {
          return <ActivityIndicator color={"#fff"} />
        }
        var object = {
          component: "usuario",
          version: "2.0",
          type: "getAll",
          estado: "cargando",
          cabecera: cabecera,
          key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        }
        SSocket.send(object);
        return <ActivityIndicator color={"#fff"} />
      }
      var reducer = this.props.state.clientesActivosReducer;
      if (!reducer.data) {
        if (reducer.estado == "cargando") {
          return <ActivityIndicator color={"#fff"} />
        }
        SSocket.send({
          component: "clientesActivos",
          type: "getAll",
          estado: "cargando"
        }, true);
        return <ActivityIndicator color={"#fff"} />
      }

      if (!this.state.buscador) {
        return <ActivityIndicator color={"#fff"} />
      }
      var objFinal = {};
      Object.keys(reducer.data).map((key) => {
        objFinal[key] = {
          ...data[key],
          vijencia: reducer.data[key],
          fecha_inicio: reducer.data[key].fecha_on,
          fecha_fin: reducer.data[key].fecha_fin,
        };
      });
      var dataBuscada = this.state.buscador.buscar(objFinal)
      if (Object.keys(dataBuscada).length == 0) {
        return <SView col={"xs-12"} height={200} center>
          <SView col={"xs-12 md-7 xl-5"} row center>
            <SView col={"xs-2"} colSquare >
              <SIcon name={"Alert"} />
            </SView>
          </SView>
          <SText fontSize={16}>{"Busca al cliente"}</SText>
        </SView>
      }
      return this.pagination(
        new SOrdenador([
          { key: "Peso", order: "desc", peso: 4 },
          { key: "fecha_fin", order: "asc", peso: 3 },
        ]).ordernarObject(dataBuscada)
      ).map((key) => {
        var usr = data[key];
        var obj = data[key];
        var dataFinal = objFinal[key];
        var vijencia = dataFinal["vijencia"];
        // if (!usr.estado) {
        //   return <View />
        // }
        return <TouchableOpacity style={{
          width: "90%",
          maxWidth: 600,
          padding: 4,
          height: 100,
          margin: 4,
          borderRadius: 10,
          backgroundColor: "#66000044"
        }} onPress={() => {
          this.props.select(usr);
          // this.props.navigation.navigate("ClientePerfilPage", {
          //   key_usuario: key
          // })
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
                {/* <SView row>
                  <Text style={{ fontSize: 10, color: "#fff", }}>{new SDate(vijencia.fecha_on).toString("dd/MM/yyyy")}</Text>
                  <Text style={{ fontSize: 10, color: "#fff", }}>{" - "}</Text>
                  <Text style={{ fontSize: 10, color: "#fff", }}>{new SDate(vijencia.fecha_fin).toString("dd/MM/yyyy")}</Text>
                </SView> */}

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
    return (<>
      <SView col={"xs-12"} style={{
        height: 600,
        maxHeight: "90%",
      }} withoutFeedback>
        <View style={{
          width: "100%",
          flex: 1,
          borderRadius: 8,
          overflow: "hidden",
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center"
        }}>
          {SPage.backgroundComponent}
          <SView height={8} />
          <Buscador
            minLength={3}
            ref={(ref) => { if (!this.state.buscador) this.setState({ buscador: ref }); }}
            repaint={() => { this.setState({ ...this.state }) }} />
          <View style={{
            flex: 1,
            width: "100%",
          }}>
            <SScrollView2
              disableHorizontal
              style={{ width: "100%" }}
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
              <View style={{
                width: "100%",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}>
                {getLista()}
                <SView height={50}></SView>
              </View>
            </SScrollView2>
          </View>
        </View>
      </SView>
    </>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(SeleccionarUsuario);