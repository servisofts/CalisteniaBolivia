package Component.Bancos;

import java.io.File;
import java.text.DateFormat;
import Server.SSSAbstract.SSServerAbstract;
import org.json.JSONArray;
import java.util.UUID;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.sql.SQLException;
import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SConfig;
import Servisofts.SPGConect;

import org.json.JSONObject;

public class Billetera
{
    public static final String COMPONENT = "billetera";

    public Billetera(final JSONObject data, final SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "anular": {
                this.anular(data, session);
                return;
            }
            case "editar": {
                this.editar(data, session);
                return;
            }
            case "getAll": {
                this.getAll(data, session);
                return;
            }
            case "getByCodigo": {
                this.getByCodigo(data, session);
                return;
            }
            case "registro": {
                this.registro(data, session);
                return;
            }
            case "subirFoto": {
                this.subirFoto(data, session);
                return;
            }
            case "getByKey": {
                this.getByKey(data, session);
                return;
            }
            default:
                break;
        }
    }
    
    public void getAll(final JSONObject obj, final SSSessionAbstract session) {
        try {
            final String consulta = "select get_all('billetera', 'key_cuenta_banco', '" + obj.getString("key_cuenta_banco") + "') as json";
            final JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", (Object)data);
            obj.put("estado", (Object)"exito");
        }
        catch (SQLException e) {
            obj.put("estado", (Object)"error");
            e.printStackTrace();
        }
    }
    
    public void getByKey(final JSONObject obj, final SSSessionAbstract session) {
        try {
            final String consulta = "select get_by_key('billetera', '" + obj.getString("key") + "') as json";
            final JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", (Object)data);
            obj.put("estado", (Object)"exito");
        }
        catch (SQLException e) {
            obj.put("estado", (Object)"error");
            e.printStackTrace();
        }
    }
    
    public void getByCodigo(final JSONObject obj, final SSSessionAbstract session) {
        try {
            final String consulta = "select billetera_get_by_codigo('" + obj.getString("codigo") + "') as json";
            final JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", (Object)data);
            obj.put("estado", (Object)"exito");
        }
        catch (SQLException e) {
            obj.put("estado", (Object)"error");
            e.printStackTrace();
        }
    }
    
    public static JSONObject getByCodigo(final String codigo) {
        try {
            final String consulta = "select billetera_get_by_codigo('" + codigo + "') as json";
            return SPGConect.ejecutarConsultaObject(consulta);
        }
        catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    public void registro(final JSONObject obj, final SSSessionAbstract session) {
        try {
            final DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            final String fecha_on = formatter.format(new Date());
            final JSONObject billetera = obj.getJSONObject("data");
            billetera.put("key", (Object)UUID.randomUUID().toString());
            billetera.put("fecha_on", (Object)fecha_on);
            billetera.put("estado", 1);
            billetera.put("estado_entrega", (Object)"pendiente");
            SPGConect.insertArray("billetera", new JSONArray().put((Object)billetera));
            obj.put("data", (Object)billetera);
            obj.put("estado", (Object)"exito");
            SSServerAbstract.sendAllServer(obj.toString());
        }
        catch (SQLException e) {
            obj.put("estado", (Object)"error");
            e.printStackTrace();
        }
    }
    
    public void editar(final JSONObject obj, final SSSessionAbstract session) {
        try {
            final JSONObject billetera = obj.getJSONObject("data");
            SPGConect.editObject("billetera", billetera);
            obj.put("data", (Object)billetera);
            obj.put("estado", (Object)"exito");
            SSServerAbstract.sendAllServer(obj.toString());
        }
        catch (SQLException e) {
            obj.put("estado", (Object)"error");
            obj.put("error", (Object)e.getLocalizedMessage());
            e.printStackTrace();
        }
    }
    
    public void anular(final JSONObject obj, final SSSessionAbstract session) {
        try {
            SPGConect.editObject("billetera", obj);
            obj.put("estado", (Object)"exito");
            SSServerAbstract.sendAllServer(obj.toString());
        }
        catch (SQLException e) {
            obj.put("estado", (Object)"error");
            obj.put("error", (Object)e.getLocalizedMessage());
            e.printStackTrace();
        }
    }
    
    public void subirFoto(final JSONObject obj, final SSSessionAbstract session) {
        final String url = SConfig.getJSON().getJSONObject("files").getString("url");
        final File f = new File(String.valueOf(url) + "billetera/");
        if (!f.exists()) {
            f.mkdirs();
        }
        obj.put("dir", (Object)(String.valueOf(f.getPath()) + "/" + obj.getString("key")));
        obj.put("estado", (Object)"exito");
        SSServerAbstract.sendAllServer(obj.toString());
    }
}