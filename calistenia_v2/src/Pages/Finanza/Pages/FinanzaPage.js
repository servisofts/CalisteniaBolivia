import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SLoad, SPage, STable } from 'servisofts-component';
import Usuario from '../../Usuario';

class FinanzaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var usuarios = Usuario.Actions.getAll(this.props)
        if (!usuarios) return <SLoad />
        return (
            <SPage title={"Finanzas"} disableScroll>
                <STable
                    header={[
                        { key: "index", label: "#", width: 35, },
                        // { key: "key", label: "key", width: 100, },
                        { key: "Nombres", label: "Nombre", width: 300, order: "asc" },
                        { key: "Apellidos", label: "Apellido", width: 300, },
                        { key: "Correo", label: "Correo", width: 300, },
                        { key: "Telefono", label: "Telefono", width: 300, },
                        { key: "CI", label: "CI", width: 300, },
                    ]}
                    // --EXAMPLE ARRAY DATA  <--
                    // data={[
                    //     { key: '1', nombre: "Ricardo", apellido: "Paz Demiquel" },
                    //     { key: '2', nombre: "Ruddy", apellido: "Paz Demiquel" }
                    // ]}
                    // --EXAMPLE OBJECT DATA <--
                    data={usuarios}
                    filter={(obj,i)=>{
                        // if(i>40) return false
                        return true
                    }}
                />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(FinanzaPage);