import { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { SNavigation, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import BarraSuperior from '../../../../Components/BarraSuperior';
import FloatButtom from '../../../../Components/FloatButtom/index';
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
      return (
        <SView col={"xs-12"}>
          <SView col={"xs-12"} key={obj.key} style={{
            borderRadius: 4,
            backgroundColor: STheme.color.card,
          }} onPress={() => {
            this.props.navigation.navigate("BancoRegistroPage", { key: obj.key });
          }} row>
            <SView col={"xs-12"} row style={{
              height: 60,
            }}>
              <SView style={{
                width: 60,
                height: 60,
              }} center>
                <SView style={{
                  width: 45,
                  height: 45,
                  borderRadius: 8,
                  overflow: "hidden"
                }}>

                  {/* <FotoPerfilComponent data={this.data} component={component} style={{
                    width: 150,
                    height: 150,
                  }} /> */}

                  <SImage src={SSocket.api.root + component + "_" + obj.key} />
                  {/* <SImage src={Model.sucursal._get_image_download_path(SSocket.api, obj.key)} /> */}

                </SView>

              </SView>
              <SView style={{
                height: "100%",
                flex: 1,
                justifyContent: "center",
              }}>
                <SText style={{
                  fontSize: 16,
                }} >{obj.descripcion}</SText>
              </SView>
              <SView style={{
                width: 60,
                height: 60,
              }} center>
                {/* <SIcon name={"Ed"}/> */}
                {/* <Svg name={"EditarOutline"} style={{
                                    width: 25,
                                    height: 25,
                                }} /> */}
              </SView>
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
