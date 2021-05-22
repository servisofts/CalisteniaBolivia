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
public class Paquete {
    
    int IdPaquete;
    String NombrePaquete;
    float PrecioPaquete;
    int Cantidad;
    int Duracion;
    int CategoriaPaquete;
    byte Estado;
    String NombreCategoriaPaquete;

    public Paquete(int IdPaquete) {
        this.IdPaquete = IdPaquete;
    }

    public Paquete(int IdPaquete, String NombrePaquete, float PrecioPaquete, int Cantidad, int Duracion,int CategoriaPaquete, byte Estado) {
        this.IdPaquete = IdPaquete;
        this.NombrePaquete = NombrePaquete;
        this.PrecioPaquete = PrecioPaquete;
        this.Cantidad = Cantidad;
        this.Duracion = Duracion;
        this.CategoriaPaquete = CategoriaPaquete;
        this.Estado = Estado;
    }

    public Paquete(int IdPaquete, String NombrePaquete, float PrecioPaquete, int Cantidad, int Duracion,int CategoriaPaquete) {
        this.IdPaquete = IdPaquete;
        this.NombrePaquete = NombrePaquete;
        this.PrecioPaquete = PrecioPaquete;
        this.Cantidad = Cantidad;
        this.Duracion = Duracion;
        this.CategoriaPaquete = CategoriaPaquete;
    }

    public Paquete(String NombrePaquete, float PrecioPaquete, int Cantidad, int Duracion, int CategoriaPaquete) {
        this.NombrePaquete = NombrePaquete;
        this.PrecioPaquete = PrecioPaquete;
        this.Cantidad = Cantidad;
        this.Duracion = Duracion;
        this.CategoriaPaquete = CategoriaPaquete;
    }

    public Paquete(int IdPaquete, String NombrePaquete, float PrecioPaquete, int Cantidad, int Duracion,byte Estado, String NombreCategoriaPaquete) {
        this.IdPaquete = IdPaquete;
        this.NombrePaquete = NombrePaquete;
        this.PrecioPaquete = PrecioPaquete;
        this.Cantidad = Cantidad;
        this.Duracion = Duracion;
        this.Estado = Estado;
        this.NombreCategoriaPaquete = NombreCategoriaPaquete;
    }

    public int getDuracion() {
        return Duracion;
    }

    public void setDuracion(int Duracion) {
        this.Duracion = Duracion;
    }

    
    public int getIdPaquete() {
        return IdPaquete;
    }

    public void setIdPaquete(int IdPaquete) {
        this.IdPaquete = IdPaquete;
    }

    public String getNombrePaquete() {
        return NombrePaquete;
    }

    public void setNombrePaquete(String NombrePaquete) {
        this.NombrePaquete = NombrePaquete;
    }

    public float getPrecioPaquete() {
        return PrecioPaquete;
    }

    public void setPrecioPaquete(float PrecioPaquete) {
        this.PrecioPaquete = PrecioPaquete;
    }

    public int getCantidad() {
        return Cantidad;
    }

    public void setCantidad(int Cantidad) {
        this.Cantidad = Cantidad;
    }

    public int getCategoriaPaquete() {
        return CategoriaPaquete;
    }

    public void setCategoriaPaquete(int CategoriaPaquete) {
        this.CategoriaPaquete = CategoriaPaquete;
    }

    public byte getEstado() {
        return Estado;
    }

    public void setEstado(byte Estado) {
        this.Estado = Estado;
    }

    public String getNombreCategoriaPaquete() {
        return NombreCategoriaPaquete;
    }

    public void setNombreCategoriaPaquete(String NombreCategoriaPaquete) {
        this.NombreCategoriaPaquete = NombreCategoriaPaquete;
    }
    
    
    
}
