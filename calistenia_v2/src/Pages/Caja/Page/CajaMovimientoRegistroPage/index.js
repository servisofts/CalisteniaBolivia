import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SForm, SNavigation, SPage, SScrollView2, SView } from 'servisofts-component'
import { connect } from 'react-redux';
import FotoPerfilComponent from '../../../../Components/FotoPerfilComponent/index';
import TipoMovimiento from './TipoMovimiento';
import SSocket from 'servisofts-socket';

let ReducerName = "cajaMovimientoReducer";
let component = "cajaMovimiento";

class CajaMovimientoRegistroPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            tipoSelect: "1"
        };
        this.key_caja = SNavigation.getParam("key_caja", null);
        // if (!key) {
        //     this.data = {};
        // } else {
        //     this.data = this.props.state["bancoReducer"].data[key];
        // }

    }

    render() {
        if (!this.key_caja) SNavigation.goBack();
        var reducer = this.props.state[ReducerName]
        if (reducer.estado == "exito" && reducer.type == "registro") {
            reducer.estado = "";
            SNavigation.goBack();
        }
        if (reducer.estado == "exito" && reducer.type == "editar") {
            reducer.estado = "";
            SNavigation.goBack();
        }
        return (
            <SPage title={"Nuevo Movimiento"}
            >
                <SScrollView2
                    style={{ width: "100%" }}
                    disableHorizontal
                >
                    <SView col={"xs-12"} center>
                        <SView col={"xs-12"} style={{ height: 36 }}></SView>
                        <SView col={"xs-12 md-8 xl-4"} center>
                            <TipoMovimiento value={this.state.tipoSelect} onChange={(tipo) => {
                                this.setState({ tipoSelect: tipo })
                            }} />
                            <SView col={"xs-12"} style={{ height: 32 }}></SView>
                            <SForm
                                props={{
                                    center: true,
                                    // variant: "center",
                                    col: "xs-11",
                                    // direction: "row",
                                }}
                                inputProps={{
                                    customStyle: "calistenia",
                                }}
                                inputs={{
                                    monto: {
                                        type: 'money',
                                        label: 'monto',
                                        placeholder: '0.00',
                                        isRequired: true,
                                        col: "xs-9",

                                    },
                                    descripcion: {
                                        type: 'text',
                                        label: 'motivo',
                                        isRequired: true,
                                        col: "xs-12",
                                        multiline: true,
                                        style: {
                                            height: 100
                                        }
                                    },

                                }}
                                onSubmitProps={{
                                    type: (this.state.tipoSelect != "1" ? "danger" : "success")
                                }}
                                onSubmit={(data) => {
                                    var object = {
                                        component: component,
                                        type: "registro",
                                        estado: "cargando",
                                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                        data: {
                                            ...data,
                                            key_caja: this.key_caja,
                                            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                            monto: data.monto * (this.state.tipoSelect != "1" ? -1 : 1),
                                        },
                                    }
                                    SSocket.send(object, true);
                                }}
                                onSubmitName={(this.state.tipoSelect != "1" ? "Egreso" : "Ingreso")}
                            />
                        </SView>
                    </SView>
                </SScrollView2>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(CajaMovimientoRegistroPage);