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
                    if(sesionOK1.getAttribute("cargo")!=null){
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
                    <h2>Egreso Personal</h2>
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
                    <!-- Nuevo Egreso Personal -->
                    <div class="agile-title form-group">
                        <strong><a href="#NuevoEP" class="btn btn-primary" data-toggle="modal">
                                <h4 class="modal-title">
                                <span class="fa fa-plus-square"></span> Nuevo Proveedor
                        </h4></a></strong>
                         <div class="modal fade" id="NuevoEP">
                               <div class="modal-dialog">
                                   <div class="modal-content">
                                       <div class="modal-header">
                                           <button style="button" class="close" data-dismiss="modal">
                                               <span>&times;</span></button>
                                            <div class="agile-title">
                                                <h3 class="modal-title"><strong>Nuevo Proveedor</strong></h3> 
					</div>
                                               <div class="container">
                                                   <div class="form-horizontal"> 
                                                       
                                        <div class="form-group">
                                            <form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left" action="ServletControlador" method="post"  >
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Razon Social <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbRazonSocialPro" required="required" class="form-control col-md-7 col-xs-12" value="" placeholder="Razon Social">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Nombre <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbNombrePro" required="required" class="form-control col-md-7 col-xs-12" value="" placeholder="Nombre">
                                          </div>
                                        </div>
                                                
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Apellido <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbApellidoPro" class="form-control col-md-7 col-xs-12" value="" placeholder="Apellido">
                                          </div>
                                        </div>
                                        
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Nit <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbNitPro" required="required" class="form-control col-md-7 col-xs-12" value="" placeholder="Nit">
                                          </div>
                                        </div>
                                        
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Telefono <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbTelefonoPro" required="required" class="form-control col-md-7 col-xs-12" value="" placeholder="Telefono">
                                          </div>
                                        </div>
                                        
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Correo <span class="required">*</span>
                                          </label>
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input type="email" id="last-name" name="txbCorreoPro" class="form-control col-md-7 col-xs-12" value="" placeholder="Correo">
                                          </div>
                                        </div>
                                        
                                        <div class="ln_solid"></div>
                                        <div class="form-group">
                                          <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                            <button type="submit" class="btn btn-info" name="btnGuardar">
                                                                     <strong> Registrar </strong>
                                              <span class="glyphicon glyphicon-refresh"></span>
                                                                 </button>
                                                                 <input type="hidden" name="accion" value="GuardarProveedor"/>
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
                    <!-- Fin de Nuevo de Cliente -->
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
                        <th>Razon Social</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Nit</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                        <th>Modificar </th>
                        <th>Detalle</th>
			</tr>
			</thead>
                        <tbody>
                    <%
                ArrayList<Proveedor> lista= ProveedorBD.mostrarProveedor();
                int salto=0;
            
                for(Proveedor pr:lista)
                {
                    %>
                        <td><%=pr.getRazonSocial()%></td>
                        <td><%=pr.getNombre()%></td>
                        <td> <%=pr.getApellido()%></td>
                        <td> <%=pr.getNit()%></td>
                        <td> <%=pr.getTelefono()%></td>
                        <td> <%=pr.getCorreo()%></td>

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
