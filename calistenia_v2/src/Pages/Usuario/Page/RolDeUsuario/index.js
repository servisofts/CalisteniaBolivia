import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { SImage, SLoad, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Model from '../../../../Model';
import { SSRolesPermisosValidate } from '../../../../SSRolesPermisos';

const RolDeUsuario = (props) => {
    if (!props.data) return <View />;
    if (!props.data.key) return <View />;

    if (!SSRolesPermisosValidate({ page: "UsuarioPage", permiso: "ver_rol" })) {
        return <View />
    }
    var data = Model.rol.Action.getAll();
    if (!data) {
        return <SLoad />
    }


    var key_usuario = props.data.key;
    if (!key_usuario) {
        return <SLoad />
    }
    var usuarioRol = Model.usuarioRol.Action.getAllByKeyUsuario(key_usuario)
    if (!usuarioRol) {
        return <SLoad />
    }
    var arr_rol = Object.values(usuarioRol);
    const getRoles = () => {
        var isAddSuperUsuario = SSRolesPermisosValidate({ page: "UsuarioPage", permiso: "add_rol_super_usuario" })
        var Lista = Object.keys(data).map((key) => {
            var obj = data[key];
            var isActivo = false;
            if (key == "01726154-c439-4d63-99a1-0615d9e15f15") {
                if (!isAddSuperUsuario) {
                    return <View />
                }
            }
            isActivo = arr_rol.find((a) => a.key_rol == key)
            if (!isActivo?.estado) {
                isActivo = false;
            }
            if (props.preventEdit && !isActivo) {
                return null;
            }
            return <TouchableOpacity style={{
                width: "40%",
                maxWidth: 170,
                height: 160,
                margin: 8,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: STheme.color.card,
                backgroundColor: STheme.color.card,
                // padding:4,

            }}
                onPress={() => {
                    if (props.preventEdit) return null;
                    if (SSRolesPermisosValidate({ page: "UsuarioPage", permiso: "editar_rol", isAlert: true })) {
                        if (!isActivo) {
                            var object = {
                                service: "roles_permisos",
                                component: "usuarioRol",
                                type: "registro",
                                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                                estado: "cargando",
                                data: {
                                    key_rol: key,
                                    key_usuario: props.data.key,
                                }
                            }
                            SSocket.send(object);
                        } else {
                            var object = {
                                service: "roles_permisos",
                                component: "usuarioRol",
                                type: "editar",
                                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                                estado: "cargando",
                                data: { ...isActivo, estado: 0 }
                            }
                            SSocket.send(object);
                        }
                    }
                    // props.navigation.navigate("PermisoCrearPage", { key: objPermiso.key });
                }}>
                <View style={{
                    flex: 1
                }}>
                    <View style={{
                        padding: 8,
                        backgroundColor: STheme.color.card,
                        height: 120,
                        borderRadius: 8,
                        overflow: "hidden"
                    }}>
                        <SImage src={SSocket.api.rp + "rol/" + obj.key} />
                        {/* {props.state.imageReducer.getImage(AppParams.servicios["roles_permisos"] + "rol/" + obj.key, {})} */}
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Text style={{
                            fontSize: 16,
                            textAlign: "center",
                            fontWeight: "bold",
                            color: STheme.color.secondary
                        }}>{obj.descripcion}</Text>
                    </View>
                </View>
                {(isActivo ? <View /> : <View style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: 8,
                    backgroundColor: "#000000dd",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: STheme.color.text
                    }}>Activar</Text>
                </View>)}
            </TouchableOpacity>
        })
        return <SView row center>
            {Lista}
        </SView>
    }
    // var pagina = props.state.usuarioPageReducer.data["UsuarioPage"];
    // if (!pagina) {
    //     return <View />;
    // }
    // if (!pagina.permisos["editar_roles"]) {
    //     return <View />;
    // }
    return <SView style={{
    }}>
        <Text style={{
            padding: 8,
            fontSize: 12,
            color: STheme.color.darkGray,
            width: "100%",
            textAlign: "center"
        }}>{props.title ? props.title : "Tipos de usuario"}</Text>
        {getRoles()}
    </SView>
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RolDeUsuario);