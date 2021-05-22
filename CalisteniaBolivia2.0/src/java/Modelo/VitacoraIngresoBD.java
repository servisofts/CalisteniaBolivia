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
/**
 *
 * @author YakuRocaH
 */
public class VitacoraIngresoBD {
    
    public static ArrayList<VitacoraIngreso> mostrarVitacoraIngreso()
    {
        ArrayList<VitacoraIngreso> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarVitacoraIngreso()");
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                VitacoraIngreso i=new VitacoraIngreso(rs.getInt(1),rs.getString(2),
                        rs.getString(3),rs.getString(4),
                        rs.getFloat(5),rs.getDate(6),rs.getString(7),rs.getString(8));
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
    
}
