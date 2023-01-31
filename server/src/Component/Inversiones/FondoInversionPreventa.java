package Component.Inversiones;

import org.json.JSONObject;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.io.File;
import java.sql.SQLException;
import java.util.Date;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.json.JSONArray;

import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SConfig;
import Servisofts.SPGConect;

public class FondoInversionPreventa {
    public static final String COMPONENT = "fondo_inversion_preventa";

    public static void onMessage(JSONObject obj, SSSessionAbstract session) {
        switch (obj.getString("type")) {
            case "getAll":
                getAll(obj, session);
                break;
            case "getByKey":
                getByKey(obj, session);
                break;
            case "registro":
                registro(obj, session);
                break;
            case "editar":
                editar(obj, session);
                break;
            case "subirFoto":
                subirFoto(obj, session);
                break;

        }
    }

    public static void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_all('" + COMPONENT + "') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            // SPGConect.historico(obj.getString("key_usuario"), COMPONENT + "_getAll",
            // data);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_by_key('" + COMPONENT + "','" + obj.getString("key")
                    + "') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            // SPGConect.historico(obj.getString("key_usuario"), COMPONENT + "_getByKey",
            // data);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());
            JSONObject data = obj.getJSONObject("data");
            data.put("key", UUID.randomUUID().toString());
            if (!data.has("fecha_on")) {
                data.put("fecha_on", fecha_on);
            }

            data.put("estado", 1);


            SPGConect.insertArray(COMPONENT, new JSONArray().put(data));
            SPGConect.historico(obj.getString("key_usuario"), data.getString("key"),
                    COMPONENT + "_registro", data);
            obj.put("data", data);
            obj.put("estado", "exito");
            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }

    }

    public static void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            SPGConect.editObject(COMPONENT, data);
            SPGConect.historico(obj.getString("key_usuario"), data.getString("key"),
                    COMPONENT + "_editar", data);
            obj.put("data", data);
            obj.put("estado", "exito");
            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public static void subirFoto(JSONObject obj, SSSessionAbstract session) {
        String url = SConfig.getJSON().getJSONObject("files").getString("url");
        File f = new File(url + COMPONENT + "/");
        SPGConect.historico(obj.getString("key_usuario"), obj.getString("key"),
                COMPONENT + "_subirFoto", new JSONObject());
        if (!f.exists())
            f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath() + "/" + obj.getString("key")));
        obj.put("estado", "exito");
        SSServerAbstract.sendAllServer(obj.toString());
    }

 
}
