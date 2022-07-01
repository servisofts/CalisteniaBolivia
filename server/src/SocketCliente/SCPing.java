package SocketCliente;

import java.util.Date;
import java.util.UUID;

import org.json.JSONObject;

public class SCPing extends Thread{

    public SocketCliete socketCliente;
    public String key;
    public boolean isPing;

    public SCPing(SocketCliete socketCliente){
        this.socketCliente = socketCliente;
        this.start();
    }

    @Override
    public void run() {
        JSONObject obj = new JSONObject();
        this.key = UUID.randomUUID().toString();

        obj.put("component", "ping");
        obj.put("type", "ping");
        obj.put("key", key);
            
        sendPing(obj);

        super.run();
    }

    public void sendPing(JSONObject obj){
        try {
            sleep(2000);
            obj.put("timeOut", new Date().getTime());
            isPing = false;
            if(!this.socketCliente.isOpen()){
                //detener
                return;
            }
            this.socketCliente.send(obj.toString());

            sleep(5000);
            if(!isPing){
                
                System.err.println(new Date()+" Reconectando socket cliente");
                this.socketCliente.reconect();
                return;
            }
            sendPing(obj);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }



    public boolean onMesagge(JSONObject obj) {
        if(obj.getString("component").equals("ping")  && obj.getString("type").equals("ping")){
            if(obj.getString("key").equals(this.key)){
                this.isPing = true;
                return true;
            }
        }
        return false;
    }




}
