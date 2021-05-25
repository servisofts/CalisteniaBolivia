$(document).ready(function() {
    $('#signinForm').formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            password: {
                validators: {
                    notEmpty: {
                        message: 'Introduce tu contraseña.'
                    }
                }
            },
            email: {
                validators: {
                    emailAddress: {
                        message: ' '
                    },
                    notEmpty: {
                        message: 'Introduce tu correo electrónico.'
                    },
                    regexp: {
                        regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
                        message: 'Introduce una dirección de correo electrónico válido'
                    }
                }
            },
        }
    }).on('success.form.fv', function(e) {
        e.preventDefault();
        var $form = $(e.target),
            fv = $form.data('formValidation');
        $.ajax({
            url: $form.attr('action'),
            type: 'POST',
            dataType: 'json',
            data: $form.serialize(),
            beforeSend: function() {
                $('#signinForm').parent('.login_content').prepend('<div class="loader"></div>');
            },
            success: function(result) {
                $('.loader').remove();
                console.log(result);
                if (result.estado == "0") {
                    MensajedeAlerta(0, result.mensaje, 2000, function() {
                        window.location = result.url;
                    });
                    $("form")[0].reset();
                } else {
                    $("#password").val("").focus();
                    MensajedeAlerta(1, result.mensaje, 4000, '');
                }
            },
            error: function() {
                MensajedeAlerta(1, "Algo no funciona como se esperaba. :(", 4000, '');
            }
        });
    });
});