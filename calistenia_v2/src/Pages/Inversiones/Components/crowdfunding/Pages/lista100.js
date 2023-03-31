import { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SLoad, SMath, SPage, SText, SView } from 'servisofts-component';
import Model from '../../../../../Model';
import Finanza from '../../../../Finanza';
import fondo_inversion from '../../fondo_inversion';
import fondo_inversion_sucursal from '../../fondo_inversion_sucursal';
import fondo_inversion_usuario from '../../fondo_inversion_usuario';

const array = {

}
const totus = 0;
class lista100 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total_ventas: 0,
    };
  }



  Item() {
    return <SView col={"xs-11 md-6 xl-3"} backgroundColor={"transparent"} height={350} style={{ padding: 4 }}>

      <SView center col={"xs-12"} height card style={{ borderWidth: 1.5, borderRadius: 4 }} >

        <SView center col={"xs-12"} height={65} center backgroundColor={"green+66"}>
          <SText center fontSize={14} bold>Sucursal Industrial</SText>
          <SHr height={8} />
          <SText center fontSize={12}>Av. Mutualista 6to anillo</SText>
        </SView>

        <SView center col={"xs-12"} row backgroundColor={"cyan+66"}>
          <SView col={"xs-12"} height={80} card row center>
            <SView col={"xs-3"} height center>
              <SView center style={{ width: 80, height: 30, borderRadius: 4, backgroundColor: "red" }}>
                <SText fontSize={14} bold>9</SText>
              </SView>
              <SHr height={2} />
              <SText center fontSize={10}>Monto maximo/Bs</SText>
            </SView>
            <SView col={"xs-3"} height center>
              <SView center style={{ width: 80, height: 30, borderRadius: 4, backgroundColor: "red" }}>
                <SText fontSize={14} bold>9</SText>
              </SView>
              <SHr height={2} />
              <SText center fontSize={10}>Duración</SText>
            </SView>
            <SView col={"xs-3"} height center>
              <SView center style={{ width: 80, height: 30, borderRadius: 4, backgroundColor: "red" }}>
                <SText fontSize={14} bold>9</SText>
              </SView>
              <SHr height={2} />
              <SText center fontSize={10}>Acciones</SText>
            </SView>
            <SView col={"xs-3"} height center>
              <SView center style={{ width: 80, height: 30, borderRadius: 4, backgroundColor: "red" }}>
                <SText fontSize={14} bold>9</SText>
              </SView>
              <SHr height={2} />
              <SText center fontSize={10}>Socios</SText>
            </SView>
          </SView>
        </SView>

        <SView col={"xs-12"} backgroundColor={"cyan+66"}>

          <SHr height={24} />

          <SText fontSize={12}>Accionista</SText>
          <SHr height={1} color={"blue"} />
          {/* <SText fontSize={12}>18</SText> */}

          <SView col={"xs-12"} backgroundColor={"cyan+66"} row>

            <SText fontSize={10}>MARIA DE LOS ANGELES{"\n"}QUIROGA ARREDONDO</SText>

            <SText fontSize={10}>Inversion Bs.48.720</SText>

            <SText fontSize={10}>Acciones 7</SText>

            {/* <SText fontSize={10}>Comisión Bs.1</SText> */}
            <SText fontSize={10}>Ventas/paquetes 435</SText>

            <SText fontSize={10}>Ganancia Bs. 3.500</SText>


            {/* <STable2
              header={[
                { key: "index", label: "#", width: 40 },

                { key: "estado", label: "estado", width: 70, render: (a) => a == 1 ? "Activo" : "Anulado" },


              ]}

              // limit={10}
              data={tuto}
            /> */}

          </SView>
        </SView>
      </SView>
    </SView >
  }
  getLista() {
    const arr = [1, 2, 3];
    return arr.map((key) => {
      // return
      return this.Item()
      // <SView col={"xs-12"} height={180} row>
      // {this.Item()}
      // </SView>
    })
    // return <SList data={arr} horizontal space={0} render={data => { this.Item() }} />
  }

  getDias(data, paquetes_vendidos, data_fondo_inversion_sucursal) {
    var fecha_inicio = new SDate(data.fecha_inicio);
    var fecha_fin = new SDate(data.fecha_fin);
    var dias = fecha_fin.diff(fecha_inicio, "days");
    var filtar_sucursales = Object.values(paquetes_vendidos).filter(paquete_venta => {
      return data_fondo_inversion_sucursal.find(fis => fis.key_sucursal == paquete_venta.key_sucursal);
    })
    fecha_inicio.addMonth(-1);
    let ahora = new SDate();
    ahora.addMonth(1);
    var total = 0;
    let COMPONENT = Array(dias + 1).fill(0).map((j, i) => {
      fecha_inicio.addMonth(1)
      var ventas_del_dia = filtar_sucursales.filter(paquete_venta => {
        return (
          new SDate(paquete_venta.fecha_on).toString("yyyy-MM") == fecha_inicio.toString("yyyy-MM")
        );
      })
      if (ahora.isBefore(fecha_inicio)) {
        return null;
      }
      var cantidad = 0;
      ventas_del_dia.map((obj) => {
        cantidad += obj.usuarios.length;
      })

      total += cantidad;
    })
    if (this.state.total_ventas != total) {
      if (this.props.onChangeTotal) {
        this.props.onChangeTotal(total);
      }
      this.setState({ total_ventas: total })
    }
    return COMPONENT;
  }


  getFondo11(fecha_inicio, fecha_fin) {
    // var data = fondo_inversion.Actions.getByKey(key, this.props);
    // if (!data) return <SLoad />

    // var sucursales = fondo_inversion_sucursal.Actions.getByKeyFondoInversion(key, this.props);
    // if (!sucursales) return <SLoad />

    var paquetes_vendidos = Finanza.Actions.getPaquetesVendidos({
      fecha_desde: new SDate(fecha_inicio).toString("yyyy-MM-dd"),
      fecha_hasta: new SDate(fecha_fin).toString("yyyy-MM-dd")
    }, this.props);
    if (!paquetes_vendidos) return <SLoad />

    // console.log("one ", data)
    // console.log("two ", sucursales)
    console.log("three ", paquetes_vendidos)
    // return <SView col={"xs-12"} >
    //   {this.getDias(data, paquetes_vendidos, sucursales)}
    // </SView>
  }

  getFondo(lleve) {

    var data = fondo_inversion.Actions.getByKey(lleve, this.props);
    var sucursales = fondo_inversion_sucursal.Actions.getByKeyFondoInversion(lleve, this.props);
    if (!data) return <SLoad />
    if (!sucursales) return <SLoad />

    var paquetes_vendidos = Finanza.Actions.getPaquetesVendidos({
      fecha_desde: new SDate(data.fecha_inicio).toString("yyyy-MM-dd"),
      fecha_hasta: new SDate(data.fecha_fin).toString("yyyy-MM-dd")
    }, this.props);
    if (!paquetes_vendidos) return <SLoad />

    this.getDias(data, paquetes_vendidos, sucursales)
  }


  // toStringInversionista_detalle(fondo_key, usuario_key) {

  //   var data_fondo_inversion = fondo_inversion.Actions.getByKey(fondo_key, this.props);

  //   var data_inversion_usuario = fondo_inversion_usuario.Actions.filtrar({
  //     key_fondo_inversion: fondo_key,
  //     key_usuario_inversionista: usuario_key ?? this.props.state.usuarioReducer.usuarioLog.key
  //   }, this.props);
  //   if (!data_fondo_inversion) return null;
  //   if (!data_inversion_usuario) return null;
  // }

  toStringInversionista(fondo_key, precioXaccion, inicio, fin) {
    var datax = fondo_inversion_usuario.Actions.getAll(this.props);
    if (!datax) return <SLoad />
    var usuarios = Model.usuario.Action.getAll();
    if (!usuarios) return <SLoad />

    this.getFondo(fondo_key)

    console.log("viava ", inicio, " ", fin)
    console.log("chaval ", this.state.total_ventas)

    return Object.keys(datax).map(keys => {
      const obj = datax[keys];

      if (obj.key_fondo_inversion != fondo_key) return;


      // return this.toStringInversionista_detalle(obj.key_fondo_inversion, obj.key_usuario_inversionista)
      return <SText color={"red"} >{"socio "
        + usuarios[obj.key_usuario_inversionista].Nombres + " "
        + usuarios[obj.key_usuario_inversionista].Apellidos + " "
        + "Inverion " + obj.inversion + " "
        + "comision " + obj.comision + " "
        + "# acciones " + obj.inversion / precioXaccion + " "
        + "paquetes " + this.state.total_ventas + " "
        + "ganancia " + (obj.inversion / precioXaccion) * 1 + " "
        + "\n"
      }</SText>

    })

  }

  toString() {
    var data = fondo_inversion.Actions.getAll(this.props);
    if (!data) return <SLoad />
    return Object.keys(data).map(keys => {
      const obj = data[keys];
      if (obj.estado != 1) return;
      return <>
        <SText>{"Suc. " + obj.descripcion + "\n"
          + "Direccion " + obj.observacion + "\n"
          + "Fondo " + SMath.formatMoney(obj.monto_maximo) + " Bs \n"
          + "Duracion " + obj.cantidad_meses + " Meses \n"
          + "Acciones " + obj.cantidad_acciones + "\n"
          + "socios/paquetes " + this.state.total_ventas + "\n"
          + "Precio x Acciones " + SMath.formatMoney(obj.precio_accion) + " Bs \n"}
        </SText>
        <SHr height={1} color={"blue"} />
        <SHr height={4} />
        {this.toStringInversionista(obj.key, obj.precio_accion, obj.fecha_inicio, obj.fecha_fin)}
        <SHr height={4} />
      </>
    })
  }

  render() {
    return (
      <SPage title={'lista'} center>
        {/* <SHr height={24} color={"red"}></SHr> */}
        {/* {this.getLista()} */}
        {this.toString()}
        {/* <SView height={50} /> */}
        {/* <SHr height={50} color={"red"}></SHr> */}
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(lista100);
