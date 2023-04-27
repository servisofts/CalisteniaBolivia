import { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SPage, SText, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';

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

class variable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Reporte Name",
      func: "get_ventas_por_sucursal_all_",
      params: null,
      // socios: 0,

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
    }).then(resp => {
      this.setState({ loading: false, data: resp.data });
    }).catch(e => {
      this.setState({ loading: false, error: e });
    })
  }

  render() {

    return (
      <SPage title={'lista'} center>
        <SText>Registrar</SText>
        <SHr height={24} color={"transparent"}></SHr>
        <SView col={"xs-12"} center row style={{
          paddingStart: 10,
          paddingEnd: 10,
          paddingTop: 0,
          paddingBottom: 0,
        }}>
          {/* {this.getLista()} */}
        </SView>

        <SHr height={50} color={"transparent"}></SHr>
      </SPage >
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(variable);
