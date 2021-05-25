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
public class EntidadFinanciera {
    int idEntidadFinanciera;
    String NombreEntidad;

    public EntidadFinanciera(int idEntidadFinanciera, String NombreEntidad) {
        this.idEntidadFinanciera = idEntidadFinanciera;
        this.NombreEntidad = NombreEntidad;
    }

    
    public int getIdEntidadFinanciera() {
        return idEntidadFinanciera;
    }

    public void setIdEntidadFinanciera(int idEntidadFinanciera) {
        this.idEntidadFinanciera = idEntidadFinanciera;
    }

    public String getNombreEntidad() {
        return NombreEntidad;
    }

    public void setNombreEntidad(String NombreEntidad) {
        this.NombreEntidad = NombreEntidad;
    }
 
}
