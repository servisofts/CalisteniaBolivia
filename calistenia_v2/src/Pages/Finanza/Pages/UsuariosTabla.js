import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SLoad, SPage, STable2, SText } from 'servisofts-component';
import Model from '../../../Model';
import Usuario from '../../Usuario';

class UsuariosTabla extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getLista() {
        var usuarios = Model.usuario.Action.getAll();
        if (!usuarios) return <SLoad />
        return <STable2
            header={[
                { key: "index", label: "#", width: 40 },
                { key: "Nombres", label: "Nombres", width: 250 },
                { key: "Apellidos", label: "Apellidos", width: 250 },
                { key: "CI", label: "CI", width: 150 },
                { key: "Fecha nacimiento", label: "Fecha de nacimiento", width: 150 },
                { key: "Correo", label: "Correo", width: 200 },
                { key: "Telefono", label: "Telefono", width: 200 },
            ]}
            data={usuarios}
        />
    }
    render() {
        return (
            <SPage title={'UsuariosTabla'} disableScroll>
                {this.getLista()}

            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(UsuariosTabla);