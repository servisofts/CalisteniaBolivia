package ComponentNotInFrontEnd;

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

public class TipoGasto {
    public TipoGasto(JSONObject data, SSSessionAbstract session) {
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
        try{
            String consulta =  "select get_all('tipo_gasto') as json";
            JSONObject tipo_gasto = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", tipo_gasto);
            obj.put("estado", "exito");
        }catch(Exception e){
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
    }
   
    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String key = obj.getJSONObject("data").getString("key");
            String consulta =  "select get_by_key('tipo_gasto','"+key+"') as json";
                JSONObject tipo_gasto = SPGConect.ejecutarConsultaObject(consulta);
                obj.put("data", tipo_gasto);
                obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }

    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());

            String key = UUID.randomUUID().toString();
            JSONObject tipo_gasto = obj.getJSONObject("data");
            tipo_gasto.put("key",key);
            tipo_gasto.put("fecha_on", fecha_on);
            tipo_gasto.put("estado",1);
            SPGConect.insertArray("tipo_gasto", new JSONArray().put(tipo_gasto));
            obj.put("data", tipo_gasto);
            obj.put("estado", "exito");
            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }

    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject tipo_gasto = obj.getJSONObject("data");
            SPGConect.editObject("tipo_gasto", tipo_gasto);
            obj.put("data", tipo_gasto);
            obj.put("estado", "exito");

            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void subirFoto(JSONObject obj, SSSessionAbstract session)  {
        try{
           
            String url = SConfig.getJSON().getJSONObject("files").getString("url")+"tipo_gasto/";
            File f = new File(url);
            if(!f.exists()) f.mkdirs();
            JSONArray documentos = new JSONArray();
            url+=obj.getString("key");
            obj.put("dirs", new JSONArray().put(url));
            obj.put("estado", "exito");
            obj.put("data", documentos);
            
            SSServerAbstract.sendAllServer(obj.toString());
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
