package Component.Ventas;

import java.io.File;
import java.text.DateFormat;
import Server.SSSAbstract.SSServerAbstract;
import java.util.UUID;
import org.json.JSONArray;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.sql.SQLException;
import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SConfig;
import Servisofts.SPGConect;

import org.json.JSONObject;

import Component.Bancos.Billetera;
import Component.Bancos.CuentaBancoMovimiento;
import Component.Cajas.Caja;
import Component.Cajas.CajaMovimiento;
import Component.Sucursales.SucursalTipoPagoCuentaBanco;
import ComponentNotInFrontEnd.Cliente;

public class PaqueteVenta {
    public static final String COMPONENT = "paqueteVenta";
    public static final String TABLE = "paquete_venta";

    public PaqueteVenta(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "editar": {
                editar(data, session);
                return;
            }
            case "getAll": {
                getAll(data, session);
                return;
            }
            case "registro": {
                registro(data, session);
                return;
            }
            case "getAllByUsuario": {
                getAllByUsuario(data, session);
                return;
            }
            case "eliminar": {
                eliminar(data, session);
                return;
            }
            case "subirFoto": {
                subirFoto(data, session);
                return;
            }
            case "getRecibo": {
                getRecibo(data, session);
                return;
            }
            case "getByKey": {
                getByKey(data, session);
                return;
            }
            default:
                break;
        }
    }

    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_all('paquete_venta','key_paquete','" + obj.getString("key_paquete")
                    + "') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void getAllByUsuario(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select paquete_venta_get_all('" + obj.getString("key_usuario") + "') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_by_key('paquete_venta','" + obj.getString("key") + "') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            SPGConect.historico(obj.getString("key_usuario"), "paquete_venta_getByKey", data);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static JSONObject getByKey(String key) {
        try {
            String consulta = "select get_by_key('paquete_venta','" + key + "') as json";
            return SPGConect.ejecutarConsultaObject(consulta);
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void getRecibo(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_recibo('" + obj.getString("key") + "') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            SPGConect.historico(obj.getString("key_usuario"), "paquete_venta_getByKey", data);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            DateFormat formatter1 = new SimpleDateFormat("yyyy-MM-dd");
            String fecha_on = formatter.format(new Date());
            String hoy = formatter1.format(new Date());
            JSONObject paquete_venta = obj.getJSONObject("data");

            paquete_venta.put("fecha_on", fecha_on);
            paquete_venta.put("estado", 1);
            // SPGConect.insertArray("paquete_venta", new JSONArray().put(paquete_venta));
            JSONObject caja_activa = Caja.getActiva(obj.getString("key_usuario"));
            if (caja_activa == null) {
                obj.put("estado", "error");
                obj.put("error", "sin_caja");
                return;
            }
            JSONObject cajaTipoPagoCuentaBanco = SucursalTipoPagoCuentaBanco
                    .getByKeySucursal(caja_activa.getString("key_sucursal"));
            JSONArray clientes = obj.getJSONArray("clientes");
            JSONArray paquete_venta_usuarios = new JSONArray();
            JSONObject send_movimiento = new JSONObject();
            send_movimiento.put("component", "cajaMovimiento");
            send_movimiento.put("type", "registro");
            send_movimiento.put("key_usuario", obj.getString("key_usuario"));
            send_movimiento.put("estado", "exito");

            /*
             * JSONObject venta_dia;
             * 
             * for (int i = 0; i < clientes.length(); ++i) {
             * venta_dia =
             * PaqueteVentaUsuario.getVentaDia(clientes.getJSONObject(i).getString("key"),
             * hoy);
             * if(!venta_dia.isEmpty()){
             * obj.put("estado", "error");
             * obj.put("error", "existe_venta");
             * return;
             * }
             * }
             */

            SPGConect.insertArray("paquete_venta", new JSONArray().put(paquete_venta));

            for (int i = 0; i < clientes.length(); ++i) {
                JSONObject paquete_venta_usuario = new JSONObject();
                paquete_venta_usuario.put("key", UUID.randomUUID().toString());
                paquete_venta_usuario.put("key_usuario", clientes.getJSONObject(i).getString("key"));
                paquete_venta_usuario.put("fecha_inicio", clientes.getJSONObject(i).getString("fecha_inicio"));
                paquete_venta_usuario.put("fecha_fin", clientes.getJSONObject(i).getString("fecha_fin"));
                paquete_venta_usuario.put("key_paquete_venta", paquete_venta.get("key"));
                paquete_venta_usuario.put("key_caja", caja_activa.get("key"));
                paquete_venta_usuario.put("fecha_on", formatter.format(new Date()));
                paquete_venta_usuario.put("estado", 1);
                paquete_venta_usuarios.put(paquete_venta_usuario);
                JSONObject data = clientes.getJSONObject(i).getJSONObject("data");
                double monto = 0.0;
                try {
                    for (int j = 0; j < JSONObject.getNames(data).length; ++j) {
                        try {
                            data.getJSONObject(JSONObject.getNames(data)[j]);
                            monto += data.getJSONObject(JSONObject.getNames(data)[j]).getDouble("monto");
                            data.getJSONObject(JSONObject.getNames(data)[j]).put("key_paquete_venta_usuario",
                                    paquete_venta_usuario.getString("key"));
                            data.getJSONObject(JSONObject.getNames(data)[j]).put("key_tipo_pago",
                                    JSONObject.getNames(data)[j]);
                            data.getJSONObject(JSONObject.getNames(data)[j]).put("key_usuario",
                                    clientes.getJSONObject(i).getString("key"));
                            JSONObject caja_movimiento = Caja.addVentaServicio(caja_activa.getString("key"),
                                    obj.getString("key_usuario"), JSONObject.getNames(data)[j],
                                    data.getJSONObject(JSONObject.getNames(data)[j]).getDouble("monto"),
                                    formatter.format(new Date()), data.getJSONObject(JSONObject.getNames(data)[j]));
                            send_movimiento.put("data", caja_movimiento);
                            SSServerAbstract.sendAllServer(send_movimiento.toString());
                            if (JSONObject.getNames(data)[j].equals("2") || JSONObject.getNames(data)[j].equals("3")) {
                                if (JSONObject.getNames(data)[j].equals("3")) {
                                    String codigo = data.getJSONObject(JSONObject.getNames(data)[j])
                                            .getString("C\u00f3digo");
                                    JSONObject billetera = Billetera.getByCodigo(codigo);
                                    billetera.put("estado", 0);
                                    SPGConect.editObject("billetera", billetera);
                                }
                                String keyMovimientoOld = caja_movimiento.getString("key");
                                data.put("key_cuenta_banco", cajaTipoPagoCuentaBanco
                                        .getJSONObject(JSONObject.getNames(data)[j]).getString("key_cuenta_banco"));
                                caja_movimiento = Caja.addTraspasoBanco(caja_activa.getString("key"),
                                        obj.getString("key_usuario"), JSONObject.getNames(data)[j],
                                        data.getJSONObject(JSONObject.getNames(data)[j]).getDouble("monto") * -1.0,
                                        formatter.format(new Date()), data.getJSONObject(JSONObject.getNames(data)[j]));
                                send_movimiento.put("data", caja_movimiento);
                                SSServerAbstract.sendAllServer(send_movimiento.toString());
                                JSONObject cuentaBancoMovimiento = new JSONObject();
                                cuentaBancoMovimiento.put("key", UUID.randomUUID().toString());
                                cuentaBancoMovimiento.put("descripcion", "Ingreso por venta de servicio.");
                                cuentaBancoMovimiento.put("key_cuenta_banco", data.getString("key_cuenta_banco"));
                                cuentaBancoMovimiento.put("key_usuario", obj.getString("key_usuario"));
                                cuentaBancoMovimiento.put("monto",
                                        data.getJSONObject(JSONObject.getNames(data)[j]).getDouble("monto"));
                                cuentaBancoMovimiento.put("data",
                                        new JSONObject().put("key_caja_movimiento", keyMovimientoOld));
                                cuentaBancoMovimiento.put("fecha_on", formatter.format(new Date()));
                                cuentaBancoMovimiento.put("estado", 1);
                                cuentaBancoMovimiento.put("key_sucursal", caja_activa.getString("key_sucursal"));
                                cuentaBancoMovimiento.put("key_tipo_gasto", "1");
                                cuentaBancoMovimiento.put("tipo_movimiento", "ingreso");
                                cuentaBancoMovimiento.put("key_tipo_pago", JSONObject.getNames(data)[j]);
                                SPGConect.insertArray("cuenta_banco_movimiento",
                                        new JSONArray().put(cuentaBancoMovimiento));
                                JSONObject sendcuentaBancoMovimiento = new JSONObject();
                                sendcuentaBancoMovimiento.put("component", "cuentaBancoMovimiento");
                                sendcuentaBancoMovimiento.put("type", "registro");
                                sendcuentaBancoMovimiento.put("data", cuentaBancoMovimiento);
                                sendcuentaBancoMovimiento.put("estado", "exito");
                                SSServerAbstract.sendAllServer(sendcuentaBancoMovimiento.toString());
                            }
                        } catch (Exception ex) {
                        }
                    }
                } catch (Exception ex2) {
                }
                clientes.getJSONObject(i).put("monto", monto);
            }
            SPGConect.insertArray("paquete_venta_usuario", paquete_venta_usuarios);
            SPGConect.historico(obj.getString("key_usuario"), paquete_venta.getString("key"), "paquete_venta_registro",
                    paquete_venta);
            paquete_venta.put("key_sucursal", caja_activa.getString("key_sucursal"));
            paquete_venta.put("key_usuario", caja_activa.getString("key_usuario"));
            paquete_venta.put("key_caja", caja_activa.getString("key"));
            obj.put("data", paquete_venta);
            obj.put("clientes", paquete_venta_usuarios);
            obj.put("estado", "exito");
            SSServerAbstract.sendAllServer(obj.toString());
            JSONObject sendClientesActivos = new JSONObject();
            sendClientesActivos.put("component", "clientesActivos");
            sendClientesActivos.put("type", "registro");
            sendClientesActivos.put("data", Cliente.getActivosPaqueteVenta(paquete_venta.getString("key")));
            sendClientesActivos.put("estado", "exito");
            sendClientesActivos.put("key_usuario", obj.getString("key_usuario"));
            SSServerAbstract.sendAllServer(sendClientesActivos.toString());
            JSONObject mail = new JSONObject();
            mail.put("__ID_PEDIDO__", paquete_venta.getString("key"));
            mail.put("__PAQUETE__", paquete_venta.getString("nombre_paquete"));
            mail.put("__KEY_PAQUETE__",
                    (String.valueOf(paquete_venta.getString("key_paquete")) + "?fecha=" + new Date().toString()));
            for (int k = 0; k < clientes.length(); ++k) {
                JSONObject cliente = clientes.getJSONObject(k);
                mail.put("__FECHA__", cliente.getString("fecha_inicio"));
                mail.put("__RENOVACION__", cliente.getString("fecha_fin"));
                mail.put("__MAIL__", cliente.getString("Correo"));
                mail.put("__KEY_USUARIO_CLIENTE__",
                        (String.valueOf(paquete_venta_usuarios.getJSONObject(k).getString("key")) + "?fecha="
                                + new Date().toString()));
                mail.put("__MONTO__", cliente.getDouble("monto"));
                mail.put("__CI__", cliente.getString("CI"));
                try {
                    // new Email("recibo", mail);
                } catch (Exception ex3) {
                }
            }
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void eliminar(JSONObject obj, SSSessionAbstract session) {
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            JSONObject paquete_venta = obj.getJSONObject("data");
            String consulta = "select paquete_venta_usuario_get_all('" + paquete_venta.getString("key") + "') as json";
            JSONObject paquetes_venta_usuario = SPGConect.ejecutarConsultaObject(consulta);
            JSONObject caja_activa = Caja.getActiva(obj.getString("key_usuario"));
            if (caja_activa.isEmpty()) {
                obj.put("estado", "error");
                obj.put("error", "No cuenta con una caja abierta.");
                SSServerAbstract.sendAllServer(obj.toString());
                return;
            }
            JSONObject send_movimiento = new JSONObject();
            send_movimiento.put("component", "cajaMovimiento");
            send_movimiento.put("type", "registro");
            send_movimiento.put("key_usuario", obj.getString("key_usuario"));
            send_movimiento.put("estado", "exito");
            JSONArray usuarios = new JSONArray();
            if (!paquetes_venta_usuario.isEmpty()) {
                for (int i = 0; i < JSONObject.getNames(paquetes_venta_usuario).length; ++i) {
                    JSONObject paquete_venta_usuario = paquetes_venta_usuario
                            .getJSONObject(JSONObject.getNames(paquetes_venta_usuario)[i]);
                    usuarios.put(paquete_venta_usuario.getString("key_usuario"));
                    JSONObject caja_movimientos = CajaMovimiento.getMovimientosVentaServicio(
                            paquete_venta_usuario.getString("key_caja"), paquete_venta_usuario.getString("key"));
                    if (!caja_movimientos.isEmpty()) {
                        for (int j = 0; j < JSONObject.getNames(caja_movimientos).length; ++j) {
                            JSONObject caja_movimiento = caja_movimientos
                                    .getJSONObject(JSONObject.getNames(caja_movimientos)[j]);
                            String key_caja_old = caja_movimiento.getString("key");
                            if (caja_movimiento.getString("key_tipo_pago").equals("2")
                                    || caja_movimiento.getString("key_tipo_pago").equals("3")) {
                                JSONObject cuentaBancoMovimiento = CuentaBancoMovimiento
                                        .getByKeyCajaMovimiento(key_caja_old);
                                if (cuentaBancoMovimiento.has("key")) {
                                    cuentaBancoMovimiento.put("key", UUID.randomUUID().toString());
                                    cuentaBancoMovimiento.put("descripcion", "Anulacion de venta de servicio.");
                                    cuentaBancoMovimiento.put("key_usuario", obj.getString("key_usuario"));
                                    cuentaBancoMovimiento.put("monto", cuentaBancoMovimiento.getDouble("monto") * -1.0);
                                    cuentaBancoMovimiento.put("fecha_on", formatter.format(new Date()));
                                    cuentaBancoMovimiento.put("data", new JSONObject().put("key_caja_movimiento",
                                            caja_movimiento.getString("key")));
                                    SPGConect.insertArray("cuenta_banco_movimiento",
                                            new JSONArray().put(cuentaBancoMovimiento));
                                    JSONObject sendcuentaBancoMovimiento = new JSONObject();
                                    sendcuentaBancoMovimiento.put("component", "cuentaBancoMovimiento");
                                    sendcuentaBancoMovimiento.put("type", "registro");
                                    sendcuentaBancoMovimiento.put("data", cuentaBancoMovimiento);
                                    sendcuentaBancoMovimiento.put("estado", "exito");
                                    SSServerAbstract.sendAllServer(sendcuentaBancoMovimiento.toString());
                                }
                            } else {
                                caja_movimiento = Caja.addAnulacionServicio(caja_activa.getString("key"),
                                        obj.getString("key_usuario"), caja_movimiento.getString("key_tipo_pago"),
                                        caja_movimiento.getDouble("monto"), formatter.format(new Date()),
                                        caja_movimiento.getJSONObject("data"));
                                send_movimiento.put("data", caja_movimiento);
                                SSServerAbstract.sendAllServer(send_movimiento.toString());
                            }
                        }
                    }
                    JSONObject edit = new JSONObject();
                    edit.put("key", paquete_venta_usuario.getString("key"));
                    edit.put("estado", 0);
                    SPGConect.editObject("paquete_venta_usuario", edit);
                    edit.put("key", paquete_venta_usuario.getString("key_paquete_venta"));
                    SPGConect.editObject("paquete_venta", edit);
                }
            }
            paquete_venta.put("estado", 0);
            send_movimiento.put("component", "paqueteVenta");
            send_movimiento.put("type", "eliminar");
            send_movimiento.put("key_usuario", obj.getString("key_usuario"));
            send_movimiento.put("estado", "exito");
            send_movimiento.put("data", paquete_venta);
            send_movimiento.put("clientes", usuarios);
            SSServerAbstract.sendAllServer(send_movimiento.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject paquete_venta = obj.getJSONObject("data");
            SPGConect.editObject("paquete_venta", paquete_venta);
            SPGConect.historico(obj.getString("key_usuario"), paquete_venta.getString("key"), "paquete_venta_editar",
                    paquete_venta);
            obj.put("data", paquete_venta);
            obj.put("estado", "exito");
            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public static void editar(JSONObject paqueteVenta) {
        try {
            SPGConect.editObject("paquete_venta", paqueteVenta);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void subirFoto(JSONObject obj, SSSessionAbstract session) {
        String url = SConfig.getJSON().getJSONObject("files").getString("url");
        File f = new File(String.valueOf(url) + "paquete_venta/");
        SPGConect.historico(obj.getString("key_usuario"), obj.getString("key"), "paquete_venta_subirFoto",
                new JSONObject());
        if (!f.exists()) {
            f.mkdirs();
        }
        obj.put("dirs", new JSONArray().put((String.valueOf(f.getPath()) + "/" + obj.getString("key"))));
        obj.put("estado", "exito");
        SSServerAbstract.sendServer("ServerSocketWeb", obj.toString());
        SSServerAbstract.sendServer("ServerSocket", obj.toString());
    }

    public static JSONObject getPaqueteVentaUsuarioActivo(String key_usuario) {
        try {
            String consulta = "select get_paquete_venta_usuario_activo('" + key_usuario + "') as json";
            return SPGConect.ejecutarConsultaObject(consulta);
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
}