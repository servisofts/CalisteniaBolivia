import moment from 'moment';
import React, { Component } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { SDate, SNavigation, SText, SView } from 'servisofts-component'
import AnimatedLines from './AnimatedLines';
import SSocket from 'servisofts-socket'
const delay = ms => new Promise(res => setTimeout(res, ms));
class RelojEntrenamiento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
        };
        this.anim = new Animated.Value(0);
    }

    componentDidMount() {
        this.isRun = true;
        this.contar();
    }

    contar = async () => {
        Animated.timing(this.anim, {
            toValue: this.anim._value + 10,
            duration: (1000) / 5,
            useNativeDriver: true
        }).start(() => {
            this.setState({ time: new Date() });
            if (this.isRun) {
                this.contar();
            }
        });
        // if (!this.isRun) return false;
        // this.contar();
    }
    componentWillUnmount() {
        this.isRun = false;
    }

    getEntrenamientoUsuario() {
        var reducer = this.props.state.entrenamientoReducer;
        var data = reducer.entrenamiento;
        if (!data) {
            if (reducer.estado == "cargando") return;
            var objSend = {
                component: "entrenamiento",
                type: "getByKeyUsuario",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key
            }
            SSocket.send(objSend);
            // this.props.state.socketReducer.session[AppParams.socket.name].send(objSend, true);
            return;
        }
        return data;
    }
    getTime() {

        var time = new SDate(this.entrenamiento.fecha_inicio).diffTime(new SDate());
        // var time = 202023043449340000;
        var s = Math.floor(time / 1000);
        var ss = s % 60;
        ss = ss < 10 ? '0' + ss : ss;
        var m = Math.floor(s / 59);
        var mm = m % 60;
        mm = mm < 10 ? '0' + mm : mm;
        var h = Math.floor(m / 59);
        var hh = h % 24;
        // hh = hh < 10 ? '0' + hh : hh;
        var d = Math.floor(h / 23);

        // var hh = Math.floor(time / (1000 * 60 * 60))
        // var mm = Math.floor(time / (1000 * 60));
        // var ss = Math.floor((time / 1000) % 60);

        var decimas = 0

        return <AnimatedLines layout={{
            width: 100,
            height: 40,
        }}>
            <Text style={{ color: "#666", fontSize: 9, }}>{"Tiempo entrenando"}</Text>
            <View style={{
                width: "100%",
                height: "100%",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
            }}>
                {/* <SView></SView> */}
                <SView height={17} style={{ justifyContent: "flex-end", }}>
                    <SText style={{ fontSize: 17, }}>{hh}</SText>
                </SView>
                <SView height={17} style={{ justifyContent: "flex-end", }}>
                    <SText style={{ fontSize: 12 }}>{"h "}</SText>
                </SView>
                <SView height={17} style={{ justifyContent: "flex-end", }}>
                    <SText style={{ fontSize: 17, }}>{mm}</SText>
                </SView>
                <SView height={17} style={{ justifyContent: "flex-end", }}>
                    <SText style={{ fontSize: 12 }}>{"m "}</SText>
                </SView>
                <SView height={17} style={{ justifyContent: "flex-end", }}>
                    <SText style={{ fontSize: 17 }}>{ss}</SText>
                </SView>
                <SView height={17} style={{ justifyContent: "flex-end", }}>
                    <SText style={{ fontSize: 12 }}>{"s "}</SText>
                </SView>

                {/* <Text style={{ color: "#666", fontSize: 10, position: "absolute", bottom: 4, }}>{new SDate(this.props.inicio).toString("yyyy-MM-dd hh:mm:ss")}</Text> */}
            </View>
        </AnimatedLines>
    }

    render() {
        if (!this.props.state.usuarioReducer.usuarioLog) {
            return <View />
        }
        var data = this.props.data;
        if (!data) return <View />;
        if (!data.key) return <View />;
        this.entrenamiento = data;
        return (
            <SView style={{
                width: 100,
                height: 45,
                // backgroundColor: "#fff",
            }} card onPress={() => {
                SNavigation.navigate("EntrenamientoPage")
            }
            }>
                {this.getTime()}
            </SView>
        );
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RelojEntrenamiento);