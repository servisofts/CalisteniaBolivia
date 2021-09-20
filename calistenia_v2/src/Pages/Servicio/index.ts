import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

import Lista from './Page/Lista'
const Pages: SPageListProps = {
    "ServiciosPage":Lista
}


import servicioReducer from './Reducer/servicioReducer'
const Reducers = {
    servicioReducer
}


export default {
    Pages,
    Actions,
    Reducers
};