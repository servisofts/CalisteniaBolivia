import { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SList, SLoad, SMath, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Model from '../../../../../Model';
import fondo_inversion_usuario from '../../fondo_inversion_usuario';

const data_test = [
  {
    "9adb524f-d57a-425a-9c85-35a5e451d0f1": {
      "descripcion": "Sucursal Industrial",
      "monto_maximo": 807361,
      "cantidad_acciones": 116,
      "estado": 1,
      "key_usuario": null,
      "fecha_inicio": "2022-09-15T00:00:01",
      "cantidad_meses": 60,
      "cantidad_paquetes": 230,
      "fecha_on": "2022-09-14T14:54:21.000323",
      "fecha_fin": "2027-09-14T00:00:01",
      "precio_accion": 6960,
      "key": "010110c7-6580-4184-988c-f75fc2e86ac1",
      "observacion": "Av. Industrial 6to anillo"
    }
  },
  {
    "9adb524f-d57a-425a-9c85-35a5e451d0f1": {
      "descripcion": "Sucursal Berea",
      "monto_maximo": 807361,
      "cantidad_acciones": 116,
      "estado": 1,
      "key_usuario": null,
      "fecha_inicio": "2022-09-15T00:00:01",
      "cantidad_meses": 60,
      "cantidad_paquetes": 120,
      "fecha_on": "2022-09-14T14:54:21.000323",
      "fecha_fin": "2027-09-14T00:00:01",
      "precio_accion": 6960,
      "key": "010110c7-6580-4184-988c-f75fc2e86ac1",
      "observacion": "Av. Berea 6to anillo"
    }
  },
  {
    "9adb524f-d57a-425a-9c85-35a5e451d0f1": {
      "descripcion": "Sucursal Chonta",
      "monto_maximo": 807361,
      "cantidad_acciones": 116,
      "estado": 1,
      "key_usuario": null,
      "fecha_inicio": "2022-09-15T00:00:01",
      "cantidad_meses": 60,
      "cantidad_paquetes": 200,
      "fecha_on": "2022-09-14T14:54:21.000323",
      "fecha_fin": "2027-09-14T00:00:01",
      "precio_accion": 6960,
      "key": "010110c7-6580-4184-988c-f75fc2e86ac1",
      "observacion": "Av. Chonta 6to anillo"
    }
  },
  {
    "9adb524f-d57a-425a-9c85-35a5e451d0f1": {
      "descripcion": "Sucursal Cristo",
      "monto_maximo": 807361,
      "cantidad_acciones": 116,
      "estado": 1,
      "key_usuario": null,
      "fecha_inicio": "2022-09-15T00:00:01",
      "cantidad_meses": 60,
      "cantidad_paquetes": 500,
      "fecha_on": "2022-09-14T14:54:21.000323",
      "fecha_fin": "2027-09-14T00:00:01",
      "precio_accion": 6960,
      "key": "010110c7-6580-4184-988c-f75fc2e86ac1",
      "observacion": "Av. Cristo 6to anillo"
    }
  },
  {
    "9adb524f-d57a-425a-9c85-35a5e451d0f1": {
      "descripcion": "Sucursal Cusis",
      "monto_maximo": 807361,
      "cantidad_acciones": 116,
      "estado": 1,
      "key_usuario": null,
      "fecha_inicio": "2022-09-15T00:00:01",
      "cantidad_meses": 60,
      "cantidad_paquetes": 350,
      "fecha_on": "2022-09-14T14:54:21.000323",
      "fecha_fin": "2027-09-14T00:00:01",
      "precio_accion": 6960,
      "key": "010110c7-6580-4184-988c-f75fc2e86ac1",
      "observacion": "Av. Cusis 6to anillo"
    }
  }
];
const socios = 0;

class lista extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Reporte Name",
      func: "get_ventas_por_sucursal_all_",
      params: null,
      // socios: 0,

    };

  }


  ItemDetalle(key_inversion, precio_accion, cantidad_paquetes, datafiltrada) {

    // var datax = fondo_inversion_usuario.Actions.getAll(this.props);
    // if (!datax) return <SLoad />
    var usuarios = Model.usuario.Action.getAll();
    if (!usuarios) return <SLoad />

    // console.log("la cantidad ", datax.length())
    // socios = datafiltrada.length;
    // this.setState({ socios: Object.keys(datax).length })
    // let datafiltrada = Object.values(datax).filter(a => a.key_fondo_inversion == key_inversion)


    return datafiltrada.map(obj => {


      var _accion = SMath.formatMoney((obj.inversion / precio_accion), 0);
      var _ganancia = SMath.formatMoney((_accion * cantidad_paquetes) * obj.comision, 0)


      return <SView col={"xs-12"} backgroundColor={"cyan+66"}>


        <SView col={"xs-12"} backgroundColor={"cyan+66"} row>
          <SView col={"xs-6.5"} backgroundColor={"transparent"} row>
            <SText col={"xs-12"} fontSize={10}>{usuarios[obj.key_usuario_inversionista].Nombres + " " + usuarios[obj.key_usuario_inversionista].Apellidos}</SText>
          </SView>
          <SView col={"xs-1"} row center style={{ justifyContent: "flex-start", }} border={"transparent"}>
            <SText fontSize={10}>{_accion}</SText>
          </SView>
          <SView col={"xs-1.5"} row center style={{ justifyContent: "flex-start", }} border={"transparent"}>
            <SText fontSize={10}>{SMath.formatMoney(cantidad_paquetes, 0)}</SText>
          </SView>
          <SView col={"xs-1"} row center border={"transparent"}>
            <SText fontSize={10}>x{SMath.formatMoney(obj.comision, 0)} Bs</SText>
          </SView>
          <SView col={"xs-2"} row center style={{ justifyContent: "flex-end", }} border={"transparent"}>
            <SText fontSize={10}>{_ganancia} Bs</SText>
          </SView>

        </SView>
        <SHr height={2} color={STheme.color.card} />

      </SView>
    })
  }
  Item(obj) {
    // console.log("bolivia ", obj);

    var datax = fondo_inversion_usuario.Actions.getAll(this.props);
    if (!datax) return <SLoad />
    // var usuarios = Model.usuario.Action.getAll();
    // if (!usuarios) return <SLoad />

    let datafiltrada = Object.values(datax).filter(a => a.key_fondo_inversion == obj.inversion_key);

    return <SView col={"xs-12 md-6 xl-3"} border={"transparent"} height={400} style={{ padding: 4 }} center>

      <SView center col={"xs-12"} height card style={{ borderWidth: 1.5, borderRadius: 4 }} >

        <SView center col={"xs-12"} height={65} center backgroundColor={"green+66"}>
          <SText center fontSize={14} bold>{obj?.descripcion}</SText>
          <SHr height={8} />
          <SText center fontSize={12}>{obj?.observacion}</SText>
          <SHr height={8} />
          <SText center fontSize={12}>Fecha {obj?.fecha_inicio + " - " + obj?.fecha_fin}</SText>
          {/* <SText center fontSize={12}>{obj?.sucursal_nombre}</SText> */}
          {/* <SText center fontSize={12}>{obj?.sucursal_direccion}</SText> */}
        </SView>

        <SView center col={"xs-12"} row backgroundColor={"cyan+66"}>
          <SView col={"xs-12"} height={80} card row center>
            <SView col={"xs-3"} height center>
              <SView center border={STheme.color.card} style={{ width: 80, height: 30, borderRadius: 4, backgroundColor: "transparent" }}>
                <SText fontSize={14} bold>{SMath.formatMoney(obj?.monto_maximo)}</SText>
              </SView>
              <SHr height={2} />
              <SText center fontSize={10}>Monto maximo</SText>
            </SView>
            <SView col={"xs-3"} height center>
              <SView center border={STheme.color.card} style={{ width: 80, height: 30, borderRadius: 4, backgroundColor: "transparent" }}>
                <SText fontSize={14} bold>{obj?.meses_accion}</SText>
              </SView>
              <SHr height={2} />
              <SText center fontSize={10}>Duración/meses</SText>
            </SView>
            <SView col={"xs-3"} height center>
              <SView center border={STheme.color.card} style={{ width: 80, height: 30, borderRadius: 4, backgroundColor: "transparent" }}>

                <SText fontSize={14} bold>{obj?.cantidad_accion}</SText>
              </SView>
              <SHr height={2} />
              <SText center fontSize={10}>Acciones</SText>
            </SView>
            <SView col={"xs-3"} height center>
              <SView center border={STheme.color.card} style={{ width: 80, height: 30, borderRadius: 4, backgroundColor: "transparent" }}>
                <SText fontSize={14} bold>{obj?.ventas_paquetes}</SText>
              </SView>
              <SHr height={2} />
              <SText center fontSize={10}>Ventas/Paquetes</SText>
            </SView>
          </SView>
        </SView>
        <SHr height={24} />

        <SView col={"xs-11.8"} backgroundColor={"cyan+66"}>
          <SView col={"xs-12"} row center>
            <SView col={"xs-6"} backgroundColor={"transparent"} row style={{ justifyContent: "flex-start", }}>
              <SText fontSize={10}>Detalle</SText>
            </SView>
            <SView col={"xs-6"} backgroundColor={"transparent"} row style={{ justifyContent: "flex-end", }}>
              <SText fontSize={10}># {SMath.formatMoney(datafiltrada.length, 0)}</SText>
            </SView>
          </SView>

          <SHr height={2} color={STheme.color.card} />
          {/* <SHr height={4} /> */}

          <SView col={"xs-12"} backgroundColor={"cyan+66"} card row >
            <SView col={"xs-6.2"} backgroundColor={"transparent"} row center style={{ justifyContent: "flex-start" }}>
              <SText fontSize={10}>Inversionista</SText>
            </SView>
            <SView col={"xs-1"} row center style={{ justifyContent: "flex-start", }}>
              <SText fontSize={10}>Acción</SText>
            </SView>
            <SView col={"xs-1.8"} row center style={{ justifyContent: "flex-start", }}>
              <SText fontSize={10}>Inscriptos</SText>
            </SView>
            <SView col={"xs-1"} row center>
              <SText fontSize={10}>Comisión</SText>
            </SView>
            <SView col={"xs-2"} row center style={{ justifyContent: "flex-end", }}>
              <SText fontSize={10}>Ganancia</SText>
            </SView>
          </SView>
        </SView>
        <SHr height={4} />
        <SView col={"xs-11.8"} height={165} backgroundColor={"transparent"}  >

          <SScrollView2
            style={{ width: "100%" }}
            disableHorizontal
          >
            {this.ItemDetalle(obj.inversion_key, obj.precio_accion, obj.ventas_paquetes, datafiltrada)}
          </SScrollView2>
        </SView>
      </SView>
    </SView >
  }
  getLista() {
    if (!this.state.data) return <SLoad />
    return <SList data={this.state.data} horizontal space={0} render={obj_fondo =>
      this.Item(obj_fondo)
    } />

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
    }).then(resp => {
      this.setState({ loading: false, data: resp.data });
    }).catch(e => {
      this.setState({ loading: false, error: e });
    })
  }

  render() {

    // if (!this.state.data) return <SLoad />
    // console.log("mucho ", this.state.data);

    return (
      <SPage title={'lista'} center>
        <SHr height={24} color={"transparent"}></SHr>
        <SView col={"xs-12"} center row style={{
          paddingStart: 10,
          paddingEnd: 10,
          paddingTop: 0,
          paddingBottom: 0,
        }}>
          {this.getLista()}
        </SView>

        <SHr height={50} color={"transparent"}></SHr>
      </SPage >
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(lista);
