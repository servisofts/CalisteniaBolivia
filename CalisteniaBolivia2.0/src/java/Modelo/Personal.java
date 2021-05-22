package Modelo;

import java.sql.Date;

public class Personal {
    int IdContacto;
    int IdPersonal;
    // Auxiliares Contactos Para Traer datos con procedimiento de Almacenado//
    String NombrePersonal;
    String ApellidoPersonal;
    String Edad;
    int CI;
    String Telefono;
    String Correo;
    String Imagen;
    // Auxiliares Cargo Para Traer datos con procedimiento de Almacenado//
    int IdCargo;
    String nombreCargo;
    // Auxiliares Sucursal Para Traer datos con procedimiento de Almacenado//
    int IdSucursal; 
    String Sucursal;
    // Auxiliares Contrato Personal Para Traer datos con procedimiento de Almacenado//
    int IdContratoPersonal;
    Date FechaIniContrato;
    Date FechaFinContrato;
    String Observacion;

    public Personal(int IdPersonal) {
        this.IdPersonal = IdPersonal;
    }
    public Personal(int IdPersonal, String NombrePersonal, 
            String ApellidoPersonal) {
        this.IdPersonal = IdPersonal;
        this.NombrePersonal = NombrePersonal;
        this.ApellidoPersonal = ApellidoPersonal;
    } 
    public Personal(int IdContacto, int IdPersonal, String NombrePersonal, 
            String ApellidoPErsonal, 
            String Edad, int CI, String Telefono, String Correo, String Imagen, 
            Date FechaIniContrato, Date FechaFinContrato, String Observacion, 
            String nombreCargo, 
            String Sucursal,int IdContratoPersonal) {
        this.IdContacto = IdContacto;
        this.IdPersonal = IdPersonal;
        this.NombrePersonal = NombrePersonal;
        this.ApellidoPersonal = ApellidoPErsonal;
        this.Edad = Edad;
        this.CI = CI;
        this.Telefono = Telefono;
        this.Correo = Correo;
        this.Imagen = Imagen;
        this.FechaIniContrato = FechaIniContrato;
        this.FechaFinContrato = FechaFinContrato;
        this.Observacion = Observacion;
        this.nombreCargo = nombreCargo;
        this.Sucursal = Sucursal;
        this.IdContratoPersonal=IdContratoPersonal;
    }

    public Personal(String NombrePersonal, String ApellidoPersonal, 
            String Edad, int CI, String Telefono, String Correo, String Imagen, 
            Date FechaIniContrato, Date FechaFinContrato, String Observacion, 
            int IdCargo, int IdSucursal) {
        this.NombrePersonal = NombrePersonal;
        this.ApellidoPersonal = ApellidoPersonal;
        this.Edad = Edad;
        this.CI = CI;
        this.Telefono = Telefono;
        this.Correo = Correo;
        this.Imagen = Imagen;
        this.FechaIniContrato = FechaIniContrato;
        this.FechaFinContrato = FechaFinContrato;
        this.Observacion = Observacion;
        this.IdCargo = IdCargo;
        this.IdSucursal = IdSucursal;
    }
    public Personal(int IdContacto, int IdPersonal, String NombrePersonal, 
            String ApellidoPersonal, String Telefono, String Correo) {
        this.IdContacto = IdContacto;
        this.IdPersonal = IdPersonal;
        this.NombrePersonal = NombrePersonal;
        this.ApellidoPersonal = ApellidoPersonal;
        this.Telefono = Telefono;
        this.Correo = Correo;
    }
    public int getIdContacto() {
        return IdContacto;
    }
    public void setIdContacto(int IdContacto) {
        this.IdContacto = IdContacto;
    }
    public int getIdPersonal() {
        return IdPersonal;
    }
    public void setIdPersonal(int IdPersonal) {
        this.IdPersonal = IdPersonal;
    }
    public String getNombrePersonal() {
        return NombrePersonal;
    }

    public void setNombrePersonal(String NombrePersonal) {
        this.NombrePersonal = NombrePersonal;
    }
    public String getApellidoPersonal() {
        return ApellidoPersonal;
    }
    public void setApellidoPersonal(String ApellidoPersonal) {
        this.ApellidoPersonal = ApellidoPersonal;
    }
    public String getEdad() {
        return Edad;
    }
    public void setEdad(String Edad) {
        this.Edad = Edad;
    }
    public int getCI() {
        return CI;
    }
    public void setCI(int CI) {
        this.CI = CI;
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
    public Date getFechaIniContrato() {
        return FechaIniContrato;
    }
    public void setFechaIniContrato(Date FechaIniContrato) {
        this.FechaIniContrato = FechaIniContrato;
    }
    public Date getFechaFinContrato() {
        return FechaFinContrato;
    }

    public void setFechaFinContrato(Date FechaFinContrato) {
        this.FechaFinContrato = FechaFinContrato;
    }
    public String getObservacion() {
        return Observacion;
    }
    public void setObservacion(String Observacion) {
        this.Observacion = Observacion;
    }
    public int getIdCargo() {
        return IdCargo;
    }
    public void setIdCargo(int IdCargo) {
        this.IdCargo = IdCargo;
    }
    public int getIdSucursal() {
        return IdSucursal;
    }
    public void setIdSucursal(int IdSucursal) {
        this.IdSucursal = IdSucursal;
    }
    public String getNombreCargo() {
        return nombreCargo;
    }

    public void setNombreCargo(String nombreCargo) {
        this.nombreCargo = nombreCargo;
    }

    public String getSucursal() {
        return Sucursal;
    }

    public void setSucursal(String Sucursal) {
        this.Sucursal = Sucursal;
    }

    public int getIdContratoPersonal() {
        return IdContratoPersonal;
    }

    public void setIdContratoPersonal(int IdContratoPersonal) {
        this.IdContratoPersonal = IdContratoPersonal;
    } 
}
