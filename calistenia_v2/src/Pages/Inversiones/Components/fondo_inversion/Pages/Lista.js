import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView } from 'servisofts-component';
import Parent from ".."
import FloatButtom from '../../../../../Components/FloatButtom';
class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        Parent.struct.fk.map((item) => {
            this[item] = SNavigation.getParam(item);
        })
    }

    createStruct() {
        var struct = [];
        Parent.struct.metas.map((item) => {
            if (item.hidden) return null;
            struct.push({
                key: item.key,
                label: item.label,
                type: item.type,
                width: item.width
            })
        })
        return struct;
    }
    getLista() {
        var data = Parent.Actions.getAll(this.props);
        if (!data) return <SLoad />
        return <STable2
            header={[
                { key: "index", label: "#", width: 50 },
                ...this.createStruct(),
                {
                    key: "key-editar", label: "Editar", width: 50, center: true,
                    component: (item) => {
                        return <SView onPress={() => { SNavigation.navigate(Parent.component + "/registro", { key: item }) }}>
                            <SIcon name={"Edit"} width={35} />
                        </SView>
                    }
                },

                {
                    key: "key-eliminar", label: "Eliminar", width: 70, center: true,
                    component: (key) => {
                        return <SView width={35} height={35} onPress={() => { SPopup.confirm({ title: "Eliminar", message: "¿Esta seguro de eliminar?", onPress: () => { Parent.Actions.eliminar(data[key], this.props) } }) }}>
                            <SIcon name={'Delete'} />
                        </SView>
                    }
                },
                {
                    key: "key-ver", label: "Ver", width: 50, center: true,
                    component: (item) => {
                        return <SView onPress={() => { SNavigation.navigate(Parent.component + "/perfil", { key: item }) }}>
                            <SIcon name={"Salir"} width={35} />
                        </SView>
                    }
                },
                {
                    key: "key-fondo_inversion_sucursal", label: "Sucursales", width: 50, center: true,
                    component: (item) => {
                        return <SView onPress={() => { SNavigation.navigate("fondo_inversion_sucursal", { key_fondo_inversion: item }) }}>
                            <SIcon name={"Ajustes"} width={35} />
                        </SView>
                    }
                },
                {
                    key: "key-fondo_inversion_usuario", label: "Inversionistas", width: 50, center: true,
                    component: (item) => {
                        return <SView onPress={() => { SNavigation.navigate("fondo_inversion_usuario", { key_fondo_inversion: item }) }}>
                            <SIcon name={"Usuarios_all"} width={35} />
                        </SView>
                    }
                },



            ]}
            filter={(data) => {
                if (data.estado != 1) return false;
                var isValid = true;
                Parent.struct.fk.map((item) => {
                    if (this[item] != data[item]) isValid = false;
                })
                return isValid;
            }}
            data={data}
        />
    }

    render() {
        return (
            <SPage title={'Lista de ' + Parent.component} disableScroll>
                {this.getLista()}
                <FloatButtom onPress={() => {
                    Parent.Actions._getReducer(this.props).estado = "";
                    SNavigation.navigate(Parent.component + "/registro", { key_servicio: this.key_servicio });
                }} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Lista);