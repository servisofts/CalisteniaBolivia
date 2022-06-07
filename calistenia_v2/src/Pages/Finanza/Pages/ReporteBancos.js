import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SDate, SIcon, SLoad, SNavigation, SPage, STable2, SText } from 'servisofts-component';
import { SSRolesPermisosValidate } from '../../../SSRolesPermisos';
import Actions from '../Actions';


class ReporteBancos extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.fecha_inicio = SNavigation.getParam("fecha_inicio", new SDate().toString("yyyy-MM-dd"));
        this.fecha_fin = SNavigation.getParam("fecha_fin", new SDate().toString("yyyy-MM-dd"));
        // this.props.state.reporteReducer.data = null;
    }

    getLista() {
        if(!this.props.state.usuarioRolReducer.usuario) return <SLoad/>
        if(!this.props.state.usuarioRolReducer.usuario[this.props.state.usuarioReducer.usuarioLog.key]) return <SLoad/>
        var isAdmin = SSRolesPermisosValidate({ page: "SucursalPage", permiso: "admin_all" });
        var movimientos = Actions.getMovimientosBancarios(this.fecha_inicio, this.fecha_fin, isAdmin, this.props)
        if (!movimientos) return <SLoad />
        return <STable2
            header={[
                { key: "key", label: "fecha", width: 100, order: "desc" },
                { key: "ingreso/efectivo", label: "Ingreso efectivo", sumar: true, width: 140, render: (item) => { return item ? item : "0" }, icon: (<SIcon name={"Ingreso"} width={12} height={12} />), },
                { key: "ingreso/transferencia", label: "Ingreso transferencia", sumar: true, width: 140, render: (item) => { return item ? item : "0" }, icon: (<SIcon name={"Ingreso"} width={12} height={12} />) },
                { key: "ingreso/cheque", label: "Ingreso cheque", sumar: true, width: 140, render: (item) => { return item ? item : "0" }, icon: (<SIcon name={"Ingreso"} width={12} height={12} />) },
                { key: "ingreso/tarjeta", label: "Ingreso tarjeta", sumar: true, width: 140, render: (item) => { return item ? item : "0" }, icon: (<SIcon name={"Ingreso"} width={12} height={12} />) },
                { key: "egreso/efectivo", label: "Egreso efectivo", sumar: true, width: 140, render: (item) => { return item ? item : "0" }, icon: (<SIcon name={"Egreso"} width={12} height={12} />) },
                // { key: "egreso/transferencia", label: "Egreso transferencia", width: 160, render: (item) => { return item ? item : "0" }, icon: (<SIcon name={"Egreso"} width={12} height={12} />) },
                // { key: "egreso/cheque", label: "Egreso cheque", width: 160, render: (item) => { return item ? item : "0" }, icon: (<SIcon name={"Egreso"} width={12} height={12} />) },
                // { key: "egreso/tarjeta", label: "Egreso tarjeta", width: 160, render: (item) => { return item ? item : "0" }, icon: (<SIcon name={"Egreso"} width={12} height={12} />) },
                // { key: "egreso/cheque", label: "egreso cheque", width: 140, render: (item) => { return item ? item : "0" } },
                // { key: "egreso/tarjeta", label: "egreso tarjeta", width: 140, render: (item) => { return item ? item : "0" } },
            ]}
            limit={30}
            data={movimientos}
        />
    }
    render() {

        return (
            <SPage title={"ReporteBancos"} disableScroll>
                {/* <SText>{JSON.stringify(movimientos, "\n", "\t")}</SText> */}
                {this.getLista()}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ReporteBancos);