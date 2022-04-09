package component;

import org.json.JSONArray;
import org.json.JSONObject;
import SocketCliente.SocketCliete;

/**
 * ZKTeco
 */
public class ZKTeco {

    public ZKTeco(JSONObject obj) {
        if (!obj.isNull("type")) {
            switch (obj.getString("type")) {
                case "init":
                    init(obj);
                    break;
            }
        }
    }
    public static boolean pingAll(){
        try{
            System.out.println("Sincronizando...");
            
            JSONObject clientes_activos = ClientesActivos.getAll();
            String [] keys = JSONObject.getNames(clientes_activos);
            JSONObject obj = new JSONObject();
            obj.put("component", "punto_venta");
            obj.put("type", "pingAll");
            obj.put("data", new JSONArray(keys));
            obj.put("estado", "cargando");
            SocketCliete.send("zkteco", obj.toString());

        }catch(Exception e){
            e.printStackTrace();
        }
        return false;
    }
    public static boolean init(JSONObject obj){
        System.out.println("init...");
        if(obj.getString("estado").equals("cargando")){
            System.out.println("cargando...");
            return false;
        }
        if(obj.getString("estado").equals("error")){
            System.out.println("Error al iniciar ZKTeco");
            return false;
        }
        System.out.println(obj.toString());
        return false;
    }
    public static boolean dos(){
        
        System.out.println("Sincronizando...");
        JSONObject obj = new JSONObject();
        obj.put("component", "dispositivo");
        obj.put("type", "getAll");
        SocketCliete.send("zkteco", obj.toString());

        return false;
    }
    
}