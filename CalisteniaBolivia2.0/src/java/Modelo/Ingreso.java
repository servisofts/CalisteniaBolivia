/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

import java.sql.Date;

/**
 *
 * @author YakuRocaH
 */
public class Ingreso {
    int idIngresoCaja;
    Date fechaIngreso;
    float efectivo;
    String glosa;
    String rf;
    String numeroRF;
    int idIngresoPersonal;
    int idIngresoCuentaXCobrar;
    int idCaja;
    int sucursal;
    
    int idPaquete;
    int tipoPago;
    
    ///AUXILIARES/////
    String Nombre;
    String Apellido;
    String Paquete;
    int IdContrato1;
    int IdContrato2;
    String NumeroTarjeta;
    int Relacion;
    String NombrePer;
    

    public Ingreso() {
    }

    

    public Ingreso(float efectivo) {
        this.efectivo = efectivo;
    }

    public Ingreso(float efectivo,Date fechaIngreso ) {
        this.efectivo = efectivo;
        this.fechaIngreso = fechaIngreso;
    }

    public Ingreso(int idIngresoCaja, Date fechaIngreso, float efectivo, String glosa, int idCaja) {
        this.idIngresoCaja = idIngresoCaja;
        this.fechaIngreso = fechaIngreso;
        this.efectivo = efectivo;
        this.glosa = glosa;
        this.idCaja = idCaja;
    }
    public Ingreso( String Nombre, String Apellido,Date fechaIngreso, float efectivo, String Paquete) {
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.fechaIngreso = fechaIngreso;
        this.efectivo = efectivo;
        this.Paquete = Paquete;
    }    
////Borrarr despues
    public Ingreso( String Nombre, String Apellido,Date fechaIngreso,float efectivo,String Paquete, String glosa) {
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.fechaIngreso = fechaIngreso;
        this.efectivo = efectivo;
        this.Paquete = Paquete;
        this.glosa = glosa;
    }
///Bueno
    public Ingreso( String Nombre, String Apellido,Date fechaIngreso, float efectivo, String Paquete, String glosa, String rf, String numeroRF) {
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.fechaIngreso = fechaIngreso;
        this.efectivo = efectivo;
        this.Paquete = Paquete;
        this.glosa = glosa;
        this.rf = rf;
        this.numeroRF = numeroRF;
    }
/////Borrar Despues
    public Ingreso( String Nombre, String Apellido,Date fechaIngreso, float efectivo, String Paquete, String NumeroTarjeta, String glosa) {
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.fechaIngreso = fechaIngreso;
        this.efectivo = efectivo;
        this.Paquete = Paquete;
        this.NumeroTarjeta = NumeroTarjeta;
        this.glosa = glosa;
    }
    
    ////Bueno
    public Ingreso( String Nombre, String Apellido,Date fechaIngreso, float efectivo, String Paquete, String NumeroTarjeta, String glosa, String rf, String numeroRF) {
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.fechaIngreso = fechaIngreso;
        this.efectivo = efectivo;
        this.Paquete = Paquete;
        this.NumeroTarjeta = NumeroTarjeta;
        this.glosa = glosa;
        this.rf = rf;
        this.numeroRF = numeroRF;
    }
    

    public Ingreso(float efectivo, String glosa, int idCaja) {
        this.efectivo = efectivo;
        this.glosa = glosa;
        this.idCaja = idCaja;
    }
    
    public Ingreso( int IdContrato1,float efectivo, String glosa, int IdContrato2) {
        this.IdContrato1 = IdContrato1;
        this.efectivo = efectivo;
        this.glosa = glosa;
        this.IdContrato2 = IdContrato2;
    }
    
    
    public Ingreso( int IdContrato1,float efectivo, String glosa, int IdContrato2, int sucursal) {
        this.IdContrato1 = IdContrato1;
        this.efectivo = efectivo;
        this.glosa = glosa;
        this.IdContrato2 = IdContrato2;
        this.sucursal = sucursal;
    }

    public Ingreso(int idCaja,float efectivo,  int IdContrato1,int IdContrato2, int idIngresoCuentaXCobrar,int idIngresoCaja, int Relacion,String Nombre,String Apellido,String Paquete,String glosa,String NombrePer) {
        this.idCaja=idCaja;
        this.efectivo=efectivo;
        this.IdContrato1 = IdContrato1;
        this.IdContrato2 = IdContrato2;
        this.idIngresoCuentaXCobrar = idIngresoCuentaXCobrar;
        this.idIngresoCaja = idIngresoCaja;
        this.Relacion = Relacion;
        this.Nombre=Nombre;
        this.Apellido=Apellido;
        this.Paquete=Paquete;
        this.glosa=glosa;
        this.NombrePer=NombrePer;
    }
    public Ingreso(int idCaja,float efectivo,int idIngresoCaja, String Nombre,String Apellido,String Paquete,String glosa,String NombrePer) {
        this.idCaja=idCaja;
        this.efectivo=efectivo;
        this.idIngresoCaja = idIngresoCaja;
        this.Nombre=Nombre;
        this.Apellido=Apellido;
        this.Paquete=Paquete;
        this.glosa=glosa;
        this.NombrePer=NombrePer;
    }
    public Ingreso(String Nombre, String Apellido, String Paquete, float efectivo, String glosa,  int IdContrato1, int IdContrato2, int idIngresoCuentaXCobrar,int idIngresoCaja, int idCaja) {
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Paquete = Paquete;
        this.efectivo = efectivo;
        this.glosa = glosa;
        this.IdContrato1 = IdContrato1;
        this.IdContrato2 = IdContrato2;
        this.idIngresoCuentaXCobrar = idIngresoCuentaXCobrar; 
        this.idIngresoCaja = idIngresoCaja;
        this.idCaja=idCaja;
    }
    
