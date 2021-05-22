<%@page import="java.sql.Date"%>
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
if((sesionOK1.getAttribute("cargo").equals("Gerencia"))||(sesionOK1.getAttribute("cargo").equals("Administrador"))){
%>
<%
    Integer idContrato2=Integer.valueOf(request.getParameter("txbPerspnalL"));
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
    <script src="js/eliminarEgresoChequeProAct.js" type="text/javascript"></script>
    <script src="js/eliminarEgresoTransProAct.js" type="text/javascript"></script>
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
                    <h2>Eliminar Otros Egresos (Proveddor) <code>CHEQUE o TRANSACCION BANCARIA</code></h2>
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
                    <div class="col-md-12 table-responsive">
                        <div class="table-responsive">
                            <div class="agile-title"  >
                                <h2><code>CHEQUE</code></h2> 
                            </div>
                        <%
                                if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){

                                %>
                        <%
                                    }
                                    %>
                                <table class="table table-bordered">
                                    <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>Razon Social</th>
                                    <th>Nombre Apellido</th>
                                    <th>Fecha</th>
                                    <th>Monto en Bs</th>
                                    <th>Observacion</th>
                                    <th>Tipo de Pago</th>
                                    <th>N° Cheque</th>
                                    <th>Accion</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <%

                                        ArrayList<EgresoChequeTransPro> lista= 
                                                EgresoChequeTransProBD.mostrarEliminarOtroEgresoPrveedorChequeAct(idContrato2);

                                        for(int i=0;i<lista.size();i++)
                                        {
                                            EgresoChequeTransPro oe=lista.get(i);
                                                    %>
                                        <tr>
                                            <td id="idEgresoChequeProAct"><%=oe.getIdChequeTrans()%></td>
                                            <td><%=oe.getRazonSocial()%></td>
                                            <td><%=oe.getNombre()%> <%=oe.getApellido()%></td>
                                            <td><%=oe.getFecha()%></td>
                                            <td><%=oe.getMonto()%></td>
                                            <td><%=oe.getObservacion()%></td>
                                            <td> <%=oe.getTipoPago()%></td>
                                            <td> <%=oe.getNumero()%></td>
                                            <td> 
                                            <a id="btn-eliminar"><i class="fa fa-trash-o btn btn-danger"></i></a>
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
                    </div>
                    </div>
                    <div class="x_content">
                    <div class="row">
                    <div class="w3ls-row" id="div1">
                    <div class="col-md-12 table-responsive">
                    <div class="table-responsive">
                    <div class="agile-title"  >
                        <h2><code>TRANSACCION BANCARIA</code></h2> 
                    </div>
            <%
                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){

                    %>
            <%
                        }
                        %>
                    <table class="table table-bordered">
                        <thead>
			<tr>
                        <tr>
                        <th>ID</th>
                        <th>Razon Social</th>
                        <th>Nombre Apellido</th>
                        <th>Fecha</th>
                        <th>Monto en Bs</th>
                        <th>Observacion</th>
                        <th>Tipo de Pago</th>
                        <th>N° Cheque o Cuenta</th>
                        <th>Entidad</th>
                        <th>Accion</th>
			</tr>
			</thead>
                        <tbody>
                            <%
                            ArrayList<EgresoChequeTransPro> lista2= 
                                    EgresoChequeTransProBD.mostrarEliminarOtroEgresoPrveedorTransAct(idContrato2);

                            for(int i=0;i<lista2.size();i++)
                            {
                                EgresoChequeTransPro oe=lista2.get(i);
                                        %>
                            <tr>
                                <td id="idEgresoTransPerAct"><%=oe.getIdChequeTrans()%></td>
                                <td><%=oe.getRazonSocial()%></td>
                                <td><%=oe.getNombre()%> <%=oe.getApellido()%></td>
                                <td><%=oe.getFecha()%></td>
                                <td><%=oe.getMonto()%></td>
                                <td><%=oe.getObservacion()%></td>
                                <td><%=oe.getTipoPago()%></td>
                                <td><%=oe.getNumero()%></td>
                                <td><%=oe.getEntidad()%></td>
                                <td> 
                                <a id="btn-eliminar2"><i class="fa fa-trash-o btn btn-danger"></i></a>
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
    }}
else
{
out.print("<script>location.replace('index.jsp');</script>");
}

                                %>