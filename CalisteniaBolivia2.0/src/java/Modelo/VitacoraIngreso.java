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
public class VitacoraIngreso {
    
    int idVitacora;
    String NombreCli;
    String AppCli;
    String Paquete;
    float Monto;
    Date FechaEliminado;
    String Observacion;
    String NombrePer;

    public VitacoraIngreso(int idVitacora, String NombreCli, String AppCli, String Paquete, float Monto, Date FechaEliminado, String Observacion, String NombrePer) {
        this.idVitacora = idVitacora;
        this.NombreCli = NombreCli;
        this.AppCli = AppCli;
        this.Paquete = Paquete;
        this.Monto = Monto;
        this.FechaEliminado = FechaEliminado;
        this.Observacion = Observacion;
        this.NombrePer = NombrePer;
    }

    
    
    public int getIdVitacora() {
        return idVitacora;
    }

    public void setIdVitacora(int idVitacora) {
        this.idVitacora = idVitacora;
    }

    public String getNombreCli() {
        return NombreCli;
    }

    public void setNombreCli(String NombreCli) {
        this.NombreCli = NombreCli;
    }

    public String getAppCli() {
        return AppCli;
    }

    public void setAppCli(String AppCli) {
        this.AppCli = AppCli;
    }

    public String getPaquete() {
        return Paquete;
    }

    public void setPaquete(String Paquete) {
        this.Paquete = Paquete;
    }

    public float getMonto() {
        return Monto;
    }

    public void setMonto(float Monto) {
        this.Monto = Monto;
    }

    public Date getFechaEliminado() {
        return FechaEliminado;
    }

    public void setFechaEliminado(Date FechaEliminado) {
        this.FechaEliminado = FechaEliminado;
    }

    public String getObservacion() {
        return Observacion;
    }

    public void setObservacion(String Observacion) {
        this.Observacion = Observacion;
    }

    public String getNombrePer() {
        return NombrePer;
    }

    public void setNombrePer(String NombrePer) {
        this.NombrePer = NombrePer;
    }
    
    
}
