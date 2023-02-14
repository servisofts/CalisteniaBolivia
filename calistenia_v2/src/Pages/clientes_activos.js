import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SInput, SList, SLoad, SPage, SText, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import Model from '../Model';
import Usuario from './Usuario';
class clientes_activos extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        SSocket.sendPromise({
            component: "clientesActivos",
            estado: "cargando",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            type: "getAll"
        }).then(resp => {
            this.state.data = resp.data;
            this.setState({ ...this.state })
        })
    }

    render_data() {
        var usuarios = Model.usuario.Action.getAll();
        if (!this.state.data) return <SLoad />
        if (!usuarios) return <SLoad />

        var data_with_user = Object.values(this.state.data).map((obj) => {
            obj.usuario = usuarios[obj.key_usuario]
            return obj;
        })
        return <SView col={"xs-12"} center>
            {/* <SInput placeholder={"Ingrese la busqueda"} onChangeText={(txt) => {
                console.log("cambio el texto", txt)
                var resultados = data_with_user.filter((obj) => {
                    if (JSON.stringify(obj).indexOf(txt) > -1) {
                        return true;
                    }
                    return false;
                })
                console.log(resultados.length)
                console.log(resultados)
            }} /> */}
            <SList
                buscador
                limit={10}
                order={[{ key: "peso", order: "desc", peso: 2, }]}
                data={data_with_user}
                render={(obj) => {
                    return <SView card col={"xs-12"} style={{
                        padding: 8
                    }}>
                        {/* <SText>{obj.peso}</SText> */}
                        <SText bold>{obj?.usuario?.Nombres} {obj?.usuario?.Apellidos}</SText>
                        {/* <SText>{JSON.stringify(obj)}</SText> */}
                    </SView>
                }}
            />
        </SView>
    }
    render() {
        return (
            <SPage title={'clientes_activos'}>
                {this.render_data()}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(clientes_activos);