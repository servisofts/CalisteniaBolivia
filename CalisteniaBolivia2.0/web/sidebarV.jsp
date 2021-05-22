<%-- 
    Document   : sidebarV
    Created on : 26/12/2018, 11:45:50 AM
    Author     : pc
--%>

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
   Integer idContrato=0;
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

<html>
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
            <%if(sesionOK.getAttribute("cargo").equals("Gerencia")||(sesionOK.getAttribute("cargo").equals("Administrador"))){%>
            <!-- sidebar menu -->
            <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
              <div class="menu_section">
                <h3><i class="red">Cargo: </i><% out.println(usu);%></h3>
                <h3><i class="red">Sucursal: </i><% out.println(sucu);%></h3>
                    <ul class="nav side-menu">
                    <li><a href="principal.jsp"><i class="fa fa-users"></i>Inicio </a>
                    </li>
                  
                    
                  <%
                    if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))||(sesionOK.getAttribute("cargo").equals("Gerencia"))){
                    %>
                    <li><a><i class="fa fa-shopping-cart"></i>Ingresos<span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                        <%
                    if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %>
                        <li><a href="calistenia.jsp"><i class="fa fa-shopping-cart"></i> Calistenia</a></li>
                        <li><a href="kickboxing.jsp"><i class="fa fa-shopping-cart"></i> Kick Boxing</a></li>
                        <li><a href="ingresoPersonal.jsp"><i class="fa fa-money"></i>Otros Ingreso</a></li>                       
                        <li><a href="modificarIngresos.jsp"><i class="fa fa-money"></i>Modificar Ingresos</a></li>
                       <%
                        }
                        %>
                        <%
                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %> 
                                <li><a href="eliminarIngreso.jsp"><i class="fa fa-money"></i>Eliminar Ingresos Caja Activa (Efectivo)</a></li>
                                <li><a href="eliminarIngresoTarjeta.jsp"><i class="fa fa-warning"></i>Eliminar Ingresos Caja Activa (Tarjeta)</a></li>
                            <%
                    }
                    %>
                            
                    </ul>
                           <%
                    }
                    %>
                    <%
                    if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))||(sesionOK.getAttribute("cargo").equals("Gerencia"))){
                    %>  
                    <li><a><i class="fa fa-warning"></i>Egresos<span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                              <%
                    if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %>  
                            <li><a href="egresoPersonal.jsp"><i class="fa fa-warning"></i>Personal</a></li>>
                            <li><a href="OtroEgreso.jsp"><i class="fa fa-warning"></i>Otro Egreso</a></li>
                            <%
                    }
                    %>                            
                            <%
                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %> 
                            <li><a href="modificarEgresos.jsp"><i class="fa fa-warning"></i>Modificar Egreso</a></li>
                            <%
                    }
                    %>
                                        <%
                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %> 
                            <li><a href="eliminarEgreso.jsp"><i class="fa fa-warning"></i>Eliminar Egreso Personal</a></li>        
                            <li><a href="eliminarOtroEgreso.jsp"><i class="fa fa-warning"></i>Eliminar Otros Egresos</a></li>
                                <li><a href="eliminarEgresoChequeTransPer.jsp"><i class="fa fa-warning"></i>Eliminar Cheques y Transacciones de Personal</a></li>
                                <li><a href="eliminarEgresoChequeTransPro.jsp"><i class="fa fa-warning"></i>Eliminar Cheques y Transacciones de Proveedor</a></li>
                            <%
                    }
                    %>
                    </ul>
                    
                            <%
                    }
                    %>
                    <%
                    if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))||(sesionOK.getAttribute("cargo").equals("Gerencia"))){
                    %>
                    <li><a href="cliente.jsp"><i class="fa fa-users"></i> Matricula </a>
                    </li>
                  <%
                    }
                    %>
                     <li><a><i class="fa fa-money"></i>Caja<span class="fa fa-chevron-down"></span></a>
                         <ul class="nav child_menu">
                    <li><a href="CrearCaja.jsp"><i class="fa fa-money"></i>Crear Nueva Caja</a></li>
                    <li><a href="CajaDia.jsp"><i class="fa fa-money"></i>Modificar Caja Abierta</a></li>
                         </ul>
                    <li><a><i class="fa fa-briefcase"></i>Administracion<span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                                                 
                  <%
                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %>
                    <li><a href="personal.jsp"><i class="fa fa-users"></i> Gestionar Personal </a>
                    </li>
                  <%
                        }
                        %>
                        
                  <%
                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %>
                    <li><a href="proveedor.jsp"><i class="fa fa-truck"></i> Gestionar Proveedor </a>
                    </li>
                  <%
                        }
                        %>
                    <%
                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %>
                    <li><a href="login.jsp"><i class="fa fa-user"></i> Gestionar Login</a>
                    </li>
                        <%
                        }
                        %>
                        <%
                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %>
                    <li><a href="cargo.jsp"><i class="fa fa-briefcase"></i> Gestionar Cargo</a>
                    </li>
                        <%
                        }
                        %>
                        <%
                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %>
                    <li><a href="sucursal.jsp"><i class="fa fa-home"></i> Gestionar Sucursal</a>
                    </li>
                        <%
                        }
                        %>
                    </ul>
                        <%
                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %>
                    <li><a><i class="fa fa-money"></i>Paquetes<span class="fa fa-chevron-down"></span></a>
                        <ul class="nav child_menu">
                            <%
                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %>
                            <li><a href="precio.jsp"><i class="fa fa-money"></i>Paquete Cali</a></li>
                            <%
                        }
                        %>
                            <%
                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %>
                            <li><a href="precioBoxeo.jsp"><i class="fa fa-money"></i>Paquete Boxeo</a></li>
                            <%
                        }
                        %>
                
                        </ul>                   
                    <%
                        }
                        %>
                    <li><a><i class="fa fa-bar-chart-o"></i>Reportes <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                    <%
                    if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %>
                      <li><a href="estadoDiario.jsp"><i class="fa fa-desktop"></i>Estado Diario</a></li>
                        <%
                        }
                        %>
                    <%
                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %>
                    <li><a href="estadoMensual.jsp"><i class="fa fa-desktop"></i>Caja Mensual</a></li>
                    <li><a href="ingresoEfectivoMensual.jsp"><i class="fa fa-desktop"></i>Ingresos Efectivo</a></li>
                    <li><a href="ingresoTarjetaMensual.jsp"><i class="fa fa-desktop"></i>Ingresos Tarjetas</a></li>
                    <li><a href="egresoMensual.jsp"><i class="fa fa-desktop"></i>Egresos</a></li>
                    <li><a href="otrosEgresoMensual.jsp"><i class="fa fa-desktop"></i>Otros Egresos</a></li>
                    <li><a href="Indicadores.jsp"><i class="fa fa-desktop"></i>Indicadores</a></li>
                        <%
                        }
                        %>
                    </ul>
                    <%
                    if((sesionOK.getAttribute("cargo").equals("Gerencia"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %>  
                    <li><a><i class="fa fa-warning"></i>Bitacora<span class="fa fa-chevron-down"></span></a>
                        <ul class="nav child_menu">
                            <li><a href="vitacoraIngreso.jsp"><i class="fa fa-warning"></i>Ingreso</a></li>
                        </ul>
                    <%
                    }
                    %>    
                </ul>
              </div>
            </div>
                <% }else{ %>
                <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
              <div class="menu_section">
                <h3><i class="green">Cargo: </i><% out.println(usu);%></h3>
                <h3><i class="green">Sucursal: </i><% out.println(sucu);%></h3>
                    <ul class="nav side-menu">
                    <li><a href="principal.jsp"><i class="fa fa-users"></i>Inicio </a>
                    </li>
                  <%
                    if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))) {
                    %>
                    <li><a href="CrearCaja.jsp"><i class="fa fa-money"></i>Crear Nueva Caja</a></li>
                    <%
                        }
                        %>
                    <%
                    if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))||(sesionOK.getAttribute("cargo").equals("Gerencia"))){
                    %>
                    <li><a href="cliente.jsp"><i class="fa fa-users"></i> Matricula </a>
                    </li>
                  <%
                    }
                    %>      
                  <%
                    if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))||(sesionOK.getAttribute("cargo").equals("Gerencia"))){
                    %>
                    <li><a><i class="fa fa-shopping-cart"></i>Ingresos<span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                        <%
                    if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %>
                        <li><a href="calistenia.jsp"><i class="fa fa-shopping-cart"></i> Calistenia</a></li>
                        <li><a href="kickboxing.jsp"><i class="fa fa-shopping-cart"></i> Kick Boxing</a></li>
                        <li><a href="ingresoPersonal.jsp"><i class="fa fa-money"></i>Otros Ingreso</a></li>
                       <%
                        }
                        %>
                            
                    </ul>
                           <%
                    }
                    %>
                    <%
                    if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))||(sesionOK.getAttribute("cargo").equals("Gerencia"))){
                    %>  
                    <li><a><i class="fa fa-warning"></i>Egresos<span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                              <%
                    if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %>  
                            <li><a href="egresoPersonal.jsp"><i class="fa fa-warning"></i>Personal</a></li>
                            <li><a href="cuentasXPagar.jsp"><i class="fa fa-warning"></i>Cuentas Por Pagar</a></li>
                            <li><a href="OtroEgreso.jsp"><i class="fa fa-warning"></i>Otro Egreso</a></li>
                            <%
                    }
                    %>                          
                            <%
                    if((sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %> 
                            <li><a href="otrosEgresos.jsp"><i class="fa fa-warning"></i>Cheques y Transacciones de Personal</a></li>
                            <li><a href="otrosEgresosProveedor.jsp"><i class="fa fa-warning"></i>Cheques y Transacciones de Proveedor</a></li>
                            <%
                    }
                    %>                                     
                    </ul>                   
                            <%
                    }
                    %>     
                        <%
                    if((sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %> 
                    <li><a><i class="fa fa-money"></i>Paquetes<span class="fa fa-chevron-down"></span></a>
                        <ul class="nav child_menu">
                            <li><a href="precio.jsp"><i class="fa fa-money"></i>Paquete Cali</a></li>
                            <li><a href="precioBoxeo.jsp"><i class="fa fa-money"></i>Paquete Boxeo</a></li>                
                        </ul>
                           <%
                    }
                    %>     
                    <li><a><i class="fa fa-bar-chart-o"></i>Reportes <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                    <%
                    if((sesionOK.getAttribute("cargo").equals("Ventas"))||(sesionOK.getAttribute("cargo").equals("Administrador"))){
                    %>
                      <li><a href="estadoDiario.jsp"><i class="fa fa-desktop"></i>Estado Diario</a></li>
                        <%
                        }
                        %>                  
                    </ul>                  
                </ul>
              </div>
            </div>
                <% } %>
</html>
