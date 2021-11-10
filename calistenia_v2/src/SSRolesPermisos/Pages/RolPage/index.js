import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Config from '../../config.json'

import FloatButtom from '../../../Components/FloatButtom';
import { SSRolesPermisosValidate } from '../..';
import { SButtom, SImage, SPage, SSCrollView, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';


class RolPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  render() {

    const getButtonCrear = () => {
      // var pagina = this.props.state.usuarioPageReducer.data["RolPage"];
      // if (!pagina) {
      //   return <View />;
      // }
      // if (!pagina.permisos["crear"]) {
      //   return <View />;
      // }
      return (<FloatButtom label={"+"} onPress={() => {
        this.props.navigation.navigate("RolRegistroPage");
      }} />)
    }
    const getButtonEditar = (obj) => {
      if (!SSRolesPermisosValidate({ page: "rolPage", permiso: "editar" })) {
        // return <View />
      }

      return (<SButtom
        props={{
          type: "outline"
        }}
        onPress={() => {
          this.props.navigation.navigate("RolRegistroPage", { key: obj.key });
        }} style={{
          width: 60,
          height: 22,
        }} >Editar</SButtom>
      )
    }

    const getButtomAnular = (obj) => {
      // var pagina = this.props.state.usuarioPageReducer.data["RolPage"];
      // if (!pagina) {
      //   return <View />;
      // }
      // if (!pagina.permisos["anular"]) {
      //   return <View />;
      // }
      return (<SButtom
        props={{
          variant: "confirm",
          type: "danger"
        }}
        style={{
          width: 60,
          height: 22,
        }}
        onPress={() => {
          var object = {
            component: "rol",
            type: "editar",
            estado: "cargando",
            data: {
              ...obj,
              estado: 0,
            },
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            key: obj.key
          }
          SSocket.send(object)
        }}
      >Eliminar</SButtom>)

    }
    const getLista = () => {
      var reducer = this.props.state.rolReducer;
      var permisos = reducer.data;
      if (!permisos) {
        if (reducer.estado == "cargando") {
          return <ActivityIndicator color={STheme.color.secondary} />
        }
        var object = {
          component: "rol",
          type: "getAll",
          estado: "cargando",
          key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        }
        SSocket.send(object)
        return <ActivityIndicator color={STheme.color.secondary} />
      }

      return Object.keys(permisos).map((key) => {
        var obj = permisos[key];
        if(obj.estado == 0) return;
        var urlImage = Config.url + "rol/" + obj.key;
        return <View style={{
          width: "95%",
          maxWidth: 600,
          height: 60,
          padding: 4,
          marginBottom: 8,
          borderRadius: 8,
          backgroundColor: STheme.color.card,
          // borderWidth: 1,
          // borderColor: STheme.color.secondary + "22",
        }}>
          <View style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
          }}>
            <View style={{
              width: 50,
              height: 50,
              borderRadius: 8,
              overflow: 'hidden',
            }}>
              <SImage src={urlImage} />
            </View>
            <View style={{
              flex: 1,
              // alignItems: "center",
              paddingStart: 8,
              justifyContent: "center",
            }}>
              <Text style={{
                fontSize: 18,
                color: STheme.color.secondary,
                fontWeight: "bold"
              }}>{obj.descripcion}</Text>


            </View>
            <View style={{
              justifyContent: "space-evenly",
              alignItems: "center"
            }}>
              {getButtonEditar(obj)}
              {getButtomAnular(obj)}

            </View>
          </View>
        </View>
      })
    }
    return (
      <SPage title={"Roles de usuario"} disableScroll>
        <View style={{
          flex: 1,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center"
          // backgroundColor:"#000",
        }}>

          <View style={{
            flex: 1,
            width: "100%",
          }}>
            <SSCrollView disableHorizontal >
              <SView center col={"xs-12"}>
                {getLista()}
              </SView>
            </SSCrollView>

          </View>
          {getButtonCrear()}
        </View>
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(RolPage);