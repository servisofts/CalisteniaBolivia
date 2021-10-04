import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SIcon, SText, SView } from 'servisofts-component';
// import Svg from '../../../../Svg';

export default class TipoMovimiento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selec: this.props.value,
            tipos: {
                'ingreso': {
                    icon: "Ingreso",
                    label: 'Ingreso'
                },
                'egreso': {
                    icon: "Egreso",
                    label: 'Egreso'
                },
                'traspaso': {
                    icon: "Traspaso",
                    label: 'Traspaso'
                },
            }
        };
    }

    getSelect(key) {
        // if (this.state.selec == key) return <View />
        return <SView style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            maxWidth: 70,
            backgroundColor: "#000000",
        }} center>

        </SView>
    }
    getTipo(tipo) {
        var obj = this.state.tipos[tipo];
        return <SView col={"xs-4"} center onPress={() => {
            if (this.props.onChange) this.props.onChange(tipo);
            this.setState({ selec: tipo })
        }}>
            <SView width={50} height={50}>
                <SIcon name={obj.icon} />
            </SView>
            <SText>{obj.label}</SText>
            {this.getSelect(tipo)}
        </SView>
    }
    render() {
        return (
            <SView col={"xs-11 md-7 xl-6"} row>

                {this.getTipo("ingreso")}
                {this.getTipo("egreso")}
                {this.getTipo("traspaso")}
            </SView>
        );
    }
}
