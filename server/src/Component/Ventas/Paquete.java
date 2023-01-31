

package Component.Ventas;

import java.io.File;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import org.json.JSONArray;
import org.json.JSONObject;

import Component.Sucursales.SucursalPaquete;
import Component.Sucursales.SucursalUsuario;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SConfig;
import Servisofts.SPGConect;

public class Paquete {
    public static final String COMPONENT = "paquete";
    public static final String TABLE = "paquete";

    public Paquete(JSONObject data, SSSessionAbstract session) {
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
            String consulta = "select get_all_mas_anulados('paquete') as json";
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
            String consulta = "select get_by_key('paquete','" + obj.getString("key") + "') as json";
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
            JSONObject paquete = obj.getJSONObject("data");
            paquete.put("key", UUID.randomUUID().toString());
            paquete.put("fecha_on", fecha_on);
            paquete.put("estado", "1");
            SPGConect.insertArray("paquete", new JSONArray().put(paquete));

            JSONArray paquete_servicios = new JSONArray();
            JSONObject paquete_servicio;
            for (int i = 0; i < obj.getJSONArray("servicios").length(); i++) {
                paquete_servicio = new JSONObject();
                paquete_servicio.put("key", UUID.randomUUID().toString());
                paquete_servicio.put("key_paquete", paquete.getString("key"));
                paquete_servicio.put("key_servicio", obj.getJSONArray("servicios").getString(i));
                paquete_servicio.put("estado", 1);
                paquete_servicios.put(paquete_servicio);
            }
            SPGConect.insertArray("paquete_servicio", paquete_servicios);

            JSONObject sucursales = SucursalUsuario.getAll(obj.getString("key_usuario"));

            JSONObject sucursalUsuario;
            JSONObject sucursalPaquete;
            if (!sucursales.isEmpty()) {
                for (int i = 0; i < JSONObject.getNames(sucursales).length; i++) {
                    sucursalUsuario = sucursales.getJSONObject(JSONObject.getNames(sucursales)[i]);
                    sucursalPaquete = new JSONObject();
                    sucursalPaquete.put("key_sucursal", sucursalUsuario.getString("key_sucursal"));
                    sucursalPaquete.put("key_paquete", paquete.getString("key"));
                    SucursalPaquete.registro(sucursalPaquete);
                }
            }

            obj.put("data", paquete);
            obj.put("estado", "exito");

            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }

    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject paquete = obj.getJSONObject("data");
            SPGConect.editObject("paquete", paquete);
            obj.put("data", paquete);
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
        File f = new File(url + "paquete/");
        if (!f.exists())
            f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath() + "/" + obj.getString("key")));
        obj.put("estado", "exito");
        SSServerAbstract.sendAllServer(obj.toString());
    }
}