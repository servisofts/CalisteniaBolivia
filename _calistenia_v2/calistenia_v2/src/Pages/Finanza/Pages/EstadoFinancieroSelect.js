import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SLoad, SNavigation, SPage, STable, SText, SView } from 'servisofts-component';
import Sucursal from '../../Sucursal';
import Actions from '../Actions';


class EstadoFinancieroSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.fecha_inicio = SNavigation.getParam("fecha_inicio", new SDate().toString("yyyy-MM-dd"));
        this.fecha_fin = SNavigation.getParam("fecha_fin", new SDate().toString("yyyy-MM-dd"));
        // this.props.state.reporteReducer.data = null;
    }

    render() {
        return (
            <SPage title={"Estado Financiero"} disableScroll>
                <SView col={"xs-12"} center>
                    <SHr />
                    <SText fontSize={24}>Reporte de estado financiero!</SText>
                    <SHr />
                    <SHr />
                    <SHr />
                    <SText fontSize={12}>Desea filtrar por sucursal?</SText>
                    <SHr />
                    <Sucursal.Component.SucursalSelect sucursal={this.state.sucursal} setSucursal={(item) => {
                        this.setState({ sucursal: item });
                    }} />
                    <SHr />
                    <SHr />
                    <SHr />
                    <SButtom props={{
                        type: "danger",
                        variant: "default"
                    }} onPress={() => {
                        SNavigation.navigate("EstadoFinanciero", {
                            key_sucursal: this.state.sucursal ? this.state.sucursal.key : "",
                            fecha_inicio: this.fecha_inicio,
                            fecha_fin: this.fecha_fin
                        })
                    }}>{"Continuar"}</SButtom>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(EstadoFinancieroSelect);