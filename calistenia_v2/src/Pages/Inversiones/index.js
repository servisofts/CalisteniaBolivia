import home from './Pages/home';
import tipo_comision from './Components/tipo_comision';
import fondo_inversion from './Components/fondo_inversion';
import fondo_inversion_sucursal from './Components/fondo_inversion_sucursal';
import fondo_inversion_usuario from './Components/fondo_inversion_usuario';
export default {
    Pages:{
        "inversiones": home,
        ...tipo_comision.Pages,
        ...fondo_inversion.Pages,
        ...fondo_inversion_sucursal.Pages,
        ...fondo_inversion_usuario.Pages,
    },
    Reducers:{
        ...tipo_comision.Reducers,
        ...fondo_inversion.Reducers,
        ...fondo_inversion_sucursal.Reducers,
        ...fondo_inversion_usuario.Reducers,
    }
}