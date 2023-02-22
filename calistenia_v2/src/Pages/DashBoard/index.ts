import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

import db from './Pages/db'
import grafico from './Pages/Grafico'
const Pages: SPageListProps = {
  db,
  grafico
}


const Reducers = {

}


export default {
  Pages,
  Actions,
  Reducers
};