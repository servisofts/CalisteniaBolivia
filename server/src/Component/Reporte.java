package Component;

import org.json.JSONArray;
import org.json.JSONObject;
import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SConfig;
import Servisofts.SPGConect;

public class Reporte {
    public static final String COMPONENT = "reporte";

    // public static final String TABLE = "servicio";
    public Reporte(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getReporteGeneral":
                getReporteGeneral(data, session);
                break;
            case "getMovimientosBancarios":
                getMovimientosBancarios(data, session);
                break;
            case "getPaquetesVendidos":
                getPaquetesVendidos(data, session);
                break;
            case "getProrroga":
                getProrroga(data, session);
                break;
            case "getPaquetesVendidosAll":
                getPaquetesVendidosAll(data, session);
                break;
            case "getReporteAsistencia":
                getReporteAsistencia(data, session);
                break;
            case "getReporteIngresosEgresos":
                getReporteIngresosEgresos(data, session);
                break;
            case "execute_function":
                execute_function(data, session);
                break;
        }
        }

    public void getReporteGeneral(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            String consulta = "select get_reporte_general('" + data.getString("fecha_desde") + "', '"
                    + data.getString("fecha_hasta") + "') as json";
            if (data.has("key_sucursal")) {
                consulta = "select get_reporte_general('" + data.getString("fecha_desde") + "', '"
                        + data.getString("fecha_hasta") + "', '" + data.getString("key_sucursal") + "') as json";
            }
            JSONObject reporte = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", reporte);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
    }

    public void getMovimientosBancarios(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            String consulta = "select get_reporte_movimientos('" + data.getString("fecha_desde") + "', '"
                    + data.getString("fecha_hasta") + "', '" + obj.getString("key_usuario") + "') as json";
            if (obj.getBoolean("admin")) {
                consulta = "select get_reporte_movimientos('" + data.getString("fecha_desde") + "', '"
                        + data.getString("fecha_hasta") + "') as json";
            }

            JSONObject reporte = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", reporte);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
    }

    public void getPaquetesVendidos(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            String consulta = "select get_paquetes_vendidos('" + data.getString("fecha_desde") + "', '"
                    + data.getString("fecha_hasta") + "') as json";
            JSONObject reporte = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", reporte);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
    }

    public void getProrroga(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            String consulta = "select get_prorrogas('" + data.getString("fecha_desde") + "', '"
                    + data.getString("fecha_hasta") + "') as json";
            JSONObject reporte = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", reporte);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
    }
//miralo
    public void getPaquetesVendidosAll(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            String consulta = "select get_paquetes_vendidos_all('" + data.getString("fecha_desde") + "', '"
                    + data.getString("fecha_hasta") + "') as json";
            JSONObject reporte = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", reporte);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
    }

    public void getReporteAsistencia(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            String consulta = "select get_reporte_asistencia('" + data.getString("fecha_desde") + "', '"
                    + data.getString("fecha_hasta") + "') as json";
            JSONObject reporte = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", reporte);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
    }

    public void getReporteIngresosEgresos(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            String consulta = "select get_reporte_ingresos_egresos('" + data.getString("fecha_desde") + "', '"
                    + data.getString("fecha_hasta") + "') as json";
            JSONObject reporte = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", reporte);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
    }

    public void execute_function(JSONObject obj, SSSessionAbstract session) {
        try {

            if(obj.has("service") && !obj.getString("service").equals(SConfig.getJSON().getString("nombre"))) return;
            
            if (!obj.has("func"))
                throw new Exception("[func] Parameter not found.");
            if (obj.isNull("func"))
                throw new Exception("[func] Parameter required.");

            String params = "";
            if (obj.has("params") && !obj.isNull("params")) {
                JSONArray arr = obj.getJSONArray("params");
                for (int i = 0; i < arr.length(); i++) {
                    params += arr.get(i).toString();
                    if (i + 1 < arr.length()) {
                        params += ",";
                    }
                }
                System.out.println(params);
            }
            String func = obj.getString("func");
            obj.put("data", SPGConect.ejecutarConsultaArray("select " + func + "(" + params + ") as json"));
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
    }
}
