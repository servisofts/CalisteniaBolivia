import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
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
        let gestion = Model.gestion.Action.getSelect();
        return (
            <SPage title={Parent.title}>
                <SHr height={32} />
                <MenuPages path={Parent.path + "/"} blackList={["/contabilidad/asiento_contable"]} >
                    {/* <MenuButtom label={"Cuentas"} url={"/contabilidad/cuentas"} /> */}
                    <MenuButtom label={"Crear Asiento"} url={"/contabilidad/asiento"} icon={<SIcon name={"Add"} />} />
                    {/* <MenuButtom label={"Balance general"} url={"/contabilidad/balance_general"} icon={<SIcon name={"Box"} fill={"#f66"} />} /> */}
                    {/* <MenuButtom label={"Sumas y saldos"} url={"/contabilidad/sumas_saldos"} icon={<SIcon name={"Box"} fill={"#ff6"} />} /> */}
                    {/* <MenuButtom label={"Estado de resultados"} url={"/contabilidad/estado_resultado"} icon={<SIcon name={"Box"} fill={"#6f6"} />} /> */}
                    <MenuButtom label={"Asientos"} url={"/contabilidad/gestion/profile"} params={{ pk: gestion?.key }} icon={<SIcon name={"Box"} fill={"#6ff"} />} />
                </MenuPages>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);