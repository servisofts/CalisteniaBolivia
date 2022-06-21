import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SLoad, SNavigation, SPage, SPopup, STable, SText, SView } from 'servisofts-component';
import { SSRolesPermisosValidate } from '../../../SSRolesPermisos';
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

    getTodas() {
        // verEstadoFinancieroTodos
        if (!SSRolesPermisosValidate({ page: "FinanzaPage", permiso: "verEstadoFinancieroTodos" })) {
            return null;
        }
        return <SButtom props={{
            type: "secondary",
            variant: "default"
        }} onPress={() => {

            SNavigation.navigate("EstadoFinanciero", {
                key_sucursal: "",
                fecha_inicio: this.fecha_inicio,
                fecha_fin: this.fecha_fin
            })
        }}>{"Todas"}</SButtom>
    }
    render() {
        return (<SPage title={"Estado Financiero"} disableScroll>
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
                    if (!this.state.sucursal) {
                        SPopup.alert("Debe seleccionar una sucursal");
                        return;
                    }
                    SNavigation.navigate("EstadoFinanciero", {
                        key_sucursal: this.state.sucursal ? this.state.sucursal.key : "",
                        fecha_inicio: this.fecha_inicio,
                        fecha_fin: this.fecha_fin
                    })
                }}>{"Continuar"}</SButtom>
                <SHr height={30} />
                {this.getTodas()}
            </SView>
        </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(EstadoFinancieroSelect);