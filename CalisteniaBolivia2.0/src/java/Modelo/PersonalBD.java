package Modelo;
import java.sql.*;
import java.util.ArrayList;
import Utils.Conexion;
public class PersonalBD {
     public static boolean guardarPersonalContrato(Personal p)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call GuardarPersonalContrato(?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
            cl.setInt(1,Types.INTEGER);
            cl.setInt(2,Types.INTEGER);
            cl.setString(3, p.getNombrePersonal());
            cl.setString(4,p.getApellidoPersonal());
            cl.setString(5,p.getEdad());
            cl.setInt(6,p.getCI());
            cl.setString(7,p.getTelefono());
            cl.setString(8,p.getCorreo());
            cl.setString(9,p.getImagen());
            cl.setDate(10,p.getFechaIniContrato());
            cl.setDate(11,p.getFechaFinContrato());
            cl.setString(12,p.getObservacion());
            cl.setInt(13,p.getIdCargo());
            cl.setInt(14,p.getIdSucursal());
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
     public static boolean modificarPersonalContrato(Personal p,int sucursal)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call ModificarDatosPersonalContrato(?,?,?,?,?,?,?)");
            cl.setInt(1, p.getIdContacto());
            cl.setInt(2, p.getIdPersonal());
            cl.setString(3, p.getNombrePersonal());
            cl.setString(4, p.getApellidoPersonal());
            cl.setString(5, p.getTelefono());
            cl.setString(6, p.getCorreo());
            cl.setInt(7, sucursal);
            
            int i=cl.executeUpdate();
            return true;
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
    public static ArrayList<Personal> mostrarPersonalContratoACtivo()
    {
        ArrayList<Personal> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarVentaPersonalContratoActivo()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
                Personal p = new Personal(rs.getInt(1),rs.getInt(2),rs.getString(3),rs.getString(4),
                                             rs.getString(5),rs.getInt(6),rs.getString(7),rs.getString(8),
                                            rs.getString(9),rs.getDate(10),rs.getDate(11),rs.getString(12),
                                            rs.getString(13),rs.getString(14),rs.getInt(15));
                lista.add(p);
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
    public static Personal mostrarPersonal(int idPersonal)
    {    
        Personal clt=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarPersonalContratoActivoId(?)");
            cl.setInt(1,idPersonal);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                clt=new Personal(rs.getInt(1),rs.getInt(2),rs.getString(3),rs.getString(4),
                                             rs.getString(5),rs.getInt(6),rs.getString(7),rs.getString(8),
                                            rs.getString(9),rs.getDate(10),rs.getDate(11),rs.getString(12),
                                            rs.getString(13),rs.getString(14),rs.getInt(15));
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
    public static Personal mostrarCantidadPersonalContratoACtivo(int IdSucursal)
    {
        Personal p=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarCantidadPersonal(?)");
            cl.setInt(1,IdSucursal);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                p=new Personal(rs.getInt(1));
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
    public static ArrayList<Personal> mostrarPersonalP()
    {
        ArrayList<Personal> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarPersonal()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
                Personal p = new Personal(rs.getInt(1),rs.getString(2),rs.getString(3));
                lista.add(p);
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
    public static Personal mostrarPersonal2(int idPersonal)
    {    
        Personal clt=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarPersonalId(?)");
            cl.setInt(1,idPersonal);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                clt=new Personal(rs.getInt(1),rs.getString(2),rs.getString(3));
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
    
    
    public static ArrayList<Personal> mostrarPersonalCaja(Date d)
    {
        ArrayList<Personal> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call personalCaja(?)");
            cl.setDate(1,d);
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
                Personal p = new Personal(rs.getInt(1),rs.getInt(2),rs.getString(3),rs.getString(4),
                                             rs.getString(5),rs.getInt(6),rs.getString(7),rs.getString(8),
                                            rs.getString(9),rs.getDate(10),rs.getDate(11),rs.getString(12),
                                            rs.getString(13),rs.getString(14),rs.getInt(15));
                lista.add(p);
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
    public static ArrayList<String> mostrarDetalleEgresoCaja(Date f, int idP)
    {
        ArrayList detalle =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call CajaFecha(?,?)");
            cl.setDate(1,f);
            cl.setInt(2, idP);
            ResultSet rs = cl.executeQuery();
            rs.next();
            int idCaja = rs.getInt(1);
            cl=cn.prepareCall("call mostrarEgresoCaja(?)");
            cl.setInt(1, idCaja);
            ResultSet rs1 = cl.executeQuery();
            while(rs1.next())
            {            
                detalle.add(rs1.getInt(1));
                detalle.add(rs1.getDouble(2));
                detalle.add(rs1.getString(3));               
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
        return detalle;
    }
    public static ArrayList<String> mostrarDetalleIngresoCaja(Date f, int idP)
    {
        ArrayList detalle =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call CajaFecha(?,?)");
            cl.setDate(1,f);
            cl.setInt(2, idP);
            ResultSet rs = cl.executeQuery();
            rs.next();
            int idCaja = rs.getInt(1);
            cl=cn.prepareCall("call mostrarIngresoCaja2(?)");
            cl.setInt(1, idCaja);
            ResultSet rs1 = cl.executeQuery();
            while(rs1.next())
            {            
                detalle.add(rs1.getInt(1));
                detalle.add(rs1.getDouble(2));
                detalle.add(rs1.getString(3));               
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
        return detalle;
    }
    public static ArrayList mostrarDetalleEgresoCaja2(int id)
    {
        ArrayList detalle =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call mostrarEgresoCaja2(?)");
            cl.setInt(1, id);
            ResultSet rs1 = cl.executeQuery();
            while(rs1.next())
            {            
                detalle.add(id);
                detalle.add(rs1.getDouble(1));
                detalle.add(rs1.getString(2));                         
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
        return detalle;
    }
    
    public static boolean modificarEgreso(ArrayList lista)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call modificarEgresoCaja(?,?,?)");
            cl.setInt(1, (Integer) lista.get(0)); 
            cl.setDouble(2, (Double) lista.get(1));
            cl.setString(3, (String) lista.get(2));
               
            System.out.println((Integer) lista.get(0));
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
    
    public static ArrayList mostrarDetalleIngresoCaja2(int id)
    {
        ArrayList detalle =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call mostrarIngresoCaja3(?)");
            cl.setInt(1, id);
            ResultSet rs1 = cl.executeQuery();
            while(rs1.next())
            {            
                detalle.add(id);
                detalle.add(rs1.getDouble(1));
                detalle.add(rs1.getString(2));                         
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
        return detalle;
    }
    
    public static boolean modificarIngreso(ArrayList lista)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call modificarIngresoCaja(?,?,?)");
            cl.setInt(1, (Integer) lista.get(0)); 
            cl.setDouble(2, (Double) lista.get(1));
            cl.setString(3, (String) lista.get(2));
            System.out.println((Integer) lista.get(0));
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
    
    public static String mostrarPersonalN(int IdPersonal)
    {
        String s="";
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call personalNombre(?)");
            cl.setInt(1,IdPersonal);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                String n = rs.getString(1);
                n = n + " " +rs.getString(2); 
                s=n;
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
}
