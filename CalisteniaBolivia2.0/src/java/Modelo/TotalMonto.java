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
public class TotalMonto {
    int idMonto;
    String Fecha;
    float IngresoEfeCali;
    float IngresoEfeBox;
    float IngresoTarCali;
    float IngresoTarBox;
    float OtroIngreso;
    float Egreso;
    float EgresoCXC;
    float ChequeTransPer;
    float ChequeTransPro;
    float OtrosEgresos;
    float TotalCaja;
    int idCaja;

    public TotalMonto(int idMonto, String Fecha, float IngresoEfeCali, float IngresoEfeBox, float IngresoTarCali, float IngresoTarBox,float OtroIngreso ,float Egreso, float EgresoCXC, float ChequeTransPer, float ChequeTransPro,float OtrosEgresos ,float TotalCaja, int idCaja) {
        this.idMonto = idMonto;
        this.Fecha = Fecha;
        this.IngresoEfeCali = IngresoEfeCali;
        this.IngresoEfeBox = IngresoEfeBox;
        this.IngresoTarCali = IngresoTarCali;
        this.IngresoTarBox = IngresoTarBox;
        this.OtroIngreso=OtroIngreso;
        this.Egreso = Egreso;
        this.EgresoCXC = EgresoCXC;
        this.ChequeTransPer = ChequeTransPer;
        this.ChequeTransPro = ChequeTransPro;
        this.OtrosEgresos= OtrosEgresos;
        this.TotalCaja = TotalCaja;
        this.idCaja = idCaja;
    }

    public TotalMonto(float IngresoEfeCali, float IngresoEfeBox, float IngresoTarCali, float IngresoTarBox, float OtroIngreso,float Egreso, float EgresoCXC, float ChequeTransPer, float ChequeTransPro, float OtrosEgresos,float TotalCaja) {
        this.IngresoEfeCali = IngresoEfeCali;
        this.IngresoEfeBox = IngresoEfeBox;
        this.IngresoTarCali = IngresoTarCali;
        this.IngresoTarBox = IngresoTarBox;
        this.OtroIngreso=OtroIngreso;
        this.Egreso = Egreso;
        this.EgresoCXC = EgresoCXC;
        this.ChequeTransPer = ChequeTransPer;
        this.ChequeTransPro = ChequeTransPro;
        this.OtrosEgresos= OtrosEgresos;
        this.TotalCaja = TotalCaja;
    }

    
    public int getIdMonto() {
        return idMonto;
    }

    public void setIdMonto(int idMonto) {
        this.idMonto = idMonto;
    }

    public String getFecha() {
        return Fecha;
    }

    public void setFecha(String Fecha) {
        this.Fecha = Fecha;
    }

    public float getIngresoEfeCali() {
        return IngresoEfeCali;
    }

    public void setIngresoEfeCali(float IngresoEfeCali) {
        this.IngresoEfeCali = IngresoEfeCali;
    }

    public float getIngresoEfeBox() {
        return IngresoEfeBox;
    }

    public void setIngresoEfeBox(float IngresoEfeBox) {
        this.IngresoEfeBox = IngresoEfeBox;
    }

    public float getIngresoTarCali() {
        return IngresoTarCali;
    }

    public void setIngresoTarCali(float IngresoTarCali) {
        this.IngresoTarCali = IngresoTarCali;
    }

    public float getIngresoTarBox() {
        return IngresoTarBox;
    }

    public float getOtroIngreso() {
        return OtroIngreso;
    }

    public void setOtroIngreso(float OtroIngreso) {
        this.OtroIngreso = OtroIngreso;
    }

    public void setIngresoTarBox(float IngresoTarBox) {
        this.IngresoTarBox = IngresoTarBox;
    }

    public float getEgreso() {
        return Egreso;
    }

    public void setEgreso(float Egreso) {
        this.Egreso = Egreso;
    }

    public float getEgresoCXC() {
        return EgresoCXC;
    }

    public void setEgresoCXC(float EgresoCXC) {
        this.EgresoCXC = EgresoCXC;
    }

    public float getChequeTransPer() {
        return ChequeTransPer;
    }

    public void setChequeTransPer(float ChequeTransPer) {
        this.ChequeTransPer = ChequeTransPer;
    }

    public float getChequeTransPro() {
        return ChequeTransPro;
    }

    public void setChequeTransPro(float ChequeTransPro) {
        this.ChequeTransPro = ChequeTransPro;
    }

    public float getOtrosEgresos() {
        return OtrosEgresos;
    }

    public void setOtrosEgresos(float OtrosEgresos) {
        this.OtrosEgresos = OtrosEgresos;
    }

    public float getTotalCaja() {
        return TotalCaja;
    }

    public void setTotalCaja(float TotalCaja) {
        this.TotalCaja = TotalCaja;
    }

    public int getIdCaja() {
        return idCaja;
    }

    public void setIdCaja(int idCaja) {
        this.idCaja = idCaja;
    }
    
}
