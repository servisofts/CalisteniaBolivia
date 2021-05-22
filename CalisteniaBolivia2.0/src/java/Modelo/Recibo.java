/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

import java.sql.Date;



/**
 *
 * @author Hector
 */
public class Recibo {
    int idRecibo;
    Date fecha;
    int idCliente;
    String tipoPago;

    public Recibo(int idRecibo, Date fecha, int idCliente, String tipoPago) {
        this.idRecibo = idRecibo;
        this.fecha = fecha;
        this.idCliente = idCliente;
        this.tipoPago = tipoPago;
    }

    public Recibo(Date fecha, int idCliente, String tipoPago) {
        this.fecha = fecha;
        this.idCliente = idCliente;
        this.tipoPago = tipoPago;
    }

    public int getIdRecibo() {
        return idRecibo;
    }

    public Date getFecha() {
        return fecha;
    }

    public int getIdCliente() {
        return idCliente;
    }

    public String getTipoPago() {
        return tipoPago;
    }

    public void setIdRecibo(int idRecibo) {
        this.idRecibo = idRecibo;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public void setTipoPago(String tipoPago) {
        this.tipoPago = tipoPago;
    }
       
}
