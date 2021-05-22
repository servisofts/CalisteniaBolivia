    function MensajedeAlerta(estado, descripcion, tiempo, miCallback) {
        if ($('#mensajeAlerta').is(":hidden")) {
            var clase;
            switch (estado) {
                case 0:
                    clase = 'alert-success';
                    break;
                case 1:
                    clase = 'alert-danger';
                    break;
                case 2:
                    clase = 'alert-info';
                    break;
                case 3:
                    clase = 'alert-warning';
                    break;
            }
            $('#mensajeAlerta').removeClass("alert-success alert-danger alert-info alert-warning");
            $('#mensajeAlerta').addClass(clase);
            $('#mensajeAlerta').empty();
            $('#mensajeAlerta').append(descripcion);
            $('#mensajeAlerta').fadeIn("slow").delay(tiempo).fadeOut("slow", function() {
                if (miCallback !== '') {
                    miCallback();
                }
            });
        }
    }