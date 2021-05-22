$(function(){
    $('tr #btn-eliminar').click(function(e){
        e.preventDefault
        var opcion = confirm("Desea Eliminar el Egreso?")
        if(opcion){
            var fila = $(this).parent().parent();
            var idEgresoChequeTransPerAct =fila.find('#idEgresoChequeTransPerAct').text();
            //alert(idEgresoChequeTransPerAct);
            var data = {idEgresoChequeTransPerAct:idEgresoChequeTransPerAct};
            $.post("delete1EgresoChequeTransPerAct1", data,function(res, est, jqXHR){
                alert(res);
                fila.remove();
            });
        }
    });
}); 
