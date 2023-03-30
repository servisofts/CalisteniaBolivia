import { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import Recibo from '../Components/Recibo';

import SPdf from '../../../Components/SPdf';

class ReciboCaja extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.key = SNavigation.getParam("key", false);
  }

  getButtom({ title, onPress, icon }) {
    return <SButtom type={"default"} style={{ height: 70, backgroundColor: STheme.color.card, borderRadius: 8 }} onPress={onPress}>
      <SIcon name={icon} width={40} height={40} />
      <SHr height={4} />
      <SText secondary bold >{title}</SText>
    </SButtom>
  }


  render() {

    return (
      <SPage title={'ReciboCaja'} center row>
        <SView col={"xs-12"} center row>

          {this.getButtom({ title: "IMPRIMIR", icon: "Ajustes", onPress: () => { this.pdf.imprimir() } })}

          {this.getButtom({ title: "SALIR", icon: "Salir", onPress: () => { SNavigation.replace("/") } })}


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