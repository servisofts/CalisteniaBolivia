/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Modelo.*;
import java.util.ArrayList;
import javax.servlet.http.HttpSession;
import java.sql.*;
import Utils.Conexion;
import com.google.gson.Gson;
import java.io.InputStream;
import static java.lang.System.out;
import java.util.Calendar;
import javax.servlet.RequestDispatcher;
import javax.servlet.http.Part;

/**
 *
 * @author YakuRocaH
 */
@WebServlet(name = "ServletControlador", urlPatterns = {"/ServletControlador"})
public class ServletControlador extends HttpServlet {

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
            PrintWriter out = response.getWriter();
            
             switch (accion) {
                case "GuardarCliente":
                this.guardarCliente(request,response);
                break;
                case "GuardarCliente2":
                this.guardarCliente2(request,response);
                break;
                case "ModificarCliente":
                this.modificarCliente(request,response);
                break;
                case "ModificarCliente2":
                this.modificarCliente2(request,response);
                break;
                case "GuardarPersonalContrato":
                this.guardarPersonalContrato(request,response);
                break;
                case "ModificarPersonalContrato":
                this.modificarPersonalContrato(request,response);
                break;
                case "GuardarProveedor":
                this.guardarProveedor(request,response);
                break;
                case "GuardarSucursal":
                this.guardarSucursal(request,response);
                break;
                case "ModificarSucursal":
                this.modificarSucursal(request,response);
                break;
                case "DesactivarSucursal":
                this.desactivarSucursal(request,response);
                break;
                case "ActivarSucursal":
                this.activarSucursal(request,response);
                break;
                case "GuardarCargoPersonal":
                this.guardarCargoPersonal(request,response);
                break;
                case "ModificarCargoPersonal":
                this.modificarCargoPersonal(request,response);
                break;
                case "DesactivarCargoPersonal":
                this.desactivarCargoPersonal(request,response);
                break;
                case "ActivarCargoPersonal":
                this.activarCargoPersonal(request,response);
                break;
                case "GuardarPaquete":
                this.guardarPaquete(request,response);
                break;
                case "GuardarPaqueteBoxeo":
                this.guardarPaqueteBoxeo(request,response);
                break;
                case "ModificarPaquete":
                this.modificarPaquete(request,response);
                break;
                case "ModificarPaqueteBoxeo":
                this.modificarPaqueteBoxeo(request,response);
                break;
                case "DesactivarPaquete":
                this.desactivarPaquete(request,response);
                break;
                case "DesactivarPaqueteBoxeo":
                this.desactivarPaqueteBoxeo(request,response);
                break;
                case "ActivarPaquete":
                this.activarPaquete(request,response);
                break;
                case "ActivarPaqueteBoxeo":
                this.activarPaqueteBoxeo(request,response);
                break;
                case "GuardarLogin":
                this.guardarLogin(request,response);
                break;
                case "ModificarLogin":
                this.modificarLogin(request,response);
                break;
                case "AnadirCarrito":
                this.anadirCarrito(request,response);
                break;
                 case "AnadirCarritoCali":
                this.anadirCarritoCali(request,response);
                break;
                case "EliminarCarrito":
                this.eliminarCarrito(request,response);
                break;
                case "EliminarCarritoBox":
                this.eliminarCarritoBox(request,response);
                break;
                case "AnadirCarritoKick":
                this.anadirCarritoKick(request,response);
                break;
                case "GuardarCXP":
                this.guardarCXP(request,response);
                break;
                case "CancelarCXP":
                this.cancelarCXP(request,response);
                break;
                case "GuardarEgresoPersonal":
                this.guardarEgresoPersonal(request,response);
                break;
                case "ModificarEgresoPersonalA":
                this.modificarEgresoPersonalA(request,response);
                break;
                case "ModificarEgresoPersonalC":
                this.modificarEgresoPersonalC(request,response);
                break;
                case "RegistrarVentaCali2":
                this.registrarVentaCali2(request,response);
                break;
                case "RegistrarVentaCali3":
                this.registrarVentaCali3(request,response);
                break;
                case "RegistrarVentaBox":
                this.registrarVentaBox(request,response);
                break;
                case "CerrarCaja":
                this.cerrarCaja(request,response);
                break;
                case "CrearCaja":          
                this.crearCaja(request,response);
                break;
                case "GuardarIngresoPersonal":
                this.guardarIngresoPersonal(request,response);
                break;
                case "ModificarFechaContrato":
                this.modificarFechaContrato(request,response);
                break;
                case "EliminarIngreso":
                this.eliminarIngreso(request,response);
                break;
                case "EliminarIngresoTarjeta":
                this.eliminarIngresoTarjeta(request,response);
                break;
                case "AnadirEgresoChequeTrans":
                this.anadirEgresoChequeTrans(request,response);
                break;
                case "RegistrarEgresoChequeTrans":
                this.registrarEgresoChequeTrans(request,response);
                break;
                case "AnadirEgresoChequeTransPro":
                this.anadirEgresoChequeTransPro(request,response);
                break;
                case "RegistrarEgresoChequeTransPro":
                this.registrarEgresoChequeTransPro(request,response);
                break;
                case "EliminarEgreso":
                this.eliminarEgreso(request,response);
                break;
                case "GuardarOtroEgreso":
                this.guardarOtroEgreso(request,response);
                break;
                case "GuardarOtroIngreso":
                this.guardarOtroIngreso(request,response);
                break;
                case "ModificarEgresoCaja":
                this.modificarEgresoCaja(request,response);
                break;
                case "ModificarIngresoCaja":
                this.modificarIngresoCaja(request,response);
                break;
                case "ModificarIngresoC":
                this.modificarIngresoC(request,response);
                break;
                case "EliminarOtroEgreso":
                this.eliminarOtroEgreso(request,response);
                break;
                case "EliminarEgresoChequeTrans":
                this.eliminarEgresoChequeTrans(request,response);
                break;
                case "EliminarEgresoChequeTransPro":
                this.eliminarEgresoChequeTransPro(request,response);
                break;
                case "GuardarZona":
                this.guardarZona(request,response);
                break;
                case "ModificarZona":
                this.modificarZona(request,response);
                break;
                case "DesactivarZona":
                this.desactivarZona(request,response);
                break;
                case "ActivarZona":
                this.activarZona(request,response);
                break;
                case "AnadirCarritoBeca":
                this.anadirCarritoBeca(request,response);
                break;
                case "RegistrarVentaBeca":
                this.registrarVentaBeca(request,response);
                break;
                 default:
                break;
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
    
    private void guardarCliente(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            String nombre = request.getParameter("txbNombreCl");
            String apellido=request.getParameter("txbApellidoCl");
            String edad=request.getParameter("txbEdadCl");
            int ci=Integer.parseInt(request.getParameter("txbCiCl"));
            String telefono=request.getParameter("txbTelefonoCl");
            String correo=request.getParameter("txbCorreoCl");
            String imagen=request.getParameter("txbImagenCl");
            int idSucursal=Integer.parseInt(request.getParameter("txbSucursalCl"));
            int idZona=Integer.parseInt(request.getParameter("txbZonaCl"));
             Cliente cl=new Cliente(nombre,apellido,edad,ci,telefono,correo,imagen,idSucursal,idZona);
             boolean rpta=ClienteBD.guardarCliente(cl);
             if(rpta)
             {
                            out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Registro de Cliente Completado', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("calistenia.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("cliente.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en el registro de Cliente','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("calistenia.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    private void guardarCliente2(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        InputStream inputStream=null;
            String nombre = request.getParameter("txbNombreCl");
            String apellido=request.getParameter("txbApellidoCl");
            String edad=request.getParameter("txbEdadCl");
            int ci=Integer.parseInt(request.getParameter("txbCiCl"));
            String telefono=request.getParameter("txbTelefonoCl");
            String correo=request.getParameter("txbCorreoCl");
            Part imagen=request.getPart("txbImagenCl");
            if(imagen.getSize( )> 0)
            {
                System.out.println(imagen.getName());
                System.out.println(imagen.getSize());
                System.out.println(imagen.getContentType());
                inputStream = imagen.getInputStream();
            }
            int idSucursal=Integer.parseInt(request.getParameter("txbSucursalCl"));
             Cliente cl=new Cliente(nombre,apellido,edad,ci,telefono,correo,inputStream,idSucursal);
             boolean rpta=ClienteBD.guardarCliente2(cl);
             if(rpta)
             {
                 response.sendRedirect("cliente.jsp");
             }
             else
             {
                 response.sendRedirect("mal.jsp");
             }
             
        }
    private void modificarCliente(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int idContacto=Integer.parseInt(request.getParameter("txbIdContactocl"));
            int idCliente=Integer.parseInt(request.getParameter("txbIdClientecl"));
            String nombre = request.getParameter("txbNombrecl");
            String apellido=request.getParameter("txbApellidocl");
            String telefono=request.getParameter("txbTelcl");
            String correo=request.getParameter("txbCorreocl");
            int idSucursal=Integer.parseInt(request.getParameter("txbSucursalcl"));
             Cliente cl=new Cliente(idContacto,idCliente,nombre,apellido,telefono,correo,idSucursal);
             boolean rpta=ClienteBD.modificarCliente(cl);
             if(rpta)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en la modificacion de Cliente','error' );");
                            out.println("});");
                            out.println("</script>");
                            RequestDispatcher rd =request.getRequestDispatcher("cliente.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Modificacion Completada', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("cliente.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("cliente.jsp");
             }
             
        }
    private void modificarCliente2(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int idContacto=Integer.parseInt(request.getParameter("txbIdContactocl"));
            int idCliente=Integer.parseInt(request.getParameter("txbIdClientecl"));
            String nombre = request.getParameter("txbNombrecl");
            String apellido=request.getParameter("txbApellidocl");
            String edad=request.getParameter("txtEdad");
            int ci=Integer.parseInt(request.getParameter("txbCicl"));
            String telefono=request.getParameter("txbTelcl");
            String correo=request.getParameter("txbCorreocl");
             Cliente cl=new Cliente(idContacto,idCliente,nombre,apellido,edad,ci,telefono,correo);
             boolean rpta=ClienteBD.modificarCliente2(cl);
             if(rpta)
             {
                 
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Modificacion Completada', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("cliente.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en la modificacion de Cliente','error' );");
                            out.println("});");
                            out.println("</script>");
                            RequestDispatcher rd =request.getRequestDispatcher("cliente.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("cliente.jsp");
             }
             
        }
     private void guardarPersonalContrato(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
         PrintWriter out = response.getWriter();
            String nombre = request.getParameter("txbNombreP");
            String apellido = request.getParameter("txbApellidoP");
            String edad = request.getParameter("txbEdadP");
            int ci=Integer.parseInt(request.getParameter("txbCiP"));
            String telefono = request.getParameter("txbTelP");
            String correo = request.getParameter("txbEmailP");
            String imagen = request.getParameter("txbImagenP");
            Date fechaIniContrato = Date.valueOf(request.getParameter("txbFechaContratoIniP"));
            Date fechaFinContrato = Date.valueOf(request.getParameter("txbFechaContratoFinP"));
            String observacion = request.getParameter("txbObservacionP");
            int cargo=Integer.parseInt(request.getParameter("txbCargoP"));
            int sucursal=Integer.parseInt(request.getParameter("txbSucursalP"));
             Personal p=new Personal(nombre,apellido,edad,ci,telefono,correo,imagen,fechaIniContrato,fechaFinContrato,
                                        observacion,cargo,sucursal);
             boolean rpta=PersonalBD.guardarPersonalContrato(p);
             if(rpta)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Registro de Personal Completado', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                            RequestDispatcher rd =request.getRequestDispatcher("personal.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("personal.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en registro de Personal','error' );");
                            out.println("});");
                            out.println("</script>");
                            RequestDispatcher rd =request.getRequestDispatcher("personal.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
     private void modificarPersonalContrato(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
         PrintWriter out = response.getWriter();
            int idContacto=Integer.parseInt(request.getParameter("txbIdContactoP"));
            int idPersonal=Integer.parseInt(request.getParameter("txbIdP"));
            String nombre = request.getParameter("txbNombreP");
            String apellido = request.getParameter("txbApellidoP");
            String telefono = request.getParameter("txbTelefonoP");
            String correo = request.getParameter("txbCorreoP");
            int sucursal=Integer.parseInt(request.getParameter("txbSucursalP"));
             Personal p=new Personal(idContacto,idPersonal,nombre,apellido,telefono,correo);
             boolean rpta=PersonalBD.modificarPersonalContrato(p,sucursal);
             if(rpta)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Modificacion Completada', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                            RequestDispatcher rd =request.getRequestDispatcher("personal.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("personal.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en la modificacion de Personal','error' );");
                            out.println("});");
                            out.println("</script>");
                            RequestDispatcher rd =request.getRequestDispatcher("cliente.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
     private void guardarProveedor(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
         PrintWriter out = response.getWriter();
            String nombre = request.getParameter("txbNombrePro");
            String apellido = request.getParameter("txbApellidoPro");
            int nit =Integer.parseInt( request.getParameter("txbNitPro"));
            String telefono = request.getParameter("txbTelefonoPro");
            String correo = request.getParameter("txbCorreoPro");
            String razonsocial = request.getParameter("txbRazonSocialPro");
             Proveedor pr=new Proveedor(nombre,apellido,nit,telefono,correo,razonsocial);
             boolean rpta=ProveedorBD.guardarProveedor(pr);
             if(rpta)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Registro de Proveedor Completado', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("proveedor.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("proveedor.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en registro de Proveedor','error' );");
                            out.println("});");
                            out.println("</script>");
                            RequestDispatcher rd =request.getRequestDispatcher("proveedor.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    private void guardarSucursal(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        PrintWriter out = response.getWriter();
            String nombre = request.getParameter("txbNombreS");
             Sucursal s=new Sucursal(nombre);
             boolean rpta=SucursalBD.guardarSucursal(s);
             if(rpta)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Registro de Sucursal Completado', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("sucursal.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("sucursal.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en registro de Sucursal','error' );");
                            out.println("});");
                            out.println("</script>");
                            RequestDispatcher rd =request.getRequestDispatcher("sucursal.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    private void modificarSucursal(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int idSucursal=Integer.parseInt(request.getParameter("txbIdS"));
            String nombre = request.getParameter("txbNombreS");
             Sucursal s=new Sucursal(idSucursal,nombre);
             boolean rpta=SucursalBD.modificarSucursal(s);
             if(rpta)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Modificacion Completada', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("sucursal.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("sucursal.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en la modificacion de Sucursal','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("sucursal.jsp");
                          rd.include(request, response);
                          
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    private void desactivarSucursal(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            int idSucursal = Integer.parseInt(request.getParameter("txbIdS"));
             Sucursal s=new Sucursal(idSucursal);
             boolean rpta=SucursalBD.desactivarSucursal(s);
             if(rpta)
             {
                 response.sendRedirect("sucursal.jsp");
             }
             else
             {
                 response.sendRedirect("mal.jsp");
             }
             
        }
    private void activarSucursal(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            int idSucursal = Integer.parseInt(request.getParameter("txbIdS"));
             Sucursal s=new Sucursal(idSucursal);
             boolean rpta=SucursalBD.activarSucursal(s);
             if(rpta)
             {
                 response.sendRedirect("sucursal.jsp");
             }
             else
             {
                 
                 response.sendRedirect("mal.jsp");
             }
             
        }
    private void guardarCargoPersonal(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        PrintWriter out = response.getWriter();
            String nombre = request.getParameter("txbNombreCp");
             CargoPersonal cp=new CargoPersonal(nombre);
             boolean rpta=CargoPersonalBD.guardarCargoPersonal(cp);
             if(rpta)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Registro de Cargo Completado', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("cargo.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("cargo.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en registro de Cargo','error' );");
                            out.println("});");
                            out.println("</script>");
                            RequestDispatcher rd =request.getRequestDispatcher("cargo.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    private void modificarCargoPersonal(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int idCargoPersonal=Integer.parseInt(request.getParameter("txbIdCp"));
            String nombre = request.getParameter("txbNombreCp");
             CargoPersonal cp=new CargoPersonal(idCargoPersonal,nombre);
             boolean rpta=CargoPersonalBD.modificarCargoPersonal(cp);
             if(rpta)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Modificacion Completada', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("cargo.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en la modificacion de Sucursal','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("cargo.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("index.jsp");
             }
             
        }
    private void desactivarCargoPersonal(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            int idCargoPersonal = Integer.parseInt(request.getParameter("txbIdCp"));
             CargoPersonal cp=new CargoPersonal(idCargoPersonal);
             boolean rpta=CargoPersonalBD.desactivarCargoPersonal(cp);
             if(rpta)
             {
                 response.sendRedirect("cargo.jsp");
             }
             else
             {
                 response.sendRedirect("mal.jsp");
             }
             
        }
    private void activarCargoPersonal(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            int idCargoPersonal = Integer.parseInt(request.getParameter("txbIdCp"));
             CargoPersonal cp=new CargoPersonal(idCargoPersonal);
             boolean rpta=CargoPersonalBD.activarCargoPersonal(cp);
             if(rpta)
             {
                 response.sendRedirect("cargo.jsp");
             }
             else
             {
                 response.sendRedirect("mal.jsp");
             }
             
        }
    private void guardarPaquete(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            String nombrePaquete = request.getParameter("txbNombrePq");
            float PrecioPaquete=Float.parseFloat(request.getParameter("txbPrecioPq"));
            int CantidadPaquete=Integer.parseInt(request.getParameter("txbCantidadPq"));
            int DuracionPaquete=Integer.parseInt(request.getParameter("txbDuracionPq"));
            int CategoriaPaquete=Integer.parseInt(request.getParameter("txbCategoriaPaquetePq"));
             Paquete pq=new Paquete(nombrePaquete,PrecioPaquete,CantidadPaquete,DuracionPaquete,CategoriaPaquete);
             boolean rpta=PaqueteBD.guardarPaquete(pq);
             if(rpta)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Registro de Paquete Completado', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("precio.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("precio.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'error en registro de Paquete','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("precio.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    private void guardarPaqueteBoxeo(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            String nombrePaquete = request.getParameter("txbNombrePq");
            float PrecioPaquete=Float.parseFloat(request.getParameter("txbPrecioPq"));
            int CantidadPaquete=Integer.parseInt(request.getParameter("txbCantidadPq"));
            int DuracionPaquete=Integer.parseInt(request.getParameter("txbDuracionPq"));
            int CategoriaPaquete=Integer.parseInt(request.getParameter("txbCategoriaPaquetePq"));
             Paquete pq=new Paquete(nombrePaquete,PrecioPaquete,CantidadPaquete,DuracionPaquete,CategoriaPaquete);
             boolean rpta=PaqueteBD.guardarPaquete(pq);
             System.out.println(rpta);
             if(rpta)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Registro de Paquete Completado', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("precioBoxeo.jsp");
                          rd.include(request, response);
                          
                 //response.sendRedirect("precio.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'error en registro de Paquete','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("precioBoxeo.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    private void modificarPaquete(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int idPaquete=Integer.parseInt(request.getParameter("txbIdPq"));
            String nombrePaquete = request.getParameter("txbNombrePq");
            float PrecioPaquete=Float.parseFloat(request.getParameter("txbPrecioPq"));
            int CantidadPaquete=Integer.parseInt(request.getParameter("txbCantidadPq"));
            int DuracionPaquete=Integer.parseInt(request.getParameter("txbDuracionPq"));
            int CategoriaPaquete=Integer.parseInt(request.getParameter("txbCategoriaPaquetePq"));
             Paquete pq=new Paquete(idPaquete,nombrePaquete,PrecioPaquete,CantidadPaquete,DuracionPaquete,CategoriaPaquete);
             boolean rpta=PaqueteBD.modificarPaquete(pq);
             if(rpta)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Modificacion Completada', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("precio.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("precio.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en la modificacion de Paquete','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("precio.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    private void modificarPaqueteBoxeo(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int idPaquete=Integer.parseInt(request.getParameter("txbIdPq"));
            String nombrePaquete = request.getParameter("txbNombrePq");
            float PrecioPaquete=Float.parseFloat(request.getParameter("txbPrecioPq"));
            int CantidadPaquete=Integer.parseInt(request.getParameter("txbCantidadPq"));
            int DuracionPaquete=Integer.parseInt(request.getParameter("txbDuracionPq"));
            int CategoriaPaquete=Integer.parseInt(request.getParameter("txbCategoriaPaquetePq"));
             Paquete pq=new Paquete(idPaquete,nombrePaquete,PrecioPaquete,CantidadPaquete,DuracionPaquete,CategoriaPaquete);
             boolean rpta=PaqueteBD.modificarPaquete(pq);
             if(rpta)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Modificacion Completada', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("precioBoxeo.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("precio.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en la modificacion de Paquete','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("precioBoxeo.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    private void desactivarPaquete(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            int idPaquete=Integer.parseInt(request.getParameter("txbIdPq"));
             Paquete pq=new Paquete(idPaquete);
             boolean rpta=PaqueteBD.desactivarPaquete(pq);
             if(rpta)
             {
                 response.sendRedirect("precio.jsp");
             }
             else
             {
                 response.sendRedirect("mal.jsp");
             }
             
        }
    private void desactivarPaqueteBoxeo(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            int idPaquete=Integer.parseInt(request.getParameter("txbIdPq"));
             Paquete pq=new Paquete(idPaquete);
             boolean rpta=PaqueteBD.desactivarPaquete(pq);
             if(rpta)
             {
                 response.sendRedirect("precioBoxeo.jsp");
             }
             else
             {
                 response.sendRedirect("mal.jsp");
             }
             
        }
    private void activarPaquete(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            int idPaquete=Integer.parseInt(request.getParameter("txbIdPq"));
             Paquete pq=new Paquete(idPaquete);
             boolean rpta=PaqueteBD.activarPaquete(pq);
             if(rpta)
             {
                 response.sendRedirect("precio.jsp");
             }
             else
             {
                 response.sendRedirect("mal.jsp");
             }
             
        }
    private void activarPaqueteBoxeo(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            int idPaquete=Integer.parseInt(request.getParameter("txbIdPq"));
             Paquete pq=new Paquete(idPaquete);
             boolean rpta=PaqueteBD.activarPaquete(pq);
             if(rpta)
             {
                 response.sendRedirect("precioBoxeo.jsp");
             }
             else
             {
                 response.sendRedirect("mal.jsp");
             }
             
        }
    private void guardarLogin(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int IdPersonal=Integer.parseInt(request.getParameter("txbPerspnalL"));
            String NombreLogin=request.getParameter("txbLoginL");
            String Password=request.getParameter("txbPassL");
             Login l=new Login(IdPersonal,NombreLogin,Password);
             boolean rpta=LoginBD.guardarLogin(l);
             if(rpta)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Nuevo Usuario Registrado', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("sucursal.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("login.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en registro de Usuario','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("sucursal.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    private void modificarLogin(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int idLogin=Integer.parseInt(request.getParameter("txbIdL"));
            String nombre = request.getParameter("txbNombreL");
            String Contraseña=request.getParameter("txbContraL");
             Login l=new Login(idLogin,nombre,Contraseña);
             boolean rpta=LoginBD.modificarLogin(l);
             if(rpta)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Modificacion Completada', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("login.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("sucursal.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en la modificacion de Sucursal','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("login.jsp");
                          rd.include(request, response);
                          
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    private void anadirCarrito(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
           HttpSession sesion = request.getSession();
                 ArrayList<contratoMembresia> carrito;
            if(sesion.getAttribute("carrito")==null)
                 {
                     carrito= new ArrayList<>();
                 }
             else
                 {
                     carrito=(ArrayList<contratoMembresia>)sesion.getAttribute("carrito");
                 }
                 Cliente c =ClienteBD.mostrarCliente(Integer.parseInt(request.getParameter("txtIdClienteC")));
                 Paquete pq =PaqueteBD.MostrarPaquete(Integer.parseInt(request.getParameter("txtPrecioC")));
                 contratoMembresia co = new contratoMembresia();
                 co.setIdCliente(Integer.parseInt(request.getParameter("txtIdClienteC")));
                 co.setFechaInicio(request.getParameter("txtFechaInic"));
                 co.setFechaFin(request.getParameter("txtFechaFinc"));
                 co.setIdPaquete(Integer.parseInt(request.getParameter("txtPrecioC")));
                 co.setIdCaja(Integer.parseInt(request.getParameter("txtIdCajaC")));
                 co.setCliente(c);
                 co.setPaquete(pq);  
                  if("Contado".equals(request.getParameter("cbtipopago"))){
                 co.setTipoPago("Contado");
                 }
                 else if(!"Contado".equals(request.getParameter("cbtipopago"))){
                  EntidadFinanciera ef=EntidadFinancieraBD.mostrarEntidadFinanciera
                                        (Integer.parseInt(request.getParameter("cbtipopago")));
                     co.setTipoPago("Tarjeta");
                     co.setEntidadFinanciera(ef);  
                     co.setNumeroTarjeta(request.getParameter("txtNumTarjeta"));
                 }
                 int indice = -1;
                 for(int i=0;i < carrito.size();i++)
                 {
                     contratoMembresia cot=carrito.get(i);
                     if(cot.getIdCliente()== c.getIdCliente())
                     {
                         indice=i;
                         break;
                     }
                 }
                 if(indice == -1)
                 {
                     carrito.add(co);
                 }
                 sesion.setAttribute("carrito", carrito);
                 response.sendRedirect("registrarVentaCali.jsp");
        }
    private void anadirCarritoCali(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
           HttpSession sesion = request.getSession();
                 ArrayList<contratoCali> carrito2;

            if(sesion.getAttribute("carrito")==null)
                 {
                     carrito2= new ArrayList<>();
                 }
             else
                 {
                     carrito2=(ArrayList<contratoCali>)sesion.getAttribute("carrito");
                 }
            contratoCali co = new contratoCali();
                if("Contado".equals(request.getParameter("cbtipopago"))){
                 Cliente c =ClienteBD.mostrarCliente(Integer.parseInt(request.getParameter("txtIdClienteC")));
                 Paquete pq =PaqueteBD.MostrarPaquete(Integer.parseInt(request.getParameter("txtPrecioC")));
                 co.setIdCliente(Integer.parseInt(request.getParameter("txtIdClienteC")));
                 co.setFechaInicio(request.getParameter("txtFechaInic"));
                 co.setFechaFin(request.getParameter("txtFechaFinc"));
                 co.setIdPaquete(Integer.parseInt(request.getParameter("txtPrecioC")));
                 co.setIdCaja(Integer.parseInt(request.getParameter("txtIdCajaC")));
                 co.setCliente(c);
                 co.setPaquete(pq);
                 co.setTipoPago("Contado");
                 co.setRF(request.getParameter("cbtipoCF"));
                 co.setNumero(request.getParameter("txtNumeroRF"));
                 int indice = -1;
                 for(int i=0;i < carrito2.size();i++)
                 {
                     contratoCali cot=carrito2.get(i);
                     if(cot.getIdCliente()== c.getIdCliente())
                     {
                         indice=i;
                         break;
                     }
                 }
                 if(indice == -1)
                 {
                     carrito2.add(co);
                 }
                 }
                 else if(!"Contado".equals(request.getParameter("cbtipopago"))){
                      Cliente c =ClienteBD.mostrarCliente(Integer.parseInt(request.getParameter("txtIdClienteC")));
                 Paquete pq =PaqueteBD.MostrarPaquete(Integer.parseInt(request.getParameter("txtPrecioC")));
                 EntidadFinanciera ef=EntidadFinancieraBD.mostrarEntidadFinanciera(Integer.parseInt(request.getParameter("cbtipopago")));
                 co.setIdCliente(Integer.parseInt(request.getParameter("txtIdClienteC")));
                 co.setFechaInicio(request.getParameter("txtFechaInic"));
                 co.setFechaFin(request.getParameter("txtFechaFinc"));
                 co.setIdPaquete(Integer.parseInt(request.getParameter("txtPrecioC")));
                 co.setIdCaja(Integer.parseInt(request.getParameter("txtIdCajaC")));
                 co.setCliente(c);
                 co.setPaquete(pq);
                 co.setEntidadFinanciera(ef);
                     co.setTipoPago("Tarjeta");
                     co.setNumeroTarjeta(request.getParameter("txtNumTarjeta"));
                     co.setRF(request.getParameter("cbtipoCF"));
                     co.setNumero(request.getParameter("txtNumeroRF"));
                     int indice = -1;
                 for(int i=0;i < carrito2.size();i++)
                 {
                     contratoCali cot=carrito2.get(i);
                     if(cot.getIdCliente()== c.getIdCliente())
                     {
                         indice=i;
                         break;
                     }
                 }
                 if(indice == -1)
                 {
                     carrito2.add(co);
                 }
                 }
                 
                 sesion.setAttribute("carrito", carrito2);
                 response.sendRedirect("registrarVentaCali.jsp");
             
        }
    private void eliminarCarrito(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
           HttpSession sesion = request.getSession();
                 ArrayList<contratoMembresia> carrito;

            if(sesion.getAttribute("carrito")==null)
                 {
                     carrito= new ArrayList<contratoMembresia>();
                 }
             else
                 {
                     carrito=(ArrayList<contratoMembresia>)sesion.getAttribute("carrito");
                 }
                 Cliente c =ClienteBD.mostrarCliente(Integer.parseInt(request.getParameter("txtIdClienteC")));
                 Paquete pq =PaqueteBD.MostrarPaquete(Integer.parseInt(request.getParameter("txtPrecioC")));
                 contratoMembresia co = new contratoMembresia();
                 co.setIdCliente(Integer.parseInt(request.getParameter("txtIdClienteC")));
                 co.setFechaInicio(request.getParameter("txtFechaInic"));
                 co.setFechaFin(request.getParameter("txtFechaFinc"));
                 co.setIdPaquete(Integer.parseInt(request.getParameter("txtPrecioC")));
                 co.setCliente(c);
                 co.setPaquete(pq);
                 co.setTipoPago(request.getParameter("txtContado"));
                 int indice = -1;
                 for(int i=0;i < carrito.size();i++)
                 {
                     contratoMembresia cot=carrito.get(i);
                     if(cot.getIdCliente()== c.getIdCliente())
                     {
                         indice=i;
                         break;
                     }
                 }
                 if(indice == -1)
                 {
                     carrito.add(co);
                 }
                 sesion.setAttribute("carrito", carrito);
                 response.sendRedirect("registrarVentaCali.jsp");
             
        }
    private void eliminarCarritoBox(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
           HttpSession sesion = request.getSession();
                 ArrayList<contratoKick> carrito;

            if(sesion.getAttribute("carrito1")==null)
                 {
                     carrito= new ArrayList<contratoKick>();
                 }
             else
                 {
                     carrito=(ArrayList<contratoKick>)sesion.getAttribute("carrito1");
                 }
                 Cliente c =ClienteBD.mostrarCliente(Integer.parseInt(request.getParameter("txtIdClienteC")));
                 Paquete pq =PaqueteBD.MostrarPaquete(Integer.parseInt(request.getParameter("txtPrecioC")));
                 contratoKick co = new contratoKick();
                 co.setIdCliente(Integer.parseInt(request.getParameter("txtIdClienteC")));
                 co.setFechaInicio(request.getParameter("txtFechaInic"));
                 co.setFechaFin(request.getParameter("txtFechaFinc"));
                 co.setIdPaquete(Integer.parseInt(request.getParameter("txtPrecioC")));
                 co.setCliente(c);
                 co.setPaquete(pq);
                 co.setTipoPago(request.getParameter("txtContado"));
                 int indice = -1;
                 for(int i=0;i < carrito.size();i++)
                 {
                     contratoKick cot=carrito.get(i);
                     if(cot.getIdCliente()== c.getIdCliente())
                     {
                         indice=i;
                         break;
                     }
                 }
                 if(indice == -1)
                 {
                     carrito.add(co);
                 }
                 sesion.setAttribute("carrito1", carrito);
                 response.sendRedirect("registrarVentaKick.jsp");
             
        }
    private void anadirCarritoKick(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
           HttpSession sesion = request.getSession();
                 ArrayList<contratoKick> carrito2;

            if(sesion.getAttribute("carrito1")==null)
                 {
                     carrito2= new ArrayList<>();
                 }
             else
                 {
                     carrito2=(ArrayList<contratoKick>)sesion.getAttribute("carrito1");
                 }
            contratoKick co = new contratoKick();
                if("Contado".equals(request.getParameter("cbtipopago"))){
                 Cliente c =ClienteBD.mostrarCliente(Integer.parseInt(request.getParameter("txtIdClienteC")));
                 Paquete pq =PaqueteBD.MostrarPaquete(Integer.parseInt(request.getParameter("txtPrecioC")));
                 co.setIdCliente(Integer.parseInt(request.getParameter("txtIdClienteC")));
                 co.setFechaInicio(request.getParameter("txtFechaInic"));
                 co.setFechaFin(request.getParameter("txtFechaFinc"));
                 co.setIdPaquete(Integer.parseInt(request.getParameter("txtPrecioC")));
                 co.setIdCaja(Integer.parseInt(request.getParameter("txtIdCajaC")));
                 co.setCliente(c);
                 co.setPaquete(pq);
                 co.setTipoPago("Contado");
                 co.setRF(request.getParameter("cbtipoCF"));
                 co.setNumero(request.getParameter("txtNumeroRF"));
                 int indice = -1;
                 for(int i=0;i < carrito2.size();i++)
                 {
                     contratoKick cot=carrito2.get(i);
                     if(cot.getIdCliente()== c.getIdCliente())
                     {
                         indice=i;
                         break;
                     }
                 }
                 if(indice == -1)
                 {
                     carrito2.add(co);
                 }
                 }
                 else if(!"Contado".equals(request.getParameter("cbtipopago"))){
                      Cliente c =ClienteBD.mostrarCliente(Integer.parseInt(request.getParameter("txtIdClienteC")));
                 Paquete pq =PaqueteBD.MostrarPaquete(Integer.parseInt(request.getParameter("txtPrecioC")));
                 EntidadFinanciera ef=EntidadFinancieraBD.mostrarEntidadFinanciera(Integer.parseInt(request.getParameter("cbtipopago")));
                 co.setIdCliente(Integer.parseInt(request.getParameter("txtIdClienteC")));
                 co.setFechaInicio(request.getParameter("txtFechaInic"));
                 co.setFechaFin(request.getParameter("txtFechaFinc"));
                 co.setIdPaquete(Integer.parseInt(request.getParameter("txtPrecioC")));
                 co.setIdCaja(Integer.parseInt(request.getParameter("txtIdCajaC")));
                 co.setCliente(c);
                 co.setPaquete(pq);
                 co.setEntidadFinanciera(ef);
                     co.setTipoPago("Tarjeta");
                     co.setNumeroTarjeta(request.getParameter("txtNumTarjeta"));
                     co.setRF(request.getParameter("cbtipoCF"));
                     co.setNumero(request.getParameter("txtNumeroRF"));
                     int indice = -1;
                 for(int i=0;i < carrito2.size();i++)
                 {
                     contratoKick cot=carrito2.get(i);
                     if(cot.getIdCliente()== c.getIdCliente())
                     {
                         indice=i;
                         break;
                     }
                 }
                 if(indice == -1)
                 {
                     carrito2.add(co);
                 }
                 }
                 
                 sesion.setAttribute("carrito1", carrito2);
                 response.sendRedirect("registrarVentaKick.jsp");
             
        }
    private void guardarCXP(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        PrintWriter out = response.getWriter();
            float monto=Float.parseFloat(request.getParameter("txbMontoCxp"));
            String fecha = request.getParameter("txbFechaLimiteCxp");
            int proveedor= Integer.parseInt(request.getParameter("txbProveedorCxp"));
             CuentaXPagar cxp=new CuentaXPagar(monto,fecha,proveedor);
             boolean rpta=CuentaXPagarBD.guardarCXP(cxp);
             if(rpta)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Registro Completado', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("cuentasXPagar.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("cuentasXPagar.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en registro','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("cuentasXPagar.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    private void cancelarCXP(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int idCxp=Integer.parseInt(request.getParameter("txbIdCxp"));
            float monto=Float.parseFloat(request.getParameter("txbMontoCxp"));
            String razonsocial = request.getParameter("txbRazonCxp");
            int idCaja=Integer.parseInt(request.getParameter("txbIdCajaCxp"));
             CuentaXPagar cxp=new CuentaXPagar(idCxp,monto,razonsocial,idCaja);
             boolean rpta=CuentaXPagarBD.CancelarCXP(cxp);
             if(rpta)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Registro Completado', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("Ok.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("estadoDiario.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en registro','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("cuentasXPagar.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    private void guardarEgresoPersonal(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int idCaja=Integer.parseInt(request.getParameter("txbidCajaEP"));
            int idContratoPersonal=Integer.parseInt(request.getParameter("txbIdCP"));
            float monto=Float.parseFloat(request.getParameter("txbMontoEP"));
            String observacion=request.getParameter("txbObservacionEP");
             EgresoPersonal ep=new EgresoPersonal(idCaja,idContratoPersonal,monto,observacion);
             boolean rpta=EgresoPersonalBD.GuardarEgresoPersonal(ep);
             if(rpta)
             {
                  out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ({\n" +
                                        "  position: 'top-end',\n" +
                                        "  type: 'success',\n" +
                                        "  title: 'Egreso de Personal Registrado',\n" +
                                        "  showConfirmButton: false,\n" +
                                        "  timer: 1500\n" +
                                        "});");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("Ok.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("estadoDiario.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en registro de Egreso Personal','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("egresoPersonal.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    private void modificarEgresoPersonalA(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int idEgresoCaja = Integer.parseInt(request.getParameter("txbidE"));
            int idCaja=Integer.parseInt(request.getParameter("txbidCajaEP"));
            int idConceptoEgresoPersonal=Integer.parseInt(request.getParameter("txbIdC"));
            float monto=Float.parseFloat(request.getParameter("txbMontoEP"));
            String observacion=request.getParameter("txbObservacionEP");
             EgresoPersonal ep=new EgresoPersonal(idEgresoCaja,idCaja,idConceptoEgresoPersonal,monto,observacion);
             boolean rpta=EgresoPersonalBD.ModificarEgresoPersonalA(ep);
             if(rpta)
             {
                 
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en registro de Egreso ','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("modificarEgresos.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("estadoDiario.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Egreso  Modificado', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("modificarEgresos.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    private void modificarEgresoPersonalC(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int idEgresoCaja = Integer.parseInt(request.getParameter("txbidE"));
            int idCaja=Integer.parseInt(request.getParameter("txbidCajaEP"));
            int idConceptoEgresoPersonal=Integer.parseInt(request.getParameter("txbIdC"));
            int idCierreCaja =Integer.parseInt(request.getParameter("txbidCierreCajaEP"));
            float monto=Float.parseFloat(request.getParameter("txbMontoEP"));
            String observacion=request.getParameter("txbObservacionEP");
             EgresoPersonal ep=new EgresoPersonal(idEgresoCaja,idCaja,idConceptoEgresoPersonal,monto,observacion,idCierreCaja);
             boolean rpta=EgresoPersonalBD.ModificarEgresoPersonalC(ep);
             if(rpta)
             {
                 
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en registro de Egreso ','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("modificarEgresos.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("estadoDiario.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Egreso  Modificado', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("modificarEgresos.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    private void registrarVentaCali2(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException
{
    try{
    PrintWriter out = response.getWriter();
    HttpSession sesion=request.getSession();
    String button1 = request.getParameter("btnVenta");
    String button2 = request.getParameter("btnVentaR");
    if(button1 != null){
    Ingreso i=new Ingreso();
    CuentaXCobrarMembresia cxcm = new CuentaXCobrarMembresia();
    IngresoCuentaXCobrar icxc = new IngresoCuentaXCobrar();
    i.setEfectivo(Float.parseFloat(request.getParameter("txtMontoC").toUpperCase()));
    i.setIdCaja(Integer.parseInt(request.getParameter("txtIdCajaC").toUpperCase()));
    ArrayList<contratoCali> detalle=(ArrayList<contratoCali>)sesion.getAttribute("carrito");
    boolean rpta=CompraMembresiaBD.CompraMembresia3(cxcm,icxc,i,detalle);
        System.out.println(rpta);
    if(rpta)
    {
        out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Venta Completada', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
        request.getSession().removeAttribute("carrito");
        RequestDispatcher rd =request.getRequestDispatcher("Ok.jsp");
                          rd.include(request, response);
        //response.sendRedirect("estadoDiario.jsp");
    }
    else
    {
                            out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Error en el registro de venta ', 'ALGO ANDA MAL REVISE LOS DATOS!','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("registrarVentaCali.jsp");
                          rd.include(request, response);
        //response.sendRedirect("mal.jsp");
    }
    }else if(button2 != null){
        Ingreso i=new Ingreso();
    CuentaXCobrarMembresia cxcm = new CuentaXCobrarMembresia();
    IngresoCuentaXCobrar icxc = new IngresoCuentaXCobrar();
    i.setEfectivo(Float.parseFloat(request.getParameter("txtMontoC").toUpperCase()));
    i.setIdCaja(Integer.parseInt(request.getParameter("txtIdCajaC").toUpperCase()));
    ArrayList<contratoCali> detalle=(ArrayList<contratoCali>)sesion.getAttribute("carrito");
    boolean rpta=CompraMembresiaBD.CompraMembresia3(cxcm,icxc,i,detalle);
    //Calendar cal=Calendar.getInstance();
    //Date date=(Date) cal.getTime();
    java.util.Date date1 = new java.util.Date();
    java.sql.Date inicio = new java.sql.Date(date1.getTime());
    int idCliente = detalle.get(0).getIdCliente();
    String tipoPago = detalle.get(0).getTipoPago();
    Recibo rec = new Recibo(inicio,idCliente,tipoPago);
    ReciboBD.guardarRecibo(rec);
        
    int idRecibo = ReciboBD.getIdRecibo();
        System.out.println(idRecibo);
    for(int ii = 0; ii < detalle.size(); ii++){
         int idPaquete = detalle.get(ii).getIdPaquete();
         int idClienteD = detalle.get(ii).getIdCliente();
         DetalleRecibo dr = new DetalleRecibo(idPaquete,idClienteD,idRecibo);
         ReciboBD.guardarDetalleRecibo(dr);
            }
        //System.out.println(rpta);
    if(rpta)
    {
        out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Venta Completada', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
        request.getSession().removeAttribute("carrito");
        //String json = new Gson().toJson(detalle); // anyObject = List<Bean>, Map<K, Bean>, Bean, String, etc..
        //response.setContentType("application/json"); 
        //response.getWriter().write(json);
        request.getSession().setAttribute("Nro", idRecibo);
        request.getSession().setAttribute("Detalle", detalle);
        RequestDispatcher rd =request.getRequestDispatcher("recibo.jsp");
                          rd.include(request, response);
        //response.sendRedirect("estadoDiario.jsp");
    }
    else
    {
                            out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Error en el registro de venta ', 'ALGO ANDA MAL REVISE LOS DATOS!','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("registrarVentaCali.jsp");
                          rd.include(request, response);
        //response.sendRedirect("mal.jsp");
    }
    }
    }       
    catch(Exception e)
            {
       
            }
}
    private void registrarVentaCali3(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException
{
    try{
    PrintWriter out = response.getWriter();
    HttpSession sesion=request.getSession();
    Ingreso i=new Ingreso();
    CuentaXCobrarMembresia cxcm = new CuentaXCobrarMembresia();
    IngresoCuentaXCobrar icxc = new IngresoCuentaXCobrar();
    RealcionContrato rc = new RealcionContrato();
    i.setEfectivo(Float.parseFloat(request.getParameter("txtMontoC").toUpperCase()));
    i.setIdCaja(Integer.parseInt(request.getParameter("txtIdCajaC").toUpperCase()));
    ArrayList<contratoCali> detalle=(ArrayList<contratoCali>)sesion.getAttribute("carrito");
    boolean rpta=CompraMembresiaBD.CompraMembresia4(cxcm,icxc,i,detalle,rc);
    if(rpta)
    {
        out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ({\n" +
                                        "  position: 'top-end',\n" +
                                        "  type: 'success',\n" +
                                        "  title: 'Venta Calistenia Registrado',\n" +
                                        "  showConfirmButton: false,\n" +
                                        "  timer: 1500\n" +
                                        "});");
                            out.println("});");
                            out.println("</script>");
        request.getSession().removeAttribute("carrito");
        RequestDispatcher rd =request.getRequestDispatcher("Ok.jsp");
                          rd.include(request, response);
        //response.sendRedirect("estadoDiario.jsp");
    }
    else
    {
                            out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Error en el registro de venta ', 'ALGO ANDA MAL REVISE LOS DATOS!','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("registrarVentaCali.jsp");
                          rd.include(request, response);
        //response.sendRedirect("mal.jsp");
    }
    }
    catch(Exception e)
            {
       
            }
}
    private void registrarVentaBox(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException
{
    try{
    String button1 = request.getParameter("btnVenta");
    String button2 = request.getParameter("btnVentaR");
    if(button1 != null){
    PrintWriter out = response.getWriter();
    HttpSession sesion=request.getSession();
    Ingreso i=new Ingreso();
    CuentaXCobrarMembresia cxcm = new CuentaXCobrarMembresia();
    IngresoCuentaXCobrar icxc = new IngresoCuentaXCobrar();
    RealcionContrato rc = new RealcionContrato();
    i.setEfectivo(Float.parseFloat(request.getParameter("txtMontoC").toUpperCase()));
    i.setIdCaja(Integer.parseInt(request.getParameter("txtIdCajaC").toUpperCase()));
    ArrayList<contratoKick> detalle=(ArrayList<contratoKick>)sesion.getAttribute("carrito1");
    boolean rpta=CompraMembresiaBD.CompraMembresiaBox(cxcm,icxc,i,detalle,rc);
    if(rpta)
    {
        out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ({\n" +
                                        "  position: 'top-end',\n" +
                                        "  type: 'success',\n" +
                                        "  title: 'Venta Boxeo Registrado',\n" +
                                        "  showConfirmButton: false,\n" +
                                        "  timer: 1500\n" +
                                        "});");
                            out.println("});");
                            out.println("</script>");
        request.getSession().removeAttribute("carrito1");
        RequestDispatcher rd =request.getRequestDispatcher("Ok.jsp");
                          rd.include(request, response);
        //response.sendRedirect("estadoDiario.jsp");
    }
    else
    {
                            out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Error en el registro de venta ', 'ALGO ANDA MAL REVISE LOS DATOS!','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("registrarVentaCali.jsp");
                          rd.include(request, response);
        //response.sendRedirect("mal.jsp");
    }
    }else if(button2 != null){
        PrintWriter out = response.getWriter();
    HttpSession sesion=request.getSession();
    Ingreso i=new Ingreso();
    CuentaXCobrarMembresia cxcm = new CuentaXCobrarMembresia();
    IngresoCuentaXCobrar icxc = new IngresoCuentaXCobrar();
    RealcionContrato rc = new RealcionContrato();
    i.setEfectivo(Float.parseFloat(request.getParameter("txtMontoC").toUpperCase()));
    i.setIdCaja(Integer.parseInt(request.getParameter("txtIdCajaC").toUpperCase()));
    ArrayList<contratoKick> detalle=(ArrayList<contratoKick>)sesion.getAttribute("carrito1");
    boolean rpta=CompraMembresiaBD.CompraMembresiaBox(cxcm,icxc,i,detalle,rc);
    
    java.util.Date date1 = new java.util.Date();
    java.sql.Date inicio = new java.sql.Date(date1.getTime());
    int idCliente = detalle.get(0).getIdCliente();
    String tipoPago = detalle.get(0).getTipoPago();
    Recibo rec = new Recibo(inicio,idCliente,tipoPago);
    ReciboBD.guardarRecibo(rec);
        
    int idRecibo = ReciboBD.getIdRecibo();
        System.out.println(idRecibo);
    for(int ii = 0; ii < detalle.size(); ii++){
         int idPaquete = detalle.get(ii).getIdPaquete();
         int idClienteD = detalle.get(ii).getIdCliente();
         DetalleRecibo dr = new DetalleRecibo(idPaquete,idClienteD,idRecibo);
         ReciboBD.guardarDetalleRecibo(dr);
            }
    
    if(rpta)
    {
        out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ({\n" +
                                        "  position: 'top-end',\n" +
                                        "  type: 'success',\n" +
                                        "  title: 'Venta Boxeo Registrado',\n" +
                                        "  showConfirmButton: false,\n" +
                                        "  timer: 1500\n" +
                                        "});");
                            out.println("});");
                            out.println("</script>");
        request.getSession().removeAttribute("carrito1");
        request.getSession().setAttribute("Nro", idRecibo);
        request.getSession().setAttribute("Detalle", detalle);
        RequestDispatcher rd =request.getRequestDispatcher("reciboBox.jsp");
                          rd.include(request, response);
        //response.sendRedirect("estadoDiario.jsp");
    }
    else
    {
                            out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Error en el registro de venta ', 'ALGO ANDA MAL REVISE LOS DATOS!','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("registrarVentaCali.jsp");
                          rd.include(request, response);
        //response.sendRedirect("mal.jsp");
    }
    }
    }
    catch(Exception e)
            {
       
            }
}
    private void cerrarCaja(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int idCaja=Integer.parseInt(request.getParameter("txtIdCajaED"));
            float efectivo=Float.parseFloat(request.getParameter("txtEfectivoED"));
            String fecha=request.getParameter("txtFechaED");
            String observacion=request.getParameter("txbObservacionED");
            float montoInEfeCali=Float.parseFloat(request.getParameter("txtCaliEfe"));
            float montoInEfeBox=Float.parseFloat(request.getParameter("txtBoxEfe"));
            float montoInTarCali=Float.parseFloat(request.getParameter("txtCaliT"));
            float montoInTarBox=Float.parseFloat(request.getParameter("txtBoxT"));
            float otroIngreso=Float.parseFloat(request.getParameter("txtOtroIbgreso"));
            float montoEgresoPer=Float.parseFloat(request.getParameter("txtEgresoPer"));
            float montoCXP=Float.parseFloat(request.getParameter("txtCuentasXPagar"));
            float montoChequePer=Float.parseFloat(request.getParameter("txtChuequePer"));
            float montoChequePro=Float.parseFloat(request.getParameter("txtChequePro"));
            float otroEgreso=Float.parseFloat(request.getParameter("txtOtroEgresoOE"));
            
             CierreCaja cc=new CierreCaja(idCaja,efectivo,fecha,observacion,montoInEfeCali,montoInEfeBox,montoInTarCali,montoInTarBox,otroIngreso,montoEgresoPer,montoCXP,montoChequePer,montoChequePro,otroEgreso);
             boolean rpta=CierreCajaBD.CerrarCaja(cc);
             if(rpta)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Cierre de Caja Completado', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("OkCerrado.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("principal.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Error en Cerrar Caja', 'ALGO ANDA MAL!','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("estadoDiario.jsp");
                          rd.include(request, response);
             }
             
        }
    private void crearCaja(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
        Caja l2 = CajaBD.mostrarCajaActiva(Integer.parseInt(request.getParameter("txtIdContratoCa")));
        if(l2 == null)
        {           
            int idContrato=Integer.parseInt(request.getParameter("txtIdContratoCa"));
            float efectivo=Float.parseFloat(request.getParameter("txbEfectivoCa"));
            String observacion=request.getParameter("txbOvbervacionCa");
            int idContrato2=Integer.parseInt(request.getParameter("txbPerspnalCa"));
            int sucursal=Integer.parseInt(request.getParameter("txbSucursal"));
             Ingreso cc=new Ingreso(idContrato2,efectivo,observacion,idContrato2,sucursal);
             boolean rpta=IngresoBD.CrearCaja(cc);
             if(rpta)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ({\n" +
                                        "  position: 'top-end',\n" +
                                        "  type: 'success',\n" +
                                        "  title: 'Registro Completado',\n" +
                                        "  showConfirmButton: false,\n" +
                                        "  timer: 1500\n" +
                                        "});");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("Ok.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("estadoDiario.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Error en el registro', 'ALGO ANDA MAL!','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("CrearCaja.jsp");
                          rd.include(request, response);
             }
             }
        else
                 {
                     out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Lo siento', 'YA TIENE UNA CAJA ABIERTA...!','warning' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("CrearCaja.jsp");
                          rd.include(request, response);
                 }
        }
    private void guardarIngresoPersonal(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int idCaja=Integer.parseInt(request.getParameter("txbCajaCa"));
            float efectivo=Float.parseFloat(request.getParameter("txbEfectivoCa"));
            String observacion=request.getParameter("txbOvbervacionCa");
            int idContrato2=Integer.parseInt(request.getParameter("txbPerspnalCa"));
             Ingreso cc=new Ingreso(idCaja,efectivo,observacion,idContrato2);
             boolean rpta=IngresoBD.GuardarIngresoPersonal(cc);
             if(rpta)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Ingreso Personal Registrado', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("Ok.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("estadoDiario.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en registro de Ingreso Personal','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("ingresoPersonal.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    private void modificarFechaContrato(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int idContrato=Integer.parseInt(request.getParameter("txbIdContratocl"));
            Date fechaFin = Date.valueOf(request.getParameter("txbFechaFin"));
            String nombrePer = request.getParameter("txbNombrePer");
            String nombreCli = request.getParameter("txbNombrecl");
            String apellidoCli = request.getParameter("txbApellidocl");
            String observacion= request.getParameter("txbObservacion");
             Cliente ct=new Cliente(idContrato,fechaFin,nombrePer,nombreCli,apellidoCli,observacion);
             boolean rpta=ClienteBD.modificarFechaContrato(ct);
             if(rpta)
             {
                 
                 response.sendRedirect("principal.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en la modificacion de Fecha','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("principal.jsp");
                          rd.include(request, response);
                          
                 response.sendRedirect("mal.jsp");
             }
             
        }
    private void eliminarIngreso(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int IdCaja = Integer.parseInt(request.getParameter("txbIdCaja"));
            float Efectivo = Float.parseFloat(request.getParameter("txbPrecio"));
            int IngresoCaja = Integer.parseInt(request.getParameter("txbIngresoCaja"));
            String nombre=request.getParameter("txbNombrecl");
            String apellido=request.getParameter("txbApellidocl");
            String paquete=request.getParameter("txbPaquete");
            String observacion=request.getParameter("txbObservacion");
            String nombrePer=request.getParameter("txbNombrePer");
            
             Ingreso ct=new Ingreso(IdCaja,Efectivo,IngresoCaja,nombre,apellido,paquete,observacion,nombrePer);
             boolean rpta=IngresoBD.EliminarIngreso(ct);
             if(rpta)
             {
                 
                 response.sendRedirect("principal.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en la modificacion de Fecha','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("principal.jsp");
                          rd.include(request, response);
                          
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    private void eliminarIngresoTarjeta(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int IdCaja = Integer.parseInt(request.getParameter("txbIdCaja"));
            float Efectivo = Float.parseFloat(request.getParameter("txbPrecio"));
            int Relacion = Integer.parseInt(request.getParameter("txbRelacion"));
            int idContratoMembresia=Integer.parseInt(request.getParameter("txbContratoMembresia"));
            int CxCCM = Integer.parseInt(request.getParameter("txbCXCContratoMembresia"));
            int InCXC = Integer.parseInt(request.getParameter("txbInCXC"));
            int IngresoCaja = Integer.parseInt(request.getParameter("txbIngresoCaja"));
            String nombre=request.getParameter("txbNombrecl");
            String apellido=request.getParameter("txbApellidocl");
            String paquete=request.getParameter("txbPaquete");
            String observacion=request.getParameter("txbObservacion");
            String nombrePer=request.getParameter("txbNombrePer");
            
             Ingreso ct=new Ingreso(IdCaja,Efectivo,idContratoMembresia,CxCCM,InCXC,IngresoCaja,Relacion,nombre,apellido,paquete,observacion,nombrePer);
             boolean rpta=IngresoBD.EliminarIngresoTarjeta(ct);
             if(rpta)
             {
                 
                 response.sendRedirect("principal.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en la modificacion de Fecha','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("principal.jsp");
                          rd.include(request, response);
                          
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    private void anadirEgresoChequeTrans(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    HttpSession sesion = request.getSession();
                 ArrayList<EgresoChequeTrans> carrito5;
             if(sesion.getAttribute("carrito4")==null)
                 {
                     carrito5= new ArrayList<>();
                 }
             else
                 {
                     carrito5=(ArrayList<EgresoChequeTrans>)sesion.getAttribute("carrito4");
                 }
            EgresoChequeTrans co = new EgresoChequeTrans();
                if("CHEQUE".equals(request.getParameter("cbtipopagop"))){
                 Personal p=PersonalBD.mostrarPersonal2(Integer.parseInt(request.getParameter("txtAEnviarp")));
                 co.setIdP(Integer.parseInt(request.getParameter("txtAEnviarp")));
                 co.setTipoPago("CHEQUE");
                 co.setNumero(request.getParameter("txtNumEp"));
                 co.setMonto(Float.parseFloat(request.getParameter("txtMontop")));
                 co.setObservacion(request.getParameter("txtObservacionP"));
                 co.setIdCaja(Integer.parseInt(request.getParameter("txtIdCajaCp")));
                 co.setPersonal(p);
                 int indice = -1;
                 for(int i=0;i < carrito5.size();i++)
                 {
                     EgresoChequeTrans cot=carrito5.get(i);
                     if(cot.getIdP()== p.getIdPersonal())
                     {
                         indice=i;
                         break;
                     }
                 }
                 if(indice == -1)
                 {
                     carrito5.add(co);
                 }
                 }
                 else if(!"CHEQUE".equals(request.getParameter("cbtipopagop"))){
                 Personal p=PersonalBD.mostrarPersonal2(Integer.parseInt(request.getParameter("txtAEnviarp")));
                 co.setIdP(Integer.parseInt(request.getParameter("txtAEnviarp")));
                 EntidadFinanciera ef=EntidadFinancieraBD.mostrarEntidadFinanciera(Integer.parseInt(request.getParameter("cbtipopagop")));
                 co.setNumero(request.getParameter("txtNumEp"));
                 co.setMonto(Float.parseFloat(request.getParameter("txtMontop")));
                 co.setObservacion(request.getParameter("txtObservacionP"));
                 co.setIdCaja(Integer.parseInt(request.getParameter("txtIdCajaCp")));
                 co.setPersonal(p);
                 co.setTipoPago("TRANSFERENCIA");;
                 co.setEntidadFinanciera(ef);
                     int indice = -1;
                 for(int i=0;i < carrito5.size();i++)
                 {
                     EgresoChequeTrans cot=carrito5.get(i);
                     if(cot.getIdP()== p.getIdPersonal())
                     {
                         indice=i;
                         break;
                     }
                 }
                 if(indice == -1)
                 {
                     carrito5.add(co);
                 }
                 }
                 
                 sesion.setAttribute("carrito4", carrito5);
                 response.sendRedirect("registrarOtroEgresoPersonal.jsp");
        }
    private void registrarEgresoChequeTrans(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException
{
    try{
    PrintWriter out = response.getWriter();
    HttpSession sesion=request.getSession();
    ArrayList<EgresoChequeTrans> detalle=(ArrayList<EgresoChequeTrans>)sesion.getAttribute("carrito4");
    boolean rpta=EgresoChequeTransBD.GuardarEgresoChequeTrans(detalle);
    if(rpta)
    {
        out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ({\n" +
                                        "  position: 'top-end',\n" +
                                        "  type: 'success',\n" +
                                        "  title: 'Egreso Personal Registrado',\n" +
                                        "  showConfirmButton: false,\n" +
                                        "  timer: 1500\n" +
                                        "});");
                            out.println("});");
                            out.println("</script>");
        request.getSession().removeAttribute("carrito4");
        RequestDispatcher rd =request.getRequestDispatcher("Ok.jsp");
                          rd.include(request, response);
        //response.sendRedirect("estadoDiario.jsp");
    }
    else
    {
                            out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Error en el registro de venta ', 'ALGO ANDA MAL REVISE LOS DATOS!','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("registrarVentaCali.jsp");
                          rd.include(request, response);
        //response.sendRedirect("mal.jsp");
    }
    }
    catch(Exception e)
            {
       
            }
}
    private void anadirEgresoChequeTransPro(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    HttpSession sesion = request.getSession();
                 ArrayList<EgresoChequeTransPro> carrito4;
             if(sesion.getAttribute("carrito3")==null)
                 {
                     carrito4= new ArrayList<>();
                 }
             else
                 {
                     carrito4=(ArrayList<EgresoChequeTransPro>)sesion.getAttribute("carrito3");
                 }
            EgresoChequeTransPro co = new EgresoChequeTransPro();
                if("CHEQUE".equals(request.getParameter("cbtipopago"))){
                 Proveedor p=ProveedorBD.mostrarProveedor(Integer.parseInt(request.getParameter("txtAEnviar")));
                 co.setIdP(Integer.parseInt(request.getParameter("txtAEnviar")));
                 co.setTipoPago("CHEQUE");
                 co.setNumero(request.getParameter("txtNumE"));
                 co.setMonto(Float.parseFloat(request.getParameter("txtMonto")));
                 co.setObservacion(request.getParameter("txtObservacionP"));
                 co.setIdCaja(Integer.parseInt(request.getParameter("txtIdCajaCp")));
                 co.setProveedor(p);
                 int indice = -1;
                 for(int i=0;i < carrito4.size();i++)
                 {
                     EgresoChequeTransPro cot=carrito4.get(i);
                     if(cot.getIdP()== p.getIdProveedor())
                     {
                         indice=i;
                         break;
                     }
                 }
                 if(indice == -1)
                 {
                     carrito4.add(co);
                 }
                 }
                 else if(!"CHEQUE".equals(request.getParameter("cbtipopago"))){
                 Proveedor p=ProveedorBD.mostrarProveedor(Integer.parseInt(request.getParameter("txtAEnviar")));
                 co.setIdP(Integer.parseInt(request.getParameter("txtAEnviar")));
                 EntidadFinanciera ef=EntidadFinancieraBD.mostrarEntidadFinanciera(Integer.parseInt(request.getParameter("cbtipopago")));
                 co.setNumero(request.getParameter("txtNumE"));
                 co.setMonto(Float.parseFloat(request.getParameter("txtMonto")));
                 co.setObservacion(request.getParameter("txtObservacionP"));
                 co.setIdCaja(Integer.parseInt(request.getParameter("txtIdCajaCp")));
                 co.setProveedor(p);
                 co.setTipoPago("TRANSFERENCIA");;
                 co.setEntidadFinanciera(ef);
                     int indice = -1;
                 for(int i=0;i < carrito4.size();i++)
                 {
                     EgresoChequeTransPro cot=carrito4.get(i);
                     if(cot.getIdP()== p.getIdProveedor())
                     {
                         indice=i;
                         break;
                     }
                 }
                 if(indice == -1)
                 {
                     carrito4.add(co);
                 }
                 }
                 
                 sesion.setAttribute("carrito3", carrito4);
                 response.sendRedirect("registrarOtrosEgresosProveedor.jsp");
        }
private void registrarEgresoChequeTransPro(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException
{
    try{
    PrintWriter out = response.getWriter();
    HttpSession sesion=request.getSession();
    ArrayList<EgresoChequeTransPro> detalle=(ArrayList<EgresoChequeTransPro>)sesion.getAttribute("carrito3");
    boolean rpta=EgresoChequeTransProBD.GuardarEgresoChequeTransPro(detalle);
    if(rpta)
    {
        out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ({\n" +
                                        "  position: 'top-end',\n" +
                                        "  type: 'success',\n" +
                                        "  title: 'Egreso Proveedor Registrado',\n" +
                                        "  showConfirmButton: false,\n" +
                                        "  timer: 1500\n" +
                                        "});");
                            out.println("});");
                            out.println("</script>");
        request.getSession().removeAttribute("carrito3");
        RequestDispatcher rd =request.getRequestDispatcher("Ok.jsp");
                          rd.include(request, response);
        //response.sendRedirect("estadoDiario.jsp");
    }
    else
    {
                            out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Error en el registro de venta ', 'ALGO ANDA MAL REVISE LOS DATOS!','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("registrarVentaCali.jsp");
                          rd.include(request, response);
        //response.sendRedirect("mal.jsp");
    }
    }
    catch(Exception e)
            {
       
            }
}
private void eliminarEgreso(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int idCaja = Integer.parseInt(request.getParameter("txbCaja"));
            float monto = Float.parseFloat(request.getParameter("txbMonto"));
            int idEgresoCaja = Integer.parseInt(request.getParameter("txbEgresoCaja"));
             EgresoPersonal ct=new EgresoPersonal(idCaja,monto,idEgresoCaja);
             boolean rpta=EgresoPersonalBD.EliminarEgreso(ct);
             if(rpta)
             {
                 
                 response.sendRedirect("principal.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en la modificacion de Fecha','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("principal.jsp");
                          rd.include(request, response);
                          
                 //response.sendRedirect("mal.jsp");
             }
             
        }
private void guardarOtroEgreso(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int idCaja=Integer.parseInt(request.getParameter("txbCajaOE"));
            float monto=Float.parseFloat(request.getParameter("txbEfectivoOE"));
            String observacion=request.getParameter("txbOvbervacionOE");
             EgresoPersonal ep=new EgresoPersonal(monto,observacion,idCaja);
             boolean rpta=EgresoPersonalBD.GuardarOtroEgreso(ep);
             if(rpta)
             {
                  out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ({\n" +
                                        "  position: 'top-end',\n" +
                                        "  type: 'success',\n" +
                                        "  title: 'Egreso Registrado',\n" +
                                        "  showConfirmButton: false,\n" +
                                        "  timer: 1500\n" +
                                        "});");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("Ok.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("estadoDiario.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en registro de Egreso Personal','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("OtroEgreso.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
private void guardarOtroIngreso(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int idCaja=Integer.parseInt(request.getParameter("txbCajaCa"));
            float efectivo=Float.parseFloat(request.getParameter("txbEfectivoCa"));
            String observacion=request.getParameter("txbOvbervacionCa");
             Ingreso cc=new Ingreso(efectivo,observacion,idCaja);
             boolean rpta=IngresoBD.GuardarOtroIngreso(cc);
             if(rpta)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ({\n" +
                                        "  position: 'top-end',\n" +
                                        "  type: 'success',\n" +
                                        "  title: 'Ingreso Registrado Exitosamente',\n" +
                                        "  showConfirmButton: false,\n" +
                                        "  timer: 1500\n" +
                                        "});");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("Ok.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("estadoDiario.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en registro de Ingreso Personal','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("ingresoPersonal.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }

private void modificarEgresoCaja(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int id=Integer.parseInt(request.getParameter("idEgreso"));
            double monto =Double.parseDouble(request.getParameter("monto"));
            String detalle = request.getParameter("detalle");
             ArrayList det = new ArrayList();
             det.add(id);
             det.add(monto);
             det.add(detalle);
             System.out.println(id);
             boolean rpta=PersonalBD.modificarEgreso(det);            
             if(rpta==false)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en la modificacion de Cliente','error' );");
                            out.println("});");
                            out.println("</script>");
                            RequestDispatcher rd =request.getRequestDispatcher("CajaDia.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Modificacion Completada', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("CajaDia.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("cliente.jsp");
             }
             
        }

private void modificarIngresoCaja(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int id=Integer.parseInt(request.getParameter("idIngreso"));
            double monto =Double.parseDouble(request.getParameter("monto"));
            String detalle = request.getParameter("detalle");
             ArrayList det = new ArrayList();
             det.add(id);
             det.add(monto);
             det.add(detalle);
             System.out.println(id);
             boolean rpta=PersonalBD.modificarIngreso(det);            
             if(rpta==false)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en la modificacion de Cliente','error' );");
                            out.println("});");
                            out.println("</script>");
                            RequestDispatcher rd =request.getRequestDispatcher("CajaDia.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Modificacion Completada', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("CajaDia.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("cliente.jsp");
             }           
        }

    private void modificarIngresoC(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int idIngresoCaja = Integer.parseInt(request.getParameter("txtId"));
            int idCaja=Integer.parseInt(request.getParameter("txtIdCaja"));
            Date fecha =Date.valueOf(request.getParameter("txtFecha"));
            float monto=Float.parseFloat(request.getParameter("txbMontoEP"));
            String observacion=request.getParameter("txbObservacionEP");
            int idPaquete=Integer.parseInt(request.getParameter("txtIdPaquete"));
            int tipoIngreso=Integer.parseInt(request.getParameter("txtTipoIngreso"));
             Ingreso ep=new Ingreso(idIngresoCaja,fecha,monto,observacion,idPaquete,tipoIngreso,idCaja);
             boolean rpta=IngresoBD.ModificarIngresoC(ep,fecha,idCaja);
             if(rpta)
             {
                 
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en registro de Ingreso ','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("modificarIngresos.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("estadoDiario.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Ingreso  Modificado', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("modificarIngresos.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    
    private void eliminarOtroEgreso(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int idEgreso = Integer.parseInt(request.getParameter("txtId"));
            int idCaja=Integer.parseInt(request.getParameter("txtIdCaja"));
             boolean rpta=EgresoPersonalBD.EliminarOtroEgreso(idEgreso,idCaja);
             if(rpta)
             {
                 
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error al eliminar otro egreso ','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("eliminarOtroEgreso.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("estadoDiario.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Egreso eliminado', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("eliminarOtroEgreso.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    
    private void eliminarEgresoChequeTrans(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int idEgreso = Integer.parseInt(request.getParameter("txtId"));
            int idCaja=Integer.parseInt(request.getParameter("txtIdCaja"));
             boolean rpta=EgresoPersonalBD.EliminarEgresoChequeTrans(idEgreso,idCaja);
             if(rpta)
             {
                 
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error al eliminar egreso ','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("eliminarEgresoChequeTransPer.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("estadoDiario.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Egreso eliminado', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("eliminarEgresoChequeTransPer.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    
    private void eliminarEgresoChequeTransPro(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int idEgreso = Integer.parseInt(request.getParameter("txtId"));
            int idCaja=Integer.parseInt(request.getParameter("txtIdCaja"));
             boolean rpta=EgresoPersonalBD.EliminarEgresoChequeTrans(idEgreso,idCaja);
             if(rpta)
             {
                 
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error al eliminar egreso ','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("eliminarEgresoChequeTransPer.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("estadoDiario.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Egreso eliminado', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("eliminarEgresoChequeTransPer.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
    private void guardarZona(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        PrintWriter out = response.getWriter();
            String nombre = request.getParameter("txbNombreCp");
             boolean rpta=ZonaBD.guardarZona(nombre);
             if(rpta)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Registro de Zona Completado', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("zona.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("cargo.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en registro de Zona','error' );");
                            out.println("});");
                            out.println("</script>");
                            RequestDispatcher rd =request.getRequestDispatcher("zona.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             
        }
    private void modificarZona(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            PrintWriter out = response.getWriter();
            int idZona=Integer.parseInt(request.getParameter("txbIdCp"));
            String nombre = request.getParameter("txbNombreCp");
             Zona cp=new Zona(idZona,nombre);
             boolean rpta=ZonaBD.modificarZona(cp);
             if(rpta)
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Modificacion Completada', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("zona.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("mal.jsp");
             }
             else
             {
                 out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'ALGO ANDA MAL!', 'Error en la modificacion de Zona','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("zona.jsp");
                          rd.include(request, response);
                 //response.sendRedirect("index.jsp");
             }
             
        }
    private void desactivarZona(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            int idZona = Integer.parseInt(request.getParameter("txbIdCp"));
             boolean rpta=ZonaBD.desactivarZona(idZona);
             if(rpta)
             {
                 response.sendRedirect("zona.jsp");
             }
             else
             {
                 response.sendRedirect("mal.jsp");
             }
             
        }
    private void activarZona(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            int idZona = Integer.parseInt(request.getParameter("txbIdCp"));
             boolean rpta=ZonaBD.activarZona(idZona);
             if(rpta)
             {
                 response.sendRedirect("zona.jsp");
             }
             else
             {
                 response.sendRedirect("mal.jsp");
             }
             
        }
    
    private void anadirCarritoBeca(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
           HttpSession sesion = request.getSession();
                 ArrayList<contratoCali> carrito2;

            if(sesion.getAttribute("carrito")==null)
                 {
                     carrito2= new ArrayList<>();
                 }
             else
                 {
                     carrito2=(ArrayList<contratoCali>)sesion.getAttribute("carrito");
                 }
            contratoCali co = new contratoCali();
                //if("Contado".equals(request.getParameter("cbtipopago"))){
                 Cliente c =ClienteBD.mostrarCliente(Integer.parseInt(request.getParameter("txtIdClienteC")));
                 Paquete pq =PaqueteBD.MostrarPaquete(Integer.parseInt(request.getParameter("txtPrecioC")));
                 co.setIdCliente(Integer.parseInt(request.getParameter("txtIdClienteC")));
                 co.setFechaInicio(request.getParameter("txtFechaInic"));
                 co.setFechaFin(request.getParameter("txtFechaFinc"));
                 co.setIdPaquete(Integer.parseInt(request.getParameter("txtPrecioC")));
                 co.setIdCaja(Integer.parseInt(request.getParameter("txtIdCajaC")));
                 co.setCliente(c);
                 co.setPaquete(pq);
                 co.setTipoPago("Contado");
                 co.setRF(request.getParameter("cbtipoCF"));
                 co.setNumero("0000");
                 co.setMotivo(request.getParameter("txtMotivo"));
                 int indice = -1;
                 for(int i=0;i < carrito2.size();i++)
                 {
                     contratoCali cot=carrito2.get(i);
                     if(cot.getIdCliente()== c.getIdCliente())
                     {
                         indice=i;
                         break;
                     }
                 }
                 if(indice == -1)
                 {
                     carrito2.add(co);
                 }
                 //}
                 //else if(!"Contado".equals(request.getParameter("cbtipopago"))){
                 //     Cliente c =ClienteBD.mostrarCliente(Integer.parseInt(request.getParameter("txtIdClienteC")));
                 //Paquete pq =PaqueteBD.MostrarPaquete(Integer.parseInt(request.getParameter("txtPrecioC")));
                 //EntidadFinanciera ef=EntidadFinancieraBD.mostrarEntidadFinanciera(Integer.parseInt(request.getParameter("cbtipopago")));
                 //co.setIdCliente(Integer.parseInt(request.getParameter("txtIdClienteC")));
                 //co.setFechaInicio(request.getParameter("txtFechaInic"));
                 //co.setFechaFin(request.getParameter("txtFechaFinc"));
                 //co.setIdPaquete(Integer.parseInt(request.getParameter("txtPrecioC")));
                 //co.setIdCaja(Integer.parseInt(request.getParameter("txtIdCajaC")));
                 //co.setCliente(c);
                 //co.setPaquete(pq);
                 //co.setEntidadFinanciera(ef);
                 //    co.setTipoPago("Tarjeta");
                 //    co.setNumeroTarjeta(request.getParameter("txtNumTarjeta"));
                 //    co.setRF(request.getParameter("cbtipoCF"));
                 //    co.setNumero(request.getParameter("txtNumeroRF"));
                 //    co.setMotivo(request.getParameter("txtMotivo"));
                 //    int indice = -1;
                 //for(int i=0;i < carrito2.size();i++)
                 //{
                 //    contratoCali cot=carrito2.get(i);
                 //    if(cot.getIdCliente()== c.getIdCliente())
                 //    {
                 //        indice=i;
                 //        break;
                 //    }
                 //}
                 //if(indice == -1)
                 //{
                 //    carrito2.add(co);
                 //}
                 //}
                 
                 sesion.setAttribute("carrito", carrito2);
                 response.sendRedirect("registrarVentaBeca.jsp");
             
        }
    
    private void registrarVentaBeca(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException
{
    try{
    PrintWriter out = response.getWriter();
    HttpSession sesion=request.getSession();
    Ingreso i=new Ingreso();
    CuentaXCobrarMembresia cxcm = new CuentaXCobrarMembresia();
    IngresoCuentaXCobrar icxc = new IngresoCuentaXCobrar();
    i.setEfectivo(Float.parseFloat(request.getParameter("txtMontoC").toUpperCase()));
    i.setIdCaja(Integer.parseInt(request.getParameter("txtIdCajaC").toUpperCase()));
    ArrayList<contratoCali> detalle=(ArrayList<contratoCali>)sesion.getAttribute("carrito");
    boolean rpta=CompraMembresiaBD.CompraMembresiaBeca(cxcm,icxc,i,detalle);
        System.out.println(rpta);
    if(rpta)
    {
        out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Membresia Registrada', 'CON EXITO!','success' );");
                            out.println("});");
                            out.println("</script>");
        request.getSession().removeAttribute("carrito");
        RequestDispatcher rd =request.getRequestDispatcher("Ok.jsp");
                          rd.include(request, response);
        //response.sendRedirect("estadoDiario.jsp");
    }
    else
    {
                            out.println("<script src=\"js/jquery.min.js\"></script>");
                            out.println("<script src=\"js/sweetalert2.all.js\"></script>");
                            out.println("<script>");
                            out.println("$(document).ready(function(){");
                            out.println("swal ( 'Error en el registro de venta ', 'ALGO ANDA MAL REVISE LOS DATOS!','error' );");
                            out.println("});");
                            out.println("</script>");
                          RequestDispatcher rd =request.getRequestDispatcher("registrarVentaBeca.jsp");
                          rd.include(request, response);
        //response.sendRedirect("mal.jsp");
    }
    }     
    catch(Exception e)
            {
       
            }
}
    }

