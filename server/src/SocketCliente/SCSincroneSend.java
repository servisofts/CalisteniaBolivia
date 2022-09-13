package SocketCliente;

import java.util.HashMap;
import java.util.UUID;

import org.json.JSONObject;


public class SCSincroneSend {

    public static HashMap<String, SCSincroneSend> mapa = new HashMap<>();

    private String key;
    private SocketCliete cli;
    private JSONObject obj;

    private boolean isRun;
    private int timeOut;

    public SCSincroneSend(SocketCliete cli) {
        this.timeOut = 5000;
        this.cli = cli;
        this.key = UUID.randomUUID().toString();
    }

    public SCSincroneSend(SocketCliete cli, int timeOut) {
        this.timeOut = timeOut;
        this.cli = cli;
        this.key = UUID.randomUUID().toString();
    }

    public JSONObject send(JSONObject obj) {
        
        this.obj = obj;
        if (cli == null) {
            obj.put("estado", "error");
            obj.put("error", "No se encontro el cliente");
        }
        if (!cli.isOpen()) {
            obj.put("estado", "error");
            obj.put("error", "El cliente esta cerrado");
        }
        obj.put("_sincrone_key", key);
        mapa.put(key, this);
        cli.send(obj.toString());
        isRun = true;
        while (isRun) {
            try {
                this.timeOut -= 100;
                if (this.timeOut <= 0) {
                    obj.put("estado", "error");
                    obj.put("error", "Tiempo de espera agotado");
                    isRun = false;
                }
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        mapa.remove(key);
        return this.obj;
    }

    public void onMesagge(JSONObject data) {
        System.out.println("Response");
        this.obj = data;
        isRun = false;

    }
}
