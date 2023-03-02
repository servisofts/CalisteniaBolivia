import { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { SButtom, SHr, SNavigation, SPage, SPopup, SScrollView2, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Caja from '../..';
import Model from '../../../../Model';
import Cabecera from './Cabecera';
import Movimientos from './Movimientos';
import Perfil from './Perfil';
class DetalleCaja extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
    };
    this.key_caja = SNavigation.getParam("key");
  }

  render() {
    var caja = Caja.Actions.getByKey(this.props, this.key_caja);



    if (!caja) return <ActivityIndicator />
    // console.log(caja.key);
    // console.log(caja.fecha_on);
    // console.log(caja.key_usuario);
    // console.log(caja.key_sucursal);
    return (
      <SPage
        title="Detalle de caja "
        disableScroll
      >

        {/* <SText>{JSON.stringify(caja)}</SText> */}
        <SScrollView2 disableHorizontal>
          <SView col={"xs-12"} center>
            <SView col={"xs-11.8 md-8 xl-6"} center>
              <Perfil key_usuario={caja.key_usuario} />
              <SHr />
              <Cabecera caja={caja} />
            </SView>
            <SHr />
            <SButtom type={"danger"} onPress={() => {
              SNavigation.navigate("ReciboCaja", { key: caja.key })
            }}>{"IMPRIMIR"}</SButtom>
            <SHr />
            <SButtom type={"danger"} onPress={() => {
              SSocket.sendPromise({
                component: "caja",
                type: "reparar",
                key_caja: this.key_caja,
                key_usuario: Model.usuario.Action.getKey()
              }).then(resp => {
                SPopup.alert("Reparado con exito");
                console.log(resp);
              }).catch(e => {
                console.error(e);
              })
              // SNavigation.navigate("ReciboCaja", { key: caja.key })
            }}>{"REPARAR"}</SButtom>

            {/* <ExportExcel
              header={[
                // { key: "key", label: "Nombres", width: 100 },
                { key: "fecha_on", label: "Fecha", width: 100 },
                { key: "Descripcion", label: "Telefono", width: 100 },
                { key: "Usuario", label: "Telefono", width: 100 },
                { key: "Tipo", label: "Telefono", width: 100 },
                { key: "Monto", label: "Telefono", width: 100 },
              ]}
              getDataProcesada={() => {
                var daFinal = {};
                // const ingreso = 0, egreso = 0, traspaso = 0;
                var total = { ingreso: 0, egreso: 0, traspaso: 10 }
                Object.values(caja).map((obj, i) => {
                  var toInsert = {
                    nombres: obj?.Nombres,
                    apellidos: obj?.Apellidos,
                    telefono: obj?.Telefono,
                  }
                  daFinal[i] = toInsert
                })
                return daFinal
              }}
            /> */}

            <Movimientos caja={caja} />
          </SView>

        </SScrollView2>
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(DetalleCaja);
