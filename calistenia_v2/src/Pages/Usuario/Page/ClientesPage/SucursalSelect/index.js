import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import { connect } from 'react-redux';
import { SImage, SNavigation, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';

class SucursalSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.sucursal
        };
        this.animatedSelec = new Animated.Value(0);

    }
    startAnimated() {
        Animated.loop(
            Animated.timing(this.animatedSelec, {
                toValue: 1,
                delay: 0,
                duration: 1000,
            }),
            { iterations: 1000 },
        ).start();
    }


    getSucursal() {
        if (!this.state.key_sucursal) {
            if (!this.state.value) {
                this.startAnimated();
                return <SView animated style={{
                    flex: 1,
                    height: "100%",
                    backgroundColor: this.animatedSelec.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["#66000044", "#66000000"],
                    }),

                }} props={{
                    animated: true,
                }} center>
                    <SText style={{ color: "#fff", fontSize: 14, }}>{"Seleccione una sucursal"}</SText>
                </SView>
            }
        } else {
            var data = this.props.state.sucursalReducer.data;
            if (!data) {
                if (this.props.state.sucursalReducer.estado == "cargando") {
                    return <Text>Cargando</Text>
                }
                var object = {
                    component: "sucursal",
                    type: "getAll",
                    estado: "cargando",
                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                }
                SSocket.send(object, true);
                return <View />
            }

            if (!this.state.value) {
                if (this.props.setSucursal) {
                    this.state.value = data[this.state.key_sucursal];

                    this.props.setSucursal(data[this.state.key_sucursal])
                    return <View />;
                }
            }
        }

        return <>
            <SView style={{ width: 50, height: 50, }} center>
                <View style={{
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    // padding: 1,
                    // borderRadius: 200,
                    backgroundColor: "#ff999933",
                    borderRadius: 100,
                    overflow: "hidden"
                }}>
                    <SImage src={SSocket.api.root + "sucursal_" + this.state.value.key+`?date=${new Date().getTime()}`} />
                </View>
            </SView>
            <SView style={{ flex: 1, height: "100%" }} center>
                <SText style={{ color: "#fff", fontSize: 14, }}>{this.state.value.descripcion}</SText>
                <SText style={{ color: STheme.color.darkGray, fontSize: 12, }}>{this.state.value.direccion}</SText>
            </SView>
            <SView style={{ width: 50, height: 50, }} ></SView>
        </>
    }
    render() {
        this.state.value = this.props.sucursal;
        this.state.key_sucursal = this.props.key_sucursal;
        return (
            <SView col="xs-11 md-6 xl-4" center row style={{
                height: 50,
                backgroundColor: "#66000044",
                borderRadius: 8,
            }} onPress={() => {
                if (this.props.key_caja) {
                    return;
                }
                SNavigation.navigate("SucursalPage", {
                    onSelect: (sucursal) => {
                        if (this.props.setSucursal) {
                            this.props.setSucursal(sucursal)
                            return;
                        }
                        this.setState({ value: sucursal });

                    }
                });
            }}>
                <SText style={{
                    position: "absolute",
                    right: 4,
                    top: 0,
                    color: STheme.color.darkGray,
                    fontSize: 10,
                }}>Sucursal</SText>

                {this.getSucursal()}
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(SucursalSelect);