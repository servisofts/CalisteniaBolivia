import { SPageListProps } from 'servisofts-component'
const ServiceName = "zkteco";

import dispositivo from './Components/dispositivo';
import usuario_huella from './Components/usuario_huella';
const Pages: SPageListProps = {
    ...dispositivo.Pages,
    ...usuario_huella.Pages
}

const Reducers = {
    ...dispositivo.Reducers,
    ...usuario_huella.Reducers
}

export default {
    ServiceName,
    Pages,
    Reducers

};

