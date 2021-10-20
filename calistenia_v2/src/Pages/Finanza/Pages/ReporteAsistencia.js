import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SDate, SIcon, SLoad, SNavigation, SPage, STable, SText } from 'servisofts-component';
import Usuario from '../../Usuario';
import Actions from '../Actions';


class ReporteAsistencia extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getLista() {
        var data = Actions.getReporteAsistencia({
            fecha_desde: this.fecha_inicio,
            fecha_hasta: this.fecha_fin
        }, this.props)
        var usuarios = Usuario.Actions.getAll(this.props);
        if (!data) return <SLoad />
        if (!usuarios) return <SLoad />
        // return <SText>{JSON.stringify(movimientos)}</SText>
        return <STable
            header={[
                { key: "index", label: "#", width: 40 },
                // { key: "key", label: "Key", width: 150 },
                { key: "entrenamiento/fecha_inicio", label: "Fecha inicio", width: 150, order: "desc", render: (item) => { return new SDate(item).toString("yyyy-MM-dd hh:mm") } },
                { key: "entrenamiento/fecha_fin", label: "Fecha Fin", width: 150, order: "desc", render: (item) => { return new SDate(item).toString("yyyy-MM-dd hh:mm") } },
                { key: "sucursal", label: "Sucursal", width: 150 },
                { key: "entrenamiento/key_usuario", label: "Entrenador", width: 250, render: (item) => { return `${usuarios[item].Nombres} ${usuarios[item].Apellidos}` } },
                { key: "paquete/descripcion", label: "Paquete", width: 150 },
                { key: "key_usuario", label: "Cliente", width: 250, render: (item) => { return `${usuarios[item].Nombres} ${usuarios[item].Apellidos}` } },
            ]}
            limit={100}
            data={data}
        />
    }
    render() {
        this.fecha_inicio = SNavigation.getParam("fecha_inicio", new SDate().toString("yyyy-MM-dd"));
        this.fecha_fin = SNavigation.getParam("fecha_fin", new SDate().toString("yyyy-MM-dd"));
        return (
            <SPage title={`Reporte Asistencia (${this.fecha_inicio} / ${this.fecha_fin}) `} disableScroll>
                {/* <SText>{JSON.stringify(movimientos, "\n", "\t")}</SText> */}
                {this.getLista()}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ReporteAsistencia);