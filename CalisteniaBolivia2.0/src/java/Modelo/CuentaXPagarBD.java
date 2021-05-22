package Modelo;
import java.sql.*;
import java.util.ArrayList;
import Utils.Conexion;
public class CuentaXPagarBD {
    public static boolean guardarCXP(CuentaXPagar cxp)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call GuardarCuentaXPagar(?,?,?,?)");
            cl.setInt(1,Types.INTEGER);
            cl.setFloat(2, cxp.getMonto());
            cl.setString(3,cxp.getFechaLimite());
            cl.setInt(4, cxp.getIdProveedor());
            
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
     public static ArrayList<CuentaXPagar> mostrarCXPACtivas()
    {
        ArrayList<CuentaXPagar> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarCuentaXPagarActivos()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
            CuentaXPagar cxp = new CuentaXPagar(rs.getInt(1),rs.getInt(2),
                                    rs.getString(3)
                               ,rs.getFloat(4),rs.getString(5),rs.getString(6));
            lista.add(cxp);
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
     public static boolean CancelarCXP(CuentaXPagar cxp)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call CancelarCXP(?,?,?,?,?)");
            cl.setInt(1,Types.INTEGER);
            cl.setInt(2, cxp.getIdCuentaXPagar());
            cl.setFloat(3,cxp.getMonto());
            cl.setString(4, cxp.getRazonSocial());
            cl.setInt(5,cxp.getIdCaja());
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
      public static CuentaXPagar mostrarTotalCXP(int IdContrato)
    {
        CuentaXPagar cxp=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalEgresoCuentaXPagar(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                cxp=new CuentaXPagar(rs.getFloat(1));
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
        return cxp;
    } 
      public static CuentaXPagar mostrarTotalCXP2(Date fecha,int IdContrato)
    {
        CuentaXPagar cxp=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalEgresoCuentaXPagar2(?,?)");
            cl.setDate(1,fecha);
            cl.setInt(2,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                cxp=new CuentaXPagar(rs.getFloat(1));
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
        return cxp;
    } 
    public static ArrayList<CuentaXPagar> mostrarEgresoDiarioCXP(int IdContrato)
    {
        ArrayList<CuentaXPagar> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarEgresoCuentaXPagar(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
              CuentaXPagar cxp=new CuentaXPagar(rs.getString(1),rs.getString(2),
                                                    rs.getFloat(3));
                lista.add(cxp); 
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
       public static ArrayList<CuentaXPagar> mostrarEgresoDiarioCXP2(Date fecha,int IdContrato)
    {
        ArrayList<CuentaXPagar> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarEgresoCuentaXPagar2(?,?)");
            cl.setDate(1,fecha);
            cl.setInt(2,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                CuentaXPagar cxp=new CuentaXPagar(rs.getString(1),rs.getString(2),
                                                    rs.getFloat(3));
                lista.add(cxp); 
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
}
