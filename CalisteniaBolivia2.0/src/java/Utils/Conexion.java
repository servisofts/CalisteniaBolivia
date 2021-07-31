package Utils;
import java.sql.*;
import java.util.logging.Level;
import java.util.logging.Logger;
public class Conexion {
//    private static Connection cn;
    public static Connection getConexion(){
        Connection cn =null; 
//        if(cn !=null){
//            try {
//                if(cn.isValid(1000)){
//                    return cn;
//                }
//            } catch (SQLException ex) {
//                Logger.getLogger(Conexion.class.getName()).log(Level.SEVERE, null, ex);
//            }
//        }
        try{
          //String url="jdbc:mysql://www.calisteniaboliviasc.com:3306/calisten_CalisteniaBolivia2.0?user=calisten&password=Uh52R03ipx&noAccessToProcedureBodies=true";
          //String usu="calisten";
          //String pass="Uh52R03ipx";  
          String url="jdbc:mysql://192.168.0.199:3306/calisten_calistenia?characterEncoding=utf8&noAccessToProcedureBodies=true";
          String usu="calistenia";
          String pass="Calistenia123..";
            Class.forName("com.mysql.jdbc.Driver");
            //8084
          cn=DriverManager.getConnection(url,usu,pass);
         //cn=DriverManager.getConnection("jdbc:mysql://www.calisteniaboliviasc.com:3306/calisten_CalisteniaBolivia2.0","calisten","Uh52R03ipx");
            System.out.println("Conexion Satisfactoria");
        }
        catch(Exception e){
            System.out.println("Error en la Conexion: "+e);
            cn=null;
        }
         return cn;
    } 
    public static void main(String[] args) {
        Conexion.getConexion();
    }    
}
