import { Component } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { SIcon, SImage, SNavigation, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import RelojCaja from '../../Pages/Caja/Page/RelojCaja';
import LogoAnimado from '../../Pages/CargaPage/LogoAnimado';
import RelojEntrenamiento from '../../Pages/Entrenamiento/Pages/EntrenamientoPage/Entrenamiento/RelojEntrenamiento';
// import RelojEntrenamiento from '../../Pages/EntrenamientoPage/Entrenamiento/RelojEntrenamiento';
// import AppParams from '../../Params';
// import Svg from '../../Svg';
// import SImage from '../SImage';

class BarraSuperior extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anim: new Animated.Value(100),
    };

  }

  startAnimation() {
    Animated.timing(this.state.anim, {
      toValue: 100,
      duration: !this.props.duration ? 300 : this.props.duration,
      useNativeDriver: true,
    }).start();
  }
  componentDidMount() {
    // this.startAnimation();
  }

  getUser() {
    if (!Model.usuario.Action.getKey()) {
      return <View />
    }
    return (<>
      <View style={{
        width: 50,
        height: "100%",
        justifyContent: "center",
        // borderRadius:,
        borderBottomEndRadius: 30,
        borderTopLeftRadius: 8,
        overflow: "hidden",
        // alignItems:"center"

      }}>
        <TouchableOpacity style={{
          width: "100%",
          height: "100%",

        }} onPress={() => {
          SNavigation.navigate("perfil")
          // this.props.navigation.navigate("UsuarioPerfilPage")
        }}>
          <SImage src={SSocket.api.root + "usuario/" + this.props.state.usuarioReducer.usuarioLog.key} style={{
            width: "100%",
            height: "100%",
          }} />
          {/* {this.props.state.imageReducer.getImage(AppParams.urlImages + "usuario_" + this.props.state.usuarioReducer.usuarioLog.key, {
                        width: "100%",
                        height: "100%",
                    })} */}
          {/* <SImage source={require("../../img/postgres.png")} style={{
                        width: "90%",
                        height: "90%",
                        resizeMode: "contain"
                    }} /> */}

        </TouchableOpacity>
      </View>
      <View style={{
        position: "absolute",
        bottom: 2,
        right: 2,
        width: 14,
        height: 14,
        borderRadius: 100,
        backgroundColor: "#090"
      }}>
      </View>
    </>
    )
  }
  getTitle() {
    var text = ""
    if (this.props.title) {
      text = this.props.title;
    }
    return (<Text style={{
      // fontSize: 12,
      color: STheme.color.text,
      fontWeight: "bold",
      // fontFamily:"myFont"
    }}>{text}</Text>)
  }
  getBack() {
    if (this.props.preventBack) {
      return <View />
    }
    // if (!SNavigation.lastRoute) {
    //     return <View />
    // }
    // if (!SNavigation.lastRoute.navigation.canGoBack()) {
    //     return <View />
    // }
    return <SView width height style={{
      justifyContent: 'center',
    }}>
      <SView onPress={() => {
        SNavigation.goBack();
      }} style={{
        maxWidth: 35,
      }} center height>
        <SIcon width={25} height={25} name={"Arrow"} fill={STheme.color.text} />
      </SView>
    </SView>
  }
  render() {
    if (Model.usuario.Action.getKey()) {
      Model.usuarioPage.Action.getPermiso({ url: "/", permiso: "ver" })
    }
    return (
      <Animated.View style={{
        width: "100%",
        height: 45,
        flexDirection: "row",

        transform: [
          {
            translateY: this.state.anim.interpolate({
              inputRange: [0, 100],
              outputRange: [-45, 0]
            })
          }
        ]
      }}>
        <View style={{
          width: 135,
          height: "100%",
          position: "absolute",
          right: 0,
          backgroundColor: "#fff",
        }}>
        </View>
        <View style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: STheme.color.barColor,
          borderBottomEndRadius: 30,
          // borderWidth: 1,
          // overflow: "hidden",
        }}>
          <SView height width={50} center>
            {this.getBack()}
          </SView>
          <View style={{
            flex: 1,

            justifyContent: "center",
            // alignItems: "center"
          }}>
            {this.getTitle()}

          </View>
          {this.getUser()}


        </View>

        <View style={{
          width: 100,
          padding: 4,
        }}>
          <LogoAnimado fill={"#222222"} duration={1000} />


        </View>
        {/* <RelojEntrenamiento navigation={this.props.navigation} /> */}
        <RelojCaja navigation={this.props.navigation} />
      </Animated.View>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(BarraSuperior);