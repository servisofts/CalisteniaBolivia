$(function(){
    $('tr #btn-eliminar1').click(function(e){
        e.preventDefault
        var opcion = confirm("Desea Eliminar el Egreso de Cheque?")
        if(opcion){
            var fila2 = $(this).parent().parent();
            var idCajaChequeProInact1 =fila2.find('#idCajaChequeProInact1').text();
            var MontoChequeProInact1 =fila2.find('#MontoChequeProInact1').text();
            var idEgresoChequeProInact1 =fila2.find('#idEgresoChequeProInact1').text();
            //alert(idEgresoTransProInact+' ' +idCajaTransProInact+' '+MontoTransProInact);
            var data = {idCajaChequeProInact1:idCajaChequeProInact1,
                        MontoChequeProInact1:MontoChequeProInact1,
                        idEgresoChequeProInact1:idEgresoChequeProInact1};
            $.post("deleteEgresoChequeProInact", data,function(res, est, jqXHR){
                alert(res);
                fila2.remove();
            });
        }
    });
}); 

