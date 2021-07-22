import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../../../Component/BackgroundImage';
import DeleteBtn from '../../../Component/DeleteBtn';
import STextImput from '../../../Component/STextImput';
import AppParams from '../../../Params';
import { SView, SText, SPopupClose, SPopupOpen } from '../../../SComponent';
import ConfirmacionUsuario from './ConfirmacionUsuario';

class ConfirmarPaquete extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    sendServer(data) {
        // var correoNew = this.correoI.getValue();
        // if (correoNew != usuario.Correo) {

        //     var object = {
        //         component: "usuario",
        //         type: "editar",
        //         version: "2.0",
        //         key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        //         estado: "cargando",
        //         cabecera: "registro_administrador",
        //         data: {
        //             ...usuario,
        //             Correo: correoNew
        //         },
        //     }
        //     this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
        // }
        var object = {
            component: "paqueteVenta",
            type: "registro",
            estado: "cargando",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            data,
            clientes: this.props.data.usuariosData,
        }
        // alert(JSON.stringify(object));
        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);

        SPopupClose("confirmarPaquete");
    }
    getTextDetail({ label, value }) {
        return <Text style={{ color: "#fff", marginBottom: 8, }}>{label}: {value}</Text>
    }
    getUsuarios() {
        return this.props.data.usuariosData.map((obj) => {
            return <SView style={{
                width: 80,
                height: 80,
                alignItems: "center",
            }} onPress={() => {
                SPopupOpen({
                    key: "ConfirmacionUsuario",
                    content: <ConfirmacionUsuario data={obj} />
                })
            }}>
                <View style={{
                    width: 50,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#ff999933",
                    borderRadius: 100,
                    overflow: "hidden"
                }}>
                    {this.props.state.imageReducer.getImage(AppParams.urlImages + "usuario_" + obj.key, {
                        width: "100%",
                        objectFit: "cover",
                        resizeMode: "cover",

                    })}
                </View>
                <SText props={{
                    type: "primary"
                }} style={{
                    textAlign: "center"
                }}>{obj["Nombres"]} {obj["Apellidos"]}</SText>
            </SView>
        })
    }
    render() {
        // var usuario = this.props.state.usuarioReducer.data["registro_administrador"][this.props.data.key_usuario];
        var paquete = this.props.state.paqueteReducer.data[this.props.data.key_paquete];
        return (
            <SView props={{
                col: "xs-11 md-8 xl-4",
                withoutFeedback:true,
            }} style={{
                borderRadius:8,
            }}>
                <BackgroundImage contraste={"#66000044"} />
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
                                col: "xs-6",
                                style: {
                                    height: 40,
                                }
                            }}>
                                <SText props={{
                                    type: "primary",
                                    variant: "h4"
                                }}>{paquete.descripcion}</SText>
                            </SView>
                            <SView props={{
                                col: "xs-6",
                                variant: "center",
                                style: {
                                    height: 40,
                                }
                            }}>
                                <SText props={{
                                    type: "primary",
                                    variant: "h4"
                                }}>Bs. {paquete.precio}</SText>
                            </SView>

                            <SView props={{
                                col: "xs-6",
                                variant: "center",
                                style: {
                                    height: 25,
                                }
                            }}>
                                <SText props={{
                                    type: "primary"
                                }}># De días: {paquete.dias}</SText>
                            </SView>

                            <SView props={{
                                col: "xs-6",
                                variant: "center",
                                style: {
                                    height: 25,
                                }
                            }}>
                                <SText props={{
                                    type: "primary"
                                }}># Personas: {paquete.participantes}</SText>

                            </SView>
                            <SView props={{
                                col: "xs-6",
                                variant: "center",
                                style: {
                                    height: 25,
                                }
                            }}>
                                <SText props={{
                                    type: "primary"
                                }}>Desde {this.props.data.fecha_inicio}</SText>
                            </SView>
                            <SView props={{
                                col: "xs-6",
                                variant: "center",
                                style: {
                                    height: 25,
                                }
                            }}>
                                <SText props={{
                                    type: "primary"
                                }}>hasta {this.props.data.fecha_fin}</SText>
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
                    <View style={{ alignItems: "center" }}>
                        <DeleteBtn title={"Pagar"} style={{ width: 100, height: 40, }} onDelete={() => {
                            this.sendServer({
                                descripcion: "",
                                // key_usuario: usuario.key,
                                key_paquete: paquete.key,
                                fecha_inicio: this.props.data.fecha_inicio,
                                fecha_fin: this.props.data.fecha_fin,
                                monto: paquete.precio,
                                nombre_paquete: paquete.descripcion
                            })
                        }} />
                    </View>
                </View>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ConfirmarPaquete);