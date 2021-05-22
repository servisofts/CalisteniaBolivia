/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;

import Modelo.Cliente;
import Modelo.ClienteBD;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

/**
 *
 * @author Hector
 */
@WebServlet(name = "ServletTablaPrincipal", urlPatterns = {"/ServletTablaPrincipal"})
public class ServletTablaPrincipal extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet ServletTablaPrincipal</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ServletTablaPrincipal at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType( "text/html; charset=iso-8859-1" );
		PrintWriter out = response.getWriter();
        
        try {
            String nom = request.getParameter("nom");

            ArrayList<Cliente> lista = ClienteBD.mostrarClienteActivo();
            ArrayList<ArrayList> ll = new ArrayList();

            for (int i = 0; i < lista.size(); i++) {
                ArrayList l = new ArrayList();
                Cliente cl = lista.get(i);
                String nombre = cl.getNombre();
                String apellido = cl.getApellido();
                int ci = cl.getCi();
                String edad = cl.getEdad();
                String telefono = cl.getTelefono();
                Date inicio = cl.getFechaInicio();
                Date fin = cl.getFechaFin();
                String nombreCat = cl.getNombrecategoria();
                String nombrePaq = cl.getNombrePaquete();
                double prec = cl.getPrecioPaquete();
                nombrePaq = nombrePaq+"--"+prec+" Bs";
                int id = cl.getIdCliente();
                String html="<td> <a href="+"'#"+id+"' class="+"btn btn-info"+" data-toggle="+"modal"+">"+
                                        "<strong> Modificar </strong>"+
                                        "<span class="+"glyphicon glyphicon-refresh"+"></span>"+
                                    "</a>"+
                        "<div class="+"'modal fade'"+" id='"+cl.getIdCliente()+"'>"+
                                        "<div class="+"'modal-dialog'"+">"+
                                            "<div class="+"'modal-content'"+">"+
                                                "<div class="+"'modal-header'"+">"+
                                                    "<button style="+"'button'"+" class="+"'close'"+" data-dismiss="+"'modal'"+">"+
                                                        "<span>&times;</span>"+
                                                    "</button>"+
                                                    "<div class="+"'agile-title'"+">"+
                                                        "<h3 class="+"'modal-title'"+"><strong>Modificar Cliente</strong></h3> "+
                                                    "</div>"+
                                                        "<div class="+"'container'"+">"+
                                                            "<div class="+"'form-horizontal'"+">"+                                           
                                                                "<div class="+"'form-group'"+">"+
                                                                    "<form id="+"'demo-form2'"+" data-parsley-validate class="+"'form-horizontal form-label-left'"+" action="+"'ServletControlador'"+" method="+"'post'"+"  onsubmit="+"'return enviado()'"+">"+
                                                                        "<div class="+"'form-group'"+" >"+
                                            "<label class="+"'control-label col-md-3 col-sm-3 col-xs-12'"+" for="+"'first-name'"+">"+
                                          "</label>"+
                                            "<div class="+"'col-md-6 col-sm-6 col-xs-12'"+">"+
                                                "<input type="+"'text'"+" id="+"'first-name'"+" name="+"'txbIdContratocl'"+" required="+"'required'"+" class="+"'form-control col-md-7 col-xs-12'"+" value='"+cl.getContratoMembresia()+"' style="+" 'visibility: hidden'"+">"+
                                          "</div>"+
                                          "<div class="+"'col-md-6 col-sm-6 col-xs-12'"+">"+
                                              "<input type="+"'text'"+" id="+"'first-name'"+" name="+"'txbNombrePer'"+" required="+"'required'"+" class="+"'form-control col-md-7 col-xs-12'"+" value='"+nom+"' style="+" 'visibility: hidden'"+">"+
                                          "</div>"+
                                        "</div>"+
                                                                        "<div class="+"'ln_solid'"+"></div>"+
                                                                        "<div class="+"'form-group'"+">"+
                                          "<label class="+"'control-label col-md-3 col-sm-3 col-xs-12'"+" for="+"'last-name'"+">Nombre <span class="+"'required'"+">*</span>"+
                                          "</label>"+
                                          "<div class="+"'col-md-6 col-sm-6 col-xs-12'"+">"+
                                              "<input type="+"'text'"+" id="+"'last-name'"+" name="+"'txbNombrecl'"+" required="+"'required'"+" class="+"'form-control col-md-7 col-xs-12'"+" value='"+cl.getNombre()+"' readonly=''>"+
                                          "</div>"+
                                        "</div>"+
                                        "<div class="+"'form-group'"+">"+
                                          "<label class="+"'control-label col-md-3 col-sm-3 col-xs-12'"+" for="+"'last-name'"+">Apellido <span class="+"'required'"+">*</span>"+
                                          "</label>"+
                                          "<div class="+"'col-md-6 col-sm-6 col-xs-12'"+">"+
                                              "<input type="+"'text'"+" id="+"'last-name'"+" name="+"'txbApellidocl'"+" required="+"'required'"+" class="+"'form-control col-md-7 col-xs-12'"+" value='"+cl.getApellido()+"' readonly=''>"+
                                          "</div>"+
                                        "</div>"+
                                                                        "<div class="+"'ln_solid'"+"></div>"+
                                                                        "<div class="+"'form-group'"+">"+
                                          "<label class="+"'control-label col-md-3 col-sm-3 col-xs-12'"+" for="+"'last-name'"+">Fecha Inicio <span class="+"'required'"+">*</span>"+
                                          "</label>"+
                                          "<div class="+"'col-md-6 col-sm-6 col-xs-12'"+">"+
                                              "<input type="+"'text'"+" id="+"'last-name'"+" name="+"'txbFechaIni'"+" required="+"'required'"+" class="+"'form-control col-md-7 col-xs-12'"+" value='"+cl.getFechaInicio()+"' readonly=''>"+
                                          "</div>"+
                                        "</div>"+
                                                                        "<div class="+"'form-group'"+">"+
                                          "<label class="+"'control-label col-md-3 col-sm-3 col-xs-12'"+" for="+"'last-name'"+">Fecha Fin <span class="+"'required'"+">*</span>"+
                                          "</label>"+
                                          "<div class="+"'col-md-6 col-sm-6 col-xs-12'"+">"+
                                              "<input type="+"'date'"+" id="+"'last-name'"+" name="+"'txbFechaFin'"+" required="+"'required'"+" class="+"'form-control col-md-7 col-xs-12'"+" value='"+cl.getFechaFin()+"'>"+
                                          "</div>"+
                                        "</div> "+
                                                                        "<div class="+"'form-group'"+">"+
                                          "<label class="+"'control-label col-md-3 col-sm-3 col-xs-12'"+" for="+"'last-name'"+">Motivo <span class="+"'required'"+">*</span>"+
                                          "</label>"+
                                          "<div class="+"'col-md-6 col-sm-6 col-xs-12'"+">"+
                                              "<select class="+"'form-control'"+" name="+"'txbObservacion'"+">"+
                                                  "<option value="+"'Baja Medica'"+">Baja Medica</option>"+
                                                  "<option value="+"'Viaje De Trabajo'"+">Viaje De Trabajo</option>"+
                                                  "<option value="+"'Viaje Deportivo'"+">Viaje Deportivo</option>"+
                                                  "<option value="+"'Otros'"+">Otros</option>"+
                                              "</select>"+
                                          "</div>"+
                                        "</div>  "+
                                                                        "<div class="+"'ln_solid'"+"></div>"+
                                                                        "<div class="+"'form-group'"+">"+
                                          "<div class="+"'col-md-6 col-sm-6 col-xs-12 col-md-offset-3'"+">"+
                                            "<button type="+"'submit'"+" class="+"'btn btn-info'"+" name="+"'btnModificar'"+" >"+
                                                                     "<strong> Modificar </strong>"+
                                                                     "<input type="+"'hidden'"+" name="+"'accion'"+" value="+"'ModificarFechaContrato'"+"/>"+
                                              "<span class="+"'glyphicon glyphicon-refresh'"+"></span>"+
                                                                 "</button>"+
                                                                 
                                          "</div>"+
                                        "</div>"+
                                                                    "</form>"+
                                                                "</div>     "+
                                                            "</div> "+
                                                        "</div>  "+

                                                "</div>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>";
                l.add(nombre);
                l.add(apellido);
                l.add(edad);
                l.add(ci);
                l.add(telefono);
                l.add(inicio);
                l.add(fin);
                l.add(nombreCat);
                l.add(nombrePaq);
                l.add(html);
                ll.add(l);
            }
                 //out.print(n);
                 String json = new Gson().toJson(ll); // anyObject = List<Bean>, Map<K, Bean>, Bean, String, etc..
                 response.setContentType("application/json"); 
                 response.getWriter().write(json);          

        } catch (Exception e) {
            out.println("An exception occurred: " + e.getMessage());
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
