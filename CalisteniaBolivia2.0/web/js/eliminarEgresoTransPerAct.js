$(function(){
    $('tr #btn-eliminar2').click(function(e){
        e.preventDefault
        var opcion = confirm("Desea Eliminar el Egreso de Transacciones?")
        if(opcion){
            var fila = $(this).parent().parent();
            var idEgresoTransPerAct =fila.find('#idEgresoTransPerAct').text();
            //alert(idEgresoChequeTransPerAct);
            var data = {idEgresoTransPerAct:idEgresoTransPerAct};
            $.post("deleteEgresoTransPerAct", data,function(res, est, jqXHR){
                alert(res);
                fila.remove();
            });
        }
    });
}); 
