/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;

import Modelo.Paquete;
import Modelo.PaqueteBD;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import java.text.SimpleDateFormat;
import java.util.Calendar;

/**
 *
 * @author Hector
 */
@WebServlet(name = "ServletPaquete", urlPatterns = {"/ServletPaquete"})
public class ServletPaquete extends HttpServlet {

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
            out.println("<title>Servlet ServletPaquete</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ServletPaquete at " + request.getContextPath() + "</h1>");
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
        try{
                 String paquete = request.getParameter("paq");
                 String fe = request.getParameter("f");
                 SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                 java.util.Date date = sdf.parse(fe);
                 java.sql.Date sf = new java.sql.Date(date.getTime());
                 
                 int dia = sf.getDate();
                 int mes = sf.getMonth();
                 int año = sf.getYear()+1900;
                 Calendar hoy = Calendar.getInstance();
                 hoy.set(año, mes, dia);
                 
                 int paq = Integer.parseInt(paquete);
                 Paquete pq = PaqueteBD.MostrarPaquete(paq);
                 int duracion = pq.getDuracion();
                 
                 hoy.add(Calendar.DATE, duracion);
                 int diaAct = hoy.get(Calendar.DATE);
                 int mesAct = hoy.get(Calendar.MONTH)+1;
                 int añoAct = hoy.get(Calendar.YEAR);
                 String n = añoAct+"-"+mesAct+"-"+diaAct;
                 //out.print(n);
                 
                 String json = new Gson().toJson(n); // anyObject = List<Bean>, Map<K, Bean>, Bean, String, etc..
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
