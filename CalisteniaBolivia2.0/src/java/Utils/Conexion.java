package Utils;
import java.sql.*;
public class Conexion {
    public static Connection getConexion(){
        Connection cn =null;
        try{
          String url="jdbc:mysql://sa.calisteniabolivia.com:3306/calisten_calistenia?user=calisten_calisten&password=calistenia123..&noAccessToProcedureBodies=true";
          //String usu="calisten";
          //String pass="Uh52R03ipx";  
//          String url="jdbc:mysql://192.168.0.199:3306/calisten_calistenia?characterEncoding=utf8";
//          String usu="calistenia";
//          String pass="Calistenia123..";
            Class.forName("com.mysql.jdbc.Driver");
            //8084
          cn=DriverManager.getConnection(url);
            //cn=DriverManager.getConnection("jdbc:mysql://www.calisteniaboliviasc.com:3306/calisten_CalisteniaBolivia2.0","calisten","Uh52R03ipx");
            System.out.println("Conexion Satisfactoria");
        }
        catch(Exception e){
            System.out.println("Error en la Conexion: "+e);}
         return cn;
    } 
    public static void main(String[] args) {
        Conexion.getConexion();
    }    
}
