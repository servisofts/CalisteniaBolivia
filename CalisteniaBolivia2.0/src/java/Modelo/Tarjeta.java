/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

/**
 *
 * @author YakuRocaH
 */
public class Tarjeta {
    int idIngresoTarjeta;
    int numeroTarjeta;
    float monto;
    int idEntidad;

    public Tarjeta() {
    }

    public Tarjeta(int idIngresoTarjeta, int numeroTarjeta, float monto, int idEntidad) {
        this.idIngresoTarjeta = idIngresoTarjeta;
        this.numeroTarjeta = numeroTarjeta;
        this.monto = monto;
        this.idEntidad = idEntidad;
    }

    
    public Tarjeta(int numeroTarjeta, float monto, int idEntidad) {
        this.numeroTarjeta = numeroTarjeta;
        this.monto = monto;
        this.idEntidad = idEntidad;
    }
    
    public int getIdIngresoTarjeta() {
        return idIngresoTarjeta;
    }

    public void setIdIngresoTarjeta(int idIngresoTarjeta) {
        this.idIngresoTarjeta = idIngresoTarjeta;
    }

    public int getNumeroTarjeta() {
        return numeroTarjeta;
    }

    public void setNumeroTarjeta(int numeroTarjeta) {
        this.numeroTarjeta = numeroTarjeta;
    }

    public float getMonto() {
        return monto;
    }

    public void setMonto(float monto) {
        this.monto = monto;
    }

    public int getIdEntidad() {
        return idEntidad;
    }

    public void setIdEntidad(int idEntidad) {
        this.idEntidad = idEntidad;
    }
    
}
