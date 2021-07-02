import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SSRolesPermisosGetPages, SSRolesPermisosValidate } from '../../../SSRolesPermisos';
import Svg from '../../../Svg';
import SSCrollView from '../../../Component/SScrollView';
import AppParams from '../../../Params';
import Buscador from '../../../Component/Buscador';
import SOrdenador from '../../../Component/SOrdenador';

export default class ListaPaquetes extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getItems = () => {
        let reducer = this.props.state.paqueteReducer;
        let data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando") return <ActivityIndicator color={"#fff"} />
            if (reducer.estado == "error") return <Text>ERROR</Text>
            var object = {
                component: "paquete",
                type: "getAll",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return <View />
        }
        // var pages = {
        //     as: {
        //         url: "UsuarioPage",
        //         key: "as",
        //         descripcion: "Usuario Page"
        //     }
        // }
        if (!this.state.buscador) {
            return <View />
        }
        return new SOrdenador([
            { key: "Peso", order: "desc", peso: 4 },
            { key: "Descripcion", order: "asc", peso: 2 },
        ]).ordernarObject(
            this.state.buscador.buscar(data)

        ).map((key) => {
            var obj = data[key];
            // console.log(obj)
            var urlImage = AppParams.urlImages + "paquete_" + obj.key;
            // if (!SSRolesPermisosValidate({ page: obj.url, permiso: "ver" })) {
            //     return <View />
            // }
            return (<TouchableOpacity style={{
                width: "96%",
                backgroundColor: "#66000044",
                height: 50,
                marginBottom: 8,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                padding: 4,
            }} onPress={() => {
                // if (obj.url) {
                // console.log(obj)
                this.props.navigation.navigate("PaqueteRegistroPage", {
                    key: key,
                });
                // }
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
                    {this.props.state.imageReducer.getImage(urlImage, {
                        resizeMode: "cover",
                        objectFit: "cover"
                    })}
                </View>
                <View style={{
                    flex: 6,
                    height: 20,
                    justifyContent: "center",
                    // alignItems: "center"
                    paddingStart: 8,
                }}>
                    <Text style={{
                        color: "#ffffff",
                        fontSize: 14,
                    }}>{obj.descripcion}</Text>
                </View>
                <View style={{
                    flex: 1,
                    height: 20,
                    justifyContent: "center",
                    // alignItems: "center"
                    paddingStart: 8,
                }}>
                    <Text style={{
                        color: "#ffffff",
                        fontSize: 14,
                    }}>{obj.participantes}</Text>
                </View>
                <View style={{
                    flex: 1,
                    height: 20,
                    justifyContent: "center",
                    // alignItems: "center"
                    paddingStart: 8,
                }}>
                    <Text style={{
                        color: "#ffffff",
                        fontSize: 14,
                    }}>{obj.dias}</Text>
                </View>
                <View style={{
                    flex: 2,
                    height: 20,
                    justifyContent: "center",
                    // alignItems: "center"
                    paddingStart: 8,
                }}>
                    <Text style={{
                        color: "#ffffff",
                        fontSize: 14,
                    }}>Bs. {(obj.precio).toLocaleString('en-IN')}</Text>
                </View>

            </TouchableOpacity>)
        })
        // return [
        //     { descripcion: "RRHH", icon: "Usuarios", route: "RRHHPage" },
        //     { descripcion: "Usuarios", icon: "Usuarios", route: "UsuarioPage" },
        //     { descripcion: "Roles", icon: "Usuarios", route: "RolPage" },
        //     { descripcion: "Paginas", icon: "Usuarios", route: "PermisoPagePage" },
        //     { descripcion: "Servisofts", icon: "Ssmenu", route: "ServisoftsPage" },
        //     { descripcion: "Ajustes", icon: "Ajustes", route: "UsuarioPerfilPage" },
        // ].map((obj) => {

        // })

    }

    render() {
        return (
            <View style={{
                width: "100%",
                // flexWrap: "wrap",
                // flexDirection: "row",
                alignItems: "center"

            }}>
                <Buscador ref={(ref) => {
                    if (!this.state.buscador) this.setState({ buscador: ref });
                }} repaint={() => { this.setState({ ...this.state }) }} />
                {this.getItems()}
                <View style={{
                    width: "100%",
                    height: 50,
                }}></View>
            </View>
        );
    }
}
