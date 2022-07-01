import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native'
import { SImage, SLoad, SPage, SText, STheme } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Sucursal from '..';
import TipoPago from '..';
type Props = {
    key_tipo_pago: string,
    onPress: Function,
}
class TipoPagoItem extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        if (!this.props.key_tipo_pago) return <View />;
        var obj = TipoPago.Actions.getByKey(this.props.key_tipo_pago, this.props);
        if (!obj) return <SLoad />
        return (
            <TouchableOpacity style={{
                width: "90%",
                maxWidth: 600,
                height: 50,
                margin: 4,
                borderRadius: 10,
                backgroundColor: STheme.color.card
            }} >
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
                            width: 45,
                            height: 45,
                            marginRight: 8,
                            justifyContent: "center",
                            alignItems: "center",
                            // padding: 1,
                            // borderRadius: 200,
                            overflow: "hidden"
                        }}>
                            {TipoPago.Actions.getIcon(this.props.key_tipo_pago)}
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: "center"
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                color: STheme.color.card,
                                textTransform: "capitalize"
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
export default connect(initStates)(TipoPagoItem);