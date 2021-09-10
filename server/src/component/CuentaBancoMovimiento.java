package component;

import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;

import SSComponent.SSComponent;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;
import conexion.Conexion;

public class CuentaBancoMovimiento extends SSComponent {
    
    public CuentaBancoMovimiento(JSONObject obj, SSSessionAbstract session){
        switch(obj.getString("type")){
            case "getAll":
                getAll(obj, session);
            break;
            case "traspaso":
                traspaso(obj, session);
            break;
            case "getAllByKeyCuentaBanco":
                getAllByKeyCuentaBanco(obj, session);
            break;
            default : SSComponent.navigate(obj, session);

        }
    }

    public static void getAllByKeyCuentaBanco(JSONObject obj, SSSessionAbstract session) {
        try {
            capitalTransform(obj);
            String consulta =  "select get_all('"+obj.getString("nombre_tabla")+"', 'key_cuenta_banco', '"+obj.getString("key_cuenta_banco")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), obj.getString("nombre_tabla")+"_getAll", data);
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
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), "cuenta_banco_movimiento_getAll", data);

            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static void traspaso(JSONObject obj, SSSessionAbstract session) {
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());
            
            JSONObject data = obj.getJSONObject("data");

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
            Conexion.insertArray("cuenta_banco_movimiento", new JSONArray().put(cuentaBancoMovimiento));

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
            Conexion.insertArray("cuenta_banco_movimiento", new JSONArray().put(cuentaBancoMovimiento));

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
}
