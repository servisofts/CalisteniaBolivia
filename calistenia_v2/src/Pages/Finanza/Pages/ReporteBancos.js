import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SIcon, SLoad, SPage, STable, SText } from 'servisofts-component';
import Actions from '../Actions';


class ReporteBancos extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getLista() {
        var movimientos = Actions.getMovimientosBancarios(this.props)
        if (!movimientos) return <SLoad />
        return <STable
            header={[
                { key: "key", label: "fecha", width: 100, order: "desc" },
                { key: "ingreso/efectivo", label: "Ingreso efectivo", width: 140, render: (item) => { return item ? item : "0" }, icon: (<SIcon name={"Ingreso"} width={12} height={12} />), },
                { key: "ingreso/transferencia", label: "Ingreso transferencia", width: 140, render: (item) => { return item ? item : "0" }, icon: (<SIcon name={"Ingreso"} width={12} height={12} />) },
                { key: "ingreso/cheque", label: "Ingreso cheque", width: 140, render: (item) => { return item ? item : "0" }, icon: (<SIcon name={"Ingreso"} width={12} height={12} />) },
                { key: "ingreso/tarjeta", label: "Ingreso tarjeta", width: 140, render: (item) => { return item ? item : "0" }, icon: (<SIcon name={"Ingreso"} width={12} height={12} />) },
                { key: "egreso/efectivo", label: "Egreso efectivo", width: 140, render: (item) => { return item ? item : "0" }, icon: (<SIcon name={"Egreso"} width={12} height={12} />) },
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