package Modelo;
public class CargoPersonal {
    int IdCargo;
    String NombreCargo;
    byte estado;

    public CargoPersonal(int IdCargo) {
        this.IdCargo = IdCargo;
    }
    
    public CargoPersonal(String NombreCargo) {
        this.NombreCargo = NombreCargo;
    }

    public CargoPersonal(int IdCargo, String NombreCargo) {
        this.IdCargo = IdCargo;
        this.NombreCargo = NombreCargo;
    }

    public CargoPersonal(int IdCargo, String NombreCargo, byte estado) {
        this.IdCargo = IdCargo;
        this.NombreCargo = NombreCargo;
        this.estado = estado;
    }
    
    
    public int getIdCargo() {
        return IdCargo;
    }

    public void setIdCargo(int IdCargo) {
        this.IdCargo = IdCargo;
    }

    public String getNombreCargo() {
        return NombreCargo;
    }

    public void setNombreCargo(String NombreCargo) {
        this.NombreCargo = NombreCargo;
    }

    public byte getEstado() {
        return estado;
    }

    public void setEstado(byte estado) {
        this.estado = estado;
    }
}
