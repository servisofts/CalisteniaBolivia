package Modelo;
import java.sql.*;
import java.util.ArrayList;
import Utils.Conexion;
import java.text.SimpleDateFormat;
public class CajaBD {
     public static Caja mostrarCajaActiva(int IdContrato)
    {
        Caja l=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarCajaACtiva(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                l=new Caja(rs.getInt(1),rs.getDate(2));
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
        return l;
    } 
     public static Caja mostrarTotalCajaPersonal(int IdContrato)
    {
        Caja l=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalCaja(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                l=new Caja(rs.getFloat(1));
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
        return l;
    } 
     public static Caja mostrarTotalCajaPersonal2(Date fecha,int IdContrato)
    {
        Caja l=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalCaja2(?,?)");
            cl.setDate(1,fecha);
            cl.setInt(2,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                l=new Caja(rs.getFloat(1));
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
        return l;
    } 
      public static ArrayList<Caja> mostrarTotalCajaPersonal1(int IdContrato)
    {
        ArrayList<Caja> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalCaja(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Caja l=new Caja(rs.getFloat(1));
                lista.add(l); 
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
        return lista;
    } 
     public static boolean CrearCaja(Caja cc)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call RegistrarCaja(?)");
            cl.setInt(1, cc.getIdCaja());
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
     
     public static int mostrarCaja(Date fecha, int idPersonal)
    {
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        int i=8000;
        try
        {
            cl=cn.prepareCall("call CajaFecha(?,?)");
            cl.setDate(1,fecha);
            cl.setInt(2,idPersonal);
            ResultSet rs=cl.executeQuery();
            //rs.next();
            if(rs.next())
            {
                i=rs.getInt(1);
            } else{
                i=9999;
            } 
        }
        catch(Exception e)
        {
            System.out.print(e);
        }
        finally{
             System.out.println( "cierra conexion a la base de datos" );    
           try {
              if(cl !=null) cl.close();                             
                if(cn!=null) cn.close();
            } catch (SQLException ex) {
                 System.err.println( ex.getMessage() );    
             }
         }
        return i;
    } 
     
     public static int getIdSucursalCaja(int idCaja)
    {
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        int i=8000;
        try
        {
            cl=cn.prepareCall("call getIdSucursalCaja(?)");
            cl.setInt(1,idCaja);
            ResultSet rs=cl.executeQuery();
            //rs.next();
            if(rs.next())
            {
                i=rs.getInt(1);
            } else{
                i=9999;
            } 
        }
        catch(Exception e)
        {
            System.out.print(e);
        }
        finally{
             System.out.println( "cierra conexion a la base de datos" );    
           try {
              if(cl !=null) cl.close();                             
                if(cn!=null) cn.close();
            } catch (SQLException ex) {
                 System.err.println( ex.getMessage() );    
             }
         }
        return i;
    } 
}
