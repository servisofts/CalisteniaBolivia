import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SDate, SIcon, SImage, SLoad, SNavigation, SPage, STable2, SText } from 'servisofts-component';
import Usuario from '../../Usuario';
import Actions from '../Actions';
import SSocket from 'servisofts-socket';


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
        return <STable2
            header={[
                { key: "index", label: "#", width: 40 },
                // { key: "key", label: "Key", width: 150 },
                // { key: "entrenamiento/key_sucursal", label: "tipo", width: 150, },
                { key: "key_usuario", label: "Cliente", width: 250, render: (item) => { return `${usuarios[item]?.Nombres} ${usuarios[item]?.Apellidos}` } },
                { key: "fecha_on", label: "H. Ingreso", width: 70, center: true, render: (item) => { return new SDate(item).toString("hh:mm:ss") } },
                { key: "entrenamiento/fecha_inicio-fecha2", label: "Fecha", center: true, width: 100, order:"desc", render: (item) => { return new SDate(item).getTime() } },
                { key: "entrenamiento/fecha_inicio-fecha", label: "Fecha", center: true, width: 100, render: (item) => { return new SDate(item).toString("yyyy-MM-dd") } },
                { key: "entrenamiento/fecha_inicio", label: "H. Inicio", center: true, width: 70, render: (item) => { return new SDate(item).toString("hh:mm") } },
                { key: "entrenamiento/fecha_fin", label: "H. Fin", center: true, width: 70, render: (item) => { return new SDate(item).toString("hh:mm") } },
                { key: "entrenamiento/key_sucursal", label: "Sucursal", width: 80, render: (item) => { return SSocket.api.root + "sucursal_" + item }, component: (item) => { return <SImage src={item} style={{ resizeMode: "cover" }} enablePreview /> } },
                { key: "sucursal", label: "Sucursal", width: 130 },
                // { key: "descripcion", label: "descripcion", width: 100 },
                // { key: "entrenamiento/key_usuario", label: "Entrenador", width: 250, render: (item) => { if (!item) { return "Molinete" } return `${usuarios[item]?.Nombres} ${usuarios[item]?.Apellidos}` } },
                { key: "paquete/descripcion", label: "Paquete", width: 150 },
                { key: "descripcion", label: "tipo", width: 100, },
            ]}
            rowHeight={40}
            limit={30}
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