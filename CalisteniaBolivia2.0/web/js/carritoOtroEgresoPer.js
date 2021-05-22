$(function(){
    $('tr #deleteitem2').click(function(e){
        e.preventDefault();
        var elemento=$(this);
        var idPersonal =elemento.parent().find('#idPersonal').text();
        $.ajax({
            url:'borrarItem2',
            types:'post',
            data:{idPersonal : idPersonal},
            success: function(r){
                elemento.parent().parent().remove();
            }
        })
    });
});
