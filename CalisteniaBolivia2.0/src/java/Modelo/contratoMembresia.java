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
public class contratoMembresia {
    int idCliente;
    int idPaquete;
    String fechaInicio;
    String fechaFin;
    int idContratoPersonal;
    public Cliente Cliente;
    public Paquete Paquete;
    String TipoPago;
    public EntidadFinanciera EntidadFinanciera;
    String NumeroTarjeta;
    int IdCaja;

    
    
    public contratoMembresia(int idCliente, int idPaquete, String fechaInicio, String fechaFin, int idContratoPersonal, Cliente Cliente, Paquete Paquete) {
        this.idCliente = idCliente;
        this.idPaquete = idPaquete;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.idContratoPersonal = idContratoPersonal;
        this.Cliente = Cliente;
        this.Paquete = Paquete;
    }

    public contratoMembresia(int idCliente, int idPaquete, String fechaInicio, String fechaFin, int idContratoPersonal, Cliente Cliente, Paquete Paquete, String TipoPago) {
        this.idCliente = idCliente;
        this.idPaquete = idPaquete;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.idContratoPersonal = idContratoPersonal;
        this.Cliente = Cliente;
        this.Paquete = Paquete;
        this.TipoPago = TipoPago;
    }

    public contratoMembresia(int idCliente, int idPaquete, String fechaInicio, String fechaFin, int idContratoPersonal, Cliente Cliente, Paquete Paquete, String TipoPago, EntidadFinanciera EntidadFinanciera, String NumeroTarjeta, int IdCaja) {
        this.idCliente = idCliente;
        this.idPaquete = idPaquete;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.idContratoPersonal = idContratoPersonal;
        this.Cliente = Cliente;
        this.Paquete = Paquete;
        this.TipoPago = TipoPago;
        this.EntidadFinanciera = EntidadFinanciera;
        this.NumeroTarjeta = NumeroTarjeta;
        this.IdCaja = IdCaja;
    }

    
    public contratoMembresia(int idCliente, int idPaquete, String fechaInicio, String fechaFin, int idContratoPersonal) {
        this.idCliente = idCliente;
        this.idPaquete = idPaquete;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.idContratoPersonal = idContratoPersonal;
    }

    public contratoMembresia() {
    }

    public int getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public int getIdPaquete() {
        return idPaquete;
    }

    public void setIdPaquete(int idPaquete) {
        this.idPaquete = idPaquete;
    }

    public String getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(String fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public String getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(String fechaFin) {
        this.fechaFin = fechaFin;
    }

    public int getIdContratoPersonal() {
        return idContratoPersonal;
    }

    public void setIdContratoPersonal(int idContratoPersonal) {
        this.idContratoPersonal = idContratoPersonal;
    }

    
    public Cliente getCliente() {
        return Cliente;
    }

    public void setCliente(Cliente Cliente) {
        this.Cliente = Cliente;
    }

    public Paquete getPaquete() {
        return Paquete;
    }

    public void setPaquete(Paquete Paquete) {
        this.Paquete = Paquete;
    }

    public String getTipoPago() {
        return TipoPago;
    }

    public void setTipoPago(String TipoPago) {
        this.TipoPago = TipoPago;
    }

    public EntidadFinanciera getEntidadFinanciera() {
        return EntidadFinanciera;
    }

    public void setEntidadFinanciera(EntidadFinanciera EntidadFinanciera) {
        this.EntidadFinanciera = EntidadFinanciera;
    }

    public String getNumeroTarjeta() {
        return NumeroTarjeta;
    }

    public void setNumeroTarjeta(String NumeroTarjeta) {
        this.NumeroTarjeta = NumeroTarjeta;
    }


    public int getIdCaja() {
        return IdCaja;
    }

    public void setIdCaja(int IdCaja) {
        this.IdCaja = IdCaja;
    }
    
    
}
