import { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SLoad, SMath, SPage, SText, STheme, SView } from 'servisofts-component';
import Model from '../../../../../Model';
import fondo_inversion from '../../fondo_inversion';
import fondo_inversion_usuario from '../../fondo_inversion_usuario';



class lista extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  toStringInversionista(fondo_key, precioXaccion, inicio, fin) {
    var datax = fondo_inversion_usuario.Actions.getAll(this.props);
    if (!datax) return <SLoad />
    var usuarios = Model.usuario.Action.getAll();
    if (!usuarios) return <SLoad />

    return Object.keys(datax).map(keys => {
      const obj = datax[keys];
      if (obj.key_fondo_inversion != fondo_key) return;

      // return this.toStringInversionista_detalle(obj.key_fondo_inversion, obj.key_usuario_inversionista)
      return <SView col={"xs-12"} center row>
        <SText color={"red"} >{"socio "
          + usuarios[obj.key_usuario_inversionista].Nombres + " "
          + usuarios[obj.key_usuario_inversionista].Apellidos + " "
          + "Inverion " + obj.inversion + " "
          + "comision " + obj.comision + " "
          + "# acciones " + SMath.formatMoney(obj.inversion / precioXaccion) + " "
          + "paquetes " + 1.5 + " "
          + "ganancia " + SMath.formatMoney((obj.inversion / precioXaccion) * 1) + " "
          + "\n"
        }</SText>
      </SView>

    })

  }

  toString() {
    var data = fondo_inversion.Actions.getAll(this.props);
    if (!data) return <SLoad />
    return Object.keys(data).map(keys => {
      const obj = data[keys];
      if (obj.estado != 1) return;
      return <>
        <SView col={"xs-5"} border={"cyan"} center row>

          <SText>{"Suc. " + obj.descripcion + "\n"
            + "Direccion " + obj.observacion + "\n"
            + "Fondo " + SMath.formatMoney(obj.monto_maximo) + " Bs \n"
            + "Duracion " + obj.cantidad_meses + " Meses \n"
            + "Acciones " + obj.cantidad_acciones + "\n"
            + "socios/paquetes " + 1.5 + "\n"
            + "Precio x Acciones " + SMath.formatMoney(obj.precio_accion) + " Bs \n"}
          </SText>
          <SHr height={1} color={STheme.color.card} />
          <SHr height={4} />
          {this.toStringInversionista(obj.key, obj.precio_accion, obj.fecha_inicio, obj.fecha_fin)}
          <SHr height={4} />
        </SView>
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
export default connect(initStates)(lista);
