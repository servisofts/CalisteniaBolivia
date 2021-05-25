/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;

import Modelo.Cliente;
import Modelo.ClienteBD;
import Modelo.ClienteCump;
import Modelo.Zona;
import Modelo.ZonaBD;
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
 * @author pc
 */
@WebServlet(name = "VencimientoServlet", urlPatterns = {"/VencimientoServlet"})
public class VencimientoServlet extends HttpServlet {

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
            out.println("<title>Servlet VencimientoServlet</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet VencimientoServlet at " + request.getContextPath() + "</h1>");
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
            int nroC=0,nroCB=0;
            String sC,sCB;
            ArrayList<Cliente> listacc = ClienteBD.mostrarCantidadContratoActivos();
                                for (Cliente cl : listacc) {
                                    nroC = cl.getIdCliente();
                                }

                                ArrayList<Cliente> listacc2 = ClienteBD.mostrarCantidadContratoActivosBoxeo();
                                for (Cliente cl : listacc2) {
                                    nroCB = cl.getIdCliente();
                                }
                                sC = String.valueOf(nroC);
                                sCB = String.valueOf(nroCB);
            int vcn=ClienteBD.vencCaliN();
            int vcs=ClienteBD.vencCaliS();
            int vbn=ClienteBD.vencBoxN();
            int vbs=ClienteBD.vencBoxS();
            int vtn=ClienteBD.vencTotalN();
            int vts=ClienteBD.vencTotalS();
            int acn=ClienteBD.activosCaliN();
            int acs=ClienteBD.activosCaliS();
            int abn=ClienteBD.activosBoxN();
            int abs=ClienteBD.activosBoxS();
            int an=ClienteBD.activosN();
            int as=ClienteBD.activosS();
            
            java.util.Date date = new Date();
            java.sql.Date inicio = new java.sql.Date(date.getTime());
            int año = inicio.getYear()+1900;
            int mes = inicio.getMonth()+1;
            int dia = inicio.getDate();
            
            String fechaIni = año+"-"+mes+"-"+"01";
            String fechaFin = año+"-"+mes+"-"+dia;
            
            int año1=0;
            int mes1=0;
            if(mes==1)
            {
                año1 = inicio.getYear()+1900-1;
                mes1 = inicio.getMonth()+11;
            }else{
                año1 = inicio.getYear()+1900;
                mes1 = inicio.getMonth();
            }
            
            String fechaIniA = año1+"-"+mes1+"-"+"01";
            String fechaFinA = año1+"-"+mes1+"-"+"31";
            
            SimpleDateFormat sdfi = new SimpleDateFormat("yyyy-MM-dd");
            java.util.Date datei = sdfi.parse(fechaIni);
            java.sql.Date fechaini = new java.sql.Date(datei.getTime());
            
            java.util.Date datef = sdfi.parse(fechaFin);
            java.sql.Date fechafin = new java.sql.Date(datef.getTime());
            
            java.util.Date dateia = sdfi.parse(fechaIniA);
            java.sql.Date fechainiA = new java.sql.Date(dateia.getTime());
            
            java.util.Date datefa = sdfi.parse(fechaFinA);
            java.sql.Date fechafinA = new java.sql.Date(datefa.getTime());
            
            System.out.println(fechaIniA);
            System.out.println(fechaFinA);
            System.out.println(fechaIni);
            System.out.println(fechaFin);
            
            
            //DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
	    //Date date = new Date();
	    //System.out.println(dateFormat.format(date));
            
            int regCaliTN = ClienteBD.regCaliTN(fechaini,fechafin);
            int regBoxTN = ClienteBD.regBoxTN(fechaini,fechafin);
            int totalTN = ClienteBD.regCaliTN(fechaini,fechafin)+ClienteBD.regBoxTN(fechaini,fechafin);
            int regCaliTS = ClienteBD.regCaliTS(fechaini,fechafin);
            int regBoxTS = ClienteBD.regBoxTS(fechaini,fechafin);
            int totalTS = ClienteBD.regCaliTS(fechaini,fechafin)+ClienteBD.regBoxTS(fechaini,fechafin);
            
            int regCaliTNA = ClienteBD.regCaliTN(fechainiA,fechafinA);
            int regBoxTNA = ClienteBD.regBoxTN(fechainiA,fechafinA);
            int totalTNA = ClienteBD.regCaliTN(fechainiA,fechafinA)+ClienteBD.regBoxTN(fechainiA,fechafinA);
            int regCaliTSA = ClienteBD.regCaliTS(fechainiA,fechafinA);
            int regBoxTSA = ClienteBD.regBoxTS(fechainiA,fechafinA);
            int totalTSA = ClienteBD.regCaliTS(fechainiA,fechafinA)+ClienteBD.regBoxTS(fechainiA,fechafinA);
            
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
        
