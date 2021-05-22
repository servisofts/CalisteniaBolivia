/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;

import Modelo.CajaBD;
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
@WebServlet(name = "CajaServlet2", urlPatterns = {"/CajaServlet2"})
public class CajaServlet2 extends HttpServlet {

    
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
            out.println("<title>Servlet Caja</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet Caja at " + request.getContextPath() + "</h1>");
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
        //processRequest(request, response);
        response.setContentType( "text/html; charset=iso-8859-1" );
		PrintWriter out = response.getWriter();
        
        try{
                 String personal = request.getParameter("per");
                 String fe = request.getParameter("f");
                 SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                 java.util.Date date = sdf.parse(fe);
                 java.sql.Date sf = new java.sql.Date(date.getTime());
                 
                 ArrayList<Personal> listaPer2= PersonalBD.mostrarPersonalCaja(sf);
                 int j=0;
                 int n=0;
                 for(int i=0;i<listaPer2.size();i++)
                 {
                     Personal p = listaPer2.get(i);
                     String s=p.getNombrePersonal();
                     s=s+" "+p.getApellidoPersonal();
                     if(s.equals(personal))
                     {
                         j=p.getIdContratoPersonal();
                     }
                 }
                 n=CajaBD.mostrarCaja(sf, j);
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
