package Modelo;
import Utils.Conexion;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
public class CompraMembresiaBD {
    public static boolean CompraMembresia(CuentaXCobrarMembresia cxcm,IngresoCuentaXCobrar icxc,Ingreso varIngreso,ArrayList<contratoMembresia> co)
     {
          boolean rpta=false;
         try
         {
             Connection cn= Conexion.getConexion();
             CallableStatement cl=cn.prepareCall("call GuardarCuentasXCobrarMembresia(?)");
             cl.setInt(1, Types.INTEGER);
             cl.executeUpdate();

             cxcm.setIdCuentaxCobrarMenbresia(cl.getInt(1));
             CallableStatement cl2=cn.prepareCall("call GuardarIngresoCuentaXCobrar(?,?)");
             cl2.setInt(1, Types.INTEGER);
             cl2.setInt(2,cl.getInt(1));
             cl2.executeUpdate();
             
             icxc.setIdingresoCuentaXCobrar(cl2.getInt(1));
             CallableStatement cl3=cn.prepareCall("call GuardarIngresoMembresia(?,?,?,?,?)");
             cl3.setInt(1, Types.INTEGER);
             cl3.setInt(2,varIngreso.getIdCaja());
             cl3.setInt(3,icxc.getIdingresoCuentaXCobrar());
             cl3.setFloat(4,varIngreso.getEfectivo());
             cl3.setString(5,varIngreso.getGlosa());
             cl3.executeUpdate();
             
             int i2=0;
             CallableStatement cl4=cn.prepareCall("call GuardarContrato(?,?,?,?,?,?)");
             for(contratoMembresia aux:co)
             {
                 cl4.setInt(1, Types.INTEGER);
                 cl4.setString(2,aux.getFechaInicio());
                 cl4.setString(3,aux.getFechaFin());
                 cl4.setInt(4,aux.getIdPaquete());
                 cl4.setInt(5,aux.getIdCliente());
                 cl4.setInt(6,cl.getInt(1));
                 i2=cl4.executeUpdate();
             }
             if(i2==1)
             {
                 rpta=true;
             }
         }
         catch(Exception e)
         {
         }
         return rpta;
     }
    public static boolean CompraMembresia1(CuentaXCobrarMembresia cxcm,IngresoCuentaXCobrar icxc,Ingreso varIngreso,Tarjeta tj,ArrayList<contratoMembresia> co)
     {
         boolean rpta=false;
         try
         {
             for(contratoMembresia cm: co) {
                 switch(cm.getTipoPago())
                 {
                     case "Contado":
                         Connection cn= Conexion.getConexion();
             CallableStatement cl=cn.prepareCall("call GuardarCuentasXCobrarMembresia(?)");
             cl.setInt(1, Types.INTEGER);
             cl.executeUpdate();
             
             
             cxcm.setIdCuentaxCobrarMenbresia(cl.getInt(1));
             CallableStatement cl2=cn.prepareCall("call GuardarIngresoCuentaXCobrar(?,?)");
             cl2.setInt(1, Types.INTEGER);
             cl2.setInt(2,cxcm.getIdCuentaxCobrarMenbresia());
             cl2.executeUpdate();
             
             icxc.setIdingresoCuentaXCobrar(cl2.getInt(1));
             CallableStatement cl3=cn.prepareCall("call GuardarIngresoMembresia(?,?,?,?,?)");
             cl3.setInt(1, Types.INTEGER);
             cl3.setInt(2,varIngreso.getIdCaja());
             cl3.setInt(3,icxc.getIdingresoCuentaXCobrar());
             cl3.setFloat(4,varIngreso.getEfectivo());
             cl3.setString(5,cm.getTipoPago());
             cl3.executeUpdate();
             
             int i2=0;
             cxcm.setIdCuentaxCobrarMenbresia(cl.getInt(1));
             CallableStatement cl4=cn.prepareCall("call GuardarContrato(?,?,?,?,?,?)");
             for(contratoMembresia aux:co)
             {
                 cl4.setInt(1, Types.INTEGER);
                 cl4.setString(2,aux.getFechaInicio());
                 cl4.setString(3,aux.getFechaFin());
                 cl4.setInt(4,aux.getIdPaquete());
                 cl4.setInt(5,aux.getIdCliente());
                 cl4.setInt(6,cxcm.getIdCuentaxCobrarMenbresia());
                 i2=cl4.executeUpdate();
             }
             if(i2==1)
             {
                 rpta=true;
             }
                         break;
                     default:
                         Connection cn1= Conexion.getConexion();
             CallableStatement cl5=cn1.prepareCall("call GuardarCuentasXCobrarMembresia(?)");
             cl5.setInt(1, Types.INTEGER);
             cl5.executeUpdate();
             
             CallableStatement cl9=cn1.prepareCall("call GuardarTarjeta(?,?,?,?)");
             cl9.setInt(1,Types.INTEGER);
             cl9.setInt(2,tj.getNumeroTarjeta());
             cl9.setFloat(3,tj.getMonto());
             cl9.setInt(4,tj.getIdEntidad());
             
             tj.setIdIngresoTarjeta(cl9.getInt(1));
             cxcm.setIdCuentaxCobrarMenbresia(cl5.getInt(1));
             CallableStatement cl6=cn1.prepareCall("call GuardarIngresoCuentaXCobrar2(?,?,?)");
             cl6.setInt(1, Types.INTEGER);
             cl6.setInt(2,cxcm.getIdCuentaxCobrarMenbresia());
             cl6.setInt(3,tj.getIdIngresoTarjeta());
             cl6.executeUpdate();

             icxc.setIdingresoCuentaXCobrar(cl6.getInt(1));
             CallableStatement cl7=cn1.prepareCall("call GuardarIngresoMembresia(?,?,?,?,?)");
             cl7.setInt(1, Types.INTEGER);
             cl7.setInt(2,cm.getIdCaja());
             cl7.setInt(3,icxc.getIdingresoCuentaXCobrar());
             cl7.setFloat(4,varIngreso.getEfectivo());
             cl7.setString(5,cm.getTipoPago());
             cl7.executeUpdate();
             
             int i3=0;
             cxcm.setIdCuentaxCobrarMenbresia(cl5.getInt(1));
             CallableStatement cl8=cn1.prepareCall("call GuardarContrato(?,?,?,?,?,?)");
             for(contratoMembresia aux:co)
             {
                 cl8.setInt(1, Types.INTEGER);
                 cl8.setString(2,aux.getFechaInicio());
                 cl8.setString(3,aux.getFechaFin());
                 cl8.setInt(4,aux.getIdPaquete());
                 cl8.setInt(5,aux.getIdCliente());
                 cl8.setInt(6,cxcm.getIdCuentaxCobrarMenbresia());
                 i3=cl8.executeUpdate();
             }
             if(i3==1)
             {
                 rpta=true;
             }
                         break;
                 }

              }
          }
         catch(Exception e)
         {
         }
         
         return rpta;
     }
        public static boolean CompraMembresia3(CuentaXCobrarMembresia cxcm,
            IngresoCuentaXCobrar icxc,Ingreso varIngreso,
            ArrayList<contratoCali> co)
     {
          boolean rpta=false;
        Connection cn =Conexion.getConexion();
        //CallableStatement cl=null;
        CallableStatement cl0=null;
        CallableStatement cl2=null;
        CallableStatement cl3=null;
        CallableStatement cl4=null;
        CallableStatement cl01=null;
        CallableStatement cl6=null;
        CallableStatement cl7=null;
        CallableStatement cl8=null;
        CallableStatement cla=null;
        ResultSet rs = null;
         try
         {
             //cl=cn.prepareCall("call GuardarRelacionContrato(?)");
             //cl.setInt(1, Types.INTEGER);
             //cl.executeUpdate();
             
             for(contratoCali cm: co) {
                 switch(cm.getTipoPago())
                 {
                     case "Contado":
             cl0=cn.prepareCall("call GuardarCuentasXCobrarMembresia(?)");
             cl0.setInt(1, Types.INTEGER);
             cl0.executeUpdate();
             
             cla = cn.prepareCall("call obtenerIdCXCM()");
             rs= cla.executeQuery();
             rs.next();
             int idM = rs.getInt(1);
             
             cxcm.setIdCuentaxCobrarMenbresia(idM);
             cl2=cn.prepareCall("call GuardarIngresoCuentaXCobrar(?,?)");
             cl2.setInt(1, Types.INTEGER);
             cl2.setInt(2,idM);
             cl2.executeUpdate();
             
             cla = cn.prepareCall("call obtenerIdICXC()");
             rs= cla.executeQuery();
             rs.next();
              int id = rs.getInt(1);
             
             icxc.setIdingresoCuentaXCobrar(id);
             cl3=cn.prepareCall("call GuardarIngresoMembresia(?,?,?,?,?,?,?,?,?)");
             cl3.setInt(1, Types.INTEGER);
             cl3.setInt(2,cm.getIdCaja());
             cl3.setInt(3,icxc.getIdingresoCuentaXCobrar());
             cl3.setFloat(4,cm.getPaquete().getPrecioPaquete());
             cl3.setString(5,cm.getTipoPago());
             cl3.setString(6,cm.getRF());
             cl3.setString(7,cm.getNumero());
             cl3.setInt(8, cm.getIdPaquete());
             cl3.setInt(9, 1);
             cl3.executeUpdate();
             
             int i2=0;
             cl4=cn.prepareCall("call GuardarContrato(?,?,?,?,?,?,?)");
             //rc.setIdRelacionContrato(cl.getInt(1));
                cxcm.setIdCuentaxCobrarMenbresia(idM);
                 cl4.setInt(1, Types.INTEGER);
                 cl4.setString(2,cm.getFechaInicio());
                 cl4.setString(3,cm.getFechaFin());
                 cl4.setInt(4,cm.getIdPaquete());
                 cl4.setInt(5,cm.getIdCliente());
                 cl4.setInt(6,cxcm.getIdCuentaxCobrarMenbresia());
                 cl4.setInt(7,0);
                 i2=cl4.executeUpdate();
             
             if(i2==1)
             {
                 rpta=true;
             }
             break;
                     case "Tarjeta" :
                         
             cl01=cn.prepareCall("call GuardarCuentasXCobrarMembresia(?)");
             cl01.setInt(1, Types.INTEGER);
             cl01.executeUpdate();
             
             cla = cn.prepareCall("call obtenerIdCXCM()");
             rs= cla.executeQuery();
             rs.next();
             int idM1 = rs.getInt(1);
            
             cl6=cn.prepareCall("call GuardarIngresoCuentaXCobrar2(?,?)");
             cl6.setInt(1, Types.INTEGER);
             cl6.setInt(2,idM1);
             cl6.executeUpdate();
             
             cla = cn.prepareCall("call obtenerIdICXC()");
             rs= cla.executeQuery();
             rs.next();
             int id1 = rs.getInt(1);
             
             cl7=cn.prepareCall("call GuardarTarjeta(?,?,?,?,?,?,?,?,?,?)");
             cl7.setInt(1,Types.INTEGER);
             cl7.setString(2,cm.getNumeroTarjeta());
             cl7.setFloat(3,cm.getPaquete().getPrecioPaquete());
             cl7.setString(4,cm.getRF());
             cl7.setString(5,cm.getNumero());
             cl7.setInt(6,cm.getEntidadFinanciera().getIdEntidadFinanciera());
             cl7.setInt(7,id1);
             cl7.setInt(8, cm.getIdCaja());
             cl7.setInt(9, cm.getIdPaquete());
             cl7.setInt(10, 2);
             cl7.executeUpdate();

            int i3=0;
            //rc.setIdRelacionContrato(cl.getInt(1));
            cxcm.setIdCuentaxCobrarMenbresia(idM1);
             cl8=cn.prepareCall("call GuardarContrato(?,?,?,?,?,?,?)");           
                 cl8.setInt(1, Types.INTEGER);
                 cl8.setString(2,cm.getFechaInicio());
                 cl8.setString(3,cm.getFechaFin());
                 cl8.setInt(4,cm.getIdPaquete());
                 cl8.setInt(5,cm.getIdCliente());
                 cl8.setInt(6,cxcm.getIdCuentaxCobrarMenbresia());
                 cl8.setInt(7,0);
                 i3=cl8.executeUpdate();
              if(i3==1)
             {
                 rpta=true;
             }            
             break;
                 }
              }
         }
         catch(SQLException ex)
         {
             System.err.println("ERROR: " + ex.getMessage());
             if(cn!=null)
             {
                System.out.println("Rollback");
                try {
                     //deshace todos los cambios realizados en los datos
                    cn.rollback();
                } catch (SQLException ex1) {
                 System.err.println( "No se pudo deshacer" + ex1.getMessage() );    
                }
           }
         }
         finally{
             System.out.println( "cierra conexion a la base de datos" );    
           try { 
              //if(cl !=null) cl.close(); 
              if(cl0 !=null) cl0.close();
              if(cl2 !=null) cl2.close();
              if(cl3 !=null) cl3.close();
              if(cl4 !=null) cl4.close();
              if(cl01 !=null) cl01.close();
              if(cl6 !=null) cl6.close();
              if(cl7 !=null) cl7.close();
              if(cl8 !=null) cl8.close();
                if(cn!=null) cn.close();
            } catch (SQLException ex) {
                 System.err.println( ex.getMessage() );    
             }
         }
         return rpta;
     }
    public static boolean CompraMembresia4(CuentaXCobrarMembresia cxcm,
            IngresoCuentaXCobrar icxc,Ingreso varIngreso,
            ArrayList<contratoCali> co,RealcionContrato rc)
     {
          boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        CallableStatement cl0=null;
        CallableStatement cl2=null;
        CallableStatement cl3=null;
        CallableStatement cl4=null;
        CallableStatement cl01=null;
        CallableStatement cl6=null;
        CallableStatement cl7=null;
        CallableStatement cl8=null;
         try
         {
             cl=cn.prepareCall("call GuardarRelacionContrato(?)");
             cl.setInt(1, Types.INTEGER);
             cl.executeUpdate();
             
             for(contratoCali cm: co) {
                 switch(cm.getTipoPago())
                 {
                     case "Contado":
             cl0=cn.prepareCall("call GuardarCuentasXCobrarMembresia(?)");
             cl0.setInt(1, Types.INTEGER);
             cl0.executeUpdate();
                         
             cxcm.setIdCuentaxCobrarMenbresia(cl0.getInt(1));
             cl2=cn.prepareCall("call GuardarIngresoCuentaXCobrar(?,?)");
             cl2.setInt(1, Types.INTEGER);
             cl2.setInt(2,cl0.getInt(1));
             cl2.executeUpdate();
             
             icxc.setIdingresoCuentaXCobrar(cl2.getInt(1));
             cl3=cn.prepareCall("call GuardarIngresoMembresia(?,?,?,?,?)");
             cl3.setInt(1, Types.INTEGER);
             cl3.setInt(2,cm.getIdCaja());
             cl3.setInt(3,icxc.getIdingresoCuentaXCobrar());
             cl3.setFloat(4,cm.getPaquete().getPrecioPaquete());
             cl3.setString(5,cm.getTipoPago());
             cl3.executeUpdate();
             
             int i2=0;
             cl4=cn.prepareCall("call GuardarContrato(?,?,?,?,?,?,?)");
             rc.setIdRelacionContrato(cl.getInt(1));
                cxcm.setIdCuentaxCobrarMenbresia(cl0.getInt(1));
                 cl4.setInt(1, Types.INTEGER);
                 cl4.setString(2,cm.getFechaInicio());
                 cl4.setString(3,cm.getFechaFin());
                 cl4.setInt(4,cm.getIdPaquete());
                 cl4.setInt(5,cm.getIdCliente());
                 cl4.setInt(6,cxcm.getIdCuentaxCobrarMenbresia());
                 cl4.setInt(7,0);
                 i2=cl4.executeUpdate();
             
             if(i2==1)
             {
                 rpta=true;
             }
             break;
                     case "Tarjeta" :
                         
             cl01=cn.prepareCall("call GuardarCuentasXCobrarMembresia(?)");
             cl01.setInt(1, Types.INTEGER);
             cl01.executeUpdate();
            
             cl6=cn.prepareCall("call GuardarIngresoCuentaXCobrar2(?,?)");
             cl6.setInt(1, Types.INTEGER);
             cl6.setInt(2,cl01.getInt(1));
             cl6.executeUpdate();
             
             cl7=cn.prepareCall("call GuardarTarjeta(?,?,?,?,?,?)");
             cl7.setInt(1,Types.INTEGER);
             cl7.setString(2,cm.getNumeroTarjeta());
             cl7.setFloat(3,cm.getPaquete().getPrecioPaquete());
             cl7.setInt(4,cm.getEntidadFinanciera().getIdEntidadFinanciera());
             cl7.setInt(5,cl6.getInt(1));
             cl7.setInt(6, cm.getIdCaja());
             cl7.executeUpdate();

            int i3=0;
            rc.setIdRelacionContrato(cl.getInt(1));
            cxcm.setIdCuentaxCobrarMenbresia(cl01.getInt(1));
             cl8=cn.prepareCall("call GuardarContrato(?,?,?,?,?,?,?)");           
                 cl8.setInt(1, Types.INTEGER);
                 cl8.setString(2,cm.getFechaInicio());
                 cl8.setString(3,cm.getFechaFin());
                 cl8.setInt(4,cm.getIdPaquete());
                 cl8.setInt(5,cm.getIdCliente());
                 cl8.setInt(6,cxcm.getIdCuentaxCobrarMenbresia());
                 cl8.setInt(7,0);
                 i3=cl8.executeUpdate();
              if(i3==1)
             {
                 rpta=true;
             }            
             break;
                 }
              }
         }
         catch(SQLException ex)
         {
             System.err.println("ERROR: " + ex.getMessage());
             if(cn!=null)
             {
                System.out.println("Rollback");
                try {
                     //deshace todos los cambios realizados en los datos
                    cn.rollback();
                } catch (SQLException ex1) {
                 System.err.println( "No se pudo deshacer" + ex1.getMessage() );    
                }
           }
         }
         finally{
             System.out.println( "cierra conexion a la base de datos" );    
           try { 
              if(cl !=null) cl.close(); 
              if(cl0 !=null) cl0.close();
              if(cl2 !=null) cl2.close();
              if(cl3 !=null) cl3.close();
              if(cl4 !=null) cl4.close();
              if(cl01 !=null) cl01.close();
              if(cl6 !=null) cl6.close();
              if(cl7 !=null) cl7.close();
              if(cl8 !=null) cl8.close();
                if(cn!=null) cn.close();
            } catch (SQLException ex) {
                 System.err.println( ex.getMessage() );    
             }
         }
         return rpta;
     }
    public static boolean CompraMembresiaBox(CuentaXCobrarMembresia cxcm,
            IngresoCuentaXCobrar icxc,Ingreso varIngreso,
            ArrayList<contratoKick> co,RealcionContrato rc)
     {
          boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        CallableStatement cl0=null;
        CallableStatement cl2=null;
        CallableStatement cl3=null;
        CallableStatement cl4=null;
        CallableStatement cl01=null;
        CallableStatement cl6=null;
        CallableStatement cl7=null;
        CallableStatement cl8=null;
        CallableStatement cla=null;
        ResultSet rs = null;
         try
         {
             cl=cn.prepareCall("call GuardarRelacionContrato(?)");
             cl.setInt(1, Types.INTEGER);
             cl.executeUpdate();
             
             cla = cn.prepareCall("call obtenerIdRC()");
             rs= cla.executeQuery();
             rs.next();
              int idR = rs.getInt(1);
             
             for(contratoKick cm: co) {
                 switch(cm.getTipoPago())
                 {
                     case "Contado":
             cl0=cn.prepareCall("call GuardarCuentasXCobrarMembresia(?)");
             cl0.setInt(1, Types.INTEGER);
             cl0.executeUpdate();
             
             cla = cn.prepareCall("call obtenerIdCXCM()");
             rs= cla.executeQuery();
             rs.next();
             int idM = rs.getInt(1);
                         
             cxcm.setIdCuentaxCobrarMenbresia(idM);
             cl2=cn.prepareCall("call GuardarIngresoCuentaXCobrar(?,?)");
             cl2.setInt(1, Types.INTEGER);
             cl2.setInt(2,idM);
             cl2.executeUpdate();
             
             cla = cn.prepareCall("call obtenerIdICXC()");
             rs= cla.executeQuery();
             rs.next();
             int id = rs.getInt(1);
             
             icxc.setIdingresoCuentaXCobrar(id);
             cl3=cn.prepareCall("call GuardarIngresoMembresia(?,?,?,?,?,?,?,?,?)");
             cl3.setInt(1, Types.INTEGER);
             cl3.setInt(2,cm.getIdCaja());
             cl3.setInt(3,icxc.getIdingresoCuentaXCobrar());
             cl3.setFloat(4,cm.getPaquete().getPrecioPaquete());
             cl3.setString(5,cm.getTipoPago());
             cl3.setString(6,cm.getRF());
             cl3.setString(7,cm.getNumero());
             cl3.setInt(8, cm.getIdPaquete());
             cl3.setInt(9,1);
             cl3.executeUpdate();
             
             int i2=0;
             cl4=cn.prepareCall("call GuardarContrato(?,?,?,?,?,?,?)");
             rc.setIdRelacionContrato(idR);
                cxcm.setIdCuentaxCobrarMenbresia(idM);
                 cl4.setInt(1, Types.INTEGER);
                 cl4.setString(2,cm.getFechaInicio());
                 cl4.setString(3,cm.getFechaFin());
                 cl4.setInt(4,cm.getIdPaquete());
                 cl4.setInt(5,cm.getIdCliente());
                 cl4.setInt(6,cxcm.getIdCuentaxCobrarMenbresia());
                 cl4.setInt(7,rc.getIdRelacionContrato());
                 i2=cl4.executeUpdate();
             
             if(i2==1)
             {
                 rpta=true;
             }
             break;
                     case "Tarjeta" :
                         
             cl01=cn.prepareCall("call GuardarCuentasXCobrarMembresia(?)");
             cl01.setInt(1, Types.INTEGER);
             cl01.executeUpdate();
             
             cla = cn.prepareCall("call obtenerIdCXCM()");
             rs= cla.executeQuery();
             rs.next();
             int idM1 = rs.getInt(1);
            
             cl6=cn.prepareCall("call GuardarIngresoCuentaXCobrar2(?,?)");
             cl6.setInt(1, Types.INTEGER);
             cl6.setInt(2,idM1);
             cl6.executeUpdate();
             
             cla = cn.prepareCall("call obtenerIdICXC()");
             rs= cla.executeQuery();
             rs.next();
             int id1 = rs.getInt(1);
             
             cl7=cn.prepareCall("call GuardarTarjeta(?,?,?,?,?,?,?,?,?,?)");
             cl7.setInt(1,Types.INTEGER);
             cl7.setString(2,cm.getNumeroTarjeta());
             cl7.setFloat(3,cm.getPaquete().getPrecioPaquete());
             cl7.setString(4,cm.getRF());
             cl7.setString(5,cm.getNumero());
             cl7.setInt(6,cm.getEntidadFinanciera().getIdEntidadFinanciera());
             cl7.setInt(7,id1);
             cl7.setInt(8, cm.getIdCaja());
             cl7.setInt(9, cm.getIdPaquete());
             cl7.setInt(10, 2);
             cl7.executeUpdate();

            int i3=0;
            rc.setIdRelacionContrato(idR);
            cxcm.setIdCuentaxCobrarMenbresia(idM1);
             cl8=cn.prepareCall("call GuardarContrato(?,?,?,?,?,?,?)");           
                 cl8.setInt(1, Types.INTEGER);
                 cl8.setString(2,cm.getFechaInicio());
                 cl8.setString(3,cm.getFechaFin());
                 cl8.setInt(4,cm.getIdPaquete());
                 cl8.setInt(5,cm.getIdCliente());
                 cl8.setInt(6,cxcm.getIdCuentaxCobrarMenbresia());
                 cl8.setInt(7,rc.getIdRelacionContrato());
                 i3=cl8.executeUpdate();
              if(i3==1)
             {
                 rpta=true;
             }            
             break;
                 }
              }
         }
         catch(SQLException ex)
         {
             System.err.println("ERROR: " + ex.getMessage());
             if(cn!=null)
             {
                System.out.println("Rollback");
                try {
                     //deshace todos los cambios realizados en los datos
                    cn.rollback();
                } catch (SQLException ex1) {
                 System.err.println( "No se pudo deshacer" + ex1.getMessage() );    
                }
           }
         }
         finally{
             System.out.println( "cierra conexion a la base de datos" );    
           try { 
              if(cl !=null) cl.close(); 
              if(cl0 !=null) cl0.close();
              if(cl2 !=null) cl2.close();
              if(cl3 !=null) cl3.close();
              if(cl4 !=null) cl4.close();
              if(cl01 !=null) cl01.close();
              if(cl6 !=null) cl6.close();
              if(cl7 !=null) cl7.close();
              if(cl8 !=null) cl8.close();
                if(cn!=null) cn.close();
            } catch (SQLException ex) {
                 System.err.println( ex.getMessage() );    
             }
         }
         return rpta;
     }
    
