<%-- 
    Document   : reciboBox
    Created on : 07-feb-2019, 0:36:22
    Author     : Hector
--%>

<%@page import="Modelo.contratoKick"%>
<%@page import="Modelo.Conversor"%>
<%@page import="java.util.Date"%>
<%@page import="java.util.Locale"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.util.ArrayList"%>
<%@page import="Modelo.contratoCali"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
	<link rel="stylesheet" href="recibo.css">
</head>

<body>
	<div id="botonera">
		<button onClick="javascript:window.print();">Imprimir</button>
                <button onClick="location.href='principal.jsp'">Retornar</button>
	</div>
    <%
        int nro = (int) session.getAttribute("Nro");
        ArrayList<contratoKick> det = (ArrayList<contratoKick>)session.getAttribute("Detalle");
        Calendar hoy = Calendar.getInstance();
        int diaAct = hoy.get(Calendar.DATE);
        int mesAct = hoy.get(Calendar.MONTH)+1;
        int añoAct = hoy.get(Calendar.YEAR);
        String fecha = diaAct + "/" + mesAct + "/" + añoAct;
        Date fechaDate = new Date();
        SimpleDateFormat formateador = new SimpleDateFormat("dd 'de' MMMM 'de' yyyy", new Locale("ES"));
        String fechaLit = formateador.format(fechaDate);
        //System.out.println(fechaLit);
        double montoTP = 0;
        for(int i = 0; i < det.size(); i++){ 
            montoTP = montoTP + det.get(i).getPaquete().getPrecioPaquete();
        }
        String lit = Conversor.cantidadConLetra(Double.toString(montoTP));
        lit = lit.toUpperCase();
        System.out.println(lit);
        String nroS = Integer.toString(nro);
        while(nroS.length() <= 6){
            nroS = "0" + nroS;
        }
        //String fechaLit = diaAct + " de "+ ;
    %>

	<div id="page2">

		<div class="bordeRecibo">
			<header>
				
				<!-- Lado Izquierdo -->
				<div class="column left">
					<div class="container">
						<div class="row text-left">
							<img src="images/logo-bg.png" alt="logo" width="208" height="85">
						</div>
						<div class="row text-left negrita h3">Calistenia Bolivia</div>
						<div class="row text-left h4">Street Workout</div>
						<div class="row text-left h4">Sucursal Norte Av. Banzer</div>
                                                <div class="row text-left h4">Sucursal Sur Av. Santo Dumont</div>
						<!--<div class="row text-left h4">3456874</div>--!
					</div>
				</div>
				
				<!-- Lado Central -->
				<div class="column center text-center"> <span id="tipoComprobante"></span> 
					<br>
					<span id="leyendaTipoComprobante" class="preimpreso">DOCUMENTO<br>NO VALIDO<br>COMO<br>FACTURA</span> 
				</div>
				
				<!-- Lado Derecho -->
				<div class="column right">
					<div class="container">
						<div id="lblComprobante" class="row text-center negrita h1">RECIBO</div>
						<div id="lblNroCmp" class="row text-center negrita h2"><span class="preimpreso">Nro</span> <%=nroS%></div>
						<div class="row text-center h3">ORIGINAL</div>
						<div class="row text-center h3">&nbsp;</div>
						<div class="row text-left h3">FECHA <span class="pull-right"> <%=fecha%> </span></div>
					</div>
				</div>
			</header>
			
			<section>Santa Cruz, <%=fechaLit%>
				<br>
				<br>
                                <span class="preimpreso">Recibimos de:</span> <%=det.get(0).getCliente().getNombre() + " " + det.get(0).getCliente().getApellido()%>
				<br>
				<span class="preimpreso">la cantidad de: </span><span id="importeEnLetras"> <%=lit + "BOLIVIANOS"%></span> 
			</section>
			
			<section id="sectionMedioPago">
				<span class="preimpreso">Mediante:</span> 
				<div class="row">
                                    <span><%=det.get(0).getTipoPago()%></span>
				</div>
			</section>
			
			<section>
                            <span class="preimpreso">En concepto de:</span>
                            <% double montoT = 0; %>
                            <% for(int i = 0; i < det.size(); i++){ 
                                 montoT = montoT + det.get(i).getPaquete().getPrecioPaquete(); %>
				<div class="row">
                                    <span> <%=det.get(i).getPaquete().getNombrePaquete()%> </span>
					<span name="a" class="pull-right negrita"> <%=det.get(i).getPaquete().getPrecioPaquete()%> Bs</span>
				</div>
                                <% } %>
				<!--<div class="row">
					<span>Chipote chill&oacute;n</span>
					<span name="a" class="pull-right negrita importeEnPesos">45.000</span>
				</div>
				<div class="row">
					<span>Pastillas de Chiquitolina</span>
					<span name="a" class="pull-right negrita importeEnPesos">500</span>
				</div>
				<div class="row">
					<span>Antenitas de vinil</span>
					<span name="a" class="pull-right negrita importeEnPesos">37</span>
				</div>
				<div class="row">
					<span>Chicharra Paralizadora</span>
					<span name="a" class="pull-right negrita importeEnPesos">486.563</span>
				</div> -->
			</section>
			
			<footer>
				
				<section id="son"> <span class="preimpreso">SON:</span> 
					<output id="totalRecibo" class="negrita"> <%=montoT%> Bs</output> 
				</section>
				
				<section id="firma">
					<div id="hr" class="pull-right">&nbsp;</div>
					<p class="text-right">Calistenia Bolivia</p>
				</section>
				
			</footer>
		</div><!-- bordeRecibo -->
	</div><!-- Page1 -->
</body>
</html>
