package SocketCliente;

import org.json.JSONObject;

import Server.SSSAbstract.SSServerAbstract;

public class LectorHuella {
    public static final String COMPONENT = "lector_huella";

    public static void onMessage(JSONObject obj) {
        switch (obj.getString("type")) {
            case "onEvent":
                onEvent(obj);
                break;
        }
    }

    public static void onEvent(JSONObject obj) {
        try {
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
        } catch (Exception e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

}