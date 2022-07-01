import React, { Component } from 'react';
import { View } from 'react-native';
import Svg, { Line, Text } from 'react-native-svg';
import { connect } from 'react-redux';
import { SLoad, SText, SView, SDate, SPopup, SNavigation, STheme } from 'servisofts-component';
import FechasBetween from '../../../../../Components/FechasBetween';
import Finanza from '../../../../Finanza';
import Sucursal from '../../../../Sucursal';
import sucursal_usuario from '../../../../sucursal_usuario';
import Usuario from '../../../../Usuario';

class Grafico extends Component {
    constructor(props) {
        super(props);
        var fechaInicio = new SDate();
        fechaInicio.setDay(1);
        this.state = {
            heigthGraph: 92,
            widthGraph: 92,
            fechaInicio: fechaInicio.toString("yyyy-MM-dd"),
            fechaFin: new SDate().toString("yyyy-MM-dd")
        };
    }

    getTiempo() {
        var fechaInicio = new SDate(this.state.fechaInicio, "yyyy-MM-dd");
        var fechaFin = new SDate(this.state.fechaFin, "yyyy-MM-dd");
        var sucursales = Sucursal.Actions.getAll(this.props);
        var asistencias = Finanza.Actions.getReporteAsistencia({
            fecha_desde: fechaInicio.toString(),
            fecha_hasta: fechaFin.toString()
        }, this.props, false);
        if (!asistencias) {
            return null;
        }
        if (!sucursales) {
            return null;
        }
        var diff = fechaInicio.diff(fechaFin);
        var tiempo = Array.from(Array(diff + 1).keys())
        var a = this.state.widthGraph / diff;
        var space = (100 - this.state.widthGraph) / 2;
        var spaceh = (100 - this.state.heigthGraph) / 2;
        var asistencia_por_dia = {};
        var maximo = 0;
        fechaInicio.addDay(-1);
        // console.log(asistencias);
        tiempo.map((i) => {
            var fecha = fechaInicio.addDay(1);
            asistencia_por_dia[fecha.toString("yyyy-MM-dd")] = {};
            Object.keys(asistencias).map((key, index) => {
                var asistencia = asistencias[key];
                if (!asistencia_por_dia[fecha.toString("yyyy-MM-dd")][asistencia.entrenamiento.key_sucursal]) {
                    asistencia_por_dia[fecha.toString("yyyy-MM-dd")][asistencia.entrenamiento.key_sucursal] = {};
                }
                if (new SDate(asistencia.entrenamiento.fecha_inicio).equalDay(fecha)) {

                    asistencia_por_dia[fecha.toString("yyyy-MM-dd")][asistencia.entrenamiento.key_sucursal][asistencia.key] = asistencia;
                    if (maximo < Object.keys(asistencia_por_dia[fecha.toString("yyyy-MM-dd")][asistencia.entrenamiento.key_sucursal]).length) {
                        maximo = Object.keys(asistencia_por_dia[fecha.toString("yyyy-MM-dd")][asistencia.entrenamiento.key_sucursal]).length;
                    }
                }

            })
        });
        var dy = this.state.heigthGraph / maximo;
        var monto_actual_suc = {}
        var monto_antiguo_suc = {}
        return Object.keys(asistencia_por_dia).map((key, i) => {
            var suc_por_dia = asistencia_por_dia[key];
            var pos = a * i;
            var pos_a = a * (i - 1);
            return Object.keys(sucursales).map((key_suc) => {
                var sucursal = sucursales[key_suc];
                var obj = sucursales[key];
                if (!sucursal_usuario.Actions.isActive(key_suc, this.props)) {
                    return null;
                }
                if (this.props.select) {
                    if (Object.keys(this.props.select).length > 0) {
                        if (!this.props.select[key_suc]) {
                            return null;
                        }
                    }
                }
                var suc_dia = suc_por_dia[key_suc];

                if (!monto_actual_suc[key_suc]) { monto_actual_suc[key_suc] = 0 };
                monto_antiguo_suc[key_suc] = monto_actual_suc[key_suc];
                if (suc_dia) {
                    monto_actual_suc[key_suc] = Object.keys(suc_dia).length;
                }
                return <>
                    <Line
                        x1={`${pos_a + space}%`} y1={`${this.state.heigthGraph - (monto_antiguo_suc[key_suc] * dy) + spaceh}%`}
                        x2={`${pos + space}%`} y2={`${this.state.heigthGraph - (monto_actual_suc[key_suc] * dy) + spaceh}%`}
                        strokeWidth="10"
                        stroke={"transparent"}
                        onClick={() => {
                            this.props.setSucursal(key_suc);
                        }}
                    />
                    <Line
                        x1={`${pos_a + space}%`} y1={`${this.state.heigthGraph - (monto_antiguo_suc[key_suc] * dy) + spaceh}%`}
                        x2={`${pos + space}%`} y2={`${this.state.heigthGraph - (monto_actual_suc[key_suc] * dy) + spaceh}%`}
                        stroke={sucursal.color || "#f0f"} strokeWidth="2"
                        onClick={() => {
                            this.props.setSucursal(key_suc);
                        }}
                    />

                    {this.getMonto({
                        x: pos + space,
                        y: this.state.heigthGraph - (monto_actual_suc[key_suc] * dy) + spaceh,
                        monto: monto_actual_suc[key_suc],
                        key_sucursal: key_suc,
                        fecha: key
                    })}

                </>
            })
        })
    }
    getMonto({ x, y, monto, key_sucursal, fecha }) {
        if (this.props.select) {
            if (Object.keys(this.props.select).length <= 0) {
                return null;
            }
        }
        return <Text
            fill={STheme.color.text}
            fontSize="10"
            fontWeight="bold"
            x={`${x - 1}%`} y={`${y}%`}
            textAnchor="middle"
            onClick={() => {
                SNavigation.navigate("entrenamientos_historial", { key_sucursal: key_sucursal, fecha: fecha })
            }}
        >
            {monto}
        </Text>
    }
    getInfoBottom() {
        var fechaInicio = new SDate(this.state.fechaInicio, "yyyy-MM-dd");
        var fechaFin = new SDate(this.state.fechaFin, "yyyy-MM-dd");
        var diff = fechaInicio.diff(fechaFin);
        var tiempo = Array.from(Array(diff + 1).keys())
        var a = this.state.widthGraph / diff;
        var space = (100 - this.state.widthGraph) / 2;
        fechaInicio.addDay(-1);
        return tiempo.map((i) => {
            var fecha = fechaInicio.addDay(1);
            return <>
                <Line
                    x1={`${(a * i) + space}% `} y1={`${100}%`}
                    x2={`${(a * i) + space}% `} y2={`${0}}%`}
                    stroke={STheme.color.card} strokeWidth="1"
                />
                <Text
                    fill={STheme.color.text}
                    fontSize="10"
                    x={`${(a * i) + space}% `}
                    y="100%"
                    fontWeight="bold"
                    textAnchor="middle"

                >
                    {fecha.toString("dd")}
                </Text>
            </>
        })

    }
    render() {
        if (this.state.fechaInicio != this.props.fechaInicio || this.state.fechaFin != this.props.fechaFin) {
            this.setState({
                fechaInicio: this.props.fechaInicio,
                fechaFin: this.props.fechaFin
            })
        }
        return (
            <SView flex card>
                {/* <FechasBetween
                    fecha_inicio={this.state.fechaInicio}
                    fecha_fin={this.state.fechaFin}
                    onChange={(fechaInicio, fechaFin) => {
                        this.setState({ fechaInicio, fechaFin })
                    }} /> */}
                <Svg width="100%" height="100%">
                    {this.getInfoBottom()}
                    {this.getTiempo()}
                </Svg>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Grafico);