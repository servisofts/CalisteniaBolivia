
package Modelo;
import java.sql.*;
import java.util.ArrayList;
import Utils.Conexion;
/**
 *
 * @author YakuRocaH
 */
public class SucursalBD {
     public static boolean guardarSucursal(Sucursal s)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call GuardarSucursal(?,?)");
            cl.setInt(1,Types.INTEGER);
            cl.setString(2, s.getNombreSucursal());
            
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
     public static boolean modificarSucursal(Sucursal s)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call ModificarSucursal(?,?)");
            cl.setInt(1, s.getIdSucursal());
            cl.setString(2, s.getNombreSucursal());
            
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
     public static boolean desactivarSucursal(Sucursal s)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call DesactivarSucursal(?)");
            cl.setInt(1, s.getIdSucursal());
            
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
    public static boolean activarSucursal(Sucursal s)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cn.setAutoCommit(false);
            cl=cn.prepareCall("call ActivarSucursal(?)");
            cl.setInt(1, s.getIdSucursal());
            
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
     public static ArrayList<Sucursal> mostrarSucursalACtivas()
    {
        
        ArrayList<Sucursal> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
             cl=cn.prepareCall("call MostrarSucursalActivos()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
             
                Sucursal s = new Sucursal(rs.getInt(1),rs.getString(2),rs.getByte(3));
                lista.add(s);
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
     
     public static ArrayList<Sucursal> mostrarSucursalInactivas()
    {
        
        ArrayList<Sucursal> lista =new ArrayList<>();
         Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarSucursalInactivos()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
             
                Sucursal s = new Sucursal(rs.getInt(1),rs.getString(2),rs.getByte(3));
                lista.add(s);
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
    
     public static Sucursal mostrarSucursalNombre(int IdContrato)
    {
        Sucursal s=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarSucursalNombre(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                s=new Sucursal(rs.getString(1),rs.getString(2),rs.getString(3));
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
        return s;
    }
     
     public static int getIdSuc(String nombre)
     {
        int s=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarSucursal(?)");
            cl.setString(1,nombre);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                s=rs.getInt(1);
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
        return s;
     }
     
     public static ArrayList<Integer> getPersonalSuc(int idSuc)
     {
        ArrayList<Integer> s = new ArrayList();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call usuarioSucursal(?)");
            cl.setInt(1,idSuc);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                s.add(rs.getInt(1));
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
        return s;
     }
     
     public static String mostrarSucursal(int IdSucursal)
    {
        String s=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call mostrarSucursalN(?)");
            cl.setInt(1,IdSucursal);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                s=rs.getString(1);
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
        return s;
    }
     
     public static ArrayList<Integer> getPersonalSuc2(int idSuc,Date fechaini)
     {
        ArrayList<Integer> s = new ArrayList();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call personalSucursal(?,?)");
            cl.setInt(1,idSuc);
            cl.setDate(2,fechaini);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                s.add(rs.getInt(1));
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
        return s;
     }
     
     public static ArrayList<Integer> getPersonalSuc3(int idSuc)
     {
        ArrayList<Integer> s = new ArrayList();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call personalSucursal2(?)");
            cl.setInt(1,idSuc);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                s.add(rs.getInt(1));
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
        return s;
     }
    
}
