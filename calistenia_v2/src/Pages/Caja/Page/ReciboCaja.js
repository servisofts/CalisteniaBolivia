import { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SNavigation, SPage, SView } from 'servisofts-component';
import Recibo from '../Components/Recibo';

import SPdf from '../../../Components/SPdf';

class ReciboCaja extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.key = SNavigation.getParam("key", false);
  }

  render() {

    return (
      <SPage title={'ReciboCaja'} center row>
        <SView col={"xs-12"} center row>
          <SButtom type={"success"} onPress={() => { this.pdf.imprimir() }}>{"IMPRIMIR"}</SButtom>
          <SView col={"xs-1"}></SView>
          <SButtom type={"danger"} onPress={() => { SNavigation.replace("/") }}>{"SALIR"}</SButtom>
        </SView>
        <SHr height={15} />
        <SPdf ref={ref => this.pdf = ref} size="Legal" >
          <Recibo key_caja={this.key} />
        </SPdf>

      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(ReciboCaja);