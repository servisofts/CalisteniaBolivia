package Modelo;

public class EgresoChequeTransPro {
    int idChequeTrans;
    float Monto;
    String Fecha;
    String Observacion;
    String TipoPago;
    String Numero;
    int IdP;
    int IdCaja;
    private Proveedor Proveedor;
    private EntidadFinanciera EntidadFinanciera;
    String razonSocial;
    String nombre;
    String apellido;
    String entidad;

    public EgresoChequeTransPro() {
    }

    public EgresoChequeTransPro(int idChequeTrans) {
        this.idChequeTrans = idChequeTrans;
    }
    public EgresoChequeTransPro(float Monto) {
        this.Monto = Monto;
    }

    public EgresoChequeTransPro(int IdCaja,float Monto,int idChequeTrans) {
        this.IdCaja = IdCaja;
        this.Monto = Monto;
        this.idChequeTrans = idChequeTrans;
    }

    public EgresoChequeTransPro(String razonSocial, String nombre, String apellido, String Fecha,float Monto, String Observacion, String TipoPago, String Numero,  String entidad) {
        this.razonSocial = razonSocial;
        this.nombre = nombre;
        this.apellido = apellido;
        this.Fecha = Fecha;
        this.Monto = Monto;
        this.Observacion = Observacion;
        this.TipoPago = TipoPago;
        this.Numero = Numero;
        this.entidad = entidad;
    }
    public EgresoChequeTransPro(int idChequeTrans,String razonSocial, String nombre, String apellido, String Fecha,float Monto, String Observacion, String TipoPago, String Numero,  String entidad) {
        this.idChequeTrans=idChequeTrans;
        this.razonSocial = razonSocial;
        this.nombre = nombre;
        this.apellido = apellido;
        this.Fecha = Fecha;
        this.Monto = Monto;
        this.Observacion = Observacion;
        this.TipoPago = TipoPago;
        this.Numero = Numero;
        this.entidad = entidad;
    }
    public EgresoChequeTransPro(int idChequeTrans, String razonSocial, String nombre, String apellido, String Fecha,float Monto, String Observacion, String TipoPago, String Numero,  String entidad, int IdCaja) {
        this.idChequeTrans=idChequeTrans;
        this.razonSocial = razonSocial;
        this.nombre = nombre;
        this.apellido = apellido;
        this.Fecha = Fecha;
        this.Monto = Monto;
        this.Observacion = Observacion;
        this.TipoPago = TipoPago;
        this.Numero = Numero;
        this.entidad = entidad;
        this.IdCaja=IdCaja;
    }
public EgresoChequeTransPro(String razonSocial, String nombre, String apellido, String Fecha,float Monto, String Observacion, String TipoPago, String Numero) {
        this.razonSocial = razonSocial;
        this.nombre = nombre;
        this.apellido = apellido;
        this.Fecha = Fecha;
        this.Monto = Monto;
        this.Observacion = Observacion;
        this.TipoPago = TipoPago;
        this.Numero = Numero;
    }
public EgresoChequeTransPro(int idChequeTrans,String razonSocial, String nombre, String apellido, String Fecha,float Monto, String Observacion, String TipoPago, String Numero) {
        this.idChequeTrans=idChequeTrans;  
        this.razonSocial = razonSocial;
        this.nombre = nombre;
        this.apellido = apellido;
        this.Fecha = Fecha;
        this.Monto = Monto;
        this.Observacion = Observacion;
        this.TipoPago = TipoPago;
        this.Numero = Numero;
    }
    public EgresoChequeTransPro(int idChequeTrans,String razonSocial, String nombre, String apellido, String Fecha,float Monto, String Observacion, String TipoPago, String Numero, int IdCaja) {
        this.idChequeTrans=idChequeTrans;  
        this.razonSocial = razonSocial;
        this.nombre = nombre;
        this.apellido = apellido;
        this.Fecha = Fecha;
        this.Monto = Monto;
        this.Observacion = Observacion;
        this.TipoPago = TipoPago;
        this.Numero = Numero;
        this.IdCaja=IdCaja;
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

    public int getIdCaja() {
        return IdCaja;
    }

    public void setIdCaja(int IdCaja) {
        this.IdCaja = IdCaja;
    }

    public Proveedor getProveedor() {
        return Proveedor;
    }

    public void setProveedor(Proveedor Proveedor) {
        this.Proveedor = Proveedor;
    }

    public EntidadFinanciera getEntidadFinanciera() {
        return EntidadFinanciera;
    }

    public void setEntidadFinanciera(EntidadFinanciera EntidadFinanciera) {
        this.EntidadFinanciera = EntidadFinanciera;
    }

    public String getRazonSocial() {
        return razonSocial;
    }

    public void setRazonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getEntidad() {
        return entidad;
    }

    public void setEntidad(String entidad) {
        this.entidad = entidad;
    }
    
    
}
