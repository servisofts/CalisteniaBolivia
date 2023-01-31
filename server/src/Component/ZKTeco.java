package Component;

import org.json.JSONArray;
import org.json.JSONObject;

import Component.Clientes.ClientesActivos;
import ComponentClient.Dispositivo;
import SocketCliente.SocketCliente;

/**
 * ZKTeco
 */
public class ZKTeco {

    public static final String COMPONENT = "zkteco";
    
    public ZKTeco(JSONObject obj) {
        
        if (!obj.isNull("type")) {
            switch (obj.getString("type")) {
                case "init":
                    init(obj);
                    break;
                case "sincronizarMolinete":
                    sincronizarMolinete(obj);
                    break;
                case "sincronizarAll":
                    sincronizarAll(obj);
                    break;
                case "sincronizarUsuario":
                    sincronizarUsuario(obj);
                    break;
                case "sincronizarLog":
                    sincronizarLog(obj);
                    break;
                case "asistencia":
                    asistencia(obj);
                    break;
                case "onEvent":
                    onEvent(obj);
                    break;
            }
        }
    }

    public static void asistencia(JSONObject obj){
        try{
            
            obj.put("estado", "exito");
            


        }catch(Exception e){
            e.printStackTrace();
        }
    }

    
    public static void onEvent(JSONObject obj){
        try{
            System.out.println("Evento...");
            System.out.println(obj.toString());

            
            /*
                23/07/2022 Ruddy Paz
                Antes hacía la asistencia


            if(obj.getJSONObject("data").has("key_usuario")){
                obj.put("key_usuario", obj.getJSONObject("data").getString("key_usuario"));
                obj.put("key_sucursal", obj.getString("key_sucursal"));
                JSONObject asistencia = Asistencia.registro(obj);
                obj.put("component", "asistencia");
                obj.put("type", "registro");
                obj.put("data", asistencia);
                obj.put("estado", "exito");

                SSServerAbstract.sendAllServer(obj.toString());
            }*/



        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public static void sincronizarLog(JSONObject obj){
        obj.put("estado", "exito");
        Dispositivo.sincronizarLog(obj);
    }
    public static boolean sincronizarUsuario(JSONObject obj){
        try{
            System.out.println("Sincronizando...");
            
            JSONObject cliente_activo = ClientesActivos.getbyKeyUsuario(obj.getJSONObject("data").getString("key_usuario"));
            String [] keys = JSONObject.getNames(cliente_activo);

            JSONObject send = new JSONObject();
            send.put("component", "permiso");
            send.put("type", "getAllUsuarios");
            send.put("estado", "cargando");
            send.put("key_permiso", "4f30c543-10d8-4566-b577-4d94442f217d");

            JSONArray lista = new JSONArray();
            if(keys!=null){
                lista.put(keys[0]);
            }
            

            JSONObject roles_permisos = SocketCliente.sendSinc("roles_permisos", send);

            if(roles_permisos.getJSONObject("data").has(obj.getJSONObject("data").getString("key_usuario"))){
                if(lista.toString().indexOf(obj.getJSONObject("data").getString("key_usuario")) == -1 ){
                    lista.put(obj.getJSONObject("data").getString("key_usuario"));
                }
            }            

            JSONObject objSend = new JSONObject();
            objSend.put("component", "punto_venta");
            objSend.put("type", obj.getString("type"));
            objSend.put("data", lista);
            objSend.put("estado", "cargando");
            objSend.put("key_usuario", obj.getString("key_usuario"));
            objSend.put("delete_all", false);
            SocketCliente.send("zkteco", objSend.toString());

        }catch(Exception e){
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
        }
        return false;
    }
    
    public static boolean sincronizarAll_(JSONObject obj){
        try{
            System.out.println("Sincronizando...");
            
            JSONObject clientes_activos = ClientesActivos.getAll();
            String keys1[] = JSONObject.getNames(clientes_activos);


            JSONObject send = new JSONObject();
            send.put("component", "permiso");
            send.put("type", "getAllUsuarios");
            send.put("estado", "cargando");
            send.put("key_permiso", "4f30c543-10d8-4566-b577-4d94442f217d");

            JSONObject roles_permisos = SocketCliente.sendSinc("roles_permisos", send);
            String keys2[] = JSONObject.getNames(roles_permisos.getJSONObject("data"));
            
            String keyss1 = String.join(",", keys1);
            String keyss2 = String.join(",", keys2);

            JSONArray keyss = new JSONArray("["+keyss1+","+keyss2+"]");

            obj.put("component", "punto_venta");
            obj.put("data", keyss);
            obj.put("estado", "cargando");
            obj.put("delete_all", true);
            SocketCliente.send("zkteco", obj.toString());
            
            obj.put("noSend", true);
        }catch(Exception e){
            e.printStackTrace();
        }
        return false;
    }

    public static boolean sincronizarMolinete(JSONObject obj){
        try{
            System.out.println("Sincronizando...");
            JSONObject clientes_activos = ClientesActivos.getbyKeySucursalKeys(obj.getString("key_sucursal"));
            

            String keys1[] = JSONObject.getNames(clientes_activos);
            String merge = "";

            String keyss1 = "";
            if(keys1!=null){
                keyss1 = String.join(",", keys1);
                merge += keyss1+",";
            }
            

            JSONObject send = new JSONObject();
            send.put("component", "permiso");
            send.put("type", "getAllUsuarios");
            send.put("estado", "cargando");
            send.put("key_permiso", "4f30c543-10d8-4566-b577-4d94442f217d");

            JSONObject roles_permisos = SocketCliente.sendSinc("roles_permisos", send);
            String keys2[] = JSONObject.getNames(roles_permisos.getJSONObject("data"));
            
            String keyss2 = "";
            if(keys2!=null){
                keyss2 = String.join(",", keys2);    
                merge += keyss2;
            }
            
            JSONArray keyss = new JSONArray("["+merge+"]");

            obj.put("component", "dispositivo");
            obj.put("data", keyss);
            obj.put("estado", "cargando");
            obj.put("delete_all", true);

            JSONObject respuesta = SocketCliente.sendSinc("zkteco", obj, 3000000);

            obj.put("estado", respuesta.getString("estado"));
            if(respuesta.getString("estado").equals("error")){
                if(respuesta.has("error")){
                    obj.put("error", respuesta.getString("error"));
                }
            }
            
            obj.put("noSend", false);
        }catch(Exception e){
            e.printStackTrace();
        }
        return false;
    }
    public static boolean sincronizarAll(JSONObject obj){
        try{
            System.out.println("Sincronizando...");

            
            JSONObject send = new JSONObject();
            send.put("component", "permiso");
            send.put("type", "getAllUsuarios");
            send.put("estado", "cargando");
            send.put("key_permiso", "4f30c543-10d8-4566-b577-4d94442f217d");

            JSONObject roles_permisos = SocketCliente.sendSinc("roles_permisos", send);
            String keys2[] = JSONObject.getNames(roles_permisos.getJSONObject("data"));

            send.put("component", "dispositivo");
            send.put("type", "getAll");
            send.put("estado", "cargando");
            JSONObject dispositivos = SocketCliente.sendSinc("zkteco", send).getJSONObject("data");

            send.put("component", "punto_venta");
            send.put("type", "getAll");
            send.put("estado", "cargando");
            JSONObject puntosVenta = SocketCliente.sendSinc("zkteco", send).getJSONObject("data");


            JSONArray keyss;
            String[] keys1;
            String merge, keyss1, keyss2;

            JSONObject dispositivo, clientes_activos, respuesta, puntoVenta;
            
            for (String key : JSONObject.getNames(dispositivos)) {

                send.put("component", "dispositivo");
                send.put("type", "testConnection");
                send.put("key_dispositivo", key);
                send.put("estado", "cargando");
                if(!SocketCliente.sendSinc("zkteco", send, 5000).getString("estado").equals("exito")){
                    continue;
                }

                dispositivo = dispositivos.getJSONObject(key);
                puntoVenta = puntosVenta.getJSONObject(dispositivo.getString("key_punto_venta"));

                clientes_activos = ClientesActivos.getbyKeySucursalKeys(puntoVenta.getString("key_sucursal"));
                keys1 = JSONObject.getNames(clientes_activos);
                merge = "";

                keyss1 = "";
                if(keys1!=null){
                    keyss1 = String.join(",", keys1);
                    merge += keyss1+",";
                }
                
                keyss2 = "";
                if(keys2!=null){
                    keyss2 = String.join(",", keys2);    
                    merge += keyss2;
                }
                
                keyss = new JSONArray("["+merge+"]");

                obj.put("component", "dispositivo");
                obj.put("type", "sincronizarMolinete");
                obj.put("key_dispositivo", key);
                obj.put("data", keyss);
                obj.put("estado", "cargando");
                obj.put("delete_all", true);

                respuesta = SocketCliente.sendSinc("zkteco", obj, 3000000);

                obj.put("estado", respuesta.getString("estado"));
                if(respuesta.getString("estado").equals("error")){
                    if(respuesta.has("error")){
                        obj.put("error", respuesta.getString("error"));
                    }
                }
            }
            
            obj.put("noSend", false);
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
        SocketCliente.send("zkteco", obj.toString());

        return false;
    }
    
}