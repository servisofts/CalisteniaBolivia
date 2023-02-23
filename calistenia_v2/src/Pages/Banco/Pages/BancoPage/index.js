import { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { SIcon, SNavigation, SPage, SPopup, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import BarraSuperior from '../../../../Components/BarraSuperior';
import FloatButtom from '../../../../Components/FloatButtom/index';
import FotoPerfilComponent from '../../../../Components/FotoPerfilComponent';
import { SSRolesPermisosValidate } from '../../../../SSRolesPermisos';
import CuentasLista from './CuentasLista';
let component = "banco";

class BancoPage extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getAnular(obj) {
    // if(obj.key)

    if (!SSRolesPermisosValidate({ page: "BancoPage", permiso: "eliminar" })) {
      if (!this.caja) {
        return <View />
      }
      if (this.caja.key != obj.key_caja) {
        return <View />
      }
    }
    {/* Banca Lista Detalle (Movimientos de cuenta) se agrego el boton eliminar */ }

    return <SView center style={{
      width: 80,
      // height: 50,
      // justifyContent: "center",
      // alignItems: "center",
      // paddingRight: 4

    }}
      onPress={() => {
        SPopup.confirm({
          title: "¿Está seguro de anular el banco?",
          message: `${obj.descripcion}`,
          onPress: () => {
            var data = {
              ...obj,
              estado: 0,
            }
            delete data["data"];
            SSocket.send({
              component: component,
              type: "editar",
              key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
              key_cuenta_banco: this.key,
              data: data,
              estado: "cargando"
            });
          }
        });
      }}
    >
      <SIcon name={"Delete"} width={28} />
    </SView >
  }

  getAllBancos = () => {
    var reducer = this.props.state.bancoReducer;
    if (!reducer.data) {
      if (reducer.estado == "cargando") {
        return <Text>Cargando</Text>;
      }
      SSocket.send({
        component: component,
        type: "getAll",
        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        estado: "cargando"
      })
      return <View />
    }

    var data = reducer.data;
    return Object.keys(data).map((key) => {
      var obj = data[key];

      // aqui preguntar el taño de lista de cada banco

      return (
        <SView col={"xs-12"}>
          <SView col={"xs-12"} key={obj.key} style={{
            borderRadius: 4,
            backgroundColor: STheme.color.card,
          }} onPress={() => { this.props.navigation.navigate("BancoRegistroPage", { key: obj.key }); }} row>
            <SView col={"xs-12"} row center>

              <SView style={{ width: 80, height: 60 }} center>
                {/* Banca Lista (BancoPage) */}
                <SView style={{ width: 45, height: 45, overflow: "hidden" }}>
                  <FotoPerfilComponent data={obj} component={component} style={{ width: "100%", height: "100%", }} />
                </SView>
              </SView>

              <SView style={{ flex: 1, backgroundColor: "transparent", }}>
                <SText style={{ fontSize: 16 }} >{obj.descripcion}</SText>
              </SView>

              {this.getAnular(obj)}

            </SView>


          </SView>
          <SView col={"xs-12"} style={{
          }}>
            {/* aqui se ven las cuentas */}
            <CuentasLista data={obj} navigation={this.props.navigation} />
          </SView>
          <SView height={32} />
        </SView>
      );
    })

  }
  getAllMovimientosCuenta(force) {
    if (!this.props.state.cuentaBancoMovimientoReducer.data || force) {
      if (this.props.state.cuentaBancoMovimientoReducer.estado == "cargando" && !force) return;
      SSocket.send({
        component: "cuentaBancoMovimiento",
        type: "getAll",
        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        estado: "cargando"
      })
      return;
    }
    return;
  }
  render() {
    this.getAllMovimientosCuenta();
    return (
      <SPage
        hidden
        disableScroll
      >
        <BarraSuperior
          goBack={() => {
            SNavigation.goBack();
          }}
          title={"Bancos"} />
        <SScrollView2 disableHorizontal style={{ width: "100%", }}>
          <SView col={"xs-12"} center>

            {/* <SText color="white" >sasa</SText> */}
            <SView col={"xs-11 md-7 xl-6"} center>
              {/* <FechasBetween onChange={(fecha_incio, fecha_fin) => {
                                this.state.fecha_incio = fecha_incio;
                                this.state.fecha_fin = fecha_fin;
                                this.getAllMovimientosCuenta(true);
                            }} /> */}
              {this.getAllBancos()}
            </SView>
          </SView>
        </SScrollView2>
        <FloatButtom label={"+"} onPress={() => {
          this.props.navigation.navigate("BancoRegistroPage");
        }} />
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(BancoPage);
