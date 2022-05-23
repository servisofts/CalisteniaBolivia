import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SList, SLoad, SPage, SText, SView } from 'servisofts-component';
import servicio from "../../Servicio";
import Item from './Item';
import Parent from "..";
class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: {}
        };
    }

    getLista() {
        var arr = servicio.Actions.getAll(this.props);
        var arr_sucursal_servicio = Parent.Actions.getAllByKeySucursal(this.props.key_sucursal, this.props);
        if (!arr) return <SLoad />;
        if (!arr_sucursal_servicio) return <SLoad />;

        return <SList data={arr} horizontal center render={obj => {
            var objFind = arr_sucursal_servicio.find((o) => o.key_servicio == obj.key && o.estado != 0);
            return <Item obj={obj} select={objFind} onSelect={(itm) => {
                // this.state.select[itm.key] = itm;
                Parent.Actions.registro({
                    key_sucursal: this.props.key_sucursal,
                    key_servicio: itm.key
                }, this.props);
                // this.setState({ ...this.state })
            }} deSelect={(itm) => {
                Parent.Actions.editar({
                    ...objFind,
                    estado: 0
                }, this.props);
            }} />
        }} />
    }
    render() {
        return (
            <SView col={"xs-12"} row>
                {this.getLista()}
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Select);