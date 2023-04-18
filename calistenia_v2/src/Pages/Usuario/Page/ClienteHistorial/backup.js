import { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SImage, SInput, SLoad, SNavigation, SPage, SScrollView2, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Usuario from '../..';
import BarraSuperior from '../../../../Components/BarraSuperior';
import FloatButtom from '../../../../Components/FloatButtom';
import Model from '../../../../Model';

class ClienteHistorial extends Component {

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
  valido_veces(numero) {
    return <Text center style={{
      fontSize: 16, color: STheme.color.text, position: "absolute",
      right: 0,
    }}>{"veces (" + numero + ")"}</Text>
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
      <SView col={"xs-12"} center row border={"transparent"}>
        <SView col={"xs-11 md-9 lg-6"} height={40} center row border={"transparent"} >
          <SInput flex type={"date"} customStyle={"calistenia"} defaultValue={this.state.parametros.inicio.toString("dd-MM-yyyy")} style={{ width: "100%", height: "100%", borderRadius: 4, borderColor: "#666" }}
            onChangeText={(val) => {
              this.state.parametros.inicio = val;
              this.setState({ ...this.state })
            }}
          />
          <SView height width={20} />
          {/* seria mejor con un ref o con un state */}
          {/* ref={ref => this._fechaFin = ref} */}
          <SInput flex type={"date"} customStyle={"calistenia"} defaultValue={this.state.parametros.fin.toString("dd-MM-yyyy")} style={{ width: "100%", height: "100%", borderRadius: 4, borderColor: "#666" }}
            onChangeText={(val) => {
              this.state.parametros.fin = val;
              this.setState({ ...this.state })
            }}
          />
          <SView height width={20} />
          <SInput flex type={"number"} customStyle={"calistenia"} defaultValue={this.state.parametros.cantidad ?? 0} placeholder={"cantidad inscripto"} style={{ width: "100%", height: "100%", borderRadius: 4, borderColor: "#666" }}
            onChangeText={(val) => {
              // if (val.length < 2) return;
              // validar solo que sea maximo 3 caracteres
              this.state.parametros.cantidad = val;
              this.setState({ ...this.state })
            }}
          />
        </SView>
      </SView >
      <SView col={"xs-12"} height={20} />
      <SView col={"xs-12"} center row border={"transparent"}>
        <SView col={"xs-11 md-9 lg-6"} height={40} center row border={"transparent"}>
          <SInput flex type={"text"} customStyle={"calistenia"}
            placeholder={"Buscar por CI, Nombres, Apellidos, Correo o Telefono."}
            style={{ width: "100%", height: "100%", borderRadius: 4, borderColor: "transparent" }}
          // onChangeText={(val) => {
          //   this.state.parametros.cantidad = val;
          //   this.setState({ ...this.state })
          // }}
          />
        </SView>
      </SView >
    </>
  }







  getItem() {

    if (!this.state.data) return <SLoad />
    let _data = this.state.data;

    var usuarios = Model.usuario.Action.getAll();
    if (!usuarios) return <SLoad />

    return Object.values(_data).map(obj => {

      if (obj.veces != this.state.parametros.cantidad) return;
      var usuario = usuarios[obj?.key_usuario];

      return <>
        <SView col={"xs-12"} height={60} center>
          <SView col={"xs-11 md-9 lg-6"} center row border={"#666"} style={{ height: "100%" }}  >

            <View style={{ flexDirection: "row", height: "100%", width: "100%", alignItems: "center" }}>
              <View style={{
                width: 40, height: 40,
                marginRight: 8, justifyContent: "center",
                alignItems: "center",
                backgroundColor: STheme.color.card,
                borderRadius: 100,
                overflow: "hidden"
              }}>
                <SImage src={SSocket.api.root + "usuario/" + usuario?.key + `?date=${new Date().getTime() / 500}`} />
              </View>
              <View row style={{
                flex: 1,
                justifyContent: "center"
              }}>
                <Text style={{ fontSize: 16, color: STheme.color.text }}>{usuario.Nombres + " " + usuario.Nombres} {this.valido_CI(usuario.CI)} {this.valido_Telefono(usuario?.Telefono)} {this.valido_Correo(usuario?.Correo)} {this.valido_veces(obj?.veces)} </Text>
              </View>
            </View>
          </SView>
        </SView>
        <SView col={"xs-12"} height={20} backgroundColor={"transparent"} />
      </>
    })

  }


  render() {


    return (
      <SPage hidden disableScroll>
        <BarraSuperior title={"Ventas"} navigation={this.props.navigation} goBack={() => { SNavigation.goBack(); }} />


        {/* <Buscador placeholder={"Buscar por CI, Nombres, Apellidos, Correo o Telefono."} ref={(ref) => {
          if (!this.state.buscador) this.setState({ buscador: ref });
        }} repaint={() => { this.setState({ ...this.state }) }}
        /> */}



        {this.getParametros()}
        <SHr height={10} />



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
            }} >
            <SView col={"xs-12"} center>
              {this.getItem()}
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
export default connect(initStates)(ClienteHistorial);