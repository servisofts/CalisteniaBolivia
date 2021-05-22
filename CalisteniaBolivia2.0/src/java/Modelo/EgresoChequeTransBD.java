/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

import Utils.Conexion;
import static com.sun.org.apache.xalan.internal.lib.ExsltDatetime.date;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;

/**
 *
 * @author YakuRocaH
 */
public class EgresoChequeTransBD {
    
    public static boolean GuardarEgresoChequeTrans(ArrayList<EgresoChequeTrans> co)
     {
          boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        CallableStatement cl2=null;
        CallableStatement cl3=null;
        CallableStatement cl4=null;
        CallableStatement cl5=null;
        int es=0;
         try
         {
             for(EgresoChequeTrans cm: co) {
                 switch(cm.getTipoPago())
                 {
                     case "CHEQUE":
             
             int i2=0;
             cl=cn.prepareCall("call GuardarEgresoChequeTransPerCheque(?,?,?,?,?,?,?)");
                 cl.setInt(1, Types.INTEGER);
                 cl.setFloat(2,cm.getMonto());
                 cl.setString(3,cm.getObservacion());
                 cl.setString(4,cm.getTipoPago());
                 cl.setString(5,cm.getNumero());
                 cl.setInt(6,cm.getIdP());
                 cl.setInt(7,cm.getIdCaja());
                 i2=cl.executeUpdate();
            cl5=cn.prepareCall("call estadoCaja(?)");
            cl5.setInt(1,cm.getIdCaja());
            ResultSet rs5= cl5.executeQuery();
            rs5.next();   
            es = rs5.getInt(1);
            if(es==0){
                
            cl3=cn.prepareCall("call getEgresoCTPer(?)");
            cl3.setInt(1,cm.getIdCaja());
            ResultSet rs= cl3.executeQuery();
            rs.next();      
            double eg = rs.getDouble(1);
                         System.out.println(eg);
            double eg2 = rs.getDouble(2);
                         System.out.println(eg2);
            eg = eg + cm.getMonto();           
            //eg2 = eg2 - cm.getMonto();          
            cl4=cn.prepareCall("call updateEgresoCTPer(?,?)");
            cl4.setDouble(1, eg);
            cl4.setInt(2,cm.getIdCaja());
            cl4.executeUpdate();
            }
            rpta=true;
             break;
                     case "TRANSFERENCIA" :
                         
            int i3=0;
             cl2=cn.prepareCall("call GuardarEgresoChequeTransPerEnti(?,?,?,?,?,?,?,?)");           
                 cl2.setInt(1, Types.INTEGER);
                 cl2.setFloat(2,cm.getMonto());
                 cl2.setString(3,cm.getObservacion());
                 cl2.setString(4,cm.getTipoPago());
                 cl2.setString(5,cm.getNumero());
                 cl2.setInt(6,cm.getIdP());
                 cl2.setInt(7,cm.getEntidadFinanciera().getIdEntidadFinanciera());
                 cl2.setInt(8,cm.getIdCaja());
                 i3=cl2.executeUpdate();
            cl5=cn.prepareCall("call estadoCaja(?)");
            cl5.setInt(1,cm.getIdCaja());
            ResultSet rs6= cl5.executeQuery();
            rs6.next();   
            es = rs6.getInt(1);
            if(es==0){
                 cl3=cn.prepareCall("call getEgresoCTPer(?)");
            cl3.setInt(1,cm.getIdCaja());
            ResultSet rs1= cl3.executeQuery();
            rs1.next();      
            double eg1 = rs1.getDouble(1);
                         //System.out.println(eg1);
            double eg12 = rs1.getDouble(2);
                         //System.out.println(eg12);
            eg1 = eg1 + cm.getMonto();
            //eg12 = eg12 - cm.getMonto();
            
            cl4=cn.prepareCall("call updateEgresoCTPer(?,?)");
            cl4.setDouble(1, eg1);
            cl4.setInt(2,cm.getIdCaja());
            cl4.executeUpdate();
            }
            rpta=true;           
             break;
                 }
              }
         }
         catch(SQLException ex)
         {
             System.err.println("ERROR: " + ex.getMessage());
             if(cn!=null)
             {
                System.out.println("Rollback");
                try {
                     //deshace todos los cambios realizados en los datos
                    cn.rollback();
                } catch (SQLException ex1) {
                 System.err.println( "No se pudo deshacer" + ex1.getMessage() );    
                }
           }
         }
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
    public static EgresoChequeTrans mostrarTotalOtroEgresoPersonal(int IdContrato)
    {
        EgresoChequeTrans ep=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalOtroEgresoPer(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ep=new EgresoChequeTrans(rs.getFloat(1));
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
    public static EgresoChequeTrans mostrarTotalOtroEgresoPersonalCheque(int IdContrato)
    {
        EgresoChequeTrans ep=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalOtroEgresoPerCheque(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ep=new EgresoChequeTrans(rs.getFloat(1));
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
    public static EgresoChequeTrans mostrarTotalOtroEgresoPersonalTrans(int IdContrato)
    {
        EgresoChequeTrans ep=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalOtroEgresoPerTrans(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ep=new EgresoChequeTrans(rs.getFloat(1));
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
    public static EgresoChequeTrans mostrarTotalOtroEgresoPersonalxFecha(int IdContrato,Date fecha)
    {
        EgresoChequeTrans ep=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalOtroEgresoPerXFecha(?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2, fecha);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ep=new EgresoChequeTrans(rs.getFloat(1));
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
    
    public static ArrayList<EgresoChequeTrans> mostrarOtroEgresoPersonalTrans(int IdContrato)
    {
        ArrayList<EgresoChequeTrans> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarOtroEgresoPerTrans(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoChequeTrans eg=new EgresoChequeTrans(rs.getString(1),rs.getString(2),
                        rs.getString(3),rs.getFloat(4),
                        rs.getString(5),rs.getString(6),rs.getString(7),rs.getString(8));
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
    public static ArrayList<EgresoChequeTrans> mostrarOtroEgresoPersonalCheque(int IdContrato)
    {
        ArrayList<EgresoChequeTrans> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarOtroEgresoPerCheque(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoChequeTrans eg=new EgresoChequeTrans(rs.getString(1),rs.getString(2),
                        rs.getString(3),rs.getFloat(4),
                        rs.getString(5),rs.getString(6),rs.getString(7));
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
    public static ArrayList<EgresoChequeTrans> mostrarOtroEgresoPersonalXFecha(int IdContrato,Date fecha)
    {
        ArrayList<EgresoChequeTrans> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarOtroEgresoPerXFecha(?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2, fecha);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoChequeTrans eg=new EgresoChequeTrans(rs.getString(1),rs.getString(2),
                        rs.getString(3),rs.getFloat(4),
                        rs.getString(5),rs.getString(6),rs.getString(7),rs.getString(8));
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
    public static EgresoChequeTrans mostrarTotalOtroEgresoChequexFecha(int IdContrato,Date fecha)
    {
        EgresoChequeTrans ep=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalOtroEgresoPerChequeXFecha(?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2, fecha);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ep=new EgresoChequeTrans(rs.getFloat(1));
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
    public static EgresoChequeTrans mostrarTotalOtroEgresoTransxFecha(int IdContrato,Date fecha)
    {
        EgresoChequeTrans ep=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalOtroEgresoPerTransXFecha(?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2, fecha);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ep=new EgresoChequeTrans(rs.getFloat(1));
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
    public static ArrayList<EgresoChequeTrans> mostrarOtroEgresoPersonalTransXFecha(int IdContrato,Date fecha)
    {
        ArrayList<EgresoChequeTrans> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarOtroEgresoPerTransXFecha(?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2, fecha);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoChequeTrans eg=new EgresoChequeTrans(rs.getString(1),rs.getString(2),
                        rs.getString(3),rs.getFloat(4),
                        rs.getString(5),rs.getString(6),rs.getString(7),rs.getString(8));
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
    public static ArrayList<EgresoChequeTrans> mostrarOtroEgresoPersonalChequeXFecha(int IdContrato,Date fecha)
    {
        ArrayList<EgresoChequeTrans> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarOtroEgresoPerChequeXFecha(?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2, fecha);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoChequeTrans eg=new EgresoChequeTrans(rs.getString(1),rs.getString(2),
                        rs.getString(3),rs.getFloat(4),
                        rs.getString(5),rs.getString(6),rs.getString(7));
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
    public static ArrayList<EgresoChequeTrans> mostrarEliminarOtroEgresoPersonalChequeAct(int IdContrato)
    {
        ArrayList<EgresoChequeTrans> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarEliminarOtroEgresoPerChequeAct(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoChequeTrans eg=new EgresoChequeTrans(rs.getInt(1),rs.getString(2),
                        rs.getString(3),rs.getString(4),rs.getFloat(5),
                        rs.getString(6),rs.getString(7),rs.getString(8));
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
    public static ArrayList<EgresoChequeTrans> mostrarEliminarOtroEgresoPersonalChequeInac(int IdContrato,Date fecha)
    {
        ArrayList<EgresoChequeTrans> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarEliminarOtroEgresoPerChequeInact(?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2, fecha);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoChequeTrans eg=new EgresoChequeTrans(rs.getInt(1),rs.getString(2),
                        rs.getString(3),rs.getString(4),rs.getFloat(5),
                        rs.getString(6),rs.getString(7),rs.getString(8),rs.getInt(9));
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
    public static ArrayList<EgresoChequeTrans> mostrarEliminarOtroEgresoPersonalTransAct(int IdContrato)
    {
        ArrayList<EgresoChequeTrans> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarEliminarOtroEgresoPerTransAct(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoChequeTrans eg=new EgresoChequeTrans(rs.getInt(1),rs.getString(2),
                        rs.getString(3),rs.getString(4),rs.getFloat(5),
                        rs.getString(6),rs.getString(7),rs.getString(8),rs.getString(9));
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
    public static ArrayList<EgresoChequeTrans> mostrarEliminarOtroEgresoPersonalTransInac(int IdContrato,Date fecha)
    {
        ArrayList<EgresoChequeTrans> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarEliminarOtroEgresoPerTransInact(?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2, fecha);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoChequeTrans eg=new EgresoChequeTrans(rs.getInt(1),rs.getString(2),
                        rs.getString(3),rs.getString(4),rs.getFloat(5),
                        rs.getString(6),rs.getString(7),rs.getString(8),rs.getString(9),rs.getInt(10));
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
    public static boolean EliminarEgreso(EgresoChequeTrans ip)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call ElininrOtroEgresoChequeTransAct(?)");
            cl.setInt(1,ip.getIdChequeTrans());
            cl.executeUpdate(); 
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
    public static boolean EliminarEgresoChequeInactivo(EgresoChequeTrans ip)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        CallableStatement cl1=null;
        CallableStatement cl2=null;
        try
        {
            cl=cn.prepareCall("call EliminarOtroEgresoChequeTransPerTotal(?,?)");
            cl.setInt(1,ip.getIdCaja());
            cl.setFloat(2,ip.getMonto());
            cl.executeUpdate();
            
            cl1=cn.prepareCall("call GuardarVitacoraEgresoEliminado(?,?,?,?,?)");
            cl1.setInt(1, Types.INTEGER);
            cl1.setFloat(2,ip.getMonto());
            cl1.setString(3,ip.getNombre());
            cl1.setString(4,ip.getTipoPago());
            cl1.setString(5,ip.getNumero());
            cl1.executeUpdate();
            
            cl2=cn.prepareCall("call ElininrOtroEgresoChequeTransAct(?)");
            cl2.setInt(1,ip.getIdChequeTrans());
            cl2.executeUpdate();
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
    public static boolean EliminarEgresoTrnasInactivo(EgresoChequeTrans ip)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        CallableStatement cl1=null;
        CallableStatement cl2=null;
        try
        {
            cl=cn.prepareCall("call EliminarOtroEgresoChequeTransPerTotal(?,?)");
            cl.setInt(1,ip.getIdCaja());
            cl.setFloat(2,ip.getMonto());
            cl.executeUpdate();
            
            cl1=cn.prepareCall("call GuardarVitacoraEgresoTransEliminado(?,?,?,?,?,?)");
            cl1.setInt(1, Types.INTEGER);
            cl1.setFloat(2,ip.getMonto());
            cl1.setString(3,ip.getNombre());
            cl1.setString(4,ip.getTipoPago());
            cl1.setString(5,ip.getNumero());
            cl1.setString(6,ip.getEntidad());
            cl1.executeUpdate();
            
            cl2=cn.prepareCall("call ElininrOtroEgresoChequeTransAct(?)");
            cl2.setInt(1,ip.getIdChequeTrans());
            cl2.executeUpdate();
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
}
