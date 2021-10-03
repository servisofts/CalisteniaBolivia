import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SLoad, SPage, STable } from 'servisofts-component';
import Actions from '../Actions';


class FinanzaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var movimientos = Actions.getMovimientosBancarios(this.props)
        if (!movimientos) return <SLoad />
        return (
            <SPage title={"Finanzas"} disableScroll>
                <STable
                    header={[
                        { key: "index", label: "#", width: 35, },
                        { key: "Central/ingreso", label: "data", width: 300,render:(data)=>{
                            return JSON.stringify(data)
                        } },
                    ]}
                    data={movimientos}
                />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(FinanzaPage);