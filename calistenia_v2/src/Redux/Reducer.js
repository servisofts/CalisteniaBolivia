import clientesActivosReducer from '../Pages/Usuario/Reducer/clientesActivosReducer';
import Sucursal from '../Pages/Sucursal';
import TipoPago from '../Pages/TipoPago';
import Paquete from '../Pages/Paquete';
import Servicio from '../Pages/Servicio';
import Banco from '../Pages/Banco';
import Caja from '../Pages/Caja';
import PaqueteVenta from '../Pages/PaqueteVenta';
import Entrenamiento from '../Pages/Entrenamiento';
import Asistencia from '../Pages/Asistencia';
import Finanza from '../Pages/Finanza';
import Manual from '../Pages/Manual';
import Billetera from '../Pages/Billetera';
import Inversiones from '../Pages/Inversiones';
import sucursal_servicio from '../Pages/sucursal_servicio';
import sucursal_usuario from '../Pages/sucursal_usuario';
import sucursal_paquete from '../Pages/sucursal_paquete';
import prorroga from '../Pages/prorroga';
import Services from '../Services';
import Client from '../Client';


export default {
    clientesActivosReducer,
    ...Sucursal.Reducers,
    ...TipoPago.Reducers,
    ...Paquete.Reducers,
    ...Servicio.Reducers,
    ...Banco.Reducers,
    ...Caja.Reducers,
    ...PaqueteVenta.Reducers,
    ...Entrenamiento.Reducers,
    ...Asistencia.Reducers,
    ...Finanza.Reducers,
    ...Manual.Reducers,
    ...Billetera.Reducers,
    ...Inversiones.Reducers,
    ...sucursal_servicio.Reducers,
    ...sucursal_usuario.Reducers,
    ...prorroga.Reducers,
    ...sucursal_paquete.Reducers,
    ...Services.Reducers,
    ...Client.Reducers
}