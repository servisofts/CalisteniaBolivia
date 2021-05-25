import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import { View, Text, Button, TouchableOpacity, ScrollView, Linking, Platform } from 'react-native';
import NaviDrawer from '../../Component/NaviDrawer';
import NaviDrawerButtom from '../../Component/NaviDrawer/NaviDrawerButtom';
import * as SSNavigation from '../../SSNavigation'
import ActionButtom from '../../Component/ActionButtom';
import AppParams from '../../Params';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';


class UsuarioPage extends Component {
  static navigationOptions = {
    title: "Lista de usuario.",
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
    };
    SSNavigation.setProps(props);

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

  render() {

    const getLista = () => {
      var data = this.props.state.usuarioReducer.usuarios;
      if (!data) {
        if (this.props.state.usuarioReducer.estado == "cargando") {
          return <Text>Cargando</Text>
        }
        var object = {
          component: "usuario",
          type: "getAll",
          estado: "cargando",
          cabecera: "registro_administrador",
          data: ""
        }
        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
        return <View />
      }
      // console.log(data);
      return Object.keys(data).map((key) => {
        var usr = data[key];
        var obj = data[key].datos;
        // console.log(obj);
        // return <View />
        if (!usr.estado) {
          return <View />
        }
        return <View style={{
          width: "90%",
          maxWidth: 500,
          height: 120,
          padding: 8,
          margin: 8,
          borderRadius: 10,
          backgroundColor: "#66000022"
          // borderWidth: 1,
          // borderColor: "#ddd",
        }}>
          <View style={{
            flex: 4
          }}>
            <View style={{
              flexDirection: "row",
              height: "100%",
              width: "100%",
            }}>
              <View style={{
                width: 90,
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                padding: 8,
              }}>
                {this.props.state.imageReducer.getImage(AppParams.urlImages + "usuario_"+key, {
                  width: "90%",
                  height: "90%",
                })}
              </View>
              <View style={{
                flex: 1,
              }}>
                <View style={{
                  flexDirection: "row",
                  flex: 1.5,
                }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#fff"
                  }}>{obj["Nombres"].dato + " " + obj["Apellidos"].dato}</Text>
                </View>
                <View style={{
                  flexDirection: "row",
                  flex: 1,
                }}>
                  {/* <Text style={{
                    color: "#999"
                  }}>Correo: </Text> */}
                  <TouchableOpacity onPress={() => {
                    this.sendMail(obj["Correo"].dato)
                  }}>
                    <Text style={{
                      color: "#999",
                      textDecorationLine: (Platform.OS=="web"?"none":"underline"),
                    }}>{obj["Correo"].dato}</Text>
                  </TouchableOpacity>

                </View>
                <View style={{
                  flex: 1,
                  flexDirection: "row"
                }}>

                  {/* <Text style={{
                    color: "#999"
                  }}>Telefono: </Text> */}
                  <TouchableOpacity onPress={() => {
                    this.callNumber(obj["Telefono"].dato)
                  }}>
                    <Text style={{
                      color: "#999",
                      textDecorationLine: (Platform.OS=="web"?"none":"underline"),
                    }}>{obj["Telefono"].dato}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={{
            flex: 1,
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
            // backgroundColor: "#fff"
          }}>

          </View>
          {/* <View style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}>
            <ActionButtom label="Ver" style={{
              height: 30,
            }}
              onPress={() => {
                this.props.navigation.navigate("UsuarioRegistroPage", { key: key });
              }} />
            <ActionButtom label="Eliminar"
              style={{
                height: 30,
                backgroundColor: "#99000077"
              }}
              styleText={{
                color: "#fff"
              }}
              onPress={() => {
                var object = {
                  component: "usuario",
                  type: "editar",
                  estado: "cargando",
                  data: {
                    key: key,
                    estado: 0
                  }
                }
                this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
              }}
            />
          </View> */}
        </View>
      })
    }
    return (<>
      <View style={{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
        // backgroundColor:"#000",
      }}>
        <BackgroundImage />
        <BarraSuperior title={"Usuarios"} navigation={this.props.navigation} goBack={() => {
          this.props.navigation.goBack();
        }} />
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{
            alignItems: "center"
          }}
        >
          {getLista()}
        </ScrollView>

        {/* <NaviDrawerButtom open={() => {
          this.state.naviDrawer.open();
        }} /> */}
      </View>
      {/* <NaviDrawer ref={(ref) => {
        this.state.naviDrawer = ref;
      }} navigation={this.props.navigation} /> */}
    </>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(UsuarioPage);