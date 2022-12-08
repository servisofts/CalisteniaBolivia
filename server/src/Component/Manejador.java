package Component;

import org.json.JSONObject;

import SSComponent.SSManejador;
import Server.SSSAbstract.SSSessionAbstract;
import SocketCliente.SocketCliete;
import util.console;

public class Manejador {

    public Manejador(JSONObject data, SSSessionAbstract session) {
        boolean showLog = true;
        if (data.getString("component").equals("socketTest")) {
            showLog = false;
        }
        if (showLog)
            console.log(console.ANSI_BLUE, " Manejador Socket Server -> : " + data.getString("component"));

        if (!data.isNull("component")) {
            switch (data.getString("component")) {
                case "usuario": {
                    new Usuario(data, session);
                    break;
                }
                case "cabeceraDato": {
                    new CabeceraDato(data, session);
                    break;
                }
                case "mensajeSocket": {
                    MensajeSocket.onMensaje(data, session);
                    break;
                }
                case "socketTest": {
                    new SocketTest(data, session);
                    break;
                }
                case "file": {
                    new SFile(data, session);
                    break;
                }
                case "old": {
                    new Old(data, session);
                    break;
                }
                case "modulo": {
                    new Modulo(data, session);
                    break;
                }
                case "proceso": {
                    new Proceso(data, session);
                    break;
                }
                case "procesoComentario": {
                    new ProcesoComentario(data, session);
                    break;
                }
                case "procesoSeguimiento": {
                    new ProcesoSeguimiento(data, session);
                    break;
                }
                case "tipoSeguimiento": {
                    new TipoSeguimiento(data, session);
                    break;
                }
                case "tipoUsuario": {
                    new TipoUsuario(data, session);
                    break;
                }
                case "servicio": {
                    new Servicio(data, session);
                    break;
                }
                case "paquete": {
                    new Paquete(data, session);
                    break;
                }
                case "paqueteServicio": {
                    new PaqueteServicio(data, session);
                    break;
                }
                case "paqueteVenta": {
                    new PaqueteVenta(data, session);
                    break;
                }
                case "locationGoogle": {
                    new LocationGoogle(data, session);
                    break;
                }
                case "sucursal": {
                    new Sucursal(data, session);
                    break;
                }
                case "entrenamiento": {
                    new Entrenamiento(data, session);
                    break;
                }
                case "cliente": {
                    new Cliente(data, session);
                    break;
                }
                case "clientesActivos": {
                    new ClientesActivos(data, session);
                    break;
                }
                case "caja": {
                    new Caja(data, session);
                    break;
                }
                case "tipoPago": {
                    new TipoPago(data, session);
                    break;
                }
                case "cajaMovimiento": {
                    new CajaMovimiento(data, session);
                    break;
                }
                case "cajaTipoMovimiento": {
                    new CajaTipoMovimiento(data, session);
                    break;
                }
                case "cuentaBanco": {
                    new CuentaBanco(data, session);
                    break;
                }
                case "cuentaBancoMovimiento": {
                    new CuentaBancoMovimiento(data, session);
                    break;
                }
                case "sucursalTipoPagoCuentaBanco": {
                    new SucursalTipoPagoCuentaBanco(data, session);
                    break;
                }
                case "tipoGasto": {
                    new TipoGasto(data, session);
                    break;
                }
                case "asistencia": {
                    new Asistencia(data, session);
                    break;
                }
                case "reporte": {
                    new Reporte(data, session);
                    break;
                }
                case FondoInversion.nombre_tabla: {
                    new FondoInversion(data, session);
                    break;
                }
                case TipoComision.nombre_tabla: {
                    new TipoComision(data, session);
                    break;
                }
                case FondoInversionSucursal.nombre_tabla: {
                    new FondoInversionSucursal(data, session);
                    break;
                }
                case FondoInversionUsuario.nombre_tabla: {
                    new FondoInversionUsuario(data, session);
                    break;
                }
                case SucursalServicio.nombre_tabla: {
                    new SucursalServicio(data, session);
                    break;
                }
                case SucursalUsuario.nombre_tabla: {
                    new SucursalUsuario(data, session);
                    break;
                }
                case SucursalPaquete.nombre_tabla: {
                    new SucursalPaquete(data, session);
                    break;
                }
                case "prorroga": {
                    new Prorroga(data, session);
                    break;
                }
                case "billetera": {
                    new Billetera(data, session);
                    break;
                }
                case Publicacion.COMPONENT:
                    Publicacion.onMessage(data, session);
                break;
                case PublicacionDetalle.COMPONENT:
                    PublicacionDetalle.onMessage(data, session);
                break;
                case Comentario.COMPONENT:
                    Comentario.onMessage(data, session);
                break;
                case Etiqueta.COMPONENT:
                    Etiqueta.onMessage(data, session);
                break;
                case SucursalSincronizacion.COMPONENT:
                    SucursalSincronizacion.onMessage(data, session);
                break;
                default:
                    redirect(data, session);
            }
        } else {
            data.put("error", "No existe el componente");
        }
    }

    private void redirect(JSONObject data, SSSessionAbstract session){
        if(data.has("service")){
            switch(data.getString("service")){
                case "zkteco":
                    data.remove("service");
                    SocketCliete.send("zkteco", data,session);
                    data.put("noSend", true);
                    return;
            }
        }
        switch(data.getString("component")){
            case "rol":
                SocketCliete.send("roles_permisos", data, session);
            break;
            case "page":
                SocketCliete.send("roles_permisos", data, session);
            break;
            case "permiso":
                SocketCliete.send("roles_permisos", data, session);
            break;
            case "rolPermiso":
                SocketCliete.send("roles_permisos", data, session);
            break;
            case "usuarioRol":
                SocketCliete.send("roles_permisos", data, session);
            break;
            case "usuarioPage":
                SocketCliete.send("roles_permisos", data, session);
            break;
            case "dispositivo":
                SocketCliete.send("zkteco", data, session);
            break;
            default: SSManejador.navigate(data, session);
        }
    }
}