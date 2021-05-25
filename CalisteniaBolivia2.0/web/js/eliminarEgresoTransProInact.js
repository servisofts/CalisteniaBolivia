$(function(){
    $('tr #btn-eliminar2').click(function(e){
        e.preventDefault
        var opcion = confirm("Desea Eliminar el Egreso de Transacciones?")
        if(opcion){
            var fila = $(this).parent().parent();
            var idCajaTransProInact =fila.find('#idCajaTransProInact').text();
            var MontoTransProInact =fila.find('#MontoTransProInact').text();
            var idEgresoTransProInact =fila.find('#idEgresoTransProInact').text();
            //alert(idEgresoTransProInact+' ' +idCajaTransProInact+' '+MontoTransProInact);
            var data = {idCajaTransProInact:idCajaTransProInact,
                        MontoTransProInact:MontoTransProInact,
                        idEgresoTransProInact:idEgresoTransProInact};
            $.post("deleteEgresoTransProInact", data,function(res, est, jqXHR){
                alert(res);
                fila.remove();
            });
        }
    });
}); 
