import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SForm, SLoad, SNavigation, SPage, SText, SView } from 'servisofts-component';
import Parent from "../index";

class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key");
        this.key_banco = SNavigation.getParam("key_banco");
        this.key_cuenta_banco = SNavigation.getParam("key_cuenta_banco");
    }
    getForm() {
        var reducer = Parent.Actions._getReducer(this.props);
        if (reducer.estado == "exito" && reducer.type == "registro") {
            reducer.estado = "";
            SNavigation.goBack();
        }
        if (reducer.estado == "exito" && reducer.type == "editar") {
            reducer.estado = "";
            SNavigation.goBack();
        }
        var data = {
            fecha: new SDate().toString("yyyy-MM-dd"),
            monto: 0,
        }
        this.data = data;
        if (this.key) {
            this.data = Parent.Actions.getByKey(this.key, this.key_cuenta_banco, this.props);
            if (!this.data) return <SLoad />
        }
        return <SForm
            col={"xs-11 md-7 xl-4"}
            row center
            ref={(ref) => { this.form = ref; }}
            inputProps={{
                customStyle: "calistenia"
            }}
            inputs={{
                fecha: { label: "Fecha", type: "date", col: "xs-7", defaultValue: new SDate(this.data.fecha).toString("yyyy-MM-dd"), isRequired: true },
                monto: { label: "Monto", type: "money", col: "xs-7", isRequired: true, defaultValue: parseFloat(this.data.monto).toFixed(2), },
                codigo: { label: "Codigo", type: "text", col: "xs-12", isRequired: true, defaultValue: this.data.codigo, },
                descripcion: { label: "Descripcion", type: "textArea", isRequired: true, defaultValue: this.data.descripcion, },
            }}
            // onSubmitName=
            onSubmit={(values) => {
                if (this.key) {
                    Parent.Actions.editar({
                        ...this.data,
                        ...values,
                    }, this.props)
                } else {
                    Parent.Actions.registro({
                        ...values,
                        key_cuenta_banco: this.key_cuenta_banco,
                    }, this.props)
                }

            }}
        />
    }
    render() {
        return (
            <SPage title={'Registro'} center>
                {this.getForm()}
                <SView col={"xs-12"} center row>
                    <SButtom type='danger' props={{ variant: "confirm" }} onPress={() => {
                        Parent.Actions.editar({
                            ...this.data,
                            estado: 0,
                        }, this.props)
                    }}>Eliminar</SButtom>
                    <SView width={60} />
                    <SButtom type='danger' onPress={() => {
                        this.form.submit();
                    }} >{this.key ? "Editar" : "registrar"}</SButtom>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Registro);