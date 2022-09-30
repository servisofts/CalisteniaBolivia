import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, STheme, SThread, SView } from 'servisofts-component';
import Parent from ".."
import SSocket from "servisofts-socket"
import dispositivo from '../../dispositivo';
class SincronizarUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getContent() {
        if (this.state.loading) return <SLoad />
        return <>
            <SText fontSize={11}>Sincronizar huellas en los molinetes</SText>
            <SHr />
            <SView style={{
                height: 20,
                width: 20,
            }} center >
                <SIcon name={"Reload"} fill={STheme.color.text} />
            </SView>
        </>
    }
    render() {
        if (!this.props.key_usuario) return null;
        return (
            <SView onPress={() => {
                if (this.state.loading) return;

                dispositivo.Actions.sincronizarAll(this.props);
                new SThread(3000, "load", true).start(() => {
                    this.setState({ loading: false })
                })
                this.setState({ loading: true })

                // SSocket.send({
                //     servicio: "zkteco",
                //     component: "zkteco",
                //     type: "sincronizarUsuario",
                //     estado: "cargando",
                //     key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                //     data: {
                //         key_usuario: this.props.key_usuario,
                //         // key_sucursal: this.key_sucursal,
                //     }
                // })
            }} center style={{
                borderWidth: 1,
                borderRadius: 5,
                height: 60,
                width: 200,
                borderColor: "#ddd",
            }}>
                {this.getContent()}
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(SincronizarUsuario);