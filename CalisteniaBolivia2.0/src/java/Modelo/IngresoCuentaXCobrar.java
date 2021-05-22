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
public class IngresoCuentaXCobrar {
    int idingresoCuentaXCobrar;
    int idCuentaxCobrarMenbresia;
    int idIngresoTarjeta;

    public IngresoCuentaXCobrar() {
    }

    public IngresoCuentaXCobrar(int idCuentaxCobrarMenbresia) {
        this.idCuentaxCobrarMenbresia = idCuentaxCobrarMenbresia;
    }
    
    public int getIdingresoCuentaXCobrar() {
        return idingresoCuentaXCobrar;
    }

    public void setIdingresoCuentaXCobrar(int idingresoCuentaXCobrar) {
        this.idingresoCuentaXCobrar = idingresoCuentaXCobrar;
    }

    public int getIdCuentaxCobrarMenbresia() {
        return idCuentaxCobrarMenbresia;
    }

    public void setIdCuentaxCobrarMenbresia(int idCuentaxCobrarMenbresia) {
        this.idCuentaxCobrarMenbresia = idCuentaxCobrarMenbresia;
    }

    public int getIdIngresoTarjeta() {
        return idIngresoTarjeta;
    }

    public void setIdIngresoTarjeta(int idIngresoTarjeta) {
        this.idIngresoTarjeta = idIngresoTarjeta;
    }
    
    
}
