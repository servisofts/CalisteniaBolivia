package Component.Clientes;

import java.io.File;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import org.json.JSONArray;
import org.json.JSONObject;

import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SConfig;
import Servisofts.SPGConect;

public class ClientesActivos {

    public static final String COMPONENT = "clientesActivos";
    public static final String TABLE = "cliente_activos";

    public ClientesActivos(JSONObject data, SSSessionAbstract session) {
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
        }
    }

    public static JSONObject getbyKeyUsuario(String key_usuario) {
        try {
            String consulta = "select get_all_cliente_activo('" + key_usuario + "') as json";
            return SPGConect.ejecutarConsultaObject(consulta);
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static JSONObject getbyKeySucursal(String key_sucursal) {
        try {
            String consulta = "select get_all_clientes_activos('" + key_sucursal + "') as json";
            return SPGConect.ejecutarConsultaObject(consulta);
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
    public static JSONObject getbyKeySucursalKeys(String key_sucursal) {
        try {
            String consulta = "select get_all_clientes_activos_zkteco('" + key_sucursal + "') as json";
            return SPGConect.ejecutarConsultaObject(consulta);
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_all_clientes_activos() as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static JSONObject getAll() {
        try {
            String consulta = "select get_all_clientes_activos() as json";
            return SPGConect.ejecutarConsultaObject(consulta);
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_by_key('cliente','" + obj.getString("key") + "') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);

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
            JSONObject cliente = obj.getJSONObject("data");
            cliente.put("key", UUID.randomUUID().toString());
            cliente.put("fecha_on", fecha_on);
            cliente.put("estado", "1");
            SPGConect.insertArray("cliente", new JSONArray().put(cliente));

            JSONArray cliente_servicios = new JSONArray();
            JSONObject cliente_servicio;
            for (int i = 0; i < obj.getJSONArray("servicios").length(); i++) {
                cliente_servicio = new JSONObject();
                cliente_servicio.put("key", UUID.randomUUID().toString());
                cliente_servicio.put("key_cliente", cliente.getString("key"));
                cliente_servicio.put("key_servicio", obj.getJSONArray("servicios").getString(i));
                cliente_servicio.put("estado", 1);
                cliente_servicios.put(cliente_servicio);
            }
            SPGConect.insertArray("cliente_servicio", cliente_servicios);

            obj.put("data", cliente);
            obj.put("estado", "exito");

            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }

    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject cliente = obj.getJSONObject("data");
            SPGConect.editObject("cliente", cliente);
            obj.put("data", cliente);
            obj.put("estado", "exito");
            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void subirFoto(JSONObject obj, SSSessionAbstract session) {
        String url = SConfig.getJSON().getJSONObject("files").getString("url");
        File f = new File(url + "cliente/");
        if (!f.exists())
            f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath() + "/" + obj.getString("key")));
        obj.put("estado", "exito");
        SSServerAbstract.sendAllServer(obj.toString());
    }
}