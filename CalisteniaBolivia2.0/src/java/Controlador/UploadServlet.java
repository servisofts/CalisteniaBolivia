/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import Modelo.Cliente;
import Modelo.ClienteBD;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import javax.imageio.ImageIO;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.imgscalr.Scalr;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author pc
 */
@MultipartConfig
@WebServlet(name = "UploadServlet", urlPatterns = {"/UploadServlet"})
public class UploadServlet extends HttpServlet {

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
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        
        if (request.getParameter("getfile") != null && !request.getParameter("getfile").isEmpty()) {
            File file = new File(request.getSession().getServletContext().getRealPath("/")+"/images/"+request.getParameter("getfile"));
            if (file.exists()) {
                int bytes = 0;
                ServletOutputStream op = response.getOutputStream();

                response.setContentType(getMimeType(file));
                response.setContentLength((int) file.length());
                response.setHeader( "Content-Disposition", "inline; filename=\"" + file.getName() + "\"" );

                byte[] bbuf = new byte[1024];
                DataInputStream in = new DataInputStream(new FileInputStream(file));

                while ((in != null) && ((bytes = in.read(bbuf)) != -1)) {
                    op.write(bbuf, 0, bytes);
                }

                in.close();
                op.flush();
                op.close();
            }
        } else if (request.getParameter("delfile") != null && !request.getParameter("delfile").isEmpty()) {
            File file = new File(request.getSession().getServletContext().getRealPath("/")+"/images/"+ request.getParameter("delfile"));
            if (file.exists()) {
                file.delete(); // TODO:check and report success
            } 
        } else if (request.getParameter("getthumb") != null && !request.getParameter("getthumb").isEmpty()) {
            File file = new File(request.getSession().getServletContext().getRealPath("/")+"/images/"+request.getParameter("getthumb"));
                if (file.exists()) {
                    System.out.println(file.getAbsolutePath());
                    String mimetype = getMimeType(file);
                    if (mimetype.endsWith("png") || mimetype.endsWith("jpeg")|| mimetype.endsWith("jpg") || mimetype.endsWith("gif")) {
                        BufferedImage im = ImageIO.read(file);
                        if (im != null) {
                            BufferedImage thumb = Scalr.resize(im, 75); 
                            ByteArrayOutputStream os = new ByteArrayOutputStream();
                            if (mimetype.endsWith("png")) {
                                ImageIO.write(thumb, "PNG" , os);
                                response.setContentType("image/png");
                            } else if (mimetype.endsWith("jpeg")) {
                                ImageIO.write(thumb, "jpg" , os);
                                response.setContentType("image/jpeg");
                            } else if (mimetype.endsWith("jpg")) {
                                ImageIO.write(thumb, "jpg" , os);
                                response.setContentType("image/jpeg");
                            } else {
                                ImageIO.write(thumb, "GIF" , os);
                                response.setContentType("image/gif");
                            }
                            ServletOutputStream srvos = response.getOutputStream();
                            response.setContentLength(os.size());
                            response.setHeader( "Content-Disposition", "inline; filename=\"" + file.getName() + "\"" );
                            os.writeTo(srvos);
                            srvos.flush();
                            srvos.close();
                        }
                    }
            } // TODO: check and report success
        } else {
            PrintWriter writer = response.getWriter();
            writer.write("call POST with multipart form data");
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @SuppressWarnings("unchecked")
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        if (!ServletFileUpload.isMultipartContent(request)) {
            throw new IllegalArgumentException("Request is not multipart, please 'multipart/form-data' enctype for your form.");
        }

        ServletFileUpload uploadHandler = new ServletFileUpload(new DiskFileItemFactory());
        PrintWriter writer = response.getWriter();
        //response.setContentType("application/json");
        JSONArray json = new JSONArray();
        try {
            //List<FileItem> items = uploadHandler.parseRequest(request);
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
            boolean isMultipart = ServletFileUpload.isMultipartContent(request);
            // Create a factory for disk-based file items
            DiskFileItemFactory factory = new DiskFileItemFactory();

            // Configure a repository (to ensure a secure temp location is used)
            ServletContext servletContext = this.getServletConfig().getServletContext();
            File repository = (File) servletContext.getAttribute("javax.servlet.context.tempdir");
            factory.setRepository(repository);

            // Create a new file upload handler
            ServletFileUpload upload = new ServletFileUpload(factory);
            ArrayList<String> l1 = new ArrayList();
            ArrayList<String> l2 = new ArrayList();
            String s="";

            // Parse the request
            List<FileItem> items = upload.parseRequest(request);
            Iterator<FileItem> iter = items.iterator();
            while (iter.hasNext()) {
                FileItem item = iter.next();

                if (item.isFormField()) {
                    String name = item.getFieldName();
                    String value = item.getString();
                    l1.add(name);
                    l2.add(value);
                }else if (!item.isFormField()) {
                    s=item.getName();
                }
            }
            System.out.println("---------------------------------------------------------------------------");
            PrintWriter out = response.getWriter();
            String nombre = l2.get(0);
            System.out.println(nombre);
            String apellido=l2.get(1);
            String edad=l2.get(2);
            int ci=Integer.parseInt(l2.get(3));
            String telefono=l2.get(4);
            String correo=l2.get(5);
            String imagen=s;
            int idSucursal=Integer.parseInt(l2.get(6));
            int idZona=Integer.parseInt(l2.get(7));
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
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////
            for (FileItem item : items) {
                if (!item.isFormField()) {
                        File file = new File(request.getSession().getServletContext().getRealPath("/")+"/images/", item.getName());
                        item.write(file);
                        JSONObject jsono = new JSONObject();
                        jsono.put("name", item.getName());
                        jsono.put("size", item.getSize());
                        jsono.put("url", "UploadServlet?getfile=" + item.getName());
                        jsono.put("thumbnail_url", "UploadServlet?getthumb=" + item.getName());
                        jsono.put("delete_url", "UploadServlet?delfile=" + item.getName());
                        jsono.put("delete_type", "GET");
                        json.put(jsono);
                        System.out.println(json.toString());
                }
            }
        } catch (FileUploadException e) {
                throw new RuntimeException(e);
        } catch (Exception e) {
                throw new RuntimeException(e);
        } finally {
            writer.write(json.toString());
            writer.close();
        }

    }

    private String getMimeType(File file) {
        String mimetype = "";
        if (file.exists()) {
            if (getSuffix(file.getName()).equalsIgnoreCase("png")) {
                mimetype = "image/png";
            }else if(getSuffix(file.getName()).equalsIgnoreCase("jpg")){
                mimetype = "image/jpg";
            }else if(getSuffix(file.getName()).equalsIgnoreCase("jpeg")){
                mimetype = "image/jpeg";
            }else if(getSuffix(file.getName()).equalsIgnoreCase("gif")){
                mimetype = "image/gif";
            }else {
                javax.activation.MimetypesFileTypeMap mtMap = new javax.activation.MimetypesFileTypeMap();
                mimetype  = mtMap.getContentType(file);
            }
        }
        return mimetype;
    }



    private String getSuffix(String filename) {
        String suffix = "";
        int pos = filename.lastIndexOf('.');
        if (pos > 0 && pos < filename.length() - 1) {
            suffix = filename.substring(pos + 1);
        }
        return suffix;
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
            String imagen=request.getParameter("imagen");
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

}
