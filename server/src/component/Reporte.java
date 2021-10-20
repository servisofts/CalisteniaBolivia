package component;

import org.json.JSONObject;
import Server.SSSAbstract.SSSessionAbstract;
import SocketCliente.SocketCliete;
import conexion.Conexion;

public class Reporte {
    public Reporte(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getMovimientosBancarios":
                getMovimientosBancarios(data, session);
            break;
            case "getPaquetesVendidos":
                getPaquetesVendidos(data, session);
            break;
            case "getReporteAsistencia":
                getReporteAsistencia(data, session);
            break;
            default:
                defaultType(data, session);
        }
    }

    public void defaultType(JSONObject obj, SSSessionAbstract session) {
        SocketCliete.send("usuario", obj, session);
    }

    public void getMovimientosBancarios(JSONObject obj, SSSessionAbstract session) {
        try{
            JSONObject data = obj.getJSONObject("data");
            String consulta =  "select get_reporte_movimientos('"+data.getString("fecha_desde")+"', '"+data.getString("fecha_hasta")+"') as json";
            JSONObject reporte = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", reporte);
            obj.put("estado", "exito");
        }catch(Exception e){
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
    }

    public void getPaquetesVendidos(JSONObject obj, SSSessionAbstract session) {
        try{
            JSONObject data = obj.getJSONObject("data");
            String consulta =  "select get_paquetes_vendidos('"+data.getString("fecha_desde")+"', '"+data.getString("fecha_hasta")+"') as json";
            JSONObject reporte = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", reporte);
            obj.put("estado", "exito");
        }catch(Exception e){
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
    }

    public void getReporteAsistencia(JSONObject obj, SSSessionAbstract session) {
        try{
            JSONObject data = obj.getJSONObject("data");
             String consulta =  "select get_reporte_asistencia('"+data.getString("fecha_desde")+"', '"+data.getString("fecha_hasta")+"') as json";
            JSONObject reporte = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", reporte);
            obj.put("estado", "exito");
        }catch(Exception e){
            obj.put("error", e.getLocalizedMessage());
            obj.put("estado", "error");
        }
    }
}
