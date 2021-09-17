package component;

import java.io.File;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import conexion.*;
import SocketCliente.SocketCliete;
import org.json.JSONArray;
import org.json.JSONObject;

import Config.Config;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;

public class Asistencia {

    public Asistencia(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, session);
            break;
            case "getByKey":
                getByKey(data, session);
                break;
            case "getByKeyEntrenamiento":
                getByKeyEntrenamiento(data, session);
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

    public void defaultType(JSONObject obj, SSSessionAbstract session) {
        SocketCliete.send("usuario", obj, session);
    }

    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_all('asistencia') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void getByKeyEntrenamiento(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_by_key_entrenamiento('"+obj.getString("key_entrenamiento")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta); 

            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_by_key('asistencia','"+obj.getString("key")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), "asistencia_getByKey", data);

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
            String fecha_on = formatter.format(new Date());
            JSONObject asistencia = obj.getJSONObject("data");

            JSONObject paqueteVentaUsuario = PaqueteVenta.getPaqueteVentaUsuarioActivo(asistencia.getString("key_usuario")); 

            asistencia.put("key",UUID.randomUUID().toString());
            asistencia.put("fecha_on",fecha_on);
            asistencia.put("estado",1);
            asistencia.put("key_paquete_venta_usuario",paqueteVentaUsuario.getString("key"));            
            Conexion.insertArray("asistencia", new JSONArray().put(asistencia));

            Conexion.historico(obj.getString("key_usuario"), asistencia.getString("key"), "asistencia_registro", asistencia);
            obj.put("data", asistencia);
            obj.put("estado", "exito");

            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
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
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void subirFoto(JSONObject obj, SSSessionAbstract session) {
        String url = Config.getJSON().getJSONObject("files").getString("url");
        File f = new File(url+"asistencia/");
        Conexion.historico(obj.getString("key_usuario"), obj.getString("key"), "asistencia_subirFoto", new JSONObject());
        if(!f.exists()) f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath()+"/"+obj.getString("key")));
        obj.put("estado", "exito");
        SSServerAbstract.sendAllServer(obj.toString());
    }
}