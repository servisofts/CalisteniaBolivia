package ComponentClient;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.json.JSONObject;

import Component.Entrenamientos.Asistencia;
import Component.Sucursales.SucursalSincronizacion;
import Server.SSSAbstract.SSServerAbstract;
import Servisofts.SConsole;
import Servisofts.SPGConect;
import SocketCliente.SocketCliente;

public class Dispositivo {
    public static final String COMPONENT = "dispositivo";

    public static void onMessage(JSONObject obj) {

        System.out.println("dispositivo OnMessage: " + obj.toString());
        switch (obj.getString("type")) {
            case "getAll":
                getAll(obj);
                break;
            case "registro":
                registro(obj);
                break;
            case "sincronizarLog":
                sincronizarLog(obj);
                break;
            case "sincronizarMolinete":
                SSServerAbstract.sendAllServer(obj.toString());
                break;
        }
    }

    public static void getAll(JSONObject obj) {
        try {
            String consulta = "select get_all_dispositivo() as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);

            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static void registro(JSONObject obj) {
        try {
            obj.put("component", "usuario_huella");
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
        } catch (Exception e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static Date castTimeSecond(int timeSecond) throws Exception {
        int ano = (timeSecond / 32140800 + 2000);
        int mes = (timeSecond / 2678400 % 12 + 1);
        int dia = (timeSecond / 86400 % 31 + 1);
        int hora = (timeSecond / 3600 % 24);
        int minuto = (timeSecond / 60 % 60);
        int segundo = (timeSecond % 60);

        String sano = ano < 10 ? "0" + ano : ano + "";
        String smes = mes < 10 ? "0" + mes : mes + "";
        String sdia = dia < 10 ? "0" + dia : dia + "";
        String shora = hora < 10 ? "0" + hora : hora + "";
        String sminuto = minuto < 10 ? "0" + minuto : minuto + "";
        String ssegundo = segundo < 10 ? "0" + segundo : segundo + "";

        SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        return formato.parse(sano + "-" + smes + "-" + sdia + " " + shora + ":" + sminuto + ":" + ssegundo);
    }

    public static void sincronizarLog(JSONObject obj) {
        try {
            if (obj.getString("estado").equals("exito")) {

                String fecha_ultima_asistencia = SucursalSincronizacion
                        .getUltimaFechaAsistencia(obj.getString("key_sucursal"));
                obj.put("component", "dispositivo_historico");
                obj.put("type", "getAsistenciasPendientes");
                obj.put("fecha_min", fecha_ultima_asistencia);
                if (fecha_ultima_asistencia.length() == 0) {
                    fecha_ultima_asistencia = "2022-09-10 22:04:05";
                }

                DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
                String fecha_inicio_proceso = formatter.format(new Date());

                SConsole.log( "Sincronizando Logs key_sucursal=" + obj.getString("key_sucursal")
                        + " fecha_ultima_ssistencia=" + fecha_ultima_asistencia);

                obj.put("fecha_ultima_asistencia", fecha_ultima_asistencia);
                JSONObject asistencias_pendientes = SocketCliente.sendSinc("zkteco", obj);

                JSONObject asistencia;

                SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");

                int cantidad = 0;
                if (asistencias_pendientes.getString("estado").equals("exito")) {
                    asistencias_pendientes = asistencias_pendientes.getJSONObject("data");
                    if(!asistencias_pendientes.isEmpty()){
                        cantidad = JSONObject.getNames(asistencias_pendientes).length;
                        SConsole.succes("Asistencias pendientes" + cantidad);
                        for (int i = 0; i < JSONObject.getNames(asistencias_pendientes).length; i++) {
                            asistencia = asistencias_pendientes
                                    .getJSONObject(JSONObject.getNames(asistencias_pendientes)[i]);
                            asistencia.put("key_usuario", asistencia.getJSONObject("data").getString("key_usuario"));
                            asistencia.put("key_sucursal", obj.getString("key_sucursal"));
                            if (asistencia.getJSONObject("data").has("Time_second")) {
                                Date ts = castTimeSecond(asistencia.getJSONObject("data").getInt("Time_second"));
                                asistencia.put("fecha_asistencia", formato.format(ts));
                                Asistencia.registro(asistencia);
                            }

                        }
                    }
                }

                SucursalSincronizacion.registrar_exito(cantidad, obj.getString("key_sucursal"), fecha_inicio_proceso);
                SConsole.succes("Sincronizacion exitosa");
                obj.put("noSend", true);
                // Asistencia.registro(obj);
            }
        } catch (Exception e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
        obj.put("noSend", true);
    }

}