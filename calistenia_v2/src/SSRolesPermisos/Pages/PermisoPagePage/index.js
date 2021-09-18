import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import FloatButtom from '../../../Components/FloatButtom';
import Config from '../../config.json'

import Buscador from '../../../Components/Buscador';
import { SButtom, SPage, SOrdenador, SSCrollView, STheme, SIcon, SImage, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';


class PermisoPagePage extends Component {
  static navigationOptions = {
    title: "Permisos page.",
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  render() {
    var permisos = this.props.state.pageReducer.data;
    if (!permisos) {
      if (this.props.state.pageReducer.estado == "cargando") {
        return <Text>Cargando</Text>
      }
      var object = {
        component: "page",
        type: "getAll",
        estado: "cargando",
        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
      }
      SSocket.send(object)
      return <View />
    }
    // console.log(permisos)
    const getPermisos = (key_page) => {
      var reducer = this.props.state.permisoReducer;
      var permisos = reducer.data[key_page];
      if (!permisos) {
        if (Object.keys(reducer.data).length > 0) {
          permisos = {};
        } else {
          if (reducer.estado == "cargando") {
            return <Text>Cargando</Text>
          }
          var object = {
            component: "permiso",
            type: "getAll",
            estado: "cargando",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key
          }
          SSocket.send(object)
          return <View />
        }
      }
      var Lista = new SOrdenador([
        { key: "descripcion", order: "asc", peso: 2 },
      ]).ordernarObject(
        permisos
      ).map((key) => {
        var objPermiso = permisos[key];
        // fetch(AppParams.urlImages + "permiso/" + objPermiso.key)

        if (objPermiso.key_page != key_page) {
          return <View />
        }
        if (objPermiso.estado == 0) {
          return <View />
        }
        var urlImage = Config.url + "permiso/" + objPermiso.key;
        return <TouchableOpacity style={{
          width: 80,
          height: 120,
          alignItems: "center",
        }} onPress={() => {
          // var pagina = this.props.state.usuarioPageReducer.data["PermisoPagePage"];
          // if (!pagina) {
          //   return true;
          // }
          // if (!pagina.permisos["ver_perfil_permiso"]) {
          //   return true;
          // }
          this.props.navigation.navigate("PermisoCrearPage", { key: objPermiso.key, key_page: objPermiso.key_page });
        }}>
          <View style={{
            width: 60,
            height: 60,
            borderRadius: 8,
            backgroundColor: STheme.color.card,
            borderColor: "#ddd",
            justifyContent: "flex-start",
            alignItems: "center",
            overflow: "hidden",
          }}>
            <SImage src={urlImage} />

          </View>
          <Text style={{
            width: "90%",
            textAlign: "center",
            fontSize: 10,
            // backgroundColor: "#000",
            color: STheme.color.secondary,
          }}>{objPermiso.descripcion}</Text>
        </TouchableOpacity>
      })
      const getButtomCrearPermiso = (obj) => {
        // var pagina = this.props.state.usuarioPageReducer.data["PermisoPagePage"];
        // if (!pagina) {
        //   return <View />
        // }
        // if (!pagina.permisos["agregar_permiso"]) {
        //   return <View />
        // }
        return (
          <TouchableOpacity style={{
            height: 80,
            width: 80,
            alignItems: "center"
          }}
            onPress={() => {
              this.props.navigation.navigate("PermisoCrearPage", { key_page: key_page });
            }} >
            <SIcon name={"Add"} style={{
              width: 60,
              height: 60
            }} />
          </TouchableOpacity>
        )
      }
      return <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start"
        }}>
        {getButtomCrearPermiso()}
        {Lista}
      </View>
    }
    const getButtomEditar = (obj) => {
      // var pagina = this.props.state.usuarioPageReducer.data["PermisoPagePage"];
      // if (!pagina) {
      //   return <View />
      // }
      // if (!pagina.permisos["editar"]) {
      //   return <View />
      // }
      return (<SButtom styleText={{ fontSize: 10, }}
        props={{
          type: "outline",
        }}
        onPress={() => {
          this.props.navigation.navigate("PermisoPageRegistroPage", { key: obj.key });
        }} style={{
          width: 60,
          height: 25,
          borderRadius: 4,
          margin: 0,
        }} >
        Editar
      </SButtom>)
    }
    const getButtomAnular = (obj) => {
      // var pagina = this.props.state.usuarioPageReducer.data["PermisoPagePage"];
      // if (!pagina) {
      //   return <View />
      // }
      // if (!pagina.permisos["anular"]) {
      //   return <View />
      // }
      return (<SButtom
        props={{
          type: "danger",
          variant: "confirm"
        }}
        style={{
          width: 60,
          height: 25,
          borderRadius: 4,
        }}
        onPress={() => {
          var object = {
            component: "page",
            type: "editar",
            estado: "cargando",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            data: {
              ...obj,
              estado: 0,
            },
          }
          SSocket.send(object)
        }}
      >Anular</SButtom>)
    }

    const getLista = () => {
      if (!this.state.buscador) {
        return <ActivityIndicator color={"#fff"} />
      }

      return new SOrdenador([
        { key: "descripcion", order: "asc", peso: 2 },
      ]).ordernarObject(
        this.state.buscador.buscar(permisos)
      ).map((key) => {
        var obj = permisos[key];
        if (obj.estado == 0) {
          return <View />
        }
        return <View style={{
          width: "95%",
          // padding: 4,
          padding: 4,
          marginBottom: 8,
          borderRadius: 10,
          // borderWidth: 2,
          borderColor: "#ddd",
          justifyContent: "center",
          backgroundColor: STheme.color.card,
          // alignItems:"ce"
        }}>
          <View style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 80,
            marginBottom: 8,
            borderBottomColor: "#660000",
            borderBottomWidth: 1,
          }}>
            <View style={{
              width: 45,
              height: 45,
              margin: 4,
            }}>
              <SImage src={Config.url + "page/" + key} />
              {/* {this.props.state.imageReducer.getImage(AppParams.servicios["roles_permisos"] + "page/" + key, {})} */}
            </View>
            {/* <Text style={{
              color: "#999"
            }}>descripcion: </Text> */}
            <View style={{
              flex: 2,
              // alignItems: "center"
            }}>
              <Text style={{
                fontSize: 18,
                color: STheme.color.secondary,
              }}>{obj.descripcion}</Text>
              <Text style={{
                fontSize: 10,
                color: STheme.color.secondary,
              }}>{"/" + obj.url}</Text>
            </View>

            <View style={{
              // flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: 4,
            }}>
              {getButtomEditar(obj)}
              <View style={{
                height: 8,
              }}></View>
              {getButtomAnular(obj)}

            </View>
          </View>

          <View style={{
            marginTop: 4,
            flex: 1,
            flexDirection: "column",
          }}>
            {getPermisos(obj.key)}
          </View>
        </View>
      })
    }
    const getButtomCrear = () => {
      // var pagina = this.props.state.usuarioPageReducer.data["PermisoPagePage"];
      // if (!pagina) {
      //   return <View />
      // }
      // if (!pagina.permisos["crear"]) {
      //   return <View />
      // }
      return (
        <FloatButtom text="nuevo"
          onPress={() => {
            this.props.navigation.navigate("PermisoPageRegistroPage");
          }}
          label={"+"}
        />
      )
    }
    return (
      <SPage title={"Lista de paginas"}>
        <View style={{
          flex: 1,
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}>

          <View style={{
            flex: 1,
            width: "100%",
            alignItems: 'center',
          }}>

            <Buscador placeholder={"Buscar."} ref={(ref) => {
              if (!this.state.buscador) this.setState({ buscador: ref });
            }} repaint={() => { this.setState({ ...this.state }) }}
              eliminados={false}
            />
            <View style={{
              flex: 1,
              width: "100%",
              alignItems: 'center',

            }}>
              {/* <SSCrollView disableHorizontal style={{
                maxWidth: "100%",
              }} disableHorizontal> */}
              <SView center col={"xs-12"}>
                {getLista()}
              </SView>
              {/* </SSCrollView> */}
            </View>
          </View>

          {getButtomCrear()}
        </View>
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(PermisoPagePage);