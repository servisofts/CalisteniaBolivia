import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SImage, SPage, SText, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import { jsPDF } from "jspdf";
import Svg from 'react-native-svg';

class Manual extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    getPresentacion(){
        return <SView center>
            <SText height={40} center>En este manual intentaremos explicar de la manera más detallada posible el funcionamiento del sistema calisteniabolivia.com</SText>
            <SText height={40} center>Vamos directo al grano!!!</SText>
            <SText height={40} center>Todo el sistema de calistenia se basa en el usuario</SText>
            <SView width={100} height={100}>
                <SImage src={`${SSocket.api.root}${"usuario_" + this.props.state.usuarioReducer.usuarioLog.key+`?date=${new Date().getTime()}`}`} style={{
                    width: "100%",
                    height: "100%",
                }} />
            </SView>
            <SText height={40} center>Cualquier persona puede ingresar a calisteniabolivia.com y registrarse.</SText>
            <SText height={10} center>Al momento de registrarse esa persona ya cuenta con un usuario en el sistema. Recuerda lo mas importante es el usuario.</SText>
            <SText height={30} center>El usuario puede tener los siguientes roles:</SText>
        </SView>
    }
    getRoles() {
        return <SView>
            <SText height={30} center>1.- Cliente</SText>
            <SText height={30} center>2.- Ventas</SText>
            <SText height={30} center>3.- Entrenador</SText>
            <SText height={30} center>4.- Administrador</SText>
            <SText height={30} center>5.- Super Administrador</SText>
        </SView>
    }
    getRolCliente() {
        return <SView>
            <SHr height={25}/>
            <SText fontSize={20} center>Cliente</SText>
            <SText center height={30}>
                Al momento de registrarnos a calisteniabolivia.com el sistema automáticamente nos asigna el rol de Cliente, 
                por el momento este rol solo sirve para que los vendedores puedan hacer ventas a esos usuarios.
            </SText>
            <SText center height={30}>
                Si el usuario no es un cliente de calistenia el Administrador podrá quitar el rol de Cliente y asignarle el correspondiente.
            </SText>
        </SView>
    }
    getRolVentas() {
        return <SView>
            <SHr height={25}/>
            <SText fontSize={20} center>Ventas</SText>
            <SText center height={15}>
                Para que un usuario se convierta en vendedor, un usuario con rol Administrador debe ir al apartado de usuarios, buscar el usuario
                y asignarle el rol de Ventas.
            </SText>
            <SText center height={15} >
                Según un analisis llegamos a la conclusion de que existen dos tipos de usuarios vendedores.
            </SText>

            <SText center height={50} fontSize={15}>
                Vendedor turno mañana:
            </SText>
            <SText center height={15}>
                El vendedor de la mañana en un día ordinario llega a su sucursal, ingresa al sistema y se dirige al apartado de caja.
                Al ingresar la caja debería estar con un saldo de Bs. 200 que el Vendedor del turno de la tarde del día anterior debería haber salvado.
            </SText>
            <SText center height={15}>
                Existe la posivilidad que el Vendedor del turno de la tarde del día anterior no haya cerrado su caja, en este caso el monto salvado deberá ser de 0 y 
                el sistema nos mostrarña la foto y el nombre del Vendedor que no ha cerrado su caja.
            </SText>
            <SText center height={15}>
                En este caso podemos llamar al vendedor para que haga el cierre de su caja o podemos abrir nuestra caja con un monto de Bs. 0 (es bueno recalcar que al momento de cerrar la caja si se abrio con Bs. 0 se deberá salvas Bs 0.).
            </SText>
            <SText center height={15}>
                El Vendedor iniciará su caja con Bs. 200 y podrá comenzar a vender, hacer ingresos y egresos de caja.
            </SText>
            <SText center height={15}>
                Al medio día el Vendedor termina su turno, se dirige al apartado de caja y presiona el boton de cerar caja. Al hacer esto le aparecerá una ventana con dos iconos.
                El vendedor del medio día deberá presionar el ícono mantener efectivo en caja, para que el siguiente Vendedor pueda utilizar este dinero en su caja.
            </SText>

            <SText center height={50} fontSize={15}>
                Vendedor turno tarde:
            </SText>
            <SText center height={15}>
                El vendedor de la tarde en un día ordinario llega a su sucursal, ingresa al sistema y se dirige al apartado de caja.
                Al ingresar la caja debería estar con un saldo de Bs. XXXX que el Vendedor del turno de la mañana debería haber mantenido en caja.
            </SText>
            <SText center height={15}>
                Existe la posivilidad que el Vendedor del turno de la mañana no haya cerrado su caja, en este caso el monto salvado deberá ser de 0 y 
                el sistema nos mostrarña la foto y el nombre del Vendedor que no ha cerrado su caja.
            </SText>
            <SText center height={15}>
                En este caso podemos llamar al vendedor para que haga el cierre de su caja o podemos abrir nuestra caja con un monto de Bs. 0 (es bueno recalcar que al momento de cerrar la caja si se abrio con Bs. 0 se deberá salvas Bs 0.).
            </SText>
            <SText center height={15}>
                El Vendedor iniciará su caja con Bs. XXXX y podrá comenzar a vender, hacer ingresos y egresos de caja.
            </SText>
            <SText center height={15}>
                Al final del día el Vendedor termina su turno, se dirige al apartado de caja y presiona el boton de cerar caja. Al hacer esto le aparecerá una ventana con dos iconos.
                El vendedor de la tarde deberá presionar el ícono enviar efectivo a bancos, esto abre una ventana donde muestra un detalle de el dinero en efectivo que entro en caja. 
                Tambien muestra por defecto un monto de BS. 200 para salvar a la siguiente caja (éste puede ser modificado).
            </SText>
            <SText center height={50} fontSize={15}>
                Realizar una venta:
            </SText>
            <SText center height={15}>
                Sin importar el turno del vendedor las ventas se realizan en el apartado de ventas.    
            </SText>
            <SText center height={15}>1.- Se busca el cliente.</SText>
            <SText center height={15}>2.- Se seleciona el paquete a vender.</SText>
            <SText center height={15}>3.- Se selecionan la fechas del paquete.</SText>
            <SText center height={15}>4.- Se selecionan los tipos de pagos.</SText>
            <SText center height={15}>5.- Se validan los datos del cliente.</SText>
            <SText center height={15}>5.- Se realiza la venta.</SText>
            <SText center height={30}>
                Al realizarse la venta el sistema te redirecciona al perfil del cliente y deberías poder ver el paquete activo. Felicidades 
                ya tienes tu primer cliente activo.
            </SText>
            <SText center height={30}>
                La venta se puede realizar en 4 metodos de pago: Efectivo - Cheque - Tarjeta - Transferencia. En caso de ser efectivo o cheque el dinero se envia a caja como ingreso 
                y queda en espera de cierre. En caso de ser tarjeta o transferencia el dinero se envia a caja como ingreso y luego automáticamente hace un egreso de caja para enviar a bancos (de esta manera queda la constancia que esta caja realizó la venta y envio el dinero a bancos) 
                a la cuenta paramatrizada previamente por el Administrador.
            </SText>
            <SText center height={30}>
                Mientras la caja está abierta un Vendedor puede anular los paquetes vendidos de la caja, para esto se va al apartado de clientes, busca el cliente y presiona el boton de anular paquete. 
                Los movimientos de caja en efectivo o cheque se anularan en la caja y los movimientos de tarjeta o transferencia se anularan en la cuenta bancaria (No se refleja en caja ya que se anulo automaticamente al enviarse a bancos).
            </SText>
        </SView>
    }
    getRolEntrenador() {
        return <SView>
            <SHr height={25}/>
            <SText fontSize={20} center>Entrenador</SText>
            <SText center height={15}>
                El entrenador es un usuario que puede iniciar entrenamientos en cualquier momento del día.
                El Entrenador llega a su sucursal, ingresa al sistema, se dirige al apartado de entrenamientos y le da iniciar entrenamiento, en este momento 
                cualquier cliente de calistenia podrá iniciar un entrenamiento desde su aplicacion de calistenia o el mismo entrenador los podra agregar al entrenamiento.
            </SText>
            <SText center height={15}>
                Actualmente este módulo solo se encarga de administrar la asistencia de los clientes a los entrenamientos, pero se tiene pensado para mantener un 
                seguimiento de rutinas, entrenamientos y progresos del cliente para brindar un mejor apoyo en la evolucion de su entrenamiento.
            </SText>
            <SText center height={15}>
                Entonces el entrenador solo inicial el entrenamiento, registra a los clientes que asisten al entrenamiento y al finalinzar presionan la opcion finalizar entrenamiento. Al finalizar un entrenamiento ya no aparacerá en el 
                apartado de entrenaientos activos.
            </SText>
        </SView>
    }
    getRolAdministrador() {
        return <SView>
            <SHr height={25}/>
            <SText fontSize={20} center>Administrador</SText>
            <SText center height={30}>
                El Administrador es el encargado de administrar el sistema, por lo tanto el Administrador puede:
            </SText>
            <SText center height={15}>- Administrar Usuarios.</SText>
            <SText center height={15}>- Administrar Bancos.</SText>
            <SText center height={15}>- Administrar Cuentas de banco.</SText>
            <SText center height={15}>- Parametrizar tipos de pago y cuentas de banco.</SText>
            <SText center height={15}>- Administrar Sucursales.</SText>
            <SText center height={15}>- Administrar Paquetes de ventas.</SText>
            <SText center height={15}>- Ver historico de Bancos.</SText>
            <SText center height={15}>- Ver historico de Cajas.</SText>
            <SText center height={15}>- Ver clientes activos (Al dar click te redirecciona a las cajas activas).</SText>
            <SText center height={15}>- Ver Cajas activas.(Al dar click te redirecciona a las cajas activas)</SText>
            <SText center height={15}>- Ver reporte de asistencias.</SText>
            <SText center height={15}>- Ver reporte de paquetes vendidos.</SText>
            <SText center height={15}>- Ver reporte de ingresos y egresos.</SText>
            <SText center height={15}>- Ver reporte de ingresos y egresos.</SText>
            <SText center height={15}>
                - Además cuenta con un DashBoard que muestra en tiempo real los 
                    * Clientes activos.
                    * Cajas activas. 
                    * Entrenamientos activos.
                    * Clientes activos por sucursal.
                    * Cajas activas por sucursal. 
                    * Entrenamientos activos por sucursal.
                    * Un grafico de ventas entre fechas por sucursal (dar click en la linea o la sucursal para ver los montos vendidos).
                    * Un grafico de asistencia entre fechas por sucursal (dar click en la linea o la sucursal para ver los montos y en el monto para redireccionar a ver la asistencia).
                </SText>
        </SView>
    }
    render() {
        return (
            <SPage title="Manual">
                <SView col="xs-12" center>
                    <SHr height={25}/>
                    <SText fontSize={20}>Manual de uso del sistema</SText>
                    <SHr height={25}/>
                    <SView col="xs-11" center>
                        {this.getPresentacion()}
                        {this.getRoles()}
                        {this.getRolCliente()}
                        {this.getRolVentas()}
                        {this.getRolEntrenador()}
                        {this.getRolAdministrador()}
                    </SView>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Manual);