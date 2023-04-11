import { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SList, SLoad, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
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

class db extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Reporte Name",
      func: "get_ventas_por_sucursal_all",
      params: null,
    };

  }

  header() {
    <SView col={"xs-11 sm-6 md-4 xl-3"} height={100} style={{
      padding: 8,
    }}>
      <SView height card center>
        {/* {this.getContent()} */}
      </SView>
    </SView>
  }

  ItemDetalle(key_inversion, precio_accion, cantidad_paquetes) {

    var datax = fondo_inversion_usuario.Actions.getAll(this.props);
    if (!datax) return <SLoad />
    var usuarios = Model.usuario.Action.getAll();
    if (!usuarios) return <SLoad />


    return Object.keys(datax).map(keys => {
      const obj = datax[keys];

      if (obj.key_fondo_inversion != key_inversion) return;


      return <SView col={"xs-12"} backgroundColor={"cyan+66"}>


        <SView col={"xs-12"} backgroundColor={"cyan+66"} row>
          <SView col={"xs-6"} backgroundColor={"transparent"} row>
            <SText fontSize={10}>{usuarios[obj.key_usuario_inversionista].Nombres + " " + usuarios[obj.key_usuario_inversionista].Apellidos}</SText>
          </SView>
          <SView col={"xs-2"} row style={{ justifyContent: "flex-start", }}>
            <SText fontSize={10}>{SMath.formatMoney(obj.inversion / cantidad_paquetes)}</SText>
          </SView>
          <SView col={"xs-1"} row style={{ justifyContent: "flex-start", }}>
            <SText fontSize={10}>{cantidad_paquetes}</SText>
          </SView>
          <SView col={"xs-1"} center>
            <SText fontSize={10}>x{obj.comision} Bs</SText>
          </SView>
          <SView col={"xs-2"} row style={{ justifyContent: "flex-end", }}>
            <SText fontSize={10}>{SMath.formatMoney((obj.inversion / precio_accion) * obj.comision)}</SText>
          </SView>

        </SView>
        <SHr height={2} color={STheme.color.card} />

      </SView>
    })
  }
  Item(obj) {
    return <SView col={"xs-11 md-6 xl-3"} border={"red"} height={180} style={{ padding: 4 }}>

      <SView center col={"xs-12"} height card style={{
        padding: 4,
        borderWidth: 1.5,
        borderRadius: 4,
        // borderColor: setColor(sucursal.total_vendido),
      }}>
        <SView center col={"xs-12"} height={65} center>
          <SView width={45} height={45}>
            {/* <SImage src={SSocket.api.root + "sucursal/" + sucursal.key} /> */}
          </SView>
          <SView flex>
            <SText center fontSize={12} bold>descrip</SText>
          </SView>
        </SView>
        <SView center col={"xs-12"} row style={{
          padding: 4,
        }}>
          <SView col={"xs-12"} height={80} card row center>
            <SView col={"xs-2.5"} height center>
              <SView width={40} height={40} center onPress={() => {
                // SNavigation.navigate("ClientesPage");
              }}>
                <SIcon name="Usuarios_cliente" />
                <SView center style={{
                  position: "absolute",
                  width: 30,
                  height: 30,
                  backgroundColor: STheme.color.background + "99",
                  borderRadius: 8
                }}>
                  <SText center fontSize={18} bold>200</SText>
                </SView>
              </SView>
              <SText center fontSize={10}>{'Clientes'}</SText>
              <SText center fontSize={10}>{" "}</SText>

            </SView>
            <SView col={"xs-2.5"} height center>
              <SView width={40} height={40} center onPress={() => {
                SNavigation.navigate("ClientesPage", { key_sucursal: key, becados: true });
              }}>
                <SIcon name="Usuarios_proveedor" />
                <SView center style={{
                  position: "absolute",
                  width: 30,
                  height: 30,
                  backgroundColor: STheme.color.background + "99",
                  borderRadius: 8
                }}>
                  <SText center fontSize={18} bold>50</SText>
                </SView>
              </SView>
              <SText center fontSize={10}>{'Becados'}</SText>
              <SText center fontSize={10}>{" "}</SText>
            </SView>
            <SView col={"xs-2.5"} height center >
              <SView width={40} height={40} center onPress={() => {
                // SNavigation.navigate("CajasAbiertas", { key_sucursal: key });
              }}>
                <SIcon name="Entrenamiento" />
                <SView center style={{
                  position: "absolute",
                  width: 30,
                  height: 30,
                  backgroundColor: STheme.color.background + "99",
                  borderRadius: 8
                }}>
                  {/* aqui viene la cantidad de paquetes vendidos */}
                  <SText center fontSize={18} bold>90</SText>
                </SView>
              </SView>
              <SText center fontSize={10}>{'Inscripciones'}</SText>
              <SText center fontSize={10}>{" "}</SText>
            </SView>
            <SView col={"xs-2.5"} height center>
              <SView width={40} height={40} center onPress={() => {
                // SNavigation.navigate("entrenamientos", { key_sucursal: key });
              }}>
                {/* cambiar el icono */}
                {/* <SIcon name="Entrenamiento" /> */}
                <SIcon name="Caja" />
                <SView center style={{
                  position: "absolute",
                  width: 70,
                  height: 30,
                  backgroundColor: STheme.color.background + "99",
                  borderRadius: 8
                }}>
                  {/* aqui viene la cantidad de incribciones */}
                  {/* <SText center fontSize={12} bold>Bs</SText> */}
                  <SText center fontSize={12} bold>{SMath.formatMoney(301.2)}</SText>
                </SView>
              </SView>
              <SText center fontSize={10}>{'Ingresos/Bs'}</SText>
              <SText center fontSize={10}>{" "}</SText>
            </SView>
          </SView>
        </SView>
      </SView>
    </SView >
  }
  getLista() {
    var data = data_test.map(objeto => Object.values(objeto)[0]);
    return <SList data={data} horizontal space={0} render={obj_fondo =>
      this.Item(obj_fondo)
    } />
  }
  render() {
    return (
      <SPage title={'lista'} center>
        <SText>Dashboard</SText>
        <SHr height={24} color={"transparent"}></SHr>
        <SView col={"xs-12 "} center row style={{
          paddingStart: 10,
          paddingEnd: 10,
          paddingTop: 0,
          paddingBottom: 0,
        }}>


          <SHr height={32} />
          {/* <MonthBetween fecha_inicio={"2022-08-08"} fecha_fin={"2022-08-08"} /> */}
          <SHr height={32} />

          <SView col={"xs-12 "} center row style={{ paddingStart: 10, paddingEnd: 10, paddingTop: 0, paddingBottom: 0 }}>

            <SView col={"xs-12"} height={80} row center style={{ flex: 1, width: "100%" }}>
              <SView col={"xs-3"} height row center border={"blue"} style={{ flex: 1, width: "100%", }}>
              </SView>
              <SView col={"xs-3"} height row center border={"green"} style={{ flex: 1, width: "100%" }}>
              </SView>
              <SView col={"xs-3"} height row center border={"yellow"} style={{ flex: 1, width: "100%" }}>
              </SView>
            </SView>


          </SView>
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
export default connect(initStates)(db);
