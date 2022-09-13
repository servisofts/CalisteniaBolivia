import React, { Component } from 'react';
import { SIcon, SLoad, SPopup, SText, STheme, SView } from 'servisofts-component';
import Parent from ".."
class BtnTestConnection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exito: false
        };

    }
    componentDidMount() {
        // this.evento();
    }

    getContent = () => {
        if (this.state.loading) return <SLoad />
        return <SView col={"xs-12"} height center row>
            <SIcon name={"Wifi"} fill={this.state.exito ? "#0f0" : STheme.color.lightGray} height={18} width={18} />
            <SView width={8} />
            <SText color={this.state.exito ? "#0f0" : STheme.color.lightGray}>{this.state.exito ? "Exito" : "Test status"}</SText>
        </SView>
    }

    evento = () => {
        if (this.state.loading) return;
        this.setState({ loading: true });
        Parent.Actions.testConnection(this.props.dispositivo?.key).then((resp) => {
            this.setState({ loading: false });
            if (resp.estado == "exito") {
                this.state.exito = true;
                // SPopup.alert("Exito en la conexion");
            }
        }).catch((e) => {
            this.state.exito = false;
            this.setState({ loading: false });
            // SPopup.alert(e?.error ?? "Error desconocido");
            console.log(e);
        })
    }
    render() {
        return (
            <SView col={"xs-12"} center height={30}
                onPress={() => {
                    this.evento();
                }} >
                {this.getContent()}
            </SView>
        );
    }
}

export default (BtnTestConnection);