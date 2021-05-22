<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="Modelo.*"%>
<%@page session="true"%>
<%
   String usu1="";
   String nom1="";
   String sucu1="";
   String idper1="";
   Integer idsucu1=0;
   Integer idContrato1=0;
   String imagen1="";
   HttpSession sesionOK1=request.getSession();
   
if(sesionOK1.getAttribute("cargo")!=null){
    nom1=(String)sesionOK1.getAttribute("nom")+" "+(String)sesionOK1.getAttribute("apell");
    usu1=(String)sesionOK1.getAttribute("cargo");
    sucu1=(String)sesionOK1.getAttribute("sucur");
    idper1=(String)sesionOK1.getAttribute("idper");
    idsucu1=(Integer)sesionOK1.getAttribute("idsucu");
    imagen1=(String)sesionOK1.getAttribute("imagen");
    idContrato1=(Integer)sesionOK1.getAttribute("idContrato");
%>
<!DOCTYPE html>
<%
if((sesionOK1.getAttribute("cargo").equals("Ventas"))||(sesionOK1.getAttribute("cargo").equals("Administrador"))) {
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
            <!-- /menu profile quick info -->

            <br />

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
                    <img src="images/caliii.jpg" alt=""><% out.println(nom1);%>
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
            <div class="row tile_count">
                <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div class="tile-stats">
                        <div class="icon"><i class="fa fa-users"></i>
                        </div>
                            <%
                                ArrayList<Cliente> listac= ClienteBD.mostrarCantidadClientes();
                                for(Cliente cl:listac)
                                {
                            %>
                            <div class="count"><%=cl.getIdCliente()%></div>
                            <%
                                }
                            %>
                            <h3>Clientes</h3>
                            <p>Total de Clientes Registrados en la Base de Datos</p>
                    </div>
                </div>
                <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div class="tile-stats">
                        <div class="icon"><i class="fa fa-users red"></i>
                        </div>
                            <%
                                ArrayList<Cliente> listacc= ClienteBD.mostrarCantidadContratoActivos();
                                for(Cliente cl:listacc)
                                {
                            %>
                            <div class="count"><%=cl.getIdCliente()%></div>
                            <%
                                }
                            %>
                            <h3>Activos Calistenia</h3>
                            <p class="blue">Total de Clientes Calistenia con Fechas Activas</p>
                    </div>
                </div>
                <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div class="tile-stats">
                        <div class="icon"><i class="fa fa-users blue"></i>
                        </div>
                            <%
                                ArrayList<Cliente> listacc2= ClienteBD.mostrarCantidadContratoActivosBoxeo();
                                for(Cliente cl:listacc2)
                                {
                            %>
                            <div class="count"><%=cl.getIdCliente()%></div>
                            <%
                                }
                            %>
                            <h3>Activos Boxeo</h3>
                            <p class="blue">Total de Clientes Boxeo con Fechas Activas</p>
                    </div>
                </div>                    
                <%
                if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))) {
                %>
                <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div class="tile-stats">
                        <div class="icon"><i class="fa fa-money green"></i>
                        </div>
                            <%
                            float total=0;
                            ArrayList<Caja> listaca= CajaBD.mostrarTotalCajaPersonal1((Integer)sesionOK.getAttribute("idContrato"));
                            for(Caja ca:listaca)
                            {
                            total=ca.getSaldoCaja();
                            %>
                            <div class="count"><%=total%>Bs</div>
                            <h3>Total Caja</h3>
                            <p class="blue">Monto Expresado en Bolivianos</p>
                           
                            <%
                                }
                            %>
                    </div>
                </div>
                    <%
                        }
                    %>
            </div>    
        <!-- /top tiles -->    
    <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="x_panel">
            <div class="x_title">
                <h2>Crear Caja Nueva</h2>
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
                                <form class="form-horizontal form-label-left" action="ServletControlador" method="post" onsubmit="return enviado()">
                                    <input type="text" class="form-control" value="<% out.println(idContrato);%>" readonly="" name="txtIdContratoCa" style="visibility: hidden">
                                    <div class="form-group">
                                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Saldo</label>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <input type="text" class="form-control" value="" name="txbEfectivoCa">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Observacion</label>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <input type="text" class="form-control" value="Apertura de Caja" name="txbOvbervacionCa" readonly="">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Personal<span class="required">*</span>
                                        </label>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <select type="text" list="listadedatos" id="txbPerspnalCa" name="txbPerspnalCa" required class="form-control col-md-7 col-xs-12" placeholder="Digite el nombre del Personal"
                                                   onFocusout="comprobar()">
                                                <!--<datalist id="listadedatos"> -->
                                                <%
                                                ArrayList<Personal> listaPer= PersonalBD.mostrarPersonalContratoACtivo();
                                                for(Personal c:listaPer)
                                                    {
                                                %>
                                                <option value="<%=c.getIdContratoPersonal()%>"><%=c.getNombrePersonal()%></option>
                                                <%
                                                    }
                                                %>
                                                <option selected="selected">
                                                 Seleccione el nombre de personal
                                                 </option>
                                                <!--</datalist>-->
                                                </select>
                                        </div>
                                    </div>
                                                
                                    <div class="form-group">
                                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Sucursal</label>
                                        <div class="control-label col-md-3 col-sm-3 col-xs-12">
                                            <input type="text" class="form-control" value="Sucursal" id="txbSucursal" name="txbSucursal" readonly="">
                                        </div>
                                    </div>
                                                
                                    <div class="ln_solid"></div>
                                    <div class="form-group">
                                        <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
                                            <input type="submit" class="btn btn-primary" value="Crear" name="btnModificar">
                                            <input type="hidden" name="accion" value="CrearCaja" />
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
        //var personal = document.getElementById("txtP");
        //var per = personal.options[personal.selectedIndex].value;
	$(document).ready(function() {
            //console.log("hola");
		$('#txbPerspnalCa').change(function(event) {
			var paquete = document.getElementById("txbPerspnalCa");
                        var paq = paquete.options[paquete.selectedIndex].value;                   
                        //console.log(paq);
			$.post('SucursalCajaServlet', {
				paq : paq
			}, function(responseText) {
                            //alert(responseText);
                            //console.log(responseText);
                            $("#txbSucursal").val(responseText);
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
    <script>
        var text = document.getElementById("cliente"),
                element=document.getElementById("listadedatos");
        function comprobar()
        {
            if(element.querySelector("option[value='"+text.value+"']"))
            {}
            else
            {
                document.getElementById("cliente").value=null,
                        document.getElementById("cliente").focus();
            }
        }
    </script>
    <script LANGUAGE="JavaScript">
function enviado() {
if(confirm("VERIFIQUE BIEN ANTES DE REALIZAR EL REGISTRO,\n\
                        Esta Seguro Que desea Realizar el Registro?"))
               return true;
            else{
                return false;
            }
}
</script>

  </body>
</html>
<%
}}
else
{
out.print("<script>location.replace('index.jsp');</script>");
}
%>
