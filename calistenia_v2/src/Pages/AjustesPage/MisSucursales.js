import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SPage, SText, SView } from 'servisofts-component';
import Sucursal_usuario from '../sucursal_usuario';

class MisSucursales extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var key_usuario = this.props.state.usuarioReducer.usuarioLog.key;
        return (
            <SView col={"xs-12"} center>
                <SText style={{
                    fontSize: 12,
                    color: "#999",
                    width: "100%",
                    textAlign: "center"
                }}>Sucursales Activas</SText>
                <Sucursal_usuario.Components.Select key_usuario={key_usuario} preventEdit={true} />
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(MisSucursales);