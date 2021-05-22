$(function(){
    $('tr #deleteitem').click(function(e){
        e.preventDefault();
        var elemento=$(this);
        var idCliente =elemento.parent().find('#idCliente').text();
        $.ajax({
            url:'borrarItem',
            types:'post',
            data:{idCliente : idCliente},
            success: function(r){
                elemento.parent().parent().remove();
            }
        })
    });
});

