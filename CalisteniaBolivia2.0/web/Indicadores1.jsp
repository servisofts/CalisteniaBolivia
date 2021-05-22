<%-- 
    Document   : Indicadores1
    Created on : 26/12/2018, 12:28:46 PM
    Author     : pc
--%>

<%@page import="java.io.IOException"%>
<%@page import="org.jfree.chart.ChartUtilities"%>
<%@page import="java.io.OutputStream"%>
<%@page import="org.jfree.chart.plot.PlotOrientation"%>
<%@page import="org.jfree.chart.ChartFactory"%>
<%@page import="org.jfree.data.category.DefaultCategoryDataset"%>
<%@page import="org.jfree.chart.JFreeChart"%>
<%@page import="java.util.ArrayList"%>
<%@page import="Modelo.*"%>
<%@page contentType="text/html" pageEncoding="ISO-8859-1"%>
<%@page session="true"%>
<%
   HttpSession sesionOK1=request.getSession();
   boolean bool=false;

if(sesionOK1.getAttribute("cargo")!=null){
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
    <link href="css/stacktable.css" rel="stylesheet">
    <link href="css/jquery.dataTables.min.css" rel="stylesheet">
    <script type=?text/javascript? src=?js/stacktable.js?></script>
    <script type=?text/javascript?>
    $(document).ready(function() {
    $(?#datos?).stacktable();
    });
    </script>
    <script src="js/jquery.min.js"></script>
     <script src="js/sweetalert2.all.js"></script>
     <script LANGUAGE="JavaScript">
var cuenta=0;
function enviado() { 
if (cuenta == 0)
{
cuenta++;
return true;
}
else 
{
alert("El formulario ya est� siendo enviado, por favor aguarde un instante.");
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
<%@include file="options.jsp" %>                        
        <!-- ---------------------------------------------------------------------------------------------- -->                    
                  <div class="box-body">
                      Desde <input type="date" id="inicio" name="txbFechaI" required="required" value=""> hasta 
                      <input type="date" id="fin" name="txbFechaF" required="required" value=""><br>                            
                      <br>
                      
                       <div class="form-group">
                        <label class="control-label col-md-4 col-sm-3 col-xs-12">Seleccione la sucursal</label>
                        <div class="col-md-4 col-sm-4 col-xs-12">                          
                         <select class="form-control" id="suc" name="suc" >
                                <option>Sucursal...</option>                               
                                <%ArrayList<Sucursal> lista = SucursalBD.mostrarSucursalACtivas();
                                    int salto = 0;

                                    for (Sucursal s : lista) {
                                %>

                                <option><%=s.getNombreSucursal()%></option>
                                <%
                                    salto++;
                                    if (salto == 1) {
                                                salto = 0;
                                            }
                                        }
                                    %>
                                    <option>Todas</option>
                          </select>
                        </div>
                        </div>
                      
                    <button name="buscar" id="buscar" >
                        Buscar
                  </button>
                  </div>  
                  
                  <div id="graficos" class="graficos">
                      
                  </div>
            </div>
    <div class="row">
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

    <!-- Custom Theme Scripts -->
    <script src="js/custom.min.js"></script>
        		<script type="text/javascript">
			$(document).ready(function() {
				$("#todos").click(function(event) {
                                    console.log("hola");
					$("#bo").load('tablajsp.jsp');
				});
			});
		</script>               
<script src="js/jquery-3.3.1.min.js"></script>
   <script src="js/jquery.dataTables.min.js"></script> 
     <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="../../bower_components/bootstrap/dist/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="../../bower_components/font-awesome/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="../../bower_components/Ionicons/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../../dist/css/AdminLTE.min.css">
  
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
  </body>
</html>
                                <%
                                    }
else
{
out.print("<script>location.replace('index.jsp');</script>");
}

                                %>



