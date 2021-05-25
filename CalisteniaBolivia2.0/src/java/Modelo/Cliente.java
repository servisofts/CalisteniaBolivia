package Modelo;
import java.sql.Date;
import java.io.InputStream;

public class Cliente {
    //Tabla Cliente
    int IdContacto;
    int IdCliente;
    
    //Axuliare Contactos Para Traer datos con procedimiento de Almacenado//
    String Nombre;
    String Apellido;
    String Edad;
    int Ci;
    String Telefono;
    String Correo;
    String Imagen;
    InputStream Imagen2;
    private byte Imagen3[];
    
    //Axuliare Contactos Para Traer datos con procedimiento de Almacenado//
    int IdSucursal;
    String NombreSucursal;
    
    Date FechaInicio;
    Date FechaFin;
    int RelacionContrato;
    
    //Auxiliares Categiroa y Paquete Para Traer datos con procedimiento de Almacenado
    String nombrecategoria;
    String nombrePaquete;
    float precioPaquete;
    
    //Axuliares Personal Para Traer datos con procedimiento de Almacenado
    int ContratoMembresia;
    String NombrePersonal;
    String Observacion;
    int idZona;
    

    public Cliente(int IdCliente) {
        this.IdCliente = IdCliente;
    }

    public Cliente(String Nombre, String Apellido) {
        this.Nombre = Nombre;
        this.Apellido = Apellido;
    }

    public Cliente( int ContratoMembresia, Date FechaFin, String NombrePersonal,String Nombre, String Apellido,String Observacion) {
        this.ContratoMembresia = ContratoMembresia;
        this.FechaFin = FechaFin;
        this.NombrePersonal = NombrePersonal;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Observacion=Observacion;
    }

    public Cliente(String Nombre, String Apellido, String Edad, int Ci, 
            String Telefono, String Correo, String Imagen, int IdSucursal) {
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Edad = Edad;
        this.Ci = Ci;
        this.Telefono = Telefono;
        this.Correo = Correo;
        this.Imagen = Imagen;
        this.IdSucursal = IdSucursal;
    }
    
    public Cliente(String Nombre, String Apellido, String Edad, int Ci, 
            String Telefono, String Correo, String Imagen, int IdSucursal, int idZona) {
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Edad = Edad;
        this.Ci = Ci;
        this.Telefono = Telefono;
        this.Correo = Correo;
        this.Imagen = Imagen;
        this.IdSucursal = IdSucursal;
        this.idZona = idZona;
    }
    
    public Cliente(int idContacto, int idCliente, String Nombre, String Apellido, String Edad, int Ci, 
            String Telefono, String Correo, String Imagen) {
        this.IdContacto = idContacto;
        this.IdCliente = idCliente;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Edad = Edad;
        this.Ci = Ci;
        this.Telefono = Telefono;
        this.Correo = Correo;
        this.Imagen = Imagen;
    }
    
    public Cliente(int idContacto, int idCliente, String Nombre, String Apellido, String Edad, int Ci, 
            String Telefono, String Correo, String Imagen, int idZona) {
        this.IdContacto = idContacto;
        this.IdCliente = idCliente;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Edad = Edad;
        this.Ci = Ci;
        this.Telefono = Telefono;
        this.Correo = Correo;
        this.Imagen = Imagen;
        this.idZona = idZona;
    }

    public Cliente(String Nombre, String Apellido, String Edad, int Ci, 
          String Telefono, String Correo, InputStream Imagen2, int IdSucursal) {
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Edad = Edad;
        this.Ci = Ci;
        this.Telefono = Telefono;
        this.Correo = Correo;
        this.Imagen2 = Imagen2;
        this.IdSucursal = IdSucursal;
    }

    public Cliente(String Nombre, String Apellido, String Edad, int Ci, 
            String Telefono, String Correo, byte[] Imagen3, int IdSucursal) {
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Edad = Edad;
        this.Ci = Ci;
        this.Telefono = Telefono;
        this.Correo = Correo;
        this.Imagen3 = Imagen3;
        this.IdSucursal = IdSucursal;
    }


