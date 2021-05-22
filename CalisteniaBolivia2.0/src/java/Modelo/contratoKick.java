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
public class contratoKick {
     private int IdCliente;
    private int IdPaquete;
    private Cliente Cliente;
    private Paquete Paquete;
    private EntidadFinanciera EntidadFinanciera;
    private String FechaInicio;
    private String FechaFin;
    private String NumeroTarjeta;
    private String TipoPago;
    private String RF;
    private String Numero;
    private int IdCaja;

    public contratoKick() {
    }

    public contratoKick(int IdCliente, int IdPaquete, Cliente Cliente, Paquete Paquete, EntidadFinanciera EntidadFinanciera, String FechaInicio, String FechaFin, String NumeroTarjeta, String TipoPago, int IdCaja) {
        this.IdCliente = IdCliente;
        this.IdPaquete = IdPaquete;
        this.Cliente = Cliente;
        this.Paquete = Paquete;
        this.EntidadFinanciera = EntidadFinanciera;
        this.FechaInicio = FechaInicio;
        this.FechaFin = FechaFin;
        this.NumeroTarjeta = NumeroTarjeta;
        this.TipoPago = TipoPago;
        this.IdCaja = IdCaja;
    }

    
    
    public int getIdCliente() {
        return IdCliente;
    }

    public void setIdCliente(int IdCliente) {
        this.IdCliente = IdCliente;
    }

    public int getIdPaquete() {
        return IdPaquete;
    }

    public void setIdPaquete(int IdPaquete) {
        this.IdPaquete = IdPaquete;
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

    public EntidadFinanciera getEntidadFinanciera() {
        return EntidadFinanciera;
    }

    public void setEntidadFinanciera(EntidadFinanciera EntidadFinanciera) {
        this.EntidadFinanciera = EntidadFinanciera;
    }

    public String getFechaInicio() {
        return FechaInicio;
    }

    public void setFechaInicio(String FechaInicio) {
        this.FechaInicio = FechaInicio;
    }

    public String getFechaFin() {
        return FechaFin;
    }

    public void setFechaFin(String FechaFin) {
        this.FechaFin = FechaFin;
    }

    public String getNumeroTarjeta() {
        return NumeroTarjeta;
    }

    public void setNumeroTarjeta(String NumeroTarjeta) {
        this.NumeroTarjeta = NumeroTarjeta;
    }

    public String getTipoPago() {
        return TipoPago;
    }

    public void setTipoPago(String TipoPago) {
        this.TipoPago = TipoPago;
    }

    public int getIdCaja() {
        return IdCaja;
    }

    public void setIdCaja(int IdCaja) {
        this.IdCaja = IdCaja;
    }

    public String getRF() {
        return RF;
    }

    public void setRF(String RF) {
        this.RF = RF;
    }

    public String getNumero() {
        return Numero;
    }

    public void setNumero(String Numero) {
        this.Numero = Numero;
    }

}
