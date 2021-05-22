package Modelo;
import java.sql.*;
import java.util.ArrayList;
import Utils.Conexion;
public class ClienteBD {
     public static boolean guardarCliente(Cliente ct)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call GuardarCliente(?,?,?,?,?,?,?,?,?,?,?)");
            cl.setInt(1,Types.INTEGER);
            cl.setInt(2,Types.INTEGER);
            cl.setString(3, ct.getNombre());
            cl.setString(4, ct.getApellido());
            cl.setString(5,ct.getEdad());
            cl.setInt(6, ct.getCi());
            cl.setString(7, ct.getTelefono());
            cl.setString(8, ct.getCorreo());
            cl.setString(9,ct.getImagen());
            cl.setInt(10,ct.getIdSucursal()); 
            cl.setInt(11,ct.getIdZona());
            cl.executeUpdate();
            System.out.println(ct.getIdZona());
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
     public static boolean guardarCliente2(Cliente ct)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call GuardarCliente2(?,?,?,?,?,?,?,?,?,?)");
            cl.setInt(1,Types.INTEGER);
            cl.setInt(2,Types.INTEGER);
            cl.setString(3, ct.getNombre());
            cl.setString(4, ct.getApellido());
            cl.setString(5,ct.getEdad());
            cl.setInt(6, ct.getCi());
            cl.setString(7, ct.getTelefono());
            cl.setString(8, ct.getCorreo());
            cl.setBlob(9,ct.getImagen2());
            cl.setInt(10,ct.getIdSucursal());
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
     public static boolean modificarCliente(Cliente ct)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call ModificarCliente(?,?,?,?,?,?,?)");
            cl.setInt(1, ct.getIdContacto());
            cl.setInt(2, ct.getIdCliente());
            cl.setString(3,ct.getNombre());
            cl.setString(4,ct.getApellido());
            cl.setString(5,ct.getTelefono());
            cl.setString(6,ct.getCorreo());
            cl.setInt(7,ct.getIdSucursal());
            
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
     public static boolean modificarCliente2(Cliente ct)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call ModificarCliente2(?,?,?,?,?,?,?,?)");
            cl.setInt(1, ct.getIdContacto());
            cl.setInt(2, ct.getIdCliente());
            cl.setString(3,ct.getNombre());
            cl.setString(4,ct.getApellido());
            cl.setString(5,ct.getEdad());
            cl.setInt(6,ct.getCi());
            cl.setString(7,ct.getTelefono());
            cl.setString(8,ct.getCorreo());
            
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
    public static ArrayList<Cliente> mostrarCliente()
    {
        ArrayList<Cliente> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarCliente()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
                Cliente clt = new Cliente(rs.getInt(1),rs.getInt(2),
                        rs.getString(3),rs.getString(4),rs.getString(5),
                rs.getInt(6),rs.getString(7),rs.getString(8),rs.getString(9),
                        rs.getString(10));
                lista.add(clt);
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
    public static Cliente mostrarCliente(int idCliente)
    {    
        Cliente clt=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call mostrarClienteId(?)");
            cl.setInt(1,idCliente);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                clt=new Cliente(rs.getInt(1),rs.getString(2),rs.getString(3),
                        rs.getString(4),rs.getInt(5),rs.getString(6),
                        rs.getString(7),rs.getString(8));
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
    
    public static Cliente mostrarCliente2(int idCliente)
    {    
        Cliente clt=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call mostrarClienteId2(?)");
            cl.setInt(1,idCliente);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                clt=new Cliente(rs.getInt(1),rs.getInt(2),rs.getString(3),rs.getString(4),
                        rs.getString(5),rs.getInt(6),rs.getString(7),
                        rs.getString(8),rs.getString(9),rs.getString(10));
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
    
     public static Cliente mostrarCliente3(int idCliente)
    {    
        Cliente clt=null;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call mostrarClienteId3(?)");
            cl.setInt(1,idCliente);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                clt=new Cliente(rs.getInt(1),rs.getInt(2),rs.getString(3),rs.getString(4),
                        rs.getString(5),rs.getInt(6),rs.getString(7),
                        rs.getString(8),rs.getString(9),rs.getString(10),rs.getInt(11));
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
        return clt;
    }

    public static ArrayList<Cliente> mostrarClienteActivo()
    {    
        ArrayList<Cliente> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarMebresiasActivas()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                Cliente clt = new Cliente(rs.getInt(1),rs.getString(2),
                        rs.getString(3),rs.getString(4),
                rs.getString(5),rs.getInt(6),rs.getDate(7),rs.getDate(8),
                        rs.getString(9),rs.getString(10),rs.getString(11),
                rs.getFloat(12),rs.getInt(13));
                lista.add(clt);
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
    public static ArrayList<Cliente> mostrarClienteActivoPg(int pg ,int pg2)
    {
        ArrayList<Cliente> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarMebresiasActivasPG(?,?)");
            cl.setInt(1,pg);
            cl.setInt(2, pg2);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {            
                Cliente clt = new Cliente(rs.getInt(1),rs.getString(2),
                        rs.getString(3),rs.getString(4),
                rs.getString(5),rs.getInt(6),rs.getDate(7),rs.getDate(8),
                        rs.getString(9),rs.getInt(10));
                lista.add(clt);
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
    public static ArrayList<Cliente> mostrarCantidadClientes()
    {
        
        ArrayList<Cliente> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarCantidadClientes()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
                Cliente clt = new Cliente(rs.getInt(1));
                lista.add(clt);
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
    public static ArrayList<Cliente> mostrarCantidadContratoActivos()
    {
        ArrayList<Cliente> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarCantidadContratoActivos()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
                Cliente clt = new Cliente(rs.getInt(1));
                lista.add(clt);
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
    public static ArrayList<Cliente> mostrarCantidadContratoActivosBoxeo()
    {
        ArrayList<Cliente> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call MostrarCantidadContratoActivosBoxeo()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
                Cliente clt = new Cliente(rs.getInt(1));
                lista.add(clt);
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
    public static ArrayList<Cliente> mostrarRelacionContrato(int IdRelacion)
    {
        ArrayList<Cliente> lista=new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call MostrarRelacionContrato(?)");
            cl.setInt(1,IdRelacion);
            ResultSet rs=cl.executeQuery();
            while(rs.next())
            {
                Cliente i=new Cliente(rs.getString(1),rs.getString(2));
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
    public static boolean modificarFechaContrato(Cliente ct)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        CallableStatement cl2=null;
        try
        {
            cl=cn.prepareCall("call ModificarFechaContrato(?,?)");
            cl.setInt(1, ct.getContratoMembresia());
            cl.setDate(2, ct.getFechaFin());
            cl.executeUpdate();
            
            cl2=cn.prepareCall("call GuardarVitacoraFecha(?,?,?,?,?)");
            cl2.setInt(1,Types.INTEGER);
            cl2.setString(2,ct.getNombrePersonal());
            cl2.setString(3,ct.getNombre());
            cl2.setString(4,ct.getApellido());
            cl2.setString(5,ct.getObservacion());
            
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
    
    public static ArrayList<Cliente> buscarCliente(String nombre)
    {
        ArrayList<Cliente> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            String []  bar = nombre. split(" ");
            String nom1 = "";
            String nom2 = "";
            String ap1 = "";
            String ap2 = "";
            String nom = "";
            String ap = "";
            if(bar.length==2)
            {
                nom1 = bar[0];
                ap1 = bar[1];
                cl=cn.prepareCall("call BuscarCliente(?,?,?)");
                cl.setString(1, nom1);
                cl.setString(2, ap1);
                cl.setString(3, nombre);
                ResultSet rs= cl.executeQuery();
                    while(rs.next())
                    {
                        Cliente clt=new Cliente(rs.getInt(1),rs.getString(2),rs.getString(3),
                        rs.getString(4),rs.getInt(5),rs.getString(6),
                        rs.getString(7),rs.getString(8));
                        lista.add(clt);
                    }      
                    System.out.println(nom1);
                    System.out.println(ap1);
            }
            else if(bar.length==3)
            {
                nom1 = bar[0];
                nom2 = bar[1];
                ap1 = bar[2];
                nom = nom1 + " " + nom2; 
                cl=cn.prepareCall("call BuscarCliente(?,?,?)");
                cl.setString(1, nom);
                cl.setString(2, ap1);
                cl.setString(3, nombre);
                ResultSet rs= cl.executeQuery();
                if(rs!=null){
                    while(rs.next())
                    {
                        Cliente clt=new Cliente(rs.getInt(1),rs.getString(2),rs.getString(3),
                        rs.getString(4),rs.getInt(5),rs.getString(6),
                        rs.getString(7),rs.getString(8));
                        lista.add(clt);
                    }
                }else{
                     nom1 = bar[0];
                     ap1 = bar[1];
                     ap2 = bar[2];
                     ap = ap1 + " " + ap2; 
                     cl=cn.prepareCall("call BuscarCliente(?,?,?)");
                     cl.setString(1, nom1);
                     cl.setString(2, ap);
                     cl.setString(3, nombre);
                     ResultSet rs1= cl.executeQuery();
                     while(rs1.next())
                    {
                        Cliente clt=new Cliente(rs.getInt(1),rs.getString(2),rs.getString(3),
                        rs.getString(4),rs.getInt(5),rs.getString(6),
                        rs.getString(7),rs.getString(8));
                        lista.add(clt);
                    }
                }
            }else{
            cl=cn.prepareCall("call BuscarCliente(?,?,?)");
            nombre="%"+nombre+"%";
            cl.setString(1, nombre);
            cl.setString(2, nombre);
            cl.setString(3, nombre);
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
                Cliente clt=new Cliente(rs.getInt(1),rs.getString(2),rs.getString(3),
                        rs.getString(4),rs.getInt(5),rs.getString(6),
                        rs.getString(7),rs.getString(8));
                lista.add(clt);
            }
            }
        }
        catch(Exception e){ System.out.println(e);}
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
     public static ArrayList<Cliente> mostrarClienteVencimiento()
    {
        ArrayList<Cliente> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call Vencimiento()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
                Cliente clt = new Cliente(rs.getInt(1));
                lista.add(clt);
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
     
     public static ArrayList<Cliente> mostrarClienteActivo2(String nombre)
    {    
        ArrayList<Cliente> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            String []  bar = nombre. split(" ");
            String nom1 = "";
            String nom2 = "";
            String ap1 = "";
            String ap2 = "";
            String nom = "";
            String ap = "";
            if(bar.length==2)
            {
                nom1 = bar[0];
                ap1 = bar[1];
                cl=cn.prepareCall("call MostrarMembresiasActivas2(?,?,?)");
                cl.setString(1, nom1);
                cl.setString(2, ap1);
                cl.setString(3, nombre);
                ResultSet rs= cl.executeQuery();
                    while(rs.next())
                    {
                        Cliente clt = new Cliente(rs.getInt(1),rs.getString(2),
                        rs.getString(3),rs.getString(4),
                rs.getString(5),rs.getInt(6),rs.getDate(7),rs.getDate(8),
                        rs.getString(9),rs.getString(10),rs.getString(11),
                rs.getFloat(12),rs.getInt(13));
                lista.add(clt);
                    }      
                    System.out.println(nom1);
                    System.out.println(ap1);
            }
            else if(bar.length==3)
            {
                nom1 = bar[0];
                nom2 = bar[1];
                ap1 = bar[2];
                nom = nom1 + " " + nom2; 
                cl=cn.prepareCall("call MostrarMembresiasActivas2(?,?,?)");
                cl.setString(1, nom);
                cl.setString(2, ap1);
                cl.setString(3, nombre);
                ResultSet rs= cl.executeQuery();
                if(rs!=null){
                    while(rs.next())
                    {
                        Cliente clt = new Cliente(rs.getInt(1),rs.getString(2),
                        rs.getString(3),rs.getString(4),
                rs.getString(5),rs.getInt(6),rs.getDate(7),rs.getDate(8),
                        rs.getString(9),rs.getString(10),rs.getString(11),
                rs.getFloat(12),rs.getInt(13));
                lista.add(clt);
                    }
                }else{
                     nom1 = bar[0];
                     ap1 = bar[1];
                     ap2 = bar[2];
                     ap = ap1 + " " + ap2; 
                     cl=cn.prepareCall("call MostrarMembresiasActivas2(?,?,?)");
                     cl.setString(1, nom1);
                     cl.setString(2, ap);
                     cl.setString(3, nombre);
                     ResultSet rs1= cl.executeQuery();
                     while(rs1.next())
                    {
                        Cliente clt = new Cliente(rs.getInt(1),rs.getString(2),
                        rs.getString(3),rs.getString(4),
                rs.getString(5),rs.getInt(6),rs.getDate(7),rs.getDate(8),
                        rs.getString(9),rs.getString(10),rs.getString(11),
                rs.getFloat(12),rs.getInt(13));
                lista.add(clt);
                    }
                }
            }else{
            cl=cn.prepareCall("call MostrarMembresiasActivas2(?,?,?)");
            nombre="%"+nombre+"%";
            cl.setString(1, nombre);
            cl.setString(2, nombre);
            cl.setString(3, nombre);
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                Cliente clt = new Cliente(rs.getInt(1),rs.getString(2),
                        rs.getString(3),rs.getString(4),
                rs.getString(5),rs.getInt(6),rs.getDate(7),rs.getDate(8),
                        rs.getString(9),rs.getString(10),rs.getString(11),
                rs.getFloat(12),rs.getInt(13));
                lista.add(clt);
            }
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
     
     public static boolean modificarCliente3(Cliente ct)
    {
        boolean rpta=false;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try
        {
            cl=cn.prepareCall("call modificarCliente3(?,?,?,?,?,?,?,?,?,?)");
            cl.setInt(1, ct.getIdContacto());
            cl.setInt(2, ct.getIdCliente());
            cl.setString(3,ct.getNombre());
            cl.setString(4,ct.getApellido());
            cl.setString(5,ct.getEdad());
            cl.setInt(6,ct.getCi());
            cl.setString(7,ct.getTelefono());
            cl.setString(8,ct.getCorreo());
            cl.setString(9,ct.getImagen());
            cl.setInt(10,ct.getIdZona());
            int i=cl.executeUpdate();
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
     
     public static int vencCaliN()
    {    
        int n=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call vencCaliN()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                n=rs.getInt(1);
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
        return n;
    }
     public static int vencCaliS()
    {    
        int n=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call vencCaliS()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                n=rs.getInt(1);
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
        return n;
    }
     
     public static int vencBoxN()
    {    
        int n=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call vencBoxN()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                n=rs.getInt(1);
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
        return n;
    }
     
     public static int vencBoxS()
    {    
        int n=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call vencBoxS()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                n=rs.getInt(1);
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
        return n;
    }
     
     public static int vencTotalN()
    {    
        int n=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call vencTotalN()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                n=rs.getInt(1);
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
        return n;
    }
     
     public static int vencTotalS()
    {    
        int n=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call vencTotalS()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                n=rs.getInt(1);
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
        return n;
    }
     
     public static int activosCaliN()
    {    
        int n=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call activosCaliN()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                n=rs.getInt(1);
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
        return n;
    }
     
     public static int activosCaliS()
    {    
        int n=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call activosCaliS()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                n=rs.getInt(1);
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
        return n;
    }
     
     public static int activosBoxN()
    {    
        int n=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call activosBoxN()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                n=rs.getInt(1);
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
        return n;
    }
     
     public static int activosBoxS()
    {    
        int n=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call activosBoxS()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                n=rs.getInt(1);
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
        return n;
    }
     
     public static int activosN()
    {    
        int n=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call activosN()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                n=rs.getInt(1);
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
        return n;
    }
     
     public static int activosS()
    {    
        int n=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call activosS()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                n=rs.getInt(1);
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
        return n;
    }
     
     public static int regCaliN(Date f)
    {    
        int n=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call regCaliN(?)");
            cl.setDate(1, f);
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                n=rs.getInt(1);
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
        return n;
    }
     
     public static int regCaliS(Date f)
    {    
        int n=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call regCaliS(?)");
            cl.setDate(1, f);
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                n=rs.getInt(1);
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
        return n;
    }
     
     public static int regCaliTN(Date f, Date f1)
    {    
        int n=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call regCaliTN(?,?)");
            cl.setDate(1, f);
            cl.setDate(2, f1);
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                n=rs.getInt(1);
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
        return n;
    }
     
     public static int regCaliTS(Date f, Date f1)
    {    
        int n=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call regCaliTS(?,?)");
            cl.setDate(1, f);
            cl.setDate(2, f1);
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                n=rs.getInt(1);
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
        return n;
    }
     
     public static int regBoxN(Date f)
    {    
        int n=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call regBoxN(?)");
            cl.setDate(1, f);
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                n=rs.getInt(1);
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
        return n;
    }
     
     public static int regBoxS(Date f)
    {    
        int n=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call regBoxS(?)");
            cl.setDate(1, f);
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                n=rs.getInt(1);
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
        return n;
    }
     
     public static int regBoxTN(Date f, Date f1)
    {    
        int n=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call regBoxTN(?,?)");
            cl.setDate(1, f);
            cl.setDate(2, f1);
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                n=rs.getInt(1);
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
        return n;
    }
     
     public static int regBoxTS(Date f, Date f1)
    {    
        int n=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call regBoxTS(?,?)");
            cl.setDate(1, f);
            cl.setDate(2, f1);
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                n=rs.getInt(1);
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
        return n;
    }
     
     public static ArrayList<ClienteCump> cumple()
    {    
        int n=0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        ArrayList<ClienteCump> lista =new ArrayList<>();
        try{
            cl=cn.prepareCall("call cumple()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                ClienteCump c = new ClienteCump(rs.getString(1)+" "+rs.getString(2),rs.getInt(3),rs.getInt(4),rs.getString(5));
                lista.add(c);
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
     public static ArrayList<Historial> historial(int id)
    {    
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        ArrayList<Historial> lista =new ArrayList<>();
        try{
            cl=cn.prepareCall("call historial(?)");
            cl.setInt(1, id);
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {       
                Historial c = new Historial(rs.getString(1),rs.getString(2),rs.getString(3),rs.getDouble(4));
                lista.add(c);
            }
            System.out.println("hola");
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
      public static String fechaFinPaq(int id)
    {    
        String n = "Cliente nuevo";
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call fechaFin(?)");
            cl.setInt(1, id);
            ResultSet rs= cl.executeQuery(); 
            rs.next();
            n=rs.getString(1);
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
        return n;
    }
      
    public static int sucursal(int id)
    {    
        int n = 0;
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call sucursalUsuario(?)");
            cl.setInt(1, id);
            ResultSet rs= cl.executeQuery(); 
            rs.next();
            n=rs.getInt(1);
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
        return n;
    }
    
    public static ArrayList<Becado> mostrarBecados()
    {
        ArrayList<Becado> lista =new ArrayList<>();
        Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
        try{
            cl=cn.prepareCall("call mostrarBecados()");
            ResultSet rs= cl.executeQuery();
            while(rs.next())
            {
                Becado clt = new Becado(rs.getInt(1),rs.getString(2),
                        rs.getString(3),rs.getString(4),rs.getDate(5),
                rs.getDate(6));
                lista.add(clt);
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
