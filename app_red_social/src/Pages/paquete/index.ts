import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';
export const Parent = {
    name: "paquete",
    path: `/paquete`,
}
export default SPage.combinePages(Parent.name, {
    "": root,
});