package Component;

import org.json.JSONObject;
import SocketCliente.SocketCliete;
import Server.SSSAbstract.SSSessionAbstract;

public class CabeceraDato {
    
    public static final String COMPONENT = "cabecera_dato";

    public CabeceraDato(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            default:
                defaultType(data, session);
        }
    }

    public void defaultType(JSONObject obj, SSSessionAbstract session) {       
        SocketCliete.send("usuario", obj, session);
    }
}