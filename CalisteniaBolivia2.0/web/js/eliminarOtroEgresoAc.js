$(function(){
    $('tr #btn-eliminar').click(function(e){
        e.preventDefault
        var opcion = confirm("Desea Eliminar el Egreso?")
        if(opcion){
            var fila = $(this).parent().parent();
            var idOtroEgresoAct =fila.find('#idOtroEgresoAct').text();
            var Monto =fila.find('#Monto').text();
            var Observacion =fila.find('#Observacion').text();
            var Tipo =fila.find('#Tipo').text();
            //alert(idOtroEgresoAct);
            var data = {idOtroEgresoAct:idOtroEgresoAct,
                        Monto:Monto,
                        Observacion:Observacion,
                        Tipo:Tipo};
            $.post("deleteOtroEgresoAct", data,function(res, est, jqXHR){
                alert(res);
                fila.remove();
            });
        }
    });
}); 


