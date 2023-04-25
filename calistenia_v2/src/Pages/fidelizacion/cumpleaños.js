import { Component } from 'react';
import { SPage, SView } from 'servisofts-component';
import { connect } from 'servisofts-page';
// import { PlanDeCuentasTable } from 'servisofts-rn-contabilidad'

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Cumpleaños",
      ano: 2023,
      fecha_inicio: "2023-01-01",
      fecha_fin: "2023-12-31"
    }
  }

  render() {

    return (<SPage title={this.state.title} disableScroll center>
      <SView col={"xs-12"} center>

      </SView>
      <SView col={"xs-12"} flex center>
        {/* {this.loadData()} */}
      </SView>
    </SPage>)
  }
}
export default connect(index);