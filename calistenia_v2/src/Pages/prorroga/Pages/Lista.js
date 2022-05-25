import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView } from 'servisofts-component';
import Parent from ".."
import FloatButtom from '../../../Components/FloatButtom';
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
                { key: "key_paquete_venta_usuario", label: "key_paquete_venta_usuario", width: 100 },
                { key: "fecha_fin", label: "fecha_fin", width: 100 },
                { key: "fecha_on", label: "fecha_on", width: 100 },
                ...this.createStruct(),
                {
                    key: "key-eliminar", label: "Eliminar", width: 70, center: true,
                    component: (key) => {
                        return <SView width={35} height={35} onPress={() => {
                            SPopup.confirm({
                                title: "Eliminar", message: "¿Esta seguro de eliminar?", onPress: () => {
                                    Parent.Actions.anular(data[key], this.props)
                                }
                            })
                        }}>
                            <SIcon name={'Delete'} />
                        </SView>
                    }
                },




            ]}
            filter={(data) => {
                if (data.estado != 1) return false;
                var isValid = true;
                // Parent.struct.fk.map((item) => {
                //     if (this[item] != data[item]) isValid = false;
                // })
                return isValid;
            }}
            data={data}
        />
    }

    render() {
        return (
            <SPage title={'Lista de ' + Parent.component} disableScroll>
                {this.getLista()}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Lista);