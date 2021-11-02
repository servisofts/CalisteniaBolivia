import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { SButtom, SImage, SInput, SNavigation, SPage,STheme } from 'servisofts-component';
import SSocket from 'servisofts-socket';
// import NaviDrawer from '../../../Component/NaviDrawer';
import { choseFile } from '../../../Components/SImageImput';
import Config from '../../config.json'

var _ref = {};
class PermisoPageRegistroPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    var styleImput = {
      width: "80%",
      padding: 8,
      height: 50,
      margin: 8,
      borderWidth: 2,
      borderColor: STheme.color.secondary,
      color: STheme.color.secondary,
      borderRadius: 8,
    }

    var key = SNavigation.getParam("key", false);
    this.key = key;
    this.TextButom = "CREAR";
    this.data = {};
    if (key) {
      this.TextButom = "EDITAR";
      this.data = this.props.state.pageReducer.data[key];
      if (!this.data) {
        alert("NO HAY DATA");
      }
    }

    this.imputs = {
      descripcion: new SInput({
        placeholder: "Descripcion o nombre",
        // autoCapitalize: "none",
        defaultValue: this.data.descripcion,
        style: styleImput
      }),
      url: new SInput({
        placeholder: "Direccion o url",
        defaultValue: this.data.url,
        // autoCapitalize: "none",
        style: styleImput
      }),
      style: new SInput({
        placeholder: "estilo",
        defaultValue: this.data.style,
        // autoCapitalize: "none",
        style: styleImput
      }),
      is_page: new SInput({
        type: "Check",
        placeholder: "Es pagina?",
        defaultValue: this.data.is_page,
        // autoCapitalize: "none",
        style: styleImput
      }),
    }
  }
  componentDidMount() { // B

  }

  getButtom() {

  }
  render() {

    if (this.props.state.pageReducer.estado == "error") {
      this.props.state.pageReducer.estado = "";
      alert("error");
    }
    if (this.props.state.pageReducer.estado == "exito" && this.props.state.pageReducer.type == "registro") {
      this.props.state.pageReducer.estado = "";
      this.props.navigation.goBack();
    }
    if (this.props.state.pageReducer.estado == "exito" && this.props.state.pageReducer.type == "editar") {
      this.props.state.pageReducer.estado = "";
      this.props.navigation.goBack();
    }
    var urlImage = Config.url + "page/" + this.data.key;
    return (
      <SPage title={(!this.key ? "Crear Pagina" : "Editar Pagina")} >
        <View style={{
          flex: 1,
          alignItems: 'center',
        }}>

          <View style={{
            flex: 1,
            width: "100%",
            alignItems: 'center',

          }}>

            <View style={{
              width: "100%",
              maxWidth: 600,
              alignItems: 'center',
              // justifyContent: 'center',
            }}>
              <TouchableOpacity style={{
                width: 180,
                height: 180,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:STheme.color.card,
                borderRadius: 8,
                marginBottom: 16,
                overflow: 'hidden',
                // overflow: "hidden"
              }} onPress={() => {
                // var pagina = this.props.state.usuarioPageReducer.data["PermisoCrearPage"];
                // if (!pagina) {
                //   return <View />;
                // }
                // if (!pagina.permisos["cambiar_foto"]) {
                //   return <View />;
                // }
                choseFile({
                  servicio: "roles_permisos",
                  component: "page",
                  type: "subirFoto",
                  estado: "cargando",
                  key: this.data.key,
                  key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
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
                <SImage src={urlImage}/>
              </TouchableOpacity>
              {Object.keys(this.imputs).map((key) => {
                return this.imputs[key].getComponent();
              })}
            </View>
            <View style={{
              width: "100%",
              maxWidth: 600,
              justifyContent: 'center',
              flexDirection: "row",
            }}>
              <SButtom
                onPress={() => {
                  if (this.props.state.pageReducer.estado == "cargando") {
                    return;
                  }
                  // var pagina = this.props.state.usuarioPageReducer.data["PermisoPagePage"];
                  // if (!pagina) {
                  //   return true;
                  // }
                  // if (!pagina.permisos["editar_permiso"]) {
                  //   return true;
                  // }
                  var isValid = true;
                  var objectResult = {};
                  Object.keys(this.imputs).map((key) => {
                    if (this.imputs[key].verify() == false) isValid = false;
                    objectResult[key] = this.imputs[key].getValue();
                  })
                  if (isValid) {
                    var object = {};
                    if (!this.data.key) {
                      object = {
                        component: "page",
                        type: "registro",
                        estado: "cargando",
                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                        data: {
                          ...objectResult
                        },
                      }
                    } else {
                      object = {
                        component: "page",
                        type: "editar",
                        estado: "cargando",
                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
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
              >{this.props.state.pageReducer.estado == "cargando" ? "cargando" : this.TextButom}</SButtom>
            </View>
          </View>

        </View>
      </SPage>
    );
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(PermisoPageRegistroPage);