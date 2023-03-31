import { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SNavigation, SPage, SText, SView } from 'servisofts-component';
import { SSRolesPermisosValidate } from '../../../SSRolesPermisos';

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getItem({ title, icon, url, onPress }) {
    if (!SSRolesPermisosValidate({ page: url, permiso: "ver" })) {
      return null;
    }
    return <SView col={"xs-3 sm-2.5 md-2 lg-1.5 xl-1.3"} colSquare style={{
      padding: 4,
    }}
    >
      <SView col={"xs-12"} height center>
        <SView col={"xs-7"} colSquare onPress={() => {
          if (onPress) {
            onPress();
            return;
          }
          SNavigation.navigate(url);
        }} >
          <SIcon name={icon} />
        </SView>
        <SHr />
        <SView center height={16}>
          <SText center fontSize={12}>{title}</SText>
        </SView>
      </SView>
    </SView>
  }
  render() {
    return (
      <SPage title={'Inversiones'}>
        <SView row col={"xs-12"}>
          {this.getItem({
            title: 'Fondos de inversion',
            icon: 'Ajustes',
            url: 'fondo_inversion',
          })}
          {this.getItem({
            title: 'Mis inversiones',
            icon: 'Cheque',
            url: 'mis_inversiones',
          })}
          {this.getItem({
            title: 'Invertir',
            icon: 'Carrito',
            url: 'invertir',
          })}
          {this.getItem({
            title: 'Crowdfunding',
            icon: 'Ajustes',
            url: 'crowdfunding',
          })}
        </SView>

      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(home);