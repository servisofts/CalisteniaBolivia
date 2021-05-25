$(function(){
    $('tr #btn-desactivar').click(function(e){
        e.preventDefault
        var opcion = confirm("Desea desactivar la cuenta de este Usuario?")
        if(opcion){
            var fila = $(this).parent().parent();
            var idSucursal =fila.find('#idSucursal').text();
            //alert(idSucursal);
            var data = {idSucursal:idSucursal};
            $.post("disableSucursal", data,function(res, est, jqXHR){
                alert(res);
                fila.remove();
            });
        }
    });
}); 




