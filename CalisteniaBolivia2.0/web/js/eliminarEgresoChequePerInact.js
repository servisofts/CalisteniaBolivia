$(function(){
    $('tr #btn-eliminar').click(function(e){
        e.preventDefault
        var opcion = confirm("Desea Eliminar el Egreso?")
        if(opcion){
            var fila = $(this).parent().parent().parent();
            var idEgresoChequeTransPerInac =fila.find('#idEgresoChequeTransPerInac').text();
            var NombrePersonal =fila.find('#NombrePersonal').text();
            var Tipo =fila.find('#Tipo').text();
            var Numero =fila.find('#Numero').text();
            var idCajaChequePerInac =fila.find('#idCajaChequePerInac').text();
            var MontoChequePerInac =fila.find('#MontoChequePerInac').text();
            //alert(idEgresoChequeTransPerInac+idCajaChequePerInac+MontoChequePerInac+Motivo);
            var data = {idCajaChequePerInac:idCajaChequePerInac,
                        MontoChequePerInac:MontoChequePerInac,
                        idEgresoChequeTransPerInac:idEgresoChequeTransPerInac,
                        NombrePersonal:NombrePersonal,
                        Tipo:Tipo,
                        Numero:Numero};
            $.post("deleteEgresoChequePerInact", data,function(res, est, jqXHR){
                alert(res);
                fila.remove();
            });
        }
    });
}); 
