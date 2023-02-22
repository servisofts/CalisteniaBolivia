import { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SPage, SView } from 'servisofts-component';
import MonthBetween from '../../../Components/MonthBetween';
import GraficoAsistencia from './dbItems/GraficoAsistencia';
import GraficoIngresos from './dbItems/GraficoIngresos/index';
import GraficoPaquetesVendidos from './dbItems/GraficoPaquetesVendidos';

class Grafico extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    var fechaInicio = new SDate();

    fechaInicio.setDay(1);
    this.state = {
      fechaInicio: fechaInicio.toString("yyyy-MM-dd"),
      fechaFin: new SDate().toString("yyyy-MM-dd")
    };

  }

  getBack() {
    if (this.props.preventBack) {
      return <View />
    }
    // if (!SNavigation.lastRoute) {
    //     return <View />
    // }
    // if (!SNavigation.lastRoute.navigation.canGoBack()) {
    //     return <View />
    // }
    return <SView width height style={{
      justifyContent: 'center',
    }}>
      <SView onPress={() => {
        SNavigation.goBack();
      }} style={{
        maxWidth: 35,
      }} center height>
        <SIcon width={25} height={25} name={"Arrow"} fill={STheme.color.text} />
      </SView>
    </SView>
  }

  render() {
    return (
      <SPage title={'Grafico'}>

        <SView col={"xs-12"} row center>

          <MonthBetween
            fecha_inicio={this.state.fechaInicio}
            fecha_fin={this.state.fechaFin}
            onChange={(fechaInicio, fechaFin) => {
              this.setState({ fechaInicio, fechaFin })
            }} />
          <SHr height={36} />

          <GraficoPaquetesVendidos fechaInicio={this.state.fechaInicio} fechaFin={this.state.fechaFin} />
          <SHr height={36} />
          <GraficoIngresos fechaInicio={this.state.fechaInicio} fechaFin={this.state.fechaFin} />
          <SHr height={36} />
          <GraficoAsistencia fechaInicio={this.state.fechaInicio} fechaFin={this.state.fechaFin} />
          <SHr height={100} />
        </SView>
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(Grafico);