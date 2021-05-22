/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;

import Modelo.Cliente;
import Modelo.ClienteBD;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.sql.*;
import Utils.Conexion;
import java.util.ArrayList;
import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpSession;

/**
 *
 * @author YakuRocaH
 */
@WebServlet(name = "ServletLogueo", urlPatterns = {"/ServletLogueo"})
public class ServletLogueo extends HttpServlet {

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
        String accion=request.getParameter("accion");
        if(accion.equals("login"))
        {
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
                      PrintWriter out = response.getWriter();
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
                              //ArrayList n = new ArrayList();
                              //n.add(nroC);
                              //n.add(nroCB);
                              //out.print(nroCB);
                              sesionOK.setAttribute("nroCC", nroC);
                              sesionOK.setAttribute("nroCB", nroCB);
                              //String json = new Gson().toJson(n); // anyObject = List<Bean>, Map<K, Bean>, Bean, String, etc..
                              //response.setContentType("application/json"); 
                              //response.setCharacterEncoding("UTF-8");
                              //response.getWriter().write(json);          

                          } catch (Exception e) {
                              out.println("An exception occurred: " + e.getMessage());
                              out.println("console.log("+e+");");
                          }
                            //-------------------------
                            
                            
                            //Caja c = new Caja(0);
                            //boolean rpta=CajaBD.insertarCaja(c);
                            
                            //--------------------------
                          //request.getRequestDispatcher("principal.jsp").forward(request, response);
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
                          //request.setAttribute("msg","Error de Usuario o Password");
                          //request.getRequestDispatcher("index.jsp").forward(request, response);
                          RequestDispatcher rd =request.getRequestDispatcher("index.jsp");
                          rd.include(request, response);
                      }
            }
            catch(Exception e)
            {
                request.getRequestDispatcher("principal.jsp").forward(request, response);
                System.out.println(e);
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
            
        }else if(accion.equals("cerrar")){
            HttpSession sesionOK=request.getSession();
            request.getSession().removeAttribute("perfil");
            request.getSession().removeAttribute("nom");
            request.getSession().removeAttribute("apell");
            request.getSession().removeAttribute("idsucu");
            request.getSession().removeAttribute("sucur");
            sesionOK.invalidate();
            request.getRequestDispatcher("Cerrar.jsp").forward(request, response);
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
        processRequest(request, response);
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