    public Ingreso(String Nombre, String Apellido, String Paquete, float efectivo, String glosa,String Entidad,String NumeroTarjeta,  int IdContrato1, int IdContrato2, int idIngresoCuentaXCobrar,int idIngresoCaja, int idCaja) {
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Paquete = Paquete;
        this.efectivo = efectivo;
        this.glosa = glosa;
        this.NombrePer=Entidad;
        this.NumeroTarjeta=NumeroTarjeta;
        this.IdContrato1 = IdContrato1;
        this.IdContrato2 = IdContrato2;
        this.idIngresoCuentaXCobrar = idIngresoCuentaXCobrar; 
        this.idIngresoCaja = idIngresoCaja;
        this.idCaja=idCaja;
    }

    public int getSucursal() {
        return sucursal;
    }

    public void setSucursal(int sucursal) {
        this.sucursal = sucursal;
    }
    
    public int getIdIngresoCaja() {
        return idIngresoCaja;
    }

    public void setIdIngresoCaja(int idIngresoCaja) {
        this.idIngresoCaja = idIngresoCaja;
    }

    public Date getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(Date fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }


    public float getEfectivo() {
        return efectivo;
    }

    public void setEfectivo(float efectivo) {
        this.efectivo = efectivo;
    }

    public String getGlosa() {
        return glosa;
    }

    public void setGlosa(String glosa) {
        this.glosa = glosa;
    }

    public String getRf() {
        return rf;
    }

    public void setRf(String rf) {
        this.rf = rf;
    }

    public String getNumeroRF() {
        return numeroRF;
    }

    public void setNumeroRF(String numeroRF) {
        this.numeroRF = numeroRF;
    }

    public int getIdIngresoPersonal() {
        return idIngresoPersonal;
    }

    public void setIdIngresoPersonal(int idIngresoPersonal) {
        this.idIngresoPersonal = idIngresoPersonal;
    }

    public int getIdIngresoCuentaXCobrar() {
        return idIngresoCuentaXCobrar;
    }

    public void setIdIngresoCuentaXCobrar(int idIngresoCuentaXCobrar) {
        this.idIngresoCuentaXCobrar = idIngresoCuentaXCobrar;
    }

    public int getIdCaja() {
        return idCaja;
    }

    public void setIdCaja(int idCaja) {
        this.idCaja = idCaja;
    }

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

    public String getPaquete() {
        return Paquete;
    }

    public void setPaquete(String Paquete) {
        this.Paquete = Paquete;
    }

    public int getIdContrato1() {
        return IdContrato1;
    }

    public void setIdContrato1(int IdContrato1) {
        this.IdContrato1 = IdContrato1;
    }

    public int getIdContrato2() {
        return IdContrato2;
    }

    public void setIdContrato2(int IdContrato2) {
        this.IdContrato2 = IdContrato2;
    }

    public String getNumeroTarjeta() {
        return NumeroTarjeta;
    }

    public void setNumeroTarjeta(String NumeroTarjeta) {
        this.NumeroTarjeta = NumeroTarjeta;
    }

    public int getRelacion() {
        return Relacion;
    }

    public void setRelacion(int Relacion) {
        this.Relacion = Relacion;
    }

    public String getNombrePer() {
        return NombrePer;
    }

    public void setNombrePer(String NombrePer) {
        this.NombrePer = NombrePer;
    }
    
     public Ingreso(int idIngresoCaja, Date fechaIngreso, float efectivo, String glosa, int idPaquete, int tipoPago, int idCaja) {
        this.idIngresoCaja = idIngresoCaja;
        this.fechaIngreso = fechaIngreso;
        this.efectivo = efectivo;
        this.glosa = glosa;
        this.idPaquete = idPaquete;
        this.tipoPago = tipoPago;
        this.idCaja = idCaja;
    }
     
     public void setIdPaquete(int idPaquete) {
        this.idPaquete = idPaquete;
    }
     
     public int getIdPaquete() {
        return idPaquete;
    }
     
     public void setTipoPago(int tipoPago) {
        this.tipoPago = tipoPago;
    }
     
     public int getTipoPago() {
        return tipoPago;
    }
    
    
}
