$(function(){
    $('tr #deleteitem1').click(function(e){
        e.preventDefault();
        var elemento=$(this);
        var idCliente =elemento.parent().find('#idCliente').text();
        var r = confirm("Esta seguro que quiere eliminar el Usuario de la Fila?");
        if(r==true){
        $.ajax({
            url:'borrarItem1',
            types:'post',
            data:{idCliente : idCliente},
            success: function(r){
                elemento.parent().parent().remove();
            }
        })}
    });
});
