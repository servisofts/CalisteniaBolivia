import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Page from '../../../Component/Page';
import AppParams from '../../../Params';
import { SScrollView2, SText, SView } from '../../../SComponent';
class TipoPagoPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getAll() {
        var reducer = this.props.state.tipoPagoReducer;
        var data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando") return false;
            var object = {
                component: "tipoPago",
                type: "getAll",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return false;
        }
        return data;
    }
    getLista() {
        var data = this.getAll();
        if (!data) return <ActivityIndicator color={"#fff"} />
        return Object.keys(data).map((key) => {
            var obj = data[key];
            if (obj)
                return <SView props={{
                    col: "xs-11 md-7 xl-4",
                }} style={{
                    marginTop: 8,
                    height: 50,
                    backgroundColor: "#66000044",
                    borderRadius: 4,
                }}>
                    <SText style={{ color: "#fff" }}>{obj.descripcion}</SText>
                </SView>
        })
    }
    render() {

        return (<Page navigation={this.props.navigation} title={"Tipos de pago"}>
            <SScrollView2 disableHorizontal>
                <SView props={{
                    variant: "center"
                }}>
                    {this.getLista()}
                </SView>
            </SScrollView2>
        </Page>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(TipoPagoPage);