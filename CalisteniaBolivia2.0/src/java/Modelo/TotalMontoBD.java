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
public class TotalMontoBD {
    public static ArrayList<TotalMonto> mostrarTotalMonto(int IdContrato,Date fecha1,Date fecha2)
    {
        ArrayList<TotalMonto> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalMontos(?,?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2, fecha1);
            cl.setDate(3, fecha2);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                TotalMonto l=new TotalMonto(rs.getInt(1),rs.getString(2),rs.getFloat(3),rs.getFloat(4)
                                    ,rs.getFloat(5),rs.getFloat(6),rs.getFloat(7),rs.getFloat(8),rs.getFloat(9),rs.getFloat(10)
                                        ,rs.getFloat(11),rs.getFloat(12),rs.getFloat(13),rs.getInt(14));
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
    public static TotalMonto mostrarTotalMonto2(int IdContrato,Date fecha1,Date fecha2)
    {
        TotalMonto ic=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarTotalMontos2(?,?,?)");
            cl.setInt(1,IdContrato);
            cl.setDate(2,fecha1);
            cl.setDate(3,fecha2);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                ic=new TotalMonto(rs.getFloat(1),rs.getFloat(2),rs.getFloat(3),rs.getFloat(4)
                        ,rs.getFloat(5),rs.getFloat(6),rs.getFloat(7),rs.getFloat(8)
                                        ,rs.getFloat(9),rs.getFloat(10),rs.getFloat(11));
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
    
    public static ArrayList<TotalMonto> mostrarTotalMonto3(int IdSucursal,Date fecha1,Date fecha2)
    {
        ArrayList<TotalMonto> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call totalCajaSuc(?,?,?)");
            cl.setInt(1,IdSucursal);
            cl.setDate(2, fecha1);
            cl.setDate(3, fecha2);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                TotalMonto l=new TotalMonto(rs.getInt(1),rs.getString(2),rs.getFloat(3),rs.getFloat(4)
                                    ,rs.getFloat(5),rs.getFloat(6),rs.getFloat(7),rs.getFloat(8),rs.getFloat(9),rs.getFloat(10)
                                        ,rs.getFloat(11),rs.getFloat(12),rs.getFloat(13),rs.getInt(14));
                lista.add(l); 
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
        return lista;
    } 
}
