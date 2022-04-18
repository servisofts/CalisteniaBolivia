import { SPageListProps } from 'servisofts-component'
const ServiceName = "zkteco";

import dispositivo from './Components/dispositivo';
import usuario_huella from './Components/usuario_huella';
import punto_venta from './Components/punto_venta';
import dispositivo_historico from './Components/dispositivo_historico';
import lector_huella from './Components/lector_huella';
const Pages: SPageListProps = {
    ...dispositivo.Pages,
    ...usuario_huella.Pages,
    ...punto_venta.Pages,
    ...dispositivo_historico.Pages,
    ...lector_huella.Pages
}

const Reducers = {
    ...dispositivo.Reducers,
    ...usuario_huella.Reducers,
    ...punto_venta.Reducers,
    ...dispositivo_historico.Reducers,
    ...lector_huella.Reducers

}

export default {
    ServiceName,
    Pages,
    Reducers

};

