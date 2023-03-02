import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';
export const Parent = {
    name: "cuenta",
    path: `/cuenta`,
}
export default SPage.combinePages(Parent.name, {
    "": root,
    // "membresia/qr": qr,

});