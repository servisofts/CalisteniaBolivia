
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import { SDate, SText, SView } from 'servisofts-component';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.animation = new Animated.Value(0);
    }

    getLineProgreso = () => {
        var fecha_inicio = new SDate(this.props.data.fecha_inicio);
        var fecha_fin = new SDate(this.props.data.fecha_fin);

        var maxDay = fecha_inicio.diff(fecha_fin);
        var fecha_actual = new SDate();
        var faltantes = fecha_actual.diff(fecha_fin);
        var progressDay = maxDay - faltantes;
        this.animation.setValue(faltantes / maxDay);
        return <View style={{
            width: "100%",
            // backgroundColor: '#66000044',
            borderRadius: 10,
        }}>
            <SView col={"xs-12"} row>
                <SView col={"xs-6"}>
                    <SText fontSize={10} style={{ color: "#999" }}>{new SDate(this.props.data.fecha_inicio, "yyyy-MM-dd").toString("dd de MONTH, yyyy")}</SText>
                </SView>
                <SView col={"xs-6"} style={{
                    alignItems: 'flex-end',
                }}>
                    <SText fontSize={10} style={{ color: "#999" }}>{new SDate(this.props.data.fecha_fin, "yyyy-MM-dd").toString("dd de MONTH, yyyy")}</SText>
                </SView>
            </SView>
            <SView height={8} />
            <View style={{
                width: "100%",
                height: 10,
                backgroundColor: '#00000044',
                alignItems: "flex-end",
                overflow: 'hidden',
                borderRadius: 10,

            }}>
                <Animated.View style={{
                    width: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0%", "100%"],
                    }),
                    height: 10,
                    borderRadius: 10,
                    backgroundColor: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["#660000", "#006600"],
                    }),
                }}>

                </Animated.View>
            </View>
        </View >

    }
    render() {
        return (
            <SView col={"xs-12"} style={{
                borderRadius: 5,
                // backgroundColor: '#66000044',
            }} >
                {/* <SText>{JSON.stringify(this.props.paquete)}</SText> */}

                <SView col={"xs-12"}>
                    {this.getLineProgreso()}
                </SView>
            </SView>
        );
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);