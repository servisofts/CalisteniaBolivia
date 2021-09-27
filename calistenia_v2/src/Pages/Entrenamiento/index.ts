import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

import Lista from './Pages/Lista'
const Pages: SPageListProps = {
    // "entrenamiento/lista":Lista
}

import entrenamientoReducer from './Reducer/entrenamientoReducer'
const Reducers = {
    entrenamientoReducer
}


export default {
    Pages,
    Actions,
    Reducers
};