<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="Modelo.*"%>
<%@page session="true"%>
<%
   HttpSession sesionOK1=request.getSession();
   
if(sesionOK1.getAttribute("cargo")!=null){
%>
<!DOCTYPE html>
<%
if((sesionOK1.getAttribute("cargo").equals("Ventas"))||(sesionOK1.getAttribute("cargo").equals("Administrador"))){
%>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Calistenia Bolivia</title>

    <!-- Bootstrap -->
    <link href="vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <!-- iCheck -->
    <link href="vendors/iCheck/skins/flat/green.css" rel="stylesheet">
    <!-- Datatables -->
    <link href="vendors/datatables.net-bs/css/dataTables.bootstrap.min.css" rel="stylesheet">
    <link href="vendors/datatables.net-buttons-bs/css/buttons.bootstrap.min.css" rel="stylesheet">
    <link href="vendors/datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.min.css" rel="stylesheet">
    <link href="vendors/datatables.net-responsive-bs/css/responsive.bootstrap.min.css" rel="stylesheet">
    <link href="vendors/datatables.net-scroller-bs/css/scroller.bootstrap.min.css" rel="stylesheet">

    <!-- Custom Theme Style -->
    <link href="css/custom.min.css" rel="stylesheet">
    <script src="js/BuscadorTabla.js" type="text/javascript"></script>
    <script>
    function printContent(el){
	var restorepage = document.body.innerHTML;
	var printcontent = document.getElementById(el).innerHTML;
	document.body.innerHTML = printcontent;
	window.print();
	document.body.innerHTML = restorepage;
    }
    </script>
    <script LANGUAGE="JavaScript">
var cuenta=0;
function enviado() { 
if (cuenta == 0)
{
cuenta++;
return true;
}
else 
{
alert("El formulario ya está siendo enviado, por favor aguarde un instante.");
return false;
}
}
</script>
  </head>
<body class="nav-md">
    <div class="container body">
        <div class="main_container">
            <div class="col-md-3 left_col">
                <div class="left_col scroll-view">
                    <div class="navbar nav_title" style="border: 0;">
                        <img src="images/logo.png" alt="" width="230" height="60">
                    </div>
                    <div class="clearfix"></div>
                    <!-- menu profile quick info -->
                    <%@include file="sidebar.jsp" %>
                    <!-- /sidebar menu -->
                    <!-- /menu footer buttons -->
                </div>
            </div>
        <!-- top navigation -->
        <div class="top_nav">
            <div class="nav_menu">
                <nav class="" role="navigation">
                <div class="nav toggle">
                <a id="menu_toggle"><i class="fa fa-bars"></i></a>
                </div>
                <ul class="nav navbar-nav navbar-right">
                <li class="">
                    <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    <img src="images/caliii.jpg" alt=""><% out.println(nom);%>
                    <span class=" fa fa-angle-down"></span>
                    </a>
                <ul class="dropdown-menu dropdown-usermenu pull-right">
                <li><a href="ServletLogueo?accion=cerrar"><i class="fa fa-sign-out pull-right"></i> Cerrar Sesion</a></li>
                </ul>
                </li>
                </ul>
                </nav>
            </div>
        </div>
        <!-- /top navigation -->
        <!-- page content -->
        <div class="right_col" role="main">
            <!-- top tiles -->
           <%@include file="options.jsp" %>
          <!-- /top tiles -->
        <%
                    if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))) {
                    Caja l2 = CajaBD.mostrarCajaActiva((Integer)sesionOK.getAttribute("idContrato"));
                    if(l2!=null){
        %>
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                    <div class="x_title">
                    <h2>Estado Diario de Cierres de Caja</h2>
                    <ul class="nav navbar-right panel_toolbox">
                        <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                        </li>
                        <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                        <ul class="dropdown-menu" role="menu">
                        <li><a href="#">Settings 1</a>
                        </li>
                        <li><a href="#">Settings 2</a>
                        </li>
                        </ul>
                        </li>
                    </ul>
                    <div class="clearfix"></div>
                    </div>
                    <div class="x_content">
                        <div class="row">
                            <div class="w3ls-row" id="div1">
                                <div class="agile-title">
                                    <h3>Calistenia Bolivia </h3>
                                    <h4><i class="fa fa-home"></i>Sucursal: <label class="blue"><i><% out.println(sucu);%></i></label></h4>
                                </div>
                                <div class="container">
                                    <div class="table-responsive">
                                        <div class="agile-title"  >
                                            <H2>ESTADO DE CAJA</H2> 
                                        </div>
                                        <%
                                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                                    //Ingresos
                                                Ingreso ic= IngresoBD.mostrarTotalIngresoDiarioCali((Integer)sesionOK.getAttribute("idContrato"));
                                                Ingreso ic2= IngresoBD.mostrarTotalIngresoDiarioCaliTarjeta((Integer)sesionOK.getAttribute("idContrato"));
                                                Ingreso icb= IngresoBD.mostrarTotalIngresoDiarioBox((Integer)sesionOK.getAttribute("idContrato"));
                                                Ingreso icbt = IngresoBD.mostrarTotalIngresoDiarioBoxTarjeta((Integer)sesionOK.getAttribute("idContrato"));
                                                Ingreso icp= IngresoBD.mostrarTotalIngresoPersonal((Integer)sesionOK.getAttribute("idContrato"));
                                                Ingreso ico= IngresoBD.mostrarTotalOtroIngreso((Integer)sesionOK.getAttribute("idContrato")); 
                                                    //Egresos
                                                EgresoPersonal ep = EgresoPersonalBD.mostrarTotalEgresoPersonal((Integer)sesionOK.getAttribute("idContrato"));
                                                CuentaXPagar cxp = CuentaXPagarBD.mostrarTotalCXP((Integer)sesionOK.getAttribute("idContrato"));
                                                EgresoChequeTrans ep1 = EgresoChequeTransBD.mostrarTotalOtroEgresoPersonal((Integer)sesionOK.getAttribute("idContrato"));
                                                EgresoChequeTransPro ep2 = EgresoChequeTransProBD.mostrarTotalOtroEgresoProveedor((Integer)sesionOK.getAttribute("idContrato"));
                                                EgresoPersonal oe = EgresoPersonalBD.mostrarTotalOtroEgreso((Integer)sesionOK.getAttribute("idContrato"));
                                                    //Estado de Caja
                                                Caja ca = CajaBD.mostrarTotalCajaPersonal((Integer)sesionOK.getAttribute("idContrato"));
                                        %>
                                            <table class="table table-bordered">
                                                <thead>
                                                <tr>	
                                                <th>Ingreso Efectivo Calistenia(Total)</th>
                                                <th>Ingreso Tarjeta Calistenia(Total)</th>
                                                <th>Ingreso Efectivo Boxeo(Total)</th>
                                                <th>Ingreso Tarjeta Boxeo(Total)</th>
                                                <th>Otros Ingresos(Total)</th>
                                                <th>Egreso Personal (Total)</th>
                                                <th>Egreso Diario cuentasXpagar (Total)</th>
                                                <th>Transferencias Bancarias</th>
                                                <th>Otros Egresos(Total)</th>
                                                <th>Caja Chica(Total)</th>
                                                <th>Estado de caja del USuario</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <td><%=ic.getEfectivo()%>Bs</td>
                                                <td><%=ic2.getEfectivo()%>Bs</td>
                                                <td><%=icb.getEfectivo()%>Bs</td>
                                                <td><%=icbt.getEfectivo()%>Bs</td>
                                                <td><%=ico.getEfectivo()%>Bs</td>
                                                <td><%=ep.getMonto()%>Bs</td>
                                                <td><%=cxp.getMonto()%>Bs</td>
                                                <td><%=ep1.getMonto()+ep2.getMonto()%>Bs</td>
                                                <td><%=oe.getMonto()%>Bs</td>
                                                <td><%=icp.getEfectivo()%>Bs</td>
                                                <td><%=ca.getSaldoCaja()%>Bs</td>  
                                                </tbody>
                                            </table>
                                                <%
                                                }
                                                %>
                                    </div>
                                </div>
                                <div class="container">
                                    <div class="table-responsive">
                                        <div class="agile-title"  >
                                            <H2>Ingreso Caja Chica</H2> 
                                        </div>
                                    <code><label>Ingreso Total Caja Chica: </label></code><br>
                                    <%
                                        if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                        Ingreso icp= IngresoBD.mostrarTotalIngresoPersonal((Integer)sesionOK.getAttribute("idContrato"));
                                    %>
                                    <label><%=icp.getEfectivo()%> Bs</label>
                                    <%
                                        }
                                    %>
                                            <table class="table table-bordered">
                                                <thead>
                                                <tr>
                                                <th>Nombre</th>
                                                <th>Fecha</th>
                                                <th>Monto en Bs</th>
                                                <th>Observacion</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <%
                                                ArrayList<Ingreso> lista0= 
                                                        IngresoBD.mostrarIngresoPersonal
                                                        ((Integer)sesionOK.getAttribute("idContrato"));

                                                        for(int i=0;i<lista0.size();i++)
                                                        {
                                                            Ingreso inp=lista0.get(i);
                                                %>
                                                    <tr>
                                                        <td><%=inp.getNombre()%> <%=inp.getApellido()%></td>
                                                        <td><%=inp.getFechaIngreso()%></td>
                                                        <td><%=inp.getEfectivo()%></td>
                                                        <td><%=inp.getPaquete()%></td>
                                                    </tr>
                                                    <%

                                                        }
                                                        %>
                                                </tbody>
                                            </table>
                                    </div>
                                    <div class="table-responsive">
                                        <div class="agile-title"  >
                                            <H2>Otro Ingreso</H2> 
                                        </div>
                                        <code><label>Otro Ingreso Total: </label></code><br>
                                        <%
                                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                            Ingreso ico= IngresoBD.mostrarTotalOtroIngreso((Integer)sesionOK.getAttribute("idContrato"));
                                        %>
                                        <label><%=ico.getEfectivo()%> Bs</label>
                                        <%
                                            }
                                        %>
                                                <table class="table table-bordered">
                                                    <thead>
                                                    <tr>
                                                    <th>Fecha</th>
                                                    <th>Monto en Bs</th>
                                                    <th>Observacion</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <%
                                                        ArrayList<Ingreso> lista03= 
                                                                IngresoBD.mostrarOtroIngreso
                                                                ((Integer)sesionOK.getAttribute("idContrato"));
                                                                for(int i=0;i<lista03.size();i++)
                                                                {
                                                                    Ingreso inp=lista03.get(i);
                                                    %>
                                                        <tr>
                                                            <td><%=inp.getFechaIngreso()%></td>
                                                            <td><%=inp.getEfectivo()%></td>
                                                            <td><%=inp.getGlosa()%></td>
                                                        </tr>
                                                        <%

                                                            }
                                                        %>
                                                    </tbody>
                                                </table>
                                    </div>
                                    <div class="container">
                                        <div class="table-responsive">
                                            <div class="agile-title"  >
                                                <H2>Otros Egresos</H2> 
                                            </div>
                                        <code><label>Otros Egresos Total: </label></code><br>
                                        <%
                                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                            EgresoPersonal oe = EgresoPersonalBD.mostrarTotalOtroEgreso((Integer)sesionOK.getAttribute("idContrato"));
                                        %>
                                            <label><%=oe.getMonto()%> Bs</label>
                                        <%
                                            }
                                        %>
                                            <table class="table table-bordered">
                                                <thead>
                                                <tr>
                                                <th>Fecha</th>
                                                <th>Monto en Bs</th>
                                                <th>Observacion</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    <%
                                                    ArrayList<EgresoPersonal> lista12= 
                                                            EgresoPersonalBD.mostrarOtroEgresoDiario
                                                            ((Integer)sesionOK.getAttribute("idContrato"));
                                                            for(int i=0;i<lista12.size();i++)
                                                            {
                                                                EgresoPersonal oe=lista12.get(i);
                                                    %>
                                                    <tr>
                                                        <td><%=oe.getFecha()%></td>
                                                        <td><%=oe.getMonto()%></td>
                                                        <td><%=oe.getObservacion()%></td>
                                                    </tr>
                                                    <%

                                                        }
                                                    %>
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                    <div class="col-md-6 welcome-left table-responsive">
                                        <div class="table-responsive">
                                            <div class="agile-title"  >
                                            <h2>INGRESOS Efectivo CALISTENIA</h2> 
                                            </div>
                                        </div>
                                        <code><label>Ingreso Total: </label></code><br>
                                        <%
                                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                                Ingreso ic= IngresoBD.mostrarTotalIngresoDiarioCali((Integer)sesionOK.getAttribute("idContrato"));
                                        %>
                                        <label><%=ic.getEfectivo()%> Bs</label>
                                        <%
                                            }
                                        %>
                                            <table class="table table-bordered">
                                                <thead>
                                                <tr>
                                                <th>Nombre</th>
                                                <th>Fecha</th>
                                                <th>Monto en Bs</th>
                                                <th>Paquete</th>
                                                <th>Tipo de Comprobante</th>
                                                <th>N° Comprobante</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <%
                                                    ArrayList<Ingreso> lista= 
                                                            IngresoBD.mostrarIngresoDiarioCali
                                                            ((Integer)sesionOK.getAttribute("idContrato"));
                                                            for(int i=0;i<lista.size();i++)
                                                            {
                                                                Ingreso in=lista.get(i);
                                                %>
                                                    <tr>
                                                        <td><%=in.getNombre()%> <%=in.getApellido()%></td>
                                                        <td><%=in.getFechaIngreso()%></td>
                                                        <td><%=in.getEfectivo()%></td>
                                                        <td><%=in.getPaquete()%></td>
                                                        <td><%=in.getRf()%></td>
                                                        <td><%=in.getNumeroRF()%></td>
                                                    </tr>
                                                <%
                                                        }
                                                %>
                                                </tbody>
                                            </table>
                                    </div>
                                    <div class="col-md-6 welcome-right table-responsive">
                                        <div class="table-responsive">
                                            <div class="agile-title"  >
                                                <h2>INGRESOS TARJETAS CALISTENIA</h2> 
                                            </div>
                                        <code><label>Ingreso Total: </label></code><br>
                                        <%
                                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                            Ingreso ic2= IngresoBD.mostrarTotalIngresoDiarioCaliTarjeta((Integer)sesionOK.getAttribute("idContrato"));
                                        %>
                                            <label><%=ic2.getEfectivo()%> Bs</label>
                                        <%
                                            }
                                        %>
                                            <table class="table table-bordered">
                                               <thead>
                                                <tr>
                                                <th>Nombre</th>
                                                <th>Fecha</th>
                                                <th>Monto en Bs</th>
                                                <th>Paquete</th>
                                                <th>Entidad</th>
                                                <th>Numero Tarjeta</th>
                                                <th>Tipo de Comprobante</th>
                                                <th>N° Comprobante</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <%
                                                    ArrayList<Ingreso> lista2= 
                                                            IngresoBD.mostrarIngresoDiarioCaliTarjeta
                                                            ((Integer)sesionOK.getAttribute("idContrato"));
                                                            for(int i=0;i<lista2.size();i++)
                                                            {
                                                                Ingreso in=lista2.get(i);
                                                %>
                                                    <tr>
                                                        <td><%=in.getNombre()%> <%=in.getApellido()%></td>
                                                        <td><%=in.getFechaIngreso()%></td>
                                                        <td><%=in.getEfectivo()%></td>
                                                        <td><%=in.getPaquete()%></td>
                                                        <td><%=in.getGlosa()%></td> 
                                                        <td><%=in.getNumeroTarjeta()%></td>
                                                        <td><%=in.getRf()%></td> 
                                                        <td><%=in.getNumeroRF()%></td>
                                                    </tr>
                                                <%

                                                    }
                                                %>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="container">
                                        <div class="table-responsive">
                                            <div class="ln_solid"></div>   
                                        </div>
                                    </div>
                                    <div class="col-md-6 welcome-left table-responsive">
                                        <div class="table-responsive">
                                            <div class="agile-title"  >
                                                <h2>INGRESOS Efectivo BOXEO</h2> 
                                            </div>
                                        <code><label>Ingreso Total: </label></code><br>
                                        <%
                                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                                Ingreso ic= IngresoBD.mostrarTotalIngresoDiarioBox((Integer)sesionOK.getAttribute("idContrato"));
                                        %>
                                        <label><%=ic.getEfectivo()%> Bs</label>
                                        <%

                                        }
                                        %>
                                            <table class="table table-bordered">
                                                <thead>
                                                <tr>
                                                <th>Nombre</th>
                                                <th>Fecha</th>
                                                <th>Monto en Bs</th>
                                                <th>Paquete</th>
                                                <th>Tipo de Comprobante</th>
                                                <th>N° Comprobante</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <%
                                                    ArrayList<Ingreso> listab= 
                                                            IngresoBD.mostrarIngresoDiarioBox
                                                        ((Integer)sesionOK.getAttribute("idContrato"));
                                                        for(int i=0;i<listab.size();i++)
                                                        {
                                                            Ingreso in=listab.get(i);
                                                %>
                                                    <tr>
                                                        <td><%=in.getNombre()%> <%=in.getApellido()%></td>
                                                        <td><%=in.getFechaIngreso()%></td>
                                                        <td><%=in.getEfectivo()%></td>
                                                        <td><%=in.getPaquete()%></td>
                                                        <td><%=in.getRf()%></td>
                                                        <td><%=in.getNumeroRF()%></td>
                                                    </tr>
                                                <%

                                                    }
                                                %>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="col-md-6 welcome-right table-responsive">
                                        <div class="table-responsive">
                                            <div class="agile-title"  >
                                                <h2>INGRESOS TARJETAS BOXEO</h2> 
                                            </div>
                                        <code><label>Ingreso Total: </label></code><br>
                                        <%
                                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                            Ingreso ic2= IngresoBD.mostrarTotalIngresoDiarioBoxTarjeta((Integer)sesionOK.getAttribute("idContrato"));
                                        %>
                                        <label><%=ic2.getEfectivo()%> Bs</label>
                                        <%
                                            }
                                        %>
                                            <table class="table table-bordered">
                                               <thead>
                                                <tr>
                                                <th>Nombre</th>
                                                <th>Fecha</th>
                                                <th>Monto en Bs</th>
                                                <th>Paquete</th>
                                                <th>Entidad</th>
                                                <th>Numero Tarjeta</th>
                                                <th>Tipo de Comprobante</th>
                                                <th>N° Comprobante</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <%
                                                    ArrayList<Ingreso> listab2= 
                                                            IngresoBD.mostrarIngresoDiarioBoxTarjeta
                                                            ((Integer)sesionOK.getAttribute("idContrato"));
                                                            for(int i=0;i<listab2.size();i++)
                                                            {
                                                                Ingreso in=listab2.get(i);
                                                %>
                                                    <tr>
                                                        <td><%=in.getNombre()%> <%=in.getApellido()%></td>
                                                        <td><%=in.getFechaIngreso()%></td>
                                                        <td><%=in.getEfectivo()%></td>
                                                        <td><%=in.getPaquete()%></td>
                                                        <td><%=in.getGlosa()%></td> 
                                                        <td><%=in.getNumeroTarjeta()%></td>
                                                        <td><%=in.getRf()%></td> 
                                                        <td><%=in.getNumeroRF()%></td>
                                                    </tr>
                                                <%

                                                    }
                                                %>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="container">
                                        <div class="table-responsive">
                                            <div class="ln_solid"></div>   
                                        </div>
                                    </div>      
                                    <div class="col-md-6 welcome-left table-responsive">
                                        <div class="table-responsive">
                                            <div class="agile-title"  >
                                                <h2>EGRESOS PERSONAL</h2> 
                                            </div>
                                        <code><label>Gasto Total:</label></code><br>
                                        <%
                                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                            EgresoPersonal ep = EgresoPersonalBD.mostrarTotalEgresoPersonal((Integer)sesionOK.getAttribute("idContrato"));
                                        %>
                                        <label><%=ep.getMonto()%> Bs</label>
                                        <%
                                            }
                                        %>
                                            <table class="table table-bordered">
                                                <thead>
                                                <tr>
                                                <th>Nombre Apellido</th>
                                                <th>Fecha</th>
                                                <th>Monto en Bs</th>
                                                <th>Observacion</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <%
                                                    ArrayList<EgresoPersonal> lista3= 
                                                            EgresoPersonalBD.mostrarEgresoDiarioPersonal
                                                            ((Integer)sesionOK.getAttribute("idContrato"));
                                                            for(int i=0;i<lista3.size();i++)
                                                            {
                                                                EgresoPersonal eg=lista3.get(i);
                                                %>
                                                    <tr>
                                                        <td><%=eg.getNombre()%> <%=eg.getApellido()%></td>
                                                        <td><%=eg.getFecha()%></td>
                                                        <td><%=eg.getMonto()%></td>
                                                        <td><%=eg.getObservacion()%></td>  
                                                    </tr>
                                                <%

                                                    }
                                                %>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="col-md-6 welcome-right table-responsive">
                                        <div class="table-responsive">
                                            <div class="agile-title"  >
                                                <h2>EGRESOS CUENTASxPAGAR</h2> 
                                            </div>
                                        <code><label>Gasto Total:</label></code><br>
                                        <%
                                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                            CuentaXPagar cxp = CuentaXPagarBD.mostrarTotalCXP((Integer)sesionOK.getAttribute("idContrato"));
                                        %>
                                        <label> <%=cxp.getMonto()%> Bs </label>
                                        <%
                                            }
                                        %>
                                            <table class="table table-bordered">
                                                <thead>
                                                <tr>
                                                <th>Razon Social</th>
                                                <th>Fecha</th>
                                                <th>Monto en Bs</th>           
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <%
                                                    ArrayList<CuentaXPagar> lista4= 
                                                            CuentaXPagarBD.mostrarEgresoDiarioCXP
                                                            ((Integer)sesionOK.getAttribute("idContrato"));
                                                            for(int i=0;i<lista4.size();i++)
                                                            {
                                                                CuentaXPagar cxp1=lista4.get(i);
                                                %>
                                                    <tr>
                                                        <td><%=cxp1.getRazonSocial()%></td>
                                                        <td><%=cxp1.getFechaOperacion()%></td>
                                                        <td><%=cxp1.getMonto()%></td>  
                                                    </tr>
                                                <%

                                                    }
                                                %>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="container">
                                        <div class="table-responsive">
                                            <div class="ln_solid"></div>   
                                        </div>
                                    </div>
                                    <div class="col-md-6 welcome-left table-responsive">
                                        <div class="table-responsive">
                                            <div class="agile-title"  >
                                                <h2>OTROS EGRESOS<code class=" blue">(PERSONAL CALI)</code><code>CHEQUE</code></h2> 
                                            </div>
                                        <code> <label>Gasto Total:</label></code><br>
                                        <%
                                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                            EgresoChequeTrans ep = EgresoChequeTransBD.mostrarTotalOtroEgresoPersonalCheque((Integer)sesionOK.getAttribute("idContrato"));
                                            %>
                                        <label><%=ep.getMonto()%> Bs</label>
                                        <%
                                            }
                                        %>
                                            <table class="table table-bordered">
                                                <thead>
                                                <tr>
                                                <th>Nombre Apellido</th>
                                                <th>Fecha</th>
                                                <th>Monto en Bs</th>
                                                <th>Observacion</th>
                                                <th>Tipo de Pago</th>
                                                <th>N° Cheque o Cuenta</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <%
                                                    ArrayList<EgresoChequeTrans> listaEG= 
                                                            EgresoChequeTransBD.mostrarOtroEgresoPersonalCheque
                                                            ((Integer)sesionOK.getAttribute("idContrato"));
                                                            for(int i=0;i<listaEG.size();i++)
                                                            {
                                                                EgresoChequeTrans eg=listaEG.get(i);
                                                %>
                                                    <tr>
                                                        <td><%=eg.getNombre()%> <%=eg.getApellido()%></td>
                                                        <td><%=eg.getFecha()%></td>
                                                        <td><%=eg.getMonto()%></td>
                                                        <td><%=eg.getObservacion()%></td>
                                                        <td> <%=eg.getTipoPago()%></td>
                                                        <td> <%=eg.getNumero()%></td>
                                                    </tr>
                                                <%

                                                    }
                                                %>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="col-md-6 welcome-right table-responsive">
                                        <div class="table-responsive">
                                            <div class="agile-title"  >
                                                <h2>OTROS EGRESOS<code class=" blue">(PERSONAL CALI)</code><code>TRANSFERENCIA BANCARIA</code></h2> 
                                            </div>
                                        <code> <label>Gasto Total:</label></code><br>
                                        <%
                                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                            EgresoChequeTrans ep = EgresoChequeTransBD.mostrarTotalOtroEgresoPersonalTrans((Integer)sesionOK.getAttribute("idContrato"));
                                        %>
                                        <label><%=ep.getMonto()%> Bs</label>
                                        <%
                                            }
                                        %>
                                            <table class="table table-bordered">
                                                <thead>
                                                <tr>
                                                <th>Nombre Apellido</th>
                                                <th>Fecha</th>
                                                <th>Monto en Bs</th>
                                                <th>Observacion</th>
                                                <th>Tipo de Pago</th>
                                                <th>N° Cheque o Cuenta</th>
                                                <th>Entidad</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <%
                                                    ArrayList<EgresoChequeTrans> listaEG1= 
                                                            EgresoChequeTransBD.mostrarOtroEgresoPersonalTrans
                                                            ((Integer)sesionOK.getAttribute("idContrato"));
                                                            for(int i=0;i<listaEG1.size();i++)
                                                            {
                                                                EgresoChequeTrans eg=listaEG1.get(i);
                                                %>
                                                    <tr>
                                                        <td><%=eg.getNombre()%> <%=eg.getApellido()%></td>
                                                        <td><%=eg.getFecha()%></td>
                                                        <td><%=eg.getMonto()%></td>
                                                        <td><%=eg.getObservacion()%></td>
                                                        <td><%=eg.getTipoPago()%></td>
                                                        <td><%=eg.getNumero()%></td>
                                                        <td><%=eg.getEntidad()%></td>
                                                    </tr>
                                                <%

                                                    }
                                                %>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="container">
                                        <div class="table-responsive">
                                            <div class="ln_solid"></div>   
                                        </div>
                                    </div>
                                    <div class="col-md-6 welcome-left table-responsive">
                                        <div class="table-responsive">
                                            <div class="agile-title"  >
                                                <h2>OTROS EGRESOS<code class=" blue">(PROVEEDOR)</code><code>CHEQUE</code></h2> 
                                            </div>
                                        <code><label>Gasto Total:</label></code><br>
                                        <%
                                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                            EgresoChequeTransPro ep = EgresoChequeTransProBD.mostrarTotalOtroEgresoProveedorCheque((Integer)sesionOK.getAttribute("idContrato"));
                                        %>
                                            <label><%=ep.getMonto()%> Bs</label>
                                        <%
                                            }
                                        %>
                                            <table class="table table-bordered">
                                                <thead>
                                                <tr>
                                                <th>Razon Social</th>
                                                <th>Nombre Apellido</th>
                                                <th>Fecha</th>
                                                <th>Monto en Bs</th>
                                                <th>Observacion</th>
                                                <th>Tipo de Pago</th>
                                                <th>N° Cheque</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <%
                                                    ArrayList<EgresoChequeTransPro> listaEGP= 
                                                            EgresoChequeTransProBD.mostrarOtroEgresoPrveedorCheque
                                                            ((Integer)sesionOK.getAttribute("idContrato"));
                                                            for(int i=0;i<listaEGP.size();i++)
                                                            {
                                                                EgresoChequeTransPro eg=listaEGP.get(i);
                                                %>
                                                    <tr>
                                                        <td><%=eg.getRazonSocial()%></td>
                                                        <td><%=eg.getNombre()%> <%=eg.getApellido()%></td>
                                                        <td><%=eg.getFecha()%></td>
                                                        <td><%=eg.getMonto()%></td>
                                                        <td><%=eg.getObservacion()%></td>
                                                        <td> <%=eg.getTipoPago()%></td>
                                                        <td> <%=eg.getNumero()%></td>
                                                    </tr>
                                                <%
                                                    }
                                                %>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="col-md-6 welcome-right table-responsive">
                                        <div class="table-responsive">
                                            <div class="agile-title"  >
                                                <h2>OTROS EGRESOS<code class=" blue">(PROVEEDOR)</code><code>TRANSFERENCIA BANCARIA</code></h2> 
                                            </div>
                                        <code><label>Gasto Total:</label></code><br>
                                        <%
                                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                            EgresoChequeTransPro ep = EgresoChequeTransProBD.mostrarTotalOtroEgresoProveedorTrans((Integer)sesionOK.getAttribute("idContrato"));
                                        %>
                                        <label><%=ep.getMonto()%> Bs</label>
                                        <%
                                            }
                                        %>
                                            <table class="table table-bordered">
                                                <thead>
                                                <tr>
                                                <th>Razon Social</th>
                                                <th>Nombre Apellido</th>
                                                <th>Fecha</th>
                                                <th>Monto en Bs</th>
                                                <th>Observacion</th>
                                                <th>Tipo de Pago</th>
                                                <th>N° Cheque o Cuenta</th>
                                                <th>Entidad</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <%
                                                    ArrayList<EgresoChequeTransPro> listaEGP1= 
                                                            EgresoChequeTransProBD.mostrarOtroEgresoPrveedorTrans
                                                            ((Integer)sesionOK.getAttribute("idContrato"));
                                                            for(int i=0;i<listaEGP1.size();i++)
                                                            {
                                                                EgresoChequeTransPro eg=listaEGP1.get(i);
                                                %>
                                                    <tr>
                                                        <td><%=eg.getRazonSocial()%></td>
                                                        <td><%=eg.getNombre()%> <%=eg.getApellido()%></td>
                                                        <td><%=eg.getFecha()%></td>
                                                        <td><%=eg.getMonto()%></td>
                                                        <td><%=eg.getObservacion()%></td>
                                                        <td><%=eg.getTipoPago()%></td>
                                                        <td><%=eg.getNumero()%></td>
                                                        <td><%=eg.getEntidad()%></td>
                                                    </tr>
                                                <%

                                                    }
                                                %>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="container">
                                        <div class="table-responsive">
                                            <div class="ln_solid"></div>   
                                        </div>
                                    </div>
                                    <div class="col-md-6 welcome-left table-responsive">
                                        <table class="table table-bordered">
                                            <tr>
                                                <th><label>Firma___________________________</label><br><label><% out.println("Nombre:"+"   "+nom);%></label><br> <label><% out.println("Cargo:"+"   "+usu);%></label></th>
                                                <th></th>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="col-md-6 welcome-right table-responsive">
                                        <table class="table table-bordered">
                                            <tr>
                                                <th><label>Firma___________________________</label><br><label>Nombre:__________________________</label><br> <label>Cargo:______________________________</label></th>
                                                <th></th>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 ">
                                <form method="post" action="ServletControlador" onsubmit="return enviado()">
                                    <table class="table table-hover">
                                        <tr>
                                            <button type="submit" name="btnCerraCaja"class="btn btn-danger btn-lg">
                                            <input type="hidden" name="accion" value="CerrarCaja"/>
                                                <strong> Cerrar Caja </strong>
                                                <span class="fa fa-remove"></span></button>
                                                <button onclick="printContent('div1')" class="btn btn-warning btn-lg">
                                                <strong> Imprimir </strong>
                                                <span class="glyphicon glyphicon-print"></span>
                                                </button>
                                        </tr>
                                        <tr>
                                        <%
                                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                            Caja ca = CajaBD.mostrarTotalCajaPersonal((Integer)sesionOK.getAttribute("idContrato"));
                                            Caja l = CajaBD.mostrarCajaActiva((Integer)sesionOK.getAttribute("idContrato"));
                                        %>
                                            <input type="text" name="txtIdCajaED" value="<%=l.getIdCaja()%>" readonly="" style="visibility: hidden">
                                            <input type="text" name="txtEfectivoED" value="<%=ca.getSaldoCaja()%>" style="visibility: hidden">
                                            <input type="date" name="txtFechaED" value="<%=l.getFechaApertura()%>" readonly="" style="visibility: hidden">
                                        <%
                                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                                Ingreso ic= IngresoBD.mostrarTotalIngresoDiarioCali((Integer)sesionOK.getAttribute("idContrato"));
                                                Ingreso ic2= IngresoBD.mostrarTotalIngresoDiarioCaliTarjeta((Integer)sesionOK.getAttribute("idContrato"));
                                                Ingreso icp= IngresoBD.mostrarTotalIngresoPersonal((Integer)sesionOK.getAttribute("idContrato"));
                                                EgresoPersonal ep = EgresoPersonalBD.mostrarTotalEgresoPersonal((Integer)sesionOK.getAttribute("idContrato"));
                                                EgresoPersonal oe = EgresoPersonalBD.mostrarTotalOtroEgreso((Integer)sesionOK.getAttribute("idContrato"));
                                                CuentaXPagar cxp = CuentaXPagarBD.mostrarTotalCXP((Integer)sesionOK.getAttribute("idContrato"));
                                                Caja ca1 = CajaBD.mostrarTotalCajaPersonal((Integer)sesionOK.getAttribute("idContrato"));
                                                Ingreso icb= IngresoBD.mostrarTotalIngresoDiarioBox((Integer)sesionOK.getAttribute("idContrato"));
                                                Ingreso icbt = IngresoBD.mostrarTotalIngresoDiarioBoxTarjeta((Integer)sesionOK.getAttribute("idContrato"));
                                                EgresoChequeTrans ep1 = EgresoChequeTransBD.mostrarTotalOtroEgresoPersonal((Integer)sesionOK.getAttribute("idContrato"));
                                                EgresoChequeTransPro ep2 = EgresoChequeTransProBD.mostrarTotalOtroEgresoProveedor((Integer)sesionOK.getAttribute("idContrato"));
                                                Ingreso ico= IngresoBD.mostrarTotalOtroIngreso((Integer)sesionOK.getAttribute("idContrato"));
                                        %>
                                            <input type="text" name="txtCaliEfe" value="<%=ic.getEfectivo()%>" readonly="" style="visibility: hidden">
                                            <input type="text" name="txtBoxEfe" value="<%=icb.getEfectivo()%>" readonly="" style="visibility: hidden" >
                                            <input type="text" name="txtCaliT" value="<%=ic2.getEfectivo()%>" readonly="" style="visibility: hidden">
                                            <input type="text" name="txtBoxT" value="<%=icbt.getEfectivo()%>" readonly="" style="visibility: hidden">
                                            <input type="text" name="txtOtroIbgreso" value="<%=ico.getEfectivo()%>" readonly="" style="visibility: hidden">
                                            <input type="text" name="txtEgresoPer" value="<%=ep.getMonto()%>" readonly="" style="visibility: hidden">
                                            <input type="text" name="txtOtroEgresoOE" value="<%=oe.getMonto()%>" readonly="" style="visibility: hidden">
                                            <input type="text" name="txtCuentasXPagar" value="<%=cxp.getMonto()%>" readonly="" style="visibility: hidden">
                                            <input type="text" name="txtChuequePer" value="<%=ep1.getMonto()%>" readonly="" style="visibility: hidden">
                                            <input type="text" name="txtChequePro" value="<%=ep2.getMonto()%>" readonly="" style="visibility: hidden">
                                        <%
                                            }
                                        %>
                                        <%
                                            }
                                        %>
                                        </tr>
                                        <tr>
                                            <textarea id="message" class="form-control" name="txbObservacionED" data-parsley-trigger="keyup" data-parsley-minlength="20" data-parsley-maxlength="100" data-parsley-validation-threshold="10" style="visibility: hidden"></textarea> 
                                        </tr>  
                                    </table>
                                </form>
                                <table><tr>
                                </tr></table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <%}else{%>
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                    <div class="x_title">
                    <h2>Estado Diario de Cierres de Caja</h2>
                    <ul class="nav navbar-right panel_toolbox">
                        <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                        </li>
                        <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                        <ul class="dropdown-menu" role="menu">
                        <li><a href="#">Settings 1</a>
                        </li>
                        <li><a href="#">Settings 2</a>
                        </li>
                        </ul>
                        </li>
                    </ul>
                    <div class="clearfix"></div>
                    </div>
                    <div class="x_content">
                        <div class="row">
                            <div class="w3ls-row" id="div1">
                                <div class="agile-title">
                                    <h3>Calistenia Bolivia </h3>
                                    <h4><i class="fa fa-home"></i>Sucursal: <label class="blue"><i><% out.println(sucu);%></i></label></h4>
                                </div>
                                <div class="container">
                                    <div class="table-responsive">
                                        <div class="agile-title"  >
                                            <H2>ESTADO DE CAJA</H2> 
                                        </div>
                                            <table class="table table-bordered">
                                                <thead>
                                                <tr>	
                                                    <th><H2 class="red">No tiene Caja Abierta</H2></th>
                                                </tr>
                                                </thead>
                                            </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <%
            }}
        %>
            <br />
            <div class="row">
            </div>
        </div>
        <!-- /page content -->
        <!-- footer content -->
        <footer>
          <div class="pull-right">
            Calistenia Bolivia - Template by Jose Miguel Parada
          </div>
          <div class="clearfix"></div>
        </footer>
        <!-- /footer content -->
        </div>
    </div>

    <!-- jQuery -->
    <script src="vendors/jquery/dist/jquery.min.js"></script>
    <!-- Bootstrap -->
    <script src="vendors/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- FastClick -->
    <script src="vendors/fastclick/lib/fastclick.js"></script>
    <!-- NProgress -->
    <script src="vendors/nprogress/nprogress.js"></script>
    <!-- Datatables -->
    <script src="vendors/datatables.net/js/jquery.dataTables.min.js"></script>
    <script src="vendors/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
    <script src="vendors/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
    <script src="vendors/datatables.net-buttons-bs/js/buttons.bootstrap.min.js"></script>
    <script src="vendors/datatables.net-buttons/js/buttons.flash.min.js"></script>
    <script src="vendors/datatables.net-buttons/js/buttons.html5.min.js"></script>
    <script src="vendors/datatables.net-buttons/js/buttons.print.min.js"></script>
    <script src="vendors/datatables.net-fixedheader/js/dataTables.fixedHeader.min.js"></script>
    <script src="vendors/datatables.net-keytable/js/dataTables.keyTable.min.js"></script>
    <script src="vendors/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
    <script src="vendors/datatables.net-responsive-bs/js/responsive.bootstrap.js"></script>
    <script src="vendors/datatables.net-scroller/js/datatables.scroller.min.js"></script>
    <script src="vendors/jszip/dist/jszip.min.js"></script>
    <script src="vendors/pdfmake/build/pdfmake.min.js"></script>
    <script src="vendors/pdfmake/build/vfs_fonts.js"></script>

    <!-- Custom Theme Scripts -->
    <script src="js/custom.min.js"></script>

    <!-- Datatables -->
    <script>
      $(document).ready(function() {
        var handleDataTableButtons = function() {
          if ($("#datatable-buttons").length) {
            $("#datatable-buttons").DataTable({
              dom: "Bfrtip",
              buttons: [
                {
                  extend: "copy",
                  className: "btn-sm"
                },
                {
                  extend: "csv",
                  className: "btn-sm"
                },
                {
                  extend: "excel",
                  className: "btn-sm"
                },
                {
                  extend: "pdfHtml5",
                  className: "btn-sm"
                },
                {
                  extend: "print",
                  className: "btn-sm"
                },
              ],
              responsive: true
            });
          }
        };

        TableManageButtons = function() {
          "use strict";
          return {
            init: function() {
              handleDataTableButtons();
            }
          };
        }();

        $('#datatable').dataTable();
        $('#datatable-keytable').DataTable({
          keys: true
        });

        $('#datatable-responsive').DataTable();

        $('#datatable-scroller').DataTable({
          ajax: "js/datatables/json/scroller-demo.json",
          deferRender: true,
          scrollY: 380,
          scrollCollapse: true,
          scroller: true
        });

        var table = $('#datatable-fixed-header').DataTable({
          fixedHeader: true
        });

        TableManageButtons.init();
      });
    </script>
    <!-- /Datatables -->

  </body>
</html>
<%
}}
else
{
out.print("<script>location.replace('index.jsp');</script>");
}
%>