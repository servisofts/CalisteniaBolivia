<%-- 
    Document   : CajaDia
    Created on : 3/12/2018, 11:17:47 AM
    Author     : pc
--%>

<%@page import="java.util.Date"%>
<%@page import="java.text.DateFormat"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.io.IOException"%>
<%@page import="org.jfree.chart.ChartUtilities"%>
<%@page import="java.io.OutputStream"%>
<%@page import="org.jfree.chart.plot.PlotOrientation"%>
<%@page import="org.jfree.chart.ChartFactory"%>
<%@page import="org.jfree.data.category.DefaultCategoryDataset"%>
<%@page import="org.jfree.chart.JFreeChart"%>
<%@page import="java.util.ArrayList"%>
<%@page import="Modelo.*"%>
<%@page session="true"%>
<%

   HttpSession sesionOK1=request.getSession();
   String nom1="";
   
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
        <!-- ---------------------------------------------------------------------------------------------- -->                    
                  <div class="box-body">
                       <div class="form-group">
                        <label class="control-label col-md-4 col-sm-3 col-xs-12">Seleccione el usuario</label>
                        <div class="col-md-4 col-sm-4 col-xs-12">                          
                         <select class="form-control" id="suc" name="suc" >
                                <option>Personal...</option>
                                <% DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
	                           Date date = new Date();
                                   java.sql.Date sf = new java.sql.Date(date.getTime());  
                                    ArrayList<Personal> listaPer2 = PersonalBD.mostrarPersonalCaja(sf);
                                    for (int i = 0; i < listaPer2.size(); i++) {
                                        Personal p = listaPer2.get(i);
                                        String s = p.getNombrePersonal();
                                        s = s + " " + p.getApellidoPersonal();
                                %>

                                <option><%=s%></option>
                                <%
                                        }
                                    %>
                          </select>
                        </div>
                        </div>
                    
                          <div>
                          <table id="datatable-responsive" class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" width="100%">
                              <caption>Egresos</caption>
                        <thead>
                        <tr>
                          <th>Monto</th>
                          <th>Detalle</th>
                          <th>Modificar</th>
                        </tr>
                      </thead>
                      
                    </table>
                          </div>
                          <div>
                          <table id="ingresos" class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" width="100%">
                              <caption>Ingresos</caption>
                        <thead>
                        <tr>
                          <th>Monto</th>
                          <th>Detalle</th>
                          <th>Modificar</th>
                        </tr>
                      </thead>
                      
                    </table>
                          </div>
                  </div>  
                  
                  <div id="graficos" class="graficos">
                      
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

  
  <script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/series-label.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/highcharts-more.js"></script>

<script type="text/css">
    #container {
	min-width: 310px;
	max-width: 800px;
	height: 400px;
	margin: 0 auto
}
</script>

<script>
$(document).on('click', '#buscar', function(){
                    var inicio = document.getElementById("inicio").value;
                    var fin = document.getElementById("fin").value;
                    var sucursal = document.getElementById("suc");
                    var suc = sucursal.options[sucursal.selectedIndex].value;
                    console.log(suc);
                    console.log(fin);
                        $.post('GraphServlet', {
                            inicio : inicio,
                            fin : fin,
                            suc : suc
			}, function(responseText) {
                            //alert("hola");
                            //console.log(responseText);
                            //$("#txtIdCajaCp").val(responseText);
                                //dataTable.row.add(responseText[i]).draw();
                                console.log(responseText);
                            $("#graficos").html(responseText);
			});
});    
</script>
<script>
                $(document).on('change', '#suc', function(){
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth()+1; //January is 0!
                    var yyyy = today.getFullYear();
                    if(dd<10) {
                       dd = '0'+dd
                    } 
                    if(mm<10) {
                    mm = '0'+mm
                    } 
                    today = yyyy + '-' + mm + '-' + dd;
                    var nombre = document.getElementById("suc").value;
                        $.post('ServletCajaDia', {
                            f : today,
                            idP : nombre
			}, function(responseText) {
                            console.log(responseText);
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
                $(document).on('change', '#suc', function(){
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth()+1; //January is 0!
                    var yyyy = today.getFullYear();
                    if(dd<10) {
                       dd = '0'+dd
                    } 
                    if(mm<10) {
                    mm = '0'+mm
                    } 
                    today = yyyy + '-' + mm + '-' + dd;
                    var nombre = document.getElementById("suc").value;
                        $.post('ServletCajaDia2', {
                            f : today,
                            idP : nombre
			}, function(responseText) {
                            console.log(responseText);
                            //$("#txtIdCajaCp").val(responseText);
                            var dataTable = $('#ingresos').DataTable();
                            var i=0;
                            while(i<responseText.length)
                            {
                                dataTable.row.add(responseText[i]).draw();
                                i++;
                            }
                            
			});
});
                </script>
<style type="text/css">           
/* The Modal (background) */
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>
  </body>
</html>
                                <%
                                    }
else
{
out.print("<script>location.replace('index.jsp');</script>");
}
                                %>