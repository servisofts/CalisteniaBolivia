<%-- 
    Document   : tablajsp
    Created on : 28/11/2018, 10:18:07 PM
    Author     : pc
--%>

<%@page import="Modelo.ClienteBD"%>
<%@page import="Modelo.Cliente"%>
<%@page import="java.util.ArrayList"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%

   HttpSession sesionOK1=request.getSession();

if(sesionOK1.getAttribute("cargo")!=null){

}else
{
out.print("<script>location.replace('index.jsp');</script>");
}
%>
<!DOCTYPE html>
<html>    
                        <table id="datatable-responsive" class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" width="100%">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Apellido</th>
                          <th>C.I</th>
                          <th>Edad</th>
                          <th>Telefono</th>
                          <th>Correo</th>
                          <th>Sucursal</th>
                          <th>Foto</th>
                          <th>Modificar</th>
                        </tr>
                      </thead>
                      <tbody>
                          
                           <%
            
                            ArrayList<Cliente> lista= ClienteBD.mostrarCliente();

                            for(int i=0;i<lista.size();i++)
                            {
                                Cliente cl=lista.get(i);
                                        %>
                            <tr>
                               <td><%=cl.getNombre()%></td>
                        <td> <%=cl.getApellido()%></td>
                        <td> <%=cl.getCi()%></td>
                        <td> <%=cl.getEdad()%></td>
                        <td><a href="https://api.whatsapp.com/send?phone=591<%=cl.getTelefono()%>">
                                                    <%=cl.getTelefono()%></a></td>
                        <td> <%=cl.getCorreo()%></td>
                        <td> <%=cl.getNombreSucursal()%></td>
                        <td><img src="images/caliii.jpg" width="40" height="40"></td>
                        <td> <a href="modificarCliente.jsp?id=<%=cl.getIdCliente()%>" class="btn btn-warning">
                           <strong>Modificar</strong>
                           <span class="fa fa-refresh"></span>
                       </a>
                        </td>
                            </tr>
                                <%

                            }
                            %>
                      </tbody>
                    </table>

                        </html>
