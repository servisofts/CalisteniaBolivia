import moment from 'moment';
import React, { Component } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../Params';
import { SDate, SView } from '../../../SComponent'
import AnimatedLines from './AnimatedLines';
const delay = ms => new Promise(res => setTimeout(res, ms));
class RelojCaja extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
        };
        this.anim = new Animated.Value(0);
    }

    componentDidMount() {
        this.isRun = true;
        this.getActiva();
        this.contar();
    }
    getActiva() {
        var reducer = this.props.state.cajaReducer;
        var data = reducer.usuario[this.props.state.usuarioReducer.usuarioLog.key];
        if (this.getCajaActiva()) return;
        if (reducer.lastGetActiva) return;
        var obj = {
            component: "caja",
            type: "getActiva",
            estado: "cargando",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key
        }
        this.props.state.socketReducer.session[AppParams.socket.name].send(obj, true);
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

    getCajaActiva() {
        var reducer = this.props.state.cajaReducer;
        var data = reducer.usuario[this.props.state.usuarioReducer.usuarioLog.key];
        return data;
    }
    getTime() {

        var time = new SDate(this.entrenamiento.fecha_on).diffTime(new SDate());
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
                    <Text style={{ color: "#000", fontSize: 17, }}>{hh}</Text>
                </SView>
                <SView height={17} style={{ justifyContent: "flex-end", }}>
                    <Text style={{ color: "#000", fontSize: 12 }}>{"h "}</Text>
                </SView>
                <SView height={17} style={{ justifyContent: "flex-end", }}>
                    <Text style={{ color: "#000", fontSize: 17, }}>{mm}</Text>
                </SView>
                <SView height={17} style={{ justifyContent: "flex-end", }}>
                    <Text style={{ color: "#000", fontSize: 12 }}>{"m "}</Text>
                </SView>
                <SView height={17} style={{ justifyContent: "flex-end", }}>
                    <Text style={{ color: "#000", fontSize: 17 }}>{ss}</Text>
                </SView>
                <SView height={17} style={{ justifyContent: "flex-end", }}>
                    <Text style={{ color: "#000", fontSize: 12 }}>{"s "}</Text>
                </SView>

                <Text style={{ color: "#666", fontSize: 9, position: "absolute", bottom: 2, }}>{"Caja abierta"}</Text>
                {/* <Text style={{ color: "#666", fontSize: 10, position: "absolute", bottom: 4, }}>{new SDate(this.props.inicio).toString("yyyy-MM-dd hh:mm:ss")}</Text> */}
            </View>
        </AnimatedLines>
    }

    render() {
        var data = this.getCajaActiva();
        if (!data) return <View />;
        if (!data.key) return <View />;
        this.entrenamiento = data;
        return (
            <SView style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 100,
                height: 45,
                backgroundColor: "#fff",
            }} onPress={() => {
                if (this.props.navigation) {
                    this.props.navigation.navigate("CajaPage");
                }
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
export default connect(initStates)(RelojCaja);