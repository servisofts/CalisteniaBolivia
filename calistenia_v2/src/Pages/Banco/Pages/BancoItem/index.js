import { Component } from 'react';
import { Text, View } from 'react-native';
// import Page from '../../../../Components/Page';
import { connect } from 'react-redux';
import { SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import FotoPerfilComponent from '../../../../Components/FotoPerfilComponent';
let component = "banco";

class BancoItem extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
    };
    this.key_banco = props.key_banco
  }
  getAllBancos = () => {
    var reducer = this.props.state.bancoReducer;
    if (!reducer.data) {
      if (reducer.estado == "cargando") {
        return <Text>Carfando</Text>;
      }
      SSocket.send({
        component: component,
        type: "getAll",
        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        estado: "cargando"
      })
      return <View />
    }

    var data = reducer.data;
    // return Object.keys(data).map((key) => {
    var obj = data[this.key_banco];
    return (
      <SView col={"xs-12"} key={obj.key} style={{
        borderRadius: 4,
        marginBottom: 8,
        backgroundColor: STheme.color.card,
      }} row>
        <SView col={"xs-12"} row style={{
          height: 60,
        }}>
          <SView style={{
            width: 60,
            height: 60,
          }} center>
            <SView style={{
              width: 45,
              height: 45,
              borderRadius: 8,
              overflow: "hidden"
            }}>

              {/* Banca Lista su detalle (Movimientos de cuenta) */}

              <FotoPerfilComponent data={obj} component={component} style={{ width: "100%", height: "100%" }} />

            </SView>

          </SView>
          <SView style={{
            height: "100%",
            justifyContent: "center",
          }}>
            <SText style={{
              fontSize: 16,
            }} >{obj.descripcion}</SText>
          </SView>
        </SView>
      </SView>
    );
    // })

  }
  render() {
    if (!this.key_banco) {
      return <View />
    }
    return (
      <SView col={"xs-12"} center>
        <SView col={"xs-11 md-7 xl-6"} center>
          {this.getAllBancos()}

        </SView>
      </SView>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(BancoItem);
