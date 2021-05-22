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
 * @author Hector
 */
public class ZonaBD {
    public static boolean guardarZona(String cp)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call guardarZona(?)");
            System.out.println(Types.INTEGER);
            cl.setString(1, cp);
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
    public static boolean modificarZona(Zona cp)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call modificarZona(?,?)");
            cl.setInt(1, cp.getIdZona());
            cl.setString(2, cp.getNombre());
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
    public static boolean desactivarZona(int cp)
    {
        boolean rpta = false;
        Connection cn = Conexion.getConexion();
        CallableStatement cl = null;
        try
        {
            cl=cn.prepareCall("call desactivarZona(?)");
            cl.setInt(1, cp);
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
    public static boolean activarZona(int cp)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call activarZona(?)");
            cl.setInt(1, cp);
            
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
        return rpta;
    }
    public static ArrayList<Zona> mostrarZonasActivas()
    {
        
        ArrayList<Zona> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarZonasActivas()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
                Zona cp = new Zona(rs.getInt(1),rs.getString(2),rs.getByte(3));
                lista.add(cp);
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
     
     public static ArrayList<Zona> mostrarZonasInactivas()
    {  
        ArrayList<Zona> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarZonasInactivas()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {             
                Zona cp = new Zona(rs.getInt(1),rs.getString(2),rs.getByte(3));
                lista.add(cp);
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
     
    public static ArrayList<Zona> clienteZona()
    {  
        ArrayList<Zona> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call clientesZona()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {             
                Zona cp = new Zona(rs.getString(2),rs.getInt(1));
                lista.add(cp);
            }
        }
        catch(Exception e){System.out.println(e);}
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
