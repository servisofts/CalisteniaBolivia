package Component.Cajas;

import java.io.File;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import org.json.JSONArray;
import org.json.JSONObject;

import com.google.zxing.Result;
import com.mysql.cj.protocol.Resultset;

import Component.Sucursales.Sucursal;
import Component.Sucursales.SucursalTipoPagoCuentaBanco;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SConfig;
import Servisofts.SPGConect;
import Servisofts.SUtil;

public class Caja {

    public static final String COMPONENT = "caja";

    public Caja(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, session);
            break;
            case "getByKey":
                getByKey(data, session);
                break;
            case "getActiva":
                getActiva(data, session);
                break;
            case "getByFecha":
                getByFecha(data, session);
                break;
            case "getActivas":
                getActivas(data, session);
                break;
            case "registro":
                registro(data, session);
            break;
            case "cierre":
                cierre(data, session);
            break;
            case "reparar":
                reparar(data, session);
            break;
            case "editar":
                editar(data, session);
            break;
            case "subirFoto":
                subirFoto(data, session);
            break;
        }
    }

    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_all('caja') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }
    
    public void getActiva(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select caja_get_activa('"+obj.getString("key_usuario")+"') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);

            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void getByFecha(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_by_fecha('caja','key','"+obj.getString("fecha_inicio")+"','"+obj.getString("fecha_fin")+"') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void getActivas(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select caja_get_activas() as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);

            obj.put("data", data);  
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static JSONObject getActiva(String key_usuario) {
        try {
            String consulta =  "select caja_get_activa('"+key_usuario+"') as json";
            return SPGConect.ejecutarConsultaObject(consulta);
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_by_key('caja','"+obj.getString("key")+"') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);

            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static JSONObject getByKey(String key) {
        try {
            String consulta =  "select get_by_key('caja','"+key+"') as json";
            return SPGConect.ejecutarConsultaObject(consulta);

        } catch (SQLException e) {
            e.printStackTrace();
            return new JSONObject();
        }
    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());
            JSONObject caja = obj.getJSONObject("data");
            caja.put("key",UUID.randomUUID().toString());
            caja.put("fecha_on",fecha_on);
            caja.put("estado",1);
            

            JSONArray montos_caja = Sucursal.getMontoCajaArray(caja.getString("key_sucursal"));
            double monto=0;
            for (int i = 0; i < montos_caja.length(); i++) {
                monto += montos_caja.getJSONObject(i).getDouble("monto");
            }
            
            if(monto != caja.getDouble("monto")){
                obj.put("data", caja);
                obj.put("estado", "error");
                obj.put("error", "Montos de caja inconsistente, hable con su poroveedor de sistemas.");
                SSServerAbstract.sendAllServer(obj.toString());
                return;
            }    

            JSONArray cajas_movimiento = new JSONArray();
            
            JSONObject monto_caja;
            for (int i = 0; i < montos_caja.length(); i++) {
                monto_caja = montos_caja.getJSONObject(i);

                JSONObject caja_movimiento = new JSONObject();
                caja_movimiento.put("key", UUID.randomUUID().toString());
                caja_movimiento.put("key_caja", monto_caja.getString("key"));
                caja_movimiento.put("key_caja_tipo_movimiento", 5);
                caja_movimiento.put("key_tipo_pago", "1");
                caja_movimiento.put("descripcion", "Transferencia por apertura");
                caja_movimiento.put("monto", monto_caja.getDouble("monto")*-1);
                caja_movimiento.put("data", new JSONObject().put("key_tipo_pago", caja_movimiento.getString("key_tipo_pago")));
                caja_movimiento.put("fecha_on", fecha_on);
                caja_movimiento.put("estado", 1);

                cajas_movimiento.put(caja_movimiento);
            }
            
            SPGConect.insertArray("caja_movimiento", cajas_movimiento);

            SPGConect.insertArray("caja", new JSONArray().put(caja));


            JSONObject caja_movimiento = new JSONObject();
            caja_movimiento.put("key", UUID.randomUUID().toString());
            caja_movimiento.put("key_caja", caja.getString("key"));
            caja_movimiento.put("key_tipo_pago", "1");
            caja_movimiento.put("key_caja_tipo_movimiento", 1);
            caja_movimiento.put("descripcion", "apertura");
            caja_movimiento.put("monto", caja.getDouble("monto"));
            caja_movimiento.put("data", new JSONObject().put("key_tipo_pago", caja_movimiento.getString("key_tipo_pago")));
            caja_movimiento.put("fecha_on", fecha_on);
            caja_movimiento.put("estado", 1);
            SPGConect.insertArray("caja_movimiento", new JSONArray().put(caja_movimiento));

            JSONObject sinc = new JSONObject();
            sinc.put("type", "sincronizarAll");
            sinc.put("key_usuario", obj.getString("key_usuario"));

            obj.put("data", caja);
            obj.put("estado", "exito");

            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }


    public static JSONObject addTraspasoBanco(String key_caja, String key_usuario, String key_tipo_pago, double monto, String fecha_on, JSONObject data) throws SQLException{
        JSONObject caja_movimiento = new JSONObject();
        caja_movimiento.put("key", UUID.randomUUID().toString());
        caja_movimiento.put("key_caja", key_caja);
        caja_movimiento.put("key_caja_tipo_movimiento", 3);
        caja_movimiento.put("key_tipo_pago", key_tipo_pago);
        caja_movimiento.put("descripcion", "Traspaso a bancos");
        caja_movimiento.put("monto", monto);
        data.put("key_tipo_baco", key_tipo_pago);
        caja_movimiento.put("data", data);
        caja_movimiento.put("fecha_on", fecha_on);
        caja_movimiento.put("estado", 1);
        SPGConect.insertArray("caja_movimiento", new JSONArray().put(caja_movimiento));
        
        return caja_movimiento;
    }

    public static JSONObject addVentaServicio(String key_caja, String key_usuario, String key_tipo_pago, double monto, String fecha_on, JSONObject data) throws SQLException{
        JSONObject caja_movimiento = new JSONObject();
        caja_movimiento.put("key", UUID.randomUUID().toString());
        caja_movimiento.put("key_caja", key_caja);
        caja_movimiento.put("key_caja_tipo_movimiento", 3);
        caja_movimiento.put("key_tipo_pago", key_tipo_pago);
        caja_movimiento.put("descripcion", "Venta de servicio");
        caja_movimiento.put("monto", monto);
        caja_movimiento.put("data", data);
        caja_movimiento.put("fecha_on", fecha_on);
        caja_movimiento.put("estado", 1);
        SPGConect.insertArray("caja_movimiento", new JSONArray().put(caja_movimiento));
        
        return caja_movimiento;
    }

    public static JSONObject addAnulacionServicio(String key_caja, String key_usuario, String key_tipo_pago, double monto, String fecha_on, JSONObject data) throws SQLException{
        JSONObject caja_movimiento = new JSONObject();
        caja_movimiento.put("key", UUID.randomUUID().toString());
        caja_movimiento.put("key_caja", key_caja);
        caja_movimiento.put("key_caja_tipo_movimiento", 6);
        caja_movimiento.put("key_tipo_pago", key_tipo_pago);
        caja_movimiento.put("descripcion", "Cancelacion de servicio");
        caja_movimiento.put("monto", monto*-1);
        caja_movimiento.put("data", data);
        caja_movimiento.put("fecha_on", fecha_on);
        caja_movimiento.put("estado", 1);
        SPGConect.insertArray("caja_movimiento", new JSONArray().put(caja_movimiento));
        
        return caja_movimiento;
    }

    public void cierre(JSONObject obj, SSSessionAbstract session) {
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());
            JSONObject caja = obj.getJSONObject("data");
            caja.put("key",caja.getString("key_caja"));
            caja.put("fecha_off", fecha_on);
            SPGConect.editObject("caja", caja);

            caja = Caja.getByKey(caja.getString("key")).getJSONObject(caja.getString("key"));

            JSONObject totales_caja = CajaMovimiento.getTotales(caja.getString("key"));

            JSONObject cajaTipoPagoCuentaBanco = SucursalTipoPagoCuentaBanco.getByKeySucursal(caja.getString("key_sucursal"));
            
            JSONObject pago;
            double monto;
            JSONObject caja_movimiento;
            JSONObject data = new JSONObject();
            for (int i = 0; i < JSONObject.getNames(totales_caja).length; i++) {
                pago = totales_caja.getJSONObject(JSONObject.getNames(totales_caja)[i]);
                if(pago.getString("key").equals("1") || pago.getString("key").equals("4")){
                    monto = pago.getDouble("monto");
                    if(pago.getString("key").equals("1")){
                        monto = monto<obj.getJSONObject("data").getDouble("monto_salvar")?monto:monto-obj.getJSONObject("data").getDouble("monto_salvar");
                    }

                    caja_movimiento = new JSONObject(); 
                    caja_movimiento.put("key", UUID.randomUUID().toString());
                    caja_movimiento.put("key_caja", caja.getString("key"));
                    caja_movimiento.put("key_tipo_pago", pago.getString("key"));
                    caja_movimiento.put("key_caja_tipo_movimiento", 2);
                    caja_movimiento.put("descripcion", "Transferencia por cierre");
                    caja_movimiento.put("monto", monto*-1);
                    data.put("key_cuenta_banco", cajaTipoPagoCuentaBanco.getJSONObject(JSONObject.getNames(totales_caja)[i]).getString("key_cuenta_banco"));
                    data.put("key_tipo_pago", cajaTipoPagoCuentaBanco.getJSONObject(JSONObject.getNames(totales_caja)[i]).getString("key_tipo_pago"));
                    caja_movimiento.put("data", data);
                    caja_movimiento.put("fecha_on", fecha_on);
                    caja_movimiento.put("estado", 1);
                    SPGConect.insertArray("caja_movimiento", new JSONArray().put(caja_movimiento));

                    JSONObject cuentaBancoMovimiento = new JSONObject();
                    cuentaBancoMovimiento.put("key", UUID.randomUUID().toString());
                    cuentaBancoMovimiento.put("descripcion", "Ingreso por cierre de caja");
                    cuentaBancoMovimiento.put("key_cuenta_banco", cajaTipoPagoCuentaBanco.getJSONObject(JSONObject.getNames(totales_caja)[i]).getString("key_cuenta_banco"));
                    cuentaBancoMovimiento.put("key_usuario", obj.getString("key_usuario"));
                    cuentaBancoMovimiento.put("monto", monto);
                    cuentaBancoMovimiento.put("data", new JSONObject().put("key_caja_movimiento", caja_movimiento.getString("key")));
                    cuentaBancoMovimiento.put("fecha_on", fecha_on);
                    cuentaBancoMovimiento.put("estado", 1); 
                    cuentaBancoMovimiento.put("key_sucursal", caja.getString("key_sucursal"));
                    cuentaBancoMovimiento.put("key_tipo_gasto", "1");
                    cuentaBancoMovimiento.put("tipo_movimiento", "ingreso");
                    cuentaBancoMovimiento.put("key_tipo_pago", pago.getString("key"));

                    SPGConect.insertArray("cuenta_banco_movimiento", new JSONArray().put(cuentaBancoMovimiento));
        
                    JSONObject sendcuentaBancoMovimiento = new JSONObject();
                    sendcuentaBancoMovimiento.put("component", "cuentaBancoMovimiento");
                    sendcuentaBancoMovimiento.put("type", "registro");
                    sendcuentaBancoMovimiento.put("data", cuentaBancoMovimiento);
                    sendcuentaBancoMovimiento.put("estado", "exito");
                    SSServerAbstract.sendAllServer(sendcuentaBancoMovimiento.toString());
                    
                }
            }

            obj.put("data", caja);
            obj.put("estado", "exito");

            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject caja = obj.getJSONObject("data");
            SPGConect.editObject("caja", caja);
            obj.put("data", caja);
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
        String url = SConfig.getJSON().getJSONObject("files").getString("url");
        File f = new File(url+"caja/");
        if(!f.exists()) f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath()+"/"+obj.getString("key")));
        obj.put("estado", "exito");
        SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
        SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET, obj.toString());
    }

    public void reparar(JSONObject obj, SSSessionAbstract session) {
        try {

            String consulta = "select sum(caja_movimiento.monto) as diferencia\n"+
            "from caja,\n"+
            "caja_movimiento\n"+
            "where caja.key = '"+obj.getString("key_caja")+"'\n"+
            "and caja_movimiento.key_caja = caja.key\n"+
            "and caja_movimiento.key_tipo_pago in ('2','3')";

            PreparedStatement ps = SPGConect.preparedStatement(consulta);
            ResultSet rs = ps.executeQuery();
            double diferencia=0;
            if(rs.next()){
                diferencia = rs.getDouble("diferencia");
            }

            rs.close();
            ps.close();
            
            if(diferencia>0){

                JSONObject caja = Caja.getByKey(obj.getString("key_caja"));
                caja = caja.getJSONObject(JSONObject.getNames(caja)[0]);

                consulta = "select jsonb_object_agg(caja_movimiento.key, to_json(caja_movimiento.*))::json as json \n"+
                            "from caja,\n"+
                            "caja_movimiento\n"+
                            "where caja.key = '"+caja.getString("key")+"'\n"+
                            "and caja_movimiento.key_caja = caja.key\n"+
                            "and caja_movimiento.key_tipo_pago in ('2','3')";


                JSONObject movimientos = SPGConect.ejecutarConsultaObject(consulta);
                JSONObject positivo, negativo, banco_movimiento, cuenta_banco;
                for (int i = 0; i < JSONObject.getNames(movimientos).length; i++) {
                    if(movimientos.getJSONObject(JSONObject.getNames(movimientos)[i]).getDouble("monto")>0){
                        positivo = movimientos.getJSONObject(JSONObject.getNames(movimientos)[i]);
                        negativo = this.buscarNegativo(movimientos, positivo.getJSONObject("data").getString("key_paquete_venta_usuario"));
                        if(negativo==null){
                            System.out.println("error encontrado");
                            banco_movimiento = this.buscarmovimientoBanco(positivo.getString("key"));

                            
                            if(banco_movimiento.isEmpty()){
                                
                                cuenta_banco = SucursalTipoPagoCuentaBanco.getByKeySucursal(caja.getString("key_sucursal"));

                                cuenta_banco = cuenta_banco.getJSONObject(positivo.getString("key_tipo_pago"));


                                JSONObject cuentaBancoMovimiento = new JSONObject();
                                cuentaBancoMovimiento.put("key", UUID.randomUUID().toString());
                                cuentaBancoMovimiento.put("descripcion", "Ingreso por venta de servicio.");
                                cuentaBancoMovimiento.put("key_cuenta_banco", cuenta_banco.getString("key_cuenta_banco"));
                                cuentaBancoMovimiento.put("key_usuario", positivo.getJSONObject("data").getString("key_usuario"));
                                cuentaBancoMovimiento.put("monto", positivo.getDouble("monto"));
                                cuentaBancoMovimiento.put("data", new JSONObject().put("key_caja_movimiento", positivo.getString("key")));
                                cuentaBancoMovimiento.put("fecha_on", SUtil.now());
                                cuentaBancoMovimiento.put("estado", 1);
                                cuentaBancoMovimiento.put("key_sucursal", caja.getString("key_sucursal"));
                                cuentaBancoMovimiento.put("key_tipo_gasto", "1");
                                cuentaBancoMovimiento.put("tipo_movimiento", "ingreso");
                                cuentaBancoMovimiento.put("key_tipo_pago", positivo.getString("key_tipo_pago"));
                                SPGConect.insertArray("cuenta_banco_movimiento", new JSONArray().put(cuentaBancoMovimiento));
                            }

                            positivo.put("key", SUtil.uuid());
                            positivo.put("monto", positivo.getDouble("monto")*-1);
                            SPGConect.insertArray("caja_movimiento", new JSONArray().put(positivo));
                        }
                    }
                }

                obj.put("data", "Caja reparada");
                obj.put("estado", "exito");
                return;
            }

            obj.put("data", "Caja correcta");
            obj.put("estado", "exito");
            return;
            
        } catch (Exception e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static JSONObject buscarNegativo(JSONObject movimientos, String key_paquete_vente_usuario){
        try{
            JSONObject negativo = null; 
            for (int i = 0; i < JSONObject.getNames(movimientos).length; i++) {
                if(movimientos.getJSONObject(JSONObject.getNames(movimientos)[i]).getDouble("monto")<0){
                    if(movimientos.getJSONObject(JSONObject.getNames(movimientos)[i]).getJSONObject("data").getString("key_paquete_venta_usuario").equals(key_paquete_vente_usuario)){
                        negativo = movimientos.getJSONObject(JSONObject.getNames(movimientos)[i]);
                    }
                }
            }

            return negativo;
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
    public static JSONObject buscarmovimientoBanco(String key_caja_movimiento){
        try{
            String consulta = "select jsonb_object_agg(cuenta_banco_movimiento.key, to_json(cuenta_banco_movimiento.*))::json as json  from cuenta_banco_movimiento "+
            "where cuenta_banco_movimiento.data->>'key_caja_movimiento' = '"+key_caja_movimiento+"'";
            return SPGConect.ejecutarConsultaObject(consulta);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
}