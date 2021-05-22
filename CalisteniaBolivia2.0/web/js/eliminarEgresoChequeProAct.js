$(function(){
    $('tr #btn-eliminar').click(function(e){
        e.preventDefault
        var opcion = confirm("Desea Eliminar el Egreso de Transacciones?")
        if(opcion){
            var fila = $(this).parent().parent();
            var idEgresoChequeProAct =fila.find('#idEgresoChequeProAct').text();
            //alert(idEgresoChequeProAct);
            var data = {idEgresoChequeProAct:idEgresoChequeProAct};
            $.post("deleteEgresoChequeProAct", data,function(res, est, jqXHR){
                alert(res);
                fila.remove();
            });
        }
    });
}); 
