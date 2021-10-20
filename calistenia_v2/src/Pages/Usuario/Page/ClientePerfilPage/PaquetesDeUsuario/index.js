import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { SText, SView, SButtom, SLoad, SPopup, SPopupClose, SPopupOpen, SOrdenador, SImage, SPage, SIcon, SNavigation } from 'servisofts-component';
import Paquete_Item from './Paquete_Item';
import { SSRolesPermisosValidate } from '../../../../../SSRolesPermisos';
import SSocket from 'servisofts-socket';
import Sucursal from '../../../../Sucursal';
import Usuario from '../../..';
class PaquetesDeUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        this.getCaja()
    }
    getCaja() {
        var obj = {
            component: "caja",
            type: "getActiva",
            estado: "cargando",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key
        }
        SSocket.send(obj, true);
        // return null;
    }
    getPaquete(key) {
        let reducer = this.props.state.paqueteReducer;
        let data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando") return false;
            if (reducer.estado == "error") return false;
            var object = {
                component: "paquete",
                type: "getAll",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            }
            SSocket.send(object, true);
            return false;
        }
        return data[key];
    }
    getSucursal(key_sucursal) {

        var data = Sucursal.Actions.getAll(this.props);
        if (!data) return <View />
        var obj = data[key_sucursal]
        if (!obj) return <View />
        return <SView>
            <SText color={"#666"}>Sucursal: {obj.descripcion}</SText>
        </SView>
    }
    getUsuario(key_usuario) {
        var data = Usuario.Actions.getAll(this.props);
        if (!data) return <View />
        var obj = data[key_usuario]
        if (!obj) return <View />
        return <SView>
            <SText color={"#666"}>Admin: {obj.Nombres}</SText>
        </SView>
    }
    getEliminar(obj) {
        if (!SSRolesPermisosValidate({ page: "PaqueteVentaPage", permiso: "anular_venta" })) {
            if (!this.caja) {
                return <View />
            }
            if (this.caja.key != obj.key_caja) {
                return <View />
            }
        }
        var reducer = this.props.state.paqueteVentaReducer;
        if (reducer.estado == "error") {
            reducer.estado = "";
            SPopup.alert(reducer.error);
        }
        return <SButtom
            style={{
                width: 30,
                height: 30,
            }}
            props={{
                variant: "confirm",
                type: "danger",
            }}
            onPress={() => {
                var objSen = {
                    component: "paqueteVenta",
                    type: "eliminar",
                    estado: "cargando",
                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                    data: obj
                }
                SSocket.send(objSen, true);
            }}>
            <SIcon name={"Delete"} style={{
                width: 19,
                height: 19,
            }} />
        </SButtom>
    }
    getLista() {
        var reducer = this.props.state.paqueteVentaReducer;
        var data = reducer.usuario[this.props.key_usuario];
        if (!data) {
            if (reducer.estado == "cargando") return <ActivityIndicator color={"#fff"} />
            if (reducer.estado == "error") return <Text>ERROR</Text>
            var object = {
                component: "paqueteVenta",
                type: "getAllByUsuario",
                estado: "cargando",
                key_usuario: this.props.key_usuario
            }
            SSocket.send(object, true);
            return <View />
        }

        return new SOrdenador([
            { key: "Peso", order: "desc", peso: 4 },
            { key: "fecha_inicio", order: "desc", peso: 1 },
        ]).ordernarObject(
            data
        ).map((key) => {
            var obj = data[key];
            var paquete = this.getPaquete(obj.key_paquete);
            var urlImagePaquete = SSocket.api.root + "paquete_" + obj.key_paquete+`?date=${new Date().getTime()}`;
            if (!paquete) {
                return <SLoad />
            }
            return <TouchableOpacity style={{
                width: "96%",
                backgroundColor: "#66000044",
                height: 100,
                marginBottom: 8,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
            }} onPress={() => {
                // if (obj.url) {
                // console.log(obj)
                // this.props.navigation.navigate("PaqueteRegistroPage", {
                //     key: key,
                // });
                // }
            }}>
                <View style={{
                    flex: 1,
                    width: "100%",
                    flexDirection: "row",
                    padding: 4,

                }}>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 4,
                        overflow: "hidden",
                        width: 40,
                        height: 40,
                        backgroundColor: "#ff999933"
                    }}>
                        <SImage src={urlImagePaquete} />
                        {/* {this.props.state.imageReducer.getImage(urlImagePaquete, {
                            resizeMode: "cover",
                            objectFit: "cover"
                        })} */}
                    </View>
                    <View style={{
                        flex: 4,
                        // justifyContent: "center",
                        // alignItems: "center"
                        paddingStart: 8,
                        height: "100%",
                    }}>
                        <Text style={{
                            color: "#ffffff",
                            fontSize: 14,
                        }}>{paquete.descripcion}</Text>
                        {this.getSucursal(obj.key_sucursal)}
                        {this.getUsuario(obj.key_usuario)}
                    </View>
                    <View style={{
                        flex: 1,
                        height: "100%",
                        justifyContent: "center",
                        // alignItems: "center"
                    }}>
                        <Text style={{
                            color: "#ffffff",
                            fontSize: 14,
                        }}>Bs. {obj.monto}</Text>
                    </View>

                    {/* <View style={{
                        flex: 2,
                        justifyContent: "center",
                        // alignItems: "center"
                        paddingStart: 8,
                    }}>
                        <Text style={{
                            color: "#ffffff",
                            fontSize: 10,
                        }}>Desde: {SDateFormat(obj.fecha_inicio)}</Text>
                        <Text style={{
                            color: "#ffffff",
                            fontSize: 10,
                        }}>Hasta: {SDateFormat(obj.fecha_fin)}</Text>
                    </View> */}
                    {this.getEliminar(obj)}
                </View>
                <Paquete_Item data={obj} paquete={paquete} />
            </TouchableOpacity>
        })
    }
    getBtnAdd = () => {
        return <TouchableOpacity style={{
            width: "96%",
            backgroundColor: "#66000044",
            height: 50,
            marginBottom: 8,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
        }} onPress={() => {
            if (!this.caja) {
                SPopupOpen({
                    key: "errorPaquete",
                    content: (
                        <SView col={"xs-11 md-8"} backgroundColor={"#000000"} center style={{ height: 200, borderRadius: 8, }}>
                            {SPage.backgroundComponent}
                            <SView style={{
                                width: "100%",
                                height: "100%",
                            }} center>
                                <SText style={{ fontSize: 16, }}>No tiene una caja abierta.</SText>
                                <SText style={{ fontSize: 12, }}>Dirijase a caja y abra una caja para continuar.</SText>
                                <SButtom props={{ type: "outline" }} onPress={() => {
                                    this.props.navigation.navigate("CajaPage")
                                    SPopupClose("errorPaquete");
                                }}>Ir a caja</SButtom>
                            </SView>
                        </SView>
                    )
                })
                return;
            }

            this.props.navigation.navigate("PaquetePage", {
                type: "select",
                onSelect: (obj) => {
                    SNavigation.goBack();
                    this.props.navigation.navigate("ClientePaqueteRegistroPage", {
                        key_usuario: this.props.key_usuario,
                        key_paquete: obj.key,
                    });
                }
            });
        }}>
            <Text style={{
                color: "#fff",
                textDecorationLine: "underline",
            }}>Nuevo paquete</Text>
        </TouchableOpacity>
    }
    render() {
        this.caja = this.props.state.cajaReducer.usuario[this.props.state.usuarioReducer.usuarioLog.key];
        return (
            <View style={{
                width: "100%",
                alignItems: "center",
                marginTop: 16,
            }}>
                {this.getBtnAdd()}
                {this.getLista()}
            </View>
        );
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(PaquetesDeUsuario);