    public static boolean CompraMembresiaBeca(CuentaXCobrarMembresia cxcm,
            IngresoCuentaXCobrar icxc,Ingreso varIngreso,
            ArrayList<contratoCali> co)
     {
          boolean rpta=false;
        Connection cn =Conexion.getConexion();
        //CallableStatement cl=null;
        CallableStatement cl0=null;
        CallableStatement cl2=null;
        CallableStatement cl3=null;
        CallableStatement cl4=null;
        CallableStatement cl01=null;
        CallableStatement cl6=null;
        CallableStatement cl7=null;
        CallableStatement cl8=null;
        CallableStatement cl9=null;
        CallableStatement cla=null;
        ResultSet rs = null;
         try
         {
             //cl=cn.prepareCall("call GuardarRelacionContrato(?)");
             //cl.setInt(1, Types.INTEGER);
             //cl.executeUpdate();
             
             for(contratoCali cm: co) {
                 switch(cm.getTipoPago())
                 {
                     case "Contado":
             cl0=cn.prepareCall("call GuardarCuentasXCobrarMembresia(?)");
             cl0.setInt(1, Types.INTEGER);
             cl0.executeUpdate();
             
             cla = cn.prepareCall("call obtenerIdCXCM()");
             rs= cla.executeQuery();
             rs.next();
             int idM = rs.getInt(1);
                         
             cxcm.setIdCuentaxCobrarMenbresia(idM);
             cl2=cn.prepareCall("call GuardarIngresoCuentaXCobrar(?,?)");
             cl2.setInt(1, Types.INTEGER);
             cl2.setInt(2,idM);
             cl2.executeUpdate();
             
             cla = cn.prepareCall("call obtenerIdICXC()");
             rs= cla.executeQuery();
             rs.next();
             int id = rs.getInt(1);
             
             icxc.setIdingresoCuentaXCobrar(id);
             cl3=cn.prepareCall("call GuardarIngresoMembresia(?,?,?,?,?,?,?,?,?)");
             cl3.setInt(1, Types.INTEGER);
             cl3.setInt(2,cm.getIdCaja());
             cl3.setInt(3,icxc.getIdingresoCuentaXCobrar());
             cl3.setFloat(4,cm.getPaquete().getPrecioPaquete());
             cl3.setString(5,cm.getTipoPago());
             cl3.setString(6,cm.getRF());
             cl3.setString(7,cm.getNumero());
             cl3.setInt(8, cm.getIdPaquete());
             cl3.setInt(9, 1);
             cl3.executeUpdate();
             
             int i2=0;
             cl4=cn.prepareCall("call GuardarContrato(?,?,?,?,?,?,?)");
             //rc.setIdRelacionContrato(cl.getInt(1));
                cxcm.setIdCuentaxCobrarMenbresia(idM);
                 cl4.setInt(1, Types.INTEGER);
                 cl4.setString(2,cm.getFechaInicio());
                 cl4.setString(3,cm.getFechaFin());
                 cl4.setInt(4,cm.getIdPaquete());
                 cl4.setInt(5,cm.getIdCliente());
                 cl4.setInt(6,cxcm.getIdCuentaxCobrarMenbresia());
                 cl4.setInt(7,0);
                 i2=cl4.executeUpdate();
                 
             cl9=cn.prepareCall("call guardarBeca(?,?)");
             cl9.setInt(1,cm.getIdCliente());
             cl9.setString(2,cm.getMotivo());
             cl9.executeUpdate();
             
             if(i2==1)
             {
                 rpta=true;
             }
             break;
                     case "Tarjeta" :
                         
             cl01=cn.prepareCall("call GuardarCuentasXCobrarMembresia(?)");
             cl01.setInt(1, Types.INTEGER);
             cl01.executeUpdate();
             
             cla = cn.prepareCall("call obtenerIdCXCM()");
             rs= cla.executeQuery();
             rs.next();
             int idM1 = rs.getInt(1);
            
             cl6=cn.prepareCall("call GuardarIngresoCuentaXCobrar2(?,?)");
             cl6.setInt(1, Types.INTEGER);
             cl6.setInt(2,idM1);
             cl6.executeUpdate();
             cla = cn.prepareCall("call obtenerIdICXC()");
             rs= cla.executeQuery();
             rs.next();
             int id1 = rs.getInt(1);
             
             cl7=cn.prepareCall("call GuardarTarjeta(?,?,?,?,?,?,?,?,?,?)");
             cl7.setInt(1,Types.INTEGER);
             cl7.setString(2,cm.getNumeroTarjeta());
             cl7.setFloat(3,cm.getPaquete().getPrecioPaquete());
             cl7.setString(4,cm.getRF());
             cl7.setString(5,cm.getNumero());
             cl7.setInt(6,cm.getEntidadFinanciera().getIdEntidadFinanciera());
             cl7.setInt(7,id1);
             cl7.setInt(8, cm.getIdCaja());
             cl7.setInt(9, cm.getIdPaquete());
             cl7.setInt(10, 2);
             cl7.executeUpdate();

            int i3=0;
            //rc.setIdRelacionContrato(cl.getInt(1));
            cxcm.setIdCuentaxCobrarMenbresia(idM1);
             cl8=cn.prepareCall("call GuardarContrato(?,?,?,?,?,?,?)");           
                 cl8.setInt(1, Types.INTEGER);
                 cl8.setString(2,cm.getFechaInicio());
                 cl8.setString(3,cm.getFechaFin());
                 cl8.setInt(4,cm.getIdPaquete());
                 cl8.setInt(5,cm.getIdCliente());
                 cl8.setInt(6,cxcm.getIdCuentaxCobrarMenbresia());
                 cl8.setInt(7,0);
                 i3=cl8.executeUpdate();
                 
            cl9=cn.prepareCall("call guardarBeca(?,?)");
             cl9.setInt(1,cm.getIdCliente());
             cl9.setString(2,cm.getMotivo());
             cl9.executeUpdate();
              if(i3==1)
             {
                 rpta=true;
             }            
             break;
                 }
              }
         }
         catch(SQLException ex)
         {
             System.err.println("ERROR: " + ex.getMessage());
             if(cn!=null)
             {
                System.out.println("Rollback");
                try {
                     //deshace todos los cambios realizados en los datos
                    cn.rollback();
                } catch (SQLException ex1) {
                 System.err.println( "No se pudo deshacer" + ex1.getMessage() );    
                }
           }
         }
         finally{
             System.out.println( "cierra conexion a la base de datos" );    
           try { 
              //if(cl !=null) cl.close(); 
              if(cl0 !=null) cl0.close();
              if(cl2 !=null) cl2.close();
              if(cl3 !=null) cl3.close();
              if(cl4 !=null) cl4.close();
              if(cl01 !=null) cl01.close();
              if(cl6 !=null) cl6.close();
              if(cl7 !=null) cl7.close();
              if(cl8 !=null) cl8.close();
              if(cl9 !=null) cl9.close();
                if(cn!=null) cn.close();
            } catch (SQLException ex) {
                 System.err.println( ex.getMessage() );    
             }
         }
         return rpta;
     }
    
    public static boolean modificarNroFactura(String nro)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        CallableStatement cl2=null;
        try
        {
            cl=cn.prepareCall("call updateNumeroFacturaC(?)");
            cl.setString(1, nro);
            
            int i=cl.executeUpdate();
            cl2=cn.prepareCall("call updateNumeroFacturaT(?)");
            cl2.setString(1, nro);
            i=cl2.executeUpdate();
            if(i==1)
            { rpta=true;
            cn.commit();
            }
            else
            {rpta=false;
            }
        }
       catch(Exception e)
        {}
        finally{
             System.out.println( "cierra conexion a la base de datos" );    
           try {
              if(cl !=null) cl.close();                             
                if(cn!=null) cn.close();
            } catch (SQLException ex) {
                 System.err.println( ex.getMessage() );    
             }
         }
        return rpta;
    }
}
