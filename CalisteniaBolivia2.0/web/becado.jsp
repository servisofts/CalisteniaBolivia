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
            Caja l3 = CajaBD.mostrarCajaActiva((Integer)sesionOK.getAttribute("idContrato"));
            if(l3!=null){
            %>
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                  <div class="x_title">
                    <h2>Registro Becados</h2>
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
                    <div class="agile-title form-group">
                        <strong><a href="#NuevoCliente" class="btn btn-primary" data-toggle="modal">
                                <h4 class="modal-title">
                                <span class="fa fa-plus-square"></span> Nuevo Cliente
                        </h4></a></strong>
                         <div class="modal fade" id="NuevoCliente">
                               <div class="modal-dialog">
                                   <div class="modal-content">
                                       <div class="modal-header">
                                           <button style="button" class="close" data-dismiss="modal">
                                               <span>&times;</span></button>
                                            <div class="agile-title">
                                                <h3 class="modal-title"><strong>Nuevo Cliente</strong></h3> 
					</div>
                                               <div class="container">
                                                   <div class="form-horizontal"> 
                                                       
                                        <div class="form-group">
                                            <form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left" action="ServletControlador" method="post"  >
                                        
                                        <div class="form-group" >
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Foto <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">  
                                              <input type="file" id="last-name" name="txbImagenCl"  class="form-control col-md-7 col-xs-12" value="">
                                          </div>
                                        </div>
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Nombre <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbNombreCl" required="required" class="form-control col-md-7 col-xs-12" value="" placeholder="Nombre">
                                          </div>
                                        </div>
                                          
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Apellido <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbApellidoCl" required="required" class="form-control col-md-7 col-xs-12" value="" placeholder="Apellido">
                                          </div>
                                        </div>
                                        
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Fecha Nacimiento <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="date" id="last-name" name="txbEdadCl" required="required" class="form-control col-md-7 col-xs-12" value="">
                                          </div>
                                        </div>
                                        
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">C.I <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbCiCl" required="required" class="form-control col-md-7 col-xs-12" value="" placeholder="C.I">
                                          </div>
                                        </div>
                                        
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Telfono <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbTelefonoCl" required="required" class="form-control col-md-7 col-xs-12" value="" placeholder="Telefono">
                                          </div>
                                        </div>
                                        
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Correo <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="email" id="last-name" name="txbCorreoCl" class="form-control col-md-7 col-xs-12" value="" placeholder="Correo">
                                          </div>
                                        </div>
                                        
                                                <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Sucursal <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              
                                              <select class="form-control" name="txbSucursalCl">
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
                                              
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Zona <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              
                                              <select class="form-control" id="txbZonaCl" name="txbZonaCl">
                                            <%
                                            ArrayList<Zona> lista3= ZonaBD.mostrarZonasActivas();
                                            for(Zona s:lista3)
                                            {
                                            %>
                                                  <option value="<%=s.getIdZona()%>"><%=s.getNombre()%></option>
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
                                              <span class="glyphicon glyphicon-refresh"></span>
                                                                 </button>
                                                                 <input type="hidden" name="accion" value="GuardarCliente"/>
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
                  <div class="x_content">
                    <p class="text-muted font-13 m-b-30">
                      Puede Buscar al Cliente por: <code>NOMBRE O APELLIDO</code>
                    </p>
                    <input type="text" name="name" id="name"><br>
                    <br>
                    <button name="buscar" id="buscar" class="btn btn-primary" data-toggle="modal">
                        Buscar
                  </button>
                    <button name="boton" id="boton" class="btn btn-primary" data-toggle="modal">
                        Mostrar todos los clientes
                  </button>
                    <br>
                    <br>
                    <table id="datatable-responsive" class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" width="100%">
                        <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Apellido</th>
                          <th>C.I</th>
                          <th>Edad</th>
                          <th>Telefono</th>
                          <th>Correo</th>
                          <th>Sucursal</th>
                          <th>Foto</th>
                          <th>Añadir</th>
                        </tr>
                      </thead>
                      
                    </table>

                  </div>
                </div>
              </div>
            <%}else{%>
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                    <div class="x_title">
                    <h2>Registro Calistenia</h2>
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
                                <div class="container">
                                    <div class="table-responsive">
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


    <!-- Datatables -->
        <script src="js/custom.min.js"></script>
    
                <script>
                $(document).on('click', '#boton', function(){
                        $.post('ServletClienteCalistenia', {
			}, function(responseText) {
                            //alert("hola");
                            console.log(responseText);
                            //$("#txtIdCajaCp").val(responseText);
                            var dataTable = $('#datatable-responsive').DataTable();
                            dataTable.clear();
                            var i=0;
                            while(i<responseText.length)
                            {
                                dataTable.row.add(responseText[i]).draw();
                                i++;
                            }
                            
			});
});
                </script>
                
                <script>
                $(document).on('click', '#buscar', function(){
                    var nombre = document.getElementById("name").value;
                    //console.log(nombre);
                        $.post('ServletBecado', {
                            nombre : nombre
			}, function(responseText) {
                            //alert("hola");
                            //console.log(responseText);
                            //$("#txtIdCajaCp").val(responseText);
                            $('#datatable-responsive tbody tr').remove();
                            var dataTable = $('#datatable-responsive').DataTable(); 
                            dataTable.clear();
                            var i=0;
                            while(i<responseText.length)
                            {
                                dataTable.row.add(responseText[i]).draw();
                                i++;
                            }
                            
			});
});
                </script>
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

