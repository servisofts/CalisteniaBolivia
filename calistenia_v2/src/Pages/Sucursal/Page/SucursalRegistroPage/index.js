import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SLoad, SNavigation, SPage, SScrollView2, SText, SView } from 'servisofts-component';
import Sucursal from '../..';
import BarraSuperior from '../../../../Components/BarraSuperior';
import FotoPerfilComponent from '../../../../Components/FotoPerfilComponent';

class SucursalRegistro extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_sucursal = SNavigation.getParam("key");
    }
    getForm() {

        return <SForm
            ref={(ref) => {this.form = ref}}
            props={{
                col: "xs-12"
            }}
            inputProps={{
                customStyle: "calistenia"
            }}
            inputs={{
                descripcion: { label: 'Descripcion', type: 'text', required: true, defaultValue: this.data.descripcion },
                direccion: { label: 'Direccion', type: 'text', required: true, defaultValue: this.data.direccion },
            }}
            onSubmit={(data) => {
                if (this.key_sucursal) {
                    Sucursal.Actions.editar({
                        ...this.data,
                        ...data
                    }, this.props);
                } else {
                    Sucursal.Actions.registro(data, this.props);
                }
            }}
        >

        </SForm>
    }
    getPerfil() {
        var data = {}
        if (this.key_sucursal) {
            data = Sucursal.Actions.getByKey(this.key_sucursal, this.props);
            if (!data) return <SLoad />
        }
        this.data = data;
        return (<SView center col={"xs-11 md-8 lg-6 xl-4"}>
            {!this.key_sucursal ? <SView /> : <SView style={{
                width: 150,
                height: 150,
            }}><FotoPerfilComponent data={data} component={"sucursal"} />
            </SView>}
            {this.getForm()}
            <SView col={"xs-11"} row center>
                {/* {this.getEliminar()} */}
                <SButtom props={{
                    type: "outline"
                }}
                    onPress={() => {
                        this.form.submit();
                    }}
                >{(this.key_sucursal ? "Editar" : "Crear")}</SButtom>

            </SView>
        </SView>)
    }
    render() {
        if (this.props.state.sucursalReducer.estado == "exito" && this.props.state.sucursalReducer.type == "registro") {
            this.props.state.sucursalReducer.estado = ""
            SNavigation.goBack();
        }
        if (this.props.state.sucursalReducer.estado == "exito" && this.props.state.sucursalReducer.type == "editar") {
            this.props.state.sucursalReducer.estado = ""
            SNavigation.goBack();
        }
        return (
            <SPage title={'SucursalRegistro'} hidden disableScroll>
                <BarraSuperior goBack={() => {
                    SNavigation.goBack();
                }} />
                <SScrollView2 disableHorizontal>
                    <SView center col={"xs-12"}>
                        {this.getPerfil()}
                    </SView>
                </SScrollView2>

            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(SucursalRegistro);