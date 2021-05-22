package Modelo;

import java.sql.Date;

public class CierreCaja {
    int IdCierreCaja;
    String FechaCierre;
    String Hora;
    float Efectivo;
    String Observacion;
    int IdCaja;
    String Nombre;
    String Apellido;
    int Contrato;
    Date FechaIni;
    Date FechaFin;
    float montoInEfeCali;
    float montoInEfeBox;
    float montoTarCali;
    float montoTarBox;
    float otroIngreso;
    float montoEgresoPer;
    float montoCXP;
    float montoChequePer;
    float montoChequePro;
    float otroEgreso;

    public CierreCaja(float Efectivo) {
        this.Efectivo = Efectivo;
    }

    public CierreCaja(int IdCaja,float Efectivo,String FechaCierre, String Observacion) {
        this.IdCaja = IdCaja;
        this.Efectivo = Efectivo;
        this.FechaCierre=FechaCierre;
        this.Observacion = Observacion;
        
    }

    public CierreCaja(int IdCaja, float Efectivo,String FechaCierre, String Observacion, float montoInEfeCali, float montoInEfeBox, float montoTarCali, float montoTarBox,float otroIngreso ,float montoEgresoPer, float montoCXP, float montoChequePer, float montoChequePro,float otroEgreso) {
        this.IdCaja = IdCaja;
        this.Efectivo = Efectivo;
        this.FechaCierre = FechaCierre;
        this.Observacion = Observacion;
        this.montoInEfeCali = montoInEfeCali;
        this.montoInEfeBox = montoInEfeBox;
        this.montoTarCali = montoTarCali;
        this.montoTarBox = montoTarBox;
        this.otroIngreso = otroIngreso;
        this.montoEgresoPer = montoEgresoPer;
        this.montoCXP = montoCXP;
        this.montoChequePer = montoChequePer;
        this.montoChequePro = montoChequePro;
        this.otroEgreso=otroEgreso;
    }

    
    
    public CierreCaja(int IdCierreCaja, String Nombre, String Apellido, String FechaCierre, 
                        String Hora, float Efectivo, String Observacion, int IdCaja) {
        this.IdCierreCaja = IdCierreCaja;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.FechaCierre = FechaCierre;
        this.Hora = Hora;
        this.Efectivo = Efectivo;
        this.Observacion = Observacion;
        this.IdCaja = IdCaja; 
    }

    public CierreCaja(String FechaCierre, String Hora, float Efectivo, String Observacion, 
                        String Nombre, String Apellido) {
        this.FechaCierre = FechaCierre;
        this.Hora = Hora;
        this.Efectivo = Efectivo;
        this.Observacion = Observacion;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
    }

    public CierreCaja(String FechaCierre) {
        this.FechaCierre = FechaCierre;
    }
    
    public int getIdCierreCaja() {
        return IdCierreCaja;
    }

    public void setIdCierreCaja(int IdCierreCaja) {
        this.IdCierreCaja = IdCierreCaja;
    }

    public String getFechaCierre() {
        return FechaCierre;
    }

    public void setFechaCierre(String FechaCierre) {
        this.FechaCierre = FechaCierre;
    }

    public String getHora() {
        return Hora;
    }

    public void setHora(String Hora) {
        this.Hora = Hora;
    }

    public float getEfectivo() {
        return Efectivo;
    }

    public void setEfectivo(float Efectivo) {
        this.Efectivo = Efectivo;
    }

    public String getObservacion() {
        return Observacion;
    }

    public void setObservacion(String Observacion) {
        this.Observacion = Observacion;
    }

    public int getIdCaja() {
        return IdCaja;
    }

    public void setIdCaja(int IdCaja) {
        this.IdCaja = IdCaja;
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

    public int getContrato() {
        return Contrato;
    }

    public void setContrato(int Contrato) {
        this.Contrato = Contrato;
    }

    public Date getFechaIni() {
        return FechaIni;
    }

    public void setFechaIni(Date FechaIni) {
        this.FechaIni = FechaIni;
    }

    public Date getFechaFin() {
        return FechaFin;
    }

    public void setFechaFin(Date FechaFin) {
        this.FechaFin = FechaFin;
    }

    public float getMontoInEfeCali() {
        return montoInEfeCali;
    }

    public void setMontoInEfeCali(float montoInEfeCali) {
        this.montoInEfeCali = montoInEfeCali;
    }

    public float getMontoInEfeBox() {
        return montoInEfeBox;
    }

    public void setMontoInEfeBox(float montoInEfeBox) {
        this.montoInEfeBox = montoInEfeBox;
    }

    public float getMontoTarCali() {
        return montoTarCali;
    }

    public void setMontoTarCali(float montoTarCali) {
        this.montoTarCali = montoTarCali;
    }

    public float getMontoTarBox() {
        return montoTarBox;
    }

    public void setMontoTarBox(float montoTarBox) {
        this.montoTarBox = montoTarBox;
    }

    public float getOtroIngreso() {
        return otroIngreso;
    }

    public void setOtroIngreso(float otroIngreso) {
        this.otroIngreso = otroIngreso;
    }

    public float getMontoEgresoPer() {
        return montoEgresoPer;
    }

    public void setMontoEgresoPer(float montoEgresoPer) {
        this.montoEgresoPer = montoEgresoPer;
    }

    public float getMontoCXP() {
        return montoCXP;
    }

    public void setMontoCXP(float montoCXP) {
        this.montoCXP = montoCXP;
    }

    public float getMontoChequePer() {
        return montoChequePer;
    }

    public void setMontoChequePer(float montoChequePer) {
        this.montoChequePer = montoChequePer;
    }

    public float getMontoChequePro() {
        return montoChequePro;
    }

    public void setMontoChequePro(float montoChequePro) {
        this.montoChequePro = montoChequePro;
    }

    public float getOtroEgreso() {
        return otroEgreso;
    }

    public void setOtroEgreso(float otroEgreso) {
        this.otroEgreso = otroEgreso;
    }
    
}
