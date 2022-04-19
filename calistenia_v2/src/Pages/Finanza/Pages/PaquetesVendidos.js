import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SDate, SIcon, SLoad, SNavigation, SPage, STable, STable2, SText } from 'servisofts-component';
import Usuario from '../../Usuario';
import Actions from '../Actions';


class PaquetesVendidos extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    componentDidMount() {

    }

    getDetallePago(data) {
        switch (data.key_tipo_pago) {
            case "1":
                return `Número de serie: ${data["Número de serie"]}`;
            case "3":
                return `Banco: ${data["Banco"]}\nCodigo: ${data["Código"]} `;
            case "2":
                return `Nombre: ${data["Nombre"]}\nBanco: ${data["Banco"]}\nCodigo: ${data["Código"]} `;
            case "4":
                return `Beneficiario: ${data["Beneficiario"]}\nBanco: ${data["Banco"]}\nCodigo: ${data["Código"]} `;
        }
        return data.key_tipo_pago
    }
    getLista() {

        var data = Actions.getPaquetesVendidos({
            fecha_desde: this.fecha_inicio,
            fecha_hasta: this.fecha_fin
        }, this.props)
        var usuarios = Usuario.Actions.getAll(this.props);
        if (!data) return <SLoad />
        if (!usuarios) return <SLoad />
        // return <SText>{JSON.stringify(movimientos)}</SText>
        return <STable2
            header={[
                { key: "index", label: "#", width: 40 },
                { key: "fecha_on", label: "Fecha de registro", width: 150, order: "desc", render: (item) => { return new SDate(item).toString("yyyy-MM-dd hh:mm") } },
                { key: "key_usuario", label: "Cliente", width: 250, render: (item) => { return `${usuarios[item]?.Nombres} ${usuarios[item]?.Apellidos}` } },
                { key: "sucursal", label: "Sucursal", width: 150 },
                { key: "tipo_pago", label: "Tipo Pago", width: 150 },
                { key: "caja_movimiento/monto", label: "Monto", sumar: true, width: 100 },
                {
                    key: "caja_movimiento/data", label: "Detalle", width: 350, render: (item) => {
                        return this.getDetallePago(item)
                    }
                },
                { key: "paquete/descripcion", label: "Paquete", width: 150 },
                { key: "caja/key_usuario", label: "Cajero", width: 250, render: (item) => { return `${usuarios[item]?.Nombres} ${usuarios[item]?.Apellidos}` } },

                // { key: "", label: "Sucursal", width: 150 },
            ]}
            filter={(item) => {
                if(item.estado != 1) return false;
                return true;
            }}
            limit={100}
            data={data}
        />
    }
    render() {
        this.fecha_inicio = SNavigation.getParam("fecha_inicio", new SDate().toString("yyyy-MM-dd"));
        this.fecha_fin = SNavigation.getParam("fecha_fin", new SDate().toString("yyyy-MM-dd"));
        return (
            <SPage title={`Paquetes Vendidos (${this.fecha_inicio} / ${this.fecha_fin}) `} disableScroll>
                {/* <SText>{JSON.stringify(movimientos, "\n", "\t")}</SText> */}
                {this.getLista()}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(PaquetesVendidos);