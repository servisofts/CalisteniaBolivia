import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

import Lista from './Pages/Lista'
// import Human from './Pages/Human'
import EntrenamientoPage from './Pages/EntrenamientoPage'
import Historial from './Pages/Historial'
import Perfil from './Pages/Perfil'
const Pages: SPageListProps = {
    "entrenamientos":Lista,
    "entrenamientos_historial":Historial,
    "entrenamiento_perfil":Perfil,
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