/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author ruddy
 */
@WebServlet(name = "comprobante", urlPatterns = {"/comprobante"})
public class comprobante extends HttpServlet {

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
        try{
            response.setContentType("text/html;charset=UTF-8");
            String resp="";
            String data_ = request.getParameter("data");

            if(data_==null){
                resp += "<h2>Bienvenido a la conexion Strasol</h2>\n";
                resp += "<div>* Para comunicarse con nosotros debe escribirnos en formato json.</div>\n";
                resp += "<div>* Intente enviarnos un json tipo <a href=\"http://ruddypazd.com/comprobante?data={type:'help'}\">http://ruddypazd.com/comprobante?data={type:'help'}</a>.</div>\n";
                response.getWriter().write(resp);
                return;
            }
            JSONObject data = new JSONObject(data_);
            if(data.has("type")){
                switch(data.getString("type")){
                    case "help":
                        help(data, request, response);
                        break;
                    case "getComprobantes":
                        getComprobantes(data, request, response);
                        break;
                    case "setComprobantes":
                        setComprobantes(data, request, response);
                        break;
                }
            }else{
                resp += "<h2>Bienvenido a la conexion Strasol</h2>\n";
                resp += "<div>* Estas por buen camino, pero no enviaste el atributo 'type'.</div>\n";
                resp += "<div>* Intente enviarnos un json tipo <a href=\"http://ruddypazd.com/comprobante?data={type:'help'}\">http://ruddypazd.com/comprobante?data={type:'help'}</a>.</div>\n";
                response.getWriter().write(resp);
                return;
            }
        }catch(Exception e){
            e.printStackTrace();
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

    private void help(JSONObject data, HttpServletRequest request, HttpServletResponse response) throws IOException {
        SimpleDateFormat formato = new SimpleDateFormat("MM/yyyy");
        String shoy = formato.format(new Date());
        String resp="";
        resp += "<h2>Bienvenido a la conexion Strasol</h2>\n";
        resp += "<div>* Escogiste el atributo help, por el momento solo tenemos dos opciones:</div>\n";
        resp += "<ol>\n";
        resp += "<li>Obtener los comprobantes de un MM/YYYY determinado.</li>\n";
        resp += "<li>Crear un comprobante.</li>\n";
        resp += "</ol>\n";
        
        resp += "<div>Para obtener los comprobantes de una fecha determinada haga un post a <a href=\"http://ruddypazd.com/comprobante?data={type:'getComprobantes',data:{fecha:'"+shoy+"'}}\">http://ruddypazd.com/comprobante?data={type:'getComprobantes',data:{fecha:'"+shoy+"'}}</a>.</div>\n";
        resp += "<div>Para generar un comprobante haga un post a <a href=\"http://ruddypazd.com/comprobante?data={type:'setComprobantes',data:{tipo:'I'}}\">http://ruddypazd.com/comprobante?data={id_usuario_registra:'A002',type:'setComprobantes',data:{tipo:'I', glosa:'Alguna glosa', observacion:'alguna observacion', detalle:[{codigo:'1-01-01-1-01-01', auxiliar:'scz1', debe:0, haber:100, moneda:'bolivianos'},{codigo:'1-01-01-1-01-01', auxiliar:'lpz1', debe:14.36, haber:0, glosa:'alguna glosita', moneda:'dolares'}]}}</a>.</div>\n";
        response.getWriter().write(resp);
    }

    private void getComprobantes(JSONObject data, HttpServletRequest request, HttpServletResponse response) throws IOException, JSONException {
        SimpleDateFormat formato = new SimpleDateFormat("MM/yyyy");
        String shoy = formato.format(new Date());
        if(data.has("data")){
            if(data.getJSONObject("data").has("fecha")){
                String fecha = data.getJSONObject("data").getString("fecha");
                String consulta = "select JSON_arrayagg(JSON_OBJECT(\n" +
                                    "CON_COMPROBANTE.CODIGO,\n" +
                                    "key 'TIPO' value case when CON_COMPROBANTE.TIPO = '0.0' then 'Ingreso' when CON_COMPROBANTE.TIPO = '1.0' then 'Egreso' else 'Traspaso' end,\n" +
                                    "key 'FECHA' value TO_CHAR(CON_COMPROBANTE.FECHA, 'DD/MM/RRRR')\n" +
                                    ") returning clob) as json\n" +
                                    "from BROKER.CON_COMPROBANTE\n" +
                                    "where to_char(CON_COMPROBANTE.FECHA,'MM/RRRR') = '"+fecha+"' \n" +
                                    "and CON_COMPROBANTE.ESTADO_RECURRENTE = 0\n" +
                                    "and CON_COMPROBANTE.ESTADO_ANULADO = 0 \n" +
                                    "order by CON_COMPROBANTE.FECHA_REGSITRO";
                
                //response.getWriter().write(new JSON().clobToString(consulta,con));
                response.getWriter().write(consulta);
            }else{
                String resp="";
                resp += "<h2>Bienvenido a la conexion Strasol</h2>\n";
                resp += "<div>* Escogiste el atributo getComprobantes pero no me enviaste un fecha dentro de tu atributo data.</div>\n";
                resp += "<div>Para obtener los comprobantes de una fecha determinada haga un post a <a href=\"http://ruddypazd.com/comprobante?data={type:'getComprobantes',data:{fecha:'"+shoy+"'}}\">http://ruddypazd.com/comprobante?data={type:'getComprobantes',data:{fecha:'"+shoy+"'}}</a>.</div>\n";
                response.getWriter().write(resp);
            }
        }else{
            String resp="";
            resp += "<h2>Bienvenido a la conexion Strasol</h2>\n";
            resp += "<div>* Escogiste el atributo getComprobantes pero no me enviaste un data.</div>\n";
            resp += "<div>Para obtener los comprobantes de una fecha determinada haga un post a <a href=\"http://ruddypazd.com/comprobante?data={type:'getComprobantes',data:{fecha:'"+shoy+"'}}\">http://ruddypazd.com/comprobante?data={type:'getComprobantes',data:{fecha:'"+shoy+"'}}</a>.</div>\n";
            response.getWriter().write(resp);
        }
    }

    private void setComprobantes(JSONObject data, HttpServletRequest request, HttpServletResponse response) throws JSONException, IOException {
        SimpleDateFormat formato = new SimpleDateFormat("MM/yyyy");
        String shoy = formato.format(new Date());
        if(data.has("data")){
            if(data.getJSONObject("data").has("fecha")){
                String fecha = data.getJSONObject("data").getString("fecha");
                String resp = "armaremos el comprobante";
                response.getWriter().write(resp);
            }else{
                String resp="";
                resp += "<h2>Bienvenido a la conexion Strasol</h2>\n";
                resp += "<div>* Escogiste el atributo setComprobantes pero no me enviaste un fecha dentro de tu atributo data.</div>\n";
                resp += "<div>Para generar un comprobante haga un post a <a href=\"http://ruddypazd.com/comprobante?data={type:'setComprobantes',data:{tipo:'I'}}\">http://ruddypazd.com/comprobante?data={type:'setComprobantes',data:{id_usuario_registra:'A001', tipo:'I', glosa:'Alguna glosa', observacion:'alguna observacion', detalle:[{codigo:'1-01-01-1-01-01', auxiliar:'scz1', debe:0, haber:100, moneda:'bolivianos'},{codigo:'1-01-01-1-01-01', auxiliar:'lpz1', debe:14.36, haber:0, glosa:'alguna glosita', moneda:'dolares'}]}}</a>.</div>\n";
                response.getWriter().write(resp);
            }
        }else{
            String resp="";
            resp += "<h2>Bienvenido a la conexion Strasol</h2>\n";
            resp += "<div>* Escogiste el atributo setComprobantes pero no me enviaste un data.</div>\n";
            resp += "<div>Para generar un comprobante haga un post a <a href=\"http://ruddypazd.com/comprobante?data={type:'setComprobantes',data:{tipo:'I'}}\">http://ruddypazd.com/comprobante?data={id_usuario_registra:'A002',type:'setComprobantes',data:{tipo:'I', glosa:'Alguna glosa', observacion:'alguna observacion', detalle:[{codigo:'1-01-01-1-01-01', auxiliar:'scz1', debe:0, haber:100, moneda:'bolivianos'},{codigo:'1-01-01-1-01-01', auxiliar:'lpz1', debe:14.36, haber:0, glosa:'alguna glosita', moneda:'dolares'}]}}</a>.</div>\n";
            response.getWriter().write(resp);
        }
    }

}
