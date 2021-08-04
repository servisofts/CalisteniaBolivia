import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../../../Component/BackgroundImage';
import DeleteBtn from '../../../Component/DeleteBtn';
import STextImput from '../../../Component/STextImput';
import AppParams from '../../../Params';
import { SView, SText, SPopupClose, SPopupOpen, SButtom, SScrollView2 } from '../../../SComponent';
import Svg from '../../../Svg';
import TiposDePago from '../../TipoPago/TiposDePago';
import ConfirmacionUsuario from './ConfirmacionUsuario';

class ConfirmarPaquete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmados: {

            }
        };
    }

    sendServer(data) {
        var clientes = this.props.data.usuariosData.map((obj, i) => {
            var tsk = this.props.data.tasks[i];
            console.log(tsk);
            return {
                ...obj,
                fecha_inicio: tsk.fecha.toString("yyyy-MM-dd"),
                fecha_fin: tsk.fecha.addDay(tsk.dias).toString("yyyy-MM-dd"),
            }
        });

        var object = {
            component: "paqueteVenta",
            type: "registro",
            estado: "cargando",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            data,
            clientes: clientes,
        }
        // alert(JSON.stringify(object));
        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);

        // SPopupClose("confirmarPaquete");
    }
    getTextDetail({ label, value }) {
        return <Text style={{ color: "#fff", marginBottom: 8, }}>{label}: {value}</Text>
    }
    getIsConfirm(val) {
        if (!val) {
            return <SView
                props={{
                    variant: "center"
                }}
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#000000aa",
                    padding: 16
                }}>
                <Svg name={"Cerrar"} />
            </SView>
        }
        return <SView>

        </SView>
    }
    getUsuarios() {

        return this.props.data.usuariosData.map((obj) => {
            var isConfirmado = false;
            if (this.state.confirmados[obj.key]) {
                isConfirmado = true;
            }
            return <SView style={{
                width: 80,
                height: 80,
                alignItems: "center",
            }} onPress={() => {
                SPopupOpen({
                    key: "ConfirmacionUsuario",
                    content: <ConfirmacionUsuario data={obj} onConfir={(usr) => {
                        this.state.confirmados[usr.key] = usr
                        this.setState({ ...this.state })
                    }} />
                })
            }}>
                <View style={{
                    width: 50,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 100,
                    overflow: "hidden"
                }}>
                    {this.props.state.imageReducer.getImage(AppParams.urlImages + "usuario_" + obj.key, {
                        width: "100%",
                        objectFit: "cover",
                        resizeMode: "cover",

                    })}
                    {this.getIsConfirm(isConfirmado)}

                </View>
                <SText props={{
                    type: "primary"
                }} style={{
                    textAlign: "center"
                }}>{obj["Nombres"]} {obj["Apellidos"]}</SText>

            </SView>
        })
    }
    getPagar() {
        if (!this.paquete) {
            return <View />
        }
        if (this.paquete.participantes != Object.keys(this.state.confirmados).length) {
            return <SView props={{
                col: "xs-10 md-8"
            }}>
                <SText props={{ type: "primary" }} style={{
                    textAlign: "center"
                }}>Presion sobre cada usuario para confirmar sus datos para el recibo.</SText>
            </SView>
        }
        if (!this.state.tipoPago && this.paquete.precio > 0) {
            return <SView props={{
                col: "xs-10 md-8"
            }}>
                <SText props={{ type: "primary" }} style={{
                    textAlign: "center"
                }}>Seleccione el metodo de pago.</SText>
            </SView>
        }
        return <SButtom props={{
            type: "danger",
            variant: "confirm"
        }} onPress={() => {
            this.sendServer({
                descripcion: "",
                // key_usuario: usuario.key,
                key_paquete: this.paquete.key,

                monto: this.paquete.precio,
                nombre_paquete: this.paquete.descripcion
            })
        }} >Pagar</SButtom>
    }
    getTiposPago() {
        if (!this.paquete) {
            return <View />
        }
        if (this.paquete.precio <= 0) {
            return <View />
        }
        return <TiposDePago value={this.state.tipoPago} onChange={(tipo) => {
            this.setState({ tipoPago: tipo });
        }} />
    }
    render() {
        if (this.props.state.paqueteVentaReducer.estado == "exito" && this.props.state.paqueteVentaReducer.type == "registro") {
            this.props.state.paqueteVentaReducer.estado = "";
            var onFInish = this.props.navigation.getParam("onFinish")
            if (onFInish) {
                onFInish();

            }
            this.props.navigation.goBack();
        }
        // var usuario = this.props.state.usuarioReducer.data["registro_administrador"][this.props.data.key_usuario];
        var paquete = this.props.state.paqueteReducer.data[this.props.data.key_paquete];
        this.paquete = paquete;
        return (
            <SView props={{
                col: "xs-11.5 md-8 xl-6",
                withoutFeedback: true,
            }} style={{
                borderRadius: 8,
                maxHeight: "100%",
                height: 450,
            }}>
                <SScrollView2 disableHorizontal>
                    <View style={{
                        width: "100%",
                        flex: 1,
                        borderRadius: 10,
                        overflow: "hidden",
                        alignItems: "center",
                        paddingBottom: 8,

                    }}>
                        <View style={{
                            width: "100%",
                            padding: 8,
                            flex: 1,
                            alignItems: "center",
                            // justifyContent: "center"
                        }}>
                            <Text style={{ color: "#fff", fontSize: 18, marginBottom: 16 }}>{"Verifica los datos del recibo!"}</Text>
                            <View style={{
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 4,
                                overflow: "hidden",
                                width: 60,
                                height: 60,
                                backgroundColor: "#ff999933"
                            }}>
                                {this.props.state.imageReducer.getImage(AppParams.urlImages + "paquete_" + paquete.key, {
                                    resizeMode: "cover",
                                    objectFit: "cover"
                                })}
                            </View>
                            <SView props={{
                                col: "xs-12",
                                direction: "row",
                            }} style={{
                                justifyContent: "center"
                            }}>
                                <SView props={{
                                    variant: "center",
                                    col: "xs-12",
                                }}>
                                    <SText props={{
                                        type: "primary",
                                        variant: "h4"
                                    }}>{paquete.descripcion}</SText>
                                </SView>
                                <SView props={{
                                    col: "xs-12",
                                    variant: "center",
                                }}>
                                    <SText props={{
                                        type: "primary",
                                        variant: "h4"
                                    }}>Bs. {paquete.precio}</SText>
                                </SView>
                                <SView props={{
                                    col: "xs-12 md-8 xl-6",
                                    variant: "center",
                                }} style={{
                                    minHeight: 50,
                                }}>
                                    {this.getTiposPago()}

                                </SView>

                                <SView props={{
                                    col: "xs-12",
                                    direction: "row"
                                }} style={{
                                    marginTop: 8,
                                    justifyContent: "space-evenly",
                                    alignItems: "center"
                                }}>
                                    {this.getUsuarios()}
                                </SView>
                            </SView>

                        </View>
                        <View style={{ alignItems: "center", paddingBottom: 8, }}>
                            {this.getPagar()}
                        </View>
                    </View>
                </SScrollView2>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ConfirmarPaquete);