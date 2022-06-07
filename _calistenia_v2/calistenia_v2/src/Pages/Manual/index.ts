import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

import Manual from './Page/Manual'
import Inicio from './Page/Inicio'
const Pages: SPageListProps = {
    "manual": Manual,
    "mn":Inicio,
}

const Reducers = {
}


export default {
    Pages,
    Actions,
    Reducers
};