import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';
import recuperar1 from './recuperar1';
export const Parent = {
    name: "cuenta",
    path: `/cuenta`,
}
export default SPage.combinePages(Parent.name, {
    "": root,
    "recuperar1": recuperar1,
});