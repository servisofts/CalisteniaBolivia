package SocketCliente;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.HashMap;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocket;
import javax.net.ssl.SSLSocketFactory;

import component.ManejadorServicio;
import util.console;
import SSL.SSL;
import Server.SSSAbstract.SSSessionAbstract;

import org.json.JSONObject;

import Config.Config;

public class SocketCliete extends Thread {

    public static HashMap<String, SocketCliete> Clientes = new HashMap<>();
    public static JSONObject servicios_habilitados = new JSONObject();




    // Metodos Staticos globalizados

    public static void StartServicio(String nombre) {
        if (!servicios_habilitados.has(nombre)) {
            console.log(console.ANSI_RED,"No existe el servicio");
            return;
        }

        new Thread(){
            @Override
            public void run(){
                JSONObject servicio = servicios_habilitados.getJSONObject(nombre);
                if (!servicio.has("pem")) {
                    console.log(console.ANSI_RED,"No existe el pem.");
                    JSONObject objSend = new JSONObject();
                    objSend.put("component", "servicio");
                    objSend.put("type", "getPem");
                    objSend.put("estado", "cargando");
                    objSend.put("key_servicio", servicio.getString("key"));
                    Clientes.get("servicio").send(objSend.toString());
                    console.log(console.ANSI_RED,"Pidiendo SHA a servicios.");
                    // return;
                }
                JSONObject config = new JSONObject();
                config.put("ip", servicio.getString("ip"));
                config.put("puerto", servicio.getInt("puerto"));
                JSONObject cert = new JSONObject();
                cert.put("OU", servicio.getString("nombre"));
                config.put("cert", cert);
                Start(config);
            }
        }.start();
    }

    public static void Start(JSONObject config) {
       console.log(console.ANSI_YELLOW,"**Conectando con 'servisofts." + config.getJSONObject("cert").getString("OU")
                + "' Direccion: " + config.getString("ip") + ":" + config.getInt("puerto") + " **");

        // CONFIGURAMNO EL CLIENTE SOCKET Y CORREMOS EL HILO
        try {
            SSLContext ss = SSL.getSSLContext();
            SSLSocketFactory ssf = ss.getSocketFactory();
            SSLSocket s = (SSLSocket) ssf.createSocket(config.getString("ip"), config.getInt("puerto"));
            s.startHandshake();
            // INICIA LA CONEXION AL SOCKET new SocketCliete(config);
            
            if(Clientes.get(config.getJSONObject("cert").getString("OU")) !=null){
                Clientes.get(config.getJSONObject("cert").getString("OU")).socket.close();
                Clientes.get(config.getJSONObject("cert").getString("OU")).Open = false;
                Clientes.remove(config.getJSONObject("cert").getString("OU"));
            } 
            new SocketCliete(config, s); 

        } catch (Exception e) {
            console.log(console.ANSI_RED,e.getMessage());
            console.log(console.ANSI_RED,
                    "Error al conectar con el servidor 'servisofts." + config.getJSONObject("cert").getString("OU")
                            + "' Direccion: " + config.getString("ip") + ":" + config.getInt("puerto") + " **");
            try {
                sleep(Config.getJSON("socket_client").getInt("reconectTime"));
                Start(config);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

    }

    // Cliente Socket
    private boolean Open = false;
    private PrintWriter response;
    private SSLSocket socket;
    private BufferedReader request;
    private SCPing ping;
    public JSONObject config;


    public SocketCliete(JSONObject config, SSLSocket socket) throws IOException {

        this.socket = socket;
        response = new PrintWriter(socket.getOutputStream(), true);
        request = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        this.config = config;
        console.log(console.ANSI_YELLOW,"** Connectando con el server " + config.getJSONObject("cert").getString("OU") + " **");
        // System.out.println("SocketCliete is Running...");
        Clientes.put(config.getJSONObject("cert").getString("OU"), this);
        this.ping = new SCPing(this);
        this.start();
        this.Open = true;
    }


    @Override
    public void run() {
        try {


            String eventos;
            while (Open) {
                eventos = request.readLine();
                // System.out.println(eventos);
                onMesagge(eventos, config);
            }
        } catch (Exception ex) {
            onError(ex);
            this.Open = false;
        }
    }

    public void reconect(){
        try{
            this.socket.close();
            this.Open = false;
            Clientes.remove(config.getJSONObject("cert").getString("OU"));
            Start(this.config);
        }catch(Exception e){
            e.printStackTrace();
        }
        
    }

    private void onError(Exception ex) {
        try{
            SocketCliete cliente = Clientes.get(config.getJSONObject("cert").getString("OU"));
            cliente.socket.close();

            Clientes.remove(config.getJSONObject("cert").getString("OU"));

            console.log(console.ANSI_RED,"Error:" + ex.getLocalizedMessage());
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    private void onMesagge(String msg, JSONObject config) {
        try {
            JSONObject data = new JSONObject(msg);

            if(this.ping.onMesagge(data)) return;

            if(data.has("_sincrone_key")){
                String sinc_key = data.getString("_sincrone_key");
                SCSincroneSend.mapa.get(sinc_key).onMesagge(data);
            }

            switch (config.getJSONObject("cert").getString("OU")) {
                case "servicio":
                    ManejadorServicio.onMessage(data);
                    break;
                default:
                    ManejadorCliente.onMessage(data);
            }

        } catch (Exception e) {
            if (e.getMessage() != null) {
                console.log(console.ANSI_RED,"ERROR: SocketCliente: OnMensaje: " + e.getMessage());
            } else {
                this.Open = false;
                console.log(console.ANSI_RED,"Session cliente close");
                Start(config);
            }

        }
    }

    public boolean isOpen() {
        return Open;
    }

    public void send(String data) {
        // SocketCliete.StartServicio("usuario");
        //console.log(console.ANSI_BLUE,"Send -> "+config.getJSONObject("cert").getString("OU") +" ------------START-------------- \n"+ data.toString() +"\n-------------------------------------END------------");
        response.println(data);
        response.flush();
    }

    
    public static void send(String server, String data) {
        Clientes.get(server).response.println(data);
        Clientes.get(server).response.flush();
    }

    public static JSONObject sendSinc(String server, JSONObject data) {
        return new SCSincroneSend(Clientes.get(server)).send(data);
    }

    public static void send(String server, JSONObject data, SSSessionAbstract session) {
        System.out.println("send");
        if(Clientes.get(server)==null){
            StartServicio(server);
            return;
        }
        if(session!=null){
            data.put("router", session.getIdSession());
        }

        Clientes.get(server).response.println(data);
        Clientes.get(server).response.flush();

    }

}