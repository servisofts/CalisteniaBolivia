import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SText, SView } from 'servisofts-component';
import TiposDePago from './TiposDePago';

export default class Parametros extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        if (!this.props.data) return <View />
        if (!this.props.data.key) {
            return <View />
        }
        return (
            <SView col={"xs-12"} center>
                <SView col={"xs-11 md-6 xl-4"}>
                    <SText style={{
                        marginStart: 8,
                        fontSize: 16,
                    }}>Parametros</SText>
                    <SText style={{
                        marginStart: 8,
                        color: '#666666',
                        fontSize: 10
                    }}>Selecciona las cuentas de banco para el arqueo de caja, segun el tipo de pago.</SText>
                    <TiposDePago key_sucursal={this.props.data.key} />
                </SView>
            </SView>
        );
    }
}
