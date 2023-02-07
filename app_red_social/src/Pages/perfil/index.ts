import { SPage } from 'servisofts-component';

import root from './root';
import editar from './editar';

export const Parent = {
    name: "perfil",
    path: "/perfil"
}
export default SPage.combinePages(Parent.name, {
    "": root,
    "editar":editar,

});