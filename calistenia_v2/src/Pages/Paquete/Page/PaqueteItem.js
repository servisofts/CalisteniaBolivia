import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native'
import { SImage, SLoad, SPage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Paquete from '..';
type Props = {
    key_paquete: string,
    onPress: Function,
}
class PaqueteItem extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        if (!this.props.key_paquete) return <View />;
        var obj = Paquete.Actions.getByKey(this.props.key_paquete, this.props);
        if (!obj) return <SLoad />
        return (
            <TouchableOpacity style={{
                width: "90%",
                maxWidth: 600,
                height: 50,
                margin: 4,
                borderRadius: 10,
                backgroundColor: STheme.color.card
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
                            backgroundColor: STheme.color.card,
                            borderRadius: 4,
                            overflow: "hidden"
                        }}>
                            <SImage src={SSocket.api.root + "paquete/" + this.props.key_paquete + "?date=" + new Date().getTime()} />
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: "center"
                        }}>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: "bold",
                                color: STheme.color.text,
                                textTransform: "capitalize",
                                textDecorationLine: (obj.estado != 1 ? "line-through" : "none")
                            }}>{obj["descripcion"] + " "}</Text>
                        </View>
                        <SView col={"xs-2"} >
                            <SText fontSize={8}><SText fontSize={12}>{obj.participantes}</SText> personas</SText>
                            <SText fontSize={8}><SText fontSize={12}>{obj.dias}</SText> dias</SText>
                        </SView>
                        <SView col={"xs-3"} center>
                            <SText bold center>Bs. {(obj.precio ? obj.precio : 0).toLocaleString('en-IN')}</SText>
                        </SView>
                    </View>
                </View>
            </TouchableOpacity >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(PaqueteItem);