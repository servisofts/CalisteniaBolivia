package component;

import java.io.File;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import conexion.*;
import SocketCliente.SocketCliete;

import org.eclipse.jetty.websocket.server.WebSocketHandler.Simple;
import org.json.JSONArray;
import org.json.JSONObject;

import Config.Config;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;

public class SucursalSincronizacion {

    public static final String COMPONENT = "sucursal_sincronizacion";

    public static void onMessage(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, session);
                break;
            case "getByKey":
                getByKey(data, session);
                break;
            case "registro":
                registro(data, session);
                break;
            case "editar":
                editar(data, session);
                break;
            case "subirFoto":
                subirFoto(data, session);
                break;
            default:
                defaultType(data, session);
        }
    }

    public static void defaultType(JSONObject obj, SSSessionAbstract session) {
        SocketCliete.send("usuario", obj, session);
    }

    public static void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_all('" + COMPONENT + "') as json";
            if (obj.has("key_sucursal")) {
                consulta = "select get_all('" + COMPONENT + "', 'key_sucursal', '" + obj.getString("key_sucursal")
                        + "') as json";
            }
            if (obj.has("key_paquete")) {
                consulta = "select get_all('" + COMPONENT + "', 'key_paquete', '" + obj.getString("key_paquete")
                        + "') as json";
            }
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_by_key('" + COMPONENT + "','" + obj.getString("key") + "') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), COMPONENT + "_getByKey", data);

            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static void registrar_exito(int cantidad, String key_sucursal, String fecha_on) {
        try {
            JSONObject data = new JSONObject();
            data.put("key", UUID.randomUUID().toString());
            data.put("fecha_on", fecha_on);
            data.put("cantidad", cantidad);
            data.put("key_sucursal", key_sucursal);
            data.put("estado", 1);
            Conexion.insertArray(COMPONENT, new JSONArray().put(data));
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    public static void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());
            JSONObject data = obj.getJSONObject("data");
            data.put("key", UUID.randomUUID().toString());
            data.put("fecha_on", fecha_on);
            data.put("estado", 1);
            Conexion.insertArray(COMPONENT, new JSONArray().put(data));
            Conexion.historico(obj.getString("key_usuario"), data.getString("key"), COMPONENT + "_registro", data);
            obj.put("data", data);
            obj.put("estado", "exito");
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }

    }

    public static JSONObject registro(JSONObject obj) {
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());

            obj.put("key", UUID.randomUUID().toString());
            obj.put("fecha_on", fecha_on);
            obj.put("estado", 1);
            Conexion.insertArray(COMPONENT, new JSONArray().put(obj));
            return obj;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }

    }

    public static void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            Conexion.editObject(COMPONENT, data);
            Conexion.historico(obj.getString("key_usuario"), data.getString("key"), COMPONENT + "_editar", data);
            obj.put("data", data);
            obj.put("estado", "exito");
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public static void subirFoto(JSONObject obj, SSSessionAbstract session) {
        String url = Config.getJSON().getJSONObject("files").getString("url");
        File f = new File(url + COMPONENT + "/");
        Conexion.historico(obj.getString("key_usuario"), obj.getString("key"), COMPONENT + "_subirFoto",
                new JSONObject());
        if (!f.exists())
            f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath() + "/" + obj.getString("key")));
        obj.put("estado", "exito");
        SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
    }

    public static String getUltimaFechaAsistencia(String key_sucursal) {
        try {
            String consulta = "select get_ultima_asistencia('" + key_sucursal + "') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);

            SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
            SimpleDateFormat formato1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
            String fecha = "";
            if (data != null && !data.isNull("fecha_on")) {
                fecha = data.getString("fecha_on");
                Date dfecha = formato.parse(fecha);
                fecha = formato1.format(dfecha);
            }
            return fecha;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}