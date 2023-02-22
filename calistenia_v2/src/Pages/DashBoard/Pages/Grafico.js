import { Component } from 'react';
import { connect } from 'react-redux';
import { SPage, SText } from 'servisofts-component';

class Grafico extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SPage title={'Grafico'}>

        <SText>{'Grafico'}</SText>

      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(Grafico);