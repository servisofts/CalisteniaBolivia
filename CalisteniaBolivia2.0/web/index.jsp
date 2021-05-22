<%-- 
    Document   : index
    Created on : 08-dic-2017, 20:48:16
    Author     : YakuRocaH
--%>

<%@page contentType="text/html" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Calistenia Bolivia</title>

    <!-- Bootstrap -->
    <link rel="stylesheet" type="text/css" href="vendors/bootstrap/dist/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link href="vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <!-- Animate.css -->
    <link href="https://colorlib.com/polygon/gentelella/css/animate.min.css" rel="stylesheet">
    <!-- FormValidator -->
    <link href="vendors/formvalidation/formValidation.min.css" rel="stylesheet">
    <!-- Custom Theme Style -->
    <link href="css/custom.min.css" rel="stylesheet">
    <link href="css/servisofts.css" rel="stylesheet">
    <script src="vendors/jquery/dist/jquery.js"></script>
    <script src="vendors/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="vendors/formvalidation/formValidation.min.js"></script>
    <script src="vendors/formvalidation/validator.js"></script>
     <script src="js/jquery.min.js"></script>
     <script src="js/sweetalert2.all.js"></script>   
  </head>
  <body class="login">
    
    <div>
      <a class="hiddenanchor" id="signup"></a>
      <a class="hiddenanchor" id="signin"></a>
      <div class="login_wrapper">
        <div class="animate form login_form">
        <img src="images/logo.png" alt="" width="350" height="100">
          <section class="login_content">
            <form id="signinForm" action="ServletLogueo" method="post" >
              <h1>Iniciar Sesión</h1>
              <div class="form-group">
                <input type="text" class="form-control" name="txbUsuario" placeholder="Usuario" id="nombre"/>
              </div>
              <div class="form-group">
                <input type="password" class="form-control" name="txbPass"  placeholder="Contraseña" id="password" />
              </div>
              <div>
                  <button class="form-control botonFormulario" type="submit" id="boton"/>Ingresar</button><!--value="Enviar"--> 
              <input type="hidden" name="accion" value="login"/>
              </div>

              <div class="clearfix"></div>
              
              
              <!--*************************
              <div class="separator">
                <p class="change_link">New to site?
                  <a href="#signup" class="to_register"> Create Account </a>
                </p>

                <div class="clearfix"></div>
                <br />

                <div>
                  <h1><i class="fa fa-paw"></i> Gentelella Alela!</h1>
                  <p>©2016 All Rights Reserved. Gentelella Alela! is a Bootstrap 3 template. Privacy and Terms</p>
                </div>
              </div>
              *************************-->
            </form>
              <h3 align="center" class="btn-danger source">
            <%
                if(request.getAttribute("msg")!=null)
                out.println(request.getAttribute("msg"));
                %>
        </h3>
        
          </section>
        </div>
      <!--*********************************
        <div id="register" class="animate form registration_form">
          <section class="login_content">
            <form>
              <h1>Create Account</h1>
              <div>
                <input type="text" class="form-control" placeholder="Username" required="" />
              </div>
              <div>
                <input type="email" class="form-control" placeholder="Email" required="" />
              </div>
              <div>
                <input type="password" class="form-control" placeholder="Password" required="" />
              </div>
              <div>
                <a class="btn btn-default submit" href="index.html">Submit</a>
              </div>

              <div class="clearfix"></div>

              <div class="separator">
                <p class="change_link">Already a member ?
                  <a href="#signin" class="to_register"> Log in </a>
                </p>

                <div class="clearfix"></div>
                <br />

                <div>
                  <h1><i class="fa fa-paw"></i> Gentelella Alela!</h1>
                  <p>©2016 All Rights Reserved. Gentelella Alela! is a Bootstrap 3 template. Privacy and Terms</p>
                </div>
              </div>
            </form>
          </section>
        </div>
        *************************-->
      
    </div>
<div class="ui-pnotify  ui-pnotify-fade-normal ui-pnotify-in ui-pnotify-fade-in ui-pnotify-move" aria-live="assertive" aria-role="alertdialog" style="display: none; width: 300px; right: 36px; top: 158px; cursor: auto;">
            <div class="alert ui-pnotify-container alert-danger ui-pnotify-shadow" role="alert" style="min-height: 16px;">
                <div class="ui-pnotify-closer" aria-role="button" tabindex="0" title="Close" style="cursor: pointer; visibility: hidden;">
                    <span class="glyphicon glyphicon-remove"></span>
                </div>
                <div class="ui-pnotify-sticker" aria-role="button" aria-pressed="false" tabindex="0" title="Unstick" style="cursor: pointer; visibility: hidden;"><span class="glyphicon glyphicon-play" aria-pressed="true"></span>
                </div><div class="ui-pnotify-icon"><span class="glyphicon glyphicon-warning-sign"></span>
                </div>
                <h4 class="ui-pnotify-title">Oh No!</h4>
                <div class="ui-pnotify-text" aria-role="alert"><%
                if(request.getAttribute("msg")!=null)
                out.println(request.getAttribute("msg"));
                %></div>       
            </div>       
        </div>
            
            <!--<div class="ssmodal"></div>-->
            
            <script>
                $(document).on('click', '#boton', function(){
                    var nombre = document.getElementById("nombre").value;
                    var pass = document.getElementById("password").value;
                        $.post('ServletLogin', {
                            txbUsuario : nombre,
                            txbPass : pass
			}, function(responseText) {
                            //alert("hola");
                            console.log(responseText);
                            //$("#txtIdCajaCp").val(responseText);
			});
});
                </script>
                
  </body>
  <style type="text/css">
    html {background:url("images/fondo.jpg")!important;
          background-size:     cover !important;
          background-repeat:   no-repeat !important
          background-position: center center !important;}
    h1 {
  color: white !important;}
    
    </style>
</html>



