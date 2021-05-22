package Modelo;
public class CategoriaPaquete {
    int IdCategoriaPaquete;
    String NombreCategoriaPaquete;
    byte Estado;

    public CategoriaPaquete(int IdCategoriaPaquete, String NombreCategoriaPaquete, byte Estado) {
        this.IdCategoriaPaquete = IdCategoriaPaquete;
        this.NombreCategoriaPaquete = NombreCategoriaPaquete;
        this.Estado = Estado;
    }

    public CategoriaPaquete(String NombreCategoriaPaquete) {
        this.NombreCategoriaPaquete = NombreCategoriaPaquete;
    }

    public int getIdCategoriaPaquete() {
        return IdCategoriaPaquete;
    }

    public void setIdCategoriaPaquete(int IdCategoriaPaquete) {
        this.IdCategoriaPaquete = IdCategoriaPaquete;
    }

    public String getNombreCategoriaPaquete() {
        return NombreCategoriaPaquete;
    }

    public void setNombreCategoriaPaquete(String NombreCategoriaPaquete) {
        this.NombreCategoriaPaquete = NombreCategoriaPaquete;
    }

    public byte getEstado() {
        return Estado;
    }

    public void setEstado(byte Estado) {
        this.Estado = Estado;
    }   
}
