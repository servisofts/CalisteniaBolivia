import { Component } from 'react';
import { SButtom, SDate, SHr, SIcon, SNavigation, SPage, STheme, SView } from 'servisofts-component';
import MonthBetween from '../../../Components/MonthBetween';
import CajasActivas from './dbItems/CajasActivas';
import ClientesActivos from './dbItems/ClientesActivos';
import EntrenamientosActivos from './dbItems/EntrenamientosActivos';
import SucursalesDetalle from './dbItems/SucursalesDetalle';

export default class index extends Component {
  constructor(props) {
    super(props);
    var fechaInicio = new SDate();
    //TODO: comentar
    //  fechaInicio.addMonth(-1)
    fechaInicio.setDay(1);
    this.state = {
      fechaInicio: fechaInicio.toString("yyyy-MM-dd"),
      fechaFin: new SDate().toString("yyyy-MM-dd")
    };
  }

  render() {
    return (
      <SPage title={"DashBoard"}>
        <SView col={"xs-12"} row center>
          <SHr height={32} />
          <MonthBetween fecha_inicio={this.state.fechaInicio} fecha_fin={this.state.fechaFin}
            onChange={(fechaInicio, fechaFin) => { this.setState({ fechaInicio, fechaFin }) }} />
          <SHr height={32} />

          <ClientesActivos />
          <EntrenamientosActivos fechaInicio={this.state.fechaInicio} fechaFin={this.state.fechaFin} />
          <CajasActivas fechaInicio={this.state.fechaInicio} fechaFin={this.state.fechaFin} />

          {/* aqui problema con fecha */}
          {/* no carga la fecha en el dashboard */}

          {/* <SHr height={36} /> */}

          {/* <SHr height={32} /> */}
          <SucursalesDetalle fechaInicio={this.state.fechaInicio} fechaFin={this.state.fechaFin} />

          {/* <SucursalesDetalle /> */}
          {/* <SHr height={36} /> */}

          {/* <GraficoPaquetesVendidos fechaInicio={this.state.fechaInicio} fechaFin={this.state.fechaFin} />
          <SHr height={36} />
          <GraficoIngresos fechaInicio={this.state.fechaInicio} fechaFin={this.state.fechaFin} />
          <SHr height={36} />
          <GraficoAsistencia fechaInicio={this.state.fechaInicio} fechaFin={this.state.fechaFin} />
          <SHr height={100} /> */}

          <SButtom Card
            onPress={() => { SNavigation.navigate("grafico") }}
            style={{ backgroundColor: STheme.color.gray, position: "absolute", right: 50, bottom: 32, width: 50, height: 50, }}>
            <SIcon name={"DashboardBtn"} style={{ width: 45, height: 45, }} />
          </SButtom>

          {/* <FloatButtom onPress={() => {
            SNavigation.navigate("registro")
          }} /> */}

        </SView>
      </SPage>
    );
  }
}
