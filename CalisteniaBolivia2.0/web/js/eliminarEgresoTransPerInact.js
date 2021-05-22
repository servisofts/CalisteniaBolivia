$(function(){
    $('tr #btn-eliminar2').click(function(e){
        e.preventDefault
        var opcion = confirm("Desea Eliminar el Egreso?")
        if(opcion){
            var fila = $(this).parent().parent();
            var idEgresoTransPerInact =fila.find('#idEgresoTransPerInact').text();
            var MontoTransPerInact =fila.find('#MontoTransPerInact').text();
            var idCajaTransPerInact =fila.find('#idCajaTransPerInact').text();
            var NombrePersonal =fila.find('#NombrePersonal').text();
            var Tipo =fila.find('#Tipo').text();
            var Numero =fila.find('#Numero').text();
            var Tarjeta =fila.find('#Tarjeta').text();
            //alert(idEgresoTransPerInact+idCajaTransPerInact+MontoTransPerInact);
            var data = {idCajaTransPerInact:idCajaTransPerInact,
                        MontoTransPerInact:MontoTransPerInact,
                        idEgresoTransPerInact:idEgresoTransPerInact,
                        NombrePersonal:NombrePersonal,
                        Tipo:Tipo,
                        Numero:Numero,
                        Tarjeta:Tarjeta};
            $.post("deleteEgresoTransPerInact", data,function(res, est, jqXHR){
                alert(res);
                fila.remove();
            });
        }
    });
}); 
