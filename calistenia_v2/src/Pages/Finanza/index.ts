import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

import EstadoFinanciero from './Pages/EstadoFinanciero'
import EstadoFinancieroSelect from './Pages/EstadoFinancieroSelect'
import FinanzaPage from './Pages/FinanzaPage'
import IngresosEgresos from './Pages/IngresosEgresos'
import modelo from "./Pages/Modelo"
import PaquetesVendidos from './Pages/PaquetesVendidos'
import ReporteAsistencia from './Pages/ReporteAsistencia'
import ReporteBancos from './Pages/ReporteBancos'
import ReporteProrroga from './Pages/ReporteProrroga'
import reporte_montos_actuales_todas_las_cajas from './Pages/reporte_montos_actuales_todas_las_cajas';
import reporte_movimientos_banco from './Pages/reporte_movimientos_banco';
import reporte_movimientos_caja from './Pages/reporte_movimientos_caja';
import reporte_paquetes_anulados_todas_las_cajas from './Pages/reporte_paquetes_anulados_todas_las_cajas'
import UsuariosTabla from './Pages/UsuariosTabla'
const Pages: SPageListProps = {
  FinanzaPage,
  ReporteBancos,
  PaquetesVendidos,
  ReporteAsistencia,
  IngresosEgresos,
  EstadoFinanciero,
  EstadoFinancieroSelect,
  UsuariosTabla,
  ReporteProrroga,
  reporte_montos_actuales_todas_las_cajas,
  reporte_paquetes_anulados_todas_las_cajas,
  reporte_movimientos_banco,
  reporte_movimientos_caja,
  modelo
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