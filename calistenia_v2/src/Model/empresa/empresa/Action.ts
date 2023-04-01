import { SAction } from "servisofts-model";
export default class Action extends SAction {

    getSelect() {
        var data = super.getAll();
        if (!data) return null;
        if (Object.values(data).length > 0) {
            // return Object.values(data).find((obj: any) => obj.nit == "11223344")
            return Object.values(data).find((obj: any) => obj.nit == "308210028")
        }
        return null;
    }
}