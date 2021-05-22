/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

import Utils.Conexion;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;

/**
 *
 * @author Hector
 */
public class ReciboBD {
    public static boolean guardarRecibo(Recibo r)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call guardarRecibo(?,?,?)");
            cl.setDate(1, (Date) r.getFecha());
            cl.setInt(2, r.getIdCliente());
            cl.setString(3, r.getTipoPago());
            cl.executeUpdate();
            rpta=true;
        }
       catch(Exception e)
        {System.out.println(e);}
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
    
     public static int getIdRecibo()
    {
        int rpta=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call getIdRecibo()");
            ResultSet rs= cl.executeQuery();
            rs.next();
            rpta=rs.getInt(1);
        }
       catch(Exception e)
        {System.out.println(e);}
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
    
    public static boolean guardarDetalleRecibo(DetalleRecibo r)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call guardarDetalleRecibo(?,?,?)");
            cl.setInt(1, r.getIdPaquete());
            cl.setInt(2, r.getIdCliente());
            cl.setInt(3, r.getIdRecibo());
            cl.executeUpdate();
            rpta=true;
        }
       catch(Exception e)
        {System.out.println(e);}
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
