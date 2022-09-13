import React, { Component } from 'react';
import { SHr, SIcon, SLoad, SText, STheme, SView } from 'servisofts-component';
import Parent from ".."
class BtnSincronizar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getContent = () => {
        if (this.state.loading) return <SLoad />
        return <SView col={"xs-12"} height center row>
            <SIcon name={"Reload"} fill={STheme.color.lightGray} height={18} width={18} />
            <SView width={8} />
            <SText color={STheme.color.lightGray}>Sync users</SText>
        </SView>
    }

    render() {
        return (
            <SView col={"xs-12"} center
                onPress={() => {
                    if (this.state.loading) return;
                    this.setState({ loading: true });
                    Parent.Actions.sincronizarMolinete(this.props.dispositivo?.key, this.props.key_sucursal, (5 * 60 * 1000)).then((resp) => {
                        this.setState({ loading: false });
                        if (resp.estado == "exito") {
                            console.log("Exito al sincronizar molinete");
                        }
                    }).catch((e) => {
                        this.setState({ loading: false });
                        console.log("Error al sincronizar molinete");
                        console.log(e);
                    })
                }} >
                <SHr />
                {this.getContent()}
                <SHr />
            </SView>
        );
    }
}

export default (BtnSincronizar);