import { Component } from 'react';
import { SPage } from 'servisofts-component';
import ListaCajas from './ListaCajas';

export default class CajasAbiertas extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SPage navigation={this.props.navigation} title="Cajas abiertas" disableScroll >
        <ListaCajas navigation={this.props.navigation} />
      </SPage>
    );
  }
}
