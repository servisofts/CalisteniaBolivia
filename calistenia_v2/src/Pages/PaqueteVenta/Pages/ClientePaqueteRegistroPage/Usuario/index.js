import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { SImage, SLoad } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Usr from '../../../../Usuario';

class Usuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        if (!this.props.key_usuario) {
            return <TouchableOpacity style={{
                width: "96%",
                backgroundColor: "#66000066",
                height: 50,
                marginBottom: 8,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                padding: 4,
            }} onPress={() => {
                this.props.onPress()
            }}>
                <Text style={{
                    fontSize: 12,
                    color: "#fff",
                }}>{"Inserta un usuario"}</Text>
            </TouchableOpacity>
        }
        var obj = Usr.Actions.getByKey(this.props.key_usuario, this.props);
        if (!obj) {
            return <SLoad/>
        }
        this.obj = obj;
        this.props.onLoad(obj);
        return (
            <TouchableOpacity style={{
                width: "96%",
                backgroundColor: "#66000066",
                height: 50,
                marginBottom: 8,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                padding: 4,
            }} onPress={() => {
                this.props.onPress()
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: "center"
                }}>
                    <View style={{
                        flexDirection: "row",
                        height: "100%",
                        width: "100%",
                        alignItems: "center"
                    }}>
                        <View style={{
                            width: 40,
                            height: 40,
                            marginRight: 8,
                            justifyContent: "center",
                            alignItems: "center",
                            // padding: 1,
                            // borderRadius: 200,
                            backgroundColor: "#ff999933",
                            borderRadius: 100,
                            overflow: "hidden"
                        }}>
                            <SImage src={SSocket.api.root + "usuario_" + obj.key} />
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: "center"
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                color: "#fff",
                                textTransform: "capitalize",
                                textDecorationLine: (obj.estado == 0 ? "line-through" : "none"),
                            }}>{obj["Nombres"] + " " + obj["Apellidos"]}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Usuario);