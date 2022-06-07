import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

import Lista from './Pages/Lista'
import Registro from './Pages/Registro'
const Pages: SPageListProps = {
    "billetera": Lista,
    "billetera/registro": Registro,
}
import reducer from './Reducer/reducer'
const Reducers = {
    "billeteraReducer": reducer
}


export default {
    Pages,
    Actions,
    Reducers
};