<%@page import="java.text.DecimalFormat"%>
<%@page import="java.sql.Date"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="Modelo.*"%>
<%@page session="true"%>
<%
   HttpSession sesionOK1=request.getSession();
   DecimalFormat formatea = new DecimalFormat("###,##0.00");
   
if(sesionOK1.getAttribute("cargo")!=null){
    //Ingreso ic= IngresoBD.mostrarTotalIngresoDiarioCali((Integer)sesionOK.getAttribute("idContrato"));
    //Ingreso icp= IngresoBD.mostrarTotalIngresoPersonal((Integer)sesionOK.getAttribute("idContrato"));
    //EgresoPersonal ep = EgresoPersonalBD.mostrarTotalEgresoPersonal((Integer)sesionOK.getAttribute("idContrato"));
    //CuentaXPagar cxp = CuentaXPagarBD.mostrarTotalCXP((Integer)sesionOK.getAttribute("idContrato"));
    //Caja ca = CajaBD.mostrarTotalCajaPersonal((Integer)sesionOK.getAttribute("idContrato"));
    //Caja l = CajaBD.mostrarCajaActiva((Integer)sesionOK.getAttribute("idContrato"));
%>
<!DOCTYPE html>
<%
if((sesionOK1.getAttribute("cargo").equals("Gerencia"))||(sesionOK1.getAttribute("cargo").equals("Administrador"))){
%>
<%
     Date fechaini=Date.valueOf(request.getParameter("fechainicio"));
    //Date fechafin=Date.valueOf(request.getParameter("fechafinal"));
    Integer idSucursal=Integer.valueOf(request.getParameter("txbPerspnalL"));
    System.out.println(idSucursal);
    //Integer idContrato2=Integer.valueOf(request.getParameter("txbPerspnalL"));
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
                                <%
                                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                    String s= SucursalBD.mostrarSucursal(idSucursal);
                                %>

                                    <H2>Sucursal:<label class="blue"><%=s%></H2>
                                <%
                                    }
                                %>
                            </div>
                        <div class="container">
                            <div class="table-responsive">
                                <div class="agile-title"  >
                                    <H2>ESTADO DE CAJA</H2> 
                                </div>
                                <%
                                if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                    ArrayList<Integer> ar = SucursalBD.getPersonalSuc2(idSucursal,fechaini);
                                    double icI = 0;
                                    double ic2I = 0;
                                    double icbI = 0;
                                    double icb2I = 0;
                                    double oiI = 0;
                                    double epI = 0;
                                    double cxpI = 0;
                                    double ep1I = 0;
                                    double oeI = 0;
                                    double caI = 0;
                                    for(int ii=0;ii<ar.size();ii++){
                                    int idContrato2=ar.get(ii);
                                    System.out.println(idContrato2);
                                    Ingreso ic= IngresoBD.mostrarTotalIngresoDiarioCali2(fechaini,idContrato2);
                                    Ingreso ic2= IngresoBD.mostrarTotalIngresoDiarioCaliTarjeta2(fechaini,idContrato2);
                                    Ingreso icb=IngresoBD.mostrarTotalIngresoDiarioBox(fechaini, idContrato2);
                                    Ingreso icb2=IngresoBD.mostrarTotalIngresoDiarioBoxTarjeta2(fechaini, idContrato2);
                                    Ingreso oi=IngresoBD.mostrarTotalOtroIngresoXFecha(idContrato2,fechaini);
                                    EgresoPersonal ep = EgresoPersonalBD.mostrarTotalEgresoPersonal2(fechaini,idContrato2);
                                    CuentaXPagar cxp = CuentaXPagarBD.mostrarTotalCXP2(fechaini,idContrato2);
                                    EgresoChequeTrans ep1 = EgresoChequeTransBD.mostrarTotalOtroEgresoPersonalxFecha(idContrato2, fechaini);
                                    EgresoChequeTransPro ep2 = EgresoChequeTransProBD.mostrarTotalOtroEgresoProveedorXFecha(idContrato2, fechaini);
                                    EgresoPersonal oe = EgresoPersonalBD.mostrarTotalOtroEgreso2(idContrato2,fechaini);
                                    Ingreso icp= IngresoBD.mostrarTotalIngresoPersonal2(fechaini,idContrato2);
                                    CierreCaja ca = CierreCajaBD.mostrarCierreCaja2(fechaini,idContrato2);
                                    icI = icI + ic.getEfectivo();
                                    ic2I = ic2I + ic2.getEfectivo();
                                    icbI = icbI + icb.getEfectivo();
                                    icb2I = icb2I + icb2.getEfectivo();
                                    oiI = oiI + oi.getEfectivo();
                                    epI = epI + ep.getMonto();
                                    cxpI = cxpI + cxp.getMonto();
                                    ep1I = ep1I + ep1.getMonto()+ep2.getMonto();
                                    oeI = oeI + oe.getMonto();
                                    //caI = caI + ca.getEfectivo();
                                    }
                                    caI = icI + icbI + oiI - epI - oeI;
                                %>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>	
                                            <th class="green">Ingreso Efectivo Calistenia(Total)</th>
                                            <td style="text-align:right" class="green"><%=formatea.format(Math.round( icI * 100d) / 100d)%>Bs</td>
                                        </tr>
                                        <tr>
                                            <th class="blue">Ingreso Tarjeta Calistenia(Total)</th>
                                            <td style="text-align:right" class="blue"><%=formatea.format(Math.round( ic2I * 100d) / 100d)%>Bs</td>
                                        </tr>
                                        <tr>
                                            <th class="green">Ingreso Efectivo Boxeo(Total)</th>
                                            <td style="text-align:right" class="green"><%=formatea.format(Math.round( icbI * 100d) / 100d)%>Bs</td>
                                        </tr>
                                        <tr>
                                            <th class="blue">Ingreso Tarjeta Boxeo(Total)</th>
                                            <td style="text-align:right" class="blue"><%=formatea.format(Math.round( icb2I * 100d) / 100d)%>Bs</td>
                                        </tr>
                                        <tr>
                                            <th class="blue">Otro Ingresos(Total)</th>
                                            <td style="text-align:right" class="blue"><%=formatea.format(Math.round( oiI * 100d) / 100d)%>Bs</td>
                                        </tr>
                                        <tr>
                                            <th class="red">Egreso Personal (Total)</th>
                                            <td style="text-align:right" class="red"><%=formatea.format(Math.round( epI * 100d) / 100d)%>Bs</td>
                                        </tr>
                                        <tr>
                                            <th class="red">Egreso Diario cuentasXpagar (Total)</th>
                                            <td style="text-align:right" class="red"><%=formatea.format(Math.round( cxpI * 100d) / 100d)%>Bs</td>
                                        </tr>
                                        <tr>
                                            <th class="red">Transferencias Bancarias</th>
                                            <td style="text-align:right" class="red"><%=formatea.format(Math.round( ep1I * 100d) / 100d)%>Bs</td>
                                        </tr>
                                        <tr>
                                            <th class="red">Otros Egresos (Total)</th>
                                            <td style="text-align:right" class="red"><%=formatea.format(Math.round( oeI * 100d) / 100d)%>Bs</td>
                                        </tr>                                        
                                        <tr>
                                            <th>Estado de caja del USuario</th>
                                            <td style="text-align:right" ><%=formatea.format(caI)%>Bs</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        
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
                                    <H2>Ingreso Personal</H2> 
                                </div>
                                <code><label>Ingreso Total Personal: </label></code><br>
                                <%
                                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                        ArrayList<Integer> ar = SucursalBD.getPersonalSuc2(idSucursal,fechaini);
                                        double icpI = 0;
                                        for(int ii=0;ii<ar.size();ii++){
                                            int idContrato2=ar.get(ii);
                                            Ingreso icp= IngresoBD.mostrarTotalIngresoPersonal2(fechaini,idContrato2);
                                            icpI = icpI + icp.getEfectivo();
                                        }
                                %>
                                <label><%=icpI%> Bs</label>
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
                                            ArrayList<Integer> ar = SucursalBD.getPersonalSuc2(idSucursal,fechaini);
                                            for(int ii=0;ii<ar.size();ii++){
                                                int idContrato2=ar.get(ii);
                                                ArrayList<Ingreso> lista0= 
                                                IngresoBD.mostrarIngresoPersonal2(fechaini,idContrato2);;
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
                                            }
                                        %>
                                    </tbody>
                                </table>
                            </div>
                            <div class="table-responsive">
                                <div class="agile-title"  >
                                    <H2>Otros Ingresos</H2> 
                                </div>
                                <code><label>Otros Ingresos Total: </label></code><br>
                                <%
                                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                          double icpI = 0;
                                            for(int ii=0;ii<ar.size();ii++){
                                                int idContrato2=ar.get(ii);
                                                Ingreso icp= IngresoBD.mostrarTotalOtroIngresoXFecha(idContrato2,fechaini);
                                                icpI = icpI + icp.getEfectivo();
                                            }
                                %>
                                    <label><%=icpI%> Bs</label>
                                <%
                                    }
                                %>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                        <th>Observacion</th>
                                        <th>Fecha</th>
                                        <th>Monto en Bs</th>
                                        <th>Personal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <%
                                        for(int ii=0;ii<ar.size();ii++){
                                            int idContrato2=ar.get(ii);
                                            ArrayList<Ingreso> lista013= 
                                            IngresoBD.mostrarOtroIngresoXFecha(idContrato2,fechaini);
                                            for(int i=0;i<lista013.size();i++)
                                            {
                                                Ingreso inp=lista013.get(i);
                                    %>
                                        <tr>
                                            <td><%=inp.getGlosa()%></td>
                                            <td><%=inp.getFechaIngreso()%></td>
                                            <td><%=inp.getEfectivo()%></td>
                                            <td><%=PersonalBD.mostrarPersonalN(idContrato2)%></td>
                                        </tr>
                                        <%

                                            }
                                        }
                                        %>
                                    </tbody>
                                </table>   
                            </div>
                            <div class="table-responsive">
                                <div class="agile-title"  >
                                    <H2>Otros Egresos</H2> 
                                </div>
                                <code><label>Otro Egresos Total: </label></code><br>
                                <%
                                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                        double oeI = 0;
                                        for(int ii=0;ii<ar.size();ii++){
                                            int idContrato2=ar.get(ii);
                                            EgresoPersonal oe = EgresoPersonalBD.mostrarTotalOtroEgreso2(idContrato2,fechaini);
                                            oeI = oeI + oe.getMonto();
                                        }
                                %>
                                    <label><%=oeI%> Bs</label>
                                <%
                                    }
                                %>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                        <th>Fecha</th>
                                        <th>Monto en Bs</th>
                                        <th>Observacion</th>
                                        <th>Personal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <%
                                        for(int ii=0;ii<ar.size();ii++){
                                            int idContrato2=ar.get(ii);
                                            ArrayList<EgresoPersonal> lista014= 
                                            EgresoPersonalBD.mostrarOtroEgresoxFecha(idContrato2,fechaini);;
                                            for(int i=0;i<lista014.size();i++)
                                            {
                                                EgresoPersonal oe=lista014.get(i);
                                    %>
                                        <tr>
                                            <td><%=oe.getFecha()%></td>
                                            <td><%=oe.getMonto()%></td>
                                            <td><%=oe.getObservacion()%></td>
                                            <td><%=PersonalBD.mostrarPersonalN(idContrato2)%></td>
                                        </tr>
                                        <%
                                            }
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
                                <code><label>Ingreso Total: </label></code><br>
                                <%
                                    if((sesionOK.getAttribute("cargo").equals("Administracion"))||(sesionOK.getAttribute("cargo").equals("Gerencia"))){
                                        double icI = 0;
                                        for(int ii=0;ii<ar.size();ii++){
                                            int idContrato2=ar.get(ii);
                                            Ingreso ic= IngresoBD.mostrarTotalIngresoDiarioCali2(fechaini,idContrato2);
                                            icI = icI + ic.getEfectivo();
                                        }
                                %>
                                    <label><%=icI%> Bs</label>
                                <%
                                    }
                                %>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Personal</th>
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
                                        for(int ii=0;ii<ar.size();ii++){
                                            int idContrato2=ar.get(ii);
                                            ArrayList<Ingreso> lista= 
                                            IngresoBD.mostrarIngresoDiarioCali2(fechaini,idContrato2);
                                            for(int i=0;i<lista.size();i++)
                                            {
                                                Ingreso in=lista.get(i);
                                    %>
                                        <tr>
                                            <td><%=PersonalBD.mostrarPersonalN(idContrato2)%></td>
                                            <td><%=in.getNombre()%> <%=in.getApellido()%></td>
                                            <td><%=in.getFechaIngreso()%></td>
                                            <td><%=in.getEfectivo()%></td>
                                            <td><%=in.getPaquete()%></td>
                                            <td><%=in.getRf()%></td>
                                            <td><%=in.getNumeroRF()%></td> 
                                        </tr>
                                            <%
                                            }
                                        }
                                        %>
                                    </tbody>
                                </table>            
                            </div>
                        </div>
                        <div class="col-md-6 welcome-right table-responsive">
                            <div class="table-responsive">
                                <div class="agile-title"  >
                                    <h2>INGRESOS TARJETAS CALISTENIA</h2> 
                                </div>
                                <code><label>Ingreso Total: </label></code><br>
                                <%
                                    if((sesionOK.getAttribute("cargo").equals("Administracion"))||(sesionOK.getAttribute("cargo").equals("Gerencia"))){
                                        double ic2I = 0;
                                        for(int ii=0;ii<ar.size();ii++){
                                            int idContrato2=ar.get(ii);
                                            Ingreso ic2= IngresoBD.mostrarTotalIngresoDiarioCaliTarjeta2(fechaini,idContrato2);
                                            ic2I = ic2I + ic2.getEfectivo();
                                        }
                                %>
                                    <label><%=ic2I%> Bs</label>
                                <%
                                    }
                                %>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Personal</th>
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
                                        for(int ii=0;ii<ar.size();ii++){
                                            int idContrato2=ar.get(ii);
                                            ArrayList<Ingreso> lista2= 
                                            IngresoBD.mostrarIngresoDiarioCaliTarjeta2(fechaini,idContrato2);
                                            for(int i=0;i<lista2.size();i++)
                                            {
                                               Ingreso in=lista2.get(i);
                                    %>
                                        <tr>
                                            <td><%=PersonalBD.mostrarPersonalN(idContrato2)%></td>
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
                                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                    Ingreso ic= IngresoBD.mostrarTotalIngresoDiarioBox((Integer)sesionOK.getAttribute("idContrato"));
                                %>
                                    <label><%=ic.getEfectivo()%> Bs</label>
                                <%
                                    }
                                %>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Personal</th>
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
                                        for(int ii=0;ii<ar.size();ii++){
                                            int idContrato2=ar.get(ii);
                                            ArrayList<Ingreso> listab= 
                                            IngresoBD.mostrarIngresoDiarioBox2(fechaini,idContrato2);
                                            for(int i=0;i<listab.size();i++)
                                            {
                                                Ingreso in=listab.get(i);
                                    %>
                                        <tr>
                                            <td><%=PersonalBD.mostrarPersonalN(idContrato2)%></td>
                                            <td><%=in.getNombre()%> <%=in.getApellido()%></td>
                                            <td><%=in.getFechaIngreso()%></td>
                                            <td><%=in.getEfectivo()%></td>
                                            <td><%=in.getPaquete()%></td>
                                            <td><%=in.getRf()%></td>
                                            <td><%=in.getNumeroRF()%></td> 
                                        </tr>
                                        <%
                                            }
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
                                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                    Ingreso ic2= IngresoBD.mostrarTotalIngresoDiarioBoxTarjeta((Integer)sesionOK.getAttribute("idContrato"));
                                %>
                                    <label><%=ic2.getEfectivo()%> Bs</label>
                                <%
                                    }
                                %>
                                <table class="table table-bordered">
                                   <thead>
                                        <tr>
                                            <th>Personal</th>
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
                                        for(int ii=0;ii<ar.size();ii++){
                                            int idContrato2=ar.get(ii);
                                            ArrayList<Ingreso> listab2= 
                                            IngresoBD.mostrarIngresoDiarioBoxTarjeta2
                                            (fechaini,idContrato2);
                                            for(int i=0;i<listab2.size();i++)
                                            {
                                               Ingreso in=listab2.get(i);
                                    %>
                                        <tr>
                                            <td><%=PersonalBD.mostrarPersonalN(idContrato2)%></td>
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
                                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                        double epI = 0;
                                        for(int ii=0;ii<ar.size();ii++){
                                            int idContrato2=ar.get(ii);
                                            EgresoPersonal ep = EgresoPersonalBD.mostrarTotalEgresoPersonal2(fechaini,idContrato2);
                                            epI = epI + ep.getMonto();
                                        }
                                %>
                                <label><%=epI%> Bs</label>
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
                                        for(int ii=0;ii<ar.size();ii++){
                                            int idContrato2=ar.get(ii);
                                            ArrayList<EgresoPersonal> lista3= 
                                            EgresoPersonalBD.mostrarEgresoDiarioPersonal2(fechaini,idContrato2);
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
                                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                        double cxpI = 0;
                                        for(int ii=0;ii<ar.size();ii++){
                                            int idContrato2=ar.get(ii);
                                            CuentaXPagar cxp = CuentaXPagarBD.mostrarTotalCXP2(fechaini,idContrato2);
                                            cxpI = cxpI + cxp.getMonto();
                                        }
                                %>
                                <label> <%=cxpI%> Bs </label>
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
                                        for(int ii=0;ii<ar.size();ii++){
                                            int idContrato2=ar.get(ii);
                                            ArrayList<CuentaXPagar> lista4= 
                                            CuentaXPagarBD.mostrarEgresoDiarioCXP2(fechaini,idContrato2);
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
                                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                        double epI = 0;
                                        for(int ii=0;ii<ar.size();ii++){
                                            int idContrato2=ar.get(ii);
                                            EgresoChequeTrans ep = EgresoChequeTransBD.mostrarTotalOtroEgresoChequexFecha(idContrato2, fechaini);
                                            epI = epI + ep.getMonto();
                                        }
                                %>
                                    <label><%=epI%> Bs</label>
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
                                            <th>N° Cheque</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <%
                                        for(int ii=0;ii<ar.size();ii++){
                                            int idContrato2=ar.get(ii);
                                            ArrayList<EgresoChequeTrans> listaEG= 
                                            EgresoChequeTransBD.mostrarOtroEgresoPersonalChequeXFecha(idContrato2, fechaini);
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
                                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                        double epI = 0;
                                        for(int ii=0;ii<ar.size();ii++){
                                            int idContrato2=ar.get(ii);
                                            EgresoChequeTrans ep = EgresoChequeTransBD.mostrarTotalOtroEgresoTransxFecha(idContrato2, fechaini);
                                            epI = epI + ep.getMonto();
                                        }
                                %>
                                    <label><%=epI%> Bs</label>
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
                                            <th>N° Cuenta</th>
                                            <th>Entidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <%
                                        for(int ii=0;ii<ar.size();ii++){
                                            int idContrato2=ar.get(ii);
                                            ArrayList<EgresoChequeTrans> listaEG2= 
                                            EgresoChequeTransBD.mostrarOtroEgresoPersonalTransXFecha(idContrato2, fechaini);
                                            for(int i=0;i<listaEG2.size();i++)
                                            {
                                                EgresoChequeTrans eg=listaEG2.get(i);
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
                                        double epI = 0;
                                        for(int ii=0;ii<ar.size();ii++){
                                            int idContrato2=ar.get(ii);
                                            EgresoChequeTransPro ep = EgresoChequeTransProBD.mostrarTotalOtroEgresoProveedorChequeXFecha(idContrato2, fechaini);
                                            epI = epI + ep.getMonto();
                                        }
                                %>
                                <label><%=epI%> Bs</label>
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
                                        for(int ii=0;ii<ar.size();ii++){
                                            int idContrato2=ar.get(ii);
                                            ArrayList<EgresoChequeTransPro> listaEGP= 
                                            EgresoChequeTransProBD.mostrarOtroEgresoPrveedorChequeXFecha(idContrato2, fechaini);
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
                                        }
                                        %>
                                    </tbody>
                                </table>
                            </div>
                        </div> 
                        <div class="col-md-6 welcome-left table-responsive">
                            <div class="table-responsive">
                                <div class="agile-title"  >
                                    <h2>OTROS EGRESOS<code class=" blue">(PROVEEDOR)</code><code>TRANSFERENCIA BANCARIA</code></h2> 
                                </div>
                                <code><label>Gasto Total:</label></code><br>
                                <%
                                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                        double epI = 0;
                                        for(int ii=0;ii<ar.size();ii++){
                                            int idContrato2=ar.get(ii);
                                            EgresoChequeTransPro ep = EgresoChequeTransProBD.mostrarTotalOtroEgresoProveedorTransXFecha(idContrato2, fechaini);
                                            epI = epI + ep.getMonto();
                                        }
                                %>
                                <label><%=epI%> Bs</label>
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
                                            <th>N°Cuenta</th>
                                            <th>Entidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <%
                                        for(int ii=0;ii<ar.size();ii++){
                                            int idContrato2=ar.get(ii);
                                            ArrayList<EgresoChequeTransPro> listaEGP2= 
                                            EgresoChequeTransProBD.mostrarOtroEgresoPrveedorTransXFecha(idContrato2, fechaini);
                                            for(int i=0;i<listaEGP2.size();i++)
                                            {
                                                EgresoChequeTransPro eg=listaEGP2.get(i);
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
                                        }
                                        %>
                                    </tbody>
                                </table>
                            </div>
                        </div> 
                        </div>
                        <div class="container">
                            <div class="table-responsive">
                                <div class="ln_solid"></div>   
                            </div>
                        </div>
                        <div class="x_panel">          
                            <div class="col-md-6 ">
                                <button onclick="printContent('div1')" class="btn btn-warning btn-lg">
                                    <strong> Imprimir </strong>
                                </button>
                            </div>
                        </div>
                    </div>               
                </div>
            </div>
        </div>
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


    <!-- Datatables -->
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