        ArrayList<Zona> z = ZonaBD.clienteZona();
        String data = "";
        for(int j = 0;j<z.size();j++)
        {
            String nombr = z.get(j).getNombre();
            int cant = z.get(j).getCantidad();
            if(j==0)
            {

                data= data + "{"+"name: '"+nombr+"',"+"y: "+cant+",sliced: true,"+"selected: true}";
            }else{
                data= data + ",{"+"name: '"+nombr+"',"+"y: "+cant+"}";
            }        
        }
            String s=
            "<div class="+"box-body"+" id="+"graph1"+">"+
              "<div id="+"container"+"></div>"+
            "</div>"+ 
                "<div id="+"pieChart"+" class="+"'col-md-6 col-sm-6 col-xs-12'"+"></div>"+
                "<div id="+"tablaCump"+" class="+"'col-md-6 col-sm-6 col-xs-12'"+">"
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
            "</div>"+
"<script type="+"text/javascript"+">"+
"Highcharts.chart('container', {"+
    "chart: {"+
        "type: 'bar'"+
    "},"+
    "title: {"+
        "text: 'Membresias Activas y Vendidas'"+
    "},"+
    "subtitle: {"+
        "text: 'Source: www.calisteniaboliviasc.com'"+
    "},"+
    "xAxis: {"+
        "categories: ['Calistenia(Norte)', 'Calistenia(Sur)', 'Box(Norte)', 'Box(Sur)', 'Total(Norte)', 'Total(Sur)'],"+
        "title: {"+
            "text: null"+
        "}"+
    "},"+
    "yAxis: {"+
        "min: 0,"+
        "title: {"+
            "text: 'Clientes',"+
            "align: 'high'"+
        "},"+
        "labels: {"+
            "overflow: 'justify'"+
        "}"+
    "},"+
    "plotOptions: {"+
        "bar: {"+
            "dataLabels: {"+
                "enabled: true"+
            "}"+
        "}"+
    "},"+
    "legend: {"+
        "layout: 'vertical',"+
        "align: 'right',"+
        "verticalAlign: 'top',"+
        "x: -40,"+
        "y: 80,"+
        "floating: true,"+
        "borderWidth: 1,"+
        "backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),"+
        "shadow: true"+
    "},"+
    "credits: {"+
        "enabled: false"+
    "},"+
    "series: [{"+
        "name: 'Membresia Activa',"+
        "data: ["+acn+", "+acs+", "+abn+", "+abs+", "+an+", "+as+"]"+
    "}, {"+
        "name: 'Membresias Mes Actual',"+
        "data: ["+regCaliTN+", "+regCaliTS+", "+regBoxTN+", "+regBoxTS+", "+totalTN+", "+totalTS+"]"+
    "}, {"+
        "name: 'Membresias Mes Anterior',"+
        "data: ["+regCaliTNA+", "+regCaliTSA+", "+regBoxTNA+", "+regBoxTSA+", "+totalTNA+", "+totalTSA+"]"+
    "}]"+
"});"+
                "</script>"+

"<script type='text/javascript'>"+
    "Highcharts.chart('pieChart', {  "+
    "chart: {"+
        "plotBackgroundColor: null,"+
        "plotBorderWidth: null,"+
        "plotShadow: false,"+
        "type: 'pie'"+
    "},"+
    "title: {"+
        "text: 'Porcentaje de clientes activos por zona'"+
    "},"+
    "tooltip: {"+
        "pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'"+
    "},"+
    "plotOptions: {"+
        "pie: {"+
            "allowPointSelect: true,"+
            "cursor: 'pointer',"+
            "dataLabels: {"+
                "enabled: true,"+
                "format: '<b>{point.name}</b>: {point.percentage:.1f} %',"+
                "style: {"+
                    "color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'"+
                "}"+
            "}"+
        "}"+
    "},"+
    "series: [{"+
        "name: 'Porcentaje de clientes',"+
        "colorByPoint: true,"+
        "data: ["+data+"]"+
    "}]"+
"});"+
"</script>";
            String aux = "{"+
            "name: 'Calistenia',"+
            "y: "+nroC+","+
            "sliced: true,"+
            "selected: true"+
        "}, {"+
            "name: 'Boxeo',"+
            "y: "+nroCB+
        "}";
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
