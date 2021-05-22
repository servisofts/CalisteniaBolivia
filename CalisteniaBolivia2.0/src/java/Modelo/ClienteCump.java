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
public class ClienteCump {
    String nombre;
    int mes;
    int dia;
    String sucursal;

    public ClienteCump(String nombre, int mes, int dia, String sucursal) {
        this.nombre = nombre;
        this.mes = mes;
        this.dia = dia;
        this.sucursal = sucursal;
    }

    public String getNombre() {
        return nombre;
    }

    public int getMes() {
        return mes;
    }

    public int getDia() {
        return dia;
    }

    public String getSucursal() {
        return sucursal;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setMes(int mes) {
        this.mes = mes;
    }

    public void setDia(int dia) {
        this.dia = dia;
    }

    public void setSucursal(String sucursal) {
        this.sucursal = sucursal;
    }
    
    
}
