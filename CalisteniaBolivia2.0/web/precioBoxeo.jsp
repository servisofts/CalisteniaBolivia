<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="Modelo.*"%>
<%@page session="true"%>
<%
   HttpSession sesionOK1=request.getSession();
   
if(sesionOK1.getAttribute("cargo")!=null){
}
else
{
out.print("<script>location.replace('index.jsp');</script>");
}
%>
<!DOCTYPE html>
<%
                    if(sesionOK1.getAttribute("cargo")!=null && sesionOK1.getAttribute("cargo")!=null){
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
                    <h2>Paquetes Activos Boxeo</h2>
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
                    <!-- Nuevo Paquete -->
                    <%
                                if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                %> 
                    <div class="agile-title form-group">
                        <strong><a href="#NuevoPaquete" class="btn btn-primary" data-toggle="modal">
                                <h4 class="modal-title">
                                <span class="fa fa-plus-square"></span> Nuevo Paquete Boxeo
                        </h4></a></strong>
                         <div class="modal fade" id="NuevoPaquete">
                               <div class="modal-dialog">
                                   <div class="modal-content">
                                       <div class="modal-header">
                                           <button style="button" class="close" data-dismiss="modal">
                                               <span>&times;</span></button>
                                            <div class="agile-title">
                                                <h3 class="modal-title"><strong>Nuevo Paquete Boxeo</strong></h3> 
					</div>
                                               <div class="container">
                                                   <div class="form-horizontal"> 
                                                       
                                        <div class="form-group">
                                            <form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left" action="ServletControlador" method="post"  >

                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Nombre Paquete<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbNombrePq" required="required" class="form-control col-md-7 col-xs-12" value="" placeholder="Nombre Paquete" maxlength="20">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Precio<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbPrecioPq" required="required" class="form-control col-md-7 col-xs-12" value="" placeholder="Precio Paquete">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Duracion(Dias)<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbDuracionPq" required="required" class="form-control col-md-7 col-xs-12" value="" placeholder="Cantidad de Usuarios en Paquete">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Cantidad<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbCantidadPq" required="required" class="form-control col-md-7 col-xs-12" value="" placeholder="Cantidad de Usuarios en Paquete">
                                          </div>
                                        </div>                                                                                     
                                     
                                        <div class="form-group">
                                          <div class="col-md-6 col-sm-6 col-xs-12">                   
                                              
                                              <input type="text" id="last-name" name="txbCategoriaPaquetePq" required="required" class="form-control col-md-7 col-xs-12" value="2" style="visibility: hidden">
                                          </div>
                                        </div>
                                          
                                        <div class="ln_solid"></div>
                                        <div class="form-group">
                                          <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                            <button type="submit" class="btn btn-info" name="btnGuardar">
                                                                     <strong> Registrar </strong>
                                              <span class="fa fa-check"></span>
                                                                 </button>
                                                                 <input type="hidden" name="accion" value="GuardarPaqueteBoxeo"/>
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
                    <%
                                }
                                %>                          
                    <!-- Fin de Nuevo de Paquete -->
                  <div class="x_content">
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="card-box table-responsive">
                          <!-- price element -->
                                              
                           <%
                ArrayList<Paquete> lista2= PaqueteBD.mostrarPaqueteBeca();
                int salto=0;
            
                for(Paquete pq:lista2)
                {
                    %>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                          <div class="pricing ui-ribbon-container">
                            <div class="ui-ribbon-wrapper">
                              <div class="ui-ribbon">
                                Beca
                              </div>
                            </div>
                            <div class="title">
                              <h2><%=pq.getNombrePaquete()%></h2>
                              <h1><%=pq.getPrecioPaquete()%></h1>
                              <span>Mensual</span>
                            </div>
                            <div class="x_content">
                              <div class="">
                                <div class="pricing_features">
                                  <ul class="list-unstyled text-left">
                                    <li><i class="fa fa-check text-success"></i> Cantidad <strong><%=pq.getCantidad()%></strong></li>
                                    <li><i class="fa fa-check text-success"></i> Categoria <strong><%=pq.getNombreCategoriaPaquete()%></strong></li>
                                    <li><i class="fa fa-check text-success"></i> <strong>Solo con Permiso de Administrador</strong></li>
                                  </ul>
                                </div>
                              </div>
                              
                            </div>
                          </div>
                        </div>
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
                           
                        <!-- price element -->
                        
                        <!-- price element -->
                        <%
                ArrayList<Paquete> lista3= PaqueteBD.mostrarPaqueteActivasBoxeo();
                int salto1=0;
            
                for(Paquete pq:lista3)
                {
                    %>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                          <div class="pricing">
                            <div class="title">
                              <h2><%=pq.getNombrePaquete()%></h2>
                              <h1><%=pq.getPrecioPaquete()%></h1>
                              <span>Mensual</span>
                            </div>
                            <div class="x_content">
                              <div class="">
                                <div class="pricing_features">
                                  <ul class="list-unstyled text-left">
                                    <li><i class="fa fa-check text-success"></i> Cantidad <strong><%=pq.getCantidad()%></strong></li>
                                    <li><i class="fa fa-check text-success"></i> Duracion <strong><%=pq.getDuracion()%> dias</strong></li>
                                    <li><i class="fa fa-check text-success"></i> Categoria <strong><%=pq.getNombreCategoriaPaquete()%></strong></li>
                                  </ul>
                                </div>
                              </div>
                              <div class="pricing_footer">
                                <%
                                if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                %>  
                                <div class="agile-title form-group">
                        <strong><a href="#<%=pq.getIdPaquete()%>" class="btn btn-info" data-toggle="modal">
                                <h4 class="modal-title">
                                <span class=" glyphicon glyphicon-refresh"></span> Modificar Paquete
                        </h4></a></strong>
                         <div class="modal fade" id="<%=pq.getIdPaquete()%>">
                               <div class="modal-dialog">
                                   <div class="modal-content">
                                       <div class="modal-header">
                                           <button style="button" class="close" data-dismiss="modal">
                                               <span>&times;</span></button>
                                            <div class="agile-title">
                                                <h3 class="modal-title"><strong>Modificar Paquete</strong></h3> 
					</div>
                                               <div class="container">
                                                   <div class="form-horizontal"> 
                                                       
                                        <div class="form-group">
                                            <form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left" action="ServletControlador" method="post"  >
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Id Paquete<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbIdPq" required="required" class="form-control col-md-7 col-xs-12" value="<%=pq.getIdPaquete()%>" placeholder="Id Paquete" readonly="">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Nombre Paquete<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbNombrePq" required="required" class="form-control col-md-7 col-xs-12" value="<%=pq.getNombrePaquete()%>" placeholder="Nombre Paquete" maxlength="20">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Precio<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbPrecioPq" required="required" class="form-control col-md-7 col-xs-12" value="<%=pq.getPrecioPaquete()%>" placeholder="Precio Paquete">
                                          </div>
                                        </div>
                                          
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Duracion(Dias)<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbDuracionPq" required="required" class="form-control col-md-7 col-xs-12" value="<%=pq.getDuracion()%>" placeholder="Duracion en dias del Paquete">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Cantidad<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbCantidadPq" required="required" class="form-control col-md-7 col-xs-12" value="<%=pq.getCantidad()%>" placeholder="Cantidad de Usuarios en Paquete">
                                          </div>
                                        </div>
                                     
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Categoria Paquete <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">                   
                                              <select class="form-control" name="txbCategoriaPaquetePq">
                                                  <%
                                            ArrayList<CategoriaPaquete> lista1= CategoriaPaqueteBD.mostrarCategoriaPaqueteACtivas();


                                            for(CategoriaPaquete cq:lista1)
                                            {
                                                %>
                                                  <option value="<%=cq.getIdCategoriaPaquete()%>"><%=cq.getNombreCategoriaPaquete()%></option>
                                            <%

                                            }
                                            %>
                                              </select>
                                          </div>
                                        </div>
                                          
                                        <div class="ln_solid"></div>
                                        <div class="form-group">
                                          <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                            <button type="submit" class="btn btn-info" name="btnModificar">
                                                                     <strong> Modificar </strong>
                                              <span class=" glyphicon glyphicon-refresh"></span>
                                                                 </button>
                                                                 <input type="hidden" name="accion" value="ModificarPaqueteBoxeo"/>
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
                               
                                <div class="agile-title form-group">
                                <strong><a href="#9<%=pq.getIdPaquete()%>" class="btn btn-danger" data-toggle="modal">
                                <h4 class="modal-title">
                                <span class=" fa fa-close"></span> Desactivar Paquete
                            </h4></a></strong>
                            <div class="modal fade" id="9<%=pq.getIdPaquete()%>">
                               <div class="modal-dialog">
                                   <div class="modal-content">
                                       <div class="modal-header">
                                           <button style="button" class="close" data-dismiss="modal">
                                               <span>&times;</span></button>
                                            <div class="agile-title">
                                                <h3 class="modal-title"><strong>Desactivar Paquete</strong></h3> 
					</div>
                                               <div class="container">
                                                   <div class="form-horizontal"> 
                                                       
                                        <div class="form-group">
                                            <form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left" action="ServletControlador" method="post"  >
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Id Paquete<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbIdPq" required="required" class="form-control col-md-7 col-xs-12" value="<%=pq.getIdPaquete()%>" placeholder="Id Paquete" readonly="">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Nombre Paquete<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbNombrePq" required="required" class="form-control col-md-7 col-xs-12" value="<%=pq.getNombrePaquete()%>" placeholder="Nombre Paquete" readonly="">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Precio<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbPrecioPq" required="required" class="form-control col-md-7 col-xs-12" value="<%=pq.getPrecioPaquete()%>" placeholder="Precio Paquete" readonly="">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Cantidad<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbCantidadPq" required="required" class="form-control col-md-7 col-xs-12" value="<%=pq.getCantidad()%>" placeholder="Cantidad de Usuarios en Paquete" readonly="">
                                          </div>
                                        </div>
                                     
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Categoria<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbCategoriaPaquetePq" required="required" class="form-control col-md-7 col-xs-12" value="<%=pq.getNombrePaquete()%>" placeholder="Categoria del Paquete" readonly="">
                                          </div>
                                        </div>
                                          
                                        <div class="ln_solid"></div>
                                        <div class="form-group">
                                          <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                            <button type="submit" class="btn btn-danger" name="btnDesactivar">
                                                                     <strong> Desactivar </strong>
                                              <span class=" fa fa-close"></span>
                                                                 </button>
                                                                 <input type="hidden" name="accion" value="DesactivarPaqueteBoxeo"/>
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
                                <%
                                }
                                %>
                              </div>
                            </div>
                          </div>
                        </div>
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
                        <!-- price element -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                    
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                  <div class="x_title">
                    <h2>Paquetes Inactivos Boxeo</h2>
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
                            <!-- price element -->
                        <%
                ArrayList<Paquete> lista4= PaqueteBD.mostrarPaqueteInactivasBoxeo();
                int salto2=0;
            
                for(Paquete pq:lista4)
                {
                    %>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                          <div class="pricing">
                            <div class="title">
                              <h2><%=pq.getNombrePaquete()%></h2>
                              <h1><%=pq.getPrecioPaquete()%></h1>
                              <span>Mensual</span>
                            </div>
                            <div class="x_content">
                              <div class="">
                                <div class="pricing_features">
                                  <ul class="list-unstyled text-left">
                                    <li><i class="fa fa-check text-success"></i> Cantidad <strong><%=pq.getCantidad()%></strong></li>
                                    <li><i class="fa fa-check text-success"></i> Duracion <strong><%=pq.getDuracion()%> dias</strong></li>
                                    <li><i class="fa fa-check text-success"></i> Categoria <strong><%=pq.getNombreCategoriaPaquete()%></strong></li>
                                  </ul>
                                </div>
                              </div>
                              <div class="pricing_footer">
                                <%
                                if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                                %>
                                <div class="agile-title form-group">
                        <strong><a href="#<%=pq.getIdPaquete()%>" class="btn btn-info" data-toggle="modal">
                                <h4 class="modal-title">
                                <span class=" glyphicon glyphicon-refresh"></span> Modificar Paquete
                        </h4></a></strong>
                         <div class="modal fade" id="<%=pq.getIdPaquete()%>">
                               <div class="modal-dialog">
                                   <div class="modal-content">
                                       <div class="modal-header">
                                           <button style="button" class="close" data-dismiss="modal">
                                               <span>&times;</span></button>
                                            <div class="agile-title">
                                                <h3 class="modal-title"><strong>Modificar Paquete</strong></h3> 
					</div>
                                               <div class="container">
                                                   <div class="form-horizontal"> 
                                                       
                                        <div class="form-group">
                                            <form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left" action="ServletControlador" method="post"  >
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Id Paquete<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbIdPq" required="required" class="form-control col-md-7 col-xs-12" value="<%=pq.getIdPaquete()%>" placeholder="Id Paquete" readonly="">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Nombre Paquete<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbNombrePq" required="required" class="form-control col-md-7 col-xs-12" value="<%=pq.getNombrePaquete()%>" placeholder="Nombre Paquete" maxlength="20">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Precio<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbPrecioPq" required="required" class="form-control col-md-7 col-xs-12" value="<%=pq.getPrecioPaquete()%>" placeholder="Precio Paquete">
                                          </div>
                                        </div>
                                          
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Duracion(Dias)<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbDuracionPq" required="required" class="form-control col-md-7 col-xs-12" value="<%=pq.getDuracion()%>" placeholder="Duracion en dias del Paquete">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Cantidad<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbCantidadPq" required="required" class="form-control col-md-7 col-xs-12" value="<%=pq.getCantidad()%>" placeholder="Cantidad de Usuarios en Paquete">
                                          </div>
                                        </div>
                                     
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Categoria Paquete <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">                   
                                              <select class="form-control" name="txbCategoriaPaquetePq">
                                                  <%
                                            ArrayList<CategoriaPaquete> lista1= CategoriaPaqueteBD.mostrarCategoriaPaqueteACtivas();


                                            for(CategoriaPaquete cq:lista1)
                                            {
                                                %>
                                                  <option value="<%=cq.getIdCategoriaPaquete()%>"><%=cq.getNombreCategoriaPaquete()%></option>
                                            <%

                                            }
                                            %>
                                              </select>
                                          </div>
                                        </div>
                                          
                                        <div class="ln_solid"></div>
                                        <div class="form-group">
                                          <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                            <button type="submit" class="btn btn-info" name="btnModificar">
                                                                     <strong> Modificar </strong>
                                              <span class=" glyphicon glyphicon-refresh"></span>
                                                                 </button>
                                                                 <input type="hidden" name="accion" value="ModificarPaqueteBoxeo"/>
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
                                
                                <div class="agile-title form-group">
                                <strong><a href="#1<%=pq.getIdPaquete()%>" class="btn btn-success" data-toggle="modal">
                                <h4 class="modal-title">
                                <span class=" fa fa-check"></span> Activar Paquete
                        </h4></a></strong>
                         <div class="modal fade" id="1<%=pq.getIdPaquete()%>">
                               <div class="modal-dialog">
                                   <div class="modal-content">
                                       <div class="modal-header">
                                           <button style="button" class="close" data-dismiss="modal">
                                               <span>&times;</span></button>
                                            <div class="agile-title">
                                                <h3 class="modal-title"><strong>Activar Paquete</strong></h3> 
					</div>
                                               <div class="container">
                                                   <div class="form-horizontal"> 
                                                       
                                        <div class="form-group">
                                            <form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left" action="ServletControlador" method="post"  >
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Id Paquete<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbIdPq" required="required" class="form-control col-md-7 col-xs-12" value="<%=pq.getIdPaquete()%>" placeholder="Id Paquete" readonly="">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Nombre Paquete<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbNombrePq" required="required" class="form-control col-md-7 col-xs-12" value="<%=pq.getNombrePaquete()%>" placeholder="Nombre Paquete" readonly="">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Precio<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbPrecioPq" required="required" class="form-control col-md-7 col-xs-12" value="<%=pq.getPrecioPaquete()%>" placeholder="Precio Paquete" readonly="">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Cantidad<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbCantidadPq" required="required" class="form-control col-md-7 col-xs-12" value="<%=pq.getCantidad()%>" placeholder="Cantidad de Usuarios en Paquete" readonly="">
                                          </div>
                                        </div>
                                     
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Categoria<span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbCategoriaPaquetePq" required="required" class="form-control col-md-7 col-xs-12" value="<%=pq.getNombrePaquete()%>" placeholder="Categoria del Paquete" readonly="">
                                          </div>
                                        </div>
                                          
                                        <div class="ln_solid"></div>
                                        <div class="form-group">
                                          <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                            <button type="submit" class="btn btn-success" name="btnActivar">
                                                                     <strong> Activar </strong>
                                              <span class=" fa fa-check"></span>
                                                                 </button>
                                                                 <input type="hidden" name="accion" value="ActivarPaqueteBoxeo"/>
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
                                <%
                                }
                                %>
                              </div>
                            </div>
                          </div>
                        </div>
                            <%
                        salto2++;
                        if(salto2==1){
                            %>
                            <tr>
                             <%
                                 salto2=0;
                            }
                }
                %>
                        <!-- price element -->
                          
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

  </body>
</html>
<%
                                    }
else
{
out.print("<script>location.replace('index.jsp');</script>");
}
                                %>
