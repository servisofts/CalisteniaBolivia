import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SDate, SIcon, SLoad, SNavigation, SPage, STable, STable2, SText } from 'servisofts-component';
import Usuario from '../../Usuario';
import Actions from '../Actions';


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    componentDidMount() {

    }

    getLista() {
        var data = Actions.getReporteIngresosEgresos({
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
                // { key: "key_usuario", label: "Cliente", width: 250, render: (item) => { return `${usuarios[item].Nombres} ${usuarios[item].Apellidos}` } },
                { key: "sucursal", label: "Sucursal", width: 150 },
                // { key: "caja_movimiento/monto", label: "Monto", width: 100 },
                // { key: "paquete/descripcion", label: "Paquete", width: 150 },
                { key: "key_usuario_cajero", label: "Cajero", width: 250, render: (item) => { return `${usuarios[item].Nombres} ${usuarios[item].Apellidos}` } },
                { key: "descripcion", label: "descripcion", width: 400 },
                { key: "monto", label: "Monto", width: 100, center:true, },
                {
                    key: "monto-tipo", label: "Tipo", width: 50, center: true,
                    render: (item) => {
                        if (item > 0) return "Ingreso";
                        return "Egreso"
                    },
                    component: (item) => {
                        return <SIcon name={item} width={20} />
                    }
                },
                // { key: "", label: "Sucursal", width: 150 },
            ]}
            limit={100}
            data={data}
        />
    }
    render() {
        this.fecha_inicio = SNavigation.getParam("fecha_inicio", new SDate().toString("yyyy-MM-dd"));
        this.fecha_fin = SNavigation.getParam("fecha_fin", new SDate().toString("yyyy-MM-dd"));
        return (
            <SPage title={`Ingresos y egresos manuales (${this.fecha_inicio} / ${this.fecha_fin}) `} disableScroll>
                {/* <SText>{JSON.stringify(movimientos, "\n", "\t")}</SText> */}
                {this.getLista()}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);