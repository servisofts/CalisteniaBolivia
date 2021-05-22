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
public class ProveedorBD {
     public static boolean guardarProveedor(Proveedor pr)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call GuardarProveedor(?,?,?,?,?,?,?,?)");
            cl.setInt(1,Types.INTEGER);
            cl.setInt(2,Types.INTEGER);
            cl.setString(3, pr.getNombre());
            cl.setString(4, pr.getApellido());
            cl.setInt(5, pr.getNit());
            cl.setString(6, pr.getTelefono());
            cl.setString(7, pr.getCorreo());
            cl.setString(8, pr.getRazonSocial());
            
            int i=cl.executeUpdate();
            if(i==1)
            { rpta=true;
            cn.commit();
            }
            else
            {rpta=false;
            }
            cn.close();
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
     public static ArrayList<Proveedor> mostrarProveedor()
    {
        
        ArrayList<Proveedor> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarProveedor()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
             
                Proveedor pr = new Proveedor(rs.getInt(1),rs.getString(2),rs.getString(3),rs.getInt(4),
                                             rs.getString(5),rs.getString(6),rs.getString(7));
                lista.add(pr);
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
     public static Proveedor mostrarProveedor(int idProveedor)
    {    
        Proveedor clt=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarProveedorId(?)");
            cl.setInt(1,idProveedor);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                clt=new Proveedor(rs.getInt(1),rs.getString(2),rs.getString(3),rs.getInt(4),
                                             rs.getString(5),rs.getString(6),rs.getString(7));
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
        return clt;
    }
}
