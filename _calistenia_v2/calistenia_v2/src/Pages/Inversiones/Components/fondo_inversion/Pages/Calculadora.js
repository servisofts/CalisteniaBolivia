import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SInput, SLoad, SNavigation, SPage, SText, SThread, SView } from 'servisofts-component';
import Parent from '../index';

class Calculadora extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                "descripcion": {
                    label: "Descripcion",
                    value: null,
                    type: "text",
                    col: "xs-11.8",
                    isRequired: true,

                },
                "observacion": {
                    label: "observacion",
                    value: null,
                    type: "textArea",
                    col: "xs-11.8",
                    isRequired: false,

                },
                "monto_maximo": {
                    label: "Monto maximo",
                    value: null,
                    type: "money",
                    isRequired: true,

                },
                "precio_accion": {
                    label: "Precio de la accion",
                    value: null,
                    type: "money",
                    isRequired: true,

                },
                "cantidad_acciones": {
                    label: "Cantidad de acciones",
                    value: null,
                    type: "money",
                    icon: " ",
                    isRequired: true,
                },
                "cantidad_meses": {
                    label: "Cantidad de meses",
                    value: null,
                    type: "number",
                    isRequired: true,

                },
                // "tasa_interes": {
                //     label: "Tasa de interes",
                //     value: null,
                //     type: "number"
                // },
                "fecha_inicio": {
                    label: "Fecha de inicio",
                    value: null,
                    type: "date",
                    isRequired: true,


                },
                "fecha_fin": {
                    label: "Fecha de fin",
                    value: null,
                    type: "date",
                    isRequired: true,

                },


            }
        };
        this.key = SNavigation.getParam("key");
        this._ref = {};
    }

    calcular(key) {
        var inputs = this.state.inputs;
        if (key == "cantidad_meses" || key == "fecha_inicio") {
            if (inputs["fecha_inicio"].value) {
                var fecha_inicio = new SDate(inputs["fecha_inicio"].value);
                if (inputs["cantidad_meses"].value) {
                    fecha_inicio.addMonth(parseInt(inputs["cantidad_meses"].value));
                    inputs["fecha_fin"].value = fecha_inicio.toString("yyyy-MM-dd");
                } else {
                    inputs["fecha_fin"].value = fecha_inicio.toString("yyyy-MM-dd");
                }
            }
        } else {
            if (inputs["fecha_inicio"].value && inputs["fecha_fin"].value) {
                var cantodad_meses = new SDate(inputs["fecha_inicio"].value).diff(new SDate(inputs["fecha_fin"].value));
                inputs["cantidad_meses"].value = parseInt(Math.round(cantodad_meses / 30));
            }
        }

        if (inputs["monto_maximo"].value) {
            if (inputs["precio_accion"].value && key == "precio_accion") {
                inputs["cantidad_acciones"].value = parseFloat(inputs["monto_maximo"].value / inputs["precio_accion"].value).toFixed(2);
            }
            if (inputs["cantidad_acciones"].value && key == "cantidad_acciones") {
                inputs["precio_accion"].value = parseFloat(inputs["monto_maximo"].value / inputs["cantidad_acciones"].value).toFixed(2);
            }
        }

        this.setState({ inputs: { ...this.state.inputs } });
    }

    getInputs() {
        if (this.key) {
            var data = Parent.Actions.getByKey(this.key, this.props);
            if (!data) return <SLoad />
            this.data = data;
            if (!this.state.isLoad) {
                this.state.inputs.cantidad_acciones.value = data.cantidad_acciones;
                this.state.inputs.precio_accion.value = data.precio_accion;
                this.state.inputs.monto_maximo.value = data.monto_maximo;
                this.state.inputs.fecha_inicio.value = new SDate(data.fecha_inicio).toString("yyyy-MM-dd");
                this.state.inputs.fecha_fin.value = new SDate(data.fecha_fin).toString("yyyy-MM-dd");
                this.state.inputs.cantidad_meses.value = data.cantidad_meses;
                this.state.inputs.observacion.value = data.observacion;
                this.state.inputs.descripcion.value = data.descripcion;
                this.setState({ isLoad: true });
            }
        }
        return Object.keys(this.state.inputs).map((key) => {
            var obj = this.state.inputs[key];
            return <SView col={obj.col ?? "xs-6"} center>
                <SInput ref={(r) => this._ref[key] = r} customStyle={"calistenia"} col={"xs-11"} {...obj} onChangeText={(val) => {
                    this.state.inputs[key].value = val;
                    this.setState({ inputs: { ...this.state.inputs } });
                    this.calcular(key);
                }} />
            </SView>
        })
    }
    render() {
        var reducer = this.props.state[Parent.component + "Reducer"];
        if (reducer.type == "registro" || reducer.type == "editar") {
            if (reducer.estado == "exito") {
                reducer.estado = "";
                if (reducer.type == "registro") {
                    this.key = reducer.lastRegister?.key;
                    SNavigation.replace("fondo_inversion_preventa/registro", { key_fondo_inversion: this.key });

                } else {
                    SNavigation.goBack();

                }
            }
        }

        return (
            <SPage title={'Calculadora'} center>
                <SView row col={"xs-12 sm-10 md-8 lg-6 xl-4"} center>
                    {this.getInputs()}
                </SView>
                <SHr />
                <SView col={"xs-12"} center>
                    <SButtom type="danger" onPress={() => {
                        if ((reducer.type == "registro" || reducer.type == "editar") && reducer.estado == "cargando") {
                            return;
                        }
                        var values = {};
                        var isExito = true;
                        Object.keys(this._ref).map((key) => {
                            if (!this._ref[key].verify()) {
                                isExito = false;
                            }
                            values[key] = this._ref[key].getValue();
                        })
                        if (isExito) {
                            values.fecha_inicio = new SDate(values.fecha_inicio, "yyyy-MM-dd").toString();
                            values.fecha_fin = new SDate(values.fecha_fin, "yyyy-MM-dd").toString();
                            if (!this.key) {
                                Parent.Actions.registro(values, this.props);
                            } else {
                                Parent.Actions.editar({
                                    ...this.data,
                                    ...values
                                }, this.props);
                            }
                        }
                    }}>Enviar</SButtom>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Calculadora);