import { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { ExportExcel, SButtom, SIcon, SImage, SLoad, SNavigation, SOrdenador, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import BarraSuperior from '../src/Components/BarraSuperior';
import Buscador from '../src/Components/Buscador';
import Model from '../src/Model';
import { SSRolesPermisosValidate } from '../src/SSRolesPermisos';

var objFinal = {};

var _fecha_inicio = "2023-02-01"
var _fecha_fin = "2023-04-01"
class Llamada extends Component {

  // primer paso para hacer un gradico svg dos rayas
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        curPage: 1,
      },
      select: {
        "nuevo": false,
        "todos": true,
        "activos": false,
        "egreso": false,
        "eliminados": false,
        "becados": false,
        "distintos": false,
      },
      ...this.state,


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

  valido_Cumpleaños(Cumpleaños) {
    var fecha = Cumpleaños;
    var fechaObj = new Date(fecha);
    var mes = fechaObj.getMonth() + 1;
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1;

    // var _dia = fechaObj.getDate();
    // var _mes = fechaObj.getMonth() + 1;
    // var _fechaString = dia + "/" + mes;

    var mensaje = "";
    if (mes === mesActual) {
      var _dia = fechaObj.getDate();
      var _mes = fechaObj.getMonth() + 1;
      var _fechaString = _mes + "/" + _dia;
      mensaje = "📆 " + _fechaString;
    } else {
      mensaje = "";
    }
    return <Text style={{ fontSize: 16, color: (mes === mesActual ? "red" : STheme.color.text), }}>{mensaje}</Text>
  }

  setColor(key) {


    if (key == "nuevo") {
      return STheme.color.card;
      // return "rgb(62,177,227)+88";
    }

    if (key == "todos") {
      return "rgba(113, 175, 74, 0.53)+88";
    }
    if (key == "activos") {
      return "rgba(223, 39, 50, 0.53)+8";
    }
    if (key == "eliminados") {
      return "rgba(239, 140, 56, 0.53)";
    }
    if (key == "becados") {
      return "rgba(170, 170, 170, 0.53)+9";
    }
    if (key == "distintos") {
      return "rgb(171,112,233)+9";
    }

    else {
      return "rgba(170, 170, 170, 0.53)+9";
    }

  }
  setMensaje(nombre, numero) {
    let sms = "https://web.whatsapp.com/send?phone=591" + 69050028 + "8&text=Hola,%20" + nombre + "%20desearle%20feliz%cumpleaños!!";
    return <>
      <SView row height={36} center onPress={() => { SNavigation.openURL(sms); }} row>
        <SText>{numero}</SText>
      </SView>
    </>

  }




  optionItem({ key, label }) {
    var select = !!this.state.select[key]


    return <>
      <SView row height={36} center style={{
        paddingLeft: 8,
        paddingRight: 8,
        opacity: select ? 1 : 0.2,
        borderRadius: 4,
        backgroundColor: this.setColor(key),
      }} onPress={() => {


        if (key == "nuevo") SNavigation.navigate("registro");
        // if (key == "todos") SNavigation.navigate("registro");
        // if (key == "activos") SNavigation.navigate("registro");
        // if (key == "eliminados") SNavigation.navigate("registro");
        // if (key == "becados") SNavigation.navigate("registro");
        // if (key == "distintos") SNavigation.navigate("registro");
        // if (!this.state.select["distintos"]) {
        //   console.log("chaval activado")
        // }




        if (!select) {
          this.state.select[key] = true;
        } else {
          delete this.state.select[key];
        }


        this.setState({ ...this.state })
      }} row>
        {!select ? null : <> <SIcon name={"Close"} width={12} height={12} fill={STheme.color.text} /> <SView width={8} /></>}
        <SText>{label}</SText>
      </SView>
      <SView width={8} ></SView>
    </>
  }

  menu() {
    const items = [
      // { key: "crear", label: " + Crear" },
      { key: "nuevo", label: " + Crear" },
      { key: "todos", label: "Todos ✅" },
      { key: "activos", label: "Activos" },
      { key: "eliminados", label: "Eliminados" },
      { key: "becados", label: "Becados" },
      { key: "distintos", label: "No inscriptos" },
    ].map(item =>
      this.optionItem(item)
    );
    return items;
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
          // { key: "Fecha nacimiento", order: "desc", peso: 1 },
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
                }}>{obj["Nombres"] + " " + obj["Apellidos"]}
                  {/* {this.valido_Telefono(obj?.Telefono)} */}

                  {this.valido_Cumpleaños(obj["Fecha nacimiento"],)}
                  {/* {this.setMensaje("alvaroski", "69050028")} */}
                  {/* {this.setMensaje(obj["Nombres"] + " " + obj["Apellidos"], obj.Telefono)} */}
                </Text>
              </View>
              {this.getRecuperar(obj, isRecuperar)}
            </View>
          </View>
        </TouchableOpacity>
      })
    }
    return (
      <SPage hidden disableScroll center>
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

            <SView col={"xs-12"} style={{ height: 56, }} center row border={"transparent"}>
              <SView col={"xs-5"} style={{ height: 56, justifyContent: "flex-start" }} center row border={"transparent"}  >
                {/* <SHr height={10} /> */}
                {this.menu()}
                {/* <SHr height={10} /> */}
              </SView>
            </SView>


            <SView col={"xs-12"} center border={"transparent"}>
              {/* tarea10 ✅ ✅ ✅ */}
              <ExportExcel
                header={[
                  // { key: "key_usuario", label: "key", width: 250 },
                  // { key: "ci", label: "documento", width: 40 },
                  { key: "indice", label: "n", width: 40 },
                  { key: "telefono", label: "telefono", width: 90 },
                  { key: "nombres", label: "nombres", width: 200 },
                  // { key: "cumpleaños", label: "cumpleaños", width: 80 },
                  // { key: "correo", label: "correo", width: 150 },
                ]}
                getDataProcesada={() => {
                  var daFinal = {};
                  // const ingreso = 0, egreso = 0, traspaso = 0;
                  var total = { ingreso: 0, egreso: 0, traspaso: 10 }
                  Object.values(objFinal).map((obj, i) => {
                    var toInsert = {
                      indice: i + 1,
                      key_usuario: obj?.key,
                      nombres: obj?.Nombres + " " + obj?.Apellidos,
                      ci: obj?.CI,
                      correo: obj?.Correo,
                      cumpleaños: obj["Fecha nacimiento"],
                      telefono: obj?.Telefono,
                    }
                    daFinal[i] = toInsert
                  })
                  return daFinal
                }}
              />
            </SView>


            <SView col={"xs-12"} center  >
              {getLista()}

            </SView>
          </SScrollView2>
        </View>
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(Llamada);