package Modelo;
import java.sql.*;
import java.util.ArrayList;
import Utils.Conexion;
public class CategoriaPaqueteBD {
    public static boolean guardarPaquete(CategoriaPaquete cp)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call GuardarCategoriaPaquete(?,?)");
            cl.setInt(1,Types.INTEGER);
            cl.setString(2, cp.getNombreCategoriaPaquete());
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
    
    public static ArrayList<CategoriaPaquete> mostrarCategoriaPaqueteACtivas()
    {
        ArrayList<CategoriaPaquete> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarCategoriaPaqueteActivos()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
                CategoriaPaquete cq = new CategoriaPaquete(rs.getInt(1),rs.getString(2)
                                                            ,rs.getByte(3));
                lista.add(cq);
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
     
     public static ArrayList<CategoriaPaquete> mostrarCategoriaPaqueteInactivas()
    {
        ArrayList<CategoriaPaquete> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarCategoriaPaqueteInactivos()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
                CategoriaPaquete cq = new CategoriaPaquete(rs.getInt(1),rs.getString(2)
                                                           ,rs.getByte(3));
                lista.add(cq);
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
}
