/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;

import Modelo.Cliente;
import Modelo.ClienteBD;
import Modelo.ClienteCump;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Hector
 */
@WebServlet(name = "VencimientoServlet2", urlPatterns = {"/VencimientoServlet2"})
public class VencimientoServlet2 extends HttpServlet {

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
            out.println("<title>Servlet VencimientoServlet2</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet VencimientoServlet2 at " + request.getContextPath() + "</h1>");
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
        response.setContentType("text/html; charset=iso-8859-1");
        PrintWriter out = response.getWriter();
        try{ 
            ArrayList<ClienteCump> lista = ClienteBD.cumple();
            
            Calendar hoy = Calendar.getInstance();
            int diaAct = hoy.get(Calendar.DATE);
            int mesAct = hoy.get(Calendar.MONTH)+1;
            hoy.add(Calendar.DATE, 10);
            int dia10 = hoy.get(Calendar.DATE);
            int mes10 = hoy.get(Calendar.MONTH)+1;
            ArrayList<ClienteCump> cump = new ArrayList<>();
            
            for(int cont=0;cont<lista.size();cont++)
            {
                ClienteCump cc = lista.get(cont);
                int day = cc.getDia();
                int month = cc.getMes();
                if(month==mes10 && day<dia10 && day>=diaAct)
                {
                    cump.add(cc);
                }
                if(month==mesAct && day>=diaAct)
                {
                    if(month<mes10)
                    {
                        cump.add(cc);
                    }
                }
            }
            //String s= " "+mesAct+"/"+diaAct+" : "+mes10+"/"+dia10;
        String s1 = cump.get(1).getNombre()+"---"+cump.get(1).getDia()+"/"+cump.get(1).getMes()+"---"+cump.get(1).getSucursal();
            System.out.println(s1);
        String body = "";
        for(int ii=0;ii<cump.size();ii++)
        {
            String nomb = cump.get(ii).getNombre();
            int diac = cump.get(ii).getDia();
            int mesc = cump.get(ii).getMes();
            String sucu = cump.get(ii).getSucursal();
            String fec = diac+"/"+mesc;
            body = body+"<tr><td id='nombre'>"+nomb+"</td>"+"<td id='dia'>"+fec+"</td>"+"<td id='sucursal'>"+sucu+"</td></tr>";
        }
            String s=
              "<div id="+"container"+"></div>"+
            "</div>" 
                +"<table id="+"datatable-responsive1"+" class="+"table table-striped table-bordered dt-responsive nowrap"+" cellspacing='0' width='100%'>"+
                "<caption size=8>Proximos cumpleañeros</caption>"+    
                    "<thead>"+
                            "<tr>"+
                                "<th>Nombre</th>"+
                                "<th>Fecha</th>"+
                                "<th>Sucursal</th>"+
                            "</tr>"+
                        "</thead>"+
                        "<tbody>"+
                    body+
                        "</tbody>"+
                    "</table>"
                    + "</div>"+
            "</div>";
        String json = new Gson().toJson(s); // anyObject = List<Bean>, Map<K, Bean>, Bean, String, etc..
            response.setContentType("application/json");
            //response.setCharacterEncoding("UTF-8");
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
