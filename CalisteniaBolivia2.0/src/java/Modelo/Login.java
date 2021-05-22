package Modelo;
public class Login {
    int IdLogin;
    int IdPersonal;
    String Usuario;
    String Contaseña;
    //Auxiliar Contacto Para llamar procedimiento de Almacenado///
    String NombreLogin;
    String ApellidoLogin;
    //Auxiliar Cargo Peronal Para llamar procedimiento de Almacenado///
    String NombreCargoPer;
    //Auxiliar Sucursall Para llamar procedimiento de Almacenado///
    int IdSucursal;
    String Sucursal;
    String Imagen;
    public Login(int IdLogin) {
        this.IdLogin = IdLogin;
    }
    public Login(int IdPersonal, String Usuario, String Contaseña) {
        this.IdPersonal = IdPersonal;
        this.Usuario = Usuario;
        this.Contaseña = Contaseña;
    }
    public Login(int IdLogin, int IdPersonal, String NombreLogin, 
                String ApellidoLogin, 
                String Usuario) {
        this.IdLogin = IdLogin;
        this.IdPersonal = IdPersonal;
        this.NombreLogin = NombreLogin;
        this.ApellidoLogin = ApellidoLogin;
        this.Usuario = Usuario;
    }
    public int getIdLogin() {
        return IdLogin;
    }
    public void setIdLogin(int IdLogin) {
        this.IdLogin = IdLogin;
    }
    public int getIdPersonal() {
        return IdPersonal;
    }
    public void setIdPersonal(int IdPersonal) {
        this.IdPersonal = IdPersonal;
    }
    public String getNombreLogin() {
        return NombreLogin;
    }
    public void setNombreLogin(String NombreLogin) {
        this.NombreLogin = NombreLogin;
    }
    public String getApellidoLogin() {
        return ApellidoLogin;
    }
    public void setApellidoLogin(String ApellidoLogin) {
        this.ApellidoLogin = ApellidoLogin;
    }
    public String getNombreCargoPer() {
        return NombreCargoPer;
    }
    public void setNombreCargoPer(String NombreCargoPer) {
        this.NombreCargoPer = NombreCargoPer;
    }
    public int getIdSucursal() {
        return IdSucursal;
    }
    public void setIdSucursal(int IdSucursal) {
        this.IdSucursal = IdSucursal;
    }
    public String getSucursal() {
        return Sucursal;
    }
    public void setSucursal(String Sucursal) {
        this.Sucursal = Sucursal;
    }
    public String getImagen() {
        return Imagen;
    }
    public void setImagen(String Imagen) {
        this.Imagen = Imagen;
    }
    public String getUsuario() {
        return Usuario;
    }
    public void setUsuario(String Usuario) {
        this.Usuario = Usuario;
    }
    public String getContaseña() {
        return Contaseña;
    }
    public void setContaseña(String Contaseña) {
        this.Contaseña = Contaseña;
    }
}
