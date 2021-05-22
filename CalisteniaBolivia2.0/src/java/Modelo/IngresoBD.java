/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;
import java.sql.*;
import java.util.ArrayList;
import Utils.Conexion;
import java.io.PrintWriter;
import static java.lang.System.out;
import java.math.BigDecimal;
/**
 *
 * @author YakuRocaH
 */
public class IngresoBD {
    public static Ingreso mostrarTotalIngresoDiarioCali(int IdContrato)
    {
        Ingreso ic=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalIngresoDiarioCali(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ic=new Ingreso(rs.getFloat(1));
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
        return ic;
    }
    public static Ingreso mostrarTotalIngresoDiarioBox(int IdContrato)
    {
        Ingreso ic=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalIngresoDiarioBoxeo(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ic=new Ingreso(rs.getFloat(1));
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
        return ic;
    }
    public static Ingreso mostrarTotalIngresoDiarioCali2(Date fecha,int IdContrato)
    {
        Ingreso ic=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalIngresoDiarioCali2(?,?)");
            cl.setDate(1,fecha);
            cl.setInt(2,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ic=new Ingreso(rs.getFloat(1));
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
        return ic;
    }
    public static Ingreso mostrarTotalIngresoDiarioBox(Date fecha,int IdContrato)
    {
        Ingreso ic=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalIngresoDiarioBox(?,?)");
            cl.setDate(1,fecha);
            cl.setInt(2,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ic=new Ingreso(rs.getFloat(1));
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
        return ic;
    }
    public static Ingreso mostrarTotalIngresoEfectivoCaliFechaXFecha(int IdContrato,Date fecha1,Date fecha2)
    {
        Ingreso ic=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalIngresoCaliEfectivoFechaXFecha(?,?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2,fecha1);
            cl.setDate(3,fecha2);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ic=new Ingreso(rs.getFloat(1));
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
        return ic;
    } 
    public static Ingreso mostrarTotalIngresoEfectivoBoxFechaXFecha(int IdContrato,Date fecha1,Date fecha2)
    {
        Ingreso ic=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalIngresoBoxEfectivoFechaXFecha(?,?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2,fecha1);
            cl.setDate(3,fecha2);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ic=new Ingreso(rs.getFloat(1));
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
        return ic;
    } 

    public static Ingreso mostrarTotalIngresoDiarioCaliTarjeta(int IdContrato)
    {
        Ingreso ic=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalIngresoDiarioTarjeta(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ic=new Ingreso(rs.getFloat(1));
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
        return ic;
    }
    public static Ingreso mostrarTotalIngresoDiarioBoxTarjeta(int IdContrato)
    {
        Ingreso ic=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalIngresoDiarioTarjetaBoxeo(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ic=new Ingreso(rs.getFloat(1));
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
        return ic;
    }
    public static Ingreso mostrarTotalIngresoDiarioCaliTarjeta2(Date fecha,int IdContrato)
    {
        Ingreso ic=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalIngresoDiarioTarjeta2(?,?)");
            cl.setDate(1,fecha);
            cl.setInt(2,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ic=new Ingreso(rs.getFloat(1));
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
        return ic;
    }
    public static Ingreso mostrarTotalIngresoDiarioBoxTarjeta2(Date fecha,int IdContrato)
    {
        Ingreso ic=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalIngresoDiarioTarjetaBox2(?,?)");
            cl.setDate(1,fecha);
            cl.setInt(2,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ic=new Ingreso(rs.getFloat(1));
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
        return ic;
    }
    public static Ingreso mostrarTotalIngresoCaliTarjetaFechaXFecha(int IdContrato,Date fecha1,Date fecha2)
    {
        Ingreso ic=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalIngresoTarjetaFechaXFecha(?,?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2,fecha1);
            cl.setDate(3,fecha2);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ic=new Ingreso(rs.getFloat(1));
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
        return ic;
    }
    public static Ingreso mostrarTotalIngresoBoxTarjetaFechaXFecha(int IdContrato,Date fecha1,Date fecha2)
    {
        Ingreso ic=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalIngresoBoxTarjetaFechaXFecha(?,?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2,fecha1);
            cl.setDate(3,fecha2);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ic=new Ingreso(rs.getFloat(1));
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
        return ic;
    }
    

public static ArrayList<Ingreso> mostrarIngresoDiarioCali(int IdContrato)
    {
        ArrayList<Ingreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarIngresoCali(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Ingreso i=new Ingreso(rs.getString(1),rs.getString(2),
                        rs.getDate(3),
                        rs.getFloat(4),rs.getString(5),rs.getString(6),rs.getString(7),rs.getString(8));
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
public static ArrayList<Ingreso> mostrarIngresoDiarioBox(int IdContrato)
    {
        ArrayList<Ingreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarIngresoBoxeo(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Ingreso i=new Ingreso(rs.getString(1),rs.getString(2),
                        rs.getDate(3),
                        rs.getFloat(4),rs.getString(5),rs.getString(6),rs.getString(7),rs.getString(8));
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
public static ArrayList<Ingreso> mostrarIngresoDiarioCali2(Date fecha,int IdContrato)
    {
        ArrayList<Ingreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarIngresoCali2(?,?)");
            cl.setDate(1,fecha);
            cl.setInt(2,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Ingreso i=new Ingreso(rs.getString(1),rs.getString(2),
                        rs.getDate(3),
                        rs.getFloat(4),rs.getString(5),rs.getString(6),rs.getString(7),rs.getString(8));
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
public static ArrayList<Ingreso> mostrarIngresoDiarioBox2(Date fecha,int IdContrato)
    {
        ArrayList<Ingreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarIngresoBoxeo2(?,?)");
            cl.setDate(1,fecha);
            cl.setInt(2,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Ingreso i=new Ingreso(rs.getString(1),rs.getString(2),
                        rs.getDate(3),
                        rs.getFloat(4),rs.getString(5),rs.getString(6),rs.getString(7),rs.getString(8));
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
public static ArrayList<Ingreso> mostrarIngresoEfectivoCaliFechaXFecha(int IdContrato,Date fecha1,Date fecha2)
    {
        ArrayList<Ingreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarIngresoCaliEfectivoFechaXFecha(?,?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2,fecha1);
            cl.setDate(3,fecha2);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Ingreso i=new Ingreso(rs.getString(1),rs.getString(2),
                        rs.getDate(3),
                        rs.getFloat(4),rs.getString(5),rs.getString(6));
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
public static ArrayList<Ingreso> mostrarIngresoEfectivoBoxFechaXFecha(int IdContrato,Date fecha1,Date fecha2)
    {
        ArrayList<Ingreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarIngresoBoxEfectivoFechaXFecha(?,?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2,fecha1);
            cl.setDate(3,fecha2);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Ingreso i=new Ingreso(rs.getString(1),rs.getString(2),
                        rs.getDate(3),
                        rs.getFloat(4),rs.getString(5),rs.getString(6));
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
public static ArrayList<Ingreso> mostrarIngresoEfectivoCaliFechaXFecha1(int IdContrato,Date fecha1,Date fecha2)
    {
        ArrayList<Ingreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalIngresoCaliEfectivoFechaXFecha1(?,?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2,fecha1);
            cl.setDate(3,fecha2);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Ingreso i=new Ingreso(rs.getFloat(1),rs.getDate(2));
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
public static ArrayList<Ingreso> mostrarIngresoEfectivoBoxFechaXFecha1(int IdContrato,Date fecha1,Date fecha2)
    {
        ArrayList<Ingreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalIngresoBoxEfectivoFechaXFecha1(?,?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2,fecha1);
            cl.setDate(3,fecha2);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Ingreso i=new Ingreso(rs.getFloat(1),rs.getDate(2));
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
public static ArrayList<Ingreso> mostrarIngresoDiarioCaliTarjeta(int IdContrato)
    {
        ArrayList<Ingreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarIngresoCaliTarjeta(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Ingreso i=new Ingreso(rs.getString(1),rs.getString(2),
                        rs.getDate(3),
                        rs.getFloat(4),rs.getString(5),rs.getString(6),rs.getString(7),
                        rs.getString(8),rs.getString(9));
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
public static ArrayList<Ingreso> mostrarIngresoDiarioBoxTarjeta(int IdContrato)
    {
        ArrayList<Ingreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarIngresoBoxeoTarjeta(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Ingreso i=new Ingreso(rs.getString(1),rs.getString(2),
                        rs.getDate(3),
                        rs.getFloat(4),rs.getString(5),rs.getString(6),rs.getString(7)
                        ,rs.getString(8),rs.getString(9));
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
public static ArrayList<Ingreso> mostrarIngresoDiarioCaliTarjeta2(Date fecha,int IdContrato)
    {
        ArrayList<Ingreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarIngresoCaliTarjeta2(?,?)");
            cl.setDate(1,fecha);
            cl.setInt(2,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Ingreso i=new Ingreso(rs.getString(1),rs.getString(2),
                        rs.getDate(3),
                        rs.getFloat(4),rs.getString(5),rs.getString(6),rs.getString(7),
                        rs.getString(8),rs.getString(9));
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
public static ArrayList<Ingreso> mostrarIngresoDiarioBoxTarjeta2(Date fecha,int IdContrato)
    {
        ArrayList<Ingreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarIngresoBoxeoTarjeta2(?,?)");
            cl.setDate(1,fecha);
            cl.setInt(2,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Ingreso i=new Ingreso(rs.getString(1),rs.getString(2),
                        rs.getDate(3),
                        rs.getFloat(4),rs.getString(5),rs.getString(6),rs.getString(7),
                        rs.getString(8),rs.getString(9));
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
public static ArrayList<Ingreso> mostrarIngresoCaliTarjetaFechaXFecha(int IdContrato,Date fecha1,Date fecha2)
    {
        ArrayList<Ingreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarIngresoCaliTarjetaFechaXFecha(?,?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2,fecha1);
            cl.setDate(3,fecha2);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Ingreso i=new Ingreso(rs.getString(1),rs.getString(2),
                        rs.getDate(3),
                        rs.getFloat(4),rs.getString(5),rs.getString(6),rs.getString(7));
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
public static ArrayList<Ingreso> mostrarIngresoBoxTarjetaFechaXFecha(int IdContrato,Date fecha1,Date fecha2)
    {
        ArrayList<Ingreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarIngresoBoxTarjetaFechaXFecha(?,?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2,fecha1);
            cl.setDate(3,fecha2);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Ingreso i=new Ingreso(rs.getString(1),rs.getString(2),
                        rs.getDate(3),
                        rs.getFloat(4),rs.getString(5),rs.getString(6),rs.getString(7));
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
public static ArrayList<Ingreso> mostrarIngresoCaliTarjetaFechaXFecha1(int IdContrato,Date fecha1,Date fecha2)
    {
        ArrayList<Ingreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalIngresoCaliTarjetaFechaXFecha1(?,?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2,fecha1);
            cl.setDate(3,fecha2);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Ingreso i=new Ingreso(rs.getFloat(1),rs.getDate(2));
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
public static ArrayList<Ingreso> mostrarIngresoBoxTarjetaFechaXFecha1(int IdContrato,Date fecha1,Date fecha2)
    {
        ArrayList<Ingreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalIngresoBoxTarjetaFechaXFecha1(?,?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2,fecha1);
            cl.setDate(3,fecha2);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Ingreso i=new Ingreso(rs.getFloat(1),rs.getDate(2));
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
public static Ingreso mostrarTotalIngresoPersonal(int IdContrato)
    {
        Ingreso ic=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalIngresoPersonal(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ic=new Ingreso(rs.getFloat(1));
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
        return ic;
    } 
public static Ingreso mostrarTotalIngresoPersonal2(Date fecha,int IdContrato)
    {
        Ingreso ic=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalIngresoPersonal2(?,?)");
            cl.setDate(1,fecha);
            cl.setInt(2,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ic=new Ingreso(rs.getFloat(1));
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
        return ic;
    } 
public static ArrayList<Ingreso> mostrarIngresoPersonal(int IdContrato)
    {
        ArrayList<Ingreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarIngresoPersonal(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Ingreso i=new Ingreso(rs.getString(1),rs.getString(2),
                        rs.getDate(3),
                        rs.getFloat(4),rs.getString(5));
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
public static ArrayList<Ingreso> mostrarIngresoPersonal2(Date fecha,int IdContrato)
    {
        ArrayList<Ingreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarIngresoPersonal2(?,?)");
            cl.setDate(1,fecha);
            cl.setInt(2,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Ingreso i=new Ingreso(rs.getString(1),rs.getString(2),
                        rs.getDate(3),
                        rs.getFloat(4),rs.getString(5));
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
    public static boolean CrearCaja(Ingreso ip)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call CrearCaja(?,?,?,?,?,?,?,?)");
            cl.setInt(1,Types.INTEGER);
            cl.setInt(2,Types.INTEGER);
            cl.setInt(3,Types.INTEGER);
            cl.setInt(4, ip.getIdContrato1());
            cl.setFloat(5,ip.getEfectivo());
            cl.setString(6, ip.getGlosa());
            cl.setInt(7, ip.getIdContrato2());
            cl.setInt(8, ip.getSucursal());
            int i=cl.executeUpdate();
            if(i==1)
            { rpta=true;
            //cn.commit();
            }
            else
            {rpta=false;
            }
        }
       catch(Exception e)
        {System.out.print(e);}
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
    public static boolean CrearCaja2(Ingreso ip)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        CallableStatement cl2=null;
        CallableStatement cl3=null;
        try
        {
            cl=cn.prepareCall("call GuardarCaja(?,?)");
            cl.setInt(1,Types.INTEGER);
            cl.setInt(2, ip.getIdContrato1());
            cl.executeUpdate();
            
            cl2=cn.prepareCall("call GuardarConceptoingresopersonal(?,?)");
            cl2.setInt(1,Types.INTEGER);
            cl2.setString(2, ip.getGlosa());
            cl2.executeUpdate();
            
            cl3=cn.prepareCall("call GuardarConceptoingresopersonal(?,?,?,?,?)");
            cl3.setInt(1,Types.INTEGER);
            cl3.setInt(2, cl.getInt(1));
            cl3.setFloat(3,ip.getEfectivo());
            cl3.setInt(4,ip.getIdContrato2());
            cl3.setInt(5,cl2.getInt(1));
            cl3.executeUpdate();
            
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
              if(cl2 !=null) cl2.close(); 
              if(cl3 !=null) cl3.close(); 
                if(cn!=null) cn.close();
            } catch (SQLException ex) {
                 System.err.println( ex.getMessage() );    
             }
         }
        return rpta;
    }
    public static boolean GuardarIngresoPersonal(Ingreso ip)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call GuardarIngresoPersonal(?,?,?,?,?,?)");
            cl.setInt(1,Types.INTEGER);
            cl.setInt(2,Types.INTEGER);
            cl.setInt(3, ip.getIdContrato1());
            cl.setFloat(4,ip.getEfectivo());
            cl.setString(5, ip.getGlosa());
            cl.setInt(6, ip.getIdContrato2());
            
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
    public static ArrayList<Ingreso> mostrarEliminarIngreso()
    {
        ArrayList<Ingreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarEliminarIngresos()");
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Ingreso i=new Ingreso(rs.getString(1),rs.getString(2),rs.getString(3),
                                      rs.getFloat(4),rs.getString(5),rs.getInt(6),
                                        rs.getInt(7),rs.getInt(8),rs.getInt(9),
                                        rs.getInt(10));
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
    public static ArrayList<Ingreso> mostrarEliminarIngresoTarjeta()
    {
        ArrayList<Ingreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarEliminarIngresosTarjeta()");
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Ingreso i=new Ingreso(rs.getString(1),rs.getString(2),rs.getString(3),
                                      rs.getFloat(4),rs.getString(5),rs.getString(6),
                                        rs.getString(7),rs.getInt(8),
                                        rs.getInt(9),rs.getInt(10),rs.getInt(11),
                                        rs.getInt(12));
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
    public static boolean EliminarIngreso(Ingreso ip)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        CallableStatement cl1=null;
        CallableStatement cl2=null;
        try
        {
            cl=cn.prepareCall("call GuardarViacoraIngreso(?,?,?,?,?,?,?)");
            cl.setInt(1,Types.INTEGER);
            cl.setString(2,ip.getNombre());
            cl.setString(3, ip.getApellido());
            cl.setString(4,ip.getPaquete());
            cl.setFloat(5,ip.getEfectivo());
            cl.setString(6,ip.getGlosa());
            cl.setString(7,ip.getNombrePer());
            cl.executeUpdate();
            
            cl1=cn.prepareCall("call EliminarCajaIn(?,?)");
            cl1.setInt(1,ip.getIdCaja());
            cl1.setFloat(2,ip.getEfectivo());
            cl1.executeUpdate();
            
            cl2=cn.prepareCall("call EliminarIngresoCaja(?)");
            cl2.setInt(1,ip.getIdIngresoCaja());  
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
              if(cl1 !=null) cl1.close(); 
              if(cl2 !=null) cl2.close(); 
                if(cn!=null) cn.close();
            } catch (SQLException ex) {
                 System.err.println( ex.getMessage() );    
             }
         }
        return rpta;
    }
    public static boolean EliminarIngresoTarjeta(Ingreso ip)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        CallableStatement cl2=null;
        CallableStatement cl3=null;
        CallableStatement cl4=null;
        CallableStatement cl5=null;
        CallableStatement cl6=null;
        try
        {
            cl=cn.prepareCall("call GuardarViacoraIngreso(?,?,?,?,?,?,?)");
            cl.setInt(1,Types.INTEGER);
            cl.setString(2,ip.getNombre());
            cl.setString(3, ip.getApellido());
            cl.setString(4,ip.getPaquete());
            cl.setFloat(5,ip.getEfectivo());
            cl.setString(6,ip.getGlosa());
            cl.setString(7,ip.getNombrePer());
            cl.executeUpdate();
                        
            cl2=cn.prepareCall("call EliminarRelacion(?)");
            cl2.setInt(1,ip.getRelacion()); 
            cl2.executeUpdate();
            
            cl3=cn.prepareCall("call EliminarContratoMembresia(?)");
            cl3.setInt(1,ip.getIdContrato1());
            cl3.executeUpdate();
            
            cl4=cn.prepareCall("call EliminarCuentaXCobrarMembresia(?)");
            cl4.setInt(1,ip.getIdContrato2());
            cl4.executeUpdate();
            
            cl5=cn.prepareCall("call EliminarIngresoCuentaXCobrar(?)");
            cl5.setInt(1,ip.getIdIngresoCuentaXCobrar());
            cl5.executeUpdate();
            
            cl6=cn.prepareCall("call EliminarIngresoTarjeta(?)");
            cl6.setInt(1,ip.getIdIngresoCaja());  
            int i=cl6.executeUpdate();
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
              if(cl3 !=null) cl3.close(); 
              if(cl4 !=null) cl4.close(); 
              if(cl5 !=null) cl5.close();
              if(cl6 !=null) cl6.close(); 
                if(cn!=null) cn.close();
            } catch (SQLException ex) {
                 System.err.println( ex.getMessage() );    
             }
         }
        return rpta;
    }
    public static boolean GuardarOtroIngreso(Ingreso ip)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        CallableStatement cl5=null;
        CallableStatement cl3=null;
        CallableStatement cl4=null;
        int es = 0;
        try
        {
            cl=cn.prepareCall("call GuardarOtroIngreso(?,?,?,?)");
            cl.setInt(1,Types.INTEGER);
            cl.setFloat(2,ip.getEfectivo());
            cl.setString(3, ip.getGlosa());
            cl.setInt(4, ip.getIdCaja());
            cl.executeUpdate();
            cl5=cn.prepareCall("call estadoCaja(?)");
            cl5.setInt(1,ip.getIdCaja());
            ResultSet rs5= cl5.executeQuery();
            rs5.next();   
            es = rs5.getInt(1);
            System.out.println(es);
            if(es==0){
                cl3=cn.prepareCall("call getOtroIngreso(?)");
                cl3.setInt(1,ip.getIdCaja());
                ResultSet rs= cl3.executeQuery();
                rs.next();      
                double eg = rs.getDouble(1);
                eg = eg + ip.getEfectivo();
                System.out.println(eg);
                cl4=cn.prepareCall("call updateOtroIngreso(?,?)");
                cl4.setDouble(1, eg);
                cl4.setInt(2,ip.getIdCaja());
                cl4.executeUpdate();
            }
            rpta=true;
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
    public static Ingreso mostrarTotalOtroIngreso(int IdContrato)
    {
        Ingreso ic=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalOtroIngreso(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ic=new Ingreso(rs.getFloat(1));
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
        return ic;
    } 
    public static ArrayList<Ingreso> mostrarOtroIngreso(int IdContrato)
    {
        ArrayList<Ingreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarOtroIngreso(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Ingreso i=new Ingreso(rs.getInt(1),rs.getDate(2),
                        rs.getFloat(3),
                        rs.getString(4),rs.getInt(5));
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
    public static Ingreso mostrarTotalOtroIngresoXFecha(int IdContrato,Date fecha)
    {
        Ingreso ic=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalOtroIngresoXFecha(?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2,fecha);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ic=new Ingreso(rs.getFloat(1));
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
        return ic;
    }
    public static ArrayList<Ingreso> mostrarOtroIngresoXFecha(int IdContrato,Date fecha)
    {
        ArrayList<Ingreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarOtroIngresoXFecha(?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2,fecha);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Ingreso i=new Ingreso(rs.getInt(1),rs.getDate(2),
                        rs.getFloat(3),
                        rs.getString(4),rs.getInt(5));
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
    
    public static ArrayList mostrarIngresoC(Date fecha)
    {
        ArrayList l = new ArrayList();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call mostrarIngresoC11(?)");
            cl.setDate(1,fecha);
            ResultSet rs=cl.executeQuery();
            
            while(rs.next())
            {
                int id=rs.getInt(1);
                String nombre = rs.getString(2)+" "+rs.getString(3);
                double monto=rs.getDouble(4);
                String glosa=rs.getString(5);
                String paquete=rs.getString(6);
                int tipoIngreso=rs.getInt(7);
                String caja = rs.getString(8);
                int idPaquete = rs.getInt(9);
                int idCaja = rs.getInt(10);
                l.add(id);
                l.add(nombre);
                l.add(monto);
                l.add(glosa);
                l.add(paquete);
                l.add(tipoIngreso);
                l.add(caja);
                l.add(idPaquete);
                l.add(idCaja);
            }
            cl=cn.prepareCall("call mostrarIngresoC12(?)");
            cl.setDate(1,fecha);
            rs=cl.executeQuery();
            
            while(rs.next())
            {
                int id=rs.getInt(1);
                String nombre = rs.getString(2)+" "+rs.getString(3);
                double monto=rs.getDouble(4);
                String glosa="Ingreso por tarjeta";
                String paquete=rs.getString(5);
                int tipoIngreso=rs.getInt(6);
                String caja=rs.getString(7);
                int idPaquete=rs.getInt(8);
                int idCaja = rs.getInt(9);
                l.add(id);
                l.add(nombre);
                l.add(monto);
                l.add(glosa);
                l.add(paquete);          
                l.add(tipoIngreso);
                l.add(caja);
                l.add(idPaquete);
                l.add(idCaja);
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
        return l;
    }
    
    public static boolean ModificarIngresoC(Ingreso ep, Date fecha, int idCaja)
    {
        boolean rpta=false;
         Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        CallableStatement cl0=null;
        CallableStatement cl1=null;
        CallableStatement cl2=null;
        CallableStatement cl3=null;
        CallableStatement cl4=null;
        CallableStatement cl5=null;
        CallableStatement cl6=null;
        
        try
        {
            System.out.println(ep.getTipoPago());
            if(ep.getTipoPago()>1){
            cl5=cn.prepareCall("call modificarIngresoTarjeta(?,?)");
            cl5.setDouble(2, ep.getEfectivo());
            cl5.setInt(1, ep.getIdIngresoCaja());            
            cl5.executeUpdate();
                //System.out.println("Correcto");
            }else{
            System.out.println("------------------------------------------------");
            cl5=cn.prepareCall("call modificarIngresoCaja(?,?,?)");
            cl5.setInt(1, ep.getIdIngresoCaja());
            cl5.setDouble(2, ep.getEfectivo());
            cl5.setString(3, ep.getGlosa());
            cl5.executeUpdate();
            }
            System.out.println("------------------------------------------------");
            /*cl=cn.prepareCall("call ingresosCaliEfec(?,?)");
            cl.setDate(1,fecha);
            cl.setFloat(2,ep.getIdCaja());
            ResultSet rs=cl.executeQuery();
            System.out.println(rs.getFloat(1));
            //float f=rs.getFloat(1);
            //Double m1=rs.getDouble("SUM(ic.efectivo)");
            System.out.println("------------------------------------------------");
            //System.out.println(f);
            
            cl0=cn.prepareCall("call ingresosCaliTar(?,?)");
            cl0.setDate(1,fecha);
            cl0.setFloat(2,ep.getIdCaja());
            rs=cl0.executeQuery();
            
            double m2=rs.getDouble(1);
            System.out.println("------------------------------------------------");
            
            cl1=cn.prepareCall("call ingresosBoxEfec(?,?)"); 
            cl1.setDate(1,fecha);
            cl1.setFloat(2,ep.getIdCaja());
            rs=cl1.executeQuery();
            
            double m3=rs.getDouble(1);
            
            cl2=cn.prepareCall("call ingresosBoxTar(?,?)"); 
            cl2.setDate(1,fecha);
            cl2.setFloat(2,ep.getIdCaja());
            rs=cl2.executeQuery();
            
            double m4=rs.getDouble(1);
            
            cl3=cn.prepareCall("call otrosIngresos(?,?)"); 
            cl3.setDate(1,fecha);
            cl3.setFloat(2,ep.getIdCaja());
            rs=cl3.executeQuery();
            
            double m5=rs.getDouble(1);
            
            cl4=cn.prepareCall("call actualizarMontos(?,?,?,?,?,?,?)");
            cl4.setDouble(1,m1);
            cl4.setDouble(2,m2);
            cl4.setDouble(3,m3);
            cl4.setDouble(4,m4);
            cl4.setDouble(5,m5);
            cl4.setDate(6,ep.getFechaIngreso());
            cl4.setFloat(7,ep.getIdCaja());
            cl4.executeUpdate(); */
            cl4=cn.prepareCall("call updateMonto(?,?)");
            cl4.setDate(1,ep.getFechaIngreso());
            System.out.println(idCaja);
            cl4.setInt(2,idCaja);
            cl4.executeUpdate();
            cl6=cn.prepareCall("call updateCierreCaja(?)");
            cl6.setInt(1,idCaja);
            cl6.executeUpdate();
            System.out.println("Correcto");
        }
       catch(Exception e)
        {System.out.println(e);}
        finally{
             System.out.println( "cierra conexion a la base de datos" );    
           try {
              if(cl !=null) cl.close(); 
              if(cl0 !=null) cl0.close();
              if(cl1 !=null) cl1.close();
              if(cl2 !=null) cl2.close();
              if(cl3 !=null) cl3.close();
              if(cl4 != null) cl4.close();
              if(cl5 != null) cl5.close();
              if(cl6 != null) cl6.close();
                if(cn!=null) cn.close();
            } catch (SQLException ex) {
                 System.err.println( ex.getMessage() );    
             }
         }
        return rpta;
    }
}
