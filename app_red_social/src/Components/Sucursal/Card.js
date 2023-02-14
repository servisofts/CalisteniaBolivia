import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SIcon, SImage, SPage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import BarraCargando from '../BarraCargando';
export type SucursalCardPropsType = {
    data: any,
    onPress?: (obj) => {},
}
class index extends Component<SucursalCardPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handlePress() {
        if (!this.props.onPress) return null;

        this.props.onPress(this.props.data)
    }
    _buildMessage(pedido) {
        switch (pedido.state) {
            case "pagado":
                return "Esperando la hora de entrega."
            case "pago_en_proceso":
                return "Pago en proceso."
            default:
                return pedido.state;
        }
    }

    render() {
        //  var { image, state, nombre } = this.props.data;
        return (
            <SView col={"xs-12"} row>
                        <SView col={"xs-12"} row height={130} backgroundColor={STheme.color.card} style={{ borderRadius: 24, }} onPress={this.props.onPress}>
                            <SView col={"xs-12"} center height >
                                <SView col={"xs-12"} height={130} style={{
                                    borderRadius: 8,
                                    backgroundColor: STheme.color.card,
                                    overflow: 'hidden',
                                }}>
                                    <SImage enablePreview src={require('../../Assets/img/s'+this.props.image+'.jpg')} width={"100%"} height={"100%"}
                                        style={{
                                            resizeMode: 'cover',
                                        }}
                                    />
                                </SView>
                            </SView>
                        </SView>
                        <SView col={"xs-12"} flex style={{ alignItems: "flex-end", bottom: -85, right: 10 }} >
                            <SView>
                                <SText fontSize={15} color={STheme.color.white}>{this.props.nombre}</SText>
                            </SView>
                            <SHr />
                            <SIcon name={"Vineta1"} height={12} width={6} stroke={STheme.color.white}></SIcon>
                        </SView>
                        <SView col={"xs-12"} row >
                            <SText style={{ alignItems: "flex-end", top: -20, right: 25 }} flex fontSize={10} color={STheme.color.white}>Av. La barranca 3er anillo frente al surtidor Genex</SText>
                        </SView>
                    </SView>

        );
    }
}
export default (index);