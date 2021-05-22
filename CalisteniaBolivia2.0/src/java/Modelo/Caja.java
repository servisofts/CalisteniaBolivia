package Modelo;
import java.sql.Date;
public class Caja {
    int IdCaja;
    Date fechaApertura;
    float saldoCaja;
    //Auxiliar Contrato Personal Para Traer datos con procedimiento de Almacenado/ 
    int IdContrato;
    
    public Caja(int IdCaja) {
        this.IdCaja = IdCaja;
    }
    public Caja(int IdCaja, Date fechaApertura) {
        this.IdCaja = IdCaja;
        this.fechaApertura = fechaApertura;
    }
    public Caja(float saldoCaja) {
        this.saldoCaja = saldoCaja;
    }
    public int getIdCaja() {
        return IdCaja;
    }
    public void setIdCaja(int IdCaja) {
        this.IdCaja = IdCaja;
    }
    public Date getFechaApertura() {
        return fechaApertura;
    }
    public void setFechaApertura(Date fechaApertura) {
        this.fechaApertura = fechaApertura;
    }
    public float getSaldoCaja() {
        return saldoCaja;
    }
    public void setSaldoCaja(float saldoCaja) {
        this.saldoCaja = saldoCaja;
    }
    public int getIdContrato() {
        return IdContrato;
    }
    public void setIdContrato(int IdContrato) {
        this.IdContrato = IdContrato;
    }  
}
