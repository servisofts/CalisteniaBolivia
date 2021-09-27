import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

import Lista from './Pages/Lista'
import Human from './Pages/Human'

const Pages: SPageListProps = {
    "entrenamiento/lista":Lista,
    "entrenamiento/human":Human
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