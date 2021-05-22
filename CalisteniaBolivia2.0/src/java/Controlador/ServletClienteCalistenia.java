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

/**
 *
 * @author pc
 */
@WebServlet(name = "ServletClienteCalistenia", urlPatterns = {"/ServletClienteCalistenia"})
public class ServletClienteCalistenia extends HttpServlet {

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
            out.println("<title>Servlet ServletClienteCalistenia</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ServletClienteCalistenia at " + request.getContextPath() + "</h1>");
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
            ArrayList<Cliente> lista = ClienteBD.mostrarCliente();
            ArrayList<ArrayList> ll = new ArrayList();

            for (int i = 0; i < lista.size(); i++) {
                ArrayList l = new ArrayList();
                Cliente cl = lista.get(i);
                String nombre = cl.getNombre();
                String apellido = cl.getApellido();
                int ci = cl.getCi();
                String edad = cl.getEdad();
                String telefono = cl.getTelefono();
                String correo = cl.getCorreo();
                String sucursal = cl.getNombreSucursal();
                String imagen ="<img align='bottom' height='52' width='60' src='images/"+cl.getImagen() +"'>";
                int id = cl.getIdCliente();
                String html="<td> <a href="+"calistenia1.jsp?id="+id+" class="+"btn btn-warning"+">"+
                           "<strong>Añadir</strong>"+
                           "<span class=fa fa-refresh"+"></span>";
                l.add(nombre);
                l.add(apellido);
                l.add(ci);
                l.add(edad);
                l.add(telefono);
                l.add(correo);
                l.add(sucursal);
                l.add(imagen);
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
