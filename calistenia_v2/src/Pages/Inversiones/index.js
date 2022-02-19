import home from './Pages/home';
import tipo_comision from './Components/tipo_comision';
import fondo_inversion from './Components/fondo_inversion';
import fondo_inversion_sucursal from './Components/fondo_inversion_sucursal';
import fondo_inversion_usuario from './Components/fondo_inversion_usuario';
import fondo_inversion_preventa from './Components/fondo_inversion_preventa';
import invertir from './Components/invertir';
export default {
    Pages:{
        "inversiones": home,
        ...tipo_comision.Pages,
        ...fondo_inversion.Pages,
        ...fondo_inversion_sucursal.Pages,
        ...fondo_inversion_usuario.Pages,
        ...fondo_inversion_preventa.Pages,
        ...invertir.Pages
    },
    Reducers:{
        ...tipo_comision.Reducers,
        ...fondo_inversion.Reducers,
        ...fondo_inversion_sucursal.Reducers,
        ...fondo_inversion_usuario.Reducers,
        ...fondo_inversion_preventa.Reducers,
    }
}