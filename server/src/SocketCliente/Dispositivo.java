package SocketCliente;

import org.json.JSONObject;

import Server.SSSAbstract.SSServerAbstract;
import conexion.Conexion;

public class Dispositivo {
    public static final String COMPONENT = "dispositivo";

    public static void onMessage(JSONObject obj) {
        switch (obj.getString("type")) {
            case "getAll":
                getAll(obj);
                break;
            case "registro":
                registro(obj);
                break;
        }
    }

    public static void getAll(JSONObject obj) {
        try {
            String consulta = "select get_all_dispositivo() as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static void registro(JSONObject obj) {
        try {
            obj.put("component", "usuario_huella");
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
        } catch (Exception e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

}