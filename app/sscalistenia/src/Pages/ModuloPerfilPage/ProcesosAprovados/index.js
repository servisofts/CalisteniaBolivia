import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SSwipeList from '../../../Component/SSwipeList';
import AppParams from '../../../Params';
class ProcesosAprovados extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getLista() {
        var data = this.props.state.procesoReducer.data[this.props.data.key];

        if (!data) {
            if (this.props.state.procesoReducer.estado == "cargando") {
                return <ActivityIndicator color={"#Fff"} />
            }
            if (this.props.state.procesoReducer.estado == "error") {
                return <ActivityIndicator color={"#Fff"} />
            }
            var object = {
                component: "proceso",
                type: "getAll",
                estado: "cargando",
                key_modulo: this.props.data.key,
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            }
            // alert(JSON.stringify(object));
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return <ActivityIndicator color={"#Fff"} />
        }
        return Object.keys(data).map((key) => {
            var obj = data[key];
            if (obj.estado == 0) {
                return false;
            }
            return <View style={{
                width: "100%",
                // height:50,
                padding: 4,
            }} obj={obj}>
                <TouchableOpacity style={{
                    width: "100%",
                    // height: "100%",
                    borderBottomColor: "#444",
                    borderBottomWidth: 1,
                    flexDirection: "row",
                    // backgroundColor: "#fff",
                }} onPress={() => {
                    this.props.navigation.navigate("ProcesoPerfilPage", { data: obj });
                }}>
                    <View style={{
                        width: 50,
                        // marginStart: 4,
                        borderRadius: 12,
                        overflow: 'hidden',
                    }}>
                        {this.props.state.imageReducer.getImage(AppParams.urlImages + "proceso_" + obj.key, {
                            width: 45,
                            height: 45,
                        })}
                    </View>
                    <View style={{
                        flex: 1,
                        marginStart: 8,
                    }}>
                        <Text style={{
                            color: "#fff"
                        }}>{obj.descripcion}</Text>
                        <Text style={{
                            fontSize: 10,
                            color: "#666"
                        }}>{obj.observacion}</Text>
                        <Text style={{
                            fontSize: 10,
                            color: "#666"
                        }}>{obj.fecha_on}</Text>
                    </View>
                    <View style={{
                        width: 50,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <View style={{
                            width: 35,
                            height: 35,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: "#666"
                        }}>
                            {this.props.state.imageReducer.getImage(AppParams.urlImages + "usuario_" + obj.key_usuario, {
                                width: "100%",
                                height: "100%",
                            })}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        })
    }
    render() {
        if (!this.props.data) {
            return <ActivityIndicator color={"#fff"} />
        }
        if (this.props.state.procesoReducer.estado == "exito" && this.props.state.procesoReducer.type == "editar") {
            this.props.state.procesoReducer.estado = "";
            this.setState({ ...this.state });
            return <ActivityIndicator color={"#fff"} />
        }
        return (
            <View style={{
                width: "100%",
                flex: 1,
            }}>

                <SSwipeList style={{
                    marginTop: 90,
                    height: Dimensions.get("window").height * 0.65,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                    leftAction={(obj, evt) => {
                        // console.log("action leftContent")
                        // valor = glup.ofertas[obj].key
                        // console.log(valor);
                        // btnOpenModal("ModalOfertarMeAyudas")
                        // alert(obj)

                        evt.reset();
                    }}
                    leftContent={(obj, key) => {
                        return <View style={{
                            width: "100%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            paddingRight: "10%",
                            backgroundColor: "#f00"
                        }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: Dimensions.get("window").height * 0.019
                            }}>
                                NEGOCIAR
                        </Text>
                        </View>
                    }}
                    rigthAction={(obj, evt) => {
                        obj.estado = 0;
                        var object = {
                            component: "proceso",
                            type: "editar",
                            estado: "cargando",
                            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                            data: obj
                        }
                        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                        evt.reset();
                    }}
                    rigthContent={(obj, key) => {
                        return <View style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#C31C37",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            paddingLeft: "10%",
                        }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: Dimensions.get("window").height * 0.019
                            }}>
                                ELIMINAR
                        </Text>
                        </View>
                    }}>
                    {this.getLista()}
                </SSwipeList>
                {/* <ScrollView style={{
                    position: "absolute",
                    marginTop: 50,
                    height: Dimensions.get("window").height * 0.65,
                    width: "100%",
                }} contentContainerStyle={{
                    // height:"100%"
                    paddingBottom: 100,
                }}>

                </ScrollView> */}
                <TouchableOpacity style={{
                    position: "absolute",
                    width: "100%",
                    top: 40,
                    height: 50,
                    padding: 4,
                }} onPress={() => {
                    this.props.navigation.navigate("ProcesoRegistroPage", { data: this.props.data });
                }}>
                    <View style={{
                        width: "100%",
                        height: "100%",
                        borderBottomColor: "#444",
                        borderBottomWidth: 1,
                        justifyContent: "center",
                        alignItems: "center"
                        // backgroundColor: "#fff",
                    }}>
                        <Text style={{
                            color: "#fff"
                        }}>Agregar proceso</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ProcesosAprovados);