package component;

import java.io.File;
import Config.Config;
import java.text.DateFormat;
import Email.Email;
import Server.SSSAbstract.SSServerAbstract;
import java.util.UUID;
import org.json.JSONArray;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.sql.SQLException;
import conexion.Conexion;
import SocketCliente.SocketCliete;
import Server.SSSAbstract.SSSessionAbstract;
import org.json.JSONObject;

public class PaqueteVenta
{
    public PaqueteVenta(final JSONObject data, final SSSessionAbstract session) {
        final String string;
        switch (string = data.getString("type")) {
            case "editar": {
                this.editar(data, session);
                return;
            }
            case "getAll": {
                this.getAll(data, session);
                return;
            }
            case "registro": {
                this.registro(data, session);
                return;
            }
            case "getAllByUsuario": {
                this.getAllByUsuario(data, session);
                return;
            }
            case "eliminar": {
                this.eliminar(data, session);
                return;
            }
            case "subirFoto": {
                this.subirFoto(data, session);
                return;
            }
            case "getRecibo": {
                this.getRecibo(data, session);
                return;
            }
            case "getByKey": {
                this.getByKey(data, session);
                return;
            }
            default:
                break;
        }
        this.defaultType(data, session);
    }
    
    public void defaultType(final JSONObject obj, final SSSessionAbstract session) {
        SocketCliete.send("usuario", obj, session);
    }
    
    public void getAll(final JSONObject obj, final SSSessionAbstract session) {
        try {
            final String consulta = "select get_all('paquete_venta','key_paquete','" + obj.getString("key_paquete") + "') as json";
            final JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", (Object)data);
            obj.put("estado", (Object)"exito");
        }
        catch (SQLException e) {
            obj.put("estado", (Object)"error");
            e.printStackTrace();
        }
    }
    
    public void getAllByUsuario(final JSONObject obj, final SSSessionAbstract session) {
        try {
            final String consulta = "select paquete_venta_get_all('" + obj.getString("key_usuario") + "') as json";
            final JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", (Object)data);
            obj.put("estado", (Object)"exito");
        }
        catch (SQLException e) {
            obj.put("estado", (Object)"error");
            e.printStackTrace();
        }
    }
    
