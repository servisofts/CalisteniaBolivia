import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../../Model';
import item from "./item";
class index extends DPA.list {
    constructor(props) {
        super(props, {
            Parent: Parent,
            item: item,
            excludes: ["key", "fecha_on", "key_usuario", "key_empresa"],
        });
    }
    $allowNew() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    }
    onNew(){
        // Model.
    }
    // $allowTable() {
    //     return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "table" });
    // }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $filter(data) {
        return data.estado != 0
    }
    $order() {
        return [{ key: "fecha", order: "desc" }]
    }
    $getData() {
        var data = Parent.model.Action.getAll();
        return data;
    }
    
}
export default connect(index);