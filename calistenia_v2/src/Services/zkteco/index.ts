import { SPageListProps } from 'servisofts-component'
const ServiceName = "zkteco";

import dispositivo from './Components/dispositivo';
const Pages: SPageListProps = {
    ...dispositivo.Pages
}

const Reducers = {
    ...dispositivo.Reducers
}

export default {
    ServiceName,
    Pages,
    Reducers

};

