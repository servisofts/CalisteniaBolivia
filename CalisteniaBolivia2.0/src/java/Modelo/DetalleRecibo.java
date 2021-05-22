/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

/**
 *
 * @author pc
 */
public class DetalleRecibo {
    int idDetalleRecibo;
    int idPaquete;
    int idCliente;
    int idRecibo;

    public DetalleRecibo(int idDetalleRecibo, int idPaquete, int idCliente, int idRecibo) {
        this.idDetalleRecibo = idDetalleRecibo;
        this.idPaquete = idPaquete;
        this.idCliente = idCliente;
        this.idRecibo = idRecibo;
    }

    public DetalleRecibo(int idPaquete, int idCliente, int idRecibo) {
        this.idPaquete = idPaquete;
        this.idCliente = idCliente;
        this.idRecibo = idRecibo;
    }

    public int getIdDetalleRecibo() {
        return idDetalleRecibo;
    }

    public int getIdPaquete() {
        return idPaquete;
    }

    public int getIdCliente() {
        return idCliente;
    }

    public int getIdRecibo() {
        return idRecibo;
    }

    public void setIdDetalleRecibo(int idDetalleRecibo) {
        this.idDetalleRecibo = idDetalleRecibo;
    }

    public void setIdPaquete(int idPaquete) {
        this.idPaquete = idPaquete;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente= idCliente;
    }

    public void setIdRecibo(int idRecibo) {
        this.idRecibo = idRecibo;
    }
    
}
