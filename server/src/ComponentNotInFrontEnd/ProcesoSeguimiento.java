package ComponentNotInFrontEnd;

import java.io.File;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;

import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SConfig;
import Servisofts.SPGConect;

public class ProcesoSeguimiento {
    public ProcesoSeguimiento(JSONObject data, SSSessionAbstract session) {
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
            String consulta =  "select proceso_seguimiento_get_all('"+obj.getString("key_proceso")+"') as json";
            JSONObject proceso_seguimiento = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", proceso_seguimiento);
            obj.put("estado", "exito");
        }catch(Exception e){
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
    }
   
    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String key = obj.getString("key");
            String consulta =  "select proceso_seguimiento_get_by_key('"+key+"') as json";
                JSONObject proceso = SPGConect.ejecutarConsultaObject(consulta);
                obj.put("data", proceso);
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
            Date hoy = new Date();
            String fecha_on = formatter.format(hoy);

            Calendar cal = new GregorianCalendar();
            cal.setTime(hoy);
            cal.add(Calendar.DAY_OF_MONTH, 7);

            String key = UUID.randomUUID().toString();
            JSONObject proceso_seguimiento = obj.getJSONObject("data");
            proceso_seguimiento.put("key",key);
            proceso_seguimiento.put("fecha_on",fecha_on);
            proceso_seguimiento.put("fecha_expiracion",formatter.format(cal.getTime()));
            proceso_seguimiento.put("estado",1);
            SPGConect.insertArray("proceso_seguimiento", new JSONArray().put(proceso_seguimiento));

            obj.put("data", proceso_seguimiento);
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
            JSONObject proceso_seguimiento = obj.getJSONObject("data");
            SPGConect.editObject("proceso_seguimiento", proceso_seguimiento);
            obj.put("data", proceso_seguimiento);
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
           
            String url = SConfig.getJSON().getJSONObject("files").getString("url")+"proceso_seguimiento/";
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
