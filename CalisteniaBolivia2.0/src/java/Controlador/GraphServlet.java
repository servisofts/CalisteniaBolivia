/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;

import Modelo.Cliente;
import Modelo.ClienteBD;
import Modelo.SucursalBD;
import Modelo.TotalMonto;
import Modelo.TotalMontoBD;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
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
@WebServlet(name = "GraphServlet", urlPatterns = {"/GraphServlet"})
public class GraphServlet extends HttpServlet {

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
            out.println("<title>Servlet GraphServlet</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet GraphServlet at " + request.getContextPath() + "</h1>");
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
        try {
            
            String suc = request.getParameter("suc");
            ArrayList<Integer> pers;
            if(suc.equals("Todas")){
                pers = SucursalBD.getPersonalSuc(1);
                ArrayList<Integer> pers2 = SucursalBD.getPersonalSuc(2);
                for(int i=0;i<pers2.size();i++)
                {
                    pers.add(pers2.get(i));
                }
            }else{
                int idSuc = SucursalBD.getIdSuc(suc);
                pers = SucursalBD.getPersonalSuc(idSuc);
            }
            
            
            String ini = request.getParameter("inicio");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            java.util.Date date = sdf.parse(ini);
            java.sql.Date inicio = new java.sql.Date(date.getTime());
            
            String fi = request.getParameter("fin");
            SimpleDateFormat sdfi = new SimpleDateFormat("yyyy-MM-dd");
            java.util.Date datef = sdfi.parse(fi);
            java.sql.Date fin = new java.sql.Date(datef.getTime());
            
            String año = request.getParameter("inicio");
            SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd");
            java.util.Date date2 = sdf2.parse(año);
            java.sql.Date ab = new java.sql.Date(date2.getTime());
            LocalDate localDate = ab.toLocalDate();
            int a=localDate.getYear();
            
            String en = a+"-01-01";
            String enf = a+"-01-31";
            String feb = a+"-02-01";
            String febf = a+"-02-28";
            String mar = a+"-03-01";
            String marf = a+"-03-31";
            String abr = a+"-04-01";
            String abrf = a+"-04-30";
            String may = a+"-05-01";
            String mayf = a+"-05-31";
            String jun = a+"-06-01";
            String junf = a+"-06-30";
            String jul = a+"-07-01";
            String julf = a+"-07-31";
            String ago = a+"-08-01";
            String agof = a+"-08-31";
            String sep = a+"-09-01";
            String sepf = a+"-09-30";
            String oct = a+"-10-01";
            String octf = a+"-10-31";
            String nov = a+"-11-01";
            String novf = a+"-11-30";
            String dic = a+"-12-01";
            String dicf = a+"-12-31";
            
            java.util.Date enei = sdf.parse(en);
            java.sql.Date eneroi = new java.sql.Date(enei.getTime());
            java.util.Date enef = sdf.parse(enf);
            java.sql.Date enerof = new java.sql.Date(enef.getTime());
            
            java.util.Date febi = sdf.parse(feb);
            java.sql.Date  febreroi = new java.sql.Date(febi.getTime());
            java.util.Date febfi = sdf.parse(febf);
            java.sql.Date febrerof = new java.sql.Date(febfi.getTime());
            
            java.util.Date mari = sdf.parse(mar);
            java.sql.Date  marzoi = new java.sql.Date(mari.getTime());
            java.util.Date marfi = sdf.parse(marf);
            java.sql.Date marzof = new java.sql.Date(marfi.getTime());
            
            java.util.Date abri = sdf.parse(abr);
            java.sql.Date  abrili = new java.sql.Date(abri.getTime());
            java.util.Date abrfi = sdf.parse(abrf);
            java.sql.Date abrilf = new java.sql.Date(abrfi.getTime());
            
            java.util.Date mayi = sdf.parse(may);
            java.sql.Date  mayoi = new java.sql.Date(mayi.getTime());
            java.util.Date mayfi = sdf.parse(mayf);
            java.sql.Date mayof = new java.sql.Date(mayfi.getTime());
            
            java.util.Date juni = sdf.parse(jun);
            java.sql.Date  junioi = new java.sql.Date(juni.getTime());
            java.util.Date junfi = sdf.parse(junf);
            java.sql.Date juniof = new java.sql.Date(junfi.getTime());
            
            java.util.Date juli = sdf.parse(jul);
            java.sql.Date  julioi = new java.sql.Date(juli.getTime());
            java.util.Date julfi = sdf.parse(julf);
            java.sql.Date juliof = new java.sql.Date(julfi.getTime());
            
            java.util.Date agoi = sdf.parse(ago);
            java.sql.Date  agostoi = new java.sql.Date(agoi.getTime());
            java.util.Date agofi = sdf.parse(agof);
            java.sql.Date  agostof = new java.sql.Date(agofi.getTime());
            
            java.util.Date sepi = sdf.parse(sep);
            java.sql.Date  septiembrei = new java.sql.Date(sepi.getTime());
            java.util.Date sepfi = sdf.parse(sepf);
            java.sql.Date septiembref = new java.sql.Date(sepfi.getTime());
            
            java.util.Date octi = sdf.parse(oct);
            java.sql.Date  octubrei = new java.sql.Date(octi.getTime());
            java.util.Date octfi = sdf.parse(octf);
            java.sql.Date octubref = new java.sql.Date(octfi.getTime());
            
            java.util.Date novi = sdf.parse(nov);
            java.sql.Date  noviembrei = new java.sql.Date(novi.getTime());
            java.util.Date novfi = sdf.parse(novf);
            java.sql.Date noviembref = new java.sql.Date(novfi.getTime());
            
            java.util.Date dici = sdf.parse(dic);
            java.sql.Date  diciembrei = new java.sql.Date(dici.getTime());
            java.util.Date dicfi = sdf.parse(dicf);
            java.sql.Date diciembref = new java.sql.Date(dicfi.getTime());
            
            double ingCal=0; double ingBox=0;double ingCalT=0;double ingBoxT=0;double ingOtros=0;double ingEf=0;
            double ingTar=0;double egr=0;double egrCXC=0;double egrTransP=0;double egrCheTrans=0;double egrOtros=0;
            double ingresos=0;double egresos=0;double beneficios=0;double ingresosf=0;double egresosf=0;
            double beneficiosf=0;double ingresosm=0;double egresosm=0;double beneficiosm=0;double ingresosa=0;
            double egresosa=0;double beneficiosa=0;double ingresosma=0;double egresosma=0;double beneficiosma=0;
            double ingresosj=0;double egresosj=0;double beneficiosj=0;double ingresosju=0;double egresosju=0;
            double beneficiosju=0;double ingresosag=0;double egresosag=0;double beneficiosag=0;double ingresossep=0;
            double egresossep=0;double beneficiossep=0;double ingresosoct=0;double egresosoct=0;double beneficiosoct=0;
            double ingresosnov=0;double egresosnov=0;double beneficiosnov=0;double ingresosdic=0;double egresosdic=0;
            double beneficiosdic=0;
            double ingCalEne = 0; double ingCalFeb = 0;double ingCalMar = 0;double ingCalAbr = 0;double ingCalMay = 0;double ingCalJun = 0;
            double ingCalJul = 0;double ingCalAgo = 0;double ingCalSep = 0;double ingCalOct = 0;double ingCalNov = 0;double ingCalDic =0;
            double ingBoxEne = 0; double ingBoxFeb = 0;double ingBoxMar = 0;double ingBoxAbr = 0;double ingBoxMay = 0;double ingBoxJun = 0;
            double ingBoxJul = 0;double ingBoxAgo = 0;double ingBoxSep = 0;double ingBoxOct = 0;double ingBoxNov = 0;double ingBoxDic =0;
            double totalEne = 0;double totalFeb = 0;double totalMar = 0;double totalAbr = 0;double totalMay = 0;double totalJun = 0;
            double totalJul = 0;double totalAgo = 0;double totalSep = 0;double totalOct = 0;double totalNov = 0;double totalDic = 0;
            
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            DecimalFormat formateador = new DecimalFormat("###,###,###.00");
            /// ENERO
            suc = request.getParameter("suc");
            int idSuc = SucursalBD.getIdSuc(suc);
            System.out.println(idSuc);
            ArrayList<Integer> ar = SucursalBD.getPersonalSuc3(idSuc);
                        System.out.println(ar.get(0));
                        double iec = 0;
                        double ieb = 0;
                        double itc = 0;
                        double itb = 0;
                        double oi = 0;
                        double e = 0;
                        double ecxc = 0;
                        double ctpe = 0;
                        double ctpr = 0;
                        double oe = 0;
                        double tc = 0;
                        ArrayList<TotalMonto> lista2 = TotalMontoBD.mostrarTotalMonto3(idSuc, eneroi, enerof);
                        for(int ii=0;ii<lista2.size();ii++){
                                    // int idContrato2=ar.get(ii);
                                    TotalMonto in=lista2.get(ii);
                                    iec = iec + in.getIngresoEfeCali();
                                    ieb = ieb + in.getIngresoEfeBox();
                                    itc = itc + in.getIngresoTarCali();
                                    itb = itb + in.getIngresoTarBox();
                                    oi = oi + in.getOtroIngreso();
                                    e = e + in.getEgreso();
                                    ecxc = ecxc + in.getEgresoCXC();
                                    ctpe = ctpe + in.getChequeTransPer();
                                    ctpr = ctpr + in.getChequeTransPro();
                                    oe = oe + in.getOtrosEgresos();
                                   // tc = tc + icp.getTotalCaja();
                        }
                        tc = iec + ieb + itc + itb + oi - e -ecxc - ctpe - ctpr - oe;
                        ingCalEne = iec + itc; ingBoxEne = ieb + itb; totalEne = ingCalEne + ingBoxEne;
                        ingresos = iec + ieb + itc + itb + oi; egresos = e + ecxc + ctpe + ctpr + oe;
                        beneficios = ingresos - egresos;                        
            /// FEBRERO
            iec = 0; ieb = 0; itc = 0; itb = 0; oi = 0; e = 0; ecxc = 0; ctpe = 0; ctpr = 0; oe = 0; tc = 0;
            lista2 = TotalMontoBD.mostrarTotalMonto3(idSuc, febreroi, febrerof);
                        for(int ii=0;ii<lista2.size();ii++){
                                    TotalMonto in=lista2.get(ii);
                                    iec = iec + in.getIngresoEfeCali();
                                    ieb = ieb + in.getIngresoEfeBox();
                                    itc = itc + in.getIngresoTarCali();
                                    itb = itb + in.getIngresoTarBox();
                                    oi = oi + in.getOtroIngreso();
                                    e = e + in.getEgreso();
                                    ecxc = ecxc + in.getEgresoCXC();
                                    ctpe = ctpe + in.getChequeTransPer();
                                    ctpr = ctpr + in.getChequeTransPro();
                                    oe = oe + in.getOtrosEgresos();
                        }
                        ingCalFeb = iec + itc; ingBoxFeb = ieb + itb; totalFeb = ingCalFeb + ingBoxFeb;
                        ingresosf = iec + ieb + itc + itb + oi; egresosf = e + ecxc + ctpe + ctpr + oe;
                        beneficiosf = ingresosf - egresosf;
            /// MARZO
            iec = 0; ieb = 0; itc = 0; itb = 0; oi = 0; e = 0; ecxc = 0; ctpe = 0; ctpr = 0; oe = 0; tc = 0;
            lista2 = TotalMontoBD.mostrarTotalMonto3(idSuc, marzoi, marzof);
                        for(int ii=0;ii<lista2.size();ii++){
                                    // int idContrato2=ar.get(ii);
                                    TotalMonto in=lista2.get(ii);
                                    iec = iec + in.getIngresoEfeCali();
                                    ieb = ieb + in.getIngresoEfeBox();
                                    itc = itc + in.getIngresoTarCali();
                                    itb = itb + in.getIngresoTarBox();
                                    oi = oi + in.getOtroIngreso();
                                    e = e + in.getEgreso();
                                    ecxc = ecxc + in.getEgresoCXC();
                                    ctpe = ctpe + in.getChequeTransPer();
                                    ctpr = ctpr + in.getChequeTransPro();
                                    oe = oe + in.getOtrosEgresos();
                                   // tc = tc + icp.getTotalCaja();
                        }
                        tc = iec + ieb + itc + itb + oi - e -ecxc - ctpe - ctpr - oe;
                        ingCalMar = iec + itc; ingBoxMar = ieb + itb; totalMar = ingCalMar + ingBoxMar;
                        ingresosm = iec + ieb + itc + itb + oi; egresosm = e + ecxc + ctpe + ctpr + oe;
                        beneficiosm = ingresosm - egresosm;
            /// ABRIL
            iec = 0; ieb = 0; itc = 0; itb = 0; oi = 0; e = 0; ecxc = 0; ctpe = 0; ctpr = 0; oe = 0; tc = 0;
            lista2 = TotalMontoBD.mostrarTotalMonto3(idSuc, abrili, abrilf);
                        for(int ii=0;ii<lista2.size();ii++){
                                    // int idContrato2=ar.get(ii);
                                    TotalMonto in=lista2.get(ii);
                                    iec = iec + in.getIngresoEfeCali();
                                    ieb = ieb + in.getIngresoEfeBox();
                                    itc = itc + in.getIngresoTarCali();
                                    itb = itb + in.getIngresoTarBox();
                                    oi = oi + in.getOtroIngreso();
                                    e = e + in.getEgreso();
                                    ecxc = ecxc + in.getEgresoCXC();
                                    ctpe = ctpe + in.getChequeTransPer();
                                    ctpr = ctpr + in.getChequeTransPro();
                                    oe = oe + in.getOtrosEgresos();
                                   // tc = tc + icp.getTotalCaja();
                        }
                        ingCalAbr = iec + itc; ingBoxAbr = ieb + itb; totalAbr = ingCalAbr + ingBoxAbr;
                        ingresosa = iec + ieb + itc + itb + oi; egresosa = e + ecxc + ctpe + ctpr + oe;
                        beneficiosa = ingresosa - egresosa;
            /// MAYO
            iec = 0; ieb = 0; itc = 0; itb = 0; oi = 0; e = 0; ecxc = 0; ctpe = 0; ctpr = 0; oe = 0; tc = 0;
            lista2 = TotalMontoBD.mostrarTotalMonto3(idSuc, mayoi, mayof);
                        for(int ii=0;ii<lista2.size();ii++){
                                    // int idContrato2=ar.get(ii);
                                    TotalMonto in=lista2.get(ii);
                                    iec = iec + in.getIngresoEfeCali();
                                    ieb = ieb + in.getIngresoEfeBox();
                                    itc = itc + in.getIngresoTarCali();
                                    itb = itb + in.getIngresoTarBox();
                                    oi = oi + in.getOtroIngreso();
                                    e = e + in.getEgreso();
                                    ecxc = ecxc + in.getEgresoCXC();
                                    ctpe = ctpe + in.getChequeTransPer();
                                    ctpr = ctpr + in.getChequeTransPro();
                                    oe = oe + in.getOtrosEgresos();
                                   // tc = tc + icp.getTotalCaja();
                        }
                        ingCalMay = iec + itc; ingBoxMay = ieb + itb; totalMay = ingCalMay + ingBoxMay;
                        ingresosma = iec + ieb + itc + itb + oi; egresosma = e + ecxc + ctpe + ctpr + oe;
                        beneficiosma = ingresosma - egresosma;
            /// JUNIO
            iec = 0; ieb = 0; itc = 0; itb = 0; oi = 0; e = 0; ecxc = 0; ctpe = 0; ctpr = 0; oe = 0; tc = 0;
            lista2 = TotalMontoBD.mostrarTotalMonto3(idSuc, junioi, juniof);
                        for(int ii=0;ii<lista2.size();ii++){
                                    // int idContrato2=ar.get(ii);
                                    TotalMonto in=lista2.get(ii);
                                    iec = iec + in.getIngresoEfeCali();
                                    ieb = ieb + in.getIngresoEfeBox();
                                    itc = itc + in.getIngresoTarCali();
                                    itb = itb + in.getIngresoTarBox();
                                    oi = oi + in.getOtroIngreso();
                                    e = e + in.getEgreso();
                                    ecxc = ecxc + in.getEgresoCXC();
                                    ctpe = ctpe + in.getChequeTransPer();
                                    ctpr = ctpr + in.getChequeTransPro();
                                    oe = oe + in.getOtrosEgresos();
                                   // tc = tc + icp.getTotalCaja();
                        }
                        ingCalJun = iec + itc; ingBoxJun = ieb + itb; totalJun = ingCalJun + ingBoxJun;
                        ingresosj = iec + ieb + itc + itb + oi; egresosj = e + ecxc + ctpe + ctpr + oe;
                        beneficiosj = ingresosj - egresosj;
            /// JULIO
            iec = 0; ieb = 0; itc = 0; itb = 0; oi = 0; e = 0; ecxc = 0; ctpe = 0; ctpr = 0; oe = 0; tc = 0;
            lista2 = TotalMontoBD.mostrarTotalMonto3(idSuc, julioi, juliof);
                        for(int ii=0;ii<lista2.size();ii++){
                                    // int idContrato2=ar.get(ii);
                                    TotalMonto in=lista2.get(ii);
                                    iec = iec + in.getIngresoEfeCali();
                                    ieb = ieb + in.getIngresoEfeBox();
                                    itc = itc + in.getIngresoTarCali();
                                    itb = itb + in.getIngresoTarBox();
                                    oi = oi + in.getOtroIngreso();
                                    e = e + in.getEgreso();
                                    ecxc = ecxc + in.getEgresoCXC();
                                    ctpe = ctpe + in.getChequeTransPer();
                                    ctpr = ctpr + in.getChequeTransPro();
                                    oe = oe + in.getOtrosEgresos();
                                   // tc = tc + icp.getTotalCaja();
                        }
                        ingCalJul = iec + itc; ingBoxJul = ieb + itb; totalJul = ingCalJul + ingBoxJul;
                        ingresosju = iec + ieb + itc + itb + oi; egresosju = e + ecxc + ctpe + ctpr + oe;
                        beneficiosju = ingresosju - egresosju;
            /// AGOSTO
            iec = 0; ieb = 0; itc = 0; itb = 0; oi = 0; e = 0; ecxc = 0; ctpe = 0; ctpr = 0; oe = 0; tc = 0;
            lista2 = TotalMontoBD.mostrarTotalMonto3(idSuc, agostoi, agostof);
                        for(int ii=0;ii<lista2.size();ii++){
                                    // int idContrato2=ar.get(ii);
                                    TotalMonto in=lista2.get(ii);
                                    iec = iec + in.getIngresoEfeCali();
                                    ieb = ieb + in.getIngresoEfeBox();
                                    itc = itc + in.getIngresoTarCali();
                                    itb = itb + in.getIngresoTarBox();
                                    oi = oi + in.getOtroIngreso();
                                    e = e + in.getEgreso();
                                    ecxc = ecxc + in.getEgresoCXC();
                                    ctpe = ctpe + in.getChequeTransPer();
                                    ctpr = ctpr + in.getChequeTransPro();
                                    oe = oe + in.getOtrosEgresos();
                                   // tc = tc + icp.getTotalCaja();
                        }
                        ingCalAgo = iec + itc; ingBoxAgo = ieb + itb; totalAgo = ingCalAgo + ingBoxAgo;
                        ingresosag = iec + ieb + itc + itb + oi; egresosag = e + ecxc + ctpe + ctpr + oe;
                        beneficiosag = ingresosag - egresosag;
            /// SEPTIEMBRE
            iec = 0; ieb = 0; itc = 0; itb = 0; oi = 0; e = 0; ecxc = 0; ctpe = 0; ctpr = 0; oe = 0; tc = 0;
            lista2 = TotalMontoBD.mostrarTotalMonto3(idSuc, septiembrei, septiembref);
                        for(int ii=0;ii<lista2.size();ii++){
                                    // int idContrato2=ar.get(ii);
                                    TotalMonto in=lista2.get(ii);
                                    iec = iec + in.getIngresoEfeCali();
                                    ieb = ieb + in.getIngresoEfeBox();
                                    itc = itc + in.getIngresoTarCali();
                                    itb = itb + in.getIngresoTarBox();
                                    oi = oi + in.getOtroIngreso();
                                    e = e + in.getEgreso();
                                    ecxc = ecxc + in.getEgresoCXC();
                                    ctpe = ctpe + in.getChequeTransPer();
                                    ctpr = ctpr + in.getChequeTransPro();
                                    oe = oe + in.getOtrosEgresos();
                                   // tc = tc + icp.getTotalCaja();
                        }
                        ingCalSep = iec + itc; ingBoxSep = ieb + itb; totalSep = ingCalSep + ingBoxSep;
                        ingresossep = iec + ieb + itc + itb + oi; egresossep = e + ecxc + ctpe + ctpr + oe;
                        beneficiossep = ingresossep - egresossep;
            /// OCTUBRE
            iec = 0; ieb = 0; itc = 0; itb = 0; oi = 0; e = 0; ecxc = 0; ctpe = 0; ctpr = 0; oe = 0; tc = 0;
            lista2 = TotalMontoBD.mostrarTotalMonto3(idSuc, octubrei, octubref);
                        for(int ii=0;ii<lista2.size();ii++){
                                    // int idContrato2=ar.get(ii);
                                    TotalMonto in=lista2.get(ii);
                                    iec = iec + in.getIngresoEfeCali();
                                    ieb = ieb + in.getIngresoEfeBox();
                                    itc = itc + in.getIngresoTarCali();
                                    itb = itb + in.getIngresoTarBox();
                                    oi = oi + in.getOtroIngreso();
                                    e = e + in.getEgreso();
                                    ecxc = ecxc + in.getEgresoCXC();
                                    ctpe = ctpe + in.getChequeTransPer();
                                    ctpr = ctpr + in.getChequeTransPro();
                                    oe = oe + in.getOtrosEgresos();
                                   // tc = tc + icp.getTotalCaja();
                        }
                        ingCalOct = iec + itc; ingBoxOct = ieb + itb; totalOct = ingCalOct + ingBoxOct;
                        ingresosoct = iec + ieb + itc + itb + oi; egresosoct = e + ecxc + ctpe + ctpr + oe;
                        beneficiosoct = ingresosoct - egresosoct;
            /// NOVIEMBRE
            iec = 0; ieb = 0; itc = 0; itb = 0; oi = 0; e = 0; ecxc = 0; ctpe = 0; ctpr = 0; oe = 0; tc = 0;
            lista2 = TotalMontoBD.mostrarTotalMonto3(idSuc, noviembrei, noviembref);
                        for(int ii=0;ii<lista2.size();ii++){
                                    // int idContrato2=ar.get(ii);
                                    TotalMonto in=lista2.get(ii);
                                    iec = iec + in.getIngresoEfeCali();
                                    ieb = ieb + in.getIngresoEfeBox();
                                    itc = itc + in.getIngresoTarCali();
                                    itb = itb + in.getIngresoTarBox();
                                    oi = oi + in.getOtroIngreso();
                                    e = e + in.getEgreso();
                                    ecxc = ecxc + in.getEgresoCXC();
                                    ctpe = ctpe + in.getChequeTransPer();
                                    ctpr = ctpr + in.getChequeTransPro();
                                    oe = oe + in.getOtrosEgresos();
                                   // tc = tc + icp.getTotalCaja();
                        }
                        ingCalNov = iec + itc; ingBoxNov = ieb + itb; totalNov = ingCalNov + ingBoxNov;
                        ingresosnov = iec + ieb + itc + itb + oi; egresosnov = e + ecxc + ctpe + ctpr + oe;
                        beneficiosnov = ingresosnov - egresosnov;
            /// DICIEMBRE
            iec = 0; ieb = 0; itc = 0; itb = 0; oi = 0; e = 0; ecxc = 0; ctpe = 0; ctpr = 0; oe = 0; tc = 0;
            lista2 = TotalMontoBD.mostrarTotalMonto3(idSuc, diciembrei, diciembref);
                        for(int ii=0;ii<lista2.size();ii++){
                                    // int idContrato2=ar.get(ii);
                                    TotalMonto in=lista2.get(ii);
                                    iec = iec + in.getIngresoEfeCali();
                                    ieb = ieb + in.getIngresoEfeBox();
                                    itc = itc + in.getIngresoTarCali();
                                    itb = itb + in.getIngresoTarBox();
                                    oi = oi + in.getOtroIngreso();
                                    e = e + in.getEgreso();
                                    ecxc = ecxc + in.getEgresoCXC();
                                    ctpe = ctpe + in.getChequeTransPer();
                                    ctpr = ctpr + in.getChequeTransPro();
                                    oe = oe + in.getOtrosEgresos();
                                   // tc = tc + icp.getTotalCaja();
                        }
                        ingCalDic = iec + itc; ingBoxDic = ieb + itb; totalDic = ingCalDic + ingBoxDic;
                        ingresosdic = iec + ieb + itc + itb + oi; egresosdic = e + ecxc + ctpe + ctpr + oe;
                        beneficiosdic = ingresosdic - egresosdic;
            /// ACTUAL
            iec = 0; ieb = 0; itc = 0; itb = 0; oi = 0; e = 0; ecxc = 0; ctpe = 0; ctpr = 0; oe = 0; tc = 0;
            for(int ii=0;ii<ar.size();ii++){
                                    int idContrato2=ar.get(ii);
                                    TotalMonto icp= TotalMontoBD.mostrarTotalMonto2(idContrato2, inicio, fin);
                                    iec = iec + icp.getIngresoEfeCali();
                                    ieb = ieb + icp.getIngresoEfeBox();
                                    itc = itc + icp.getIngresoTarCali();
                                    itb = itb + icp.getIngresoTarBox();
                                    oi = oi + icp.getOtroIngreso();
                                    e = e + icp.getEgreso();
                                    ecxc = ecxc + icp.getEgresoCXC();
                                    ctpe = ctpe + icp.getChequeTransPer();
                                    ctpr = ctpr + icp.getChequeTransPro();
                                    oe = oe + icp.getOtrosEgresos();
                        }
                        ingCal = iec; ingBox = ieb; ingCalT = itc; ingBoxT = itb; ingOtros = oi; ingEf = iec + ieb;
                        ingTar = itc + itb; egr = e; egrCXC = ecxc; egrTransP = ctpe; egrCheTrans = ctpr; egrOtros = oe; 
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            
            
            
            /*for(int i=0;i<pers.size();i++){
                int idP=pers.get(i);
            TotalMonto icp = TotalMontoBD.mostrarTotalMonto2(idP, inicio, fin);
            ingCal = ingCal+icp.getIngresoEfeCali();
            ingBox = ingBox+icp.getIngresoEfeBox();
            ingCalT = ingCalT+icp.getIngresoTarCali();
            ingBoxT = ingBoxT+icp.getIngresoTarBox();
            ingOtros = ingOtros+icp.getOtroIngreso();
            ingEf = ingEf+ingCal + ingBox;
            ingTar = ingTar+ingCalT + ingBoxT;
            egr = egr+icp.getEgreso();
            egrCXC = egrCXC+icp.getEgresoCXC();
            egrTransP = egrTransP+icp.getChequeTransPer();
            egrCheTrans = egrCheTrans+icp.getChequeTransPro();
            egrOtros = egrOtros+icp.getOtrosEgresos();
            
            TotalMonto ic = TotalMontoBD.mostrarTotalMonto2(idP, eneroi, enerof);
            ingresos = ingresos+ic.getIngresoEfeCali()+ic.getIngresoEfeBox()+ic.getIngresoTarCali()+ic.getIngresoTarBox()+ic.getOtroIngreso();
            egresos = egresos+ic.getEgreso()+ic.getEgresoCXC()+ic.getChequeTransPer()+ic.getChequeTransPro()+ic.getOtrosEgresos();
            beneficios = ingresos-egresos;
            
            TotalMonto icf = TotalMontoBD.mostrarTotalMonto2(idP, febreroi, febrerof);
            ingresosf = ingresosf+icf.getIngresoEfeCali()+icf.getIngresoEfeBox()+icf.getIngresoTarCali()+icf.getIngresoTarBox()+icf.getOtroIngreso();
            egresosf = egresosf+icf.getEgreso()+icf.getEgresoCXC()+icf.getChequeTransPer()+icf.getChequeTransPro()+icf.getOtrosEgresos();
            beneficiosf = ingresosf-egresosf;
            
            TotalMonto icm = TotalMontoBD.mostrarTotalMonto2(idP, marzoi, marzof);
            ingresosm = ingresosm+icm.getIngresoEfeCali()+icm.getIngresoEfeBox()+icm.getIngresoTarCali()+icm.getIngresoTarBox()+icm.getOtroIngreso();
            egresosm = egresosm+icm.getEgreso()+icm.getEgresoCXC()+icm.getChequeTransPer()+icm.getChequeTransPro()+icm.getOtrosEgresos();
            beneficiosm = ingresosm-egresosm;
            
            TotalMonto ica = TotalMontoBD.mostrarTotalMonto2(idP, abrili, abrilf);
            ingresosa = ingresosa+ica.getIngresoEfeCali()+ica.getIngresoEfeBox()+ica.getIngresoTarCali()+ica.getIngresoTarBox()+ica.getOtroIngreso();
            egresosa = egresosa+ica.getEgreso()+ica.getEgresoCXC()+ica.getChequeTransPer()+ica.getChequeTransPro()+ica.getOtrosEgresos();
            beneficiosa = ingresosa-egresosa;
            
            TotalMonto icma = TotalMontoBD.mostrarTotalMonto2(idP, mayoi, mayof);
            ingresosma = ingresosma+icma.getIngresoEfeCali()+icma.getIngresoEfeBox()+icma.getIngresoTarCali()+icma.getIngresoTarBox()+icma.getOtroIngreso();
            egresosma = egresosma+icma.getEgreso()+icma.getEgresoCXC()+icma.getChequeTransPer()+icma.getChequeTransPro()+icma.getOtrosEgresos();
            beneficiosma = ingresosma-egresosma;
            
            TotalMonto icj = TotalMontoBD.mostrarTotalMonto2(idP, junioi, juniof);
            ingresosj = ingresosj+icj.getIngresoEfeCali()+icj.getIngresoEfeBox()+icj.getIngresoTarCali()+icj.getIngresoTarBox()+icj.getOtroIngreso();
            egresosj = egresosj+icj.getEgreso()+icj.getEgresoCXC()+icj.getChequeTransPer()+icj.getChequeTransPro()+icj.getOtrosEgresos();
            beneficiosj = ingresosj-egresosj;
            
            TotalMonto icju = TotalMontoBD.mostrarTotalMonto2(idP, julioi, juliof);
            ingresosju = ingresosju+icju.getIngresoEfeCali()+icju.getIngresoEfeBox()+icju.getIngresoTarCali()+icju.getIngresoTarBox()+icju.getOtroIngreso();
            egresosju = egresosju+icju.getEgreso()+icju.getEgresoCXC()+icju.getChequeTransPer()+icju.getChequeTransPro()+icju.getOtrosEgresos();
            beneficiosju = ingresosju-egresosju;
            
            TotalMonto icag = TotalMontoBD.mostrarTotalMonto2(idP, agostoi, agostof);
            ingresosag = ingresosag+icag.getIngresoEfeCali()+icag.getIngresoEfeBox()+icag.getIngresoTarCali()+icag.getIngresoTarBox()+icag.getOtroIngreso();
            egresosag = egresosag+icag.getEgreso()+icag.getEgresoCXC()+icag.getChequeTransPer()+icag.getChequeTransPro()+icag.getOtrosEgresos();
            beneficiosag = ingresosag-egresosag;
            
            TotalMonto icsep = TotalMontoBD.mostrarTotalMonto2(idP, septiembrei, septiembref);
            ingresossep = ingresossep+icsep.getIngresoEfeCali()+icsep.getIngresoEfeBox()+icsep.getIngresoTarCali()+icsep.getIngresoTarBox()+icsep.getOtroIngreso();
            egresossep = egresossep+icsep.getEgreso()+icsep.getEgresoCXC()+icsep.getChequeTransPer()+icsep.getChequeTransPro()+icsep.getOtrosEgresos();
            beneficiossep = ingresossep-egresossep;
            
            TotalMonto icoct = TotalMontoBD.mostrarTotalMonto2(idP, octubrei, octubref);
            ingresosoct = ingresosoct+icoct.getIngresoEfeCali()+icoct.getIngresoEfeBox()+icoct.getIngresoTarCali()+icoct.getIngresoTarBox()+icoct.getOtroIngreso();
            egresosoct = egresosoct+icoct.getEgreso()+icoct.getEgresoCXC()+icoct.getChequeTransPer()+icoct.getChequeTransPro()+icoct.getOtrosEgresos();
            beneficiosoct = ingresosoct-egresosoct;
            
            TotalMonto icnov = TotalMontoBD.mostrarTotalMonto2(idP, noviembrei, noviembref);
            ingresosnov = ingresosnov+icnov.getIngresoEfeCali()+icnov.getIngresoEfeBox()+icnov.getIngresoTarCali()+icnov.getIngresoTarBox()+icnov.getOtroIngreso();
            egresosnov = egresosnov+icnov.getEgreso()+icnov.getEgresoCXC()+icnov.getChequeTransPer()+icnov.getChequeTransPro()+icnov.getOtrosEgresos();
            beneficiosnov = ingresosnov-egresosnov;
            
            TotalMonto icdic = TotalMontoBD.mostrarTotalMonto2(idP, diciembrei, diciembref);
            ingresosdic = ingresosdic+icdic.getIngresoEfeCali()+icdic.getIngresoEfeBox()+icdic.getIngresoTarCali()+icdic.getIngresoTarBox()+icdic.getOtroIngreso();
            egresosdic = egresosdic+icdic.getEgreso()+icdic.getEgresoCXC()+icdic.getChequeTransPer()+icdic.getChequeTransPro()+icdic.getOtrosEgresos();
            beneficiosdic = ingresosdic-egresosdic;
            
            ingCalEne = ic.getIngresoEfeCali() + ic.getIngresoTarCali();
            ingCalFeb = icf.getIngresoEfeCali() + icf.getIngresoTarCali();
            ingCalMar = icm.getIngresoEfeCali() + icm.getIngresoTarCali();
            ingCalAbr = ica.getIngresoEfeCali() + ica.getIngresoTarCali();
            ingCalMay = icma.getIngresoEfeCali() + icma.getIngresoTarCali();
            ingCalJun = icj.getIngresoEfeCali() + icj.getIngresoTarCali();
            ingCalJul = icju.getIngresoEfeCali() + icju.getIngresoTarCali();
            ingCalAgo = icag.getIngresoEfeCali() + icag.getIngresoTarCali();
            ingCalSep = icsep.getIngresoEfeCali() + icsep.getIngresoTarCali();
            ingCalOct = icoct.getIngresoEfeCali() + icoct.getIngresoTarCali();
            ingCalNov = icnov.getIngresoEfeCali() + icnov.getIngresoTarCali();
            ingCalDic = icdic.getIngresoEfeCali() + icdic.getIngresoTarCali();
            
            ingBoxEne = ic.getIngresoEfeBox() + ic.getIngresoTarBox();
            ingBoxFeb = icf.getIngresoEfeBox() + icf.getIngresoTarBox();
            ingBoxMar = icm.getIngresoEfeBox() + icm.getIngresoTarBox();
            ingBoxAbr = ica.getIngresoEfeBox() + ica.getIngresoTarBox();
            ingBoxMay = icma.getIngresoEfeBox() + icma.getIngresoTarBox();
            ingBoxJun = icj.getIngresoEfeBox() + icj.getIngresoTarBox();
            ingBoxJul = icju.getIngresoEfeBox() + icju.getIngresoTarBox();
            ingBoxAgo = icag.getIngresoEfeBox() + icag.getIngresoTarBox();
            ingBoxSep = icsep.getIngresoEfeBox() + icsep.getIngresoTarBox();
            ingBoxOct = icoct.getIngresoEfeBox() + icoct.getIngresoTarBox();
            ingBoxNov = icnov.getIngresoEfeBox() + icnov.getIngresoTarBox();
            ingBoxDic = icdic.getIngresoEfeBox() + icdic.getIngresoTarBox();
            
            totalEne = ingCalEne+ingBoxEne;
            totalFeb = ingCalFeb+ingBoxFeb;
            totalMar = ingCalMar+ingBoxMar;
            totalAbr = ingCalAbr+ingBoxAbr;
            totalMay = ingCalMay+ingBoxMay;
            totalJun = ingCalJun+ingBoxJun;
            totalJul = ingCalJul+ingBoxJul;
            totalAgo = ingCalAgo+ingBoxAgo;
            totalSep = ingCalSep+ingBoxSep;
            totalOct = ingCalOct+ingBoxOct;
            totalNov = ingCalNov+ingBoxNov;
            totalDic = ingCalDic+ingBoxDic;
            }*/    
            
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
            
            String s="<!-- DONUT CHART -->"+
            "<!-- <h3 class="+"box-title"+">Donut Chart</h3> -->"+
            "<div class="+"box-body"+" id="+"graph"+">"+
              "<!-- <div id="+"container"+"></div> -->"+
              "<div id="+"pieChart"+"></div>"+
            "</div>"+
            "<!-- /.box-body -->"+
          
           "<!-- ---------------------------------------------------------------------------------------------- -->"+                                 
            "</div>"+
             "<div class="+"box-body"+" id="+"graph2"+">"+
              "<!-- <div id="+"container"+"></div> -->"+
              "<div id="+"ChartIngresos"+"></div>"+
            "</div>"+ 
            "<div class="+"box-body"+" id="+"graph3"+">"+
              "<!-- <div id="+"container"+"></div> -->"+
              "<div id="+"ChartIngresosTipo"+"></div>"+
            "</div>"+ 
            "<div class="+"box-body"+" id="+"graph4"+">"+
              "<!-- <div id="+"container"+"></div> -->"+
              "<div id="+"ChartEgresos"+"></div>"+
            "</div>"+
            "<div class="+"box-body"+" id="+"graph6"+">"+
              "<!-- <div id="+"container"+"></div> -->"+
              "<div id="+"Barras2"+"></div>"+
            "</div>"+
                    "<div class="+"box-body"+" id="+"graph5"+">"+
              "<!-- <div id="+"container"+"></div> -->"+
              "<div id="+"Barras"+"></div>"+
            "</div>"+
          "<!-- /top tiles -->"+
                    
  "<script type="+"text/javascript"+">"+
    "Highcharts.chart('pieChart', {"+  
    "chart: {"+
        "plotBackgroundColor: null,"+
        "plotBorderWidth: null,"+
        "plotShadow: false,"+
        "type: 'pie'"+
    "},"+
    "title: {"+
        "text: 'Porcentaje de clientes activos por disciplina'"+
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
        "data: [{"+
            "name: 'Calistenia',"+
            "y:"+nroC+","+
            "sliced: true,"+
            "selected: true"+
        "}, {"+
            "name: 'Boxeo',"+
            "y:"+nroCB+
        "}]"+
    "}]"+
"});"+
"</script>"+ 
                    
"<script type="+"text/javascript"+">"+
    "Highcharts.chart('ChartIngresos', {"+  
    "chart: {"+
        "plotBackgroundColor: null,"+
        "plotBorderWidth: null,"+
        "plotShadow: false,"+
        "type: 'pie'},"+
    "title: {text: 'Ingresos'},"+
    "tooltip: {pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'},"+
    "plotOptions: {"+
        "pie: {"+
            "allowPointSelect: true,"+
            "cursor: 'pointer',"+
            "dataLabels: {"+
                "enabled: true,"+
                "format: '<b>{point.name}</b>: {point.percentage:.1f} %',"+
                "style: {color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'}"+
            "}"+
        "}"+
    "},"+
    "series: [{"+
        "name: 'Porcentaje de Ingresos',"+
        "colorByPoint: true,"+
        "data: [{"+
            "name: 'Calistenia efectivo',"+
            "y:"+ingCal+","+
            "sliced: true,"+
            "selected: true"+
        "}, {"+
            "name: 'Box efectivo',"+
            "y:"+ingBox+
          "}, {"+
            "name: 'Calistenia tarjeta',"+
            "y:"+ingCalT+
          "}, {"+
            "name: 'Box tarjeta',"+
            "y:"+ingBoxT+
          "}, {"+
            "name: 'Otros',"+
            "y:"+ingOtros+
        "}]"+
    "}]"+
"});"+
"</script>"+ 
                    
"<script type="+"text/javascript"+">"+
    "Highcharts.chart('ChartIngresosTipo', {"+  
    "chart: {"+
        "plotBackgroundColor: null,"+
        "plotBorderWidth: null,"+
        "plotShadow: false,"+
        "type: 'pie'},"+
    "title: {text: 'Ingresos por tipo de pago'},"+
    "tooltip: {pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'},"+
    "plotOptions: {"+
        "pie: {"+
            "allowPointSelect: true,"+
            "cursor: 'pointer',"+
            "dataLabels: {"+
                "enabled: true,"+
                "format: '<b>{point.name}</b>: {point.percentage:.1f} %',"+
                "style: {color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'}"+
            "}"+
        "}"+
    "},"+
    "series: [{"+
        "name: 'Tipo de pago',"+
        "colorByPoint: true,"+
        "data: [{"+
            "name: 'Efectivo',"+
            "y:"+ingEf+","+
            "sliced: true,"+
            "selected: true"+
        "}, {"+
            "name: 'Tarjeta',"+
            "y:"+ingTar+
        "}]"+
    "}]"+
"});"+
"</script>"+
                    
"<script type="+"text/javascript"+">"+
    "Highcharts.chart('ChartEgresos', {"+  
    "chart: {"+
        "plotBackgroundColor: null,"+
        "plotBorderWidth: null,"+
        "plotShadow: false,"+
        "type: 'pie'},"+
    "title: {text: 'Egresos'},"+
    "tooltip: {pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'},"+
    "plotOptions: {"+
        "pie: {"+
            "allowPointSelect: true,"+
            "cursor: 'pointer',"+
            "dataLabels: {"+
                "enabled: true,"+
                "format: '<b>{point.name}</b>: {point.percentage:.1f} %',"+
                "style: {color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'}"+
            "}"+
        "}"+
    "},"+
    "series: [{"+
        "name: 'Porcentaje de Egresos',"+
        "colorByPoint: true,"+
        "data: [{"+
            "name: 'Egresos',"+
            "y:"+egr+","+
            "sliced: true,"+
            "selected: true"+
        "}, {"+
            "name: 'Cuentas por Pagar',"+
            "y:"+egrCXC+
          "}, {"+
            "name: 'Cheque y Transferencia Personal',"+
            "y:"+egrTransP+
          "}, {"+
            "name: 'Cheque y Transferencia Proveedor',"+
            "y:"+egrCheTrans+
          "}, {"+
            "name: 'Otros',"+
            "y:"+egrOtros+
        "}]"+
    "}]"+
"});"+
"</script>"+
            
 "<script type="+"text/javascript"+">"+
"Highcharts.chart('Barras2', {"+
    "chart: {"+
        "type: 'column'"+
    "},"+
    "title: {"+
        "text: 'Ingresos de Membresias'"+
    "},"+
    "subtitle: {"+
        "text: 'Source: calisteniaboliviasc.com'"+
    "},"+
    "xAxis: {"+
        "categories: ["+
            "'Ene',"+
            "'Feb',"+
            "'Mar',"+
            "'Abr',"+
            "'May',"+
            "'Jun',"+
            "'Jul',"+
            "'Ago',"+
            "'Sep',"+
            "'Oct',"+
            "'Nov',"+
            "'Dic'"+
        "],"+
        "crosshair: true"+
    "},"+
    "yAxis: {"+
        "min: 0,"+
        "title: {"+
            "text: 'Monto (Bs)'"+
        "}"+
    "},"+
    "tooltip: {"+
        "headerFormat: '<span style="+"font-size:10px"+">{point.key}</span><table>',"+
        "pointFormat: '<tr><td style="+"color:{series.color};padding:0"+">{series.name}: </td>' +"+
            "'<td style="+"padding:0"+"><b>{point.y:.1f} Bs</b></td></tr>',"+
        "footerFormat: '</table>',"+
        "shared: true,"+
        "useHTML: true"+
    "},"+
    "plotOptions: {"+
        "column: {"+
            "pointPadding: 0.2,"+
            "borderWidth: 0"+
        "}"+
    "},"+
    "series: [{"+
        "name: 'Ingresos Calistenia',"+
        "data: ["+ingCalEne+", "+ingCalFeb+", "+ingCalMar+", "+ingCalAbr+", "+ingCalMay+", "+ingCalJun+", "+ingCalJul+", "+ingCalAgo+", "+ingCalSep+", "+ingCalOct+", "+ingCalNov+", "+ingCalDic+"]"+
    "}, {"+
        "name: 'Ingresos Box',"+
        "data: ["+ingBoxEne+", "+ingBoxFeb+", "+ingBoxMar+", "+ingBoxAbr+", "+ingBoxMay+", "+ingBoxJun+", "+ingBoxJul+", "+ingBoxAgo+", "+ingBoxSep+", "+ingBoxOct+", "+ingBoxNov+", "+ingBoxDic+"]"+
    "}, {"+
        "name: 'Total',"+
        "data: ["+totalEne+", "+totalFeb+", "+totalMar+", "+totalAbr+", "+totalMay+", "+totalJun+", "+totalJul+", "+totalAgo+", "+totalSep+", "+totalOct+", "+totalNov+", "+totalDic+"]"+
    "}]"+
"});"+
"</script>"+
                    
 "<script type="+"text/javascript"+">"+
"Highcharts.chart('Barras', {"+
    "chart: {"+
        "type: 'column'"+
    "},"+
    "title: {"+
        "text: 'Comparacion de Ingresos y Egresos mensuales'"+
    "},"+
    "subtitle: {"+
        "text: 'Source: calisteniaboliviasc.com'"+
    "},"+
    "xAxis: {"+
        "categories: ["+
            "'Ene',"+
            "'Feb',"+
            "'Mar',"+
            "'Abr',"+
            "'May',"+
            "'Jun',"+
            "'Jul',"+
            "'Ago',"+
            "'Sep',"+
            "'Oct',"+
            "'Nov',"+
            "'Dic'"+
        "],"+
        "crosshair: true"+
    "},"+
    "yAxis: {"+
        "min: 0,"+
        "title: {"+
            "text: 'Monto (Bs)'"+
        "}"+
    "},"+
    "tooltip: {"+
        "headerFormat: '<span style="+"font-size:10px"+">{point.key}</span><table>',"+
        "pointFormat: '<tr><td style="+"color:{series.color};padding:0"+">{series.name}: </td>' +"+
            "'<td style="+"padding:0"+"><b>{point.y:.1f} Bs</b></td></tr>',"+
        "footerFormat: '</table>',"+
        "shared: true,"+
        "useHTML: true"+
    "},"+
    "plotOptions: {"+
        "column: {"+
            "pointPadding: 0.2,"+
            "borderWidth: 0"+
        "}"+
    "},"+
    "series: [{"+
        "name: 'Ingresos',"+
        "data: ["+ingresos+", "+ingresosf+", "+ingresosm+", "+ingresosa+", "+ingresosma+", "+ingresosj+", "+ingresosju+", "+ingresosag+", "+ingresossep+", "+ingresosoct+", "+ingresosnov+", "+ingresosdic+"]"+
    "}, {"+
        "name: 'Egresos',"+
        "data: ["+egresos+", "+egresosf+", "+egresosm+", "+egresosa+", "+egresosma+", "+egresosj+", "+egresosju+", "+egresosag+", "+egresossep+", "+egresosoct+", "+egresosnov+", "+egresosdic+"]"+
    "}, {"+
        "name: 'Beneficios',"+
        "data: ["+beneficios+", "+beneficiosf+", "+beneficiosm+", "+beneficiosa+", "+beneficiosma+", "+beneficiosj+", "+beneficiosju+", "+beneficiosag+", "+beneficiossep+", "+beneficiosoct+", "+beneficiosnov+", "+beneficiosdic+"]"+
    "}]"+
"});"+
"</script>";

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
