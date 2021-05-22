package Modelo;

public class EgresoChequeTrans {
    int idChequeTrans;
    float Monto;
    String Fecha;
    String Observacion;
    String TipoPago;
    String Numero;
    int IdP;
    int IdCaja;
    private Personal Personal;
    private EntidadFinanciera EntidadFinanciera;
    String Nombre;
    String Apellido;
    String Entidad;
    
    public EgresoChequeTrans() {
    }

    public EgresoChequeTrans(int idChequeTrans) {
        this.idChequeTrans = idChequeTrans;
    }

    public EgresoChequeTrans(int IdCaja, float Monto,int idChequeTrans
            ,String TipoPago,String Numero,String Nombre) {
        this.IdCaja = IdCaja;
        this.Monto = Monto;
        this.idChequeTrans = idChequeTrans;
        this.TipoPago=TipoPago;
        this.Numero=Numero;
        this.Nombre=Nombre;
    }
    public EgresoChequeTrans(int IdCaja, float Monto,int idChequeTrans
            ,String TipoPago,String Numero,String Nombre,String Entidad) {
        this.IdCaja = IdCaja;
        this.Monto = Monto;
        this.idChequeTrans = idChequeTrans;
        this.TipoPago=TipoPago;
        this.Numero=Numero;
        this.Nombre=Nombre;
        this.Entidad=Entidad;
    }
    
    public EgresoChequeTrans(float Monto) {
        this.Monto = Monto;
    }

    public EgresoChequeTrans(String Nombre, String Apellido,String Fecha, float Monto,String Observacion, String TipoPago, String Numero,  String Entidad) {
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Fecha = Fecha;
        this.Monto=Monto;
        this.Observacion = Observacion;
        this.TipoPago = TipoPago;
        this.Numero = Numero;
        this.Entidad = Entidad;
    }
    public EgresoChequeTrans(int idChequeTrans,String Nombre, String Apellido,String Fecha, float Monto,String Observacion, String TipoPago, String Numero,  String Entidad) {
        this.idChequeTrans = idChequeTrans;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Fecha = Fecha;
        this.Monto=Monto;
        this.Observacion = Observacion;
        this.TipoPago = TipoPago;
        this.Numero = Numero;
        this.Entidad = Entidad;
    }
    public EgresoChequeTrans(int idChequeTrans,String Nombre, String Apellido,String Fecha, float Monto,String Observacion, String TipoPago, String Numero,String Entidad,int IdCaja) {
        this.idChequeTrans = idChequeTrans;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Fecha = Fecha;
        this.Monto=Monto;
        this.Observacion = Observacion;
        this.TipoPago = TipoPago;
        this.Numero = Numero;
        this.Entidad = Entidad;
        this.IdCaja = IdCaja;
    }
    public EgresoChequeTrans(String Nombre, String Apellido,String Fecha, float Monto,String Observacion, String TipoPago, String Numero) {
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Fecha = Fecha;
        this.Monto=Monto;
        this.Observacion = Observacion;
        this.TipoPago = TipoPago;
        this.Numero = Numero;
    }
    public EgresoChequeTrans(int idChequeTrans,String Nombre, String Apellido,String Fecha, float Monto,String Observacion, String TipoPago, String Numero) {
        this.idChequeTrans = idChequeTrans;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Fecha = Fecha;
        this.Monto=Monto;
        this.Observacion = Observacion;
        this.TipoPago = TipoPago;
        this.Numero = Numero;
    }
    public EgresoChequeTrans(int idChequeTrans,String Nombre, String Apellido,String Fecha, float Monto,String Observacion, String TipoPago, String Numero,int IdCaja) {
        this.idChequeTrans = idChequeTrans;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Fecha = Fecha;
        this.Monto=Monto;
        this.Observacion = Observacion;
        this.TipoPago = TipoPago;
        this.Numero = Numero;
        this.IdCaja =IdCaja;
    }
    public int getIdChequeTrans() {
        return idChequeTrans;
    }

    public void setIdChequeTrans(int idChequeTrans) {
        this.idChequeTrans = idChequeTrans;
    }

    public float getMonto() {
        return Monto;
    }

    public void setMonto(float Monto) {
        this.Monto = Monto;
    }

    public String getFecha() {
        return Fecha;
    }

    public void setFecha(String Fecha) {
        this.Fecha = Fecha;
    }

    public String getObservacion() {
        return Observacion;
    }

    public void setObservacion(String Observacion) {
        this.Observacion = Observacion;
    }

    
    public String getTipoPago() {
        return TipoPago;
    }

    public void setTipoPago(String TipoPago) {
        this.TipoPago = TipoPago;
    }

    public String getNumero() {
        return Numero;
    }

    public void setNumero(String Numero) {
        this.Numero = Numero;
    }

    public int getIdP() {
        return IdP;
    }

    public void setIdP(int IdP) {
        this.IdP = IdP;
    }

    public EntidadFinanciera getEntidadFinanciera() {
        return EntidadFinanciera;
    }

    public void setEntidadFinanciera(EntidadFinanciera EntidadFinanciera) {
        this.EntidadFinanciera = EntidadFinanciera;
    }

    public int getIdCaja() {
        return IdCaja;
    }

    public void setIdCaja(int IdCaja) {
        this.IdCaja = IdCaja;
    }


    public Personal getPersonal() {
        return Personal;
    }

    public void setPersonal(Personal Personal) {
        this.Personal = Personal;
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

    public String getEntidad() {
        return Entidad;
    }

    public void setEntidad(String Entidad) {
        this.Entidad = Entidad;
    }    
    
}
