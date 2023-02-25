package Component.Cajas;

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

public class CajaMovimiento {

    public static final String COMPONENT = "cajaMovimiento";
    public static final String TABLE = "caja_movimiento";
    
    public CajaMovimiento(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, session);
            break;
            case "getAllActivas":
                getAllActivas(data, session);
            break;
            case "getByFecha":
                getByFecha(data, session);
            break;
            case "getByKeyCaja":
                getByKeyCaja(data, session);
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
            String consulta =  "select get_all('caja_movimiento') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void getAllActivas(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_all_activas() as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void getByFecha(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select movimientos_get_by_fecha('"+obj.getString("fecha_inicio")+"','"+obj.getString("fecha_fin")+"') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }
    
    public void getByKeyCaja(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_all('caja_movimiento', 'key_caja', '"+obj.getString("key_caja")+"') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }
    public static JSONObject getByKeyCaja(String key_caja) {
        try {
            String consulta =  "select get_all('caja_movimiento', 'key_caja', '"+key_caja+"') as json";
            return SPGConect.ejecutarConsultaObject(consulta);
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static JSONObject getTotales(String key_caja) {
        try {
            String consulta =  "select caja_get_totales('"+key_caja+"') as json";
            return SPGConect.ejecutarConsultaObject(consulta);
        } catch (SQLException e) {
            e.printStackTrace();
            return new JSONObject();
        }
    }

    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_by_key('caja_movimiento','"+obj.getString("key")+"') as json";
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
           
            JSONObject caja_movimiento = obj.getJSONObject("data");
            caja_movimiento.put("key", UUID.randomUUID().toString());
            caja_movimiento.put("key_caja_tipo_movimiento", 4);
            caja_movimiento.put("key_tipo_pago", "1");
            caja_movimiento.put("data", new JSONObject().put("key_tipo_pago", caja_movimiento.getString("key_tipo_pago")));
            caja_movimiento.put("fecha_on", fecha_on);
            caja_movimiento.put("estado", 1);
            SPGConect.insertArray("caja_movimiento", new JSONArray().put(caja_movimiento));

            obj.put("data", caja_movimiento);
            obj.put("estado", "exito");

            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }



    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject caja_movimiento = obj.getJSONObject("data");
            SPGConect.editObject("caja_movimiento", caja_movimiento);
            obj.put("data", caja_movimiento);
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
        File f = new File(url+"caja_movimiento/");
        if(!f.exists()) f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath()+"/"+obj.getString("key")));
        obj.put("estado", "exito");
        SSServerAbstract.sendAllServer(obj.toString());
    }

    public static JSONObject getMovimientosVentaServicio(String key_caja, String key_paquete_venta_usuario){
        try{
            String consulta = "SELECT "+
                        " jsonb_object_agg(caja_movimiento.key, to_json(caja_movimiento.*))::json as json "+
                        "FROM caja_movimiento "+
                        "WHERE caja_movimiento.key_caja = '"+key_caja+"' "+
                        "and caja_movimiento.key_caja_tipo_movimiento = '3' "+
                        "and caja_movimiento.data ->> 'key_paquete_venta_usuario' = '"+key_paquete_venta_usuario+"' "+
                        "and caja_movimiento.descripcion = 'Venta de servicio'";
            return SPGConect.ejecutarConsultaObject(consulta);
        }catch(Exception e){
            return null;
        }
    }
}