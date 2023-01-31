package Component.Sucursales;

import java.io.File;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import org.json.JSONArray;
import org.json.JSONObject;

import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SConfig;
import Servisofts.SPGConect;

public class SucursalPaquete {

    public static final String COMPONENT = "sucursal_paquete";

    public static final String nombre_tabla = "sucursal_paquete";

    public SucursalPaquete(JSONObject data, SSSessionAbstract session) {
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
        }
    }


    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_all('"+nombre_tabla+"') as json";
            if(obj.has("key_sucursal")){
                consulta = "select get_all('"+nombre_tabla+"', 'key_sucursal', '"+obj.getString("key_sucursal")+"') as json";
            }
            if(obj.has("key_paquete")){
                consulta = "select get_all('"+nombre_tabla+"', 'key_paquete', '"+obj.getString("key_paquete")+"') as json";
            }
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
            String consulta =  "select get_by_key('"+nombre_tabla+"','"+obj.getString("key")+"') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);

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
            JSONObject data = obj.getJSONObject("data");
            data.put("key",UUID.randomUUID().toString());
            data.put("fecha_on",fecha_on);
            data.put("estado",1);
            SPGConect.insertArray(nombre_tabla, new JSONArray().put(data));
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
            
            obj.put("key",UUID.randomUUID().toString());
            obj.put("fecha_on",fecha_on);
            obj.put("estado",1);
            SPGConect.insertArray(nombre_tabla, new JSONArray().put(obj));
            return obj;
            
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }

    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            SPGConect.editObject(nombre_tabla, data);
            obj.put("data", data);
            obj.put("estado", "exito");
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void subirFoto(JSONObject obj, SSSessionAbstract session) {
        String url = SConfig.getJSON().getJSONObject("files").getString("url");
        File f = new File(url+nombre_tabla+"/");
        if(!f.exists()) f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath()+"/"+obj.getString("key")));
        obj.put("estado", "exito");
        SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
    }
}