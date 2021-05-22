package Modelo;

import java.sql.*;
import java.util.ArrayList;
import Utils.Conexion;
/**
 *
 * @author YakuRocaH
 */
public class PaqueteBD {
     public static boolean guardarPaquete(Paquete pq)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call GuardarPaquete(?,?,?,?,?,?)");
            cl.setInt(1,Types.INTEGER);
            cl.setString(2, pq.getNombrePaquete());
            cl.setFloat(3, pq.getPrecioPaquete());
            cl.setInt(4, pq.getCantidad());
            cl.setInt(5, pq.getDuracion());
            cl.setInt(6, pq.getCategoriaPaquete());
            
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
     
     public static boolean modificarPaquete(Paquete pq)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call ModificarPaquete(?,?,?,?,?,?)");
            cl.setInt(1, pq.getIdPaquete());
            cl.setString(2, pq.getNombrePaquete());
            cl.setFloat(3, pq.getPrecioPaquete());
            cl.setInt(4, pq.getCantidad());
            cl.setInt(5, pq.getDuracion());
            cl.setInt(6, pq.getCategoriaPaquete());
            
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
     public static boolean desactivarPaquete(Paquete pq)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call DesactivarPaquete(?)");
            cl.setInt(1, pq.getIdPaquete());
            
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
     public static boolean activarPaquete(Paquete pq)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call ActivarPaquete(?)");
            cl.setInt(1, pq.getIdPaquete());
            
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
     public static ArrayList<Paquete> mostrarPaqueteBeca()
    {
        
        ArrayList<Paquete> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarPaqueteBeca()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
             
                Paquete pq = new Paquete(rs.getInt(1),rs.getString(2),rs.getFloat(3),
                        rs.getInt(4),rs.getInt(5),rs.getByte(6),rs.getString(7));
                lista.add(pq);
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
     
    public static ArrayList<Paquete> mostrarPaqueteActivas()
    {
        
        ArrayList<Paquete> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarPaqueteActivosCalistenia()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
             
                Paquete pq = new Paquete(rs.getInt(1),rs.getString(2),rs.getFloat(3),
                        rs.getInt(4),rs.getInt(5),rs.getByte(6),rs.getString(7));
                lista.add(pq);
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
    
    public static ArrayList<Paquete> mostrarPaqueteActivasCalistenia()
    {
        
        ArrayList<Paquete> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarPaqueteActivosCalistenia()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
             
                Paquete pq = new Paquete(rs.getInt(1),rs.getString(2),rs.getFloat(3),
                        rs.getInt(4),rs.getInt(5),rs.getByte(6),rs.getString(7));
                lista.add(pq);
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
     public static ArrayList<Paquete> mostrarPaqueteActivasBoxeo()
    {
        
        ArrayList<Paquete> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarPaqueteActivosBoxeo()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
             
                Paquete pq = new Paquete(rs.getInt(1),rs.getString(2),rs.getFloat(3),
                        rs.getInt(4),rs.getInt(5),rs.getByte(6),rs.getString(7));
                lista.add(pq);
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
     public static ArrayList<Paquete> mostrarPaqueteInactivas()
    {
        
        ArrayList<Paquete> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarPaqueteInactivocCalistenia()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
             
                Paquete pq = new Paquete(rs.getInt(1),rs.getString(2),rs.getFloat(3),
                        rs.getInt(4),rs.getInt(5),rs.getByte(6),rs.getString(7));
                lista.add(pq);
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
     public static ArrayList<Paquete> mostrarPaqueteInactivasBoxeo()
    {
        
        ArrayList<Paquete> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarPaqueteInactivoBoxeo()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
             
                Paquete pq = new Paquete(rs.getInt(1),rs.getString(2),rs.getFloat(3),
                        rs.getInt(4),rs.getInt(5),rs.getByte(6),rs.getString(7));
                lista.add(pq);
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
     public static Paquete MostrarPaquete(int idPaquete)
    {
        Paquete p=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("{call MostrarPaqueteId(?)}");
            cl.setInt(1,idPaquete);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                p = new Paquete(rs.getInt(1),rs.getString(2),rs.getFloat(3),
                        rs.getInt(5),rs.getInt(4),rs.getInt(6),rs.getByte(7));
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
        return p;
    }
     
     public static ArrayList<Paquete> mostrarPaqueteBecado()
    {
        
        ArrayList<Paquete> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call mostrarPaqueteBecado()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
             
                Paquete pq = new Paquete(rs.getInt(1),rs.getString(2),rs.getFloat(3),
                        rs.getInt(4),rs.getInt(5),rs.getByte(6),rs.getString(7));
                lista.add(pq);
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
