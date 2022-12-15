package Component.Ventas;

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

public class Prorroga {

    public static final String COMPONENT = "prorroga";
    public static final String nombre_tabla = "prorroga_paquete_venta_usuario";

    public Prorroga(JSONObject data, SSSessionAbstract session) {
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
            case "anular":
                anular(data, session);
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
            String consulta = "select get_all('" + nombre_tabla + "') as json";
            if (obj.has("key_usuario")) {
                consulta = "select get_all('" + nombre_tabla + "', 'key_usuario', '" + obj.getString("key_usuario")
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

    public static JSONObject getByKey(String key) {
        try {
            String consulta = "select get_by_key('" + nombre_tabla + "','" + key + "') as json";
            return SPGConect.ejecutarConsultaObject(consulta);
        } catch (SQLException e) {
            return null;
        }
    }

    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_by_key('" + nombre_tabla + "','" + obj.getString("key") + "') as json";
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
            DateFormat formatter1 = new SimpleDateFormat("yyyy-MM-dd");
            String fecha_on = formatter.format(new Date());
            JSONObject data = obj.getJSONObject("data");

            JSONObject paqueteVentaUsuario = PaqueteVentaUsuario.getByKey(data.getString("key_paquete_venta_usuario"));
            paqueteVentaUsuario = paqueteVentaUsuario.getJSONObject(JSONObject.getNames(paqueteVentaUsuario)[0]);

            JSONObject prorroga = new JSONObject();
            prorroga.put("key", UUID.randomUUID().toString());
            prorroga.put("key_paquete_venta_usuario", paqueteVentaUsuario.getString("key"));
            prorroga.put("descripcion", data.getString("descripcion"));
            prorroga.put("fecha_fin", paqueteVentaUsuario.getString("fecha_fin"));
            prorroga.put("key_usuario", obj.getString("key_usuario"));
            prorroga.put("dias", data.getInt("dias"));
            prorroga.put("estado", 1);
            prorroga.put("fecha_on", fecha_on);

            SPGConect.insertArray(nombre_tabla, new JSONArray().put(prorroga));

            Calendar fecha_fin = new GregorianCalendar();
            fecha_fin.setTime(formatter1.parse(prorroga.getString("fecha_fin")));
            fecha_fin.add(Calendar.DAY_OF_MONTH, prorroga.getInt("dias"));
            paqueteVentaUsuario.put("fecha_fin", formatter.format(fecha_fin.getTime()));

            PaqueteVentaUsuario.editar(paqueteVentaUsuario);

            paqueteVentaUsuario.put("fecha_fin", formatter1.format(fecha_fin.getTime()));

            obj.put("data", paqueteVentaUsuario);
            obj.put("estado", "exito");

            SSServerAbstract.sendAllServer(obj.toString());
        } catch (Exception e) {
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
            SPGConect.insertArray(nombre_tabla, new JSONArray().put(obj));
            return obj;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }

    }

    public void anular(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject prorroga = obj.getJSONObject("data");

            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            DateFormat formatter1 = new SimpleDateFormat("yyyy-MM-dd");

            JSONObject paqueteVentaUsuario = PaqueteVentaUsuario
                    .getByKey(prorroga.getString("key_paquete_venta_usuario"));
            paqueteVentaUsuario = paqueteVentaUsuario.getJSONObject(JSONObject.getNames(paqueteVentaUsuario)[0]);

            prorroga = Prorroga.getByKey(prorroga.getString("key"));
            prorroga = prorroga.getJSONObject(JSONObject.getNames(prorroga)[0]);
            if (prorroga.getInt("estado") > 0) {
                Calendar fecha_fin = new GregorianCalendar();
                fecha_fin.setTime(formatter1.parse(paqueteVentaUsuario.getString("fecha_fin")));
                fecha_fin.add(Calendar.DAY_OF_MONTH, prorroga.getInt("dias") * -1);
                paqueteVentaUsuario.put("fecha_fin", formatter.format(fecha_fin.getTime()));

                PaqueteVentaUsuario.editar(paqueteVentaUsuario);

                prorroga.put("estado", 0);

                SPGConect.editObject(nombre_tabla, prorroga);
            }

            obj.put("data", prorroga);
            obj.put("estado", "exito");
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
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
        File f = new File(url + nombre_tabla + "/");
        if (!f.exists())
            f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath() + "/" + obj.getString("key")));
        obj.put("estado", "exito");
        SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
    }
}