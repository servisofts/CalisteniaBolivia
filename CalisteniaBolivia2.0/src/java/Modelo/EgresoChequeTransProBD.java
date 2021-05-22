/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

import Utils.Conexion;
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
public class EgresoChequeTransProBD {
   public static boolean GuardarEgresoChequeTransPro(ArrayList<EgresoChequeTransPro> co)
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
             for(EgresoChequeTransPro cm: co) {
                 switch(cm.getTipoPago())
                 {
                     case "CHEQUE":
             int i2=0;
             cl=cn.prepareCall("call GuardarEgresoChequeTransProCheque(?,?,?,?,?,?,?)");
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
                 cl3=cn.prepareCall("call getEgresoCTPro(?)");
            cl3.setInt(1,cm.getIdCaja());
            ResultSet rs= cl3.executeQuery();
            rs.next();      
            double eg = rs.getDouble(1);
                         System.out.println(eg);
            double eg2 = rs.getDouble(2);
                         System.out.println(eg2);
            eg = eg + cm.getMonto();
            eg2 = eg2 - cm.getMonto();
            
            cl4=cn.prepareCall("call updateEgresoCTPro(?,?)");
            cl4.setDouble(1, eg);
            cl4.setInt(2,cm.getIdCaja());
            cl4.executeUpdate();
            }
             if(i2==1)
             {
                 rpta=true;
             }
             break;
                     case "TRANSFERENCIA" :
                         
            int i3=0;
             cl2=cn.prepareCall("call GuardarEgresoChequeTransProEnti(?,?,?,?,?,?,?,?)");           
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
                 cl3=cn.prepareCall("call getEgresoCTPro(?)");
            cl3.setInt(1,cm.getIdCaja());
            ResultSet rs1= cl3.executeQuery();
            rs1.next();      
            double eg1 = rs1.getDouble(1);
                         System.out.println(eg1);
            double eg12 = rs1.getDouble(2);
                         System.out.println(eg12);
            eg1 = eg1 + cm.getMonto();
            eg12 = eg12 - cm.getMonto();
            
            cl4=cn.prepareCall("call updateEgresoCTPro(?,?)");
            cl4.setDouble(1, eg1);
            cl4.setInt(2,cm.getIdCaja());
            cl4.executeUpdate();
            }
              if(i3==1)
             {
                 rpta=true;
             }            
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
   public static EgresoChequeTransPro mostrarTotalOtroEgresoProveedorTrans(int IdContrato)
    {
        EgresoChequeTransPro ep=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalOtroEgresoProTrans(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ep=new EgresoChequeTransPro(rs.getFloat(1));
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
   public static EgresoChequeTransPro mostrarTotalOtroEgresoProveedor(int IdContrato)
    {
        EgresoChequeTransPro ep=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalOtroEgresoPro(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ep=new EgresoChequeTransPro(rs.getFloat(1));
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
   public static EgresoChequeTransPro mostrarTotalOtroEgresoProveedorCheque(int IdContrato)
    {
        EgresoChequeTransPro ep=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalOtroEgresoProCheque(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ep=new EgresoChequeTransPro(rs.getFloat(1));
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
   public static EgresoChequeTransPro mostrarTotalOtroEgresoProveedorXFecha(int IdContrato,Date fecha)
    {
        EgresoChequeTransPro ep=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalOtroEgresoProXFecha(?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2, fecha);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ep=new EgresoChequeTransPro(rs.getFloat(1));
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
   public static ArrayList<EgresoChequeTransPro> mostrarOtroEgresoPrveedorCheque(int IdContrato)
    {
        ArrayList<EgresoChequeTransPro> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarOtroEgresoProCheque(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoChequeTransPro eg=new EgresoChequeTransPro(rs.getString(1),rs.getString(2),
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
   public static ArrayList<EgresoChequeTransPro> mostrarOtroEgresoPrveedorTrans(int IdContrato)
    {
        ArrayList<EgresoChequeTransPro> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarOtroEgresoProTrans(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoChequeTransPro eg=new EgresoChequeTransPro(rs.getString(1),rs.getString(2),
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
   public static ArrayList<EgresoChequeTransPro> mostrarOtroEgresoPrveedorXFecha(int IdContrato,Date fecha)
    {
        ArrayList<EgresoChequeTransPro> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarOtroEgresoProXFecha(?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2, fecha);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoChequeTransPro eg=new EgresoChequeTransPro(rs.getString(1),rs.getString(2),
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
   public static EgresoChequeTransPro mostrarTotalOtroEgresoProveedorTransXFecha(int IdContrato,Date fecha)
    {
        EgresoChequeTransPro ep=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalOtroEgresoProTransXFexha(?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2, fecha);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ep=new EgresoChequeTransPro(rs.getFloat(1));
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
   public static EgresoChequeTransPro mostrarTotalOtroEgresoProveedorChequeXFecha(int IdContrato,Date fecha)
    {
        EgresoChequeTransPro ep=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalOtroEgresoProChequeXFecha(?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2, fecha);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ep=new EgresoChequeTransPro(rs.getFloat(1));
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
   public static ArrayList<EgresoChequeTransPro> mostrarOtroEgresoPrveedorTransXFecha(int IdContrato,Date fecha)
    {
        ArrayList<EgresoChequeTransPro> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarOtroEgresoProTransXFecha(?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2, fecha);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoChequeTransPro eg=new EgresoChequeTransPro(rs.getString(1),rs.getString(2),
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
   public static ArrayList<EgresoChequeTransPro> mostrarOtroEgresoPrveedorChequeXFecha(int IdContrato,Date fecha)
    {
        ArrayList<EgresoChequeTransPro> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarOtroEgresoProChequeXFecha(?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2, fecha);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoChequeTransPro eg=new EgresoChequeTransPro(rs.getString(1),rs.getString(2),
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
   public static ArrayList<EgresoChequeTransPro> mostrarEliminarOtroEgresoPrveedorChequeAct(int IdContrato)
    {
        ArrayList<EgresoChequeTransPro> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarEliminarOtroEgresoProChequeAct(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoChequeTransPro eg=new EgresoChequeTransPro(rs.getInt(1),rs.getString(2),
                        rs.getString(3),rs.getString(4),rs.getString(5),rs.getFloat(6),
                        rs.getString(7),rs.getString(8),rs.getString(9));
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
   public static ArrayList<EgresoChequeTransPro> mostrarEliminarOtroEgresoPrveedorChequeInact(int IdContrato,Date fecha)
    {
        ArrayList<EgresoChequeTransPro> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarEliminarOtroEgresoProChequeInact(?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2, fecha);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoChequeTransPro eg=new EgresoChequeTransPro(rs.getInt(1),rs.getString(2),
                        rs.getString(3),rs.getString(4),rs.getString(5),rs.getFloat(6),
                        rs.getString(7),rs.getString(8),rs.getString(9),rs.getInt(10));
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
   public static ArrayList<EgresoChequeTransPro> mostrarEliminarOtroEgresoPrveedorTransAct(int IdContrato)
    {
        ArrayList<EgresoChequeTransPro> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarEliminarOtroEgresoProTransAct(?)");
            cl.setInt(1,IdContrato);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoChequeTransPro eg=new EgresoChequeTransPro(rs.getInt(1),rs.getString(2),
                        rs.getString(3),rs.getString(4),rs.getString(5),rs.getFloat(6),
                        rs.getString(7),rs.getString(8),rs.getString(9),rs.getString(10));
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
   public static ArrayList<EgresoChequeTransPro> mostrarEliminarOtroEgresoPrveedorTransInact(int IdContrato,Date fecha)
    {
        ArrayList<EgresoChequeTransPro> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarEliminarOtroEgresoProTransIcat(?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2, fecha);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                EgresoChequeTransPro eg=new EgresoChequeTransPro(rs.getInt(1),rs.getString(2),
                        rs.getString(3),rs.getString(4),rs.getString(5),rs.getFloat(6),
                        rs.getString(7),rs.getString(8),rs.getString(9),rs.getString(10),rs.getInt(11));
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
   public static boolean EliminarEgresoChequeTransProAct(EgresoChequeTransPro ip)
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
   public static boolean EliminarEgresoChequeTransProInact(EgresoChequeTransPro ip)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        CallableStatement cl2=null;
        try
        {
            cl=cn.prepareCall("call EliminarOtroChequeTransProTotal(?,?)");
            cl.setInt(1,ip.getIdCaja());
            cl.setFloat(2,ip.getMonto());
            cl.executeUpdate();
            
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
