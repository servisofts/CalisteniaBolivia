/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;

import Modelo.Cliente;
import Modelo.ClienteBD;
import Utils.Conexion;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author pc
 */
@WebServlet(name = "ServletLogin", urlPatterns = {"/ServletLogin"})
public class ServletLogin extends HttpServlet {

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
            out.println("<title>Servlet ServletLogin</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ServletLogin at " + request.getContextPath() + "</h1>");
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
                String usu=request.getParameter("txbUsuario");
            String pass=request.getParameter("txbPass");
            Connection cn =Conexion.getConexion();
        CallableStatement cl=null;
            try
            {
                cl=cn.prepareCall("call IngresoLogin(?,?)");
                      cl.setString(1, usu);
                      cl.setString(2, pass);
                      ResultSet rs=cl.executeQuery();
                      out = response.getWriter();
                      if(rs.next())
                      {
                          HttpSession sesionOK=request.getSession();
                          sesionOK.setAttribute("idper",(String)rs.getString(1));
                          sesionOK.setAttribute("nom",(String)rs.getString(2));
                          sesionOK.setAttribute("apell",(String)rs.getString(3));
                           sesionOK.setAttribute("cargo",(String)rs.getString(4));
                           sesionOK.setAttribute("idsucu",(Integer)rs.getInt(5));
                            sesionOK.setAttribute("sucur",(String)rs.getString(6));
                            sesionOK.setAttribute("idContrato",(Integer)rs.getInt(7));                           
                            try {
                              int nroCB = 0;
                              int nroC = 0;
                              ArrayList<Cliente> lista = ClienteBD.mostrarCantidadContratoActivosBoxeo();
                              for (Cliente clb : lista) {
                                  nroCB = clb.getIdCliente();
                              }
                              ArrayList<Cliente> listacc = ClienteBD.mostrarCantidadContratoActivos();
                              for (Cliente clc : listacc) {
                                  nroC = clc.getIdCliente();
                              }
                              sesionOK.setAttribute("nroCC", nroC);
                              sesionOK.setAttribute("nroCB", nroCB);        
                          } catch (Exception e) {
                              out.println("An exception occurred: " + e.getMessage());
                              out.println("console.log("+e+");");
                          }
                          RequestDispatcher rd =request.getRequestDispatcher("principal.jsp");
                          rd.include(request, response);
                      }
                      else
                      {
                          out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Error de Usuario o Password', 'ALGO ANDA MAL!','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("index.jsp");
                          rd.include(request, response);
                      }
            }
            catch(Exception e)
            {
                request.getRequestDispatcher("principal.jsp").forward(request, response);
                System.out.println(e);
                out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Error de Usuario o Password', 'ALGO ANDA MAL!',error' );");
                            out.println("});");
                            out.println("</script>");
            }
            finally{
             System.out.println( "cierra conexion a la base de datos" );    
           try {
              if(cl !=null) cl.close();                             
                if(cn!=null) cn.close();
            } catch (SQLException ex) {
                 System.err.println( ex.getMessage() );    
             }     
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
