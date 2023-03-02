import { SHr, SIcon, SNavigation, SText, SView } from 'servisofts-component';
import DPA, { connect } from 'servisofts-page';
import { MenuButtom, MenuPages } from 'servisofts-rn-roles_permisos';
import { Parent } from "."
import Model from '../../../Model';
import ListaAsientos from './Components/listaAsientos';
import item from "./item";
class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            item: item,
            excludes: ["key", "key_usuario", "key_servicio", "key_sucursal"],

        });
    }
    $allowEdit() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $allowDelete() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "delete" })
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }

    $footer() {
        return <SView col={"xs-12"} center>
            <SHr />
            <ListaAsientos key_gestion={this.pk} />
            {/* <MenuPages path={"/contabilidad/gestion/profile/"} >
                <MenuButtom label={"Asientos"} icon={<SIcon name='Add' />}
                    onPress={() => { SNavigation.navigate("/contabilidad/asiento_contable", { key_gestion: this.pk }) }}
                />
            </MenuPages> */}
            {/* <SText>Ver asientos</SText> */}
        </SView>
    }
}
export default connect(index);