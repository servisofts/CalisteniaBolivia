/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

/**
 *
 * @author Hector
 */
public class Zona{
    int IdZona;
    String Nombre;
    byte estado;
    int cantidad;

    public Zona(int IdZona, String Nombre, byte estado) {
        this.IdZona = IdZona;
        this.Nombre = Nombre;
        this.estado = estado;
    }

    public Zona(int IdZona, String Nombre) {
        this.IdZona = IdZona;
        this.Nombre = Nombre;
    }

    public Zona(String Nombre, byte estado) {
        this.Nombre = Nombre;
        this.estado = estado;
    }

    public Zona(String Nombre, int cantidad) {
        this.Nombre = Nombre;
        this.cantidad = cantidad;
    }
    

    public int getIdZona() {
        return IdZona;
    }

    public String getNombre() {
        return Nombre;
    }

    public byte getEstado() {
        return estado;
    }

    public void setIdZona(int IdZona) {
        this.IdZona = IdZona;
    }

    public void setNombre(String Nombre) {
        this.Nombre = Nombre;
    }

    public void setEstado(byte estado) {
        this.estado = estado;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
    
}
