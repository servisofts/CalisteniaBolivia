import { Component } from 'react';
import { ActivityIndicator, Animated, View } from 'react-native';
import { connect } from 'react-redux';
import { SDate, SHr, SImage, SMath, SNavigation, SOrdenador, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Model from '../../../../../Model';
import Sucursal from '../../../../Sucursal';
import sucursal_usuario from '../../../../sucursal_usuario';
import MovimientosGraphic from './MovimientosGraphic';
class ListaCajas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sucursal: null
    };
    this.anim = new Animated.Value(0);
    this.key_sucursal = SNavigation.getParam("key_sucursal");
  }
  componentDidMount() {
    this.startAnimated();
  }
  startAnimated() {
    Animated.loop(
      Animated.timing(this.anim, {
        toValue: 1,
        delay: 0,
        duration: 1000,
      }),
      { iterations: 6 },
    ).start();
  }
  getSucursal(key_sucursal) {
    var data = this.props.state.sucursalReducer.data;
    if (!data) {
      if (this.props.state.sucursalReducer.estado == "cargando") {
        return false;
      }
      var object = {
        component: "sucursal",
        type: "getAll",
        estado: "cargando",
        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
      }
      SSocket.send(object);
      return false;
    }
    return data[key_sucursal];
  }
  getUsuarios(key_usuario) {
    return Model.usuario.Action.getByKey(key_usuario) ?? {}
  }
  getMovimientos(key_caja) {
    var reducer = this.props.state["cajaMovimientoReducer"];
    var data = reducer["activas"];
    if (!data) {
      if (reducer.estado == "cargando") return false;
      if (reducer.estado == "error") return false;
      SSocket.send({
        component: "cajaMovimiento",
        type: "getAllActivas",
        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        estado: "cargando"
      });
      return false;
    }
    return reducer["data"][key_caja];
  }
  getLista() {
    var reducer = this.props.state["cajaReducer"];
    var data = reducer["activas"];
    if (!data) {
      if (reducer.estado == "cargando") return false;
      if (reducer.estado == "error") return false;
      SSocket.send({
        component: "caja",
        type: "getActivas",
        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        estado: "cargando"
      });
      return false;
    }
    return reducer["usuario"];
  }
  getFoto(sucursal) {
    return <View style={{
      width: 40,
      height: 40,
      marginRight: 8,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: STheme.color.card,
      borderRadius: 100,
      overflow: "hidden"
    }}>
      <SImage src={SSocket.api.root + "sucursal/" + sucursal.key} />
    </View>
  }

  getMovimientosItem(movimientos) {
    var total = 0;
    return new SOrdenador([{ key: "fecha_on", order: "asc", peso: 1 }]).ordernarObject(movimientos).map((key) => {
      total += movimientos[key].monto;
      return (
        <SView key={key} style={{
          width: 70,
          height: 50,
          backgroundColor: "#f0f",
        }}>
          <SText style={{ textTransform: "capitalize" }}>{total} - </SText>
        </SView>
      )
    })
  }


  setVacio() {
    return (
      <>
        <SHr height={28} />
        <SText color={"red"}>no hay caja abierta</SText>
      </>
    );
  }



  getItems() {
    var lista = this.getLista();
    if (!lista) return <ActivityIndicator color={STheme.color.text} />;
    return Object.keys(lista).map((key) => {
      var obj = lista[key];
      if (!key) return this.setVacio();
      if (!obj) return this.setVacio();
      if (!obj.key_usuario) return this.setVacio();
      // if (!key) return <View />
      // if (!obj) return <View />
      // if (!obj.key_usuario) return <View />
      if (this.state.sucursal) {
        if (obj.key_sucursal != this.state.sucursal.key) {
          return null;
        }

      }
      if (!sucursal_usuario.Actions.isActive(obj.key_sucursal, this.props)) {
        return null;
      }
      var usuario = this.getUsuarios(obj.key_usuario);
      usuario.key = obj.key_usuario;
      var movimientos = this.getMovimientos(obj.key);
      var total = 0;
      if (movimientos) {
        Object.keys(movimientos).map((key) => {
          total += movimientos[key].monto;
        })
      }
      var sucursal = this.getSucursal(obj.key_sucursal);
      if (total % 1 > 0) total = total.toFixed(2);
      return <SView key={key}
        col={"xs-11"}
        style={{
          borderRadius: 4,
          height: 140,
          backgroundColor: STheme.color.card,
          marginTop: 8,
          padding: 4,
        }}>
        <SView animated col={"xs-12"}
          style={{
            backgroundColor: this.anim.interpolate({
              inputRange: [0, 1],
              outputRange: [STheme.color.text + "09", STheme.color.text + "00"],
            }),
          }}
          row onPress={() => {

            SNavigation.navigate("DetalleCaja", { key: obj.key });
          }}>
          {this.getFoto(sucursal)}
          <SView flex>
            {/* tarea5 ✅ ✅ ✅ */}
            <SText style={{ fontSize: 14 }}>{sucursal.descripcion}</SText>
            <SText style={{ textTransform: "uppercase", fontSize: 16, color: "white" }}>{usuario.Nombres} {usuario.Apellidos}</SText>
            <SText style={{ fontSize: 12, color: "white" }}>{new SDate(obj.fecha_on).toString("yyyy-MM-dd hh:mm")}</SText>
          </SView>
          <SView center style={{
            height: 35,
          }}>
            <SText style={{ fontSize: 16, color: "white" }}>Bs. {SMath.formatMoney(total)}</SText>
          </SView>
        </SView>

        <SView col={"xs-12"} style={{
          flex: 1,
        }}>
          <MovimientosGraphic data={movimientos} />
        </SView>

      </SView >
    })
  }
  render() {
    return (
      <SView col={"xs-12"} style={{
        flex: 1,
      }} center>
        <Sucursal.Component.SucursalSelect key_sucursal={this.key_sucursal} sucursal={this.state.sucursal} setSucursal={(suc) => {
          this.setState({ sucursal: suc });
        }} />
        <SScrollView2 disableHorizontal style={{
          width: "100%",
        }}>
          <SView
            col="xs-12"
            center
          >
            {this.getItems()}
          </SView>
          <SView col={"xs-12"} style={{
            height: 200,
          }}>

          </SView>
        </SScrollView2 >
      </SView >
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(ListaCajas);
