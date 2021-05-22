$(function(){
    $('tr #deleteitem3').click(function(e){
        e.preventDefault();
        var elemento=$(this);
        var idProveedor =elemento.parent().find('#idProveedor').text();
        $.ajax({
            url:'borrarItem3',
            types:'post',
            data:{idProveedor : idProveedor},
            success: function(r){
                elemento.parent().parent().remove();
            }
        })
    });
});
