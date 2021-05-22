/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

/**
 *
 * @author pc
 */
public class Historial {
    String fechaInicio;
    String fechaFin;
    String tipoPaquete;
    Double precio;

    public Historial(String fechaInicio, String fechaFin, String tipoPaquete, Double precio) {
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.tipoPaquete = tipoPaquete;
        this.precio = precio;
    }

    public String getFechaInicio() {
        return fechaInicio;
    }

    public String getFechaFin() {
        return fechaFin;
    }

    public String getTipoPaquete() {
        return tipoPaquete;
    }

    public void setFechaInicio(String fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public void setFechaFin(String fechaFin) {
        this.fechaFin = fechaFin;
    }

    public void setTipoPaquete(String tipoPaquete) {
        this.tipoPaquete = tipoPaquete;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }
    
}
