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
public class LoginBD {
     public static boolean guardarLogin(Login l)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call GuardarLogin(?,?,?,?)");
            cl.setInt(1,Types.INTEGER);
            cl.setInt(2,l.getIdPersonal());
            cl.setString(3, l.getUsuario());
            cl.setString(4,l.getContaseña());
            
            int i=cl.executeUpdate();
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
     public static boolean modificarLogin(Login l)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call ModificarLogin(?,?,?)");
            cl.setInt(1, l.getIdPersonal());
            cl.setString(2, l.getUsuario());
            cl.setString(3,l.getContaseña());
            
            int i=cl.executeUpdate();
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
      public static boolean desactivarLogin(Login l)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call DesactivarLogin(?)");
            cl.setInt(1, l.getIdLogin());
            int i=cl.executeUpdate();
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
    public static boolean activarLogin(Login l)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call ActivarLogin(?)");
            cl.setInt(1, l.getIdLogin());
            int i=cl.executeUpdate();
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
     public static ArrayList<Login> mostrarLoginACtivas()
    {
        
        ArrayList<Login> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarLoginActivos()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
                Login l = new Login(rs.getInt(1),rs.getInt(2),rs.getString(3),rs.getString(4),rs.getString(5));
                lista.add(l);
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
     public static ArrayList<Login> mostrarLoginInactivas()
    {
        
        ArrayList<Login> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarLoginInactivos()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
                Login l = new Login(rs.getInt(1),rs.getInt(2),rs.getString(3),rs.getString(4),rs.getString(5));
                lista.add(l);
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
    
}
