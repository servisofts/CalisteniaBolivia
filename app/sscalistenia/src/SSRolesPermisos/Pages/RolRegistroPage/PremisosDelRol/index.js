import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import ActionButtom from '../../../../Component/ActionButtom';
import AppParams from '../../../../Params';
import STheme from '../../../../STheme';

const PermisosDelRol = (props) => {
    var data = props.state.pageReducer.data;
    if (!data) {
        if (props.state.pageReducer.estado == "cargando") {
            return <Text>Cargando</Text>
        }
        var object = {
            component: "page",
            type: "getAll",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
        }
        props.state.socketReducer.session[AppParams.socket.name].send(object, true);
        return <View />
    }
    var key_rol = props.data.key;
    var rolPermiso = props.state.rolPermisoReducer.rol[key_rol];
    if (!rolPermiso) {
        if (props.state.rolPermisoReducer.estado == "cargando") {
            return <Text>Cargando</Text>
        }
        var object = {
            component: "rolPermiso",
            type: "getAll",
            estado: "cargando",
            key_rol: props.data.key,
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
        }
        props.state.socketReducer.session[AppParams.socket.name].send(object, true);
        return <View />
    }

    const getPermisos = (key_page) => {
        var permisos = props.state.permisoReducer.data[key_page];
        if (!permisos) {
            if (props.state.permisoReducer.estado == "cargando") {
                return <Text>Cargando</Text>
            }
            var object = {
                component: "permiso",
                type: "getAll",
                estado: "cargando",
                key_page: key_page,
                key_usuario: props.state.usuarioReducer.usuarioLog.key
            }
            props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return <View />
        }
        var Lista = Object.keys(permisos).map((key) => {
            var objPermiso = permisos[key];
            // fetch(AppParams.urlImages + "permiso/" + objPermiso.key)

            if (objPermiso.key_page != key_page) {
                return <View />
            }
            var permisoActivo = false;
            if (rolPermiso[objPermiso.key]) {
                var key_rol_permiso = rolPermiso[objPermiso.key]
                permisoActivo = props.state.rolPermisoReducer.data[key_rol_permiso];
                if (permisoActivo.estado == 0) {
                    permisoActivo = false;
                }

            }
            return <TouchableOpacity style={{
                margin: 4,
                width: 50,
                height: 70,
            }} onPress={() => {
                if (!permisoActivo) {
                    var object = {
                        component: "rolPermiso",
                        type: "registro",
                        estado: "cargando",
                        key_usuario: props.state.usuarioReducer.usuarioLog.key,
                        data: {
                            key_rol: props.data.key,
                            key_permiso: objPermiso.key
                        }
                    }
                    props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                } else {
                    var object = {
                        component: "rolPermiso",
                        type: "editar",
                        estado: "cargando",
                        key_usuario: props.state.usuarioReducer.usuarioLog.key,
                        data: { ...permisoActivo, estado: 0 }
                    }
                    props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                }
                // props.navigation.navigate("PermisoCrearPage", { key: objPermiso.key });
            }}>
                <View style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    borderColor: STheme.color.card,
                    overflow: 'hidden',
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}>
                    {props.state.imageReducer.getImage((AppParams.servicios["roles_permisos"] + "permiso/" + objPermiso.key), {
                        position: "absolute",
                    })}

                    {(permisoActivo ? <View /> : <View style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#00000099",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Text style={{
                            fontSize: 12,
                            color: "#fff",
                            fontWeight: "bold",
                        }}>Activar</Text>
                    </View>)}
                </View>
                <Text style={{
                    width: "100%",
                    textAlign: "center",
                    fontSize: 10,
                    color: STheme.color.text
                }}>{objPermiso.descripcion}</Text>
            </TouchableOpacity>
        })
        return <View style={{
            flexDirection: "row",
        }}>
            {Lista}
        </View>
    }
    const getLista = () => {
        var Lista = Object.keys(data).map((key) => {
            var obj = data[key];
            return <View style={{
                justifyContent: "center",
                // alignItems: "center",
                backgroundColor: STheme.color.card,
                borderRadius: 8,
                padding: 4,
                // borderBottomWidth: 1,
                // borderColor: "#ddd",
                height: 140,
                marginBottom: 8,
            }}>
                <Text style={{
                    fontSize: 18,
                    color: STheme.color.text
                }}>{obj.descripcion}</Text>
                <Text style={{
                    fontSize: 10,
                    color: STheme.color.text
                }}>{obj.url}</Text>
                {/* <Text style={{
                    fontSize: 12,
                    color: "#666",
                }}> {JSON.stringify(rolPermiso)}</Text> */}

                <ScrollView horizontal={true}>
                    <View style={{
                        padding: 8,
                    }}>
                        {getPermisos(obj.key)}

                    </View>
                </ScrollView>
            </View>
        })
        return <View style={{
            // flexDirection: "row",
        }}>
            {Lista}
        </View>
    }


    return <View style={{
        marginTop: 32,
        width: "96%",
        maxWidth: 1080,
        borderRadius: 8,
        // backgroundColor: "#fff",
        padding: 4,
        minHeight: 400,
        marginBottom: 32,

    }}>
        <Text style={{
            fontSize: 14,
            padding: 4,
            color: "#999",
            width: "100%",
            textAlign: "center"
        }}>Permisos del rol</Text>

        {getLista()}

    </View>
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(PermisosDelRol);