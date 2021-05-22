package Modelo;
public class CuentaXPagar {
    int IdEgresoCXP;
    int IdCuentaXPagar;
    int IdProveedor;
    String RazonSocial;
    float Monto;
    String FechaOperacion;
    String FechaLimite;
    String Estado;
    int IdCaja;

    public CuentaXPagar(float Monto) {
        this.Monto = Monto;
    }
    
    public CuentaXPagar( float Monto, String FechaLimite,int IdProveedor) {
        this.Monto = Monto;
        this.FechaLimite = FechaLimite;
        this.IdProveedor = IdProveedor;
    }

    public CuentaXPagar(int IdCuentaXPagar, int IdProveedor, String RazonSocial, 
            float Monto, String FechaOperacion, String FechaLimite) {
        this.IdCuentaXPagar = IdCuentaXPagar;
        this.IdProveedor = IdProveedor;
        this.RazonSocial = RazonSocial;
        this.Monto = Monto;
        this.FechaOperacion = FechaOperacion;
        this.FechaLimite = FechaLimite;
    }

    public CuentaXPagar(int IdCuentaXPagar, float Monto, String RazonSocial,
                                                                int IdCaja) {
        this.IdCuentaXPagar = IdCuentaXPagar;
        this.Monto = Monto;
        this.RazonSocial = RazonSocial;
        this.IdCaja = IdCaja;
    }

    public CuentaXPagar(String RazonSocial, String FechaOperacion,float Monto) {
        this.RazonSocial = RazonSocial;
        this.FechaOperacion = FechaOperacion;
        this.Monto = Monto;
    }

    public int getIdEgresoCXP() {
        return IdEgresoCXP;
    }

    public void setIdEgresoCXP(int IdEgresoCXP) {
        this.IdEgresoCXP = IdEgresoCXP;
    }

    public int getIdCuentaXPagar() {
        return IdCuentaXPagar;
    }

    public void setIdCuentaXPagar(int IdCuentaXPagar) {
        this.IdCuentaXPagar = IdCuentaXPagar;
    }

    public int getIdProveedor() {
        return IdProveedor;
    }

    public void setIdProveedor(int IdProveedor) {
        this.IdProveedor = IdProveedor;
    }

    public String getRazonSocial() {
        return RazonSocial;
    }

    public void setRazonSocial(String RazonSocial) {
        this.RazonSocial = RazonSocial;
    }

    public float getMonto() {
        return Monto;
    }

    public void setMonto(float Monto) {
        this.Monto = Monto;
    }

    public String getFechaOperacion() {
        return FechaOperacion;
    }

    public void setFechaOperacion(String FechaOperacion) {
        this.FechaOperacion = FechaOperacion;
    }

    public String getFechaLimite() {
        return FechaLimite;
    }

    public void setFechaLimite(String FechaLimite) {
        this.FechaLimite = FechaLimite;
    }

    public String getEstado() {
        return Estado;
    }

    public void setEstado(String Estado) {
        this.Estado = Estado;
    }

    public int getIdCaja() {
        return IdCaja;
    }

    public void setIdCaja(int IdCaja) {
        this.IdCaja = IdCaja;
    }
}
