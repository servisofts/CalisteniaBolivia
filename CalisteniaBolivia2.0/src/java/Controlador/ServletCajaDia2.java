/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;

import Modelo.Personal;
import Modelo.PersonalBD;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
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
@WebServlet(name = "ServletCajaDia2", urlPatterns = {"/ServletCajaDia2"})
public class ServletCajaDia2 extends HttpServlet {

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
            out.println("<title>Servlet ServletCajaDia2</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ServletCajaDia2 at " + request.getContextPath() + "</h1>");
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
            String f = request.getParameter("f");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            java.util.Date date = sdf.parse(f);
            java.sql.Date fe = new java.sql.Date(date.getTime());
            
            String nombre1 = request.getParameter("idP");
            
            ArrayList<Personal> listaPer2= PersonalBD.mostrarPersonalCaja(fe);
                 int j=10;
                 String s="";
                 for(int i=0;i<listaPer2.size();i++)
                 {
                     Personal p = listaPer2.get(i);
                     s=p.getNombrePersonal();
                     s=s+" "+p.getApellidoPersonal();
                     if(s.equals(nombre1))
                     {
                         j=p.getIdContratoPersonal();
                     }
                 }
            
            ArrayList lista = PersonalBD.mostrarDetalleIngresoCaja(fe,j);
            ArrayList<ArrayList> ll = new ArrayList();

            for (int i = 0; i < lista.size(); i++) {
                ArrayList l = new ArrayList();
                int id = (int) lista.get(i);
                i++;
                double monto = (Double) lista.get(i);
                i++;
                String glosa = (String) lista.get(i);
                String html="<td> <a href="+"modificarIngreso.jsp?id="+id+" class="+"btn btn-warning"+">"+
                           "<strong>Modificar</strong>"+
                           "<span class=fa fa-refresh"+"></span>";
                //l.add(id);
                l.add(monto);
                l.add(glosa);
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
