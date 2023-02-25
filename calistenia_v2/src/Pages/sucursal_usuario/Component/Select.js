import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SList, SLoad, SPage, SText, SView } from 'servisofts-component';
import Sucursal from "../../Sucursal";
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
        var arr = Sucursal.Actions.getAll(this.props);
        var arr_sucursal_usuario = Parent.Actions.getAllByKeyUsuario(this.props.key_usuario, this.props);
        if (!arr) return <SLoad />;
        if (!arr_sucursal_usuario) return <SLoad />;
        // console.log(arr_sucursal_usuario);
        // return <SList data={arr} horizontal center render={(obj) => {
        return Object.values(arr).map(obj => {
            if (!Parent.Actions.isActive(obj.key, this.props)) {
                return null;
            }
            var objFind = arr_sucursal_usuario.find((o) => o.key_sucursal == obj.key && o.estado != 0);
            if (this.props.preventEdit) {
                if (!objFind) {
                    return null;
                }
            }
            // if (objFind) {
            //     console.log(arr_sucursal_usuario);
            //     console.log(objFind);
            // }
            return <Item obj={obj} select={objFind} onSelect={(itm) => {
                if (this.props.preventEdit) return null;
                // this.state.select[itm.key] = itm;
                Parent.Actions.registro({
                    key_usuario: this.props.key_usuario,
                    key_sucursal: itm.key
                }, this.props);
                // this.setState({ ...this.state })
            }} deSelect={(itm) => {
                if (this.props.preventEdit) return null;
                Parent.Actions.editar({
                    ...objFind,
                    estado: 0
                }, this.props);
            }} />
        })
    }
    render() {
        if (!this.props.key_usuario) return null;
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