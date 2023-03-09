import { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SIcon, SImage, SList, SLoad, SMath, SNavigation, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Finanza from '../../../Finanza';
import Sucursal from '../../../Sucursal';
import Usuario from '../../../Usuario';

class SucursalesDetalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
    };

  }


  getData() {
    var fecha_desde = this.props.fechaInicio.toString("yyyy-MM-dd");
    var fecha_hasta = this.props.fechaFin.toString("yyyy-MM-dd");
    var sucursales = Sucursal.Actions.getAll(this.props);
    var clientesActivos = Usuario.Actions.getAllClientesActivos(this.props);
    var paquetes = Finanza.Actions.getPaquetesVendidos({
      fecha_desde: fecha_desde, fecha_hasta: fecha_hasta
    }, this.props, false);

    if (!sucursales || !clientesActivos || !paquetes) return null;
    let arr_paquetes_vendidos = Object.values(paquetes);
    var now = new SDate();
    Object.values(sucursales).map(sucursal => {
      let paquetes_vendidos_en_esta_sucursal = arr_paquetes_vendidos.filter((p) => p.key_sucursal == sucursal.key);
      let total = 0;
      paquetes_vendidos_en_esta_sucursal.map(o => total += parseFloat(o.total))
      sucursal.total_vendido = total;
      sucursal.paquetes_vendidos = paquetes_vendidos_en_esta_sucursal;
      sucursal.cantidad_clientes = 0;
      sucursal.cantidad_becados = 0;
    })
    Object.keys(clientesActivos).map((key_cli) => {
      var cliente = clientesActivos[key_cli];
      // monto += cliente["paquete"].precio;
      if (!cliente["caja"].key_sucursal) return;
      if (!sucursales[cliente["caja"].key_sucursal]) return;
      if (!sucursales[cliente["caja"].key_sucursal].cantidad_clientes) sucursales[cliente["caja"].key_sucursal].cantidad_clientes = 0;
      if (!sucursales[cliente["caja"].key_sucursal].cantidad_becados) sucursales[cliente["caja"].key_sucursal].cantidad_becados = 0;
      if (!(new SDate(cliente.fecha_inicio, "yyyy-MM-dd").isBefore(now) && new SDate(cliente.fecha_fin, "yyyy-MM-dd").isAfter(now))) {
        return;
      }
      if (cliente["paquete"].precio == 0) {
        sucursales[cliente["caja"].key_sucursal].cantidad_becados++;
      } else {
        sucursales[cliente["caja"].key_sucursal].cantidad_clientes++;
      }
    })

    return Object.values(sucursales).sort((a, b) => b.total_vendido - a.total_vendido)

  }
  getLista() {
    let data = this.getData();
    if (!data) return <SLoad />
    return <SList data={data} horizontal space={0} render={sucursal => <Item sucursal={sucursal} />} />
  }
  // getLista() {
  //   var fecha_desde = this.props.fechaInicio.toString("yyyy-MM-dd");
  //   var fecha_hasta = this.props.fechaFin.toString("yyyy-MM-dd");
  //   var sucursales = Sucursal.Actions.getAll(this.props);
  //   var clientesActivos = Usuario.Actions.getAllClientesActivos(this.props);
  //   var cajas = Caja.Actions.getActivas(this.props);
  //   var entrenamientos = Entrenamiento.Actions.getAll(this.props);

  //   var paquetes = Finanza.Actions.getPaquetesVendidos({
  //     fecha_desde: fecha_desde, fecha_hasta: fecha_hasta
  //   }, this.props, false);


  //   var arr_all = sucursal_usuario.Actions.getActive(this.props);
  //   if (!entrenamientos) return <SLoad />
  //   if (!sucursales) return <SLoad />;
  //   if (!clientesActivos) return <SLoad />;
  //   if (!cajas) return <SLoad />
  //   if (!arr_all) return <SLoad />
  //   if (!paquetes) { return null; }

  //   var totales = 0;


  //   return Object.keys(sucursales).map((key, index) => {

  //     if (!sucursal_usuario.Actions.isActive(key, this.props)) {
  //       return null;
  //     }
  //     var sucursal = sucursales[key];
  //     var cantidad = 0;
  //     var monto = 0;
  //     var becados = 0;
  //     var now = new SDate();

  //     // aqui se veia la cantidad de clientes, becados
  //     Object.keys(clientesActivos).map((key_cli) => {
  //       var cliente = clientesActivos[key_cli];
  //       if (cliente["caja"].key_sucursal == key) {
  //         // monto += cliente["paquete"].precio;
  //         if (!(new SDate(cliente.fecha_inicio, "yyyy-MM-dd").isBefore(now) && new SDate(cliente.fecha_fin, "yyyy-MM-dd").isAfter(now))) {
  //           return;
  //         }
  //         if (cliente["paquete"].precio == 0) {
  //           becados++;
  //         } else {
  //           cantidad++;
  //         }
  //       }
  //     })

  //     var ingresos_total = 0;
  //     var cantidad_inscripcto = 0;
  //     Object.keys(paquetes).map((key_entre) => {
  //       var paquete = paquetes[key_entre];
  //       if (paquete.key_sucursal == key) {
  //         ingresos_total += paquete.total;
  //         cantidad_inscripcto++;
  //       }
  //       return paquete;
  //     })


  //     totales += cantidad_inscripcto;

  //     return <Item />
  //   })
  // }
  getContent() {
    return <SView col={"xs-12"} center row>
      <SView col={"xs-12"} center >
        <SText fontSize={16}>{`Sucursales`}</SText>
      </SView>
      <SView col={"xs-12"} center row style={{
        // justifyContent: "space-between"
      }} >
        {this.getLista()}
      </SView>
    </SView>
  }
  render() {
    return (
      <SView col={"xs-12"} style={{
        padding: 8,
      }}>
        <SView col={"xs-12"} height center row>
          {this.getContent()}
        </SView>
      </SView>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(SucursalesDetalle);


const setColor = (monto) => {
  if (monto < 30000) {
    console.log("< 30.000");
    return STheme.color.card;
  }
  if (monto > 30000) {
    console.log("> 30.000");
    return "red";
  }
  if (monto > 45000) {
    console.log("> 45.000");
    return "yellow";
  }

  if (monto > 60000) {
    console.log("> 60.000");
    return "green";
  }


  // if (monto < 1000) {
  //   console.log("< 30.000");
  //   return STheme.color.card;
  // }
  // if (monto > 1000) {
  //   console.log("> 30.000");
  //   return "red";
  // }
  // if (monto > 3000) {
  //   console.log("> 45.000");
  //   return "yellow";
  // }

  // if (monto > 20000) {
  //   console.log("> 60.000");
  //   return "green";
  // }



}

const Item = ({ sucursal }) => {
  return <SView col={"xs-11 md-6 xl-3"} key={sucursal.key} height={180} style={{
    padding: 4,
  }}>
    <SView center col={"xs-12"} height card style={{
      padding: 4,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: setColor(sucursal.total_vendido),
    }}>
      <SView center col={"xs-12"} height={65} center>
        <SView width={45} height={45}>
          <SImage src={SSocket.api.root + "sucursal/" + sucursal.key} />
        </SView>
        <SView flex>
          <SText center fontSize={12} bold>{sucursal.descripcion}</SText>
        </SView>
      </SView>
      <SView center col={"xs-12"} row style={{
        padding: 4,
      }}>
        <SView col={"xs-12"} height={80} card row center>
          <SView col={"xs-2.5"} height center>
            <SView width={40} height={40} center onPress={() => {
              SNavigation.navigate("ClientesPage", { key_sucursal: sucursal.key, nobecados: true, });
            }}>
              <SIcon name="Usuarios_cliente" />
              <SView center style={{
                position: "absolute",
                width: 30,
                height: 30,
                backgroundColor: STheme.color.background + "99",
                borderRadius: 8
              }}>
                <SText center fontSize={18} bold>{sucursal.cantidad_clientes}</SText>
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
                <SText center fontSize={18} bold>{sucursal.cantidad_becados}</SText>
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
                <SText center fontSize={18} bold>{sucursal.paquetes_vendidos.length}</SText>
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
                <SText center fontSize={12} bold>Bs</SText>
                <SText center fontSize={12} bold>{SMath.formatMoney(sucursal.total_vendido)}</SText>
              </SView>
            </SView>
            <SText center fontSize={10}>{'Ingresos'}</SText>
            <SText center fontSize={10}>{" "}</SText>
          </SView>
        </SView>
      </SView>
    </SView>
  </SView >
}