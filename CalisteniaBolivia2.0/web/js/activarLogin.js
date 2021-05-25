$(function(){
    $('tr #btn-activar').click(function(e){
        e.preventDefault
        var opcion = confirm("Desea activar la cuenta de este Usuario?")
        if(opcion){
            var fila = $(this).parent().parent();
            var idLogin =fila.find('#idLogin').text();
            //alert(idLogin);
            var data = {idLogin:idLogin};
            $.post("enableLogin", data,function(res, est, jqXHR){
                alert(res);
                fila.remove();
            });
        }
    });
}); 

