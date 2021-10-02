import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as SImageImput from '../../../Components/SImageImput';

import Config from '../../config.json'

import PremisosDelRol from './PremisosDelRol';
import { SButtom, SImage, SInput, SNavigation, SPage, SSCrollView, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
var _ref = {};
class RolRegistroPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      repaintImage: new Date().getTime()
    };
    var styleImput = {
      width: "100%",
      padding: 8,
      height: 50,
      margin: 8,
      borderWidth: 2,
      borderColor: "#999",
      borderRadius: 8,
      color: "#fff",
    }
    var key = SNavigation.getParam("key", false);
    this.TextButom = "CREAR";
    this.data = {};
    if (key) {
      this.TextButom = "EDITAR";
      this.data = this.props.state.rolReducer.data[key];
      if (!this.data) {
        //  SNavigation.goBack();
        this.data = {}
      }
    }
    this.imputs = {
      descripcion: new SInput({
        placeholder: "Descripcion o nombre",
        defaultValue: this.data.descripcion,
        isRequired: true,
        // autoCapitalize: "none",
        style: styleImput
      })
    }
  }
  componentDidMount() { // B

  }

  render() {

    if (this.props.state.rolReducer.estado == "error") {
      this.props.state.rolReducer.estado = "";
    }
    if (this.props.state.rolReducer.estado == "exito" && this.props.state.rolReducer.type == "anular") {
      this.props.state.rolReducer.estado = "";
      SNavigation.goBack();
    }
    if (this.props.state.rolReducer.estado == "exito" && this.props.state.rolReducer.type == "registro") {
      this.props.state.rolReducer.estado = "";
      SNavigation.goBack();
    }
    if (this.props.state.rolReducer.estado == "exito" && this.props.state.rolReducer.type == "editar") {
      this.props.state.rolReducer.estado = "";
      SNavigation.goBack();
    }
    var urlImage = Config.url + "rol/" + this.data.key;
    // var urlImage = AppParams.urlImages + "rol/" + this.data.key;
    return (
      <SPage title={(!this.data.key ? "Crear rol" : "Editar rol")}>
        <View style={{
          flex: 1,
          height: "100%",
        }}>
          <View style={{
            flex: 1,
            width: "100%",
          }}>
            <View style={{
              width: "100%",
              // maxWidth: 600,
              alignItems: 'center',
            }}>
              <View style={{
                width: "100%",
                maxWidth: 600,
                alignItems: 'center',
                justifyContent: 'center',
              }}>

                <TouchableOpacity style={{
                  width: 180,
                  height: 180,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: STheme.color.card,
                  borderRadius: 8,
                  marginBottom: 16,
                  overflow: 'hidden',
                }} onPress={() => {
                  SImageImput.choseFile({
                    servicio: "rp",
                    component: "rol",
                    type: "subirFoto",
                    estado: "cargando",
                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                    key: this.data.key
                  }, (resp) => {
                    // fetch(urlImage);
                    this.props.dispatch({
                      component: "image",
                      type: "cambio",
                      url: urlImage,
                      props: {
                      }
                    })
                    // this.state.repaint = new Date().getTime()
                    // this.setState({...this.state});
                  });
                }}>
                  <SImage src={urlImage} />
                </TouchableOpacity>
                <Text style={{
                  fontSize: 12,
                  color: "#999",
                }}>{this.data.key}</Text>
                {Object.keys(this.imputs).map((key) => {
                  return this.imputs[key].getComponent();
                })}

              </View>
              <View style={{
                height: 50,
                width: "100%",
                maxWidth: 600,
                justifyContent: 'center',
                flexDirection: "row",
              }}>
                <SButtom
                  props={{
                    type: "outline"
                  }}
                  onPress={() => {
                    if (this.props.state.rolReducer.estado == "cargando") {
                      return;
                    }
                    var isValid = true;
                    var objectResult = {};
                    Object.keys(this.imputs).map((key) => {
                      if (this.imputs[key].verify() == false) isValid = false;
                      objectResult[key] = this.imputs[key].getValue();
                    })
                    if (isValid) {
                      var object = {
                        component: "rol",
                        estado: "cargando",
                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                      };
                      if (!this.data.key) {
                        object = {
                          ...object,
                          type: "registro",
                          data: {
                            ...objectResult
                          },
                        }
                      } else {
                        object = {
                          ...object,
                          type: "editar",

                          data: {
                            ...this.data,
                            ...objectResult
                          }
                        }
                      }

                      SSocket.send(object)
                    }
                    this.setState({ ...this.state });
                    return;
                  }}
                >{this.props.state.rolReducer.estado == "cargando" ? "cargando" : this.TextButom}</SButtom>

              </View>
            </View>
            <SView col={"xs-12"} center>

              {!this.data.key ? <View /> : <PremisosDelRol data={this.data} />}
            </SView>

          </View>
          {/* <NaviDrawer /> */}
        </View >
      </SPage>
    );
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(RolRegistroPage);