    public void getByKey(final JSONObject obj, final SSSessionAbstract session) {
        try {
            final String consulta = "select get_by_key('paquete_venta','" + obj.getString("key") + "') as json";
            final JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), "paquete_venta_getByKey", data);
            obj.put("data", (Object)data);
            obj.put("estado", (Object)"exito");
        }
        catch (SQLException e) {
            obj.put("estado", (Object)"error");
            e.printStackTrace();
        }
    }
    
    public void getRecibo(final JSONObject obj, final SSSessionAbstract session) {
        try {
            final String consulta = "select get_recibo('" + obj.getString("key") + "') as json";
            final JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), "paquete_venta_getByKey", data);
            obj.put("data", (Object)data);
            obj.put("estado", (Object)"exito");
        }
        catch (SQLException e) {
            obj.put("estado", (Object)"error");
            e.printStackTrace();
        }
    }
    
    public void registro(final JSONObject obj, final SSSessionAbstract session) {
        try {
            final DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            final String fecha_on = formatter.format(new Date());
            final JSONObject paquete_venta = obj.getJSONObject("data");
            paquete_venta.put("fecha_on", (Object)fecha_on);
            paquete_venta.put("estado", 1);
            Conexion.insertArray("paquete_venta", new JSONArray().put((Object)paquete_venta));
            final JSONObject caja_activa = Caja.getActiva(obj.getString("key_usuario"));
            if (caja_activa == null) {
                obj.put("estado", (Object)"error");
                obj.put("error", (Object)"sin_caja");
                return;
            }
            final JSONObject cajaTipoPagoCuentaBanco = SucursalTipoPagoCuentaBanco.getByKeySucursal(caja_activa.getString("key_sucursal"));
            final JSONArray clientes = obj.getJSONArray("clientes");
            final JSONArray paquete_venta_usuarios = new JSONArray();
            final JSONObject send_movimiento = new JSONObject();
            send_movimiento.put("component", (Object)"cajaMovimiento");
            send_movimiento.put("type", (Object)"registro");
            send_movimiento.put("key_usuario", (Object)obj.getString("key_usuario"));
            send_movimiento.put("estado", (Object)"exito");
            for (int i = 0; i < clientes.length(); ++i) {
                final JSONObject paquete_venta_usuario = new JSONObject();
                paquete_venta_usuario.put("key", (Object)UUID.randomUUID().toString());
                paquete_venta_usuario.put("key_usuario", (Object)clientes.getJSONObject(i).getString("key"));
                paquete_venta_usuario.put("fecha_inicio", (Object)clientes.getJSONObject(i).getString("fecha_inicio"));
                paquete_venta_usuario.put("fecha_fin", (Object)clientes.getJSONObject(i).getString("fecha_fin"));
                paquete_venta_usuario.put("key_paquete_venta", paquete_venta.get("key"));
                paquete_venta_usuario.put("key_caja", caja_activa.get("key"));
                paquete_venta_usuario.put("fecha_on", (Object)formatter.format(new Date()));
                paquete_venta_usuario.put("estado", 1);
                paquete_venta_usuarios.put((Object)paquete_venta_usuario);
                final JSONObject data = clientes.getJSONObject(i).getJSONObject("data");
                double monto = 0.0;
                try {
                    for (int j = 0; j < JSONObject.getNames(data).length; ++j) {
                        try {
                            data.getJSONObject(JSONObject.getNames(data)[j]);
                            monto += data.getJSONObject(JSONObject.getNames(data)[j]).getDouble("monto");
                            data.getJSONObject(JSONObject.getNames(data)[j]).put("key_paquete_venta_usuario", (Object)paquete_venta_usuario.getString("key"));
                            data.getJSONObject(JSONObject.getNames(data)[j]).put("key_tipo_pago", (Object)JSONObject.getNames(data)[j]);
                            data.getJSONObject(JSONObject.getNames(data)[j]).put("key_usuario", (Object)clientes.getJSONObject(i).getString("key"));
                            JSONObject caja_movimiento = Caja.addVentaServicio(caja_activa.getString("key"), obj.getString("key_usuario"), JSONObject.getNames(data)[j], data.getJSONObject(JSONObject.getNames(data)[j]).getDouble("monto"), formatter.format(new Date()), data.getJSONObject(JSONObject.getNames(data)[j]));
                            send_movimiento.put("data", (Object)caja_movimiento);
                            SSServerAbstract.sendAllServer(send_movimiento.toString());
                            if (JSONObject.getNames(data)[j].equals("2") || JSONObject.getNames(data)[j].equals("3")) {
                                if (JSONObject.getNames(data)[j].equals("3")) {
                                    final String codigo = data.getJSONObject(JSONObject.getNames(data)[j]).getString("C\u00f3digo");
                                    final JSONObject billetera = Billetera.getByCodigo(codigo);
                                    billetera.put("estado", 0);
                                    Conexion.editObject("billetera", billetera);
                                }
                                final String keyMovimientoOld = caja_movimiento.getString("key");
                                data.put("key_cuenta_banco", (Object)cajaTipoPagoCuentaBanco.getJSONObject(JSONObject.getNames(data)[j]).getString("key_cuenta_banco"));
                                caja_movimiento = Caja.addTraspasoBanco(caja_activa.getString("key"), obj.getString("key_usuario"), JSONObject.getNames(data)[j], data.getJSONObject(JSONObject.getNames(data)[j]).getDouble("monto") * -1.0, formatter.format(new Date()), data.getJSONObject(JSONObject.getNames(data)[j]));
                                send_movimiento.put("data", (Object)caja_movimiento);
                                SSServerAbstract.sendAllServer(send_movimiento.toString());
                                final JSONObject cuentaBancoMovimiento = new JSONObject();
                                cuentaBancoMovimiento.put("key", (Object)UUID.randomUUID().toString());
                                cuentaBancoMovimiento.put("descripcion", (Object)"Ingreso por venta de servicio.");
                                cuentaBancoMovimiento.put("key_cuenta_banco", (Object)data.getString("key_cuenta_banco"));
                                cuentaBancoMovimiento.put("key_usuario", (Object)obj.getString("key_usuario"));
                                cuentaBancoMovimiento.put("monto", data.getJSONObject(JSONObject.getNames(data)[j]).getDouble("monto"));
                                cuentaBancoMovimiento.put("data", (Object)new JSONObject().put("key_caja_movimiento", (Object)keyMovimientoOld));
                                cuentaBancoMovimiento.put("fecha_on", (Object)formatter.format(new Date()));
                                cuentaBancoMovimiento.put("estado", 1);
                                cuentaBancoMovimiento.put("key_sucursal", (Object)caja_activa.getString("key_sucursal"));
                                cuentaBancoMovimiento.put("key_tipo_gasto", (Object)"1");
                                cuentaBancoMovimiento.put("tipo_movimiento", (Object)"ingreso");
                                cuentaBancoMovimiento.put("key_tipo_pago", (Object)JSONObject.getNames(data)[j]);
                                Conexion.insertArray("cuenta_banco_movimiento", new JSONArray().put((Object)cuentaBancoMovimiento));
                                final JSONObject sendcuentaBancoMovimiento = new JSONObject();
                                sendcuentaBancoMovimiento.put("component", (Object)"cuentaBancoMovimiento");
                                sendcuentaBancoMovimiento.put("type", (Object)"registro");
                                sendcuentaBancoMovimiento.put("data", (Object)cuentaBancoMovimiento);
                                sendcuentaBancoMovimiento.put("estado", (Object)"exito");
                                SSServerAbstract.sendAllServer(sendcuentaBancoMovimiento.toString());
                            }
                        }
                        catch (Exception ex) {}
                    }
                }
                catch (Exception ex2) {}
                clientes.getJSONObject(i).put("monto", monto);
            }
            Conexion.insertArray("paquete_venta_usuario", paquete_venta_usuarios);
            Conexion.historico(obj.getString("key_usuario"), paquete_venta.getString("key"), "paquete_venta_registro", paquete_venta);
            paquete_venta.put("key_sucursal", (Object)caja_activa.getString("key_sucursal"));
            paquete_venta.put("key_usuario", (Object)caja_activa.getString("key_usuario"));
            paquete_venta.put("key_caja", (Object)caja_activa.getString("key"));
            obj.put("data", (Object)paquete_venta);
            obj.put("clientes", (Object)paquete_venta_usuarios);
            obj.put("estado", (Object)"exito");
            SSServerAbstract.sendAllServer(obj.toString());
            final JSONObject sendClientesActivos = new JSONObject();
            sendClientesActivos.put("component", (Object)"clientesActivos");
            sendClientesActivos.put("type", (Object)"registro");
            sendClientesActivos.put("data", (Object)Cliente.getActivosPaqueteVenta(paquete_venta.getString("key")));
            sendClientesActivos.put("estado", (Object)"exito");
            sendClientesActivos.put("key_usuario", (Object)obj.getString("key_usuario"));
            SSServerAbstract.sendAllServer(sendClientesActivos.toString());
            final JSONObject mail = new JSONObject();
            mail.put("__ID_PEDIDO__", (Object)paquete_venta.getString("key"));
            mail.put("__PAQUETE__", (Object)paquete_venta.getString("nombre_paquete"));
            mail.put("__KEY_PAQUETE__", (Object)(String.valueOf(paquete_venta.getString("key_paquete")) + "?fecha=" + new Date().toString()));
            for (int k = 0; k < clientes.length(); ++k) {
                final JSONObject cliente = clientes.getJSONObject(k);
                mail.put("__FECHA__", (Object)cliente.getString("fecha_inicio"));
                mail.put("__RENOVACION__", (Object)cliente.getString("fecha_fin"));
                mail.put("__MAIL__", (Object)cliente.getString("Correo"));
                mail.put("__KEY_USUARIO_CLIENTE__", (Object)(String.valueOf(paquete_venta_usuarios.getJSONObject(k).getString("key")) + "?fecha=" + new Date().toString()));
                mail.put("__MONTO__", cliente.getDouble("monto"));
                mail.put("__CI__", (Object)cliente.getString("CI"));
                try {
                    new Email("recibo", mail);
                }
                catch (Exception ex3) {}
            }
        }
        catch (SQLException e) {
            obj.put("estado", (Object)"error");
            e.printStackTrace();
        }
    }
    
    public void eliminar(final JSONObject obj, final SSSessionAbstract session) {
        try {
            final DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            final JSONObject paquete_venta = obj.getJSONObject("data");
            final String consulta = "select paquete_venta_usuario_get_all('" + paquete_venta.getString("key") + "') as json";
            final JSONObject paquetes_venta_usuario = Conexion.ejecutarConsultaObject(consulta);
            final JSONObject caja_activa = Caja.getActiva(obj.getString("key_usuario"));
            if (caja_activa.isEmpty()) {
                obj.put("estado", (Object)"error");
                obj.put("error", (Object)"No cuenta con una caja abierta.");
                SSServerAbstract.sendAllServer(obj.toString());
                return;
            }
            final JSONObject send_movimiento = new JSONObject();
            send_movimiento.put("component", (Object)"cajaMovimiento");
            send_movimiento.put("type", (Object)"registro");
            send_movimiento.put("key_usuario", (Object)obj.getString("key_usuario"));
            send_movimiento.put("estado", (Object)"exito");
            final JSONArray usuarios = new JSONArray();
            if (!paquetes_venta_usuario.isEmpty()) {
                for (int i = 0; i < JSONObject.getNames(paquetes_venta_usuario).length; ++i) {
                    final JSONObject paquete_venta_usuario = paquetes_venta_usuario.getJSONObject(JSONObject.getNames(paquetes_venta_usuario)[i]);
                    usuarios.put((Object)paquete_venta_usuario.getString("key_usuario"));
                    final JSONObject caja_movimientos = CajaMovimiento.getMovimientosVentaServicio(paquete_venta_usuario.getString("key_caja"), paquete_venta_usuario.getString("key"));
                    if (!caja_movimientos.isEmpty()) {
                        for (int j = 0; j < JSONObject.getNames(caja_movimientos).length; ++j) {
                            JSONObject caja_movimiento = caja_movimientos.getJSONObject(JSONObject.getNames(caja_movimientos)[j]);
                            final String key_caja_old = caja_movimiento.getString("key");
                            if (caja_movimiento.getString("key_tipo_pago").equals("2") || caja_movimiento.getString("key_tipo_pago").equals("3")) {
                                final JSONObject cuentaBancoMovimiento = CuentaBancoMovimiento.getByKeyCajaMovimiento(key_caja_old);
                                if (cuentaBancoMovimiento.has("key")) {
                                    cuentaBancoMovimiento.put("key", (Object)UUID.randomUUID().toString());
                                    cuentaBancoMovimiento.put("descripcion", (Object)"Anulacion de venta de servicio.");
                                    cuentaBancoMovimiento.put("key_usuario", (Object)obj.getString("key_usuario"));
                                    cuentaBancoMovimiento.put("monto", cuentaBancoMovimiento.getDouble("monto") * -1.0);
                                    cuentaBancoMovimiento.put("fecha_on", (Object)formatter.format(new Date()));
                                    cuentaBancoMovimiento.put("data", (Object)new JSONObject().put("key_caja_movimiento", (Object)caja_movimiento.getString("key")));
                                    Conexion.insertArray("cuenta_banco_movimiento", new JSONArray().put((Object)cuentaBancoMovimiento));
                                    final JSONObject sendcuentaBancoMovimiento = new JSONObject();
                                    sendcuentaBancoMovimiento.put("component", (Object)"cuentaBancoMovimiento");
                                    sendcuentaBancoMovimiento.put("type", (Object)"registro");
                                    sendcuentaBancoMovimiento.put("data", (Object)cuentaBancoMovimiento);
                                    sendcuentaBancoMovimiento.put("estado", (Object)"exito");
                                    SSServerAbstract.sendAllServer(sendcuentaBancoMovimiento.toString());
                                }
                            }
                            else {
                                caja_movimiento = Caja.addAnulacionServicio(caja_activa.getString("key"), obj.getString("key_usuario"), caja_movimiento.getString("key_tipo_pago"), caja_movimiento.getDouble("monto"), formatter.format(new Date()), caja_movimiento.getJSONObject("data"));
                                send_movimiento.put("data", (Object)caja_movimiento);
                                SSServerAbstract.sendAllServer(send_movimiento.toString());
                            }
                        }
                    }
                    final JSONObject edit = new JSONObject();
                    edit.put("key", (Object)paquete_venta_usuario.getString("key"));
                    edit.put("estado", 0);
                    Conexion.editObject("paquete_venta_usuario", edit);
                    edit.put("key", (Object)paquete_venta_usuario.getString("key_paquete_venta"));
                    Conexion.editObject("paquete_venta", edit);
                }
            }
            paquete_venta.put("estado", 0);
            send_movimiento.put("component", (Object)"paqueteVenta");
            send_movimiento.put("type", (Object)"eliminar");
            send_movimiento.put("key_usuario", (Object)obj.getString("key_usuario"));
            send_movimiento.put("estado", (Object)"exito");
            send_movimiento.put("data", (Object)paquete_venta);
            send_movimiento.put("clientes", (Object)usuarios);
            SSServerAbstract.sendAllServer(send_movimiento.toString());
        }
        catch (SQLException e) {
            obj.put("estado", (Object)"error");
            obj.put("error", (Object)e.getLocalizedMessage());
            e.printStackTrace();
        }
    }
    
    public void editar(final JSONObject obj, final SSSessionAbstract session) {
        try {
            final JSONObject paquete_venta = obj.getJSONObject("data");
            Conexion.editObject("paquete_venta", paquete_venta);
            Conexion.historico(obj.getString("key_usuario"), paquete_venta.getString("key"), "paquete_venta_editar", paquete_venta);
            obj.put("data", (Object)paquete_venta);
            obj.put("estado", (Object)"exito");
            SSServerAbstract.sendAllServer(obj.toString());
        }
        catch (SQLException e) {
            obj.put("estado", (Object)"error");
            obj.put("error", (Object)e.getLocalizedMessage());
            e.printStackTrace();
        }
    }
    
    public void subirFoto(final JSONObject obj, final SSSessionAbstract session) {
        final String url = Config.getJSON().getJSONObject("files").getString("url");
        final File f = new File(String.valueOf(url) + "paquete_venta/");
        Conexion.historico(obj.getString("key_usuario"), obj.getString("key"), "paquete_venta_subirFoto", new JSONObject());
        if (!f.exists()) {
            f.mkdirs();
        }
        obj.put("dirs", (Object)new JSONArray().put((Object)(String.valueOf(f.getPath()) + "/" + obj.getString("key"))));
        obj.put("estado", (Object)"exito");
        SSServerAbstract.sendServer("ServerSocketWeb", obj.toString());
        SSServerAbstract.sendServer("ServerSocket", obj.toString());
    }
    
    public static JSONObject getPaqueteVentaUsuarioActivo(final String key_usuario) {
        try {
            final String consulta = "select get_paquete_venta_usuario_activo('" + key_usuario + "') as json";
            return Conexion.ejecutarConsultaObject(consulta);
        }
        catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
}