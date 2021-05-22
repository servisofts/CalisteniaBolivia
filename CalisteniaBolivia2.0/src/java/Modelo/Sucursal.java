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
public class Sucursal {
    
    int IdSucursal;
    String NombreSucursal;
    byte estado;
    String Nombre;
    String Apellido;

    public Sucursal(int IdSucursal) {
        this.IdSucursal = IdSucursal;
    }

    public Sucursal(int IdSucursal, String NombreSucursal) {
        this.IdSucursal = IdSucursal;
        this.NombreSucursal = NombreSucursal;
    }
    
    public Sucursal(int IdSucursal, String NombreSucursal, byte estado) {
        this.IdSucursal = IdSucursal;
        this.NombreSucursal = NombreSucursal;
        this.estado = estado;
    }

    public Sucursal(String Nombre, String Apellido,String NombreSucursal) {
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.NombreSucursal = NombreSucursal;
    }

    public Sucursal(String NombreSucursal) {
        this.NombreSucursal = NombreSucursal;
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

    public byte getEstado() {
        return estado;
    }

    public void setEstado(byte estado) {
        this.estado = estado;
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
    
    
}