    public Cliente(String Nombre, String Apellido, String Edad, int Ci, 
         String Telefono, String Correo, String Imagen, String NombreSucursal) {
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Edad = Edad;
        this.Ci = Ci;
        this.Telefono = Telefono;
        this.Correo = Correo;
        this.Imagen = Imagen;
        this.NombreSucursal = NombreSucursal;
    }
public Cliente(int IdContacto, int IdCliente, String Nombre, String Apellido, 
        String Telefono, String Correo, int IdSucursal) {
        this.IdContacto = IdContacto;
        this.IdCliente = IdCliente;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Telefono = Telefono;
        this.Correo = Correo;
        this.IdSucursal = IdSucursal;
    }

public Cliente(int IdContacto, int IdCliente, String Nombre, String Apellido,String Edad,int Ci, 
        String Telefono, String Correo) {
        this.IdContacto = IdContacto;
        this.IdCliente = IdCliente;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Edad = Edad;
        this.Ci = Ci;
        this.Telefono = Telefono;
        this.Correo = Correo;
    }

    public Cliente(int IdContacto, int IdCliente, String Nombre, String Apellido
           , String Edad, int Ci, String Telefono, String Correo, String Imagen, 
                String NombreSucursal) {
        this.IdContacto = IdContacto;
        this.IdCliente = IdCliente;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Edad = Edad;
        this.Ci = Ci;
        this.Telefono = Telefono;
        this.Correo = Correo;
        this.Imagen = Imagen;
        this.NombreSucursal = NombreSucursal;
    }
    
    public Cliente(int IdContacto, int IdCliente, String Nombre, String Apellido
           , String Edad, int Ci, String Telefono, String Correo, String Imagen, 
                String NombreSucursal, int idZona) {
        this.IdContacto = IdContacto;
        this.IdCliente = IdCliente;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Edad = Edad;
        this.Ci = Ci;
        this.Telefono = Telefono;
        this.Correo = Correo;
        this.Imagen = Imagen;
        this.NombreSucursal = NombreSucursal;
        this.idZona = idZona;
    }

    public Cliente(int IdCliente, String Nombre, String Apellido, String Edad, 
            int Ci, String Telefono, String Correo, String Imagen) {
        this.IdCliente = IdCliente;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Edad = Edad;
        this.Ci = Ci;
        this.Telefono = Telefono;
        this.Correo = Correo;
        this.Imagen = Imagen;
    }
    
    /*public Cliente(int IdContacto,int IdCliente, String Nombre, String Apellido, String Edad, 
            int Ci, String Telefono, String Correo, String Imagen) {
        this.IdContacto = IdContacto;
        this.IdCliente = IdCliente;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Edad = Edad;
        this.Ci = Ci;
        this.Telefono = Telefono;
        this.Correo = Correo;
        this.Imagen = Imagen;
    }*/

    public Cliente(int IdCliente, String Nombre, String Apellido, String Edad, 
            String Telefono,int Ci,Date FechaInicio, Date FechaFin, 
            String Imagen) {
        this.IdCliente = IdCliente;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Edad = Edad;
        this.Telefono = Telefono;
        this.Ci = Ci;
        this.FechaInicio = FechaInicio;
        this.FechaFin = FechaFin;
        this.Imagen = Imagen;
    }
    
public Cliente(int IdCliente, String Nombre, String Apellido, String Edad, 
        String Telefono,int Ci,Date FechaInicio, Date FechaFin, 
        String Imagen,int RelacionContrato) {
        this.IdCliente = IdCliente;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Edad = Edad;
        this.Telefono = Telefono;
        this.Ci = Ci;
        this.FechaInicio = FechaInicio;
        this.FechaFin = FechaFin;
        this.Imagen = Imagen;
        this.RelacionContrato=RelacionContrato;
    }
    public Cliente(int IdCliente, String Nombre, String Apellido, String Edad, 
        String Telefono,int Ci,Date FechaInicio, Date FechaFin, 
        String Imagen,String nombrecategoria,String nombrePaquete,float precioPaquete,int ContratoMembresia) {
        this.IdCliente = IdCliente;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Edad = Edad;
        this.Telefono = Telefono;
        this.Ci = Ci;
        this.FechaInicio = FechaInicio;
        this.FechaFin = FechaFin;
        this.Imagen = Imagen;
        this.nombrecategoria=nombrecategoria;
        this.nombrePaquete=nombrePaquete;
        this.precioPaquete=precioPaquete;
        this.ContratoMembresia=ContratoMembresia;
    }

