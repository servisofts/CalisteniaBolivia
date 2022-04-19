import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView } from 'servisofts-component';
import dispositivo from '../../dispositivo';
import Parent from ".."
class EsperandoHuella extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.props.state.lector_huellaReducer.lastEvent = null;
        dispositivo.Actions.solicitudRegistroHuella(this.props.data, this.props);
    }
    getContent() {
        //var reducer = Parent.Actions._getReducer();
        var reducerUsuario = this.props.state.usuario_huellaReducer;
        var reducer = this.props.state.lector_huellaReducer;
        var data = this.props.data;

        if (reducerUsuario.estado == "exito" && reducerUsuario.type == "registro") {
            var lr = reducerUsuario.lastRegister;
            if (lr.key_sucursal == this.props.data.key_sucursal) {
                reducerUsuario.estado = ""
                SNavigation.goBack();
                return <SText>{"EXITO AL REGISTRAR"}</SText>
            }
        }
        if (reducer.lastEvent) {
            if (reducer.lastEvent.estado == "exito") {
                return <SText>{`INTENTO # ${reducer.lastEvent?.data?.i}`}</SText>
            } else if (reducer.lastEvent.estado == "error") {
                return <SText>{"ERROR INTENTE NUEVAMENTE"}</SText>
            }
            data = reducer.lastEvent
        }
        return <SText>{"COLOQUE SU HUELLA EN EL SENSOR"}</SText>

    }
    render() {
        this.props.state.lector_huellaReducer.key_sucursal = this.props.data?.key_sucursal

        return (
            <SView col={"xs-12"} height>
                {this.getContent()}
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(EsperandoHuella);