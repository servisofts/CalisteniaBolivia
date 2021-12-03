import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

import FinanzaPage from './Pages/FinanzaPage'
import ReporteBancos from './Pages/ReporteBancos'
import PaquetesVendidos from './Pages/PaquetesVendidos'
import ReporteAsistencia from './Pages/ReporteAsistencia'
import IngresosEgresos from './Pages/IngresosEgresos'
import EstadoFinanciero from './Pages/EstadoFinanciero'
import EstadoFinancieroSelect from './Pages/EstadoFinancieroSelect'
const Pages: SPageListProps = {
    FinanzaPage,
    ReporteBancos,
    PaquetesVendidos,
    ReporteAsistencia,
    IngresosEgresos,
    EstadoFinanciero,
    EstadoFinancieroSelect

}

import reporteReducer from './Reducer/reporteReducer'
const Reducers = {
    reporteReducer
}


export default {
    Pages,
    Actions,
    Reducers
};