    public int getIdZona() {
        return idZona;
    }

    public void setIdZona(int idZona) {
        this.idZona = idZona;
    }
 
    public int getIdContacto() {
        return IdContacto;
    }

    public void setIdContacto(int IdContacto) {
        this.IdContacto = IdContacto;
    }

    public int getIdCliente() {
        return IdCliente;
    }

    public void setIdCliente(int IdCliente) {
        this.IdCliente = IdCliente;
    }

    
    //Auxiliares//
    public String getNombre() {
        return Nombre;
    }

    public void setNombre(String Nombre) {
        this.Nombre = Nombre;
    }

    public String getApellido() {
        return Apellido;
    }

    public void setApellido(String Apellido) {
        this.Apellido = Apellido;
    }

    public String getEdad() {
        return Edad;
    }

    public void setEdad(String Edad) {
        this.Edad = Edad;
    }

    public int getCi() {
        return Ci;
    }

    public void setCi(int Ci) {
        this.Ci = Ci;
    }

    public String getTelefono() {
        return Telefono;
    }

    public void setTelefono(String Telefono) {
        this.Telefono = Telefono;
    }

    public String getCorreo() {
        return Correo;
    }

    public void setCorreo(String Correo) {
        this.Correo = Correo;
    }

    public String getImagen() {
        return Imagen;
    }

    public void setImagen(String Imagen) {
        this.Imagen = Imagen;
    }

    public int getIdSucursal() {
        return IdSucursal;
    }

    public void setIdSucursal(int IdSucursal) {
        this.IdSucursal = IdSucursal;
    }

    public String getNombreSucursal() {
        return NombreSucursal;
    }

    public void setNombreSucursal(String NombreSucursal) {
        this.NombreSucursal = NombreSucursal;
    }

    public InputStream getImagen2() {
        return Imagen2;
    }

    public void setImagen2(InputStream Imagen2) {
        this.Imagen2 = Imagen2;
    }

    public byte[] getImagen3() {
        return Imagen3;
    }

    public void setImagen3(byte[] Imagen3) {
        this.Imagen3 = Imagen3;
    }

    public Date getFechaInicio() {
        return FechaInicio;
    }

    public void setFechaInicio(Date FechaInicio) {
        this.FechaInicio = FechaInicio;
    }

    public Date getFechaFin() {
        return FechaFin;
    }

    public void setFechaFin(Date FechaFin) {
        this.FechaFin = FechaFin;
    }

    

    public int getRelacionContrato() {
        return RelacionContrato;
    }

    public void setRelacionContrato(int RelacionContrato) {
        this.RelacionContrato = RelacionContrato;
    }

    public String getNombrecategoria() {
        return nombrecategoria;
    }

    public void setNombrecategoria(String nombrecategoria) {
        this.nombrecategoria = nombrecategoria;
    }

    public String getNombrePaquete() {
        return nombrePaquete;
    }

    public void setNombrePaquete(String nombrePaquete) {
        this.nombrePaquete = nombrePaquete;
    }

    public float getPrecioPaquete() {
        return precioPaquete;
    }

    public void setPrecioPaquete(float precioPaquete) {
        this.precioPaquete = precioPaquete;
    }

    public int getContratoMembresia() {
        return ContratoMembresia;
    }

    public void setContratoMembresia(int ContratoMembresia) {
        this.ContratoMembresia = ContratoMembresia;
    }

    public String getNombrePersonal() {
        return NombrePersonal;
    }

    public void setNombrePersonal(String NombrePersonal) {
        this.NombrePersonal = NombrePersonal;
    }

    public String getObservacion() {
        return Observacion;
    }

    public void setObservacion(String Observacion) {
        this.Observacion = Observacion;
    }

}
