<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="Modelo.*"%>
<%@page session="true"%>
<%

   String nom1="";
   HttpSession sesionOK1=request.getSession();
   
if(sesionOK1.getAttribute("cargo")!=null){
    nom1=(String)sesionOK1.getAttribute("nom")+" "+(String)sesionOK1.getAttribute("apell");
    Caja l = CajaBD.mostrarCajaActiva((Integer)sesionOK1.getAttribute("idContrato"));
    }else
{
out.print("<script>location.replace('index.jsp');</script>");
}
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


            <!-- sidebar menu -->
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
                    //if(l2!=null){
                    if(true){
        %>
    <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="x_panel">
            <div class="x_title">
                <h2>Otros Egresos</h2>
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
                       <div class="col-md-6 col-xs-12">
                
                  <div class="x_content">
                    <br />
                    <form class="form-horizontal form-label-left" action="ServletControlador" method="post" >

                            <!--<div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Id Caja</label>
                        <div class="col-md-6 col-sm-6 col-xs-12"> -->
                            <%
                    //if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                        //Caja l = CajaBD.mostrarCajaActiva((Integer)sesionOK.getAttribute("idContrato"));
                    %>
                            <!--<input type="text" class="form-control" value="<%//=l.getIdCaja()%>" name="txbCajaOE" readonly=""> -->
                        <%
                        //}
                        %>
                        <!--</div>
                      </div>-->
                        
                        <div class="form-group">
                                <label class="control-label col-md-4 col-sm-6 col-xs-12" for="last-name">Fecha de apertura de caja <span class="required"></span>
                                </label>
                                <div class="col-md-7 col-sm-7 col-xs-12">
                                    <input type="date" id="fecha" name="txbFecha" required="required" class="form-control col-md-7 col-xs-12" value="">
                                </div>
                                </div>
                                
                        <div class="form-group">
                        <label class="control-label col-md-4 col-sm-3 col-xs-12">Seleccione el Personal de caja</label>
                        <div class="col-md-7 col-sm-7 col-xs-12">                          
                         <select class="form-control" id="txtP" name="txtA" >
                                <option>Seleccione una fecha primero</option>
                          </select>
                        </div>
                        </div>
                               
                        <div class="form-group">
                        <label class="control-label col-md-4 col-sm-6 col-xs-12">Numero de Caja a Ingresar</label>
                        <div class="col-md-2  col-sm-2 col-xs-12">
                            <input type="text" name="txbCajaOE" id="txtIdCajaCp" value="" readonly=""> 
                        </div>
                        </div>
 
                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Monto</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" value="" name="txbEfectivoOE">
                        </div>
                      </div>
                        
                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Observacion</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <textarea id="message" class="form-control" name="txbOvbervacionOE" data-parsley-trigger="keyup" data-parsley-minlength="20" data-parsley-maxlength="100" data-parsley-validation-threshold="10"></textarea>
                        </div>
                      </div>

                      <div class="ln_solid"></div>
                      <div class="form-group">
                        <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
                            <input type="submit" class="btn btn-primary" value="Registrar" name="btnModificar">
                            <input type="hidden" name="accion" value="GuardarOtroEgreso"/>
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
                        <%}else{%>
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                    <div class="x_title">
                    <h2>Otro Egreso</h2>
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
    <script src="js/custom.min.js"></script>
    
            <script>
        var dateControl = document.querySelector('input[type="date"]');
        var f = dateControl.value; 
	$(document).ready(function() {
		$('#fecha').change(function(event) {
			var dateControl = document.querySelector('input[type="date"]');
                        var f1 = dateControl.value;
			$.post('ActionServlet', {
				f : f1
			}, function(responseText) {
                            //alert(responseText);
                            //console.log(responseText);
                            var i=0;
                            var select = document.getElementById("txtP"); 
                            $("#txtP").empty();
                            if(responseText.length>0)
                            {
                                var option = document.createElement('option');
                                option.text = "Seleccione personal";
                                select.add(option, 0);
                            while(i<responseText.length)
                            {                               
                               var opt = responseText[i];
                               var el = document.createElement("option");
                               el.text = opt;
                               el.value = opt;
                               select.add(el);
                               i++;
                            }
                        }else{
                            var option = document.createElement('option');
                            option.text = "No se abrio caja la fecha seleccionada";
                            select.add(option, 0);
                        }
			});
		});
	});
</script>

<script>
        //var personal = document.getElementById("txtP");
        //var per = personal.options[personal.selectedIndex].value;
	$(document).ready(function() {
		$('#txtP').change(function(event) {
			var personal = document.getElementById("txtP");
                        var per = personal.options[personal.selectedIndex].value;
                        var dateControl = document.querySelector('input[type="date"]');
                        var f1 = dateControl.value;
                        //console.log(per);
			$.post('CajaServlet2', {
				per : per,
                                f : f1
			}, function(responseText) {
                            //alert(responseText);
                            console.log(responseText);
                            $("#txtIdCajaCp").val(responseText);
			});
		});
	});
</script>

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