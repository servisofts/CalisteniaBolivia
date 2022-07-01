import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SPage, SText, STheme, SView } from 'servisofts-component';
import Caja from '../../../..';

class PopupConfirmarCierre extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {

        return (
            <SView col={"xs-12 md-8 xl-6"}
                withoutFeedback
                style={{
                    maxHeight: "90%",
                    height: 600,
                    borderRadius: 8,
                    backgroundColor: STheme.color.background,
                }}>
                {SPage.backgroundComponent}
                <SView col={"xs-12"} height center style={{
                    padding: 8,
                }}>
                    <SText fontSize={16}>Cerrar la caja!</SText>
                    <SView col={"xs-12"} center >
                        <SView col={"xs-12"} center flex row>
                            <SView col={"xs-6"} center flex>
                                <SView col={"xs-4"} colSquare onPress={() => {
                                    this.props.onSelect("mantener");
                                }}>
                                    <SIcon name={"Money"} />
                                </SView>
                                <SText>Dejar efectivo</SText>
                            </SView>
                            <SView col={"xs-6"} center flex>
                                <SView col={"xs-4"} colSquare onPress={() => {
                                    this.props.onSelect("banco");
                                }}>
                                    <SIcon name={"Card"} />
                                </SView>
                                <SText>Enviar a banco</SText>
                            </SView>
                        </SView>
                        <SHr />
                        <SView col={"xs-10"} center>
                            <SView col={"xs-12"} row center >
                                <SIcon name={"Money"} style={{
                                    width: 20,
                                    height: 20,
                                }} />
                                <SText color={STheme.color.darkGray} fontSize={10}>Mantener efectivo en caja.</SText>
                                <SText color={STheme.color.darkGray} fontSize={10}>(Normalmente al medio día)</SText>
                            </SView>
                            <SHr />
                            <SView col={"xs-12"} row center >
                                <SIcon name={"Card"} style={{
                                    width: 20,
                                    height: 20,
                                }} />
                                <SText color={STheme.color.darkGray} fontSize={10}>Realizar el depocito en la cuenta!</SText>
                                <SText color={STheme.color.darkGray} fontSize={10}>(Normalmente al finalizar el día)</SText>
                            </SView>
                        </SView>
                    </SView>
                </SView>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(PopupConfirmarCierre);