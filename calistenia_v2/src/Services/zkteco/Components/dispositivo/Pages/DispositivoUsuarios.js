
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView } from 'servisofts-component';
import Parent from ".."
import Usuario from '../../../../../Pages/Usuario';
class DispositivoUsuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key");
    }

    getData() {
        if (!this.key) return;
        if (this.state.data) return this.state.data;
        if (this.state.load) return;
        this.state.load = true;

        Parent.Actions.getUsuariosActivos(this.key).then((resp) => {
            this.state.load = false;
            if (resp.estado == "exito") {
                this.setState({ data: resp.data })
            }
        }).catch((e) => {
            this.state.load = false;
            console.log(e);
        })
    }

    getTable() {
        var data = this.getData();
        var usrs = Usuario.Actions.getAll(this.props);
        if (!data) return <SLoad />
        if (!usrs) return <SLoad />
        return <STable2
            rowHeight={30}
            limit={100}
            header={[
                { key: "index", label: "#", width: 30 },
                { key: "codigo", label: "Pin", width: 50 },
                {
                    key: "key_usuario", label: "Usuario", width: 300, render: (itm) => {
                        var usuario = usrs[itm];
                        return usuario?.Nombres + " " + usuario?.Apellidos
                    }
                },
                // {
                //     key: "key_usuario-1", label: "Usuario", width: 250
                // },
                {
                    key: "fecha_on", label: "Fecha on", order: "desc", width: 150, render: (itm) => {
                        return !itm ? "" : new SDate(itm).toString()
                    }
                },
                {
                    key: "fecha_edit", label: "Fecha edit", order: "desc", width: 150, render: (itm) => {
                        return !itm ? "" : new SDate(itm).toString()
                    }
                },

            ]}
            data={data}
        />
    }
    render() {
        return (
            <SPage title={"Usuarios del molinete"} disableScroll>
                {this.getTable()}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(DispositivoUsuarios);