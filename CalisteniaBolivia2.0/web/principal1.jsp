<%-- 
    Document   : principal1
    Created on : 27/12/2018, 10:09:24 AM
    Author     : pc
--%>

<%@page import="java.io.IOException"%>
<%@page import="java.io.OutputStream"%>
<%@page import="java.util.ArrayList"%>
<%@page import="Modelo.*"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%
   HttpSession sesionOK1=request.getSession();
   String nom1="";
   boolean bool=false;

if(sesionOK1.getAttribute("cargo")!=null){
    nom1=(String)sesionOK1.getAttribute("nom")+" "+(String)sesionOK1.getAttribute("apell");

   //Personal p = PersonalBD.mostrarCantidadPersonalContratoACtivo((Integer)sesionOK.getAttribute("idsucu"));
    //Caja ca = CajaBD.mostrarTotalCajaPersonal((Integer)sesionOK.getAttribute("idContrato"));
}else
{
out.print("<script>location.replace('index.jsp');</script>");
}
%>

<%
    int nroC=0;
    int nroCB=0;
    String sC;
    String sCB;
                            ArrayList<Cliente> listacc = ClienteBD.mostrarCantidadContratoActivos();
                                for (Cliente cl : listacc) {
                                    nroC = cl.getIdCliente();
                                }

                                ArrayList<Cliente> listacc2 = ClienteBD.mostrarCantidadContratoActivosBoxeo();
                                for (Cliente cl : listacc2) {
                                    nroCB = cl.getIdCliente();
                                }
                                sC = String.valueOf(nroC);
                                sCB = String.valueOf(nroCB);
                                int nroCl = 0;
        ArrayList<Cliente> listac = ClienteBD.mostrarCantidadClientes();
        for (Cliente cl : listac)
        {
            nroCl = cl.getIdCliente();
        }
        float pCB=(nroCB*100);
                pCB=pCB/nroCl;
        String SPCB = String.format("%.2f",pCB);
        
float pCC=(nroC*100);
                pCC=pCC/nroCl;
        String SPCC = String.format("%.2f",pCC);
        
        int nroT=nroC+nroCB;
        
float pC=(nroT*100);
                pC=pC/nroCl;
        String SPC = String.format("%.2f",pC);
