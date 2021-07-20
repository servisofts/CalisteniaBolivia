package component;

import java.io.File;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import conexion.*;
import SocketCliente.SocketCliete;
import org.json.JSONArray;
import org.json.JSONObject;

import Config.Config;
import Email.Email;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;

public class PaqueteUsuario {

    public PaqueteUsuario(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, session);
            break;
            case "getByKey":
                getByKey(data, session);
                break;
            case "registro":
                registro(data, session);
            break;
            case "editar":
                editar(data, session);
            break;
            case "subirFoto":
                subirFoto(data, session);
            break;
            default:
                defaultType(data, session);
        }
    }

    public void defaultType(JSONObject obj, SSSessionAbstract session) {
        SocketCliete.send("usuario", obj, session);
    }

    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_all('paquete_usuario','key_usuario','"+obj.getString("key_usuario")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_by_key('paquete_usuario','"+obj.getString("key")+"') as json";
            JSONObject data = Conexion.ejecutarConsultaObject(consulta);
            Conexion.historico(obj.getString("key_usuario"), "paquete_usuario_getByKey", data);

            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());
            JSONObject paquete_usuario = obj.getJSONObject("data");
            paquete_usuario.put("key",UUID.randomUUID().toString());
            paquete_usuario.put("fecha_on",fecha_on);
            paquete_usuario.put("estado",1);
            Conexion.insertArray("paquete_usuario", new JSONArray().put(paquete_usuario));
            Conexion.historico(obj.getString("key_usuario"), paquete_usuario.getString("key"), "paquete_usuario_registro", paquete_usuario);
            obj.put("data", paquete_usuario);
            obj.put("estado", "exito");


            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());

            JSONObject cliente = obj.getJSONObject("cliente");

            JSONObject mail = new JSONObject();
            mail.put("__MAIL__",cliente.getString("Correo"));
            mail.put("__FECHA__",paquete_usuario.getString("fecha_inicio"));
            mail.put("__ID_PEDIDO__",paquete_usuario.getString("key"));
            mail.put("__CI__",cliente.getString("CI"));
            mail.put("__PAQUETE__",paquete_usuario.getString("nombre_paquete"));
            mail.put("__RENOVACION__",paquete_usuario.getString("fecha_fin"));
            mail.put("__MONTO__",paquete_usuario.get("monto").toString());
            mail.put("__KEY_USUARIO_CLIENTE__",paquete_usuario.getString("key_usuario")+"?fecha="+new Date().toString());
            mail.put("__KEY_PAQUETE__",paquete_usuario.getString("key_paquete")+"?fecha="+new Date().toString());

            new Email(Email.TIPO_RECIBO, mail);



        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }

    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject paquete_usuario = obj.getJSONObject("data");
            Conexion.editObject("paquete_usuario", paquete_usuario);
            Conexion.historico(obj.getString("key_usuario"), paquete_usuario.getString("key"), "paquete_usuario_editar", paquete_usuario);
            obj.put("data", paquete_usuario);
            obj.put("estado", "exito");
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void subirFoto(JSONObject obj, SSSessionAbstract session) {
        String url = Config.getJSON().getJSONObject("files").getString("url");
        File f = new File(url+"paquete_usuario/");
        Conexion.historico(obj.getString("key_usuario"), obj.getString("key"), "paquete_usuario_subirFoto", new JSONObject());
        if(!f.exists()) f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath()+"/"+obj.getString("key")));
        obj.put("estado", "exito");
        SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
        SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
    }
}