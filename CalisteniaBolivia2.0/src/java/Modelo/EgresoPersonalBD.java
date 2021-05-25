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
public class EgresoPersonalBD {
         public static boolean GuardarEgresoPersonal(EgresoPersonal ep)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call GuardarEgresoPersonal(?,?,?,?,?,?)");
            cl.setInt(1,Types.INTEGER);
            cl.setInt(2,Types.INTEGER);
            cl.setInt(3, ep.getIdCaja());
            cl.setInt(4,ep.getIdContratoPersonal());
            cl.setFloat(5, ep.getMonto());
            cl.setString(6, ep.getObservacion());
            
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
         public static boolean ModificarEgresoPersonalA(EgresoPersonal ep)
    {
        boolean rpta=false;
         Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        CallableStatement cl0=null;
        CallableStatement cl2=null;
        try
        {
            cl=cn.prepareCall("call ActualizarCajaE(?,?,?)");
            cl.setInt(1,ep.getIdCaja());
            cl.setInt(2,ep.getEgresoCaja());
            cl.setString(3,ep.getObservacion());
            cl.executeUpdate();
            
            cl0=cn.prepareCall("call ActualizarConceptoEgreso(?,?)"); 
            cl0.setInt(1,ep.getIdConceptoEgresoPersonal());
            cl0.setString(2,ep.getObservacion());
            cl0.executeUpdate();

            int i=0;
            cl2=cn.prepareCall("call ActualizarEgreso(?,?,?)");
            cl2.setInt(1,ep.getEgresoCaja());
            cl2.setInt(2,ep.getIdCaja());
            cl2.setFloat(3,ep.getMonto());
            i=cl2.executeUpdate();
            
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
              if(cl0 !=null) cl0.close();
              if(cl2 !=null) cl2.close();
                if(cn!=null) cn.close();
            } catch (SQLException ex) {
                 System.err.println( ex.getMessage() );    
             }
         }
        return rpta;
    }
         public static boolean ModificarEgresoPersonalC(EgresoPersonal ep)
    {
        boolean rpta=false;
         Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        CallableStatement cl0=null;
        CallableStatement cl1=null;
        CallableStatement cl2=null;
        CallableStatement cl3=null;
        try
        {
            cl=cn.prepareCall("call ActualizarTotalMontos(?,?)");
            cl.setInt(1,ep.getIdCaja());
            cl.setFloat(2,ep.getEgresoCaja());
            cl.executeUpdate();
            
            cl0=cn.prepareCall("call ActualizarCajaEC(?,?,?,?)");
            cl0.setInt(1,ep.getIdCaja());
            cl0.setInt(2,ep.getEgresoCaja());
            cl0.setString(3,ep.getObservacion());
            cl0.setInt(4,ep.getCierreCaja());
            cl0.executeUpdate();
            
            cl1=cn.prepareCall("call ActualizarConceptoEgreso(?,?)"); 
            cl1.setInt(1,ep.getIdConceptoEgresoPersonal());
            cl1.setString(2,ep.getObservacion());
            cl1.executeUpdate();
            
            cl2=cn.prepareCall("call ActualizarTotalMontos2(?,?,?)"); 
            cl2.setInt(1,ep.getEgresoCaja());
            cl2.setInt(2,ep.getIdCaja());
            cl2.setFloat(3,ep.getMonto());
            cl2.executeUpdate();
            
            int i=0;
            cl3=cn.prepareCall("call ActualizarEgresoCierre(?,?,?,?)");
            cl3.setInt(1,ep.getEgresoCaja());
            cl3.setInt(2,ep.getIdCaja());
            cl3.setFloat(3,ep.getMonto());
            cl3.setInt(4,ep.getCierreCaja());
            i=cl3.executeUpdate();
            

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
              if(cl0 !=null) cl0.close();
              if(cl1 !=null) cl1.close();
              if(cl2 !=null) cl2.close();
              if(cl3 !=null) cl3.close();
                if(cn!=null) cn.close();
            } catch (SQLException ex) {
                 System.err.println( ex.getMessage() );    
             }
         }
        return rpta;
    }
         public static EgresoPersonal mostrarTotalEgresoPersonal(int IdContrato)
    {
        EgresoPersonal ep=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalEgresoPersonal(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ep=new EgresoPersonal(rs.getFloat(1));
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
        return ep;
    } 
         public static EgresoPersonal mostrarTotalEgresoPersonal2(Date fecha,int IdContrato)
    {
        EgresoPersonal ep=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalEgresoPersonal2(?,?)");
            cl.setDate(1,fecha);
            cl.setInt(2,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ep=new EgresoPersonal(rs.getFloat(1));
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
        return ep;
    } 
         public static EgresoPersonal mostrarTotalEgresoPersonalFechaXFecha(int IdContrato,Date fecha1,Date fecha2)
    {
        EgresoPersonal ep=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalEgresoPersonalFechaXFecha(?,?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2,fecha1);
            cl.setDate(3,fecha2);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ep=new EgresoPersonal(rs.getFloat(1));
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
        return ep;
    } 
    public static ArrayList<EgresoPersonal> mostrarEgresoDiarioPersonal(int IdContrato)
    {
        ArrayList<EgresoPersonal> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarEgresoPersonal(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoPersonal eg=new EgresoPersonal(rs.getString(1),rs.getString(2),
                        rs.getString(3),
                        rs.getFloat(4),rs.getString(5));
                lista.add(eg); 
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
    public static ArrayList<EgresoPersonal> mostrarEgresoDiarioPersonal2(Date fecha,int IdContrato)
    {
        ArrayList<EgresoPersonal> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarEgresoPersonal2(?,?)");
            cl.setDate(1,fecha);
            cl.setInt(2,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoPersonal eg=new EgresoPersonal(rs.getString(1),rs.getString(2),
                        rs.getString(3),
                        rs.getFloat(4),rs.getString(5));
                lista.add(eg); 
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
    public static ArrayList<EgresoPersonal> mostrarEgresoPersonalFechaXFecha(int IdContrato,Date fecha1,Date fecha2)
    {
        ArrayList<EgresoPersonal> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarEgresoPersonalFechaXFecha(?,?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2,fecha1);
            cl.setDate(3,fecha2);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoPersonal eg=new EgresoPersonal(rs.getString(1),rs.getString(2),
                        rs.getString(3),
                        rs.getFloat(4),rs.getString(5));
                lista.add(eg); 
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
    public static ArrayList<EgresoPersonal> mostrarEgresoDiarioPersonalC(Date fecha,int IdContrato)
    {
        ArrayList<EgresoPersonal> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarEgresoPersonalFechaIn(?,?)");
            cl.setDate(1,fecha);
            cl.setInt(2,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoPersonal eg=new EgresoPersonal(rs.getString(1),rs.getString(2),
                        rs.getString(3),
                        rs.getFloat(4),rs.getString(5),rs.getInt(6),rs.getInt(7),rs.getInt(8),rs.getInt(9),rs.getInt(10));
                lista.add(eg); 
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
    public static ArrayList<EgresoPersonal> mostrarEgresoDiarioPersonalA(Date fecha,int IdContrato)
    {
        ArrayList<EgresoPersonal> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarEgresoPersonalFechaA(?,?)");
            cl.setDate(1,fecha);
            cl.setInt(2,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoPersonal eg=new EgresoPersonal(rs.getString(1),rs.getString(2),
                        rs.getString(3),
                        rs.getFloat(4),rs.getString(5),rs.getInt(6),rs.getInt(7),rs.getInt(8),rs.getInt(9));
                lista.add(eg); 
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
    public static ArrayList<EgresoPersonal> mostrarEliminarEgreso()
    {
        ArrayList<EgresoPersonal> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarEliminarEgreso");
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoPersonal eg=new EgresoPersonal(rs.getString(1),rs.getString(2),
                        rs.getFloat(3),
                        rs.getString(4),rs.getInt(5),rs.getInt(6),rs.getInt(7),rs.getInt(8));
                lista.add(eg); 
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
public static boolean EliminarEgreso(EgresoPersonal ip)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        CallableStatement cl1=null;

        try
        {
            cl=cn.prepareCall("call EliminarCajaEg(?,?)");
            cl.setInt(1,ip.getIdCaja());
            cl.setFloat(2,ip.getMonto());
            cl.executeUpdate();

            cl1=cn.prepareCall("call EliminarEgresoCaja(?)");
            cl1.setInt(1,ip.getEgresoCaja());  
            int i=cl1.executeUpdate();
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
                if(cn!=null) cn.close();
            } catch (SQLException ex) {
                 System.err.println( ex.getMessage() );    
             }
         }
        return rpta;
    }
public static boolean GuardarOtroEgreso(EgresoPersonal ep)
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
            cl=cn.prepareCall("call GuardarOtroEgreso(?,?,?,?)");
            cl.setInt(1,Types.INTEGER);
            cl.setFloat(2, ep.getMonto());
            cl.setString(3, ep.getObservacion());
            cl.setInt(4, ep.getIdCaja());
            int i=cl.executeUpdate();
            
            cl5=cn.prepareCall("call estadoCaja(?)");
            cl5.setInt(1,ep.getIdCaja());
            ResultSet rs5= cl5.executeQuery();
            rs5.next();   
            es = rs5.getInt(1);
            System.out.println(es);
            if(es==0){
                cl3=cn.prepareCall("call getOtroEgreso(?)");
                cl3.setInt(1,ep.getIdCaja());
                ResultSet rs= cl3.executeQuery();
                rs.next();      
                double eg = rs.getDouble(1);
                eg = eg + ep.getMonto();
                System.out.println(eg);
                cl4=cn.prepareCall("call updateOtroEgresoMT(?,?)");
                cl4.setDouble(1, eg);
                cl4.setInt(2,ep.getIdCaja());
                cl4.executeUpdate();
            }
            
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
public static EgresoPersonal mostrarTotalOtroEgreso(int IdContrato)
    {
        EgresoPersonal ep=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalOtroEgreso(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ep=new EgresoPersonal(rs.getFloat(1));
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
        return ep;
    } 
public static ArrayList<EgresoPersonal> mostrarOtroEgresoDiario(int IdContrato)
    {
        ArrayList<EgresoPersonal> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarOtroEgreso(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoPersonal eg=new EgresoPersonal(rs.getInt(1),rs.getFloat(2),
                        rs.getString(3),rs.getString(4));
                lista.add(eg); 
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
public static EgresoPersonal mostrarTotalOtroEgreso2(int IdContrato,Date fecha)
    {
        EgresoPersonal ep=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalOtroEgresoXFecha(?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2,fecha);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ep=new EgresoPersonal(rs.getFloat(1));
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
        return ep;
    } 
public static ArrayList<EgresoPersonal> mostrarOtroEgresoxFecha(int IdContrato,Date fecha)
    {
        ArrayList<EgresoPersonal> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarOtroEgresoXFecha(?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2,fecha);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoPersonal eg=new EgresoPersonal(rs.getInt(1),rs.getFloat(2),
                        rs.getString(3),rs.getString(4));
                lista.add(eg); 
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
public static boolean EliminarOtroEgresoAc(EgresoPersonal ip)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        CallableStatement cl1=null;

        try
        {
            cl=cn.prepareCall("call GuardarVitacoraOtroEgresoEliminado(?,?,?,?)");
            cl.setInt(1, Types.INTEGER);
            cl.setFloat(2,ip.getMonto());
            cl.setString(3,ip.getObservacion());
            cl.setString(4,ip.getFecha());
            cl.executeUpdate();
            
            cl1=cn.prepareCall("call EliminarOtroEgresoActivo(?)");
            cl1.setInt(1,ip.getIdEgresoPersonal());
            int i =cl1.executeUpdate();
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
                if(cn!=null) cn.close();
            } catch (SQLException ex) {
                 System.err.println( ex.getMessage() );    
             }
         }
        return rpta;
    }
public static ArrayList<EgresoPersonal> mostrarEliminarOtroEgresoInact(int IdContrato,Date fecha)
    {
        ArrayList<EgresoPersonal> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarEliminarOtroEgresoInact(?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2,fecha);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoPersonal eg=new EgresoPersonal(rs.getInt(1),rs.getFloat(2),
                        rs.getString(3),rs.getString(4),rs.getInt(5));
                lista.add(eg); 
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
public static boolean EliminarOtroEgresoInact(EgresoPersonal ip)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        CallableStatement cl1=null;
        CallableStatement cl2=null;
        try
        {
            cl=cn.prepareCall("call EliminarOtroEgresoTotal(?,?)");
            cl.setInt(1,ip.getIdCaja());
            cl.setFloat(2,ip.getMonto());
            cl.executeUpdate();
            
            cl1=cn.prepareCall("call GuardarVitacoraOtroEgresoEliminado(?,?,?,?)");
            cl1.setInt(1, Types.INTEGER);
            cl1.setFloat(2,ip.getMonto());
            cl1.setString(3,ip.getObservacion());
            cl1.setString(4,ip.getNombre());
            cl1.executeUpdate();
            
            cl2=cn.prepareCall("call EliminarOtroEgresoActivo(?)");
            cl2.setInt(1,ip.getIdEgresoPersonal());
            int i =cl2.executeUpdate();
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
               if(cl1 !=null) cl1.close();
                if(cl2 !=null) cl2.close();
                if(cn!=null) cn.close();
            } catch (SQLException ex) {
                 System.err.println( ex.getMessage() );    
             }
         }
        return rpta;
    }

public static boolean EliminarOtroEgreso(int idEgreso, int idCaja)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        CallableStatement cl1=null;
        try
        {
            cl=cn.prepareCall("call eliminarOtroEgreso(?)");
            cl.setInt(1,idEgreso);
            cl.executeUpdate();
            cl1=cn.prepareCall("call updateOtroEgreso(?)");
            cl1.setInt(1,idCaja);
            cl1.executeUpdate();
        }
       catch(Exception e)
        {System.out.println(e);}
        finally{
             System.out.println( "cierra conexion a la base de datos" );    
           try {
               if(cl !=null) cl.close();
               if(cl1 !=null) cl1.close();
                if(cn!=null) cn.close();
            } catch (SQLException ex) {
                 System.err.println( ex.getMessage() );    
             }
         }
        return rpta;
    }

public static boolean EliminarEgresoChequeTrans(int idEgreso, int idCaja)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        CallableStatement cl1=null;
        try
        {
            cl=cn.prepareCall("call eliminarEgresoChequeTrans(?)");
            cl.setInt(1,idEgreso);
            cl.executeUpdate();
            cl1=cn.prepareCall("call updateEgresoChequeTrans(?)");
            cl1.setInt(1,idCaja);
            cl1.executeUpdate();
        }
       catch(Exception e)
        {System.out.println(e);}
        finally{
             System.out.println( "cierra conexion a la base de datos" );    
           try {
               if(cl !=null) cl.close();
               if(cl1 !=null) cl1.close();
                if(cn!=null) cn.close();
            } catch (SQLException ex) {
                 System.err.println( ex.getMessage() );    
             }
         }
        return rpta;
    }

public static boolean EliminarEgresoChequeTransPro(int idEgreso, int idCaja)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        CallableStatement cl1=null;
        try
        {
            cl=cn.prepareCall("call eliminarEgresoChequeTrans(?)");
            cl.setInt(1,idEgreso);
            cl.executeUpdate();
            cl1=cn.prepareCall("call updateEgresoChequeTrans(?)");
            cl1.setInt(1,idCaja);
            cl1.executeUpdate();
        }
       catch(Exception e)
        {System.out.println(e);}
        finally{
             System.out.println( "cierra conexion a la base de datos" );    
           try {
               if(cl !=null) cl.close();
               if(cl1 !=null) cl1.close();
                if(cn!=null) cn.close();
            } catch (SQLException ex) {
                 System.err.println( ex.getMessage() );    
             }
         }
        return rpta;
    }
}
