<%@page import="java.text.DecimalFormat"%>
<%@page import="java.time.LocalDate"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.sql.Date"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="Modelo.*"%>
<%@page session="true"%>
<%

   DecimalFormat formatea = new DecimalFormat("###,##0.00");
   HttpSession sesionOK1=request.getSession();
   
if(sesionOK1.getAttribute("cargo")!=null){

    //Ingreso ic= IngresoBD.mostrarTotalIngresoDiarioCali((Integer)sesionOK.getAttribute("idContrato"));
    //Ingreso icp= IngresoBD.mostrarTotalIngresoPersonal((Integer)sesionOK.getAttribute("idContrato"));
    //EgresoPersonal ep = EgresoPersonalBD.mostrarTotalEgresoPersonal((Integer)sesionOK.getAttribute("idContrato"));
    //CuentaXPagar cxp = CuentaXPagarBD.mostrarTotalCXP((Integer)sesionOK.getAttribute("idContrato"));
    //Caja ca = CajaBD.mostrarTotalCajaPersonal((Integer)sesionOK.getAttribute("idContrato"));
    //Caja l = CajaBD.mostrarCajaActiva((Integer)sesionOK.getAttribute("idContrato"));7}else
}else
{
out.print("<script>location.replace('index.jsp');</script>");
}
%>
<!DOCTYPE html>
                    <%
                    if((sesionOK1.getAttribute("cargo").equals("Gerencia"))||(sesionOK1.getAttribute("cargo").equals("Administrador"))){
                    %>
                    <%
     Date fechaini=Date.valueOf(request.getParameter("fechainicio"));
    Date fechafin=Date.valueOf(request.getParameter("fechafin"));
    Integer idSucursal=Integer.valueOf(request.getParameter("txbPerspnalL"));
    System.out.println(idSucursal);
    //Integer idContrato2=Integer.valueOf(request.getParameter("txbPerspnalL"));
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
                     <!-- sidebar menu -->
                    <%@include file="sidebar.jsp" %>
                    <!-- /sidebar menu -->
                    <!-- menu profile quick info -->
                    <!-- /menu profile quick info -->
                    <br />
                   
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
                    <h2>Estado Monto Mensual</h2>
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
            <div class="agile-title">
                <h3>Calistenia Bolivia </h3>
                <%
                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    String s= SucursalBD.mostrarSucursal(idSucursal);
                    %>
                    <H2>Sucursal:<label class="blue"><%=s%></H2>
                    <%
                        }
                        %>
            </div>
            <div class="container">
            <div class="table-responsive">
                <div class="agile-title"  >
                    
                </div>
                <div class="agile-title"  >
                    <H2>Monto Mensual Calistenia entre la Fecha <label class="red"><% out.println(fechaini);%></label> y Fecha <label class="red"><% out.println(fechafin);%></label> </H2> 
                </div>
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                        <th></th>
                        <th>Total :</th>
                        <th>Total :</th>
                        <th>Total :</th>
                        <th>Total :</th>
                        <th>Total :</th>
                        <th>Total :</th>
                        <th>Total :</th>
                        <th>Total :</th>
                        <th>Total :</th>
                        <th>Total :</th>
                        <th>Total :</th>
                        </tr>
                        <%
            
                            ArrayList<TotalMonto> lista2= 
                                    TotalMontoBD.mostrarTotalMonto3(idSucursal, fechaini, fechafin);
                            double giecT = 0;
                            double giebT = 0;
                            double gitcT = 0;
                            double gitbT = 0;
                            double goiT = 0;
                            double geT = 0;
                            double gecxcT = 0;
                            double gctperT = 0;
                            double gctproT = 0;
                            double goeT = 0;
                            //double gtcT = 0;

                            for(int i=0;i<lista2.size();i++)
                            {
                                TotalMonto in=lista2.get(i);
                                giecT  = giecT + in.getIngresoEfeCali();
                                giebT = giebT + in.getIngresoEfeBox();
                                gitcT = gitcT + in.getIngresoTarCali();
                                gitbT = gitbT + in.getIngresoTarBox();
                                goiT = goiT + in.getOtroIngreso();
                                geT = geT + in.getEgreso();
                                gecxcT = gecxcT + in.getEgresoCXC();
                                gctperT = gctperT + in.getChequeTransPer();
                                gctproT = gctproT + in.getChequeTransPro();
                                goeT = goeT + in.getOtrosEgresos();
                                //gtcT = gtcT + in.getTotalCaja();
                                //double gtc = giec + gieb + gitc + gitb + goi - ge - gecxc - gctper - gctpro - goe;
                            }
                            double gtcT = giecT + giebT + gitcT + gitbT + goiT - geT - gecxcT - gctperT - gctproT - goeT;
                                        %>
                        <%
                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                        ArrayList<Integer> ar = SucursalBD.getPersonalSuc3(idSucursal);
                        System.out.println(ar.get(0));
                        double iec = 0;
                        double ieb = 0;
                        double itc = 0;
                        double itb = 0;
                        double oi = 0;
                        double e = 0;
                        double ecxc = 0;
                        double ctpe = 0;
                        double ctpr = 0;
                        double oe = 0;
                        double tc = 0;
                        for(int ii=0;ii<ar.size();ii++){
                                    int idContrato2=ar.get(ii);
                                    TotalMonto icp= TotalMontoBD.mostrarTotalMonto2(idContrato2, fechaini, fechafin);
                                    iec = iec + icp.getIngresoEfeCali();
                                    ieb = ieb + icp.getIngresoEfeBox();
                                    itc = itc + icp.getIngresoTarCali();
                                    itb = itb + icp.getIngresoTarBox();
                                    oi = oi + icp.getOtroIngreso();
                                    e = e + icp.getEgreso();
                                    ecxc = ecxc + icp.getEgresoCXC();
                                    ctpe = ctpe + icp.getChequeTransPer();
                                    ctpr = ctpr + icp.getChequeTransPro();
                                    oe = oe + icp.getOtrosEgresos();
                                   // tc = tc + icp.getTotalCaja();
                        }
                        tc = iec + ieb + itc + itb + oi - e -ecxc - ctpe - ctpr - oe;
                    %>
                            <tr>
                                <td></td>
                                <td style="text-align:right" class="green"><%=formatea.format(Math.round(giecT * 100d) / 100d)%></td>
                                <td style="text-align:right" class="green"><%=formatea.format(Math.round(giebT * 100d) / 100d)%></td>
                                <td style="text-align:right"><%=formatea.format(Math.round(gitcT * 100d) / 100d)%></td>
                                <td style="text-align:right"><%=formatea.format(Math.round(gitbT * 100d) / 100d)%></td>
                                <td style="text-align:right" class="green"><%=formatea.format(Math.round(goiT * 100d) / 100d)%></td>
                                <td style="text-align:right" class="red"><%=formatea.format(Math.round(geT * 100d) / 100d)%></td>
                                <td style="text-align:right" class="red"><%=formatea.format(Math.round(gecxcT * 100d) / 100d)%></td>
                                <td style="text-align:right"><%=formatea.format(Math.round(gctperT * 100d) / 100d)%></td>
                                <td style="text-align:right"><%=formatea.format(Math.round(gctproT * 100d) / 100d)%></td>
                                <td style="text-align:right" class="red"><%=formatea.format(Math.round(goeT * 100d) / 100d)%></td>
                                <td style="text-align:right"><code><%=formatea.format(Math.round(gtcT * 100d) / 100d)%></code></td>
                            </tr>
                            <%
                        }
                        %>
                        <tr>
                        <th style="align:right">Fecha</th>
                        <th style="align:right">Ingreso Efectivo Calistenia</th>
                        <th>Ingreso Efectivo Boxeo</th>
                        <th>Ingreso Tarjeta Calistenia - ACH</th>
                        <th>Ingreso Tarjeta Boxeo - ACH</th>
                        <th>Otros Ingresos</th>
                        <th>Egreso</th>
                        <th>Egreso Cuentas X Pagar</th>
                        <th>Cheque Y Tranferencia Personal</th>
                        <th>Cheque y Tranferencia Proveedor</th>
                        <th>Otros Egresos</th>
                        <th>Total de Caja</th>
                        </tr>
                        </thead>
                        <tbody>
                            
                            <%
            
                            ArrayList<TotalMonto> lista= 
                                    TotalMontoBD.mostrarTotalMonto3(idSucursal, fechaini, fechafin);

                            for(int i=0;i<lista.size();i++)
                            {
                                TotalMonto in=lista.get(i);
                                double giec  = in.getIngresoEfeCali();
                                double gieb = in.getIngresoEfeBox();
                                double gitc = in.getIngresoTarCali();
                                double gitb = in.getIngresoTarBox();
                                double goi = in.getOtroIngreso();
                                double ge = in.getEgreso();
                                double gecxc = in.getEgresoCXC();
                                double gctper = in.getChequeTransPer();
                                double gctpro = in.getChequeTransPro();
                                double goe = in.getOtrosEgresos();
                                double gtc = in.getTotalCaja();
                                //double gtc = giec + gieb + gitc + gitb + goi - ge - gecxc - gctper - gctpro - goe;
                                        %>
                                        
                            <tr>
                                <td><%=in.getFecha()%> </td>
                                <td style="text-align:right" class="green"><%=formatea.format(Math.round( giec * 100d) / 100d)%></td>
                                <td style="text-align:right" class="green"><%=formatea.format(Math.round( gieb * 100d) / 100d)%></td>
                                <td style="text-align:right"><%=formatea.format(Math.round( gitc * 100d) / 100d)%></td>
                                <td style="text-align:right"><%=formatea.format(Math.round( gitb * 100d) / 100d)%></td>
                                <td style="text-align:right"><%=formatea.format(Math.round( goi * 100d) / 100d)%></td>
                                <td style="text-align:right" class="red"><%=formatea.format(Math.round( ge * 100d) / 100d)%></td>
                                <td style="text-align:right" class="red"><%=formatea.format(Math.round( gecxc * 100d) / 100d)%></td>
                                <td style="text-align:right"><%=formatea.format(Math.round( gctper * 100d) / 100d)%></td>
                                <td style="text-align:right"><%=formatea.format(Math.round( gctpro * 100d) / 100d)%></td>
                                <td style="text-align:right"><%=formatea.format(Math.round( goe * 100d) / 100d)%></td>
                                <td style="text-align:right"><code><%=formatea.format(Math.round( gtc * 100d) / 100d)%></code></td>
                            </tr>
                                <%

                            }
                            %>
                        </tbody>
                    </table>
