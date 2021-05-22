<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="Modelo.*"%>
<%@page session="true"%>
<%
   HttpSession sesionOK1=request.getSession();
   
if(sesionOK1.getAttribute("cargo")!=null){
    Personal pe = PersonalBD.mostrarCantidadPersonalContratoACtivo((Integer)sesionOK1.getAttribute("idsucu"));
}
else
{
out.print("<script>location.replace('index.jsp');</script>");
}
%>
<!DOCTYPE html>
                    <%
                    if((sesionOK1.getAttribute("cargo").equals("Gerencia"))||(sesionOK1.getAttribute("cargo").equals("Administrador"))){
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
                    <h2>Personal</h2>
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
                      <li><a class="close-link"><i class="fa fa-close"></i></a>
                      </li>
                    </ul>
                    <div class="clearfix"></div>
                  </div>
                     <!-- Nuevo Personal -->
                    <div class="agile-title form-group">
                        <strong><a href="#NuevoPersonal" class="btn btn-primary" data-toggle="modal">
                                <h4 class="modal-title">
                                <span class="fa fa-plus-square"></span> Nuevo Personal
                        </h4></a></strong>
                         <div class="modal fade" id="NuevoPersonal">
                               <div class="modal-dialog">
                                   <div class="modal-content">
                                       <div class="modal-header">
                                           <button style="button" class="close" data-dismiss="modal">
                                               <span>&times;</span></button>
                                            <div class="agile-title">
                                                <h3 class="modal-title"><strong>Nuevo Personal</strong></h3> 
					</div>
                                               <div class="container">
                                                   <div class="form-horizontal"> 
                                             
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Foto<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="file" id="last-name" name="txbImagenP"  class="form-control col-md-7 col-xs-12" value="" >
                                          </div>
                                        </div>
                                                       
                                        <div class="form-group">
                                            <form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left" action="ServletControlador" method="post"  >

                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Nombre<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbNombreP" required="required" class="form-control col-md-7 col-xs-12" value="" placeholder="Nombre">
                                          </div>
                                        </div>
                                     
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Apellido<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbApellidoP" required="required" class="form-control col-md-7 col-xs-12" value="" placeholder="Apellido">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Edad<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="date" id="last-name" name="txbEdadP" required="required" class="form-control col-md-7 col-xs-12" value="" placeholder="Edad">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">C.I<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbCiP" required="required" class="form-control col-md-7 col-xs-12" value="" placeholder="Celula de Identidad">
                                          </div>
                                        </div>
                                              
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Telefono<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbTelP" required="required" class="form-control col-md-7 col-xs-12" value="" placeholder="Telefono">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Email<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="email" id="last-name" name="txbEmailP"  class="form-control col-md-7 col-xs-12" value="" placeholder="Email">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Fecha de Contrato<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="date" id="last-name" name="txbFechaContratoIniP"  class="form-control col-md-7 col-xs-12" value="" placeholder="Fecha de Contrato">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Fecha Fin de Contrato<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="date" id="last-name" name="txbFechaContratoFinP"  class="form-control col-md-7 col-xs-12" value="" placeholder="Fecha Fin de Contrato">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Observacion<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <textarea id="message" required="required" class="form-control" name="txbObservacionP" data-parsley-trigger="keyup" data-parsley-minlength="20" data-parsley-maxlength="100" data-parsley-validation-threshold="10"></textarea>
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Cargo <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              
                                              <select class="form-control" name="txbCargoP">
                                            <%
                                            ArrayList<CargoPersonal> lista1= CargoPersonalBD.mostrarCargoPersonalACtivas();


                                            for(CargoPersonal cp:lista1)
                                            {
                                            %>
                                                  <option value="<%=cp.getIdCargo()%>"><%=cp.getNombreCargo()%></option>
                                            <%

                                            }
                                            %>
                                              </select>
                                              
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Sucursal <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              
                                              <select class="form-control" name="txbSucursalP">
                                            <%
                                            ArrayList<Sucursal> lista2= SucursalBD.mostrarSucursalACtivas();


                                            for(Sucursal s:lista2)
                                            {
                                            %>
                                                  <option value="<%=s.getIdSucursal()%>"><%=s.getNombreSucursal()%></option>
                                            <%

                                            }
                                            %>
                                              </select>
                                              
                                          </div>
                                        </div>
                                                
                                        <div class="ln_solid"></div>
                                        <div class="form-group">
                                          <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                            <button type="submit" class="btn btn-info" name="btnGuardar">
                                                                     <strong> Registrar </strong>
                                              <span class="fa fa-check-square"></span>
                                                                 </button>
                                                                 <input type="hidden" name="accion" value="GuardarPersonalContrato"/>
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
                    <!-- Fin de Nuevo Personal -->
                  <div class="x_content">
                    <p class="text-muted font-13 m-b-30">
                      Puede Buscar al Personal por: <code>NOMBRE o APELLIDO</code>
                    </p>
                    <table id="datatable-responsive" class="table table-striped table-bordered dt-responsive nowrap table-responsive" cellspacing="0" width="100%">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Apellido</th>
                          <th>Edad</th>
                          <th>C.I</th>
                          <th>Telefono</th>
                          <th>Cargo</th>
                          <th>Sucursal</th>
                          <th>Modificar</th>
                          <th>Detalle</th>
                        </tr>
                      </thead>
                      <tbody>
                          
                           <%
            
                            ArrayList<Personal> lista= PersonalBD.mostrarPersonalContratoACtivo();

                            for(int i=0;i<lista.size();i++)
                            {
                                Personal p=lista.get(i);
                                        %>
                            <tr>
                                <td><%=p.getNombrePersonal()%></td>
                        <td><%=p.getApellidoPersonal()%></td>
                        <td><%=p.getEdad()%></td>
                        <td><%=p.getCI()%></td>
                        <td><%=p.getTelefono()%></td>
                        <td><%=p.getNombreCargo()%></td>
                        <td><%=p.getSucursal()%></td>
                       
                        <td ><div class="agile-title form-group">
                        <strong><a href="#<%=p.getIdPersonal()%>" class="btn btn-info" data-toggle="modal">
                                <h4 class="modal-title">
                                <span class=" glyphicon glyphicon-refresh"></span> Modificar Personal
                        </h4></a></strong>
                         <div class="modal fade" id="<%=p.getIdPersonal()%>">
                               <div class="modal-dialog">
                                   <div class="modal-content">
                                       <div class="modal-header">
                                           <button style="button" class="close" data-dismiss="modal">
                                               <span>&times;</span></button>
                                            <div class="agile-title">
                                                <h3 class="modal-title"><strong>Modificar Personal Contrato</strong></h3> 
					</div>
                                               <div class="container">
                                                   <div class="form-horizontal"> 
                                                       
                                        <div class="form-group">
                                            <form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left" action="ServletControlador" method="post"  >
                                        
                                        <div class="form-group" >
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">  
                                              <img src="images/caliii.jpg"  class="img-circle profile_img">
                                          </div>
                                        </div>
                                          <div class="ln_solid"></div>
                                          
                                          <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Id Personal<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbIdP" required="required" class="form-control col-md-7 col-xs-12" value="<%=p.getIdPersonal()%>" placeholder="Id Personal" readonly="">
                                          </div>
                                        </div> 
                                        <div class="form-group" >
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="first-name" name="txbIdContactoP" required="required" class="form-control col-md-7 col-xs-12" value="<%=p.getIdContacto()%>" style="visibility: hidden">
                                          </div>
                                        </div>
                                                       
                                            <div class="ln_solid"></div>    
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Nombre <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbNombreP" required="required" class="form-control col-md-7 col-xs-12" value="<%=p.getNombrePersonal()%>" placeholder="Nombre Personal">
                                          </div>
                                        </div>
                                         
                                          <div class="ln_solid"></div> 
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Apellido <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbApellidoP" required="required" class="form-control col-md-7 col-xs-12" value="<%=p.getApellidoPersonal()%>" placeholder="Apellido Personal">
                                          </div>
                                        </div>
                                     
                                          <div class="ln_solid"></div> 
                                          <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Edad <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbEdadP" required="required" class="form-control col-md-7 col-xs-12" value="<%=p.getEdad()%>" placeholder="Edad Personal" readonly="">
                                          </div>
                                        </div>
                                        
                                          <div class="ln_solid"></div> 
                                          <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">CI <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbCiP" required="required" class="form-control col-md-7 col-xs-12" value="<%=p.getCI()%>" placeholder="CI Personal" readonly="">
                                          </div>
                                        </div>
                                          
                                          <div class="ln_solid"></div> 
                                          <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Telefono <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbTelefonoP" required="required" class="form-control col-md-7 col-xs-12" value="<%=p.getTelefono()%>" placeholder="Telefono Personal">
                                          </div>
                                        </div>
                                          
                                          <div class="ln_solid"></div> 
                                          <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Correo <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbCorreoP" required="required" class="form-control col-md-7 col-xs-12" value="<%=p.getCorreo()%>" placeholder="Correo Personal">
                                          </div>
                                        </div>
                                          
                                          <div class="ln_solid"></div> 
                                          <div class="form-group">
                                              <div class="col-md-5 col-sm-3 col-xs-12">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Fecha Contrato <span class="required">*</span>
                                          </label>
                                                  </div>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbFechaIniP" required="required" class="form-control col-md-7 col-xs-12" value="<%=p.getFechaIniContrato()%>" placeholder="Fecha Contrato Personal" readonly="">
                                          </div>
                                        </div>
                                          
                                          <div class="ln_solid"></div> 
                                          <div class="form-group">
                                              <div class="col-md-5 col-sm-3 col-xs-12">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Fecha Fin Contrato <span class="required">*</span>
                                          </label>
                                                  </div>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbFechaFinP" required="required" class="form-control col-md-7 col-xs-12" value="<%=p.getFechaIniContrato()%>" placeholder="Fecha Fin Contrato Personal" readonly="">
                                          </div>
                                        </div>
                                          
                                          <div class="ln_solid"></div> 
                                          <div class="form-group">
                                              <div class="col-md-4 col-sm-3 col-xs-12">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Observacion<span class="required">*</span>
                                          </label>
                                                  </div>
                                          <div class="col-md-3 col-sm-3 col-xs-12">
                                              <textarea id="message"  class="form-control" name="txbObservacionP" data-parsley-trigger="keyup" data-parsley-minlength="20" data-parsley-maxlength="100" data-parsley-validation-threshold="10" value="<%=p.getObservacion()%>" readonly=""></textarea>
                                          </div>
                                        </div>
                                          
                                          <div class="ln_solid"></div> 
                                          <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Cargo <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbCargoP" required="required" class="form-control col-md-7 col-xs-12" value="<%=p.getNombreCargo()%>" placeholder="Cargo Personal" readonly="">
                                          </div>
                                        </div>
                                          
                                        <div class="ln_solid"></div> 
                                          <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Sucursal <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              
                                              <select class="form-control" id="txbSucursalP" name="txbSucursalP">
                                            <%
                                            ArrayList<Sucursal> lista3= SucursalBD.mostrarSucursalACtivas();


                                            for(Sucursal s:lista3)
                                            {
                                            %>
                                                  <option value="<%=s.getIdSucursal()%>"><%=s.getNombreSucursal()%></option>
                                            <%

                                            }
                                            %>
                                              </select>
                                              
                                          </div>
                                        </div>
                                       </div>
                                          
                                        <div class="ln_solid"></div>
                                        <div class="form-group">
                                          <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                            <button type="submit" class="btn btn-info" name="btnModificar">
                                                                     <strong> Modificar </strong>
                                              <span class="glyphicon glyphicon-refresh"></span>
                                                                 </button>
                                                                 <input type="hidden" name="accion" value="ModificarPersonalContrato"/>
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
                        </td>
                        
                        <td> <div class="agile-title form-group">
                            <a href="#1<%=p.getIdPersonal()%>" class="btn btn-warning" data-toggle="modal">
                           <strong> Detalle </strong>
                           <span class="glyphicon glyphicon-list-alt"></span>
                            </a>
                           <!-- Detalle de Personal -->
                           <div class="modal fade" id="1<%=p.getIdPersonal()%>">
                               <div class="modal-dialog">
                                   <div class="modal-content">
                                       <div class="modal-header">
                                           <button style="button" class="close" data-dismiss="modal">
                                               <span>&times;</span></button>
                                            <div class="agile-title">
                                                <h3 class="modal-title"><strong>Detalle del Personal</strong></h3> 
					</div>
                                           <div class="container">
                                                   <div class="form-horizontal"> 
                                                       
                                        <div class="form-group">
                                    <form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left" action="ServletControlador" method="post" onsubmit="return checkIt1()">
                                        
                                        <div class="form-group" >
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">  
                                              <img src="images/caliii.jpg"  class="img-circle profile_img">
                                          </div>
                                        </div>
                                          
                                          <div class="ln_solid"></div> 
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">ID Personal
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <label class="control-label " for="last-name"><%=p.getIdPersonal()%> 
                                          </label>
                                          </div>
                                        </div>
                                          
                                          <div class="ln_solid"></div> 
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Nombre :
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <label class="control-label " for="last-name"><%=p.getNombrePersonal()%> <%=p.getApellidoPersonal()%> 
                                          </label>
                                          </div>
                                        </div>                                     
                                       
                                          <div class="ln_solid"></div> 
                                       <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">
                                               Edad <span class="glyphicon glyphicon-calendar"></span>:
                                           </label>
                                           <div class="col-md-6 col-sm-6 col-xs-12">
                                               <label class="control-label">
                                                   <%=p.getEdad()%>Años
                                           </label>
                                           </div>
                                       </div>
                                           
                                           <div class="ln_solid"></div> 
                                            <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                               CI <span class="glyphicon glyphicon-credit-card"></span>:
                                           </label>
                                           <div class="col-md-6 col-sm-6 col-xs-12">
                                               <label class="control-label">
                                               <%=p.getCI()%>
                                           </label>
                                           </div>
                                       </div>
                                           
                                           <div class="ln_solid"></div> 
                                            <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                               Telefono <span class="glyphicon glyphicon-phone"></span>:
                                           </label>
                                           <div class="col-md-6 col-sm-6 col-xs-12">
                                            <label class="control-label">
                                                <a href="https://api.whatsapp.com/send?phone=591<%=p.getTelefono()%>">
                                                    <%=p.getTelefono()%></a>
                                           </label>
                                           </div>
                                       </div>
                                           
                                           <div class="ln_solid"></div> 
                                            <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                               Email <span class="glyphicon glyphicon-envelope"></span>:
                                           </label>
                                           <div class="col-md-6 col-sm-6 col-xs-12">
                                               <label class="control-label">
                                                   <%=p.getCorreo()%>
                                           </label>
                                           </div>
                                       </div>
                                           
                                           <div class="ln_solid"></div> 
                                           <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                               Fecha de Contrato <span class="glyphicon glyphicon-envelope"></span>:
                                           </label>
                                           <div class="col-md-6 col-sm-6 col-xs-12">
                                               <label class="control-label">
                                                   <%=p.getFechaIniContrato()%>
                                           </label>
                                           </div>
                                       </div>
                                           
                                           <div class="ln_solid"></div> 
                                           <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                               Fecha Fin de Contrato <span class="glyphicon glyphicon-envelope"></span>:
                                           </label>
                                           <div class="col-md-6 col-sm-6 col-xs-12">
                                               <label class="control-label">
                                                   <%=p.getFechaFinContrato()%>
                                           </label>
                                           </div>
                                       </div>
                                           
                                           <div class="ln_solid"></div> 
                                           <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                               Observacion <span class="glyphicon glyphicon-envelope"></span>:
                                           </label>
                                           <div class="col-md-6 col-sm-6 col-xs-12">
                                               <label class="control-label">
                                                   <%=p.getObservacion()%>
                                           </label>
                                           </div>
                                       </div>
                                           
                                           <div class="ln_solid"></div> 
                                           <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                               Cargo <span class="glyphicon glyphicon-envelope"></span>:
                                           </label>
                                           <div class="col-md-6 col-sm-6 col-xs-12">
                                               <label class="control-label">
                                                   <%=p.getNombreCargo()%>
                                           </label>
                                           </div>
                                       </div>
                                           
                                           <div class="ln_solid"></div> 
                                           <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                               Sucursal <span class="glyphicon glyphicon-envelope"></span>:
                                           </label>
                                           <div class="col-md-6 col-sm-6 col-xs-12">
                                               <label class="control-label">
                                                   <%=p.getSucursal()%>
                                           </label>
                                           </div>
                                       </div>
                                           
                                        <div class="ln_solid"></div>

                                    </form>
                                            </div> 
                                                           
                                                    </div> 
                                        </div>  
                                           
                                        </div>
                                   </div>
                               </div>
                           </div>
                           </div>
                           <!-- Fin de Detalle Personal -->
                       </td>
                            </tr>
                                <%

                            }
                            %>
                      </tbody>
                    </table>

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

  </body>
</html>
<%
                                    }
else
{
out.print("<script>location.replace('index.jsp');</script>");
}
                                %>
