import { Component } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SImage, SInput, SLoad, SMath, SNavigation, SOrdenador, SPage, SPopup, SPopupClose, SPopupOpen, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import SCalendar from '../../../../../Components/SCalendar';
import Model from '../../../../../Model';
import { SSRolesPermisosValidate } from '../../../../../SSRolesPermisos';
import Sucursal from '../../../../Sucursal';
import sucursal_usuario from '../../../../sucursal_usuario';
import Paquete_Item from './Paquete_Item';
class PaquetesDeUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    this.getCaja()
  }
  getCaja() {
    var obj = {
      component: "caja",
      type: "getActiva",
      estado: "cargando",
      key_usuario: this.props.state.usuarioReducer.usuarioLog.key
    }
    SSocket.send(obj, true);
    // return null;
  }
  getPaquete(key) {
    let reducer = this.props.state.paqueteReducer;
    let data = reducer.data;
    if (!data) {
      if (reducer.estado == "cargando") return false;
      if (reducer.estado == "error") return false;
      var object = {
        component: "paquete",
        type: "getAll",
        estado: "cargando",
        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
      }
      SSocket.send(object, true);
      return false;
    }
    return data[key];
  }
  getSucursal(key_sucursal) {

    var data = Sucursal.Actions.getAll(this.props);
    if (!data) return <View />
    var obj = data[key_sucursal]
    if (!obj) return <View />
    return <SView>
      <SText color={STheme.color.text}>Sucursal: {obj.descripcion}</SText>
    </SView>
  }
  getUsuario(key_usuario) {
    var data = Model.usuario.Action.getAll();
    if (!data) return <View />
    var obj = data[key_usuario]
    if (!obj) return <View />
    return <SView>
      <SText color={"#666"}>Admin: {obj.Nombres}</SText>
    </SView>
  }
  getEliminar(obj) {
    if (!SSRolesPermisosValidate({ page: "PaqueteVentaPage", permiso: "anular_venta" })) {
      if (!this.caja) {
        return <View />
      }
      if (this.caja.key != obj.key_caja) {
        return <View />
      }
    }
    var reducer = this.props.state.paqueteVentaReducer;
    if (reducer.estado == "error") {
      reducer.estado = "";
      SPopup.alert(reducer.error);
    }
    return <SButtom
      style={{
        width: 30,
        height: 30,
      }}
      props={{
        variant: "confirm",
        type: "danger",
      }}
      onPress={() => {
        // alvaro boton eliminar
        // obj.estado = "3";
        // obj.descripcion = "Anulación de venta de servicioasaasasasasas.";
        var objSen = {
          component: "paqueteVenta",
          type: "eliminar",
          estado: "cargando",
          key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
          data: obj
        }
        // console.log("borro ", objSen);
        SSocket.send(objSen, true);
      }}>
      <SIcon name={"Delete"} style={{
        width: 19,
        height: 19,
      }} />
    </SButtom>
  }

  getCalendaio(i, usuario) {
    if (!usuario) return <View />
    if (!this.state.paquete) return <View />
    return <SView col="xs-10" >
      <SCalendar
        task={this.state.tasks[i]}
        onChange={(date) => {
          this.state.tasks[i] = {
            fecha: date,
            dias: this.state.paquete.dias
          }
          this.setState({ ...this.state })
          // this.state.tasks[i]=;
        }} />
      <SView style={{
        width: "100%",
        height: 100,
      }}></SView>
    </SView>
  }

  popupFecha(obj) {
    // let usuario = Model.usuario.Action.getByKey(obj.key_usuario);


    return <>
      <SView width={362} height={325} center row style={{ borderRadius: 8 }} withoutFeedback backgroundColor={STheme.color.background} style={{ borderColor: "green" }}   >
        <SHr height={20} />

        <SInput ref={ref => this._fechaInicio = ref} col={"xs-11"} type={"date"} defaultValue={obj.fecha_inicio} customStyle={"calistenia"} />
        <SHr height={15} />
        <SText color={"red"}> dsd </SText>
        <SHr height={15} />

        <SButtom type="danger" onPress={() => { SPopup.close("CodigoSeguridad"); }}>Cancelar</SButtom>

        <SButtom type="success" onPress={() => {

          console.log("ostias ", obj)

          var dias = new SDate(obj.fecha_inicio, "yyyy-MM-dd").diff(new SDate(obj.fecha_fin, "yyyy-MM-dd"));

          var fecha_inicio_modificada = this._fechaInicio.getValue();
          //var fecha_fin_modificada = new SDate(fecha_inicio_modificada, "yyyy-MM-dd").addDay(dias - 1);
          var fecha_fin_modificada = new SDate(fecha_inicio_modificada, "yyyy-MM-dd").addDay(30);
          console.log("dias capturados ", fecha_fin_modificada)

          //console.log("inicio ", fecha_inicio_modificada)
          //console.log("fin ", fecha_fin_modificada.toString("yyyy-MM-dd"))
          //console.log("key ", obj.key_paquete_venta_usuario)

          //return;

          // alvaro boton eliminar
          // obj.estado = "3";
          // obj.descripcion = "Anulación de venta de servicioasaasasasasas.";

          var objSen = {
            component: "paqueteVentaUsuario",
            type: "editar",
            estado: "cargando",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            data: {
              key: obj.key_paquete_venta_usuario,
              fecha_inicio: fecha_inicio_modificada,
              fecha_fin: fecha_fin_modificada.toString("yyyy-MM-dd"),
            }
          }
          SSocket.sendPromise(objSen, true).then(response => {
            // Hacer algo con la respuesta exitosa
            console.log("entro")
            SPopup.close("CodigoSeguridad");
          })
            .catch(error => {
              // Manejar el error
              console.log("error ", error)
              SPopup.close("CodigoSeguridad");
            });

        }}>Consolidar</SButtom>

        <SHr height={20} />
      </SView>
    </>
  }

  getEditar(obj) {
    // console.log("muestra ", obj)
    if (!SSRolesPermisosValidate({ page: "PaqueteVentaPage", permiso: "editar_venta" })) {
      if (!this.caja) {
        return <View />
      }
      if (this.caja.key != obj.key_caja) {
        return <View />
      }
    }

    var reducer = this.props.state.paqueteVentaReducer;
    if (reducer.estado == "error") {
      reducer.estado = "";
      SPopup.alert(reducer.error);
    }

    return <SButtom
      style={{
        width: 30,
        height: 30,
      }}
      onPress={() => {
        SPopup.open({ content: this.popupFecha(obj), key: "CodigoSeguridad" });
      }}>
      <SIcon name={"Edit"} style={{
        width: 19,
        height: 19,
      }} />
    </SButtom>
  }
  getLista() {
    var reducer = this.props.state.paqueteVentaReducer;
    var data = reducer.usuario[this.props.key_usuario];
    if (!data) {
      if (reducer.estado == "cargando") return <ActivityIndicator color={STheme.color.text} />
      if (reducer.estado == "error") return <Text>ERROR</Text>
      var object = {
        component: "paqueteVenta",
        type: "getAllByUsuario",
        estado: "cargando",
        key_usuario: this.props.key_usuario
      }
      SSocket.send(object, true);
      return <View />
    }

    return new SOrdenador([
      // { key: "Peso", order: "desc", peso: 4 },
      { key: "fecha_inicio", order: "desc", peso: 1 },
    ]).ordernarObject(
      data
    ).map((key) => {
      var obj = data[key];
      if (!sucursal_usuario.Actions.isActive(obj.key_sucursal, this.props)) {
        return null;
      }
      var paquete = this.getPaquete(obj.key_paquete);
      var urlImagePaquete = SSocket.api.root + "paquete_" + obj.key_paquete + `?date=${new Date().getTime()}`;

      if (!paquete) {
        return <SLoad />
      }
      return <TouchableOpacity style={{
        width: "96%",
        backgroundColor: STheme.color.card,
        height: 100,
        marginBottom: 8,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
      }} onPress={() => {
        console.log(obj);
        SNavigation.navigate("EsperandoVenta", {
          key: key,
          key_paquete_venta_usuario: obj.key_paquete_venta_usuario,
        });
      }}>
        <View style={{
          flex: 1,
          width: "100%",
          flexDirection: "row",
          padding: 4,

        }}>
          <View style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 4,
            overflow: "hidden",
            width: 40,
            height: 40,
            backgroundColor: STheme.color.card
          }}>
            <SImage src={urlImagePaquete} />
            {/* {this.props.state.imageReducer.getImage(urlImagePaquete, {
                            resizeMode: "cover",
                            objectFit: "cover"
                        })} */}
          </View>
          <View style={{
            flex: 4,
            // justifyContent: "center",
            // alignItems: "center"
            paddingStart: 8,
            height: "100%",
          }}>
            <SText color={STheme.color.text + 66} style={{ fontSize: 14 }}>{paquete.descripcion}</SText>
            {this.getSucursal(obj.key_sucursal)}
            {this.getUsuario(obj.key_usuario)}
          </View>
          <View style={{
            flex: 1,
            height: "100%",
            justifyContent: "center",
            // alignItems: "center"
          }}>
            <Text style={{
              color: STheme.color.text,
              fontSize: 14,
            }}>Bs. {SMath.formatMoney(obj.monto)}</Text>
          </View>

          {/* <View style={{
                        flex: 2,
                        justifyContent: "center",
                        // alignItems: "center"
                        paddingStart: 8,
                    }}>
                        <Text style={{

                            fontSize: 10,
                        }}>Desde: {SDateFormat(obj.fecha_inicio)}</Text>
                        <Text style={{

                            fontSize: 10,
                        }}>Hasta: {SDateFormat(obj.fecha_fin)}</Text>
                    </View> */}
          {this.getEditar(obj)}
          {this.getEliminar(obj)}
        </View>
        <Paquete_Item data={obj} paquete={paquete} />
      </TouchableOpacity>
    })
  }
  getBtnAdd = () => {
    return <TouchableOpacity style={{
      width: "96%",
      backgroundColor: STheme.color.card,
      height: 50,
      marginBottom: 8,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      padding: 4,
    }} onPress={() => {
      if (!this.caja) {
        SPopupOpen({
          key: "errorPaquete",
          content: (
            <SView col={"xs-11 md-8"} backgroundColor={STheme.color.background} center style={{ height: 200, borderRadius: 8, }}>
              {SPage.backgroundComponent}
              <SView style={{
                width: "100%",
                height: "100%",
              }} center>
                <SText style={{ fontSize: 16, }}>No tiene una caja abierta.</SText>
                <SText style={{ fontSize: 12, }}>Dirijase a caja y abra una caja para continuar.</SText>
                <SButtom props={{ type: "outline" }} onPress={() => {
                  this.props.navigation.navigate("CajaPage")
                  SPopupClose("errorPaquete");
                }}>Ir a caja</SButtom>
              </SView>
            </SView>
          )
        })
        return;
      }

      this.props.navigation.navigate("PaquetePage", {
        type: "select",
        onSelect: (obj) => {
          SNavigation.goBack();
          this.props.navigation.navigate("", {
            key_usuario: this.props.key_usuario,
            key_paquete: obj.key,
          });
        }
      });
    }}>
      <Text style={{
        color: STheme.color.text,
        textDecorationLine: "underline",
      }}>Nuevo paquete</Text>
    </TouchableOpacity>
  }
  render() {
    this.caja = this.props.state.cajaReducer.usuario[this.props.state.usuarioReducer.usuarioLog.key];
    return (
      <View style={{
        width: "100%",
        alignItems: "center",
        marginTop: 16,
      }}>
        {this.getBtnAdd()}
        {this.getLista()}
      </View>
    );
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(PaquetesDeUsuario);