%>
<%
    
                            
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
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />

    <title>Calistenia Bolivia</title>
    
  <!--     Fonts and icons     -->
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
  <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
  <!-- CSS Files -->
  <link href="assets/css/bootstrap.min.css" rel="stylesheet" />
  <link href="assets/css/now-ui-dashboard.css?v=1.2.0" rel="stylesheet" />


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
                    <a href="principal.jsp" class="site_title"><i class="fa fa-user"></i> <span>Calistenia Bolivia</span></a>
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
                    <img src="images/caliii.jpg" alt=""><% out.println(nom1);%>
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
        <!-- ---------------------------------------------------------------------------------------------- -->                       
            <div class="box-footer text-black">
                  <div class="row">
                      <!-- -------------------------------------------------------------------------------- -->
                      <!-- -------------------------------------------------------------------------------- -->
                    <div class="col-sm-12">
                        <!-- Progress bars -->
                      <!-- <div class="clearfix">
                        <span class="pull-left">Clientes</span>
                        <small class="pull-right"><%out.println(SPC+"%");%></small>
                      </div>
                      <div class="progress xs">
                        <div class="progress-bar progress-bar-green" style="width: <%out.println(SPC+"%");%>"></div>
                      </div>

                      <div class="clearfix">
                        <span class="pull-left">Calistenia</span>
                        <small class="pull-right"><%out.println(SPCC+"%");%></small>
                      </div>
                      <div class="progress xs">
                        <div class="progress-bar progress-bar-green" style="width: <%out.println(SPCC+"%");%>"></div>
                      </div>
                      <div class="clearfix">
                        <span class="pull-left">Boxeo</span>
                        <small class="pull-right"><%out.println(SPCB+"%");%></small>
                      </div>
                      <div class="progress xs">
                        <div class="progress-bar progress-bar-green" style="width: <%out.println(SPCB+"%");%>"></div>
                      </div>
                    </div><!-- /.col -->
                      <div class="col-sm-12">
                          <div id="graficos" class="graficos">
                          </div>
                  </div><!-- /.row -->
                   <!-- DONUT CHART -->

            <!-- <h3 class="box-title">Donut Chart</h3> -->
            <div class="box-body" id="graph">
              <!-- <div id="container"></div> -->
              
            <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="x_panel">
            <div class="x_title">
                <h2>Clientes Activos</h2>
                <div class="clearfix"></div>
            </div>
            <div class="x_content">
                <p class="text-muted font-13 m-b-30">
                      Puede Buscar al Cliente por: <code>NOMBRE O APELLIDO</code>
                    </p>
                    <input type="text" name="name" id="name"><br>
                    <button name="buscar" id="buscar" >
                        Buscar
                  </button>
                    <button name="boton" id="boton" >
                        Mostrar todos los clientes
                  </button>
                    <table id="datatable-responsive" class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Edad</th>
                                <th>CI</th>
                                <th>Telefono</th>
                                <th>Fecha Inicio</th>
                                <th>Fecha Fin</th>
                                <th>Categoria</th>
                                <th>Paquete y Precio</th>
                            <%
                                if((sesionOK1.getAttribute("cargo").equals("Gerencia"))||(sesionOK1.getAttribute("cargo").equals("Administrador"))){
                            %> 
                                <th>Modificar Fecha</th>
                            <%
                                }
                            %>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>

                    </table>
            </div>
        </div>
    </div>
            <!-- /.box-body -->
                </div>
           <!-- ---------------------------------------------------------------------------------------------- -->  
           
                            <br/>
          <!-- /top tiles -->
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
<!-- FontAwesome 4.3.0 -->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <!-- Ionicons 2.0.0 -->
    <link href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css" />
    <!-- Theme style -->
    <link href="dist/css/AdminLTE.min.css" rel="stylesheet" type="text/css" />
    <!-- AdminLTE Skins. Choose a skin from the css/skins
         folder instead of downloading all of them to reduce the load. -->
    <link href="dist/css/skins/_all-skins.min.css" rel="stylesheet" type="text/css" />
    <!-- iCheck -->
    <link href="plugins/iCheck/flat/blue.css" rel="stylesheet" type="text/css" />
    <!-- Morris chart -->
    <link href="plugins/morris/morris.css" rel="stylesheet" type="text/css" />
    <!-- jvectormap -->
    <link href="plugins/jvectormap/jquery-jvectormap-1.2.2.css" rel="stylesheet" type="text/css" />
    <!-- Date Picker -->
    <link href="plugins/datepicker/datepicker3.css" rel="stylesheet" type="text/css" />
    <!-- Daterange picker -->
    <link href="plugins/daterangepicker/daterangepicker-bs3.css" rel="stylesheet" type="text/css" />
    <!-- bootstrap wysihtml5 - text editor -->
    <link href="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css" rel="stylesheet" type="text/css" />
   

    
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
  <script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/series-label.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>

    <!-- Custom Theme Scripts -->
     <script>
                $(document).on('click', '#boton', function(){
                    var nom1="<%= nom1 %>";
                        $.post('ServletTablaPrincipal', {
                            nom : nom1
			}, function(responseText) {
                            //alert("hola");
                            //console.log(responseText);
                            //$("#txtIdCajaCp").val(responseText);
                            var dataTable = $('#datatable-responsive').DataTable();
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
                        $.post('ServletTablaPrincipal1', {
                            nombre : nombre
			}, function(responseText) {
                            //alert("hola");
                            //console.log(responseText);
                            //$("#txtIdCajaCp").val(responseText);
                            $('#datatable-responsive tbody tr').remove();
                            var dataTable = $('#datatable-responsive').DataTable();                           
                            var i=0;
                            while(i<responseText.length)
                            {
                                dataTable.row.add(responseText[i]).draw();
                                i++;
                            }
                            
			});
});
                </script>
    <script src="js/custom.min.js"></script>
        		<script type="text/javascript">
			$(document).ready(function() {
				$("#todos").click(function(event) {
                                    //console.log("hola");
					$("#bo").load('tablajsp.jsp');
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
<script src="js/jquery-3.2.1.min.js"></script>
   <script src="js/jquery.dataTables.min.js"></script> 
   <script>
       $(document).ready( function () {
    $('#table_id').DataTable();
        } );
        
   </script> 
     <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="../../bower_components/bootstrap/dist/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="../../bower_components/font-awesome/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="../../bower_components/Ionicons/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../../dist/css/AdminLTE.min.css">
  


<!-- <script type="text/javascript">
    //var c=document.getElementById("ccc").innerHTML;
    //var cb=document.getElementById("CB").value;
    //console.log(document.getElementById("CB").value);
    Highcharts.chart('pieChart', {  
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Porcentaje de clientes activos por disciplina'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Porcentaje de clientes',
        colorByPoint: true,
        data: [{
            name: 'Calistenia',
            y: <% out.print(sesionOK1.getAttribute("nroCC")); %>,
            sliced: true,
            selected: true
        }, {
            name: 'Boxeo',
            y: <% out.print(sesionOK1.getAttribute("nroCB")); %>
        }]
    }]
});
</script> -->
<%if(sesionOK1.getAttribute("cargo").equals("Gerencia")||(sesionOK1.getAttribute("cargo").equals("Administrador"))){%>
<script>
$(document).ready( function () {
    //console.log("hola");
                        $.post('VencimientoServlet', {
			}, function(responseText) {
                            //alert("hola");
                            //console.log(responseText);
                            //$("#txtIdCajaCp").val(responseText);
                                //dataTable.row.add(responseText[i]).draw();
                                //console.log(responseText);
                            $("#graficos").html(responseText);
			});
});    
</script>
<% } %>
  
  </body>
</html>
                                <%
                                    }
else
{
out.print("<script>location.replace('index.jsp');</script>");
}

                                %>



