import { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { ExportExcel, SButtom, SImage, SLoad, SNavigation, SOrdenador, SPage, SScrollView2, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import BarraSuperior from '../../../../Components/BarraSuperior';
import Buscador from '../../../../Components/Buscador';
import FloatButtom from '../../../../Components/FloatButtom';
import Model from '../../../../Model';
import { SSRolesPermisosValidate } from '../../../../SSRolesPermisos';

var objFinal = {};

class UsuarioPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        curPage: 1,
      }
    };

  }
  componentDidMount() {
    // if (this.props.state.usuarioReducer.usuarioLog) {
    //   var object = {
    //     service: "usuario",
    //     component: "usuario",
    //     version: "2.0",
    //     type: "getAll",
    //     estado: "cargando",
    //     cabecera: "registro_administrador",
    //     key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
    //   }
    //   SSocket.send(object);

    // }

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
    return <Text style={{ fontSize: 16, color: (ci.length < 7 ? "red" : STheme.color.text), }}>{"CI: " + ci}</Text>
  }

  valido_Telefono(telefono) {
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
    return <Text style={{ fontSize: 16, color: (correo.length < 12 ? "red" : STheme.color.text), }}>{"Correo: " + correo}</Text>
  }


  render() {

    const getLista = () => {
      var data = Model.usuario.Action.getAll();
      if (!data) return <SLoad />
      if (!this.state.buscador) {
        return <View />
      }
      Object.keys(data).map((key) => {
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
          backgroundColor: STheme.color.card
        }} onPress={() => {
          SNavigation.navigate("registro", {
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
                marginLeft: 4,
                justifyContent: "center",
                alignItems: "center",
                // padding: 1,
                // borderRadius: 200,
                backgroundColor: STheme.color.card,
                borderRadius: 100,
                overflow: "hidden"
              }}>
                <SImage src={SSocket.api.root + "usuario/" + key + `?date=${new Date().getTime()}`} />

              </View>
              <View style={{
                flex: 1,
                justifyContent: "center"
              }}>
                <Text style={{
                  fontSize: 16,
                  color: STheme.color.text,
                  textDecorationLine: (obj.estado == 0 ? "line-through" : "none"),
                }}>{obj["Nombres"] + " " + obj["Apellidos"]} {this.valido_Telefono(obj?.Telefono)} {this.valido_Correo(obj?.Correo)}</Text>
              </View>
              {this.getRecuperar(obj, isRecuperar)}
            </View>
          </View>
        </TouchableOpacity>
      })
    }
    return (
      <SPage hidden disableScroll>
        <BarraSuperior title={"Usuarios"} navigation={this.props.navigation} goBack={() => {
          SNavigation.goBack();
        }} />
        <Buscador placeholder={"Buscar por CI, Nombres, Apellidos, Correo o Telefono."} ref={(ref) => {
          if (!this.state.buscador) this.setState({ buscador: ref });
        }} repaint={() => { this.setState({ ...this.state }) }}
          eliminados={SSRolesPermisosValidate({ page: "UsuarioPage", permiso: "ver_eliminados" })}
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

              {/* tarea10 ✅ ✅ ✅ */}
              <ExportExcel
                header={[
                  { key: "nombres", label: "Nombres", width: 100 },
                  { key: "apellidos", label: "Apellidos", width: 100 },
                  { key: "telefono", label: "Telefono", width: 100 },
                ]}
                getDataProcesada={() => {
                  var daFinal = {};


                  // const ingreso = 0, egreso = 0, traspaso = 0;
                  var total = { ingreso: 0, egreso: 0, traspaso: 10 }
                  Object.values(objFinal).map((obj, i) => {
                    var toInsert = {
                      nombres: obj?.Nombres,
                      apellidos: obj?.Apellidos,
                      telefono: obj?.Telefono,
                    }
                    daFinal[i] = toInsert
                  })
                  return daFinal
                }}
              />
            </SView>


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
export default connect(initStates)(UsuarioPage);