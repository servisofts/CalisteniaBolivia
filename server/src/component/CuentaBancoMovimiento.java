package component;

import java.sql.SQLException;

import org.json.JSONObject;

import SSComponent.SSComponent;
import Server.SSSAbstract.SSSessionAbstract;
import conexion.Conexion;

public class CuentaBancoMovimiento extends SSComponent {
    
    public CuentaBancoMovimiento(JSONObject obj, SSSessionAbstract session){
        switch(obj.getString("type")){
            case "getAll":
                getAll(obj, session);
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
            String consulta =  "select get_movimientos_bancarios('"+obj.getString("fecha_inicio")+"','"+obj.getString("fecha_fin")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), "cuenta_banco_movimiento_getAll", data);

            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

}
