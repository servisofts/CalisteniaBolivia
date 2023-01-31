import Component.*;
import Component.Bancos.Banco;
import Component.Bancos.Billetera;
import Component.Bancos.CuentaBanco;
import Component.Bancos.CuentaBancoMovimiento;
import Component.Cajas.Caja;
import Component.Cajas.CajaMovimiento;
import Component.Cajas.CajaTipoMovimiento;
import Component.Cajas.TipoPago;
import Component.Clientes.ClientesActivos;
import Component.Entrenamientos.Asistencia;
import Component.Entrenamientos.Entrenamiento;
import Component.Inversiones.FondoInversion;
import Component.Inversiones.FondoInversionPreventa;
import Component.Inversiones.FondoInversionSucursal;
import Component.Inversiones.FondoInversionUsuario;
import Component.Inversiones.TipoComision;
import Component.RedSocial.Comentario;
import Component.RedSocial.Publicacion;
import Component.RedSocial.PublicacionDetalle;
import Component.Sucursales.Sucursal;
import Component.Sucursales.SucursalPaquete;
import Component.Sucursales.SucursalServicio;
import Component.Sucursales.SucursalSincronizacion;
import Component.Sucursales.SucursalTipoPagoCuentaBanco;
import Component.Sucursales.SucursalUsuario;
import Component.Ventas.Paquete;
import Component.Ventas.PaqueteServicio;
import Component.Ventas.PaqueteVenta;
import Component.Ventas.PaqueteVentaUsuario;
import Component.Ventas.Prorroga;
import Servisofts.SConsole;
import org.json.JSONObject;
import Server.SSSAbstract.SSSessionAbstract;

public class Manejador {
    public static void onMessage(JSONObject obj, SSSessionAbstract session) {
        if (session != null) {
            SConsole.log(session.getIdSession(), "\t|\t", obj.getString("component"), obj.getString("type"));
        } else {
            SConsole.log("http-server", "-->", obj.getString("component"), obj.getString("type"));
        }
        if (obj.isNull("component")) {
            return;
        }
        switch (obj.getString("component")) {

            // ******************** Bancos ********************
            case Banco.COMPONENT:
                Banco.onMessage(obj, session);
                break;
            case CuentaBanco.COMPONENT:
                new CuentaBanco(obj, session);
                break;
            case CuentaBancoMovimiento.COMPONENT:
                new CuentaBancoMovimiento(obj, session);
                break;
            case Billetera.COMPONENT:
                new Billetera(obj, session);
                break;

            // ******************** Cajas ********************
            case Caja.COMPONENT:
                new Caja(obj, session);
                break;
            case CajaMovimiento.COMPONENT:
                new CajaMovimiento(obj, session);
                break;
            case CajaTipoMovimiento.COMPONENT:
                new CajaTipoMovimiento(obj, session);
                break;
            case TipoPago.COMPONENT:
                new TipoPago(obj, session);
                break;

            // ******************** Clientes ********************
            case ClientesActivos.COMPONENT:
                new ClientesActivos(obj, session);
                break;

            // ******************** Entrenamientos ********************
            case Asistencia.COMPONENT:
                new Asistencia(obj, session);
                break;
            case Entrenamiento.COMPONENT:
                new Entrenamiento(obj, session);
                break;

            // ******************** Inversiones ********************
            case FondoInversion.COMPONENT:
                new FondoInversion(obj, session);
                break;
            case FondoInversionPreventa.COMPONENT:
                FondoInversionPreventa.onMessage(obj, session);
                break;
            case FondoInversionSucursal.COMPONENT:
                new FondoInversionSucursal(obj, session);
                break;
            case FondoInversionUsuario.COMPONENT:
                new FondoInversionUsuario(obj, session);
                break;
            case TipoComision.COMPONENT:
                new TipoComision(obj, session);
                break;

            // ******************** RedSocial ********************
            case Comentario.COMPONENT:
                Comentario.onMessage(obj, session);
                break;
            case Publicacion.COMPONENT:
                Publicacion.onMessage(obj, session);
                break;
            case PublicacionDetalle.COMPONENT:
                PublicacionDetalle.onMessage(obj, session);
                break;

            // ******************** Sucursales ********************
            case Sucursal.COMPONENT:
                new Sucursal(obj, session);
                break;
            case SucursalPaquete.COMPONENT:
                new SucursalPaquete(obj, session);
                break;
            case SucursalServicio.COMPONENT:
                new SucursalServicio(obj, session);
                break;
            case SucursalSincronizacion.COMPONENT:
                SucursalSincronizacion.onMessage(obj, session);
                break;
            case SucursalTipoPagoCuentaBanco.COMPONENT:
                new SucursalTipoPagoCuentaBanco(obj, session);
                break;
            case SucursalUsuario.COMPONENT:
                new SucursalUsuario(obj, session);
                break;

            // ******************** Ventas ********************
            case Paquete.COMPONENT:
                new Paquete(obj, session);
                break;
            case PaqueteServicio.COMPONENT:
                new PaqueteServicio(obj, session);
                break;
            case PaqueteVenta.COMPONENT:
                new PaqueteVenta(obj, session);
                break;
            case PaqueteVentaUsuario.COMPONENT:
                new PaqueteVentaUsuario(obj, session);
                break;
            case Prorroga.COMPONENT:
                new Prorroga(obj, session);
                break;

            // ******************** OROS ********************
            case Reporte.COMPONENT:
                new Reporte(obj, session);
                break;
            case Servicio.COMPONENT:
                new Servicio(obj, session);
                break;
            case ZKTeco.COMPONENT:
                new ZKTeco(obj);
                break;

        }
    }
}
