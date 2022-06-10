package component;

import java.io.File;
import Config.Config;
import java.util.Calendar;
import java.text.DateFormat;
import Server.SSSAbstract.SSServerAbstract;
import org.json.JSONArray;
import java.util.UUID;
import java.util.GregorianCalendar;
import java.text.SimpleDateFormat;
import java.sql.SQLException;
import conexion.Conexion;
import SocketCliente.SocketCliete;
import Server.SSSAbstract.SSSessionAbstract;
import org.json.JSONObject;

public class Asistencia
{
    public Asistencia(final JSONObject data, final SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getByKeyEntrenamiento": {
                this.getByKeyEntrenamiento(data, session);
                return;
            }
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
            case "subirFoto": {
                this.subirFoto(data, session);
                return;
            }
            case "getByKeySucursal": {
                this.getByKeySucursal(data, session);
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
            final String consulta = "select get_all('asistencia') as json";
            final JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", (Object)data);
            obj.put("estado", (Object)"exito");
        }
        catch (SQLException e) {
            obj.put("estado", (Object)"error");
            e.printStackTrace();
        }
    }
    
    public void getByKeySucursal(final JSONObject obj, final SSSessionAbstract session) {
        try {
            final String consulta = "select get_by_key_sucursal('" + obj.getString("key_sucursal") + "') as json";
            final JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", (Object)data);
            obj.put("estado", (Object)"exito");
        }
        catch (SQLException e) {
            obj.put("estado", (Object)"error");
            e.printStackTrace();
        }
    }
    
    public void getByKeyEntrenamiento(final JSONObject obj, final SSSessionAbstract session) {
        try {
            final String consulta = "select get_by_key_entrenamiento('" + obj.getString("key_entrenamiento") + "') as json";
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
            final String consulta = "select get_by_key('asistencia','" + obj.getString("key") + "') as json";
            final JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), "asistencia_getByKey", data);
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
            final Calendar cal = new GregorianCalendar();
            final String fecha_on = formatter.format(cal.getTime());
            cal.set(12, 0);
            cal.set(13, 0);
            cal.set(14, 0);
            final String fecha_inicio = formatter.format(cal.getTime());
            cal.add(10, 1);
            final String fecha_fin = formatter.format(cal.getTime());
            final JSONObject asistencia = obj.getJSONObject("data");
            final JSONObject paqueteVentaUsuario = PaqueteVenta.getPaqueteVentaUsuarioActivo(asistencia.getString("key_usuario"));
            JSONObject entrenamiento = Entrenamiento.getEntrenamiento(fecha_on.substring(0, 13), asistencia.getString("key_sucursal"));
            if (entrenamiento.isEmpty()) {
                entrenamiento = new JSONObject();
                entrenamiento.put("key", (Object)UUID.randomUUID().toString());
                entrenamiento.put("descripcion", (Object)"automatico");
                entrenamiento.put("key_sucursal", (Object)asistencia.getString("key_sucursal"));
                entrenamiento.put("key_usuario", (Object)obj.getString("key_usuario"));
                entrenamiento.put("fecha_on", (Object)fecha_on);
                entrenamiento.put("fecha_inicio", (Object)fecha_inicio);
                entrenamiento.put("fecha_fin", (Object)fecha_fin);
                entrenamiento.put("estado", 1);
                Conexion.insertArray("entrenamiento", new JSONArray().put((Object)entrenamiento));
            }
            asistencia.put("key", (Object)UUID.randomUUID().toString());
            asistencia.put("key_entrenamiento", (Object)entrenamiento.getString("key"));
            asistencia.put("fecha_on", (Object)fecha_on);
            asistencia.put("estado", 1);
            asistencia.put("key_paquete_venta_usuario", (Object)paqueteVentaUsuario.getString("key"));
            Conexion.insertArray("asistencia", new JSONArray().put((Object)asistencia));
            Conexion.historico(obj.getString("key_usuario"), asistencia.getString("key"), "asistencia_registro", asistencia);
            obj.put("data", (Object)asistencia);
            obj.put("estado", (Object)"exito");
            SSServerAbstract.sendAllServer(obj.toString());
        }
        catch (SQLException e) {
            obj.put("estado", (Object)"error");
            e.printStackTrace();
        }
    }

    public static JSONObject registro(final JSONObject asistencia) {
        try {
            final DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            final Calendar cal = new GregorianCalendar();
            final String fecha_on = formatter.format(cal.getTime());
            cal.set(12, 0);
            cal.set(13, 0);
            cal.set(14, 0);
            final String fecha_inicio = formatter.format(cal.getTime());
            cal.add(10, 1);
            final String fecha_fin = formatter.format(cal.getTime());
            final JSONObject paqueteVentaUsuario = PaqueteVenta.getPaqueteVentaUsuarioActivo(asistencia.getString("key_usuario"));
            JSONObject entrenamiento = Entrenamiento.getEntrenamiento(fecha_on.substring(0, 13), asistencia.getString("key_sucursal"));
            if (entrenamiento.isEmpty()) {
                entrenamiento = new JSONObject();
                entrenamiento.put("key", (Object)UUID.randomUUID().toString());
                entrenamiento.put("descripcion", (Object)"automatico");
                entrenamiento.put("key_sucursal", (Object)asistencia.getString("key_sucursal"));
                //entrenamiento.put("key_usuario", (Object)obj.getString("key_usuario"));
                entrenamiento.put("fecha_on", (Object)fecha_on);
                entrenamiento.put("fecha_inicio", (Object)fecha_inicio);
                entrenamiento.put("fecha_fin", (Object)fecha_fin);
                entrenamiento.put("estado", 1);
                Conexion.insertArray("entrenamiento", new JSONArray().put((Object)entrenamiento));
            }
            asistencia.put("key", (Object)UUID.randomUUID().toString());
            asistencia.put("key_entrenamiento", (Object)entrenamiento.getString("key"));
            asistencia.put("fecha_on", (Object)fecha_on);
            asistencia.put("estado", 1);
            asistencia.put("key_paquete_venta_usuario", (Object)paqueteVentaUsuario.getString("key"));
            Conexion.insertArray("asistencia", new JSONArray().put((Object)asistencia));
            
            return asistencia;
        }
        catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    public void editar(final JSONObject obj, final SSSessionAbstract session) {
        try {
            final JSONObject asistencia = obj.getJSONObject("data");
            Conexion.editObject("asistencia", asistencia);
            Conexion.historico(obj.getString("key_usuario"), asistencia.getString("key"), "asistencia_editar", asistencia);
            obj.put("data", (Object)asistencia);
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
        final File f = new File(String.valueOf(url) + "asistencia/");
        Conexion.historico(obj.getString("key_usuario"), obj.getString("key"), "asistencia_subirFoto", new JSONObject());
        if (!f.exists()) {
            f.mkdirs();
        }
        obj.put("dirs", (Object)new JSONArray().put((Object)(String.valueOf(f.getPath()) + "/" + obj.getString("key"))));
        obj.put("estado", (Object)"exito");
        SSServerAbstract.sendAllServer(obj.toString());
    }
}
