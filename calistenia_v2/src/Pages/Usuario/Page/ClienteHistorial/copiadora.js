import { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { SButtom, SDate, SImage, SInput, SLoad, SNavigation, SOrdenador, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Usuario from '../..';
import BarraSuperior from '../../../../Components/BarraSuperior';
import Buscador from '../../../../Components/Buscador';
import FloatButtom from '../../../../Components/FloatButtom';
import Model from '../../../../Model';
import { SSRolesPermisosValidate } from '../../../../SSRolesPermisos';

class copiadora extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        curPage: 1,
      },

      title: "Reporte Name",
      func: "_get_cliente_fecha_veces_inscripto",
      // params: [this.state.parametros.inicio, this.state.parametros.fin],
      // params: ["'2023-01-01'", "'2023-03-01'"],
      // esrser

      parametros: {
        "inicio": new SDate().addMonth(-2).setDay(1).toString("yyyy-MM-dd"),
        "fin": new SDate().toString("yyyy-MM-dd"),
        "cantidad": 1,
      },
      ...this.state,
    };


  }
  componentDidMount() {
    this.getData();
  }

  getData() {
    this.setState({ loading: "cargando", data: null });
    SSocket.sendPromise({
      component: "reporte",
      type: "execute_function",
      func: this.state.func,
      // params: this.state.params,
      params: ["'" + this.state.parametros.inicio + "'", "'" + this.state.parametros.fin + "'"],
    })
      .then((resp) => {
        this.setState({ loading: false, data: resp.data });
      })
      .catch((e) => {
        this.setState({ loading: false, error: e });
      });
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

  getParametros() {
    return <>

      <SView col={"xs-12"} height={62} row center style={{ borderBottomWidth: 1, borderBottomColor: STheme.color.card }}>





        <SInput col={"xs-3"} type={"date"} customStyle={"calistenia"}
          defaultValue={this.state.parametros.inicio.toString("dd-MM-yyyy")} placeholder={"fecha inicio"}
          onChangeText={(val) => {
            this.state.parametros.inicio = val;
            this.setState({ ...this.state })
          }}


        />
        <SInput ref={ref => this._fechaFin = ref} col={"xs-3"} type={"date"} customStyle={"calistenia"}
          defaultValue={this.state.parametros.fin.toString("dd-MM-yyyy")} placeholder={"fecha fin"}
          onChangeText={(val) => {
            this.state.parametros.inicio = val;
            this.setState({ ...this.state })
          }}

        />
        <SInput ref={ref => this._cantidadIncriptos = ref} col={"xs-3"} type={"number"} customStyle={"calistenia"}
          defaultValue={this.state.parametros.cantidad ?? 0} placeholder={"cantidad inscripto"}
          onChangeText={(val) => {
            // if (val.length < 2) return;
            this.state.parametros.cantidad = val;
            this.setState({ ...this.state })
          }}
        />

      </SView>
    </>

  }

  getParametrosResultados() {

    if (!this.state.data) return null;
    let _data = this.state.data;
    Object.values(_data).map(obj => {
      if (obj.veces > this.state.parametros.cantidad) return;

      console.log("veces ", obj.veces)
    })

  }


  dibujar() {

    if (!this.state.data) return null;
    let _data = this.state.data;

    var usuarios = Model.usuario.Action.getAll();
    if (!usuarios) return <SLoad />

    return Object.values(_data).map(obj => {
      if (obj.veces != this.state.parametros.cantidad) return;
      var usuario = usuarios[obj?.key_usuario];

      //  console.log("veces ", obj.veces)
      return <>
        <SView col={"xs-12"} height={62} row center style={{ borderBottomWidth: 1, borderBottomColor: STheme.color.card }} onPress={() => {

          SNavigation.navigate("ClientePerfilPage", {
            key: usuario.key
          })
        }}>

          <SText >nombre {usuario.Nombres} {usuario.Apellidos} ci {usuario.CI} telefono {usuario?.Telefono}  veces {obj?.veces} </SText>
        </SView>
      </>
    })

  }


  render() {


    // if (_data?.veces > 2) return null;
    // console.log("miralo ", this.state.data)

    const getLista = () => {
      var data = Model.usuario.Action.getAll();
      // var dataRU = SSRolesPermisos.Events.getUsuarioRol("d16d800e-5b8d-48ae-8fcb-99392abdf61f", this.props)
      var dataRU = Model.usuarioRol.Action.getAllByKeyRol("d16d800e-5b8d-48ae-8fcb-99392abdf61f");
      if (!data) return <SLoad />
      if (!dataRU) return <SLoad />
      if (!this.state.buscador) {
        return <View />
      }
      var objFinal = {};
      Object.keys(dataRU).map((key) => {
        var rol_user = dataRU[key];
        if (!rol_user.key_usuario) return;
        if (!rol_user.estado) return;
        if (!data[rol_user.key_usuario]) {
          return;
        }
        if (!data[rol_user.key_usuario].estado) return;
        objFinal[rol_user.key_usuario] = data[rol_user.key_usuario]
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
          // return;
          this.select = SNavigation.getParam("select");
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
                backgroundColor: STheme.color.card,
                borderRadius: 100,
                overflow: "hidden"
              }}>
                <SImage src={SSocket.api.root + "usuario/" + key + `?date=${new Date().getTime() / 500}`} />

              </View>
              <View row style={{
                flex: 1,
                justifyContent: "center"
              }}>
                <Text style={{
                  fontSize: 16,
                  color: STheme.color.text,
                  textDecorationLine: (obj.estado == 0 ? "line-through" : "none"),
                }}>{obj["Nombres"] + " " + obj["Apellidos"]} {this.valido_CI(obj?.CI)} {this.valido_Telefono(obj?.Telefono)} {this.valido_Correo(obj?.Correo)}</Text>

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

        {this.getParametros()}

        {this.getParametrosResultados()}

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
              {/* {getLista()} */}
              {this.dibujar()}

            </SView>
          </SScrollView2>
          <FloatButtom onPress={() => {
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
export default connect(initStates)(copiadora);