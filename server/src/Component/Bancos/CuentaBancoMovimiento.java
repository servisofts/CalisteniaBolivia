package Component.Bancos;

import java.io.File;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.json.JSONArray;
import org.json.JSONObject;

import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SConfig;
import Servisofts.SPGConect;

public class CuentaBancoMovimiento {
    public static final String COMPONENT = "cuentaBancoMovimiento";
    public CuentaBancoMovimiento(JSONObject obj, SSSessionAbstract session){
        switch(obj.getString("type")){
            case "getAll":
                getAll(obj, session);
            break;
            case "traspaso":
                traspaso(obj, session);
            break;
            case "editar":
                editar(obj, session);
            break;
            case "getAllByKeyCuentaBanco":
                getAllByKeyCuentaBanco(obj, session);
            break;
            
            case "getByKey": getByKey(obj, session); break;
            case "registro": registro(obj, session); break;
            case "subirFoto": subirFoto(obj, session); break;

        }
    }

    public static void getAllByKeyCuentaBanco(JSONObject obj, SSSessionAbstract session) {
        try {
            capitalTransform(obj);
            String consulta =  "select get_all('"+obj.getString("nombre_tabla")+"', 'key_cuenta_banco', '"+obj.getString("key_cuenta_banco")+"') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            // SPGConect.historico(obj.getString("key_usuario"), obj.getString("nombre_tabla")+"_getAll", data);
            obj.put("data", data);
            obj.put("estado", "exito");
            obj.remove("nombre_tabla");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_movimientos_bancarios() as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);

            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            SPGConect.editObject("cuenta_banco_movimiento", data);
            // SPGConect.historico(obj.getString("key_usuario"),data.getString("key"), "modulo_editar", data);
            obj.put("data", data);
            obj.put("estado", "exito");

            SSServerAbstract.sendAllServer(obj.toString());
        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public static void traspaso(JSONObject obj, SSSessionAbstract session) {
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());
            
            JSONObject data = obj.getJSONObject("data");

            if(data.has("fecha_on")){
                fecha_on = data.getString("fecha_on");
            }
            
            data.getString("key_cuenta_banco_to");

            JSONObject cuentaBancoMovimiento = new JSONObject();
            cuentaBancoMovimiento.put("key", UUID.randomUUID().toString());
            cuentaBancoMovimiento.put("descripcion", data.getString("descripcion"));
            cuentaBancoMovimiento.put("tipo_movimiento", data.getString("tipo_movimiento"));
            cuentaBancoMovimiento.put("key_cuenta_banco", data.getString("key_cuenta_banco"));
            cuentaBancoMovimiento.put("key_usuario", obj.getString("key_usuario"));
            cuentaBancoMovimiento.put("monto", data.getDouble("monto")*-1);
            cuentaBancoMovimiento.put("data", new JSONObject().put("key_caja_movimiento", data));
            cuentaBancoMovimiento.put("fecha_on", fecha_on);
            cuentaBancoMovimiento.put("estado", 1);
            SPGConect.insertArray("cuenta_banco_movimiento", new JSONArray().put(cuentaBancoMovimiento));

            JSONObject sendcuentaBancoMovimiento = new JSONObject();
            sendcuentaBancoMovimiento.put("component", "cuentaBancoMovimiento");
            sendcuentaBancoMovimiento.put("type", "registro");
            sendcuentaBancoMovimiento.put("data", cuentaBancoMovimiento);
            sendcuentaBancoMovimiento.put("estado", "exito");
            SSServerAbstract.sendAllServer(sendcuentaBancoMovimiento.toString());

            cuentaBancoMovimiento = new JSONObject();
            cuentaBancoMovimiento.put("key", UUID.randomUUID().toString());
            cuentaBancoMovimiento.put("descripcion", data.getString("descripcion"));
            cuentaBancoMovimiento.put("tipo_movimiento", data.getString("tipo_movimiento"));
            cuentaBancoMovimiento.put("key_cuenta_banco", data.getString("key_cuenta_banco_to"));
            cuentaBancoMovimiento.put("key_usuario", obj.getString("key_usuario"));
            cuentaBancoMovimiento.put("monto", data.getDouble("monto"));
            cuentaBancoMovimiento.put("data", new JSONObject().put("key_caja_movimiento", data));
            cuentaBancoMovimiento.put("fecha_on", fecha_on);
            cuentaBancoMovimiento.put("estado", 1);
            SPGConect.insertArray("cuenta_banco_movimiento", new JSONArray().put(cuentaBancoMovimiento));

            sendcuentaBancoMovimiento = new JSONObject();
            sendcuentaBancoMovimiento.put("component", "cuentaBancoMovimiento");
            sendcuentaBancoMovimiento.put("type", "registro");
            sendcuentaBancoMovimiento.put("data", cuentaBancoMovimiento);
            sendcuentaBancoMovimiento.put("estado", "exito");
            SSServerAbstract.sendAllServer(sendcuentaBancoMovimiento.toString());

            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static JSONObject getByKeyCajaMovimiento(String key_caja_movimiento){
        try{
            String consulta = "select \n"+
            " to_json(cuenta_banco_movimiento.*)::json as json "+
            "from cuenta_banco_movimiento\n"+
            "where cuenta_banco_movimiento.data ->> 'key_caja_movimiento' = '"+key_caja_movimiento+"'";
            return SPGConect.ejecutarConsultaObject(consulta);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public static void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            capitalTransform(obj);
            String consulta =  "select get_by_key('"+obj.getString("nombre_tabla")+"','"+obj.getString("key")+"') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
            obj.remove("nombre_tabla");
        } catch (SQLException e) { 
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            capitalTransform(obj);
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());
            JSONObject data = obj.getJSONObject("data");
            data.put("key",UUID.randomUUID().toString());
            if(!data.has("fecha_on")){
                data.put("fecha_on",fecha_on);
            }

            //data.put("estado",1);


            SPGConect.insertArray(obj.getString("nombre_tabla"), new JSONArray().put(data));
           // SPGConect.historico(obj.getString("key_usuario"), data.getString("key"), obj.getString("nombre_tabla")+"_registro", data);
            obj.put("data", data);
            obj.put("estado", "exito");
            obj.remove("nombre_tabla");
            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }

    }

    public static void subirFoto(JSONObject obj, SSSessionAbstract session) {
        capitalTransform(obj);
        String url = SConfig.getJSON().getJSONObject("files").getString("url");
        File f = new File(url+obj.getString("nombre_tabla")+"/");
        if(!f.exists()) f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath()+"/"+obj.getString("key")));
        obj.put("estado", "exito");
        obj.remove("nombre_tabla");
        SSServerAbstract.sendAllServer(obj.toString());
    }

    public static void capitalTransform(JSONObject obj){
        Matcher m = Pattern.compile("[/A-Z]").matcher(obj.getString("component"));
        StringBuffer sb = new StringBuffer();
        while (m.find()) {
            m.appendReplacement(sb, "_"+m.group().toLowerCase());
        }
        m.appendTail(sb);
        obj.put("nombre_tabla", sb.toString());
    }


}
