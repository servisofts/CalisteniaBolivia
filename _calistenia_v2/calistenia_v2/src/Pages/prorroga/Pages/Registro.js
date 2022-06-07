import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SIcon, SNavigation, SPage, SText, SView, SLoad } from 'servisofts-component';
import Parent from '../index';
import SSocket from 'servisofts-socket';

class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key");

        Parent.struct.fk.map((item) => {
            this[item] = SNavigation.getParam(item);
        })
    }
    createStruct() {
        var resp = {};
        var metas = [...Parent.struct.metas];
        metas.map((item) => {
            if (item.hidden) return null;
            delete item["width"]
            resp[item.key] = {
                ...item,
                label: item.label,
                isRequired: item.required,
                defaultValue: this.data[item.key],
                type: item.type,
            };

        })
        return resp;
    }
    getContent() {
        this.data = {};
        if (this.key) {
            this.data = Parent.Actions.getByKey(this.key, this.props);
            if (!this.data) return <SLoad />
        } else {
            this.data = {};
        }
        return <SForm
            center
            ref={(form) => { this.form = form; }}
            col={"xs-11 sm-9 md-7 lg-5 xl-4"}
            inputProps={{
                customStyle: "calistenia"
            }}
            inputs={{
                ...this.createStruct(),
            }}


            onSubmitName={"Guardar"}
            onSubmit={(values) => {
                if (this.key) {
                    Parent.Actions.editar({ ...this.data, ...values }, this.props);
                } else {
                    Parent.struct.fk.map((item) => {
                        values[item] = this[item];
                    })
                    Parent.Actions.registro(values, this.props);
                }
            }}
        />
    }

    render() {
        var reducer = this.props.state[Parent.component + "Reducer"];
        if (reducer.type == "registro" || reducer.type == "editar") {
            if (reducer.estado == "exito") {
                if (reducer.type == "registro") this.key = reducer.lastRegister?.key;
                // if (this.form) {
                //     this.form.uploadFiles(SSocket.api.root + "upload/" + Parent.component + "/" + this.key);
                // }
                reducer.estado = "";
                SNavigation.goBack();
            }
        }

        return (
            <SPage title={'Registro de ' + Parent.component} >
                <SView height={30}></SView>
                <SView center col={"xs-12"}>
                    {this.getContent()}
                </SView>
                <SHr />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Registro);