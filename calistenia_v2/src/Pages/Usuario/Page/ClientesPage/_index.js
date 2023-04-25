import { Component } from 'react';
import { connect } from 'react-redux';
import { SList, SLoad, SNavigation, SPage, SText } from 'servisofts-component';
import Usuario from '../..';


class ClientesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key_sucursal: SNavigation.getParam("key_sucursal", ""),
      soloBecados: SNavigation.getParam("becados", false),
      soloNoBecados: SNavigation.getParam("nobecados", false),
      pagination: {
        curPage: 1,
      }
    };
  }

  getLista() {
    var data = Usuario.Actions.getAllClientesActivos(this.props);
    if (!data) return <SLoad />
    return <SList
      data={data}
      limit={100}
      render={(obj) => {
        return <SText>{JSON.stringify(obj)}</SText>
      }}
    />

  }

  render() {

    return (
      <SPage title={"Clientes activos"}>
        {this.getLista()}
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(ClientesPage);