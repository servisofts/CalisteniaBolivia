import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SLoad, SPage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import SSRolesPermisos, { GetRoles } from '../../../SSRolesPermisos';
import TipoPago from '../../TipoPago';


class Manual extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontSize: 16,
        };

    }
    getPresentacion() {
        return <SView col={"xs-12"} center>
            <SText fontSize={this.state.fontSize} center font={"Roboto"}>En este manual intentaremos explicar de la manera más detallada posible el funcionamiento del sistema <SText color={"#999"} style={{ textDecoration: "underline" }}>calisteniabolivia.com</SText></SText>
            <SHr />
            <SText fontSize={this.state.fontSize} center font={"Roboto"} fontSize={18} >Bienvenido!!!</SText>
            <SHr height={16} />


            <SView col={"xs-6"} height={100} center>
                <SView width={60} height={60}>
                    <SImage src={`${SSocket.api.root}${"usuario_" + this.props.state.usuarioReducer.usuarioLog.key + `?date=${new Date().getTime()}`}`} style={{
                        width: "100%",
                        height: "100%",
                    }} />
                </SView>
                <SView flex style={{
                    paddingLeft: 8,
                }}>
                    <SText fontSize={this.state.fontSize} font={"Roboto"} >{`${this.props.state.usuarioReducer.usuarioLog.Nombres} ${this.props.state.usuarioReducer.usuarioLog.Apellidos}`}</SText>
                    {/* <SText fontSize={10} font={"Roboto"} >{obj.key}</SText> */}
                </SView>
            </SView>
            <SText fontSize={this.state.fontSize} center font={"Roboto"} fontSize={20} >Comencemos.</SText>
            <SHr height={16} />
            <SView col={"xs-12"}>
                <SText fontSize={this.state.fontSize} font={"Roboto"} >Todo el sistema de calistenia se basa en el usuario</SText>
                <SHr />
                <SText fontSize={this.state.fontSize} font={"Roboto"} >Cualquier persona puede ingresar a calisteniabolivia.com y registrarse.</SText>
                <SHr />
                <SText fontSize={this.state.fontSize} font={"Roboto"} >Al momento de registrarse esa persona ya cuenta con un usuario en el sistema. Recuerda lo mas importante es el usuario.</SText>
                <SHr />
                <SText fontSize={this.state.fontSize} font={"Roboto"}  >El usuario puede tener los siguientes roles:</SText>
                <SHr />
            </SView>

        </SView>
    }
    getRoles() {
        var roles = GetRoles(this.props);
        if (!roles) return <SLoad />;

        return < SView col={"xs-12"} card center style={{
            padding: 8,
        }} >
            {Object.keys(roles).map((key) => {
                var obj = roles[key];
                return <SView col={"xs-12"} height={60} row center>
                    <SView width={45} height={45}>
                        <SImage src={`${SSocket.api.rp}rol/${obj.key}`} />
                    </SView>
                    <SView flex style={{
                        paddingLeft: 8,
                    }}>
                        <SText fontSize={this.state.fontSize} font={"Roboto"} >{obj.descripcion}</SText>
                        {/* <SText fontSize={10} font={"Roboto"} >{obj.key}</SText> */}
                    </SView>
                </SView>
            })}
        </SView >
    }
    getRolCliente() {
        var roles = GetRoles(this.props);
        if (!roles) return <SLoad />;
        var obj = roles["d16d800e-5b8d-48ae-8fcb-99392abdf61f"];
        return <SView col={"xs-12"} card style={{
            padding: 8,
        }}>
            <SView col={"xs-12"} height={60} row center>
                <SView width={45} height={45}>
                    <SImage src={`${SSocket.api.rp}rol/${obj.key}`} />
                </SView>
                <SView flex style={{
                    paddingLeft: 8,
                }}>
                    <SText fontSize={this.state.fontSize} font={"Roboto"} >{obj.descripcion}</SText>
                </SView>
            </SView>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                Al momento de registrarnos a calisteniabolivia.com el sistema automáticamente nos asigna el rol de Cliente,
                por el momento este rol solo sirve para que los vendedores puedan hacer ventas a esos usuarios.
            </SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                Si el usuario no es un cliente de calistenia el Administrador podrá quitar el rol de Cliente y asignarle el correspondiente.
            </SText>
            <SHr height={25} />
        </SView>
    }
    getDetalle(mensaje, icon) {
        return <SView col={"xs-4 md-3 xl-2"} center style={{
            height: 70,
        }}>
            <SView style={{
                width: 35,
                height: 35,
                justifyContent: "center",
                alignItems: "center",
            }}>
                {icon}
            </SView>
            <SText style={{
                fontSize: 10,
                textAlign: "center"
            }}>{mensaje}</SText>
        </SView>
    }
    getTipoPago() {
        var reducer = this.props.state.tipoPagoReducer;
        var data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando") return false;
            var object = {
                component: "tipoPago",
                type: "getAll",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            }
            SSocket.send(object, true);
            return false;
        }
        return data;
    }
    getIcon(monto) {
        return <SIcon name={(monto >= 0 ? "Ingreso" : "Egreso")} style={{ width: 34, height: 34, }} />
    }
    getIconTipoPago(type, data) {
        // alert(JSON.stringify(data))
        // return <SText>{JSON.stringify(data.data)}</SText>
        if (!data.data) return <SIcon name={"Money"} style={{ width: 34, height: 34, }} />;
        return <SView style={{ width: 34, height: 34, }}>{TipoPago.Actions.getIcon(data.data.key_tipo_pago)}</SView>;
    }
    getIconTipo(type, monto) {
        switch (type.key) {
            case "1": return <SIcon name="Add" style={{ width: 34, height: 34, }} />; //apertura
            case "3": return <SIcon name="Paquete" style={{ width: 34, height: 34, }} />; //venta_servicio
            case "4": return <SIcon name={"Caja"} style={{ width: 34, height: 34, }} />; //movimiento de caja
            default: return <SIcon name="Add" style={{ width: 34, height: 34, }} />;
        }
    }
    getInfo() {
        var tiposPagos = this.getTipoPago();
        if (!tiposPagos) return <SView />
        return <SView center col={"xs-12 md-10 xl-8"} row center>
            <SView col={"xs-12"} height={32} center style={{ borderBottomWidth: 1, borderBottomColor: STheme.color.card }}></SView>
            <SView col={"xs-12"} height={32} center>
                <SText style={{ color: "#999" }}>Informacion</SText>
            </SView>
            {this.getDetalle("Ingreso de caja", this.getIcon(1))}
            {this.getDetalle("Egreso de caja", this.getIcon(-1))}

            <SView col={"xs-12"} height={32} center style={{ borderBottomWidth: 1, borderBottomColor: STheme.color.card }}></SView>
            <SView col={"xs-12"} height={32} center>
                <SText style={{ color: "#999" }}>Tipos de pagos</SText>
            </SView>
            {Object.keys(tiposPagos).map((key, index) => {
                return this.getDetalle(tiposPagos[key].descripcion, this.getIconTipoPago(null, { data: { key_tipo_pago: key } }))
            })}
            <SView col={"xs-12"} height={32} center>
                <SText style={{ color: "#999", fontSize: 10, }}>Los pagos en tarjeta y transferecia se ingresan automaticamente al banco.</SText>
            </SView>
            <SView col={"xs-12"} height={32} center style={{ borderBottomWidth: 1, borderBottomColor: STheme.color.card }}></SView>
            <SView col={"xs-12"} height={32} center>
                <SText style={{ color: "#999" }}>Tipos de movimientos</SText>
            </SView>
            {this.getDetalle("Movimiento de apertura", this.getIconTipo({ key: "1" }))}
            {this.getDetalle("Movimiento de venta de paquete", this.getIconTipo({ key: "3" }))}
            {this.getDetalle("Movimiento de caja", this.getIconTipo({ key: "4" }))}

            <SView col={"xs-12"} height={32} center style={{ borderBottomWidth: 1, borderBottomColor: STheme.color.card }}></SView>
            <SView col={"xs-12"} height={62} center></SView>

        </SView>

    }
    getRolVentas() {
        var roles = GetRoles(this.props);
        if (!roles) return <SLoad />;
        var obj = roles["ececdfbf-c82c-4cf9-8f1b-989bbdee5087"];
        return <SView col={"xs-12"} card style={{
            padding: 8,
        }}>
            <SView col={"xs-12"} height={60} row center>
                <SView width={45} height={45}>
                    <SImage src={`${SSocket.api.rp}rol/${obj.key}`} />
                </SView>
                <SView flex style={{
                    paddingLeft: 8,
                }}>
                    <SText fontSize={this.state.fontSize} font={"Roboto"} >{obj.descripcion}</SText>
                </SView>
            </SView>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                Para que un usuario se convierta en vendedor, un usuario con rol Administrador debe ir al apartado de usuarios, buscar el usuario
                y asignarle el rol de Ventas.
            </SText>
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"}   >
                Existen dos tipos de usuarios vendedores.
            </SText>
            <SHr />

            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                Vendedor turno mañana:
            </SText>
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                El vendedor de la mañana en un día ordinario llega a su sucursal, ingresa al sistema y se dirige al apartado de caja.
                Al ingresar la caja debería estar con un saldo de Bs. 200 que el Vendedor del turno de la tarde del día anterior debería haber salvado.
            </SText>

            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                Existe la posibilidad que el Vendedor del turno de la tarde del día anterior no haya cerrado su caja, en este caso el monto salvado deberá ser de 0 y
                el sistema nos mostrarña la foto y el nombre del Vendedor que no ha cerrado su caja.
            </SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                En este caso podemos llamar al vendedor para que haga el cierre de su caja o podemos abrir nuestra caja con un monto de Bs. 0 (es bueno recalcar que al momento de cerrar la caja si se abrio con Bs. 0 se deberá salvas Bs 0.).
            </SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                El Vendedor iniciará su caja con Bs. 200 y podrá comenzar a vender, hacer ingresos y egresos de caja.
            </SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                Al medio día el Vendedor termina su turno, se dirige al apartado de caja y presiona el boton de cerar caja. Al hacer esto le aparecerá una ventana con dos iconos.
                El vendedor del medio día deberá presionar el ícono mantener efectivo en caja, para que el siguiente Vendedor pueda utilizar este dinero en su caja.
            </SText>
            <SHr />

            <SView col={"xs-12"} row center>
                <SIcon name={"Money"} style={{
                    width: 40,
                    height: 40,
                }} />
                <SText color={"#999"} fontSize={12}>Mantener efectivo en caja.</SText>
                <SText color={"#999"} fontSize={12}>(Normalmente al medio día)</SText>
            </SView>
            <SHr />
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                Vendedor turno tarde:
            </SText>
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                El vendedor de la tarde en un día ordinario llega a su sucursal, ingresa al sistema y se dirige al apartado de caja.
                Al ingresar la caja debería estar con un saldo de Bs. XXXX que el Vendedor del turno de la mañana debería haber mantenido en caja.
            </SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                Existe la posibilidad que el Vendedor del turno de la mañana no haya cerrado su caja, en este caso el monto salvado deberá ser de 0 y
                el sistema nos mostrarña la foto y el nombre del Vendedor que no ha cerrado su caja.
            </SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                En este caso podemos llamar al vendedor para que haga el cierre de su caja o podemos abrir nuestra caja con un monto de Bs. 0 (es bueno recalcar que al momento de cerrar la caja si se abrio con Bs. 0 se deberá salvas Bs 0.).
            </SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                El Vendedor iniciará su caja con Bs. XXXX y podrá comenzar a vender, hacer ingresos y egresos de caja.
            </SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                Al final del día el Vendedor termina su turno, se dirige al apartado de caja y presiona el boton de cerar caja. Al hacer esto le aparecerá una ventana con dos iconos.
                El vendedor de la tarde deberá presionar el ícono enviar efectivo a bancos, esto abre una ventana donde muestra un detalle de el dinero en efectivo que entro en caja.
                Tambien muestra por defecto un monto de BS. 200 para salvar a la siguiente caja (éste puede ser modificado).
            </SText>
            <SHr />

            <SView col={"xs-12"} row center>
                <SIcon name={"Card"} style={{
                    width: 40,
                    height: 40,
                }} />
                <SText color={"#999"} fontSize={12}>Realizar el depocito en la cuenta!</SText>
                <SText color={"#999"} fontSize={12}>(Normalmente al finalizar el día)</SText>
            </SView>
            <SHr />
            <SHr />

            <SView col={"xs-12"} row center>
                <SView width={45} height={45}>
                    <SImage src={`${SSocket.api.rp}page/1fdec746-5a0c-4786-9d8d-44f46ab86a01`} />
                </SView>
                <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                    Realizar una venta:
                </SText>
                <SView flex />
            </SView>
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                Sin importar el turno del vendedor las ventas se realizan en el apartado de ventas.
            </SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >1.- Se busca el cliente.</SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >2.- Se seleciona el paquete a vender.</SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >3.- Se selecionan la fechas del paquete.</SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >4.- Se selecionan los tipos de pagos.</SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >5.- Se validan los datos del cliente.</SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >5.- Se realiza la venta.</SText>
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                Al realizarse la venta el sistema te redirecciona al perfil del cliente y deberías poder ver el paquete activo. Felicidades
                ya tienes tu primer cliente activo.
            </SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                La venta se puede realizar en 4 metodos de pago: Efectivo - Cheque - Tarjeta - Transferencia. En caso de ser efectivo o cheque el dinero se envia a caja como ingreso
                y queda en espera de cierre. En caso de ser tarjeta o transferencia el dinero se envia a caja como ingreso y luego automáticamente hace un egreso de caja para enviar a bancos (de esta manera queda la constancia que esta caja realizó la venta y envio el dinero a bancos)
                a la cuenta paramatrizada previamente por el Administrador.
            </SText>
            <SHr />

            <SView col={'xs-12'} center>
                {this.getInfo()}
            </SView>
            <SHr />

            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                Mientras la caja está abierta un Vendedor puede anular los paquetes vendidos de la caja, para esto se va al apartado de clientes, busca el cliente y presiona el boton de anular paquete.
                Los movimientos de caja en efectivo o cheque se anularan en la caja y los movimientos de tarjeta o transferencia se anularan en la cuenta bancaria (No se refleja en caja ya que se anulo automaticamente al enviarse a bancos).
            </SText>
        </SView>
    }
    getRolEntrenador() {
        var roles = GetRoles(this.props);
        if (!roles) return <SLoad />;
        var obj = roles["b5b4a616-dd16-4443-b859-39245f50c8df"];
        return <SView col={"xs-12"} card style={{
            padding: 8,
        }}>
            <SView col={"xs-12"} height={60} row center>
                <SView width={45} height={45}>
                    <SImage src={`${SSocket.api.rp}rol/${obj.key}`} />
                </SView>
                <SView flex style={{
                    paddingLeft: 8,
                }}>
                    <SText fontSize={this.state.fontSize} font={"Roboto"} >{obj.descripcion}</SText>
                </SView>
            </SView>

            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                El entrenador es un usuario que puede iniciar entrenamientos en cualquier momento del día.
                El Entrenador llega a su sucursal, ingresa al sistema, se dirige al apartado de entrenamientos y preciona iniciar entrenamiento.
            </SText>

            <SView col={"xs-11"} height={300} center>
                <SImage src={require("./img/iniciar_entrenamiento.png")} />
            </SView>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                en este momento los cliente de calistenia podrán ingresar a un entrenamiento desde su aplicacion de calistenia o el mismo entrenador los podrá agregar al entrenamiento.
            </SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                Actualmente este módulo solo se encarga de administrar la asistencia de los clientes a los entrenamientos, pero se tiene pensado para mantener un
                seguimiento de rutinas, entrenamientos y progresos del cliente para brindar un mejor apoyo en la evolucion de su entrenamiento.
            </SText>
            <SView col={"xs-11"} height={300}>
                <SImage src={require("./img/asistencia.png")} />
            </SView>

            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                Entonces el entrenador solo inicial el entrenamiento, registra a los clientes que asisten al entrenamiento y al finalinzar presionan la opcion finalizar entrenamiento. Al finalizar un entrenamiento ya no aparacerá en el
                apartado de entrenaientos activos.
            </SText>
            <SView col={"xs-11"} height={300}>
                <SImage src={require("./img/terminar_entrenamiento.png")} />
            </SView>
        </SView>
    }
    getRolAdministrador() {
        var roles = GetRoles(this.props);
        if (!roles) return <SLoad />;
        var obj = roles["47149d4e-4826-4ef9-9b22-5923471be112"];
        return <SView col={"xs-12"} card style={{
            padding: 8,
        }}>
            <SView col={"xs-12"} height={60} row center>
                <SView width={45} height={45}>
                    <SImage src={`${SSocket.api.rp}rol/${obj.key}`} />
                </SView>
                <SView flex style={{
                    paddingLeft: 8,
                }}>
                    <SText fontSize={this.state.fontSize} font={"Roboto"} >{obj.descripcion}</SText>
                </SView>
            </SView>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                El Administrador es el encargado de administrar el sistema, por lo tanto el Administrador puede:
            </SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >- Administrar Usuarios.</SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >- Administrar Bancos.</SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >- Administrar Cuentas de banco.</SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >- Parametrizar tipos de pago y cuentas de banco.</SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >- Administrar Sucursales.</SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >- Administrar Paquetes de ventas.</SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >- Ver historico de Bancos.</SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >- Ver historico de Cajas.</SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >- Ver clientes activos (Al dar click te redirecciona a las cajas activas).</SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >- Ver Cajas activas.(Al dar click te redirecciona a las cajas activas)</SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >- Ver reporte de asistencias.</SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >- Ver reporte de paquetes vendidos.</SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >- Ver reporte de ingresos y egresos.</SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >- Ver reporte de ingresos y egresos.</SText>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
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
    getFondoInversionAdmin() {
        var roles = GetRoles(this.props);
        if (!roles) return <SLoad />;
        var obj = roles["47149d4e-4826-4ef9-9b22-5923471be112"];
        return <SView col={"xs-12"} card style={{
            padding: 8,
        }}>
            <SView col={"xs-12"} height={60} row center>
                <SView width={45} height={45}>
                    <SImage src={`${SSocket.api.rp}rol/${obj.key}`} />
                </SView>
                <SView flex style={{
                    paddingLeft: 8,
                }}>
                    <SText fontSize={this.state.fontSize} font={"Roboto"} >{obj.descripcion}</SText>
                </SView>
            </SView>
            <SHr />
            <SHr />
            <SHr />
            <SHr />
            <SView col={"xs-11"} height={50} center>
                <SView col={"xs-11"} height={50} center>
                    <SImage src={require("./img/fondo_inversion.png")} enablePreview/>
                </SView>
                <SView col={"xs-11"} height={50} center>
                    <SText center fontSize={this.state.fontSize} font={"Roboto"}  >
                        Módulo de inversiones
                    </SText>
                </SView>
            </SView>
            <SHr />
            <SHr />
            <SHr />
            <SHr />
            <SHr />
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"} >
                Bienvenido al módulo de inversiones, este modulo te permite realizar las siguientes acciones
            </SText>
            <SHr />
            <SHr />
            <SHr />
            <SHr />
            <SView col={"xs-11"} height={100} center>
                <SImage src={require("./img/fondo_inversion_actions.png")} enablePreview/>
            </SView>
            <SHr />
            <SHr />
            <SHr />
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"} >
                Fondos de inversión:
            </SText>
            <SHr />
            <SHr />
            <SHr />
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"} >
                Si ingresa a la opción "Fondos de inversion" tendrá acceso al panel administrativo de inversiones, este panel contiene.
            </SText>
            <SHr />
            <SHr />
            <SHr />
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"} >
                - Gestión de fondos de inversión.
            </SText>
            <SHr />
            <SHr />
            <SHr />
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"} >
                - Gestión de sucursales, de las cuales quiere obtener el calculo de retorno inversión
            </SText>
            <SHr />
            <SHr />
            <SHr />
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"} >
                - Gestión de inversionistas
            </SText>
            <SHr />
            <SHr />
            <SHr />
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"} >
                - Gestión de preventas, Aprobar preventas, el inversionista podrá solicitar una preventa y quedará pendiente hasta que el administrador la apruebe.
            </SText>
            <SHr />
            <SHr />
            <SHr />
            <SHr />
            <SView col={"xs-11"} height={300} center>
                <SImage src={require("./img/fondo_inversion_panel.png")} enablePreview/>
            </SView>
            <SHr />
            <SHr />
            <SHr />
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"} >
                Al momento de crear un fondo de inversión el administrador deberá colocar los siguientes datos:
            </SText>
            <SHr />
            <SHr />
            <SHr />
            <SHr />
            <SView col={"xs-11"} height={300} center>
                <SImage src={require("./img/fondo_inversion_registro.png")} enablePreview />
            </SView>
            <SHr />
            <SHr />
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                Este fondo de inversión será registrado en el sistema y podrá ser visualizado en el panel de fondos de inversión.
            </SText>
            <SHr />
            <SHr />
            <SHr />
            <SHr />
        </SView>
    }
    getFondoInversionInversionista() {
        var roles = GetRoles(this.props);
        if (!roles) return <SLoad />;
        var obj = roles["9321545b-b51c-423a-a43a-edeaf35cf6e8"];
        return <SView col={"xs-12"} card style={{
            padding: 8,
        }}>
            <SView col={"xs-12"} height={60} row center>
                <SView width={45} height={45}>
                    <SImage src={`${SSocket.api.rp}rol/${obj.key}`} enablePreview/>
                </SView>
                <SView flex style={{
                    paddingLeft: 8,
                }}>
                    <SText fontSize={this.state.fontSize} font={"Roboto"} >{obj.descripcion}</SText>
                </SView>
            </SView>
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >Inversionistas</SText>
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >El inversionista tendrá acceso a los siguientes módulos:</SText>
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >- Invertir.</SText>
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                El inversionista tendrá la opción de ver todos los fondos de inversión disponibles para invertir.
                Tendrá acceso a un pantallaso de las diferentes propuestas de inversión abiertas donde podrá elegir invertir en cualquiera de ellas.
            </SText>
            <SHr />
            <SHr />
            <SView col={"xs-11"} height={300} center>
                <SImage src={require("./img/fondo_inversion_abiertas.png")} enablePreview/>
            </SView>
            <SHr />
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                En caso que decida seleccionar la opción invertir en alguna de ellas podrá ver los siguientes datos:
            </SText>
            <SHr />
            <SHr />
            <SView col={"xs-11"} height={300} center>
                <SImage src={require("./img/fondo_inversion_invertir.png")} enablePreview />
            </SView>
            <SHr />
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                En la parte inferior se puede ver el historico de los diferentes precios de preventa previamente parametrizados.
            </SText>
            <SHr />
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >- Mis inversiones.</SText>
            <SHr />
            <SHr />
            <SHr />
            <SHr />
            <SView col={"xs-11"} height={300} center>
                <SImage src={require("./img/fondo_inversion_mias.png")} enablePreview/>
            </SView>
            <SHr />
            <SHr />
            <SHr />
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"}  > Inversión pendiente de aprobación.</SText>
            <SHr />
            <SHr />
            <SHr />
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                La siguiente inversión se encuentra en estado pendiente de aprobación, hasta que vaya al panel administrativo
                y le de aprobar, en ese momento el inversionista podrá ver su ganancia en éste fondo de inversión.
            </SText>
            <SHr />
            <SHr />
            <SHr />
            <SHr />
            <SView col={"xs-11"} height={300} center>
                <SImage src={require("./img/fondo_inversion_pendiente.png")} enablePreview/>
            </SView>
            <SHr />
            <SHr />
            <SHr />
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                Una véz haya aprobado la inversión podrá ver los siguientes datos:
            </SText>
            <SHr />
            <SHr />
            <SHr />
            <SHr />
            <SView col={"xs-11"} height={300} center>
                <SImage src={require("./img/fondo_inversion_iniciado.png")} enablePreview />
            </SView>
            <SHr />
            <SHr />
            <SHr />
            <SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                Ahí podrá ver los clientes registrados por día:
            </SText>
            <SHr />
            <SHr />
            <SHr />
            <SHr />
            <SView col={"xs-11"} height={300} center>
                <SImage src={require("./img/fondo_inversion_inscritos.png")} enablePreview/>
            </SView>
            <SHr />
            <SHr />
            <SHr />
            <SHr />
        </SView>
    }
    getFondoInversionCotizacion() {
        var roles = GetRoles(this.props);
        if (!roles) return <SLoad />;
        var obj = roles["9321545b-b51c-423a-a43a-edeaf35cf6e8"];
        return <SView col={"xs-12"} card style={{
            padding: 8,
        }}>
            
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >Cotización</SText>
            <SHr /><SHr /><SHr /><SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                El módulo anteriormente mencionado, está desarrollado por completo y listo para su funcionamiento.
            </SText>
            <SHr /><SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                El precio de producto es de Bs. 7,000 sin factura y Bs. 10,000 con factura.
            </SText>
            <SHr /><SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                Mientras el módulo se encuentre pendiente de pago en los servidores servisofts, a las 00:00 Horas automaticamente se reiniciará la información del módulo.
            </SText>
            <SHr /><SHr />
            <SText fontSize={this.state.fontSize} font={"Roboto"}  >
                Para iniciar operaciones deberá tener cancelado el 100% del valor del módulo.
            </SText>
            <SHr /><SHr /><SHr /><SHr /><SHr /><SHr /><SHr />
        </SView>
    }
    render() {
        return (
            <SPage title="Manual">
                <SView col="xs-12" center>
                    <SHr height={25} />
                    <SView col="xs-12" center>
                        <SText fontSize={20} bold font={"Roboto-Bold"} center>Manual de uso del sistema</SText>
                    </SView>
                    <SHr height={25} />
                    <SView col="xs-11" >
                        {/*this.getPresentacion()}
                        {this.getRoles()}
                        <SHr height={32} />
                        {this.getRolCliente()}
                        <SHr height={32} />
                        {this.getRolVentas()}
                        <SHr height={32} />
                        {this.getRolEntrenador()}
                        <SHr height={32} />
                        {this.getRolAdministrador()*/}
                        <SHr height={32} />
                        {this.getFondoInversionAdmin()}
                        <SHr height={32} />
                        {this.getFondoInversionInversionista()}
                        <SHr height={32} />
                        {this.getFondoInversionCotizacion()}
                        <SHr /><SHr /><SHr /><SHr /><SHr />
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