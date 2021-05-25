<%-- 
    Document   : options
    Created on : 10/12/2018, 11:02:31 AM
    Author     : pc
--%>

<%@page import="Modelo.CajaBD"%>
<%@page import="Modelo.Caja"%>
<%@page import="Modelo.Caja"%>
<%@page import="Modelo.ClienteBD"%>
<%@page import="Modelo.Cliente"%>
<%@page import="java.util.ArrayList"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<% HttpSession sesionOK2=request.getSession(); %>
<html>
    <div class="row tile_count">
                    <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-6">
                        <div class="tile-stats">
                            <div class="icon"><i class="fa fa-users"></i>
                            </div>
                                <%
                                    ArrayList<Cliente> listac1= ClienteBD.mostrarCantidadClientes();
                                    for(Cliente cl1:listac1)
                                    {
                                %>
                                <div class="count"><%=cl1.getIdCliente()%></div>
                                <%
                                    }
                                %>
                                <h3>Clientes</h3>
                                <p>Total de Clientes Registrados en la Base de Datos</p>
                        </div>
                    </div>
                    <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-6">
                        <div class="tile-stats">
                            <div class="icon"><i class="fa fa-users red"></i>
                            </div>
                                <%
                                    ArrayList<Cliente> listacc1= ClienteBD.mostrarCantidadContratoActivos();
                                    for(Cliente cl1:listacc1)
                                    {
                                %>
                                <div class="count"><%=cl1.getIdCliente()%></div>
                                <%
                                    }
                                %>
                                <h3>Activos Calistenia</h3>
                                <p class="blue">Total de Clientes Calistenia con Fechas Activas</p>
                        </div>
                    </div>
                    <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-6">
                        <div class="tile-stats">
                            <div class="icon"><i class="fa fa-users blue"></i>
                            </div>
                                <%
                                    ArrayList<Cliente> listacc21= ClienteBD.mostrarCantidadContratoActivosBoxeo();
                                    for(Cliente cl1:listacc21)
                                    {
                                %>
                                <div class="count"><%=cl1.getIdCliente()%></div>
                                <%
                                    }
                                %>
                                <h3>Activos Boxeo</h3>
                                <p class="blue">Total de Clientes Boxeo con Fechas Activas</p>
                        </div>
                    </div> 
                    <!-- <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div class="tile-stats">
                        <div class="icon"><i class="fa fa-users green"></i>
                        </div>
                        <%
                            ArrayList<Cliente>listaccc1= ClienteBD.mostrarClienteVencimiento();
                            for(Cliente cl1:listaccc1)
                            {
                        %>
                        <div id="CC" class="count"><%=cl1.getIdCliente()%></div>
                        <%
                            }
                        %>
                            <h3>Vencimiento</h3>
                            <p class="blue">Total de Clientes con fecha de vencimiento de membresia en este mes</p>
                    </div>
                </div> -->
                    <%
                    if((sesionOK2.getAttribute("cargo").equals("Ventas"))||(sesionOK2.getAttribute("cargo").equals("Administrador"))) {
                    Caja l2 = CajaBD.mostrarCajaActiva((Integer)sesionOK2.getAttribute("idContrato"));
                    if(l2!=null){
                %>
                <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-6">
                    <div class="tile-stats">
                        <div class="icon"><i class="fa fa-money green"></i>
                        </div>
                        <%
                            float total=0;
                            ArrayList<Caja> listaca1= CajaBD.mostrarTotalCajaPersonal1((Integer)sesionOK2.getAttribute("idContrato"));
                            for(Caja ca1:listaca1)
                            {
                            total=ca1.getSaldoCaja();
                        %>
                        <div class="count"><%=total%>Bs</div>
                            <h3>Total Caja</h3>
                            <p class="blue">Monto Expresado en Bolivianos</p>
                        <%
                            }
                        %>
                          
                    </div>
                </div>
                <%}else{%>
                <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-6">
                    <div class="tile-stats">
                        <div class="icon"><i class="fa fa-money green"></i>
                        </div>     
                        <div class="count">Abra Caja</div>
                    </div>
                </div>
                <%
                    }}
                %>
            </div>  
</html>
