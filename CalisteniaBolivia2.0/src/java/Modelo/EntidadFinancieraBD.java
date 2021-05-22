/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;
import java.sql.*;
import java.util.ArrayList;
import Utils.Conexion;
/**
 *
 * @author YakuRocaH
 */
public class EntidadFinancieraBD {
    public static ArrayList<EntidadFinanciera> mostrarEntidadFinanciera()
    {
        
        ArrayList<EntidadFinanciera> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarEntidadFinanciera()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
             
                EntidadFinanciera ef = new EntidadFinanciera(rs.getInt(1),rs.getString(2));
                lista.add(ef);
            }
            
        }
        catch(Exception e){}
        finally{
             System.out.println( "cierra conexion a la base de datos" );    
           try {
              if(cl !=null) cl.close();                             
                if(cn!=null) cn.close();
            } catch (SQLException ex) {
                 System.err.println( ex.getMessage() );    
             }
         }
        return lista;
    }
    public static EntidadFinanciera mostrarEntidadFinanciera(int idEntidadFinanciera)
    {
        
        EntidadFinanciera ef=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarEntidadFinancieraId(?)");
            cl.setInt(1,idEntidadFinanciera);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ef=new EntidadFinanciera(rs.getInt(1),rs.getString(2));
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
        return ef;
    }
}
