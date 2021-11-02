import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native'
import { SImage, SLoad, SPage, SText, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Servicio from '..';
type Props = {
    key_servicio: string,
    onPress: Function,
}
class Item extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        if (!this.props.key_servicio) return <View />;
        var obj = Servicio.Actions.getByKey(this.props.key_servicio, this.props);
        if (!obj) return <SLoad />
        return (
            <TouchableOpacity style={{
                width: "90%",
                maxWidth: 600,
                height: 50,
                margin: 4,
                borderRadius: 10,
                backgroundColor: "#66000044"
            }} onPress={() => {
                if (this.props.onPress) this.props.onPress(obj);
                // if (this.onSelect) {
                //     this.onSelect(obj);
                //     this.props.navigation.goBack();
                //     return;
                // }
                // this.props.navigation.navigate("SucursalRegistroPage", {
                //     key: key
                // })
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: "center"
                }}>
                    <View style={{
                        flexDirection: "row",
                        height: "100%",
                        width: "100%",
                        alignItems: "center",
                    }}>
                        <View style={{
                            width: 40,
                            height: 40,
                            marginLeft: 4,
                            marginRight: 8,
                            justifyContent: "center",
                            alignItems: "center",
                            // padding: 1,
                            // borderRadius: 200,
                            backgroundColor: "#ff999933",
                            borderRadius: 4,
                            overflow: "hidden"
                        }}>
                            <SImage src={SSocket.api.root + "servicio_" + this.props.key_servicio} />
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: "center"
                        }}>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "#fff",
                                textTransform: "capitalize",
                                textDecorationLine: (obj.estado != 1 ? "line-through" : "none")
                            }}>{obj["descripcion"] + " "}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Item);