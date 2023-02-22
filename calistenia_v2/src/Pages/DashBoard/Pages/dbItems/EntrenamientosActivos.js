import { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SLoad, SNavigation, SText, SView } from 'servisofts-component';
import Finanza from '../../../Finanza';
import Sucursal from '../../../Sucursal';

class EntrenamientosActivos extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getContent() {

    var totales = 0;
    var fecha_desde = this.props.fechaInicio.toString("yyyy-MM-dd");
    var fecha_hasta = this.props.fechaFin.toString("yyyy-MM-dd");
    var sucursales = Sucursal.Actions.getAll(this.props);
    var paquetes = Finanza.Actions.getPaquetesVendidos({
      fecha_desde: fecha_desde, fecha_hasta: fecha_hasta
    }, this.props, false);


    if (!sucursales) return <SLoad />;
    if (!paquetes) { return null; }


    Object.keys(sucursales).map((key, index) => {
      // if (!sucursal_usuario.Actions.isActive(key, this.props)) {
      //   return null;
      // }
      var total_ingresos = 0;
      Object.keys(paquetes).map((key_entre) => {
        var paquete = paquetes[key_entre];
        if (paquete.key_sucursal == key) {
          total_ingresos++;
        }
      })
      totales += total_ingresos;
    })


    // var entrenamientos = Entrenamiento.Actions.getAll(this.props);
    // if (!entrenamientos) return <SLoad />
    // var cant = 0;
    // Object.keys(entrenamientos).map(key => {
    //   if (!entrenamientos[key].key_sucursal) return null;
    //   if (!sucursal_usuario.Actions.isActive(entrenamientos[key].key_sucursal, this.props)) {
    //     return null;
    //   }
    //   if (entrenamientos[key].estado == 1) cant++;
    // })


    return <SView center row height>
      <SView col={"xs-12"} center >
        <SText fontSize={10}>{`Incripciones activas`}</SText>
      </SView>
      <SView col={"xs-4"} height={50} onPress={() => {
        SNavigation.navigate("entrenamientos");
      }}>
        <SIcon name={"Entrenamiento"} />
      </SView>
      <SView col={"xs-8"} center height={40}>
        <SView center col={"xs-10"} height card>
          <SText bold fontSize={18} center>{`${totales}`}</SText>
        </SView>
      </SView>
    </SView>
  }
  render() {
    return (
      <SView col={"xs-11 sm-6 md-4 xl-3"} height={100} style={{
        padding: 8,
      }}>
        <SView height card center>
          {this.getContent()}
        </SView>
      </SView>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(EntrenamientosActivos);