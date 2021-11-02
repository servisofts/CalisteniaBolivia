import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import TipoGasto from '..';
import FloatButtom from '../../../Component/FloatButtom';
import Page from '../../../Component/Page';
import { SForm, SScrollView2, SText, SView } from '../../../SComponent';

class TipoGastoRegistroPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getLista() {
        if (TipoGasto.getEstado(this.props) == "exito" && TipoGasto.getType(this.props) == "registro") {
            this.props.state.tipoGastoReducer.estado = "";
            this.props.navigation.goBack();
            return <View />
        }
        return <SForm
            props={{
                variant: "center",
                col: "xs-11 md-6 xl-4",
            }}
            inputProps={{
                customStyle: "calistenia",
            }}
            inputs={{
                monto: {
                    type: 'money',
                    label: 'monto',
                    placeholder: '0.00',
                    isRequired: true,
                    col: "xs-12",

                },
                descripcion: {
                    type: 'text',
                    label: 'motivo',
                    isRequired: true,
                    col: "xs-12",
                    multiline: true,
                    style: {
                        height: 100
                    }
                },
            }}
            // onSubmitProps={{
            //     type: (this.state.tipoSelect != "1" ? "danger" : "success")
            // }}
            onSubmit={(data) => {
                TipoGasto.registro(this.props, data);
            }}
        // onSubmitName={(this.state.tipoSelect != "1" ? "Egreso" : "Ingreso")}
        />
    }
    render() {
        return (
            <Page navigation={this.props.navigation} title={"Registrar tipo de gasto"}>
                <SView col={"xs-12"} height>
                    <SScrollView2 disableHorizontal>
                        <SView col={"xs-12"} center>
                            {this.getLista()}
                        </SView>
                    </SScrollView2>
                </SView>
            </Page>
        );
    }
}
export default connect((state) => {
    return { state }
})(TipoGastoRegistroPage);