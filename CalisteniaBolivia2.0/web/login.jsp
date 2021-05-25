<%-- 
    Document   : cliente
    Created on : 08-dic-2017, 20:48:06
    Author     : YakuRocaH
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="Modelo.*"%>
<%@page session="true"%>
<%
   String usu="";
   String nom="";
   String sucu="";
   String idper="";
   Integer idsucu=0;
   String imagen="";
   HttpSession sesionOK=request.getSession();
   
if(sesionOK.getAttribute("cargo")!=null){
    nom=(String)sesionOK.getAttribute("nom")+" "+(String)sesionOK.getAttribute("apell");
    usu=(String)sesionOK.getAttribute("cargo");
    sucu=(String)sesionOK.getAttribute("sucur");
    idper=(String)sesionOK.getAttribute("idper");
    idsucu=(Integer)sesionOK.getAttribute("idsucu");
    imagen=(String)sesionOK.getAttribute("imagen");
%>
<!DOCTYPE html>
<%
if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
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
    <script src="js/jquery.min.js" type="text/javascript"></script>
    <script src="js/desactivarLogin.js" type="text/javascript"></script>
    <script src="js/activarLogin.js" type="text/javascript"></script>
  </head>
<body class="nav-md">
    <div class="container body">
        <div class="main_container">
            <div class="col-md-3 left_col">
                <div class="left_col scroll-view">
                    <div class="navbar nav_title" style="border: 0;">
                        <a href="principal.jsp" class="site_title"><i class="fa fa-user"></i> <span>Calistenia Bolivia</span></a>
                    </div>
                    <div class="clearfix"></div>
                    <!-- menu profile quick info -->
                    <div class="profile">
                        <div class="profile_pic">
                            <img src="images/caliii.jpg" alt="..." class="img-circle profile_img">
                        </div>
                        <div class="profile_info">
                            <span><i class="red">Bienvenido</i></span>
                            <h2><% out.println(nom);%></h2><br>
                        </div>
                    </div>
                    <!-- /menu profile quick info -->
                    <br />
                    <!-- sidebar menu -->
                    <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
                      <div class="menu_section">
                        <h3><i class="red">Cargo: </i><% out.println(usu);%></h3>
                        <h3><i class="red">Sucursal: </i><% out.println(sucu);%></h3>
                            <ul class="nav side-menu">
                            <li><a href="principal.jsp"><i class="fa fa-users"></i>Inicio </a>
                            </li>
                          <%
                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))) {
                            %>
                            <li><a href="CrearCaja.jsp"><i class="fa fa-money"></i>Crear Nueva Caja</a></li>
                            <%
                                }
                                %>
                          <%
                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))||(sesionOK.getAttribute("cargo").equals("Gerencia"))){
                            %>
                            <li><a><i class="fa fa-shopping-cart"></i>Ingresos<span class="fa fa-chevron-down"></span></a>
                            <ul class="nav child_menu">
                                <%
                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                            %>
                                <li><a href="calistenia.jsp"><i class="fa fa-shopping-cart"></i> Calistenia</a></li>
                                <li><a href="kickboxing.jsp"><i class="fa fa-shopping-cart"></i> Kick Boxing</a></li>
                                <li><a href="ingresoPersonal.jsp"><i class="fa fa-money"></i>Otros Ingreso</a></li>
                               <%
                                }
                                %>
                                <%
                            if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                            %> 
                                <li><a><i class="fa fa-warning"></i>Eliminar Ingresos Caja Activa<span class="fa fa-chevron-down"></span></a>
                                    <ul class="nav child_menu">
                                        <li><a href="eliminarIngreso.jsp"><i class="fa fa-money"></i>Ingreso Efectivo</a></li>
                                        <li><a href="eliminarIngresoTarjeta.jsp"><i class="fa fa-warning"></i>Ingreso Tarjeta</a></li>
                                    </ul>
                                    <%
                            }
                            %>
                                     <%
                            if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                            %> 
                                <li><a><i class="fa fa-warning"></i>Eliminar Ingresos Caja Inactiva<span class="fa fa-chevron-down"></span></a>
                                    <ul class="nav child_menu">
                                        <li><a href="eliminarIngresoInactivo.jsp"><i class="fa fa-money"></i>Ingreso Efectivo</a></li>
                                        <li><a href="eliminarIngresoTarjetaInactivo.jsp"><i class="fa fa-warning"></i>Ingreso Tarjeta</a></li>
                                    </ul>
                                    <%
                            }
                            %>

                            </ul>
                                   <%
                            }
                            %>
                            <%
                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))||(sesionOK.getAttribute("cargo").equals("Gerencia"))){
                            %>  
                            <li><a><i class="fa fa-warning"></i>Egresos<span class="fa fa-chevron-down"></span></a>
                            <ul class="nav child_menu">
                                      <%
                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                            %>  
                                    <li><a href="egresoPersonal.jsp"><i class="fa fa-warning"></i>Personal</a></li>
                                    <li><a href="cuentasXPagar.jsp"><i class="fa fa-warning"></i>Cuentas Por Pagar</a></li>
                                    <li><a href="OtroEgreso.jsp"><i class="fa fa-warning"></i>Otro Egreso</a></li>
                                    <%
                            }
                            %>
                                    <%
                            if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                            %> 
                                    <li><a href="modificarEgresos.jsp"><i class="fa fa-warning"></i>Modificar Egreso</a></li>
                                    <%
                            }
                            %>
                                    <%
                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                            %> 
                                    <li><a><i class="fa fa-warning"></i>Otros Egresos(Cheques y Transacciones)<span class="fa fa-chevron-down"></span></a>
                                    <ul class="nav child_menu">
                                    <li><a href="otrosEgresos.jsp"><i class="fa fa-warning"></i>Personal</a></li>
                                    <li><a href="otrosEgresosProveedor.jsp"><i class="fa fa-warning"></i>Proveedor</a></li>
                                    </ul>
                                    <%
                            }
                            %>
                                                <%
                            if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                            %> 
                            <li><a><i class="fa fa-warning"></i>Eliminar Egresos<span class="fa fa-chevron-down"></span></a>
                                <ul class="nav child_menu">
                                    <li><a href="eliminarEgreso.jsp"><i class="fa fa-warning"></i>Egreso Personal</a></li>        
                                    <li><a href="eliminarOtroEgreso.jsp"><i class="fa fa-warning"></i>Otros Egresos</a></li>
                                    <li><a><i class="fa fa-warning"></i>Otros Egresos(Cheques y Transacciones)<span class="fa fa-chevron-down"></span></a>
                                    <ul class="nav child_menu">
                                        <li><a href="eliminarEgresoChequeTransPer.jsp"><i class="fa fa-warning"></i>Personal</a></li>
                                        <li><a href="eliminarEgresoChequeTransPro.jsp"><i class="fa fa-warning"></i>Proveedor</a></li>
                                    </ul>
                                </ul>
                                    <%
                            }
                            %>
                            </ul>

                                    <%
                            }
                            %>
                                    <%
                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))||(sesionOK.getAttribute("cargo").equals("Gerencia"))){
                            %>
                            <li><a href="cliente.jsp"><i class="fa fa-users"></i> Matricula </a>
                            </li>
                          <%
                            }
                            %>
                          <%
                            if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                            %>
                            <li><a href="personal.jsp"><i class="fa fa-users"></i> Gestionar Personal </a>
                            </li>
                          <%
                                }
                                %>

                          <%
                            if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                            %>
                            <li><a href="proveedor.jsp"><i class="fa fa-truck"></i> Gestionar Proveedor </a>
                            </li>
                          <%
                                }
                                %>
                            <%
                            if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                            %>
                            <li><a href="login.jsp"><i class="fa fa-user"></i> Gestionar Login</a>
                            </li>
                                <%
                                }
                                %>
                            <li><a><i class="fa fa-money"></i>Paquetes<span class="fa fa-chevron-down"></span></a>
                                <ul class="nav child_menu">
                                    <li><a href="precio.jsp"><i class="fa fa-money"></i>Paquete Cali</a></li>
                                    <li><a href="precioBoxeo.jsp"><i class="fa fa-money"></i>Paquete Boxeo</a></li>

                                </ul>
                            <%
                            if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                            %>
                            <li><a href="sucursal.jsp"><i class="fa fa-home"></i> Gestionar Sucursal</a>
                            </li>
                                <%
                                }
                                %>
                            <%
                            if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                            %>
                            <li><a href="cargo.jsp"><i class="fa fa-briefcase"></i> Gestionar Cargo</a>
                            </li>
                                <%
                                }
                                %>
                            <li><a><i class="fa fa-bar-chart-o"></i>Reportes <span class="fa fa-chevron-down"></span></a>
                            <ul class="nav child_menu">
                            <%
                            if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                            %>
                              <li><a href="estadoDiario.jsp"><i class="fa fa-desktop"></i>Estado Diario</a></li>
                                <%
                                }
                                %>
                            <%
                            if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                            %>
                            <li><a href="estadoMensual.jsp"><i class="fa fa-desktop"></i>Caja Mensual</a></li>
                            <li><a href="ingresoEfectivoMensual.jsp"><i class="fa fa-desktop"></i>Ingresos Efectivo</a></li>
                            <li><a href="ingresoTarjetaMensual.jsp"><i class="fa fa-desktop"></i>Ingresos Tarjetas</a></li>
                            <li><a href="egresoMensual.jsp"><i class="fa fa-desktop"></i>Egresos</a></li>
                            <li><a href="otrosEgresoMensual.jsp"><i class="fa fa-desktop"></i>Otros Egresos</a></li>
                                <%
                                }
                                %>
                            </ul>
                            <%
                            if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                            %>  
                            <li><a><i class="fa fa-warning"></i>Vitacora<span class="fa fa-chevron-down"></span></a>
                                <ul class="nav child_menu">
                                    <li><a href="vitacoraIngreso.jsp"><i class="fa fa-warning"></i>Ingreso</a></li>
                                    <li><a href="vitacoraEgreso.jsp"><i class="fa fa-warning"></i>Egreso</a></li>
                                    <li><a href="vitacoraPaquete.jsp"><i class="fa fa-warning"></i>Paquetes</a></li>
                                    <li><a href="vitacoraFechasClientes.jsp"><i class="fa fa-warning"></i>Fechas de Clientes</a></li>
                                </ul>
                            <%
                            }
                            %>    
                        </ul>
                      </div>
                    </div>
                    <!-- /sidebar menu -->
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
                <li><a href="javascript:;"> Profile</a></li>
                <li><a href="javascript:;">Help</a></li>
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
            <div class="row tile_count">

                <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div class="tile-stats">
                        <div class="icon"><i class="fa fa-users"></i>
                        </div>
                        <%
                            ArrayList<Cliente> listac= ClienteBD.mostrarCantidadClientes();
                            for(Cliente cl:listac)
                            {
                        %>
                        <div class="count"><%=cl.getIdCliente()%></div>
                        <%
                            }
                        %>
                            <h3>Clientes</h3>
                            <p>Total de Clientes Registrados en la Base de Datos</p>
                    </div>
                </div>
              
              
              <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div class="tile-stats">
                          <div class="icon"><i class="fa fa-users red"></i>
                          </div>
                            <%
                ArrayList<Cliente> listacc= ClienteBD.mostrarCantidadContratoActivos();
                for(Cliente cl:listacc)
                {
              %>
                          <div class="count"><%=cl.getIdCliente()%></div>
                          <%
                                }
                                %>
                                <h3>Activos Calistenia</h3>
                                <p class="blue">Total de Clientes Calistenia con Fechas Activas</p>
                        </div>
                      </div>
              
             <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div class="tile-stats">
                          <div class="icon"><i class="fa fa-users blue"></i>
                          </div>
                            <%
                ArrayList<Cliente> listacc2= ClienteBD.mostrarCantidadContratoActivosBoxeo();
                for(Cliente cl:listacc2)
                {
              %>
                          <div class="count"><%=cl.getIdCliente()%></div>
                          <%
                                }
                                %>
                                <h3>Activos Boxeo</h3>
                                <p class="blue">Total de Clientes Boxeo con Fechas Activas</p>
                        </div>
                      </div>
                                
            <%
                    if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))) {
                    %>
            <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div class="tile-stats">
                          <div class="icon"><i class="fa fa-money green"></i>
                          </div>
                            <%
                  float total=0;
                  
                ArrayList<Caja> listaca= CajaBD.mostrarTotalCajaPersonal1((Integer)sesionOK.getAttribute("idContrato"));
                for(Caja ca:listaca)
                {
                total=ca.getSaldoCaja();
              %>
                            
                            
                            <div class="count"><%=total%>Bs</div>
                            <h3>Total Caja</h3>
                          <p class="blue">Monto Expresado en Bolivianos</p>
                           
                          <%
                                }
                                %>
                          
                        </div>
                      </div>
              <%
                        }
                        %>
          </div>
          <!-- /top tiles -->
                    <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                  <div class="x_title">
                    <h2>Login Activos</h2>
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
                    <!-- Nuevo Login -->
                    <div class="agile-title form-group">
                        <strong><a href="#NuevoLogin" class="btn btn-primary" data-toggle="modal">
                                <h4 class="modal-title">
                                <span class="fa fa-plus-square"></span> Nuevo Login
                        </h4></a></strong>
                         <div class="modal fade" id="NuevoLogin">
                               <div class="modal-dialog">
                                   <div class="modal-content">
                                       <div class="modal-header">
                                           <button style="button" class="close" data-dismiss="modal">
                                               <span>&times;</span></button>
                                            <div class="agile-title">
                                                <h3 class="modal-title"><strong>Nuevo Login</strong></h3> 
					</div>
                                               <div class="container">
                                                   <div class="form-horizontal"> 
                                                       
                                        <div class="form-group">
                                            <form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left" action="ServletControlador" method="post"  >
                                        
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Personal<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" list="listadedatos" id="cliente" name="txbPerspnalL" required class="form-control col-md-7 col-xs-12" placeholder="Digite el nombre del Personal">
                                                <datalist id="listadedatos">
                                            <%
                                            ArrayList<Personal> listaPer= PersonalBD.mostrarPersonalContratoACtivo();


                                            for(Personal c:listaPer)
                                            {
                                                %>

                                                        <option value="<%=c.getIdPersonal()%>" data-subtitle="aaa"><%=c.getNombrePersonal()%></option>
                                                         <%

                                            }
                                            %>
                                                </datalist>
                                          </div>
                                        </div>        
                                        
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Nombre Login<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbLoginL" required="required" class="form-control col-md-7 col-xs-12" value="" placeholder="Digite el Nombre de Login">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Password<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="password" id="last-name" name="txbPassL" required="required" class="form-control col-md-7 col-xs-12" value="" placeholder="Digite su Contraseña">
                                          </div>
                                        </div>
                                                                                                             <div class="ln_solid"></div>
                                        <div class="form-group">
                                          <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                            <button type="submit" class="btn btn-info" name="btnGuardar">
                                                                     <strong> Registrar </strong>
                                              <span class="glyphicon glyphicon-refresh"></span>
                                                                 </button>
                                                                 <input type="hidden" name="accion" value="GuardarLogin"/>
                                          </div>
                                        </div>

                                    </form>
                                            </div> 
                                                           
                                                    </div> 
                                        </div>   

                                        </div>
                                   </div>
                               </div>
                           </div>
                    </div>
                    <!-- Fin de Nuevo de Login -->
                  <div class="x_content">
                    <div class="row">
                      <div class="col-sm-12 table-responsive">
                        <div class="card-box ">
                            <div class="agile-title form-group">                             
                    <label>Buscar: </label>
                    <input id="searchTerm" type="text" onkeyup="doSearch()" />
                    </div>
                          <table class="table table-bordered" id="datos">
                        <thead>
			<tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Login</th>
                        <th>Modificar</th>
                        <th>Desactivar</th>
			</tr>
			</thead>
                        <tbody>
                    <%
                ArrayList<Login> lista1= LoginBD.mostrarLoginACtivas();
                int salto=0;
            
                for(Login l:lista1)
                {
                    %>
                        <td id="idLogin"><%=l.getIdLogin()%></td>
                        <td><%=l.getNombreLogin()%></td>
                        <td><%=l.getApellidoLogin()%></td>
                        <td><%=l.getUsuario()%></td>
                        <td><div class="agile-title form-group">
                        <strong><a href="#<%=l.getIdLogin()%>" class="btn btn-info" data-toggle="modal">
                                <h4 class="modal-title">
                                <span class=" glyphicon glyphicon-refresh"></span> Modificar Login
                        </h4></a></strong>
                         <div class="modal fade" id="<%=l.getIdLogin()%>">
                               <div class="modal-dialog">
                                   <div class="modal-content">
                                       <div class="modal-header">
                                           <button style="button" class="close" data-dismiss="modal">
                                               <span>&times;</span></button>
                                            <div class="agile-title">
                                                <h3 class="modal-title"><strong>Modificar Login</strong></h3> 
					</div>
                                               <div class="container">
                                                   <div class="form-horizontal"> 
                                                       
                                        <div class="form-group">
                                            <form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left" action="ServletControlador" method="post"  >
                                        
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Id Login<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbIdL" required="required" class="form-control col-md-7 col-xs-12" value="<%=l.getIdLogin()%>" placeholder="Id Login" readonly="">
                                          </div>
                                        </div>        
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Nombre Usuario<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbNombreL" required="required" class="form-control col-md-7 col-xs-12" value="<%=l.getUsuario()%>" placeholder="Nombre del Login">
                                          </div>
                                        </div>
                                     
                                          <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Contraseña<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="password" id="last-name" name="txbContraL" required="required" class="form-control col-md-7 col-xs-12" value="" placeholder="Digite nuevo Password" maxlength="15">
                                          </div>
                                        </div>
                                        
                                        <div class="ln_solid"></div>
                                        <div class="form-group">
                                          <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                            <button type="submit" class="btn btn-info" name="btnModificar">
                                                                     <strong> Modificar </strong>
                                              <span class="glyphicon glyphicon-refresh"></span>
                                                                 </button>
                                                                 <input type="hidden" name="accion" value="ModificarLogin"/>
                                          </div>
                                        </div>

                                    </form>
                                            </div> 
                                                           
                                                    </div> 
                                        </div>   

                                        </div>
                                   </div>
                               </div>
                           </div>
                    </div></td>
                        <td>
                            <a id="btn-desactivar" class="btn btn-danger"><i class="fa fa-close "></i>Desactivar</a>
                        </td>

                    <%
                        salto++;
                        if(salto==1){
                            %>
                            <tr>
                             <%
                                 salto=0;
                            }
                }
                %>
      </tbody>
                    </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                    
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                  <div class="x_title">
                    <h2>Login Inactivas</h2>
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
                      <div class="col-sm-12">
                        <div class="card-box table-responsive">
                            <div class="agile-title form-group">                             
                    <label>Buscar: </label>
                    <input id="searchTerm" type="text" onkeyup="doSearch()" />
                    </div>
                          <table class="table table-bordered" id="datos">
                        <thead>
			<tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Login</th>
                        <th>Modificar</th>
                        <th>Activar</th>
			</tr>
			</thead>
                        <tbody>
                    <%
                ArrayList<Login> lista2= LoginBD.mostrarLoginInactivas();
                int salto1=0;
            
                for(Login l:lista2)
                {
                    %>
                        <td id="idLogin"><%=l.getIdLogin()%></td>
                        <td><%=l.getNombreLogin()%></td>
                        <td><%=l.getApellidoLogin()%></td>
                        <td><%=l.getUsuario()%></td>
                        <td><div class="agile-title form-group">
                        <strong><a href="#<%=l.getIdLogin()%>" class="btn btn-info" data-toggle="modal">
                                <h4 class="modal-title">
                                <span class=" glyphicon glyphicon-refresh"></span> Modificar Login
                        </h4></a></strong>
                         <div class="modal fade" id="<%=l.getIdLogin()%>">
                               <div class="modal-dialog">
                                   <div class="modal-content">
                                       <div class="modal-header">
                                           <button style="button" class="close" data-dismiss="modal">
                                               <span>&times;</span></button>
                                            <div class="agile-title">
                                                <h3 class="modal-title"><strong>Modificar Login</strong></h3> 
					</div>
                                               <div class="container">
                                                   <div class="form-horizontal"> 
                                                       
                                        <div class="form-group">
                                            <form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left" action="ServletControlador" method="post"  >
                                        
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Id Login<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbIdL" required="required" class="form-control col-md-7 col-xs-12" value="<%=l.getIdLogin()%>" placeholder="Id Login" readonly="">
                                          </div>
                                        </div>        
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Nombre Usuario<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbNombreL" required="required" class="form-control col-md-7 col-xs-12" value="<%=l.getUsuario()%>" placeholder="Nombre del Login">
                                          </div>
                                        </div>
                                          
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Password<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbContraL" required="required" class="form-control col-md-7 col-xs-12" value="" placeholder="Digite nuevo Password" maxlength="15">
                                          </div>
                                        </div>
                                        
                                        <div class="ln_solid"></div>
                                        <div class="form-group">
                                          <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                            <button type="submit" class="btn btn-info" name="btnModificarL">
                                                                     <strong> Modificar </strong>
                                              <span class="glyphicon glyphicon-refresh"></span>
                                                                 </button>
                                                                 <input type="hidden" name="accion" value="ModificarLogin"/>
                                          </div>
                                        </div>

                                    </form>
                                            </div> 
                                                           
                                                    </div> 
                                        </div>   

                                        </div>
                                   </div>
                               </div>
                           </div>
                    </div></td>
                        <td>
                            <a id="btn-activar" class="btn btn-success"><i class="fa fa-check"></i>Activar</a>
                        </td>

                    <%
                        salto1++;
                        if(salto1==1){
                            %>
                            <tr>
                             <%
                                 salto1=0;
                            }
                }
                %>
      </tbody>
                    </table>
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
    <script>
        $('#singlebox').selector();
    </script>
  </body>
</html>
<%
}}
else
{
out.print("<script>location.replace('index.jsp');</script>");
}
%>


