package component;

import org.json.JSONObject;

import Server.SSSAbstract.SSSessionAbstract;
import util.console;

public class Manejador {

    public Manejador(JSONObject data, SSSessionAbstract session) {
        boolean showLog = true;
        if (data.getString("component").equals("socketTest")) {
            showLog = false;
        }
        if (showLog)
            console.log(console.ANSI_BLUE, " Manejador Socket Server -> : " + data.getString("component"));

        if (!data.isNull("component")) {
            switch (data.getString("component")) {
                case "usuario": {
                    new Usuario(data, session);
                    break;
                }
                case "cabeceraDato": {
                    new CabeceraDato(data, session);
                    break;
                }
                case "mensajeSocket": {
                    MensajeSocket.onMensaje(data, session);
                    break;
                }
                case "socketTest": {
                    new SocketTest(data, session);
                    break;
                }
                case "file": {
                    new SFile(data, session);
                    break;
                }
                case "old": {
                    new Old(data, session);
                    break;
                }
                case "modulo": {
                    new Modulo(data, session);
                    break;
                }
                case "proceso": {
                    new Proceso(data, session);
                    break;
                }
                case "procesoComentario": {
                    new ProcesoComentario(data, session);
                    break;
                }
                default:
                    break;
            }
        } else {
            data.put("error", "No existe el componente");
        }
    }
}