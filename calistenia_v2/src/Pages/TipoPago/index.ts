import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

import TipoPagoPage from './Page/TipoPagoPage'
const Pages: SPageListProps = {
    TipoPagoPage
}
import tipoPagoReducer from './Reducer/tipoPagoReducer'
const Reducers = {
    tipoPagoReducer
}


export default {
    Pages,
    Actions,
    Reducers
};