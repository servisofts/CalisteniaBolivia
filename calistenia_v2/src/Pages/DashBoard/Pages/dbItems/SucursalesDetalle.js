import { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SIcon, SImage, SLoad, SMath, SNavigation, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Caja from '../../../Caja';
import Entrenamiento from '../../../Entrenamiento';
import Finanza from '../../../Finanza';
import Sucursal from '../../../Sucursal';
import sucursal_usuario from '../../../sucursal_usuario';
import Usuario from '../../../Usuario';

class SucursalesDetalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
    };

  }

  getLista() {
    var fecha_desde = this.props.fechaInicio.toString("yyyy-MM-dd");
    var fecha_hasta = this.props.fechaFin.toString("yyyy-MM-dd");
    var sucursales = Sucursal.Actions.getAll(this.props);
    var clientesActivos = Usuario.Actions.getAllClientesActivos(this.props);
    var cajas = Caja.Actions.getActivas(this.props);
    var entrenamientos = Entrenamiento.Actions.getAll(this.props);

    var paquetes = Finanza.Actions.getPaquetesVendidos({
      fecha_desde: fecha_desde, fecha_hasta: fecha_hasta
    }, this.props, false);


    var arr_all = sucursal_usuario.Actions.getActive(this.props);
    if (!entrenamientos) return <SLoad />
    if (!sucursales) return <SLoad />;
    if (!clientesActivos) return <SLoad />;
    if (!cajas) return <SLoad />
    if (!arr_all) return <SLoad />
    if (!paquetes) { return null; }

    var totales = 0;


    return Object.keys(sucursales).map((key, index) => {
      if (!sucursal_usuario.Actions.isActive(key, this.props)) {
        return null;
      }
      var sucursal = sucursales[key];
      var cantidad = 0;
      var monto = 0;
      var becados = 0;
      var now = new SDate();
      Object.keys(clientesActivos).map((key_cli) => {
        var cliente = clientesActivos[key_cli];
        if (cliente["caja"].key_sucursal == key) {
          // monto += cliente["paquete"].precio;
          if (!(new SDate(cliente.fecha_inicio, "yyyy-MM-dd").isBefore(now) && new SDate(cliente.fecha_fin, "yyyy-MM-dd").isAfter(now))) {
            return;
          }
          if (cliente["paquete"].precio == 0) {
            becados++;
          } else {
            cantidad++;
          }
        }
      })
      var cantidad_caja = 0;
      Object.keys(cajas).map((key_caja) => {
        var caja = cajas[key_caja];
        if (caja.key_sucursal == key) {
          cantidad_caja++;
        }
      })

      var cantidad_entrenamiento = 0;
      Object.keys(entrenamientos).map((key_entre) => {
        var entrenamiento = entrenamientos[key_entre];
        if (entrenamiento.key_sucursal == key) {
          if (entrenamiento.estado == 1) {
            cantidad_entrenamiento++;
          }
        }
      })

      var cantidad_paquete = 0;
      var monto_total_paquete = 0;
      Object.keys(paquetes).map((key_entre) => {
        var paquete = paquetes[key_entre];
        if (paquete.key_sucursal == key) {
          cantidad_paquete += paquete.total;
          monto_total_paquete++;
        }
      })

      totales += monto_total_paquete;


      return <SView col={"xs-11 md-6 xl-3"} key={index} height={180} style={{
        padding: 4,
      }}>
        <SView center col={"xs-12"} height card style={{
          padding: 4,
        }}>
          <SView center col={"xs-12"} height={65} center>
            <SView width={45} height={45}>
              <SImage src={SSocket.api.root + "sucursal/" + key} />
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
                  SNavigation.navigate("ClientesPage", { key_sucursal: key, nobecados: true, });
                }}>
                  <SIcon name="Usuarios_cliente" />
                  <SView center style={{
                    position: "absolute",
                    width: 30,
                    height: 30,
                    backgroundColor: STheme.color.background + "99",
                    borderRadius: 8
                  }}>
                    <SText center fontSize={18} bold>{cantidad}</SText>
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
                    <SText center fontSize={18} bold>{becados}</SText>

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
                    <SText center fontSize={18} bold>{monto_total_paquete}</SText>
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
                    // backgroundColor: "green",
                    backgroundColor: STheme.color.background + "99",
                    borderRadius: 8
                  }}>
                    {/* aqui viene la cantidad de incribciones */}
                    <SText center fontSize={12} bold>Bs</SText>
                    <SText center fontSize={12} bold>{SMath.formatMoney(cantidad_paquete)}</SText>

                  </SView>
                </SView>
                <SText center fontSize={10}>{'Ingresos'}</SText>
                <SText center fontSize={10}>{" "}</SText>
              </SView>


            </SView>
          </SView>
        </SView>
      </SView>
    })
  }
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