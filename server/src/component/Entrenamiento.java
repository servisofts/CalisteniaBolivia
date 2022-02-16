package component;

import java.io.File;
import Config.Config;
import org.json.JSONArray;
import java.util.UUID;
import Server.SSSAbstract.SSServerAbstract;
import java.sql.SQLException;
import conexion.Conexion;
import SocketCliente.SocketCliete;
import Server.SSSAbstract.SSSessionAbstract;
import org.json.JSONObject;

public class Entrenamiento
{
    public Entrenamiento(final JSONObject data, final SSSessionAbstract session) {
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
            case "subirFoto": {
                this.subirFoto(data, session);
                return;
            }
            case "getByDate": {
                this.getByDate(data, session);
                return;
            }
            case "getByKeyUsuario": {
                this.getByKeyUsuario(data, session);
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
            final String consulta = "select get_all('entrenamiento') as json";
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
            final String consulta = "select get_by_key('entrenamiento','" + obj.getString("key") + "') as json";
            final JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", (Object)data);
            obj.put("estado", (Object)"exito");
        }
        catch (SQLException e) {
            obj.put("estado", (Object)"error");
            e.printStackTrace();
        }
    }
    
    public void getByDate(final JSONObject obj, final SSSessionAbstract session) {
        try {
            final String consulta = "select entrenamiento_get_by_date('" + obj.getString("fecha") + "') as json";
            final JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", (Object)data);
            obj.put("estado", (Object)"exito");
        }
        catch (SQLException e) {
            obj.put("estado", (Object)"error");
            e.printStackTrace();
        }
    }
    
    public void editar(final JSONObject obj, final SSSessionAbstract session) {
        try {
            final JSONObject entrenamiento = obj.getJSONObject("data");
            Conexion.editObject("entrenamiento", entrenamiento);
            Conexion.historico(obj.getString("key_usuario"), entrenamiento.getString("key"), "entrenamiento_editar", entrenamiento);
            obj.put("data", (Object)entrenamiento);
            obj.put("estado", (Object)"exito");
            SSServerAbstract.sendAllServer(obj.toString());
        }
        catch (SQLException e) {
            obj.put("estado", (Object)"error");
            obj.put("error", (Object)e.getLocalizedMessage());
            e.printStackTrace();
        }
    }
    
    public void registro(final JSONObject obj, final SSSessionAbstract session) {
        try {
            final JSONObject entrenamiento = obj.getJSONObject("data");
            entrenamiento.put("key", (Object)UUID.randomUUID().toString());
            entrenamiento.put("fecha_on", (Object)"now()");
            entrenamiento.put("estado", 1);
            Conexion.insertArray("entrenamiento", new JSONArray().put((Object)entrenamiento));
            obj.put("data", (Object)entrenamiento);
            obj.put("estado", (Object)"exito");
            SSServerAbstract.sendAllServer(obj.toString());
        }
        catch (SQLException e) {
            obj.put("estado", (Object)"error");
            e.printStackTrace();
        }
    }
    
    public void getByKeyUsuario(final JSONObject obj, final SSSessionAbstract session) {
        try {
            final String consulta = "select entrenamiento_get_activo('" + obj.getString("key_usuario") + "') as json";
            final JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", (Object)data);
            obj.put("estado", (Object)"exito");
        }
        catch (SQLException e) {
            obj.put("estado", (Object)"error");
            e.printStackTrace();
        }
    }
    
    public void subirFoto(final JSONObject obj, final SSSessionAbstract session) {
        final String url = Config.getJSON().getJSONObject("files").getString("url");
        final File f = new File(String.valueOf(url) + "entrenamiento/");
        if (!f.exists()) {
            f.mkdirs();
        }
        obj.put("dir", (Object)(String.valueOf(f.getPath()) + "/" + obj.getString("key")));
        obj.put("estado", (Object)"exito");
        SSServerAbstract.sendServer("ServerSocketWeb", obj.toString());
        SSServerAbstract.sendServer("ServerSocket", obj.toString());
    }
    
    public static JSONObject getEntrenamiento(final String fecha_on, final String key_sucursal) {
        try {
            final String consulta = "select to_json(entrenamiento.*) as json\nfrom entrenamiento\nwhere entrenamiento.key_sucursal like '" + key_sucursal + "'\n" + "and to_char(entrenamiento.fecha_inicio, 'YYYY-MM-DD\"T\"HH24:MI:SSZ') like '" + fecha_on + "%'";
            return Conexion.ejecutarConsultaObject(consulta);
        }
        catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
}