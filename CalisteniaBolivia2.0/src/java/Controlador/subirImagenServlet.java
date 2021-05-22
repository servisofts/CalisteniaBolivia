package Controlador;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

import org.apache.commons.fileupload.*;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import java.util.*;

/**
 *
 * @author Tarde
 */
@WebServlet(name = "subirImagenServlet", urlPatterns = {"/subirImagenServlet"})
public class subirImagenServlet extends HttpServlet {

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
        // si se quiere comprobar que es un request de ficheros
        //boolean isMultipart = ServletFileUpload.isMultipartContent(request);
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        boolean flag = false;
        String fileName = "";
        List fileItems = null;
        String path = getServletContext().getRealPath("/") + "imagenes/";
        String rutaFichero = "";

        try {
            // construimos el objeto que es capaz de parsear la perición
            DiskFileItemFactory factory = new DiskFileItemFactory();

            // tamaño por encima del cual los ficheros son escritos directamente en disco
            factory.setSizeThreshold(4096);
            // directorio en el que se escribirán los ficheros con tamaño superior al soportado en memoria
            factory.setRepository(new File(path + "/"));

            // nuevo manejador para el fichero
            ServletFileUpload upload = new ServletFileUpload(factory);
            // maximo numero de bytes
            upload.setSizeMax(1024 * 512);
            // ordenamos procesar los ficheros
            fileItems = upload.parseRequest(request);
            if (fileItems == null) {
                flag = false;
            }
            // Iteramos por cada fichero
            Iterator i = fileItems.iterator();
            FileItem actual = null;

            if (i.hasNext()) {

                actual = (FileItem) i.next();
                fileName = actual.getName();

                // construimos un objeto file para recuperar el trayecto completo
                File fichero = new File(fileName);
                // nos quedamos solo con el nombre y descartamos el path
                fichero = new File(path + fichero.getName());
                // escribimos el fichero colgando del nuevo path
                actual.write(fichero);

                flag = true;
                rutaFichero = fichero.getName();
            }
        } catch (Exception e) {
            out.println(e.getMessage());
        }

        //////////////////////////////////////////////////////////////////////////////////////
        request.setAttribute("rutaFichero", rutaFichero);
        request.setAttribute("subido", flag);
        request.getRequestDispatcher("/cliente.jsp").forward(request, response);

        out.close();
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
