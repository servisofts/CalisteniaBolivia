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
    <script>
        function alerta1(){
            swal({
  title: "Are you sure?",
  text: "Once deleted, you will not be able to recover this imaginary file!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Poof! Your imaginary file has been deleted!", {
      icon: "success",
    });
  } else {
    swal("Your imaginary file is safe!");
  }
});
        };
    </script>
     <script>
        function confirmar()
        {
           
            if(confirm("VERIFIQUE BIEN ANTES DE REALIZAR EL REGISTRO,\n\
                        Esta Seguro Que desea Realizar el Registro?"))
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
                    <h2>Otros Egresos (Personal) <code>CHEQUE o TRANSACCION BANCARIA</code></h2>
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
                      <div class="col-sm-12 table-responsive">
                          <div class="card-box " id="cart-container">
                           <form method="post" action="ServletControlador" onsubmit="return confirmar(event);">
                        <input type="hidden" name="accion" value="RegistrarEgresoChequeTrans"/>
                    <table class="table table-striped" id="datos">
                        <thead>
                        <tr>
                        <th>Usuario:</th>
                        <th><input type="text" value="<%out.println(nom);%>" name="txtUsuarioC" disabled=""></th>
                        <th>Sucursal:</th>
                        <th><input type="text" value="<% out.println(sucu);%>" name="txtSucursalC" disabled=""></th>
                            <th>IdCaja a Ingresar</th>
                            <%
                    //if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                        //Caja l = CajaBD.mostrarCajaActiva((Integer)sesionOK.getAttribute("idContrato"));
                    %>
<!--                            <th><input type="text" name="txtIdCajaC" value="<%//=l.getIdCaja()%>" readonly=""></th>-->
                        <%
                        //}
                        %>
                        </tr>
			<tr>
                        <th>Nombre Completo</th>
                        <th>Monto en BS</th>
                        <th>Tipo Pago</th>
                        <th>Numero Cheque o Cuenta</th>
                        <th>Entidad</th>
                        <th>Observacion</th>
                        <th>Eliminar</th>
			</tr>
			</thead>
                        <tbody>
        <%
                ArrayList<EgresoChequeTrans> lista= 
                        (ArrayList<EgresoChequeTrans>)session.getAttribute("carrito4");

            if(lista!=null){
                int salto=0;
                for(EgresoChequeTrans co:lista)
                {
                    %>
                    <th><%=co.getPersonal().getNombrePersonal()%> <%=co.getPersonal().getApellidoPersonal()%></th>
                    <th> <%=co.getMonto()%></th>
                    <% if(co.getTipoPago().equals("CHEQUE")) {%>
                    <th> <%=co.getTipoPago()%></th>
                    <th> <%=co.getNumero()%></th>
                    <th></th>
                    <%  }
                    else{
                    %>
                    <th><%=co.getTipoPago()%></th>
                    <th><%=co.getNumero()%></th>
                    <th><%=co.getEntidadFinanciera().getNombreEntidad()%></th>
                    <%}
                    %>
                    <th><%=co.getObservacion()%></th>
                    <th> 
                        <span id="idPersonal" style="display:none;"><%=co.getPersonal().getIdPersonal()%></span>
                        <a id="deleteitem2"><i class="fa fa-times btn btn-danger"></i></a>
                    </th>

                    <%

                        salto++;
                        if(salto==1){
                            %>
                            <tr>
                             <%
                                 salto=0;
                            }
                }}%>
                
                <tr >
                    <th colspan="4"></th>
                    <td><button onclick="alerta1()" type="submit" name="btnVenta" class=" btn btn-primary btn-group-lg">
                            <strong> Registrar Egreso </strong>
                            <span class="glyphicon glyphicon-floppy-saved"></span>
                        </button></td>
                    <th colspan="4"></th>
                </tr>
                            </tbody>
                            <% if(lista==null){%>
                            <span class="red">No existe Proveedor Seleccionado para el CHEQUE O TRANSACCION </span>
                    <%}%>
                    </table>
                </form>
                <h4><a href="otrosEgresosProveedor.jsp">
                        <strong> Seguir Agregando Una TRANSACCION O CHEQUE </strong>
                        <span class="glyphicon glyphicon-share-alt"></span></a></h4>
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
    <script src="js/carritoOtroEgresoPro.js"></script>
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
%>