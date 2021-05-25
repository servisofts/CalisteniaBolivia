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
public class Proveedor {
    int idContacto;
    int idProveedor;
    String nombre;
    String Apellido;
    int Nit;
    String Telefono;
    String Correo;
    String RazonSocial;

    public Proveedor(int idProveedor, String nombre, String Apellido, int Nit, String Telefono, String Correo, String RazonSocial) {
        this.idProveedor = idProveedor;
        this.nombre = nombre;
        this.Apellido = Apellido;
        this.Nit = Nit;
        this.Telefono = Telefono;
        this.Correo = Correo;
        this.RazonSocial = RazonSocial;
    }

    public Proveedor(String nombre, String Apellido, int Nit, String Telefono, String Correo, String RazonSocial) {
        this.nombre = nombre;
        this.Apellido = Apellido;
        this.Nit = Nit;
        this.Telefono = Telefono;
        this.Correo = Correo;
        this.RazonSocial = RazonSocial;
    }

    public int getIdContacto() {
        return idContacto;
    }

    public void setIdContacto(int idContacto) {
        this.idContacto = idContacto;
    }
    
    public int getIdProveedor() {
        return idProveedor;
    }

    public void setIdProveedor(int idProveedor) {
        this.idProveedor = idProveedor;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return Apellido;
    }

    public void setApellido(String Apellido) {
        this.Apellido = Apellido;
    }

    public int getNit() {
        return Nit;
    }

    public void setNit(int Nit) {
        this.Nit = Nit;
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

    public String getRazonSocial() {
        return RazonSocial;
    }

    public void setRazonSocial(String RazonSocial) {
        this.RazonSocial = RazonSocial;
    }
    
    
}
