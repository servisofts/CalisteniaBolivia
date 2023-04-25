import { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

class ClientesComparacion extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
}

  render() {
    return (
      <SPage hidden >
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(ClientesComparacion);