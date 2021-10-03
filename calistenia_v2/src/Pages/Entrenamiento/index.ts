import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

import Lista from './Pages/Lista'
// import Human from './Pages/Human'
import EntrenamientoPage from './Pages/EntrenamientoPage'
const Pages: SPageListProps = {
    "entrenamientos":Lista,
    // "entrenamiento/human":Human,
    EntrenamientoPage
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