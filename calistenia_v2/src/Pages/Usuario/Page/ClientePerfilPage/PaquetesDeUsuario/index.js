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
      parametros: {
        "inicio": new SDate(),
        "fin": new SDate(),
        "dias": 0,
      },
      ...this.state,
    };

    this._ref = {};

  }
  componentDidMount() {
    this.getCaja();
    this.getLista();
  }

  calcular(key) {
    var inputs = this.state.inputs;
    if (key == "cantidad_meses" || key == "fecha_inicio") {
      if (inputs["fecha_inicio"].value) {
        var fecha_inicio = new SDate(inputs["fecha_inicio"].value);
        if (inputs["cantidad_meses"].value) {
          fecha_inicio.addMonth(parseInt(inputs["cantidad_meses"].value));
          inputs["fecha_fin"].value = fecha_inicio.toString("yyyy-MM-dd");
        } else {
          inputs["fecha_fin"].value = fecha_inicio.toString("yyyy-MM-dd");
        }
      }
    } else {
      if (inputs["fecha_inicio"].value && inputs["fecha_fin"].value) {
        var cantodad_meses = new SDate(inputs["fecha_inicio"].value).diff(new SDate(inputs["fecha_fin"].value));
        inputs["cantidad_meses"].value = parseInt(Math.round(cantodad_meses / 30));
      }
    }

    this.setState({ inputs: { ...this.state.inputs } });
  }

  getInputs() {
    if (this.key) {
      var data = Parent.Actions.getByKey(this.key, this.props);
      if (!data) return <SLoad />
      this.data = data;
      if (!this.state.isLoad) {
        this.state.inputs.cantidad_acciones.value = data.cantidad_acciones;
        this.state.inputs.precio_accion.value = data.precio_accion;
        this.state.inputs.monto_maximo.value = data.monto_maximo;
        this.state.inputs.fecha_inicio.value = new SDate(data.fecha_inicio).toString("yyyy-MM-dd");
        this.state.inputs.fecha_fin.value = new SDate(data.fecha_fin).toString("yyyy-MM-dd");
        this.state.inputs.cantidad_meses.value = data.cantidad_meses;
        this.state.inputs.observacion.value = data.observacion;
        this.state.inputs.descripcion.value = data.descripcion;
        this.setState({ isLoad: true });
      }
    }
    return Object.keys(this.state.inputs).map((key) => {
      var obj = this.state.inputs[key];
      return <SView col={obj.col ?? "xs-6"} center>
        <SInput ref={(r) => this._ref[key] = r} customStyle={"calistenia"} col={"xs-11"} {...obj} onChangeText={(val) => {
          this.state.inputs[key].value = val;
          this.setState({ inputs: { ...this.state.inputs } });
          this.calcular(key);
        }} />
      </SView>
    })
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
      <SText color={"#666"}>Sucursal: {obj.descripcion}</SText>
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

  calculadorAlvaro(inicio, dias) {
    this.state.parametros.inicio = inicio;
    this.state.parametros.dias = dias;
    this.state.parametros.fin = new SDate(inicio, "yyyy-MM-dd").addDay(parseInt(dias)).toString("yyyy-MM-dd");
    this.setState({ ...this.state })
    console.log("inicio " + this.state.parametros.inicio);
    console.log("dias " + this.state.parametros.dias);
    console.log("fin " + this.state.parametros.fin);
  }
  popupFecha(obj) {
    let usuario = Model.usuario.Action.getByKey(obj.key_usuario);

    var mes_inicio = new SDate(obj.fecha_inicio);
    var mes_fin = new SDate(obj.fecha_fin);
    var cantodad_dias = new SDate(obj.fecha_inicio).diff(new SDate(obj.fecha_fin));
    this.calculadorAlvaro(obj.fecha_inicio, cantodad_dias);
    return <>
      <SView width={362} height={325} center row style={{ borderRadius: 8 }} withoutFeedback backgroundColor={STheme.color.background} style={{ borderColor: "green" }}   >
        <SHr height={20} />
        <SInput ref={ref => this._fechaInicio = ref} col={"xs-10"} type={"date"} defaultValue={obj.fecha_inicio} customStyle={"calistenia"}
          onChangeText={(val) => {
            if (this.state.parametros.inicio != val) {
              this.state.parametros.inicio = val;
              this.calculadorAlvaro(val, this.state.parametros.dias);
            }
          }}
        />

        <SInput ref={ref => this._diasObtenidos = ref} placeholder={"Ingresar cantidad dias"} col={"xs-3"} defaultValue={cantodad_dias} customStyle={"calistenia"}
          onChangeText={(val) => {
            if (val == false) return;
            if (this.state.parametros.dias != val) {
              this.state.parametros.dias = val;
              this.calculadorAlvaro(this.state.parametros.inicio, val);
            }
          }}
        />

        {/* placeholder={this.props.placeholder ? this.props.placeholder : "Buscar..."}  */}

        <SInput placeholder={"Ingresar fecha fin"} col={"xs-6"} type={"date"} defaultValue={this.state.parametros.fin} customStyle={"calistenia"} disabled />

        {/* <SHr height={15} /> */}
        <SText col={"xs-9"} color={STheme.color.text + 66} center>¿Está seguro de que desea cambiar la fecha del paquete?</SText>
        {/* <SHr height={15} /> */}

        <SButtom type="danger" onPress={() => { SPopup.close("CodigoSeguridad"); }}>Cancelar</SButtom>
        <SView width={30} ></SView>

        <SView width={30} ></SView>
        <SButtom type="success" onPress={() => {

          var aux = this._diasObtenidos.getValue();
          // var dias = new SDate(obj.fecha_inicio, "yyyy-MM-dd").diff(new SDate(obj.fecha_fin, "yyyy-MM-dd"));
          var fecha_inicio_modificada = this._fechaInicio.getValue();
          var fecha_fin_modificada = new SDate(fecha_inicio_modificada, "yyyy-MM-dd").addDay(parseInt(aux)).toString("yyyy-MM-dd");




          let reducer = this.props.state.paqueteVentaReducer;
          let data = reducer.data;
          if (!data) {
            if (reducer.estado == "cargando") return false;
            if (reducer.estado == "error") return false;

            var objSen = {
              component: "paqueteVentaUsuario",
              type: "editar",
              estado: "cargando",
              key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
              data: {
                key: obj.key_paquete_venta_usuario,
                fecha_inicio: fecha_inicio_modificada,
                fecha_fin: fecha_fin_modificada,
                // fecha_fin: fecha_fin_modificada.toString("yyyy-MM-dd"),
              }
            }

            // ricky
            SSocket.sendPromise(objSen).then((resp) => {

              console.log("moustfa ", resp.estado)
              if (resp.estado == "exito") {
                // this.props.dispatch(resp);
                this.getCaja();
                this.getPaquete();
                this.getLista();
                SPopup.close("CodigoSeguridad");
                this.getLista();

                //     resolve(resp)
                //     return;
              }
              // }).catch((e) => {

            })
            // this.props.dispatch(this.props.state.paqueteVentaReducer);
            // return false;
          }
          this.getLista()
          //   .then(response => {
          //   // Hacer algo con la respuesta exitosa
          //   console.log("entro ", objSen)
          //   SPopup.close("CodigoSeguridad");
          //   // alert("dd")
          // })
          //   .catch(error => {
          //     // Manejar el error
          //     console.log("erroraaaa ", error)
          //     SPopup.close("CodigoSeguridad");
          //   });

        }}>Confirmar</SButtom>

        <SHr height={20} />
      </SView >
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
      style={{ width: 30, height: 30 }}
      onPress={() => { SPopup.open({ content: this.popupFecha(obj), key: "CodigoSeguridad" }); }}>
      <SIcon name={"Edit"} style={{ width: 30, height: 30 }} />
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

    let contador = 0;

    return new SOrdenador([
      // { key: "Peso", order: "desc", peso: 4 },
      { key: "fecha_inicio", order: "desc", peso: 1 },
    ]).ordernarObject(
      data
    ).map((key) => {
      contador++;
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
        borderColor: (contador <= this.state?.veces ? "cyan" : "transparent"),
        borderWidth: 1.5,

      }} onPress={() => {
        console.log(obj);
        SNavigation.navigate("EsperandoVenta", {
          key: key,
          key_paquete_venta_usuario: obj.key_paquete_venta_usuario,
        });
      }}>
        <SView style={{
          // < SView border={contador <= this.state.veces ? "red" : "blue"} style={{
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
            <Text style={{
              fontSize: 14,
            }}>{paquete.descripcion}</Text>
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


          {this.getEditar(obj)}
          <SView width={10} ></SView>

          {this.getEliminar(obj)}
        </SView >
        <Paquete_Item data={obj} paquete={paquete} />
      </TouchableOpacity >

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
          this.props.navigation.navigate("ClientePaqueteRegistroPage", {
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