import { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { ExportExcel, SDate, SHr, SIcon, SImage, SList, SLoad, SMath, SNavigation, SOrdenador, SPage, SPopup, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Banco from '../..';
import BarraSuperior from '../../../../Components/BarraSuperior';
import FechasBetween from '../../../../Components/FechasBetween/index';
import FloatButtom from '../../../../Components/FloatButtom/index';
import Model from '../../../../Model';
import { SSRolesPermisosValidate } from '../../../../SSRolesPermisos';
import BancoItem from '../BancoItem/index';
import CuentaBancoItem from '../CuentaBancoItem';
let component = "cuentaBancoMovimiento";
let ReducerName = "cuentaBancoMovimientoReducer";

class CuentaMovimientosPage extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      monto_total: 0,
    };
    this.key = SNavigation.getParam("key", null);
    this.key_banco = SNavigation.getParam("key_banco", null);



  }
  componentDidMount() {
    this.getAll(true)
  }
  componentWillUnmount() {
    // this.props.state[ReducerName].data= {};
    if (this.props.onBack) this.props.onBack();
  }
  getTraspaso(obj) {
    if (obj.tipo_movimiento != "traspaso") {
      return <View />
    }
    return <> <SView style={{
      width: 34,
    }} center>
      <SView width={30}>
        <SIcon name={"Traspaso"} />
      </SView>
    </SView>
      <SView style={{
        width: 8,
      }} />
    </>
  }




  getAnular(obj) {
    if (!SSRolesPermisosValidate({ page: "BancoPage", permiso: "eliminar_movimiento" })) {
      if (!this.caja) {
        return <View />
      }
      if (this.caja.key != obj.key_caja) {
        return <View />
      }
    }
    return <SView style={{
      width: 40,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
    }} onPress={() => {
      SPopup.confirm({
        title: "¿Está seguro de anular el movimiento?",
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
    }} >
      <SIcon name={"Delete"} width={30} />
    </SView>
  }


  getAll = (force) => {
    if (!this.state.fecha_inicio || !this.state.fecha_fin) {
      return <SLoad />
    }
    var fecha_i = new SDate(this.state.fecha_inicio, "yyyy-MM-dd");
    var fecha_f = new SDate(this.state.fecha_fin, "yyyy-MM-dd");
    var reducer = this.props.state[ReducerName];
    if (reducer.data[this.key]) {
      if (reducer.fecha_i != this.state.fecha_inicio || reducer.fecha_f != this.state.fecha_fin || force) {
        reducer.data[this.key] = null;
      }
    }

    if (!reducer.data[this.key] || force) {
      if (reducer.estado == "cargando" && !force) {
        return <SLoad />;
      }
      reducer.fecha_i = this.state.fecha_inicio;
      reducer.fecha_f = this.state.fecha_fin;

      SSocket.send({
        component: component,
        type: "getAllByKeyCuentaBanco",
        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        key_cuenta_banco: this.key,
        estado: "cargando"
      });
      return <SLoad />
    }

    var objFinal = {};

    var data = reducer.data[this.key];
    var monto_total = 0;
    var usuarios = Model.usuario.Action.getAll();
    if (!usuarios) return <SLoad />
    var CONTAINER = new SOrdenador([
      { key: "fecha_on", order: "desc", peso: 1 }
    ]).ordernarObject(data).map((key) => {

      var obj = data[key];

      if (obj.estado == 0) return;
      var monto = obj.monto;
      if (obj.monto == 0) {
        return <View />
      }
      if (monto) {
        if (monto % 1 != 0) monto = parseFloat(monto).toFixed(2);
      }
      var sdate = new SDate(obj.fecha_on)
      if ((!sdate.equalDay(fecha_i) && !sdate.equalDay(fecha_f)) && (sdate.isBefore(fecha_i) || sdate.isAfter(fecha_f))) {
        return <View />
      }
      monto_total += parseFloat(monto);
      var usuario = usuarios[obj.key_usuario];


      objFinal[key] = {

        usuario_nombre: usuario.Nombres + " " + usuario.Apellidos,
        fecha_chaval: new SDate(obj.fecha_on).toString("MONTH, dd  - hh:mm"),
        ...obj
      };


      // objFinal[key] = { usuario_nombre: usuario.Nombres + " " + usuario.Apellidos, obj };

      // objFinal = obj;
      // console.log("ajajaj ", obj);
      this.finalData = objFinal;

      // return (
      //   <>
      //     <SView col={"xs-12"} key={obj.key} style={{
      //       borderRadius: 4,
      //       backgroundColor: STheme.color.card,
      //     }} row center>
      //       <SView style={{
      //         width: 50,
      //         height: 60,
      //       }} center >
      //         <SView style={{
      //           width: 40,
      //           height: 40,
      //           borderRadius: 8,
      //           overflow: "hidden",
      //         }}>
      //           <SImage src={SSocket.api.root + "usuario/" + obj.key_usuario} />
      //         </SView>
      //       </SView>
      //       <SView style={{
      //         flex: 1,
      //         height: "100%",
      //         padding: 4,
      //       }}
      //         props={{ direction: "row" }}
      //       >
      //         <SView col={"xs-12"} height>
      //           <Text style={{ color: STheme.color.lightGray, fontSize: 12 }}>{new SDate(obj.fecha_on).toString("MONTH, dd  - hh:mm")}</Text>
      //           <SView flex center>
      //             <Text style={{ color: STheme.color.text, fontSize: 16 }}>{obj.descripcion}</Text>
      //           </SView>
      //           <Text style={{ color: STheme.color.lightGray, fontSize: 12 }}>{`${usuario["Nombres"]} ${usuario["Apellidos"]}`}</Text>
      //         </SView>

      //       </SView>
      //       {this.getTraspaso(obj)}
      //       <SView style={{
      //         width: 38,
      //       }} center>
      //         <SView width={34}> <SIcon name={(obj.monto >= 0 ? "Ingreso" : "Egreso")} /></SView>
      //       </SView>
      //       {/* Banca Lista Detalle (Movimientos de cuenta) */}
      //       <View style={{ width: 110, height: 50, justifyContent: "center", alignItems: "center" }} >
      //         <Text style={{ color: STheme.color.text, fontSize: 16, }}>Bs. {SMath.formatMoney(monto)}</Text>
      //       </View>
      //       {this.getAnular(obj)}
      //     </SView>
      //     <SHr />
      //     <SHr />
      //   </>
      // );

    })

    if (monto_total != this.state.monto_total) {
      this.state.monto_total = monto_total;
      this.setState({ monto_total: monto_total });
    }

    if (!this.finalData) {
      return <SText style={{ color: "red", fontSize: 12 }}>No hay datos disponibles para las fechas indicadas</SText>
    }

    return <SList
      // buscador
      limit={8}
      order={[{ key: "fecha_on", order: "desc", peso: 1 }]}
      data={data}
      render={(obj) => {


        // var obj = data[key];

        if (obj.estado == 0) return;
        var monto = obj.monto;
        if (obj.monto == 0) {
          return <View />
        }
        if (monto) {
          if (monto % 1 != 0) monto = parseFloat(monto).toFixed(2);
        }
        var sdate = new SDate(obj.fecha_on)
        if ((!sdate.equalDay(fecha_i) && !sdate.equalDay(fecha_f)) && (sdate.isBefore(fecha_i) || sdate.isAfter(fecha_f))) {
          return <View />
        }
        monto_total += parseFloat(monto);
        var usuario = usuarios[obj.key_usuario];

        return <SView col={"xs-12"} style={{
          borderRadius: 4,
          backgroundColor: STheme.color.card,
        }} row center>
          <SView style={{
            width: 50,
            height: 60,
          }} center >
            <SView style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              overflow: "hidden",
            }}>
              <SImage src={SSocket.api.root + "usuario/" + obj.key_usuario} />
            </SView>
          </SView>
          <SView style={{ flex: 1, height: "100%", padding: 4 }} props={{ direction: "row" }} >
            <SView col={"xs-12"} height>
              <SText style={{ color: STheme.color.lightGray, fontSize: 12 }}>
                {new SDate(obj.fecha_on).toString("MONTH, dd  - hh:mm")}
              </SText>
              <SView flex center>
                <SText style={{ color: STheme.color.text, fontSize: 16 }}>
                  {obj.descripcion}
                </SText>
              </SView>
              <SText style={{ color: STheme.color.lightGray, fontSize: 12 }}>
                {`${usuario.Nombres} ${usuario.Apellidos}`}
              </SText>
            </SView>
          </SView>
          {this.getTraspaso(obj)}
          <SView style={{ width: 38 }} center>
            <SView width={34}> <SIcon name={(obj.monto >= 0 ? "Ingreso" : "Egreso")} /></SView>
          </SView>
          <View style={{ width: 110, height: 50, justifyContent: "center", alignItems: "center" }} >
            <SText style={{ color: STheme.color.text, fontSize: 16, }}>Bs. {SMath.formatMoney(monto)}</SText>
          </View>
          {this.getAnular(obj)}
        </SView>
      }}
    />
    return CONTAINER;


  }
  getBilletera = () => {
    return <SView col={"xs-11.6"} height={50} center card onPress={() => {
      SNavigation.navigate("billetera", { key_banco: this.key_banco, key_cuenta_banco: this.key });
    }}>
      <SView row col={"xs-12"} center>
        <SText fontSize={18} bold color={STheme.color.lightGray}>Billetera</SText>
        <SView width={16} />
        <SIcon name={"Billetera"} width={26} />

      </SView>
    </SView>
  }
  render() {

    if (this.key) {
      this.data = Banco.Actions.getAllCuentaBancos(this.props);
    } else {
      this.data = {};
    }
    if (!this.data) return <SLoad />
    return (
      <SPage
        hidden
        disableScroll
        title={"Movimientos de cuenta"}>
        <BarraSuperior
          title={"Movimientos de cuenta"}
          goBack={() => {
            SNavigation.goBack();
          }} />
        <SScrollView2 disableHorizontal style={{
          width: "100%",
          height: "100%",
        }}>
          <SView col={"xs-12"} center >
            <BancoItem key_banco={this.key_banco} />


            <SView col={"xs-11 md-7 xl-6"} center>
              <SView col={"xs-12"} row center>
                <SView col={"xs-12 md-8"} center style={{ backgroundColor: "transparent" }}>
                  <SHr />
                  <CuentaBancoItem key_banco={this.key_banco} key_cuenta_banco={this.key} />
                </SView>
                <SView col={"xs-12 md-4"} center>
                  <SHr />
                  {this.getBilletera()}
                </SView>
              </SView>
              <SHr height={50} />
              <SView col={"xs-12"} height={50} center>
                <FechasBetween fecha_inicio={new SDate().setDay(1).toString("yyyy-MM-dd")} onChange={(fi, ff) => {
                  this.setState({
                    fecha_inicio: fi,
                    fecha_fin: ff
                  })
                }} />
                {/* Banca Lista Detalle (Movimientos de cuenta) */}

                <SHr height={10} />
                <SView col={"xs-12"} center>

                  {/* tarea10 ✅ ✅ ✅ */}
                  <ExportExcel
                    header={[
                      { key: "usuario_nombre", label: "Usuario", width: 120 },
                      { key: "fecha_chaval", label: "Fecha", width: 120, center: true },
                      // { key: "fecha_on", label: "Fecha", width: 100, center: true, render: (item) => { return new SDate(item).toString("hh:mm:ss") } },
                      { key: "descripcion", label: "Descripción Motivo", width: 550 },
                      // { key: "tipo_movimiento", label: "Transacción", width: 100 },
                      { key: "ingreso", label: "Ingreso", width: 60 },
                      { key: "egreso", label: "Egreso", width: 60 },
                      { key: "traspaso", label: "Traspaso", width: 60 },
                      // { key: "monto", label: "Monto", width: 80 },
                    ]}
                    getDataProcesada={() => {
                      var daFinal = {};
                      // console.log("chaval ", this.finalData);


                      // const ingreso = 0, egreso = 0, traspaso = 0;
                      var total = { ingreso: 0, egreso: 0, traspaso: 10 }
                      Object.values(this.finalData).map((obj, i) => {

                        if (obj?.tipo_movimiento == "ingreso") {
                          total.ingreso += obj?.monto;
                        } else {
                          total.ingreso = 0;
                        }

                        if (obj?.tipo_movimiento == "egreso") {
                          total.egreso += obj?.monto;
                        } else {
                          total.egreso = 0;
                        }
                        if (obj?.tipo_movimiento == "traspaso") {
                          total.traspaso += obj?.monto;
                        } else {
                          total.traspaso = 0;
                        }

                        var toInsert = {
                          // key: obj.key,
                          fecha_on: obj?.fecha_on,
                          fecha_chaval: obj?.fecha_chaval,
                          usuario_nombre: obj?.usuario_nombre,
                          descripcion: obj?.descripcion,
                          // tipo_movimiento: obj?.tipo_movimiento,
                          ingreso: total.ingreso,
                          egreso: total.egreso,
                          traspaso: total.traspaso,
                          // monto: obj?.monto,
                        }
                        daFinal[i] = toInsert
                      })
                      // console.log("mirar ", daFinal)
                      return daFinal
                    }}
                  />
                </SView>


              </SView>
              <SView col={"xs-12"} style={{ height: 36, }} center row>
                <SView flex height style={{
                  justifyContent: "center",
                }}>
                  <SText>Movimientos</SText>
                </SView>
                <SView center height>
                  <SText>Bs. {SMath.formatMoney(this.state.monto_total.toFixed(2))}</SText>
                </SView>
              </SView>
              {this.getAll()}

            </SView>
          </SView>
        </SScrollView2>
        <FloatButtom label={"+"} onPress={() => {
          this.props.navigation.navigate("CuentaBancoMovimientoRegistroPage", {
            key_banco: this.key_banco,
            key_cuenta_banco: this.key,
          });
        }} />
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(CuentaMovimientosPage);
