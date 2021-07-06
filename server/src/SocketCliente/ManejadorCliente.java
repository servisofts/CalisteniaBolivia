package SocketCliente;

import org.json.JSONObject;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;
import util.console;

public class ManejadorCliente {

    public static void onMessage(JSONObject action) {
        if(action.has("version")){
            switch(action.getString("version")){
                case "2.0":
                    version2(action);
                break;
            }
        }else
            version1(action);
        
        if (action.has("router")) {
            SSSessionAbstract sesion =  SSServerAbstract.getSession(action.getString("router"));
            sesion.send(action.toString());            
            return;
        }
    }

    private static void version2(JSONObject action){
        switch (action.getString("component")) {
            case "usuario":
                new UsuarioV2(action);
                break;
            default:
                console.log(console.ANSI_RED,"Component Not Found -> : "+action.getString("component"));
        }
    }

    private static void version1(JSONObject action){
        switch (action.getString("component")) {
            case "servicio":
                Servicio.servicio(action);
                break;
            case "usuario":
                new Usuario(action);
                break;
            default:
                console.log(console.ANSI_RED,"Component Not Found -> : "+action.getString("component"));
        }
    }
}