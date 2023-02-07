import { Component } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { SImage, SText, STheme } from 'servisofts-component';
import SSocket from 'servisofts-socket';

class Paquete extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    var key = this.props.key_paquete;
    let reducer = this.props.state.paqueteReducer;
    let data = reducer.data;
    if (!data) {
      if (reducer.estado == "cargando") return <ActivityIndicator color={STheme.color.text} />
      if (reducer.estado == "error") return <Text>ERROR</Text>
      var object = {
        component: "paquete",
        type: "getAll",
        estado: "cargando",
        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
      }
      SSocket.send(object, true);
      return <View />
    }
    var obj = data[key];
    if (this.props.onLoad) this.props.onLoad(obj);
    if (!obj) return <View />
    // <SImage src={SSocket.api.root + "paquete/" + paquete.key} />

    // var urlImage = SSocket.api.root + "paquete/" + obj.key;
    return (
      <TouchableOpacity style={{
        width: "100%",
        backgroundColor: STheme.color.card,
        height: 50,
        marginBottom: 8,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        padding: 4,
      }} onPress={() => {
        // if (obj.url) {
        // console.log(obj)
        if (this.props.onPress) this.props.onPress(key);
        // }
      }}>
        <View style={{
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
          overflow: "hidden",
          width: 40,
          height: 40,
          backgroundColor: STheme.color.card
        }}>
          {/* <SImage src={urlImage} /> */}
          <SImage src={SSocket.api.root + "paquete/" + obj.key} />

        </View>
        <View style={{
          flex: 4,
          height: 20,
          justifyContent: "center",
          // alignItems: "center"
          paddingStart: 8,
        }}>
          <Text style={{
            fontSize: 14,
            color: STheme.color.text
          }}>{obj.descripcion}</Text>
        </View>
        {/* tarea3 */}
        <View><SText col={"xs-12"} fontSize={14} font={"Roboto"} >#per: {obj.participantes} dias: {obj.dias}</SText></View>
        <View style={{
          flex: 2,
          height: 20,
          justifyContent: "center",
          alignItems: "center",
          paddingStart: 8,
        }}>
          <Text style={{
            fontSize: 14,
            color: STheme.color.text
          }}>Bs. {(obj.precio).toLocaleString('en-IN')}</Text>
        </View>

      </TouchableOpacity>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(Paquete);