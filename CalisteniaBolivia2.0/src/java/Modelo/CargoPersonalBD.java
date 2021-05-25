package Modelo;
import java.sql.*;
import java.util.ArrayList;
import Utils.Conexion;
public class CargoPersonalBD {
    
    public static boolean guardarCargoPersonal(CargoPersonal cp)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call GuardarCargoPersonal(?,?)");
            cl.setInt(1,Types.INTEGER);
            cl.setString(2, cp.getNombreCargo());
            
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
    public static boolean modificarCargoPersonal(CargoPersonal cp)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call ModificarCargoPersonal(?,?)");
            cl.setInt(1, cp.getIdCargo());
            cl.setString(2, cp.getNombreCargo());
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
    public static boolean desactivarCargoPersonal(CargoPersonal cp)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call DesactivarCargoPersonal(?)");
            cl.setInt(1, cp.getIdCargo());
            
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
    public static boolean activarCargoPersonal(CargoPersonal cp)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call ActivarCargoPersonal(?)");
            cl.setInt(1, cp.getIdCargo());
            
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
    public static ArrayList<CargoPersonal> mostrarCargoPersonalACtivas()
    {
        
        ArrayList<CargoPersonal> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarCargoPersonalActivos()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
             
                CargoPersonal cp = new CargoPersonal(rs.getInt(1),rs.getString(2),rs.getByte(3));
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
     
     public static ArrayList<CargoPersonal> mostrarCargoPersonalInactivas()
    {  
        ArrayList<CargoPersonal> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarCargoPersonalInactivos()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {             
                CargoPersonal cp = new CargoPersonal(rs.getInt(1),rs.getString(2),rs.getByte(3));
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
}
