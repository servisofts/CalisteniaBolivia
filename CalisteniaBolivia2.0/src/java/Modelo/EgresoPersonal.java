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
public class EgresoPersonal {
    int IdEgresoPersonal;
    int IdConceptoEgresoPersonal;
    int IdCaja;
    int IdContratoPersonal;
    float Monto;
    String Observacion;
    String Nombre;
    String Apellido;
    String Fecha;
    int EgresoCaja;
    int EgresoCaja1;
    int IdConceptoEgresoPersonal1;
    int IdCaja1;
    int cierreCaja;

    public EgresoPersonal(float Monto, String Observacion,int IdCaja) {
        this.Monto = Monto;
        this.Observacion = Observacion;
        this.IdCaja = IdCaja;
    }

    public EgresoPersonal(int IdCaja, int IdContratoPersonal, float Monto, String Observacion) {
        this.IdCaja = IdCaja;
        this.IdContratoPersonal = IdContratoPersonal;
        this.Monto = Monto;
        this.Observacion = Observacion;
    }

    public EgresoPersonal(int IdCaja,float Monto ,int IdConceptoEgresoPersonal1, int EgresoCaja, int IdEgresoPersonal) {
        this.IdCaja = IdCaja;
        this.Monto=Monto;
        this.IdConceptoEgresoPersonal1 = IdConceptoEgresoPersonal1;
        this.EgresoCaja = EgresoCaja;
        this.IdEgresoPersonal = IdEgresoPersonal;
    }
    public EgresoPersonal(int IdCaja,float Monto , int EgresoCaja) {
        this.IdCaja = IdCaja;
        this.Monto=Monto;
        this.EgresoCaja = EgresoCaja;
    }
    
    public EgresoPersonal(String Nombre, String Apellido,float Monto, String Observacion,int EgresoCaja,int IdEgresoPersonal,int IdConceptoEgresoPersonal1,int IdCaja) {
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Monto = Monto;
        this.Observacion = Observacion;
        this.EgresoCaja = EgresoCaja;
        this.IdEgresoPersonal = IdEgresoPersonal;
        this.IdConceptoEgresoPersonal1 = IdConceptoEgresoPersonal1;
        this.IdCaja = IdCaja;
    }

    public EgresoPersonal(int IdContratoPersonal) {
        this.IdContratoPersonal = IdContratoPersonal;
    }

    public EgresoPersonal(float Monto) {
        this.Monto = Monto;
    }


    public EgresoPersonal(int IdCaja, float Monto, String Observacion,int IdEgresoPersonal,String Nombre) {
        this.IdCaja = IdCaja;
        this.Monto = Monto;
        this.Observacion=Observacion;
        this.IdEgresoPersonal = IdEgresoPersonal;
        this.Nombre=Nombre;
    }
    
    public EgresoPersonal(int IdEgresoPersonal, float Monto, String Fecha, String Observacion) {
        this.IdEgresoPersonal = IdEgresoPersonal;
        this.Monto = Monto;
        this.Fecha = Fecha;
        this.Observacion = Observacion;
    }
    public EgresoPersonal(int IdEgresoPersonal, float Monto, String Fecha, String Observacion, int IdCaja) {
        this.IdEgresoPersonal = IdEgresoPersonal;
        this.Monto = Monto;
        this.Fecha = Fecha;
        this.Observacion = Observacion;
        this.IdCaja=IdCaja;
    }

    public EgresoPersonal(String Nombre, String Apellido, String Fecha,float Monto, String Observacion ) {
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Fecha = Fecha;
        this.Monto = Monto;
        this.Observacion = Observacion;
    }

    public EgresoPersonal(String Nombre, String Apellido, String Fecha,float Monto, String Observacion, int IdCaja, int IdConceptoEgresoPersonal,int IdEgresoPersonal, int EgresoCaja) {
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Fecha = Fecha;
        this.Monto = Monto;
        this.Observacion = Observacion;
        this.IdCaja = IdCaja;
        this.IdConceptoEgresoPersonal = IdConceptoEgresoPersonal;
        this.IdEgresoPersonal = IdEgresoPersonal;
        this.EgresoCaja = EgresoCaja;
    }

  public EgresoPersonal(String Nombre, String Apellido, String Fecha,float Monto, String Observacion, int IdCaja, int IdConceptoEgresoPersonal,int IdEgresoPersonal, int EgresoCaja, int cierreCaja) {
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Fecha = Fecha;
        this.Monto = Monto;
        this.Observacion = Observacion;
        this.IdCaja = IdCaja;
        this.IdConceptoEgresoPersonal = IdConceptoEgresoPersonal;
        this.IdEgresoPersonal = IdEgresoPersonal;
        this.EgresoCaja = EgresoCaja;
        this.cierreCaja=cierreCaja;
    }
    
   

