import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { MenuButtom, MenuPages } from 'servisofts-rn-roles_permisos';
import { Parent } from "."
import Model from '../../Model';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        let empresa = Model.empresa.Action.getSelect();
        if (!empresa) return <SLoad />
        return (
            <SPage title={Parent.title} onRefresh={(end) => {
                Model.usuarioPage.Action.CLEAR();
                end()
            }}>
                <SHr height={32} />
                <MenuPages path={Parent.path + "/"} blackList={["/contabilidad/asiento_contable"]}
                    params={{
                        key_empresa: empresa.key,
                        fecha_inicio: "2022-01-01",
                        fecha_fin: "2022-12-31"
                    }}
                    onPress={(e) => {
                        e.preventDefault();
                        console.log(e);
                    }}
                >
                    {/* <MenuButtom label={"Crear Asiento"} url={"/contabilidad/asiento"} icon={<SIcon name={"Add"} />} /> */}
                    {/* <MenuButtom label={"Asientos"} url={gestion?.key ? "/contabilidad/gestion/profile" : "/contabilidad/gestion"} params={{ pk: gestion?.key }} icon={<SIcon name={"Box"} fill={"#6ff"} />} /> */}
                </MenuPages>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);