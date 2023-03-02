import { SNavigation, SText, SView } from 'servisofts-component';
import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { AsientoContableStatic } from 'servisofts-rn-contabilidad';
import Model from '../../../Model';

class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            params: ["key_gestion"],
            type: "page",
            excludes: ["key", "key_usuario", "key_servicio", "key_sucursal"],
        });
    }
    $allowEdit() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }

    onEdit() {
        SNavigation.navigate("/contabilidad/asiento", {
            pk: this.pk,
            key_gestion: this.$params.key_gestion
        })
    }
    // $allowDelete() {
    //     return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "delete" })
    // }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $getData() {
        console.log(this.$params.key_gestion)
        return null;
        var data = Parent.model.Action.getAll({ key_gestion: this.$params.key_gestion })
        if (!data) return null;
        return data[this.pk]
    }


    $render() {
        // this.data = this.$getData();
        // if (!this.data) return null;
        return <AsientoContableStatic key_asiento_contable={this.pk} key_gestion={this.$params.key_gestion} />
    }
}
export default connect(index);