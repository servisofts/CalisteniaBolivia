
package Component.Ventas;

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

public class PaqueteServicio {
    public static final String COMPONENT = "paqueteServicio";

    public PaqueteServicio(JSONObject data, SSSessionAbstract session) {
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
            String consulta = "select get_all('paquete_servicio') as json";
            if (obj.has("key_servicio")) {
                consulta = "select get_all('paquete_servicio', 'key_servicio', '" + obj.getString("key_servicio")
                        + "') as json";
            }
            if (obj.has("key_paquete")) {
                consulta = "select get_all('paquete_servicio', 'key_paquete', '" + obj.getString("key_paquete")
                        + "') as json";
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
            String consulta = "select get_by_key('paquete_servicio','" + obj.getString("key") + "') as json";
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
            JSONObject paquete_servicio = obj.getJSONObject("data");
            paquete_servicio.put("key", UUID.randomUUID().toString());
            paquete_servicio.put("fecha_on", fecha_on);
            paquete_servicio.put("estado", 1);
            SPGConect.insertArray("paquete_servicio", new JSONArray().put(paquete_servicio));
            obj.put("data", paquete_servicio);
            obj.put("estado", "exito");

            SSServerAbstract.sendAllServer(obj.toString());
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
            SPGConect.insertArray("paquete_servicio", new JSONArray().put(obj));
            return obj;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }

    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject paquete_servicio = obj.getJSONObject("data");
            SPGConect.editObject("paquete_servicio", paquete_servicio);
            obj.put("data", paquete_servicio);
            obj.put("estado", "exito");
            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void subirFoto(JSONObject obj, SSSessionAbstract session) {
        String url = SConfig.getJSON().getJSONObject("files").getString("url");
        File f = new File(url + "paquete_servicio/");
        if (!f.exists())
            f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath() + "/" + obj.getString("key")));
        obj.put("estado", "exito");
        SSServerAbstract.sendAllServer(obj.toString());
    }
}