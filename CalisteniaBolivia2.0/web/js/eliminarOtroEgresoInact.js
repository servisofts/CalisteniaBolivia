$(function(){
    $('tr #btn-eliminar').click(function(e){
        e.preventDefault
        var opcion = confirm("Desea Eliminar el Egreso?")
        if(opcion){
            var fila = $(this).parent().parent();
            var idCajaInact =fila.find('#idCajaInact').text();
            var MontoInact =fila.find('#MontoInact').text();
            var Observacion =fila.find('#Observacion').text();
            var idOtroEgresoInact =fila.find('#idOtroEgresoInact').text();
            var Tipo =fila.find('#Tipo').text();
            //alert(idOtroEgresoInact+idCajaInact+MontoInact+Tipo);
            var data = {idCajaInact:idCajaInact,
                        MontoInact:MontoInact,
                        Observacion:Observacion,
                        idOtroEgresoInact:idOtroEgresoInact,
                        Tipo:Tipo};
            $.post("deleteOtroEgresoInact", data,function(res, est, jqXHR){
                alert(res);
                fila.remove();
            });
        }
    });
}); 

