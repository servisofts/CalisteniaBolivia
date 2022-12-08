package component;

import java.io.File;
import Config.Config;
import java.util.Calendar;
import java.util.Date;
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
    public Asistencia(JSONObject data, SSSessionAbstract session) {
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
    
    public void defaultType(JSONObject obj, SSSessionAbstract session) {
        SocketCliete.send("usuario", obj, session);
    }

    public static String getUltimaFechaAsistencia(){
        try{
            String consulta = "select get_ultima_asistencia() as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            return data.getString("fecha_on");
        }catch(Exception e){
            e.printStackTrace();
            return "";
        }
    }

    public static JSONObject getAsistencia(String key_entrenamiento, String key_usuario){
        try{
            String consulta = "select get_asistencia('"+key_entrenamiento+"','"+key_usuario+"') as json";
            return Conexion.ejecutarConsultaObject(consulta);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
    
    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_all('asistencia') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        }
        catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }
    
    public void getByKeySucursal(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_by_key_sucursal('" + obj.getString("key_sucursal") + "') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        }
        catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }
    
    public void getByKeyEntrenamiento(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_by_key_entrenamiento('" + obj.getString("key_entrenamiento") + "') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        }
        catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }
    
    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_by_key('asistencia','" + obj.getString("key") + "') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), "asistencia_getByKey", data);
            obj.put("data", data);
            obj.put("estado", "exito");
        }
        catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }
    
    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            Calendar cal = new GregorianCalendar();
            String fecha_on = formatter.format(cal.getTime());
            cal.set(12, 0);
            cal.set(13, 0);
            cal.set(14, 0);
            String fecha_inicio = formatter.format(cal.getTime());
            cal.add(10, 1);
            String fecha_fin = formatter.format(cal.getTime());
            JSONObject asistencia = obj.getJSONObject("data");
            JSONObject paqueteVentaUsuario = PaqueteVenta.getPaqueteVentaUsuarioActivo(asistencia.getString("key_usuario"));
            JSONObject entrenamiento = Entrenamiento.getEntrenamiento(fecha_on.substring(0, 13), asistencia.getString("key_sucursal"));
            if (entrenamiento.isEmpty()) {
                entrenamiento = new JSONObject();
                entrenamiento.put("key", UUID.randomUUID().toString());
                entrenamiento.put("descripcion", "automatico");
                entrenamiento.put("key_sucursal", asistencia.getString("key_sucursal"));
                entrenamiento.put("key_usuario", obj.getString("key_usuario"));
                entrenamiento.put("fecha_on", fecha_on);
                entrenamiento.put("fecha_inicio", fecha_inicio);
                entrenamiento.put("fecha_fin", fecha_fin);
                entrenamiento.put("estado", 1);
                Conexion.insertArray("entrenamiento", new JSONArray().put(entrenamiento));
            }
            asistencia.put("key", UUID.randomUUID().toString());
            asistencia.put("key_entrenamiento", entrenamiento.getString("key"));
            asistencia.put("fecha_on", fecha_on);
            asistencia.put("estado", 1);
            asistencia.put("key_paquete_venta_usuario", paqueteVentaUsuario.getString("key"));
            Conexion.insertArray("asistencia", new JSONArray().put(asistencia));
            Conexion.historico(obj.getString("key_usuario"), asistencia.getString("key"), "asistencia_registro", asistencia);
            obj.put("data", asistencia);
            obj.put("estado", "exito");
            SSServerAbstract.sendAllServer(obj.toString());
        }
        catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static JSONObject registro(JSONObject asistencia) {
        try {

            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            Calendar cal = new GregorianCalendar();
            String fecha_on = formatter.format(cal.getTime());

            if(asistencia.has("fecha_asistencia")){
                fecha_on = asistencia.getString("fecha_asistencia");
                cal.setTime(formatter.parse(fecha_on));
            }

            cal.set(12, 0);
            cal.set(13, 0);
            cal.set(14, 0);
            String fecha_inicio = formatter.format(cal.getTime());
            cal.add(10, 1);
            String fecha_fin = formatter.format(cal.getTime());
            
            JSONObject paqueteVentaUsuario = PaqueteVenta.getPaqueteVentaUsuarioActivo(asistencia.getString("key_usuario"));
            if(paqueteVentaUsuario.has("key")){
                JSONObject entrenamiento = Entrenamiento.getEntrenamiento(fecha_on.substring(0, 13), asistencia.getString("key_sucursal"));
                if (entrenamiento.isEmpty()) {
                    entrenamiento = new JSONObject();
                    entrenamiento.put("key", UUID.randomUUID().toString());
                    entrenamiento.put("descripcion", "automatico");
                    entrenamiento.put("key_sucursal", asistencia.getString("key_sucursal"));
                    //entrenamiento.put("key_usuario", obj.getString("key_usuario"));
                    entrenamiento.put("fecha_on", fecha_on);
                    entrenamiento.put("fecha_inicio", fecha_inicio);
                    entrenamiento.put("fecha_fin", fecha_fin);
                    entrenamiento.put("estado", 1);
                    Conexion.insertArray("entrenamiento", new JSONArray().put(entrenamiento));
                }

                JSONObject asistio = Asistencia.getAsistencia(entrenamiento.getString("key"), asistencia.getString("key_usuario"));
                if(asistio.isEmpty()){
                    asistencia.put("key", UUID.randomUUID().toString());
                    asistencia.put("descripcion", "automatico");
                    asistencia.put("key_entrenamiento", entrenamiento.getString("key"));
                    asistencia.put("fecha_on", fecha_on);
                    asistencia.put("estado", 1);
                    asistencia.put("key_usuario", asistencia.getString("key_usuario"));
                    asistencia.put("key_paquete_venta_usuario", paqueteVentaUsuario.getString("key"));
                    Conexion.insertArray("asistencia", new JSONArray().put(asistencia));

                    JSONObject obj = new JSONObject();
                    obj.put("component", "asistencia");
                    obj.put("type", "registro");
                    obj.put("data", asistencia);
                    obj.put("estado", "exito");

                    if(formatter.parse(fecha_on).after(new Date(new Date().getTime() - (1000 * 60 * 60 )))){
                        SSServerAbstract.sendAllServer(obj.toString());                        
                    }

                }
            }
            
            
            return asistencia;
        }
        catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject asistencia = obj.getJSONObject("data");
            Conexion.editObject("asistencia", asistencia);
            Conexion.historico(obj.getString("key_usuario"), asistencia.getString("key"), "asistencia_editar", asistencia);
            obj.put("data", asistencia);
            obj.put("estado", "exito");
            SSServerAbstract.sendAllServer(obj.toString());
        }
        catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }
    
    public void subirFoto(JSONObject obj, SSSessionAbstract session) {
        String url = Config.getJSON().getJSONObject("files").getString("url");
        File f = new File(String.valueOf(url) + "asistencia/");
        Conexion.historico(obj.getString("key_usuario"), obj.getString("key"), "asistencia_subirFoto", new JSONObject());
        if (!f.exists()) {
            f.mkdirs();
        }
        obj.put("dirs", new JSONArray().put((String.valueOf(f.getPath()) + "/" + obj.getString("key"))));
        obj.put("estado", "exito");
        SSServerAbstract.sendAllServer(obj.toString());
    }
}
