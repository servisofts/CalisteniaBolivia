import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SList, SLoad, SPage, SText, SView } from 'servisofts-component';
import sucursal from "../../Sucursal";
import Item from './Item';
import Parent from "..";
import sucursal_usuario from '../../sucursal_usuario';
class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: {}
        };
    }

    getLista() {
        var arr = sucursal.Actions.getAll(this.props);
        var arr_sucursal_active = Parent.Actions.getAllByKeyPaquete(this.props.key_paquete, this.props);
        if (!arr) return <SLoad />;
        if (!arr_sucursal_active) return <SLoad />;

        // return <SList data={arr} horizontal center render={obj => {
        return Object.values(arr).map(obj => {
            if (!sucursal_usuario.Actions.isActive(obj.key, this.props)) {
                return null;
            }
            var objFind = arr_sucursal_active.find((o) => o.key_sucursal == obj.key && o.estado != 0);
            return <Item obj={obj} select={objFind} onSelect={(itm) => {
                // this.state.select[itm.key] = itm;
                Parent.Actions.registro({
                    key_paquete: this.props.key_paquete,
                    key_sucursal: itm.key
                }, this.props);
                // this.setState({ ...this.state })
            }} deSelect={(itm) => {
                Parent.Actions.editar({
                    ...objFind,
                    estado: 0
                }, this.props);
            }} />
        }
        )
    }
    render() {
        if (!this.props.key_paquete) return null;
        return (
            <SView col={"xs-12"} row center>
                {this.getLista()}
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Select);