<%-- 
<%-- 
    Document   : estadoMensual
    Created on : 19-dic-2017, 23:06:23
    Author     : YakuRocaH
--%>
<%@page import="java.util.Calendar"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="Modelo.*"%>
<%@page session="true"%>
<%
// Quiero la fecha actual para ponerla por defecto 
Calendar ahora = Calendar.getInstance();
int anyo = ahora.get(Calendar.YEAR);
int mes = ahora.get(Calendar.MONTH) +1; 
int dia = ahora.get(Calendar.DAY_OF_MONTH);
String sAhora = "";
if (mes < 10) {
sAhora = anyo + "-0" + mes;
} else {
sAhora = anyo + "-" + mes;
}
if (dia < 10) {
sAhora += "-0" + dia;
} else {
sAhora += "-"+dia;
} 
%>
<%
   HttpSession sesionOK1=request.getSession();
   
if(sesionOK1.getAttribute("cargo")!=null){
    Ingreso ic= IngresoBD.mostrarTotalIngresoDiarioCali((Integer)sesionOK1.getAttribute("idContrato"));
    Ingreso icp= IngresoBD.mostrarTotalIngresoPersonal((Integer)sesionOK1.getAttribute("idContrato"));
    EgresoPersonal ep = EgresoPersonalBD.mostrarTotalEgresoPersonal((Integer)sesionOK1.getAttribute("idContrato"));
    CuentaXPagar cxp = CuentaXPagarBD.mostrarTotalCXP((Integer)sesionOK1.getAttribute("idContrato"));
    Caja ca = CajaBD.mostrarTotalCajaPersonal((Integer)sesionOK1.getAttribute("idContrato"));
    Caja l = CajaBD.mostrarCajaActiva((Integer)sesionOK1.getAttribute("idContrato"));
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

    <!-- Ion.RangeSlider -->
    <link href="vendors/normalize-css/normalize.css" rel="stylesheet">
    <link href="vendors/ion.rangeSlider/css/ion.rangeSlider.css" rel="stylesheet">
    <link href="vendors/ion.rangeSlider/css/ion.rangeSlider.skinFlat.css" rel="stylesheet">
    <!-- Bootstrap Colorpicker -->
    <link href="vendors/mjolnic-bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css" rel="stylesheet">

    <link href="vendors/cropper/dist/cropper.min.css" rel="stylesheet">
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
    <script>
        function confirmar()
        {
           
            if(confirm("ESTA SEGURO QUE DESEA ELIMINAR ESTE INGRESO?"))
               return true;
            else{
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
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                  <div class="x_title">
                    <h2>Eliminar Ingreso Efectivo</h2>
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
                  <div class="x_content">
                    <p class="text-muted font-13 m-b-30">
                      Puede Buscar El Ingreso por Nombre de Cliente: <code>NOMBRE o APELLIDO</code>
                    </p>
                    <table id="datatable-responsive" class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" width="100%">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Apellido</th>
                          <th>Paquete y Precio</th>
                          <th>Categoria</th>
                          <%
                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %> 
                          <th>Eliminar</th>
                          <%
                        }
                        %>
                        </tr>
                      </thead>
                      <tbody>
                          
                           <%
            
                            ArrayList<Ingreso> lista= IngresoBD.mostrarEliminarIngreso();

                            for(int i=0;i<lista.size();i++)
                            {
                                Ingreso cl=lista.get(i);
                                        %>
                            <tr>
                                <td><%=cl.getNombre()%></td>
                                <td><%=cl.getApellido()%></td>
                                <td><%=cl.getPaquete()%> -- <%=cl.getEfectivo()%></td>
                                <td><%=cl.getGlosa()%></td>
                                <%
                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %> 
                                <td> <a href="#<%=cl.getIdContrato1()%>" class="btn btn-danger" data-toggle="modal">
                           <strong> Eliminar </strong>
                           <span class="glyphicon glyphicon-remove"></span>
                            </a>
                           <!-- Eliminar Ingreso -->
                    <div class="modal fade" id="<%=cl.getIdContrato1()%>">
                               <div class="modal-dialog">
                                   <div class="modal-content">
                                       <div class="modal-header">
                                           <button style="button" class="close" data-dismiss="modal">
                                               <span>&times;</span></button>
                                            <div class="agile-title">
                                                <h3 class="modal-title"><strong>Eliminar Ingreso</strong></h3> 
					</div>
                                               <div class="container">
                                                   <div class="form-horizontal"> 
                                                       
                                        <div class="form-group">
                                    <form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left" action="ServletControlador" method="post"  onsubmit="return confirmar()">
                                        
                                        <div class="form-group" >
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">
                                          </label>

                                            <div class="col-md-1 col-sm-6 col-xs-12">
                                                <input type="text" id="first-name" name="txbContratoMembresia" required="required" class="form-control col-md-7 col-xs-12" value="<%=cl.getIdContrato1()%>" style=" visibility: hidden" >
                                          </div>
                                          <div class="col-md-1 col-sm-6 col-xs-12">
                                                <input type="text" id="first-name" name="txbCXCContratoMembresia" required="required" class="form-control col-md-7 col-xs-12" value="<%=cl.getIdContrato2()%>" style=" visibility: hidden">
                                          </div>
                                          <div class="col-md-1 col-sm-6 col-xs-12">
                                                <input type="text" id="first-name" name="txbInCXC" required="required" class="form-control col-md-7 col-xs-12" value="<%=cl.getIdIngresoCuentaXCobrar()%>" style=" visibility: hidden">
                                          </div>
                                          <div class="col-md-1 col-sm-6 col-xs-12">
                                                <input type="text" id="first-name" name="txbIngresoCaja" required="required" class="form-control col-md-7 col-xs-12" value="<%=cl.getIdIngresoCaja()%>" style=" visibility: hidden">
                                          </div>
                                          <div class="col-md-1 col-sm-6 col-xs-12">
                                                <input type="text" id="first-name" name="txbRelacion" required="required" class="form-control col-md-7 col-xs-12" value="<%=cl.getRelacion()%>" style=" visibility: hidden">
                                          </div>
                                          <div class="col-md-1 col-sm-6 col-xs-12">
                                                <input type="text" id="first-name" name="txbIdCaja" required="required" class="form-control col-md-7 col-xs-12" value="<%=cl.getIdCaja()%>" style=" visibility: hidden">
                                          </div>
                                          <div class="col-md-1 col-sm-6 col-xs-12">
                                                <input type="text" id="first-name" name="txbNombrePer" required="required" class="form-control col-md-7 col-xs-12" value="<% out.println(nom);%>" style=" visibility: hidden">
                                          </div>
                                        </div>
                                          <div class="ln_solid"></div>
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Nombre <span class="required">*</span>
                                          </label>
                                          <div class="col-md-5 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbNombrecl" required="required" class="form-control col-md-7 col-xs-12" value="<%=cl.getNombre()%>" readonly="">
                                          </div>
                                        </div>
                                          
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Apellido <span class="required">*</span>
                                          </label>
                                          <div class="col-md-5 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbApellidocl" required="required" class="form-control col-md-7 col-xs-12" value="<%=cl.getApellido()%>" readonly="">
                                          </div>
                                        </div>
                                          
                                        <div class="ln_solid"></div>
                                        
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Paquete <span class="required">*</span>
                                          </label>
                                          <div class="col-md-5 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbPaquete" required="required" class="form-control col-md-7 col-xs-12" value="<%=cl.getPaquete()%>" readonly="">
                                          </div>
                                        </div>
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Precio <span class="required">*</span>
                                          </label>
                                          <div class="col-md-5 col-sm-6 col-xs-12">
                                              <input type="text" id="last-name" name="txbPrecio" required="required" class="form-control col-md-7 col-xs-12" value="<%=cl.getEfectivo()%>" readonly="">
                                          </div>
                                        </div>  
                                        <div class="ln_solid"></div>
                                        <div class="form-group">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Motivo <span class="required">*</span>
                                          </label>
                                          <div class="col-md-5 col-sm-6 col-xs-12">
                                              <select class="form-control" name="txbObservacion">
                                                  <option value="Error del Personal">Error del Personal</option>
                                                  <option value="Devolucion de Efectivo a Cliente">Devolucion de Efectivo</option>
                                                  <option value="Venta Duplicada de Cliente">Venta Duplicada</option>
                                                  <option value="Otros">Otros</option>
                                              </select>
                                          </div>
                                        </div>  
                                        <div class="ln_solid"></div>
                                        <div class="form-group">
                                          <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                            <button type="submit" class="btn btn-danger" name="btnModificar">
                                                                     <strong> Eliminar </strong>
                                              <span class="glyphicon glyphicon-remove"></span>
                                                                 </button>
                                                                 <input type="hidden" name="accion" value="EliminarIngreso"/>
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
                            <!-- Fin Modificar Cliente -->
                   </td>
                                <%
                        }
                        %>
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
    <!-- bootstrap-daterangepicker -->
    <script src="js/moment/moment.min.js"></script>
    <script src="js/datepicker/daterangepicker.js"></script>
    <!-- Ion.RangeSlider -->
    <script src="vendors/ion.rangeSlider/js/ion.rangeSlider.min.js"></script>
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
 <!-- bootstrap-daterangepicker -->
    <script>
      $(document).ready(function() {
        var cb = function(start, end, label) {
          console.log(start.toISOString(), end.toISOString(), label);
          $('#reportrange_right span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        };

        var optionSet1 = {
          startDate: moment().subtract(29, 'days'),
          endDate: moment(),
          minDate: '01/01/2012',
          maxDate: '12/31/2030',
          dateLimit: {
            days: 60
          },
          showDropdowns: true,
          showWeekNumbers: true,
          timePicker: false,
          timePickerIncrement: 1,
          timePicker12Hour: true,
          ranges: {
            'Hoy': [moment(), moment()],
            'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Ultimos 7 Dias': [moment().subtract(6, 'days'), moment()],
            'Ultimos 30 Dias': [moment().subtract(29, 'days'), moment()],
            'Este Mes': [moment().startOf('month'), moment().endOf('month')],
            'Anterior Mes': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
          },
          opens: 'right',
          buttonClasses: ['btn btn-default'],
          applyClass: 'btn-small btn-primary',
          cancelClass: 'btn-small',
          format: 'MM/DD/YYYY',
          separator: ' to ',
          locale: {
            applyLabel: 'Submit',
            cancelLabel: 'Clear',
            fromLabel: 'Desde',
            toLabel: 'Hasta',
            customRangeLabel: 'Custom',
            daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre'],
            firstDay: 1
          }
        };

        $('#reportrange_right span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));

        $('#reportrange_right').daterangepicker(optionSet1, cb);

        $('#reportrange_right').on('show.daterangepicker', function() {
          console.log("show event fired");
        });
        $('#reportrange_right').on('hide.daterangepicker', function() {
          console.log("hide event fired");
        });
        $('#reportrange_right').on('apply.daterangepicker', function(ev, picker) {
          console.log("apply event fired, start/end dates are " + picker.startDate.format('MMMM D, YYYY') + " to " + picker.endDate.format('MMMM D, YYYY'));
        });
        $('#reportrange_right').on('cancel.daterangepicker', function(ev, picker) {
          console.log("cancel event fired");
        });

        $('#options1').click(function() {
          $('#reportrange_right').data('daterangepicker').setOptions(optionSet1, cb);
        });

        $('#options2').click(function() {
          $('#reportrange_right').data('daterangepicker').setOptions(optionSet2, cb);
        });

        $('#destroy').click(function() {
          $('#reportrange_right').data('daterangepicker').remove();
        });

      });
    </script>


    <script>
      $(document).ready(function() {
        $('#reservation').daterangepicker(null, function(start, end, label) {
          console.log(start.toISOString(), end.toISOString(), label);
        });
      });
    </script>
    <!-- /bootstrap-daterangepicker -->

    <!-- Ion.RangeSlider -->
    <script>
      $(document).ready(function() {
        $("#range_27").ionRangeSlider({
          type: "double",
          min: 1000000,
          max: 2000000,
          grid: true,
          force_edges: true
        });
        $("#range").ionRangeSlider({
          hide_min_max: true,
          keyboard: true,
          min: 0,
          max: 5000,
          from: 1000,
          to: 4000,
          type: 'double',
          step: 1,
          prefix: "$",
          grid: true
        });
        $("#range_25").ionRangeSlider({
          type: "double",
          min: 1000000,
          max: 2000000,
          grid: true
        });
        $("#range_26").ionRangeSlider({
          type: "double",
          min: 0,
          max: 10000,
          step: 500,
          grid: true,
          grid_snap: true
        });
        $("#range_31").ionRangeSlider({
          type: "double",
          min: 0,
          max: 100,
          from: 30,
          to: 70,
          from_fixed: true
        });
        $(".range_min_max").ionRangeSlider({
          type: "double",
          min: 0,
          max: 100,
          from: 30,
          to: 70,
          max_interval: 50
        });
        $(".range_time24").ionRangeSlider({
          min: +moment().subtract(12, "hours").format("X"),
          max: +moment().format("X"),
          from: +moment().subtract(6, "hours").format("X"),
          grid: true,
          force_edges: true,
          prettify: function(num) {
            var m = moment(num, "X");
            return m.format("Do MMMM, HH:mm");
          }
        });
      });
    </script>
    <!-- /Ion.RangeSlider -->
    
    
  </body>
</html>
<%
    }}
else
{
out.print("<script>location.replace('index.jsp');</script>");
}
                                %>