    public EgresoPersonal(int EgresoCaja, int IdCaja,int IdConceptoEgresoPersonal, float Monto, String Observacion) {
        this.EgresoCaja = EgresoCaja;
        this.IdConceptoEgresoPersonal = IdConceptoEgresoPersonal;
        this.IdCaja = IdCaja;
        this.Monto = Monto;
        this.Observacion = Observacion;
    }
    public EgresoPersonal(int EgresoCaja, int IdCaja,int IdConceptoEgresoPersonal, float Monto, String Observacion, int cierreCaja) {
        this.EgresoCaja = EgresoCaja;
        this.IdConceptoEgresoPersonal = IdConceptoEgresoPersonal;
        this.IdCaja = IdCaja;
        this.Monto = Monto;
        this.Observacion = Observacion;
        this.cierreCaja=cierreCaja;
    }
   

    public EgresoPersonal(int EgresoCaja,int IdEgresoPersonal, int IdConceptoEgresoPersonal, int IdCaja, float Monto, String Observacion) {
        this.EgresoCaja = EgresoCaja;
        this.IdEgresoPersonal = IdEgresoPersonal;
        this.IdConceptoEgresoPersonal = IdConceptoEgresoPersonal;
        this.IdCaja = IdCaja;
        this.Monto = Monto;
        this.Observacion = Observacion;
    }

    public EgresoPersonal( int EgresoCaja, int EgresoCaja1,int IdConceptoEgresoPersonal, int IdCaja, int IdCaja1, float Monto, String Observacion) {
        this.EgresoCaja = EgresoCaja;
        this.EgresoCaja1 = EgresoCaja1;
        this.IdConceptoEgresoPersonal = IdConceptoEgresoPersonal;
        this.IdCaja = IdCaja;
        this.IdCaja1 = IdCaja1;
        this.Monto = Monto;
        this.Observacion = Observacion;
    }

    
    
    public int getIdEgresoPersonal() {
        return IdEgresoPersonal;
    }

    public void setIdEgresoPersonal(int IdEgresoPersonal) {
        this.IdEgresoPersonal = IdEgresoPersonal;
    }

    public int getIdConceptoEgresoPersonal() {
        return IdConceptoEgresoPersonal;
    }

    public void setIdConceptoEgresoPersonal(int IdConceptoEgresoPersonal) {
        this.IdConceptoEgresoPersonal = IdConceptoEgresoPersonal;
    }

    public int getIdCaja() {
        return IdCaja;
    }

    public void setIdCaja(int IdCaja) {
        this.IdCaja = IdCaja;
    }

    public int getIdContratoPersonal() {
        return IdContratoPersonal;
    }

    public void setIdContratoPersonal(int IdContratoPersonal) {
        this.IdContratoPersonal = IdContratoPersonal;
    }

    public float getMonto() {
        return Monto;
    }

    public void setMonto(float Monto) {
        this.Monto = Monto;
    }

    public String getObservacion() {
        return Observacion;
    }

    public void setObservacion(String Observacion) {
        this.Observacion = Observacion;
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

    public String getFecha() {
        return Fecha;
    }

    public void setFecha(String Fecha) {
        this.Fecha = Fecha;
    }

    public int getEgresoCaja() {
        return EgresoCaja;
    }

    public void setEgresoCaja(int EgresoCaja) {
        this.EgresoCaja = EgresoCaja;
    }

    public int getEgresoCaja1() {
        return EgresoCaja1;
    }

    public void setEgresoCaja1(int EgresoCaja1) {
        this.EgresoCaja1 = EgresoCaja1;
    }

    public int getIdConceptoEgresoPersonal1() {
        return IdConceptoEgresoPersonal1;
    }

    public void setIdConceptoEgresoPersonal1(int IdConceptoEgresoPersonal1) {
        this.IdConceptoEgresoPersonal1 = IdConceptoEgresoPersonal1;
    }

    public int getIdCaja1() {
        return IdCaja1;
    }

    public void setIdCaja1(int IdCaja1) {
        this.IdCaja1 = IdCaja1;
    }

    public int getCierreCaja() {
        return cierreCaja;
    }

    public void setCierreCaja(int cierreCaja) {
        this.cierreCaja = cierreCaja;
    }
    
    
}
