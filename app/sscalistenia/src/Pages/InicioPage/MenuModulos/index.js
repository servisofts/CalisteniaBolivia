import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Svg from '../../../Svg';

export default class MenuModulos extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getItems = () => {
        return [
            { descripcion: "Usuarios", icon: "Usuarios", route: "UsuarioPage" },
            // { descripcion: "Finanzas", icon: "Finanza" },
            { descripcion: "Servisofts", icon: "Ssmenu", route: "ServisoftsPage" },
            { descripcion: "Ajustes", icon: "Ajustes" , route: "UsuarioPerfilPage"},
        ].map((obj) => {
            return (<TouchableOpacity style={{
                width: 130,
                height: 130,
                margin: 4,
            }} onPress={() => {
                if (obj.route) {
                    this.props.navigation.navigate(obj.route);
                }
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Svg name={obj.icon} style={{
                        width: "90%",
                        height: "90%",
                    }} />
                </View>
                <View style={{
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={{
                        color: "#ffffff",
                        fontSize: 14,
                        // fontFamily: "myFont"
                    }}>{obj.descripcion}</Text>
                </View>

            </TouchableOpacity>)
        })

    }
    getItems2 = () => {
        return [
            { descripcion: "Calistenia", icon: "Bar", },
            // { descripcion: "Finanzas", icon: "Finanza" },
            { descripcion: "Boxeo", icon: "Boxeo", },
            { descripcion: "Snack", icon: "Carrito" },
        ].map((obj) => {
            return (<TouchableOpacity style={{
                width: 130,
                height: 130,
                margin: 4,
            }} onPress={() => {
                if (obj.route) {
                    this.props.navigation.navigate(obj.route);
                }
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Svg name={obj.icon} style={{
                        width: "90%",
                        height: "90%",
                    }} />
                </View>
                <View style={{
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={{
                        color: "#ffffff",
                        fontSize: 14,
                        // fontFamily: "myFont"
                    }}>{obj.descripcion}</Text>
                </View>
                <View style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#000000dd",
                    borderRadius: 20,
                    alignItems:"center",
                    justifyContent:"center"
                }}>
                    <Svg resource={require("../../../img/lock.svg")} style={{
                        width:30,
                        height:30,
                    }}/>
                </View>
            </TouchableOpacity>)
        })

    }
    render() {
        return (
            <View style={{
                width: "100%",
                height: 300,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <ScrollView style={{
                    width: "100%",
                    height: 150,
                }} horizontal={true}
                    contentContainerStyle={{
                        minWidth: "100%",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    {this.getItems()}
                </ScrollView>
                <ScrollView style={{
                    width: "100%",
                    height: 150,
                }} horizontal={true}
                    contentContainerStyle={{
                        minWidth: "100%",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    {this.getItems2()}
                </ScrollView>

            </View>
        );
    }
}
