import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Animated } from "react-native";
import { SButtom, SDate, SGradient, SHr, SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, STheme, SView } from 'servisofts-component';
import Parent from ".."
class EsperandoHuella extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.animColor = new Animated.Value(0);
    }

    componentDidMount() {
        this.props.state.lector_huellaReducer.lastEvent = null;
        Parent.Actions.solicitudRegistroHuella(this.props.data, this.props);
    }
    fadeIn(val) {
        Animated.timing(this.animColor, {
            toValue: val,
            duration: 150,
            useNativeDriver: true
        }).start(() => {
            this.fadeOut();
        });
    }
    fadeOut() {
        Animated.timing(this.animColor, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true
        }).start();
    }

    getContent() {
        var reducer = Parent.Actions._getReducer(this.props);
        if (reducer.estado == "cargando") {
            return <SLoad />
        }
        if (reducer.type == "solicitud_registro_huella" && reducer.estado == "error") {
            reducer.estado = "";
            SPopup.alert(reducer.error);
            SNavigation.goBack();
            return null;
        }
        var reducerUsuario = this.props.state.usuario_huellaReducer;
        var reducer = this.props.state.lector_huellaReducer;
        var data = this.props.data;

        if (reducerUsuario.estado == "exito" && reducerUsuario.type == "registro") {
            var lr = reducerUsuario.lastRegister;
            if (lr.key_sucursal == this.props.data.key_sucursal) {
                reducerUsuario.estado = ""
                SNavigation.goBack();
                return <SText>{"EXITO AL REGISTRAR"}</SText>
            }
        }
        if (reducer.lastEvent) {
            if (reducer.lastEvent.estado == "exito") {
                reducer.lastEvent.estado = "";
                this.fadeIn(1);
                // return <SText>{`INTENTO # ${reducer.lastEvent?.data?.i}`}</SText>
            } else if (reducer.lastEvent.estado == "error") {
                reducer.lastEvent.estado = "";
                this.fadeIn(-1);
                // return <SText>{"ERROR INTENTE NUEVAMENTE"}</SText>
            }
            data = reducer.lastEvent
        }
        return <SText>{"COLOQUE SU HUELLA EN EL SENSOR"}</SText>

    }
    getSensor() {
        return <SView style={{
            width: 200,
            height: 200,
        }}>
            <SView animated col={"xs-12"} colSquare style={{
                borderRadius: 8, overflow: 'hidden',
                backgroundColor: this.animColor.interpolate({
                    inputRange: [-1, 0, 1],
                    outputRange: [STheme.color.danger, STheme.color.card, STheme.color.text]
                }),
            }} center>
                <SView col={"xs-12"} center height>
                    <SIcon name="Fp" width={"60%"} fill={"#666"} />
                </SView>
            </SView>
        </SView>
    }
    render() {
        this.props.state.lector_huellaReducer.key_sucursal = this.props.data?.key_sucursal
        return (
            <SView col={"xs-12"} center>
                <SHr />
                <SHr />
                {this.getContent()}
                <SHr />
                <SHr />
                {this.getSensor()}
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(EsperandoHuella);