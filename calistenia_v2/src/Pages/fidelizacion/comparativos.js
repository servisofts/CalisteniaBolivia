import { Component } from 'react';
import { connect } from 'react-redux';
import { SPage, SView } from 'servisofts-component';

class index extends Component {
  constructor(props) {
    super(props);

    // this.params = SNavigation.getAllParams();
    this.state = {
      title: "Comparativos",
      // func: "reporte_ventas_vendedores",
      // params: [`'${this.params.fecha_inicio}'`, `'${this.params.fecha_fin}'`],
      // params: [`'\${servicio.key}'`, `'${this.params.fecha_inicio}'`, `'${this.params.fecha_fin}'`],
    };
  }

  render() {
    return <SPage title={this.state.title} center disableScroll>
      {/* {this.renderHeader()} */}
      <SView col={"xs-12"} flex>
        {/* {this.getLista()} */}
      </SView>
    </SPage>
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(index);