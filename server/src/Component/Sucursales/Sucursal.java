package Component.Sucursales;

import java.io.File;
import java.sql.SQLException;
import java.util.UUID;
import org.json.JSONArray;
import org.json.JSONObject;

import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SConfig;
import Servisofts.SPGConect;

public class Sucursal {

    public static final String COMPONENT = "sucursal";

    public Sucursal(JSONObject data, SSSessionAbstract session) {

        
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, session);
            break;
            case "getMontoCaja":
                getMontoCaja(data, session);
            break;
            case "getCajaActiva":
                getCajaActiva(data, session);
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
            String consulta =  "select get_all('sucursal') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void getMontoCaja(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_monto_caja('"+obj.getString("key_sucursal")+"') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    private void getCajaActiva(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select caja_get_activa_sucursal('"+obj.getString("key_sucursal")+"') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static JSONArray getMontoCajaArray(String key_sucursal) {
        try {
            String consulta =  "select get_monto_caja_array('"+key_sucursal+"') as json";
            return SPGConect.ejecutarConsultaArray(consulta);
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_by_key('sucursal','"+obj.getString("key")+"') as json";
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
            JSONObject sucursal = obj.getJSONObject("data");
            sucursal.put("key",UUID.randomUUID().toString());
            sucursal.put("fecha_on","now()");
            sucursal.put("estado","1");
            SPGConect.insertArray("sucursal", new JSONArray().put(sucursal));
            obj.put("data", sucursal);
            obj.put("estado", "exito");

            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }

    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject sucursal = obj.getJSONObject("data");
            SPGConect.editObject("sucursal", sucursal);
            obj.put("data", sucursal);
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
        File f = new File(url+"sucursal/");
        if(!f.exists()) f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath()+"/"+obj.getString("key")));
        obj.put("estado", "exito");
        SSServerAbstract.sendAllServer(obj.toString());
    }
}