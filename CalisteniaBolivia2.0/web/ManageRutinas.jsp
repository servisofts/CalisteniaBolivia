<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="Modelo.*"%>
<%@page session="true"%>
<%
   String usu="";
   String nom="";
   String sucu="";
   String idper="";
   Integer idsucu=0;
   String imagen="";
   HttpSession sesionOK=request.getSession();

if(sesionOK.getAttribute("cargo")!=null){
    nom=(String)sesionOK.getAttribute("nom")+" "+(String)sesionOK.getAttribute("apell");
    usu=(String)sesionOK.getAttribute("cargo");
    sucu=(String)sesionOK.getAttribute("sucur");
    idper=(String)sesionOK.getAttribute("idper");
    idsucu=(Integer)sesionOK.getAttribute("idsucu");
    imagen=(String)sesionOK.getAttribute("imagen");
}
else
{
out.print("<script>location.replace('index.jsp');</script>");
}
%>
<!DOCTYPE html>
                    <%
                    if(sesionOK.getAttribute("cargo")!=null){
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
    <style>
    .options-rutinas {

        font-size: 12px;
        color: #E7E7E7;
        font-weight: 500;
        margin-bottom: 6px;
        position: relative;
        display: block;
        padding: 13px 15px 12px;
    }

    #frame {

        height: 100vh;
        border: none;
        width: 100%;

    }



    </style>
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
                    <div class="profile">
                        <div class="profile_pic">
                            <img src="images/caliii.jpg" alt="..." class="img-circle profile_img">
                        </div>
                        <div class="profile_info">
                            <span><i class="red">Bienvenido</i></span>
                            <h2><% out.println(nom);%></h2><br>
                        </div>
                    </div>
                    <!-- /menu profile quick info -->
                    <br />
                    <!-- sidebar menu -->
                    <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
                      <div class="menu_section">
                        <h3><i class="red">Cargo: </i><% out.println(usu);%></h3>
                        <h3><i class="red">Sucursal: </i><% out.println(sucu);%></h3>
                            <ul class="nav side-menu">
                            <li><a href="principal.jsp"><i class="fa fa-users"></i>Volver a Inicio </a>
                            </li>
                          <%
                          if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))||(sesionOK.getAttribute("cargo").equals("Gerencia"))){
                          %>
                            <li class="options-rutinas" id="confPrincipalRutinas"><i class="fa fa-trophy"></i>Manejar Rutinas </li>
                            <%
                            }
                            %>
                            <%
                              if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))||(sesionOK.getAttribute("cargo").equals("Gerencia"))){
                              %>
                                <li class="options-rutinas" id="buscadorAsis"><i class="fa fa-calendar-check-o"></i>Buscador de Asistencia </li>
                                <%
                                }
                                %>
                        <%
                          if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))||(sesionOK.getAttribute("cargo").equals("Gerencia"))){
                          %>
                            <li class="options-rutinas" id="asignRut"><i class="fa fa-check-square-o"></i>Asignar Rutinas a Sucursal </li>
                            <%
                            }
                            %>
                        </ul>
                      </div>
                    </div>
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

          <br />

          <div id="iframeLoader">
                <iframe frameborder="0" id="frame" src="">
                </iframe>
          </div>

        </div>
        <!-- /page content -->

        <!-- footer content -->
        <footer>
          <div class="pull-right">
            Calistenia Bolivia
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
             $("#frame").attr("src", "http://rutinas.calisteniaboliviasc.com/newRutinas.php");

             $('#confPrincipalRutinas').click(function(){
                 $("#frame").attr("src", "http://rutinas.calisteniaboliviasc.com/newRutinas.php");
             });

             $('#buscadorAsis').click(function(){
              $("#frame").attr("src", "http://rutinas.calisteniaboliviasc.com/buscadorAsistencia.php");
            });


             $('#asignRut').click(function(){
                $("#frame").attr("src", "http://rutinas.calisteniaboliviasc.com/asignarRutinas.php");
             });


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