<!-- -------------------------------------------------------------------------------------------------------------------------------------------------  -->                        
            <div class="agile-title"  >
                    <H2>Membresias registradas entre la Fecha <label class="red"><% out.println(fechaini);%></label> y Fecha <label class="red"><% out.println(fechafin);%></label> </H2> 
                </div>
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                        <th></th>
                        <th>Total :</th>
                        <th>Total :</th>
                        <th>Total :</th>
                        <th>Total :</th>
                        <th>Total :</th>
                        <th>Total :</th>
                        </tr>
                        <%
                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %>
                            <tr>
                                <td></td>
                                <td class="green"><%=ClienteBD.regCaliTN(fechaini,fechafin)%></td>
                                <td class="green"><%=ClienteBD.regBoxTN(fechaini,fechafin)%></td>
                                <td class="green"><%=ClienteBD.regCaliTN(fechaini,fechafin)+ClienteBD.regBoxTN(fechaini,fechafin)%></td>
                                <td class="green"><%=ClienteBD.regCaliTS(fechaini,fechafin)%></td>
                                <td class="green"><%=ClienteBD.regBoxTS(fechaini,fechafin)%></td>
                                <td class="green"><%=ClienteBD.regCaliTS(fechaini,fechafin)+ClienteBD.regBoxTS(fechaini,fechafin)%></td>
                            </tr>
                            <%
                        }
                        %>
                        <tr>
                        <th>Fecha</th>
                        <th>Calistenia (Norte)</th>
                        <th>Boxeo (Norte)</th>
                        <th>Total (Norte)</th>
                        <th>Calistenia (Sur)</th>
                        <th>Boxeo (Sur)</th>
                        <th>Total (Sur)</th>
                        </tr>
                        </thead>
                        <tbody>
                            
                            <%
            
                            //lista= 
                            //        TotalMontoBD.mostrarTotalMonto(idContrato2, fechaini, fechafin);

                            int fi = fechaini.getDate();
                            int ff = fechafin.getDate();
                            System.out.println(fi);   
                            for(int i=fi;i<=ff;i++)
                            //for(int i=0;i<lista.size();i++)
                            //for(Date i=fechaini;i.compareTo(fechafin);fechaini.plusDays(1))
                            {
                                //TotalMonto in=lista.get(i);
                                int m= fechaini.getMonth()+1;
                                int y = fechaini.getYear()+1900;
                                String f = y+"-"+m+"-"+i;
                             
                                        %>
                                        
                            <tr>
                                <% //String ini = in.getFecha();
                                    String ini = f;
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            java.util.Date date = sdf.parse(ini);
            java.sql.Date inicio = new java.sql.Date(date.getTime()); %>

                                <td><%=f%> </td>
                                <td class="green"><%=ClienteBD.regCaliN(inicio)%></td>
                                <td class="green"><%=ClienteBD.regBoxN(inicio)%></td>
                                <td><%=ClienteBD.regCaliN(inicio)+ClienteBD.regBoxN(inicio)%></td>
                                <td class="green"><%=ClienteBD.regCaliS(inicio)%></td>
                                <td class="green"><%=ClienteBD.regBoxS(inicio)%></td>
                                <td><%=ClienteBD.regCaliS(inicio)+ClienteBD.regBoxS(inicio)%></td>
                            </tr>
                                <%

                            }
                            %>
                        </tbody>
                    </table>
<!-- -------------------------------------------------------------------------------------------------------------------------------------------------  -->                        
            </div>
        </div>
                        <div class="container">
            <div class="table-responsive">
                <div class="ln_solid"></div>   
            </div>
        </div>
	</div>
        <div class="col-md-6 ">
                    <button onclick="printContent('div1')" class="btn btn-warning btn-lg">
                    <strong> Imprimir </strong>
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