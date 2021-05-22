package Modelo;
import java.sql.*;
import java.util.ArrayList;
import Utils.Conexion;
public class CierreCajaBD {
    public static boolean CerrarCaja(CierreCaja cc)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        CallableStatement cl2=null;
        try
        {
            cl=cn.prepareCall("call CerrarCaja(?,?,?,?)");
            cl.setInt(1, cc.getIdCaja());
            cl.setFloat(2, cc.getEfectivo());
            cl.setString(3, cc.getFechaCierre());
            cl.setString(4, cc.getObservacion());
            cl.executeUpdate();
            
            cl2=cn.prepareCall("call GuardarTotaMontos1(?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
            cl2.setInt(1,Types.INTEGER);
            cl2.setString(2, cc.getFechaCierre());
            cl2.setFloat(3, cc.getMontoInEfeCali());
            cl2.setFloat(4, cc.getMontoInEfeBox());
            cl2.setFloat(5, cc.getMontoTarCali());
            cl2.setFloat(6, cc.getMontoTarBox());
            cl2.setFloat(7, cc.getOtroIngreso());
            cl2.setFloat(8, cc.getMontoEgresoPer());
            cl2.setFloat(9, cc.getMontoCXP());
            cl2.setFloat(10, cc.getMontoChequePer());
            cl2.setFloat(11, cc.getMontoChequePro());
            cl2.setFloat(12,cc.getOtroEgreso());
            cl2.setFloat(13, cc.getEfectivo());
            cl2.setInt(14, cc.getIdCaja());
            
            int i=cl2.executeUpdate();
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
              if(cl2 !=null) cl2.close(); 
                if(cn!=null) cn.close();
            } catch (SQLException ex) {
                 System.err.println( ex.getMessage() );    
             }
         }
        return rpta;
    }
    public static ArrayList<CierreCaja> MostrarCierreCajaXFecha(CierreCaja cc)
    {  
        ArrayList<CierreCaja> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarCierreCajaXFecha(?)");
            cl.setString(1,cc.getFechaCierre());
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                CierreCaja l=new CierreCaja(rs.getInt(1),rs.getString(2),
                                            rs.getString(3),rs.getString(4),
                                            rs.getString(5),rs.getFloat(6),
                                            rs.getString(7),rs.getInt(8));
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
    
    
    public static ArrayList<CierreCaja> MostrarCierreCajaXFechaXFecha(int IdContrato,Date fecha1,Date fecha2)
    {
        ArrayList<CierreCaja> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarCierreCajafecha(?,?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2,fecha1);
            cl.setDate(3,fecha2);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                CierreCaja i=new CierreCaja(rs.getString(1),
                                            rs.getString(2),
                                            rs.getFloat(3),
                                            rs.getString(4),
                                            rs.getString(5),rs.getString(6));
                lista.add(i); 
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

    
    public static CierreCaja MostrarCierreCajaTotalXFechaXFecha(int IdContrato,Date fecha1,Date fecha2)
    {
        CierreCaja cc=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarCierreCajaTotalfecha(?,?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2,fecha1);
            cl.setDate(3,fecha2);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                cc=new CierreCaja(rs.getFloat(1));
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
        return cc;
    } 
    public static ArrayList<CierreCaja> mostrarCierreCaja()
    {       
        ArrayList<CierreCaja> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarCierreCajaP()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {     
                CierreCaja cc = new CierreCaja(rs.getString(1),rs.getString(2),
                                                rs.getFloat(3),rs.getString(4),
                                               rs.getString(5),rs.getString(6));
                lista.add(cc);
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
    public static CierreCaja mostrarCierreCaja2(Date fecha,int IdContrato)
    {
        CierreCaja l=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarCierreCajaP2(?,?)");
            cl.setDate(1,fecha);
            cl.setInt(2,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                l=new CierreCaja(rs.getFloat(1));
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
}
