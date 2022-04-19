import React, { Component } from 'react';
import { View } from 'react-native';
import Svg, { Line, Text } from 'react-native-svg';
import { connect } from 'react-redux';
import { SLoad, SText, SView, SDate, STheme } from 'servisofts-component';
import FechasBetween from '../../../../../Components/FechasBetween';
import MonthBetween from '../../../../../Components/MonthBetween';
import Finanza from '../../../../Finanza';
import Sucursal from '../../../../Sucursal';
import Usuario from '../../../../Usuario';

class Grafico extends Component {
    constructor(props) {
        super(props);
        var fechaInicio = new SDate();
        fechaInicio.setDay(1);
        this.state = {
            heigthGraph: 92,
            widthGraph: 92,
            fechaInicio: this.props.fechaInicio,
            fechaFin: this.props.fechaFin
        };
    }

    getTiempo() {
        var fechaInicio = new SDate(this.state.fechaInicio, "yyyy-MM-dd");
        var fechaFin = new SDate(this.state.fechaFin, "yyyy-MM-dd");
        var sucursales = Sucursal.Actions.getAll(this.props);

        var paquetes = Finanza.Actions.getPaquetesVendidos({
            fecha_desde: fechaInicio.toString("yyyy-MM-dd"),
            fecha_hasta: fechaFin.toString("yyyy-MM-dd")
        }, this.props, false);
        if (!paquetes) {
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
        var paquetes_por_dia = {};
        var monto_por_dia = {};
        var monto_por_sucursal = {};
        var maximo_monto = 0;
        fechaInicio.addDay(-1);
        tiempo.map((i) => {
            var fecha = fechaInicio.addDay(1);
            paquetes_por_dia[fecha.toString("yyyy-MM-dd")] = {};
            monto_por_dia[fecha.toString("yyyy-MM-dd")] = {};
            Object.keys(paquetes).map((key, index) => {
                var paquete = paquetes[key];

                if (!monto_por_sucursal[paquete.caja.key_sucursal]) {
                    monto_por_sucursal[paquete.caja.key_sucursal] = 0;
                }

                if (new SDate(paquete.fecha_on).equalDay(fecha)) {
                    if (new SDate(paquete.fecha_on).equalDay(new SDate("2022-03-10","yyyy-MM-dd"))) {
                        if (paquete.sucursal == "Pirai") {
                            console.log(paquete.caja_movimiento)
                        }
                    }
                    if (paquete.estado <= 0) {
                        return;
                    }
                    if (!paquetes_por_dia[fecha.toString("yyyy-MM-dd")][paquete.caja.key_sucursal]) {
                        paquetes_por_dia[fecha.toString("yyyy-MM-dd")][paquete.caja.key_sucursal] = {};
                        monto_por_dia[fecha.toString("yyyy-MM-dd")][paquete.caja.key_sucursal] = {
                            monto: 0,
                            cantidad: 0,
                            total: monto_por_sucursal[paquete.caja.key_sucursal]
                        };
                    }
                    paquetes_por_dia[fecha.toString("yyyy-MM-dd")][paquete.caja.key_sucursal][paquete.key] = paquete;
                    var temp = monto_por_dia[fecha.toString("yyyy-MM-dd")][paquete.caja.key_sucursal];
                    // monto_por_dia[fecha.toString("yyyy-MM-dd")][paquete.caja.key_sucursal] = {
                    //     monto: temp.monto + paquete.paquete.precio,
                    //     cantidad: temp.cantidad + 1,
                    //     total: temp.total + paquete.paquete.precio
                    // };
                    monto_por_dia[fecha.toString("yyyy-MM-dd")][paquete.caja.key_sucursal] = {
                        monto: temp.monto + paquete.caja_movimiento.monto,
                        cantidad: temp.cantidad + 1,
                        total: temp.total + paquete.caja_movimiento.monto
                    };
                    monto_por_sucursal[paquete.caja.key_sucursal] += paquete.caja_movimiento.monto;
                    if (maximo_monto < monto_por_sucursal[paquete.caja.key_sucursal]) {
                        maximo_monto = monto_por_sucursal[paquete.caja.key_sucursal];
                    }
                }
            });
        })

        // console.log(maximo_monto);
        // console.log(monto_por_sucursal);
        var dy = this.state.heigthGraph / maximo_monto;
        var monto_actual_suc = {}
        var monto_antiguo_suc = {}
        return Object.keys(paquetes_por_dia).map((key, i) => {
            var suc_por_dia = monto_por_dia[key];
            var pos = a * i;
            var pos_a = a * (i - 1);
            var sucursales_dia = paquetes_por_dia[key];
            return Object.keys(sucursales).map((key_suc) => {
                var sucursal = sucursales[key_suc];
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
                    monto_actual_suc[key_suc] = monto_antiguo_suc[key_suc] + suc_dia.monto;
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
                        stroke={sucursal.color || "#f0f"} strokeWidth="2" />
                    {this.getMonto({
                        x: pos + space,
                        y: this.state.heigthGraph - (monto_actual_suc[key_suc] * dy) + spaceh,
                        monto: monto_actual_suc[key_suc],
                        monto_antiguo: monto_antiguo_suc[key_suc],
                    })}

                </>
            })
        })
    }
    getMonto({ x, y, monto, monto_antiguo }) {
        if (this.props.select) {
            if (Object.keys(this.props.select).length <= 0) {
                return null;
            }
        }
        if (monto == monto_antiguo) return null;
        return <Text
            fill="#999"
            fontSize="9"
            fontWeight="bold"
            x={`${x}%`} y={`${y - 1}%`}
            textAnchor="middle"
        >
            {"Bs." + monto}
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
                    fill="#fff"
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
                {/* <MonthBetween
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