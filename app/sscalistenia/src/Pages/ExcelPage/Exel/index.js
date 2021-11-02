
function reporte_EXCEL() {
    var notificarTermino;
    var colores = {
        negro: 'FF000000',
        silver: 'FFC0C0C0',
        rojo: 'FFF8C1BA',
        azul: 'FF5291AF',
        amarillo: 'FFFCF6B8',
        blanco: 'FFFFFFFF',
        verde: 'FFB3E4C7',
        naranja: 'FFEB7D30',
        celeste: '548DD4'
    };

    var confDefault = {
        cabeceraTabla: {
            relleno: "FF16365C",
            negrilla: true,
            alineacionVertical: 'center',
            alineacionHorizontal: 'center'
        },
        cuerpoTabla: {
            alineacionVertical: 'center'
        },
        pieTabla: {
            relleno: colores.silver,
            negrilla: true,
            alineacionVertical: 'center'
        },
        linea: {
            color: colores.negro,
            grosor: 'medium'
        },
        estiloTitulo: {
            negrilla: true,
            tamanoFuente: 15
        },
        margen: {
            arriba: 10,
            izquierda: 10
        }
    };

    this.descargarExcel = function (opciones) {
        var fila = 1;
        opciones = opciones || {};
        $.extend(true, opciones, confDefault);

        var workbook = ExcelBuilder.Builder.createWorkbook();
        var titulo_libro = opciones.titulo_libro || opciones.titulo || "PRUEBA";
        if (titulo_libro.length > 30) {
            titulo_libro = titulo_libro.substring(0, 29);
        }

        var titulo = opciones.titulo || "";
        var nHoja = opciones.nombreHoja || opciones.titulo || "Hoja";
        var worksheet = workbook.createWorksheet({name: nHoja.substr(0, 31)});
        var stylesheet = workbook.getStyleSheet();
        ////////////////////////////////////////////////////////////////

        //<editor-fold defaultstate="collapsed" desc="ESTILOS">       
        // Para crear un nuevo estilo se necesita crear la definicion y el estilo
        //<editor-fold defaultstate="collapsed" desc="Definiciones">
        // varios
        var estiloCabeceraDef = {
            font: {
                bold: opciones.cabeceraTabla.negrilla,
                color: colores.blanco
            },
            border: {
                bottom: {color: colores.blanco, style: opciones.linea.grosor},
                top: {color: colores.blanco, style: opciones.linea.grosor},
                left: {color: colores.blanco, style: opciones.linea.grosor},
                right: {color: colores.blanco, style: opciones.linea.grosor}
            },
            alignment: {
                horizontal: 'center',
                vertical: 'center',
                wrapText: true
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: opciones.cabeceraTabla.relleno
            }
        };
        var estiloCabeceraCelesteDef = {
            font: {
                bold: opciones.cabeceraTabla.negrilla,
            },
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                horizontal: 'center',
                vertical: 'center',
                wrapText: true
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: 'FFF'
            }
        };
        var estiloCeldaCentradoDef = {
            font: {
                bold: opciones.cabeceraTabla.negrilla
            },
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                horizontal: 'center',
                vertical: 'center',
                wrapText: true
            }
        };
        var estiloCeldaDef = {
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center',
                wrapText: true
            }
        };
        var estiloCeldaTextoDef = {
            format: 49,
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center',
                wrapText: true
            }
        };
        var estiloCeldaSBDef = {
            alignment: {
                vertical: 'center',
                wrapText: true
            }
        };
        var estiloCeldaDerechaDef = {
            font: {
                bold: opciones.cabeceraTabla.negrilla
            },
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                horizontal: 'right',
                vertical: 'center',
                wrapText: true
            }
        };
        var estiloCeldaRojoDef = {
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center',
                wrapText: true
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: colores.rojo
            }
        };
        var estiloCeldaAzulDef = {
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center',
                wrapText: true
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: colores.azul
            }
        };
        var estiloCeldaAmarilloDef = {
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center',
                wrapText: true
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: colores.amarillo
            }
        };
        var estiloCeldaVerdeDef = {
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center',
                wrapText: true
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: colores.verde
            }
        };
        var estiloCeldaNaranjaDef = {
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center',
                wrapText: true
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: colores.naranja
            }
        };
        var estiloCeldacelesteDef = {
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                horizontal: 'center',
                vertical: 'center',
                wrapText: true
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: colores.celeste
            }
        };
        var estiloCeldaNegritaDef = {
            font: {
                bold: true
            },
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center',
                wrapText: true
            }
        };
        var estiloCeldaNegritaSBDef = {
            font: {
                bold: true
            },
            alignment: {
                vertical: 'center',
                wrapText: true
            }
        };
        var estituloTituloDef = {
            font: {
                bold: opciones.estiloTitulo.negrilla,
                size: opciones.estiloTitulo.tamanoFuente
            },
            alignment: {
                horizontal: 'center',
                vertical: 'center'
            }
        };
        var estiloPieTablaDef = {
            font: {
                bold: opciones.cabeceraTabla.negrilla,
                color: colores.blanco
            },
            border: {
                bottom: {color: colores.blanco, style: opciones.linea.grosor},
                top: {color: colores.blanco, style: opciones.linea.grosor},
                left: {color: colores.blanco, style: opciones.linea.grosor},
                right: {color: colores.blanco, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center',
                wrapText: true
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: opciones.cabeceraTabla.relleno
            }
        };
        //Numerico
        var estiloCeldaRojoNumeroDef = {
            format: '0.00',
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center',
                wrapText: true
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: colores.rojo
            }
        };
        var estiloCeldaAmarilloNumeroDef = {
            format: '0.00',
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center',
                wrapText: true
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: colores.amarillo
            }
        };
        var estiloCeldaVerdeNumeroDef = {
            format: '0.00',
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center',
                wrapText: true
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: colores.verde
            }
        };
        var estiloCeldaVerdeNumeroDefSb = {
            format: '0.00',
            alignment: {
                vertical: 'center',
                wrapText: true
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: colores.verde
            }
        };
        var estiloCeldaDecimalDef = {
            format: '0.00',
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
//                horizontal: "right",
                vertical: 'center'
            }
        };
        var estiloCeldaDecimalDefSb = {
            format: 4,
            alignment: {
//                horizontal: "right",
                vertical: 'center'
            }
        };
        var estiloCeldaDecimalNegritaDef = {
            font: {
                bold: true
            },
            format: '0.00',
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center'
            }
        };
        var estiloCeldaDecimalRedondeadoNegritaDef = {
            font: {
                bold: true
            },
            format: 4,
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
//                horizontal: "right",
                vertical: 'center'
            }
        };
        var estiloCeldaDecimalRedondeadoNegritaDefSb = {
            font: {
                bold: true
            },
            format: 4,
            alignment: {
//                horizontal: "right",
                vertical: 'center'
            }
        };
        var estiloCeldaDecimal2FormatoDef = {
            format: 4,
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center'
            }
        };
        var estiloPieTablaDecimalDef = {
            format: '0.00',
            font: {
                bold: opciones.cabeceraTabla.negrilla,
                color: colores.blanco
            },
            border: {
                bottom: {color: colores.blanco, style: opciones.linea.grosor},
                top: {color: colores.blanco, style: opciones.linea.grosor},
                left: {color: colores.blanco, style: opciones.linea.grosor},
                right: {color: colores.blanco, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center',
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: opciones.cabeceraTabla.relleno
            }
        };
        var estiloPieTablaDecimal2FormatoDef = {
            format: 4,
            font: {
                bold: opciones.cabeceraTabla.negrilla,
                color: colores.blanco
            },
            border: {
                bottom: {color: colores.blanco, style: opciones.linea.grosor},
                top: {color: colores.blanco, style: opciones.linea.grosor},
                left: {color: colores.blanco, style: opciones.linea.grosor},
                right: {color: colores.blanco, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center',
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: opciones.cabeceraTabla.relleno
            }
        };
        var estiloCeldaPorcentajeDef = {
            format: 10,
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center'
            }
        };
        // Fecha
        var estiloCeldaFechaDef = {
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center',
                wrapText: true
            },
            format: 14 /// formato fecha
        };
        var estiloCeldaFechaSBDef = {
            alignment: {
                vertical: 'center',
                wrapText: true
            },
            format: 14 /// formato fecha
        };
        var estiloCeldaFechaNegritaDef = {
            font: {
                bold: true
            },
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center',
                wrapText: true
            },
            format: 14 /// formato fecha
        };
        var estiloCeldaFechaNegritaSBDef = {
            font: {
                bold: true
            },
            alignment: {
                vertical: 'center',
                wrapText: true
            },
            format: 14 /// formato fecha
        };
        var estiloCeldaFechaRojoDef = {
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center',
                wrapText: true
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: colores.rojo
            },
            format: 14 /// formato fecha
        };
        var estiloCeldaFechaAzulDef = {
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center',
                wrapText: true
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: colores.azul
            },
            format: 14 /// formato fecha
        };
        var estiloCeldaFechaAmarilloDef = {
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center',
                wrapText: true
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: colores.amarillo
            },
            format: 14 /// formato fecha
        };
        var estiloCeldaFechaVerdeDef = {
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center',
                wrapText: true
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: colores.verde
            },
            format: 14 /// formato fecha
        };
        var estiloCeldaFechaNaranjaDef = {
            border: {
                bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                top: {color: opciones.linea.color, style: opciones.linea.grosor},
                left: {color: opciones.linea.color, style: opciones.linea.grosor},
                right: {color: opciones.linea.color, style: opciones.linea.grosor}
            },
            alignment: {
                vertical: 'center',
                wrapText: true
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: colores.naranja
            },
            format: 14 /// formato fecha
        };

        var estilosDef = {
            // varios
            cabeceraTabla: estiloCabeceraDef,
            cabeceraCeleste: estiloCabeceraCelesteDef,
            celdaCentrado: estiloCeldaCentradoDef,
            celda: estiloCeldaDef,
            celdaTexto: estiloCeldaTextoDef,
            celdaSB: estiloCeldaSBDef,
            celdaDerecha: estiloCeldaDerechaDef,
            celdaRojo: estiloCeldaRojoDef,
            celdaAzul: estiloCeldaAzulDef,
            celdaAmarillo: estiloCeldaAmarilloDef,
            celdaVerde: estiloCeldaVerdeDef,
            celdaNaranja: estiloCeldaNaranjaDef,
            celdaceleste: estiloCeldacelesteDef,
            celdaNegrita: estiloCeldaNegritaDef,
            celdaNegritaSB: estiloCeldaNegritaSBDef,
            titulo: estituloTituloDef,
            pieTabla: estiloPieTablaDef,
            //Numerico
            celdaRojoNumeroDef: estiloCeldaRojoNumeroDef,
            celdaAmarilloNumeroDef: estiloCeldaAmarilloNumeroDef,
            celdaVerdeNumeroDef: estiloCeldaVerdeNumeroDef,
            celdaVerdeNumeroDefSb: estiloCeldaVerdeNumeroDefSb,
            celdaNumerica: estiloCeldaDecimalDef,
            celdaNumericaDecimalSb: estiloCeldaDecimalDefSb,
            celdaDecimalNegrita: estiloCeldaDecimalNegritaDef,
            celdaDecimalRedondeadoNegritaDef: estiloCeldaDecimalRedondeadoNegritaDef,
            celdaDecimalRedondeadoNegritaDefSb: estiloCeldaDecimalRedondeadoNegritaDefSb,
            celdaDecimal2FormatoDef: estiloCeldaDecimal2FormatoDef,
            pieTablaDecimal: estiloPieTablaDecimalDef,
            pieTablaDecimal2Formato: estiloPieTablaDecimal2FormatoDef,
            celdaPorcentajeDef: estiloCeldaPorcentajeDef,
            // Fecha
            celdaFecha: estiloCeldaFecha,
            celdaFechaSB: estiloCeldaFechaSBDef,
            celdaFechaNegrita: estiloCeldaFechaNegritaDef,
            celdaFechaNegritaSB: estiloCeldaFechaNegritaSBDef,
            celdaFechaRojo: estiloCeldaFechaRojoDef,
            celdaFechaAzulDef: estiloCeldaFechaAzulDef,
            celdaFechaAmarillo: estiloCeldaFechaAmarilloDef,
            celdaFechaVerde: estiloCeldaFechaVerdeDef,
            celdaFechaNaranja: estiloCeldaFechaNaranjaDef,
            celdaDecimal2Formato: estiloCeldaDecimal2FormatoDef
        };
        //</editor-fold>

        //<editor-fold defaultstate="collapsed" desc="Estilos">
        // varios
        var estiloCabecera = stylesheet.createFormat(estiloCabeceraDef);
        var estiloCabeceraCeleste = stylesheet.createFormat(estiloCabeceraCelesteDef);
        var estiloCelda = stylesheet.createFormat(estiloCeldaDef);
        var estiloCeldaTexto = stylesheet.createFormat(estiloCeldaTextoDef);
        var estiloCeldaSB = stylesheet.createFormat(estiloCeldaSBDef);
        var estiloCeldaCentrado = stylesheet.createFormat(estiloCeldaCentradoDef);
        var estiloCeldaDerecha = stylesheet.createFormat(estiloCeldaDerechaDef);
        var estiloCeldaRojo = stylesheet.createFormat(estiloCeldaRojoDef);
        var estiloCeldaAzul = stylesheet.createFormat(estiloCeldaAzulDef);
        var estiloCeldaAmarillo = stylesheet.createFormat(estiloCeldaAmarilloDef);
        var estiloCeldaVerde = stylesheet.createFormat(estiloCeldaVerdeDef);
        var estiloCeldaNaranja = stylesheet.createFormat(estiloCeldaNaranjaDef);
        var estiloCeldaCeleste = stylesheet.createFormat(estiloCeldacelesteDef);
        var estiloCeldaNegrita = stylesheet.createFormat(estiloCeldaNegritaDef);
        var estiloCeldaNegritaSB = stylesheet.createFormat(estiloCeldaNegritaSBDef);
        var estituloTitulo = stylesheet.createFormat(estituloTituloDef);
        var estiloPieTabla = stylesheet.createFormat(estiloPieTablaDef);
        //Numerico
        var estiloCeldaRojoNumero = stylesheet.createFormat(estiloCeldaRojoNumeroDef);
        var estiloCeldaAmarilloNumero = stylesheet.createFormat(estiloCeldaAmarilloNumeroDef);
        var estiloCeldaVerdeNumero = stylesheet.createFormat(estiloCeldaVerdeNumeroDef);
        var estiloCeldaVerdeNumeroSb = stylesheet.createFormat(estiloCeldaVerdeNumeroDefSb);
        var estiloCeldaDecimal = stylesheet.createFormat(estiloCeldaDecimalDef);
        var estiloCeldaDecimalSb = stylesheet.createFormat(estiloCeldaDecimalDefSb);
        var estiloCeldaDecimalNegrita = stylesheet.createFormat(estiloCeldaDecimalNegritaDef);
        var estiloCeldaDecimalRedondeadoNegrita = stylesheet.createFormat(estiloCeldaDecimalRedondeadoNegritaDef);
        var estiloCeldaDecimalRedondeadoNegritaSb = stylesheet.createFormat(estiloCeldaDecimalRedondeadoNegritaDefSb);
        var estiloCeldaDecimal2Formato = stylesheet.createFormat(estiloCeldaDecimal2FormatoDef);
        var estiloPieTablaDecimal = stylesheet.createFormat(estiloPieTablaDecimalDef);
        var estiloPieTablaDecimal2Formato = stylesheet.createFormat(estiloPieTablaDecimal2FormatoDef);
        var estiloCeldaPorcentaje = stylesheet.createFormat(estiloCeldaPorcentajeDef);
        //Fecha
        var estiloCeldaFecha = stylesheet.createFormat(estiloCeldaFechaDef);
        var estiloCeldaFechaSB = stylesheet.createFormat(estiloCeldaFechaSBDef);
        var estiloCeldaFechaNegrita = stylesheet.createFormat(estiloCeldaFechaNegritaDef);
        var estiloCeldaFechaNegritaSB = stylesheet.createFormat(estiloCeldaFechaNegritaSBDef);
        var estiloCeldaFechaRojo = stylesheet.createFormat(estiloCeldaFechaRojoDef);
        var estiloCeldaFechaAzul = stylesheet.createFormat(estiloCeldaFechaAzulDef);
        var estiloCeldaFechaAmarillo = stylesheet.createFormat(estiloCeldaFechaAmarilloDef);
        var estiloCeldaFechaVerde = stylesheet.createFormat(estiloCeldaFechaVerdeDef);
        var estiloCeldaFechaNaranja = stylesheet.createFormat(estiloCeldaFechaNaranjaDef);

        var estilos = {
            // varios
            cabeceraTabla: estiloCabecera,
            cabeceraCeleste: estiloCabeceraCeleste,
            celda: estiloCelda,
            celdaTexto: estiloCeldaTexto,
            celdaSB: estiloCeldaSB,
            celdaCentrado: estiloCeldaCentrado,
            celdaDerecha: estiloCeldaDerecha,
            celdaAzul: estiloCeldaAzul,
            celdaRojo: estiloCeldaRojo,
            celdaAmarillo: estiloCeldaAmarillo,
            celdaVerde: estiloCeldaVerde,
            celdaNaranja: estiloCeldaNaranja,
            celdaCeleste: estiloCeldaCeleste,
            celdaNegrita: estiloCeldaNegrita,
            celdaNegritaSB: estiloCeldaNegritaSB,
            titulo: estituloTitulo,
            pieTabla: estiloPieTabla,
            //Numerico
            celdaRojoNumero: estiloCeldaRojoNumero,
            celdaAmarilloNumero: estiloCeldaAmarilloNumero,
            celdaVerdeNumero: estiloCeldaVerdeNumero,
            celdaVerdeNumeroSb: estiloCeldaVerdeNumeroSb,
            celdaNumericaDecimal: estiloCeldaDecimal,
            celdaNumericaDecimalSb: estiloCeldaDecimalSb,
            celdaDecimalNegrita: estiloCeldaDecimalNegrita,
            celdaDecimalRedondeadoNegrita: estiloCeldaDecimalRedondeadoNegrita,
            celdaDecimalRedondeadoNegritaSb: estiloCeldaDecimalRedondeadoNegritaSb,
            celdaDecimal2Formato: estiloCeldaDecimal2Formato,
            pieTablaDecimal: estiloPieTablaDecimal,
            pieTablaDecimal2Formato: estiloPieTablaDecimal2Formato,
            celdaPorcentaje: estiloCeldaPorcentaje,
            //Fecha
            celdaFecha: estiloCeldaFecha,
            celdaFechaSB: estiloCeldaFechaSB,
            celdaFechaNegrita: estiloCeldaFechaNegrita,
            celdaFechaNegritaSB: estiloCeldaFechaNegritaSB,
            celdaFechaAzul: estiloCeldaFechaAzul,
            celdaFechaRojo: estiloCeldaFechaRojo,
            celdaFechaAmarillo: estiloCeldaFechaAmarillo,
            celdaFechaVerde: estiloCeldaFechaVerde,
            celdaFechaNaranja: estiloCeldaFechaNaranja
        };

        //</editor-fold>


        //</editor-fold>
        var tabla;
        var tabTitulo = [];
        var pos_tit_f = 1;
        var desde_cc, hasta_cc;
        var op_cc;
        if (!opciones.sinTitulo) {
            fila = 3;
            tabla = opciones.getTabla(estilos, fila, $.extend(true, {}, estilosDef), colores, stylesheet);

            tabTitulo = [];
            pos_tit_f = 1;
            if (tabla.length > 0) {
                pos_tit_f = tabla[0].length;
            }
            tabTitulo.push(armarContenidoCelda(titulo, estituloTitulo));
            tabla.unshift(tabTitulo, []);

            worksheet.setData(tabla);

            if (!opciones.combinarCeldas) {
                opciones.combinarCeldas = [];
            }

            opciones.combinarCeldas.push({s: {f: 1, c: 1}, t: {f: 1, c: pos_tit_f}});
            for (var i_i = 0; i_i < opciones.combinarCeldas.length; i_i++) {
                op_cc = opciones.combinarCeldas[i_i];
                desde_cc = columnaToLetra(op_cc.s.c) + op_cc.s.f + "";
                hasta_cc = columnaToLetra(op_cc.t.c) + op_cc.t.f + "";
                worksheet.mergeCells(desde_cc, hasta_cc); //merge cells from A1 to C1
            }
        } else {
            fila = 1;
            tabla = opciones.getTabla(estilos, fila, $.extend(true, {}, estilosDef), colores, stylesheet);

            tabTitulo = [];
            pos_tit_f = 1;
            if (tabla.length > 0) {
                pos_tit_f = tabla[0].length;
            }
            //tabTitulo.push(armarContenidoCelda(titulo, estituloTitulo));
            //tabla.unshift(tabTitulo, []);

            worksheet.setData(tabla);

            if (!opciones.combinarCeldas) {
                opciones.combinarCeldas = [];
            }

            //opciones.combinarCeldas.push({s: {f: 1, c: 1}, t: {f: 1, c: pos_tit_f}});
            desde_cc, hasta_cc;
            for (var i_i = 0; i_i < opciones.combinarCeldas.length; i_i++) {
                op_cc = opciones.combinarCeldas[i_i];
                desde_cc = columnaToLetra(op_cc.s.c) + op_cc.s.f + "";
                hasta_cc = columnaToLetra(op_cc.t.c) + op_cc.t.f + "";
                worksheet.mergeCells(desde_cc, hasta_cc); //merge cells from A1 to C1
            }
        }


        if (typeof opciones.tamanoColumnas === 'function') {
            var ajuste = 0.71;
            worksheet.setColumns(opciones.tamanoColumnas(ajuste));
        }

        if (opciones.estiloFilas) {
            try {
                for (var i = 0; i < opciones.estiloFilas.length; i++) {
                    let estiloF = opciones.estiloFilas[i];
                    worksheet.setRowInstructions(estiloF.fila, estiloF.estilo);
                }
            } catch (e) {
                console.error(e)
            }
        }
        workbook.addWorksheet(worksheet);

        if (opciones.imagenes) {
            var drawings = new ExcelBuilder.Drawings();
            for (var i = 0; i < opciones.imagenes.length; i++) {
                var imagen = opciones.imagenes[i];

                var picRef = workbook.addMedia('image', imagen.nombre, imagen.base64);
                var picture = new ExcelBuilder.Drawing.Picture();
                // para xoff revisar la documentacion 
                // http://officeopenxml.com/drwPicInSpread-twoCell.php
                // https://c-rex.net/projects/samples/ooxml/e1/Part4/OOXML_P4_DOCX_twoCellAnchor_topic_ID0EZQOPB.html
//                posicion: {
//                    from: {x: 0, y: 0, xOff: 209550, yOff: 123825},
//                    to: {x: 7, y: 4, xOff: 981075, yOff: 142874 }
//                }
                picture.createAnchor('twoCellAnchor', imagen.posicion);
                picture.setMedia(picRef);
                drawings.addDrawing(picture);
            }
            worksheet.addDrawings(drawings);
            workbook.addDrawings(drawings);
        }
        //</editor-fold>

        var nombre_archivo = opciones.nombreArchivo || "Reporte Excel";
        var mimetype = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        ExcelBuilder.Builder.createFile(workbook).then(function (data) {
            if (!document.getElementById("downloader_Excel_link")) {
                var a = document.createElement('a');
                a.id = 'downloader_Excel_link';
                a.textContent = 'Click me!';
                a.style = 'display:none;';
                a.download = 'Reporte_Excel.xlsx';
                document.body.appendChild(a);
            }
            var a = document.getElementById("downloader_Excel_link");
            a.download = nombre_archivo + '.xlsx';
//            a.href = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + data;
            var ddd = new Blob([s2ab(atob(data))], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            var csvUrl = URL.createObjectURL(ddd);
            a.href = csvUrl;
            a.click();
            if (typeof notificarTermino === 'function') {
                notificarTermino(true);
            }
        });
//        ExcelBuilder.Builder.createFile(workbook, {type: "blob"}).then(function (data) {
//            saveAs(new Blob([data], {type: "base64"}), nombre_archivo + '.xlsx');
//            if (typeof notificarTermino === 'function') {
//                notificarTermino(true);
//            }
//        });
    };



    this.descargarExcelVariasHojas = function (opciones) {
        var fila = 1;

        opciones = opciones || {};
        $.extend(true, opciones, confDefault);

        var workbook = ExcelBuilder.Builder.createWorkbook();



        var titulo_libro = opciones.titulo_libro || opciones.titulo || "PRUEBA";
        if (titulo_libro.length > 30) {
            titulo_libro = titulo_libro.substring(0, 29);
        }

        $.each(opciones.hojas, function (i, hoja) {
            var titulo = hoja.titulo || ("Hoja" + (i + 1));
            var worksheet = workbook.createWorksheet({name: titulo.substr(0, 31)});
            var stylesheet = workbook.getStyleSheet();
            ////////////////////////////////////////////////////////////////

            //<editor-fold defaultstate="collapsed" desc="ESTILOS">       
            var estiloCabeceraDef = {
                font: {
                    bold: opciones.cabeceraTabla.negrilla
                },
                border: {
                    bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                    top: {color: opciones.linea.color, style: opciones.linea.grosor},
                    left: {color: opciones.linea.color, style: opciones.linea.grosor},
                    right: {color: opciones.linea.color, style: opciones.linea.grosor}
                },
                alignment: {
                    horizontal: 'center',
                    vertical: 'center',
                    wrapText: true
                },
                fill: {
                    type: 'pattern',
                    patternType: 'solid',
                    fgColor: opciones.cabeceraTabla.relleno
                }
            };
            var estiloCeldaCentradoDef = {
                font: {
                    bold: opciones.cabeceraTabla.negrilla
                },
                border: {
                    bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                    top: {color: opciones.linea.color, style: opciones.linea.grosor},
                    left: {color: opciones.linea.color, style: opciones.linea.grosor},
                    right: {color: opciones.linea.color, style: opciones.linea.grosor}
                },
                alignment: {
                    horizontal: 'center',
                    vertical: 'center',
                    wrapText: true
                }
            };
            var estiloCeldaDef = {
                border: {
                    bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                    top: {color: opciones.linea.color, style: opciones.linea.grosor},
                    left: {color: opciones.linea.color, style: opciones.linea.grosor},
                    right: {color: opciones.linea.color, style: opciones.linea.grosor}
                },
                alignment: {
                    vertical: 'center',
                    wrapText: true
                }
            };
            var estiloCeldaSBDef = {
                alignment: {
                    vertical: 'center',
                    wrapText: true
                }
            };
            var estiloCeldaDerechaDef = {
                font: {
                    bold: opciones.cabeceraTabla.negrilla
                },
                border: {
                    bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                    top: {color: opciones.linea.color, style: opciones.linea.grosor},
                    left: {color: opciones.linea.color, style: opciones.linea.grosor},
                    right: {color: opciones.linea.color, style: opciones.linea.grosor}
                },
                alignment: {
                    horizontal: 'right',
                    vertical: 'center',
                    wrapText: true
                }
            };
            var estiloCeldaRojoDef = {
                border: {
                    bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                    top: {color: opciones.linea.color, style: opciones.linea.grosor},
                    left: {color: opciones.linea.color, style: opciones.linea.grosor},
                    right: {color: opciones.linea.color, style: opciones.linea.grosor}
                },
                alignment: {
                    vertical: 'center',
                    wrapText: true
                },
                fill: {
                    type: 'pattern',
                    patternType: 'solid',
                    fgColor: colores.rojo
                }
            };
            var estiloCeldaAzulDef = {
                border: {
                    bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                    top: {color: opciones.linea.color, style: opciones.linea.grosor},
                    left: {color: opciones.linea.color, style: opciones.linea.grosor},
                    right: {color: opciones.linea.color, style: opciones.linea.grosor}
                },
                alignment: {
                    vertical: 'center',
                    wrapText: true
                },
                fill: {
                    type: 'pattern',
                    patternType: 'solid',
                    fgColor: colores.azul
                }
            };
            var estiloCeldaAmarilloDef = {
                border: {
                    bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                    top: {color: opciones.linea.color, style: opciones.linea.grosor},
                    left: {color: opciones.linea.color, style: opciones.linea.grosor},
                    right: {color: opciones.linea.color, style: opciones.linea.grosor}
                },
                alignment: {
                    vertical: 'center',
                    wrapText: true
                },
                fill: {
                    type: 'pattern',
                    patternType: 'solid',
                    fgColor: colores.amarillo
                }
            };
            var estiloCeldaVerdeDef = {
                border: {
                    bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                    top: {color: opciones.linea.color, style: opciones.linea.grosor},
                    left: {color: opciones.linea.color, style: opciones.linea.grosor},
                    right: {color: opciones.linea.color, style: opciones.linea.grosor}
                },
                alignment: {
                    vertical: 'center',
                    wrapText: true
                },
                fill: {
                    type: 'pattern',
                    patternType: 'solid',
                    fgColor: colores.verde
                }
            };
            var estiloCeldaRojoNumeroDef = {
                format: '0.00',
                border: {
                    bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                    top: {color: opciones.linea.color, style: opciones.linea.grosor},
                    left: {color: opciones.linea.color, style: opciones.linea.grosor},
                    right: {color: opciones.linea.color, style: opciones.linea.grosor}
                },
                alignment: {
                    vertical: 'center',
                    wrapText: true
                },
                fill: {
                    type: 'pattern',
                    patternType: 'solid',
                    fgColor: colores.rojo
                }
            };
            var estiloCeldaAmarilloNumeroDef = {
                format: '0.00',
                border: {
                    bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                    top: {color: opciones.linea.color, style: opciones.linea.grosor},
                    left: {color: opciones.linea.color, style: opciones.linea.grosor},
                    right: {color: opciones.linea.color, style: opciones.linea.grosor}
                },
                alignment: {
                    vertical: 'center',
                    wrapText: true
                },
                fill: {
                    type: 'pattern',
                    patternType: 'solid',
                    fgColor: colores.amarillo
                }
            };
            var estiloCeldaVerdeNumeroDef = {
                format: '0.00',
                border: {
                    bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                    top: {color: opciones.linea.color, style: opciones.linea.grosor},
                    left: {color: opciones.linea.color, style: opciones.linea.grosor},
                    right: {color: opciones.linea.color, style: opciones.linea.grosor}
                },
                alignment: {
                    vertical: 'center',
                    wrapText: true
                },
                fill: {
                    type: 'pattern',
                    patternType: 'solid',
                    fgColor: colores.verde
                }
            };
            var estiloCeldaNegritaDef = {
                font: {
                    bold: true
                },
                border: {
                    bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                    top: {color: opciones.linea.color, style: opciones.linea.grosor},
                    left: {color: opciones.linea.color, style: opciones.linea.grosor},
                    right: {color: opciones.linea.color, style: opciones.linea.grosor}
                },
                alignment: {
                    vertical: 'center',
                    wrapText: true
                }
            };
            var estiloCeldaNegritaSBDef = {
                font: {
                    bold: true
                },
                alignment: {
                    vertical: 'center',
                    wrapText: true
                }
            };
            var estiloCeldaDecimalDef = {
                format: '0.00',
                border: {
                    bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                    top: {color: opciones.linea.color, style: opciones.linea.grosor},
                    left: {color: opciones.linea.color, style: opciones.linea.grosor},
                    right: {color: opciones.linea.color, style: opciones.linea.grosor}
                },
                alignment: {
//                horizontal: "right",
                    vertical: 'center'
                }
            };
            var estiloCeldaDecimalNegritaDef = {
                font: {
                    bold: true
                },
                format: '0.00',
                border: {
                    bottom: {color: opciones.linea.color, style: opciones.linea.grosor},
                    top: {color: opciones.linea.color, style: opciones.linea.grosor},
                    left: {color: opciones.linea.color, style: opciones.linea.grosor},
                    right: {color: opciones.linea.color, style: opciones.linea.grosor}
                },
                alignment: {
                    vertical: 'center'
                }
            };
            var estituloTituloDef = {
                font: {
                    bold: opciones.estiloTitulo.negrilla,
                    size: opciones.estiloTitulo.tamanoFuente
                },
                alignment: {
                    horizontal: 'center',
                    vertical: 'center'
                }
            };

            var estiloCabecera = stylesheet.createFormat(estiloCabeceraDef);
            var estiloCelda = stylesheet.createFormat(estiloCeldaDef);
            var estiloCeldaSB = stylesheet.createFormat(estiloCeldaSBDef);
            var estiloCeldaCentrado = stylesheet.createFormat(estiloCeldaCentradoDef);
            var estiloCeldaDerecha = stylesheet.createFormat(estiloCeldaDerechaDef);
            var estiloCeldaRojo = stylesheet.createFormat(estiloCeldaRojoDef);
            var estiloCeldaAzul = stylesheet.createFormat(estiloCeldaAzulDef);
            var estiloCeldaAmarillo = stylesheet.createFormat(estiloCeldaAmarilloDef);
            var estiloCeldaVerde = stylesheet.createFormat(estiloCeldaVerdeDef);
            var estiloCeldaRojoNumero = stylesheet.createFormat(estiloCeldaRojoNumeroDef);
            var estiloCeldaAmarilloNumero = stylesheet.createFormat(estiloCeldaAmarilloNumeroDef);
            var estiloCeldaVerdeNumero = stylesheet.createFormat(estiloCeldaVerdeNumeroDef);
            var estiloCeldaNegrita = stylesheet.createFormat(estiloCeldaNegritaDef);
            var estiloCeldaNegritaSB = stylesheet.createFormat(estiloCeldaNegritaSBDef);
            var estiloCeldaDecimal = stylesheet.createFormat(estiloCeldaDecimalDef);
            var estiloCeldaDecimalNegrita = stylesheet.createFormat(estiloCeldaDecimalNegritaDef);
            var estituloTitulo = stylesheet.createFormat(estituloTituloDef);

            var estilos = {
                cabeceraTabla: estiloCabecera,
                celda: estiloCelda,
                celdaSB: estiloCeldaSB,
                celdaCentrado: estiloCeldaCentrado,
                celdaDerecha: estiloCeldaDerecha,
                celdaAzul: estiloCeldaAzul,
                celdaRojo: estiloCeldaRojo,
                celdaAmarillo: estiloCeldaAmarillo,
                celdaVerde: estiloCeldaVerde,
                celdaRojoNumero: estiloCeldaRojoNumero,
                celdaAmarilloNumero: estiloCeldaAmarilloNumero,
                celdaVerdeNumero: estiloCeldaVerdeNumero,
                celdaNegrita: estiloCeldaNegrita,
                celdaNegritaSB: estiloCeldaNegritaSB,
                celdaNumericaDecimal: estiloCeldaDecimal,
                CeldaDecimalNegrita: estiloCeldaDecimalNegrita,
                titulo: estituloTitulo
            };
            var estilosDef = {
                cabeceraTabla: estiloCabeceraDef,
                celda: estiloCeldaDef,
                celdaCentrado: estiloCeldaCentradoDef,
                celdaDerecha: estiloCeldaDerechaDef,
                celdaRojo: estiloCeldaRojoDef,
                celdaAmarillo: estiloCeldaAmarilloDef,
                celdaVerde: estiloCeldaVerdeDef,
                celdaNegrita: estiloCeldaNegritaDef,
                celdaNegritaSB: estiloCeldaNegritaSBDef,
                celdaNumerica: estiloCeldaDecimalDef,
                CeldaDecimalNegrita: estiloCeldaDecimalNegritaDef,
                titulo: estituloTituloDef
            };
            //</editor-fold>

            fila = 3;
            var tabla = hoja.getTabla(estilos, fila, $.extend(true, {}, estilosDef), colores, stylesheet);

            var tabTitulo = [];
            var pos_tit_f = 1;
            if (tabla.length > 0) {
                pos_tit_f = tabla[0].length;
            }
            tabTitulo.push(armarContenidoCelda(titulo, estituloTitulo));
            tabla.unshift(tabTitulo, []);

            worksheet.setData(tabla);

            if (!hoja.combinarCeldas) {
                hoja.combinarCeldas = [];
            }

            hoja.combinarCeldas.push({s: {f: 1, c: 1}, t: {f: 1, c: pos_tit_f}});
            var desde_cc, hasta_cc;
            for (var i_i = 0; i_i < hoja.combinarCeldas.length; i_i++) {
                var op_cc = hoja.combinarCeldas[i_i];
                desde_cc = columnaToLetra(op_cc.s.c) + op_cc.s.f + "";
                hasta_cc = columnaToLetra(op_cc.t.c) + op_cc.t.f + "";
                worksheet.mergeCells(desde_cc, hasta_cc); //merge cells from A1 to C1
            }


            if (typeof hoja.tamanoColumnas === 'function') {
                var ajuste = 0.71;
                worksheet.setColumns(hoja.tamanoColumnas(ajuste));
            }
            workbook.addWorksheet(worksheet);

            if (hoja.imagenes) {
                for (var i = 0; i < hoja.imagenes.length; i++) {
                    var imagen = hoja.imagenes[i];
                    var drawings = new ExcelBuilder.Drawings();
                    var picRef = workbook.addMedia('image', imagen.nombre, imagen.base64);
                    var picture = new ExcelBuilder.Drawing.Picture();
                    picture.createAnchor('twoCellAnchor', imagen.posicion);

                    picture.setMedia(picRef);
                    drawings.addDrawing(picture);

                    worksheet.addDrawings(drawings);
                    workbook.addDrawings(drawings);
                }
            }
        });
        //</editor-fold>

        var nombre_archivo = opciones.nombreArchivo || "Reporte Excel";

        ExcelBuilder.Builder.createFile(workbook).then(function (data) {
            if (!document.getElementById("downloader_Excel_link")) {
                var a = document.createElement('a');
                a.id = 'downloader_Excel_link';
                a.textContent = 'Click me!';
                a.style = 'display:none;';
                a.download = 'Reporte_Excel.xlsx';
                document.body.appendChild(a);
            }
            var a = document.getElementById("downloader_Excel_link");
            a.download = nombre_archivo + '.xlsx';
//            a.href = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + data;
            var ddd = new Blob([s2ab(atob(data))], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            var csvUrl = URL.createObjectURL(ddd);
            a.href = csvUrl;
            a.click();
            if (typeof notificarTermino === 'function') {
                notificarTermino(true);
            }
        });
    };

    this.setListenerNotificarTermino = function (listener) {
        notificarTermino = listener;
    };

    /**
     * 
     * @param {type} stylesheet
     * @param {type} alineacion {alineacion, bordes, color, relleno, negrilla, subrayado, cursiva, tamano, fuente, formato}
     * @param {type} bordes
     * @param {type} color
     * @param {type} relleno
     * @param {type} negrilla
     * @param {type} subrayado
     * @param {type} cursiva
     * @param {type} tamano
     * @param {type} fuente
     * @param {type} formato
     * @returns {unresolved}
     */
    this.getEstiloRapido = function (stylesheet, alineacion, bordes, color, relleno, negrilla, subrayado, cursiva, tamano, fuente, formato) {
        if (typeof alineacion === 'object') {
            bordes = alineacion.bordes;
            color = alineacion.color;
            relleno = alineacion.relleno;
            negrilla = alineacion.negrilla;
            subrayado = alineacion.subrayado;
            cursiva = alineacion.cursiva;
            tamano = alineacion.tamano;
            fuente = alineacion.fuente;
            formato = alineacion.formato;
            alineacion = alineacion.alineacion;
        }
        var estilo_conf = {};
        var font = {};
        var sx = false;
        if (negrilla) {
            font.bold = negrilla;
            sx = true;
        }
        if (cursiva) {
            font.italic = cursiva;
            sx = true;
        }
        if (subrayado) {
            font.underline = subrayado;
            sx = true;
        }
        if (tamano) {
            font.size = tamano;
            sx = true;
        }
        if (color) {
            font.color = color;
            sx = true;
        }
        if (fuente) {
            font.fontName = fuente;
            sx = true;
        }
        if (sx) {
            estilo_conf.font = font;
        }

        if (relleno) {
            estilo_conf.fill = {
                type: 'pattern',
                patternType: 'solid',
                fgColor: relleno
            };
        }
        if (alineacion) {
            if (typeof alineacion === 'object') {
                estilo_conf.alignment = alineacion;
            } else {
                estilo_conf.alignment = {
                    horizontal: alineacion,
                    vertical: 'center',
                    wrapText: true
                };
            }
        } else {
            estilo_conf.alignment = {
                vertical: 'center',
                wrapText: true
            };
        }
        //bordes[top, right, bottom, left] true | false 
        // bordes [top_bottom, right_left]
        // bordes true | false  defecto thin
        if (bordes) {
            if (bordes === true) {
                estilo_conf.border = {
                    bottom: {color: 'FF000000', style: "thin"},
                    top: {color: 'FF000000', style: "thin"},
                    left: {color: 'FF000000', style: "thin"},
                    right: {color: 'FF000000', style: "thin"}
                };
            } else {
                if (Array.isArray(bordes)) {
                    if (bordes.length === 2) {
                        var border = {};
                        sx = false;
                        if (bordes[0]) {
                            border.top = {color: 'FF000000', style: bordes[0] === true ? "thin" : bordes[0]};
                            border.bottom = {color: 'FF000000', style: bordes[0] === true ? "thin" : bordes[0]};
                            sx = true;
                        }
                        if (bordes[1]) {
                            border.left = {color: 'FF000000', style: bordes[1] === true ? "thin" : bordes[1]};
                            border.right = {color: 'FF000000', style: bordes[1] === true ? "thin" : bordes[1]};
                            sx = true;
                        }
                        if (sx) {
                            estilo_conf.border = border;
                        }
                    } else if (bordes.length === 4) {
                        var border = {};
                        sx = false;
                        if (bordes[0]) {
                            border.top = {color: 'FF000000', style: bordes[0] === true ? "thin" : bordes[0]};
                            sx = true;
                        }
                        if (bordes[1]) {
                            border.right = {color: 'FF000000', style: bordes[1] === true ? "thin" : bordes[1]};
                            sx = true;
                        }
                        if (bordes[2]) {
                            border.bottom = {color: 'FF000000', style: bordes[2] === true ? "thin" : bordes[2]};
                            sx = true;
                        }
                        if (bordes[3]) {
                            border.left = {color: 'FF000000', style: bordes[3] === true ? "thin" : bordes[3]};
                            sx = true;
                        }
                        if (sx) {
                            estilo_conf.border = border;
                        }
                    }
                } else if (typeof bordes === "string") {
                    estilo_conf.border = {
                        bottom: {color: 'FF000000', style: bordes},
                        top: {color: 'FF000000', style: bordes},
                        left: {color: 'FF000000', style: bordes},
                        right: {color: 'FF000000', style: bordes}
                    };
                }
            }
        }

        if (formato) {
            estilo_conf.format = formato;
        }

        var estilo = stylesheet.createFormat(estilo_conf);
        return estilo;
    };

    this.armarContenidoCeldaRapido = function (stylesheet, texto, formula, alineacion, bordes, color, relleno, negrilla, subrayado, cursiva, tamano, fuente) {
        var estilo = this.getEstiloRapido(stylesheet, alineacion, bordes, color, relleno, negrilla, subrayado, cursiva, tamano, fuente);
        //--
        var celda = {value: texto};
        var metadata = {};
        var sx = false;
        if (estilo) {
            sx = true;
            metadata.style = estilo.id;
        }
        if (formula) {
            sx = true;
            metadata.type = 'formula';
        }
        if (sx)
            celda.metadata = metadata;
        return celda;
    };

    this.armarExcel=(obj)=>{
        var getTabla = function (estilos, cont_fila, estilosDef, colores, stylesheet) {
            var tabla = [];
            var fila = [];
            obj.cabecera.map((cab)=>{
                fila.push(armarContenidoCelda(cab.value, estilos.cabeceraTabla));
            });
            tabla.push(fila);
            cont_fila++;
            obj.cuerpo.map((tr)=>{
                fila = [];
                obj.cabecera.map((cab)=>{
                    fila.push(armarContenidoCelda((tr[cab.key])||"", estilos.celda));
                });
                tabla.push(fila);
                cont_fila++;
            });
            return tabla;
        };
        var getAncho = function (ajuste) {
            var ancho = [];
            obj.cabecera.map((cab)=>{
                ancho.push({width: cab.value.length + ajuste});
            });
            return ancho;
        };
        var opciones = {
            titulo: obj.titulo||"",
            sinTitulo:(!obj.titulo),
            nombreArchivo: obj.nombre_archivo||"excel",
            getTabla: getTabla,
            tamanoColumnas: getAncho
        };
        this.descargarExcel(opciones);
        this.setListenerNotificarTermino(function (estado) {
            if (!estado) {
                //            $("#alert").openAlertError(errorExcel);
            }
            ocultarCargando();
        });
    };

    // ESTILOS
    this.SUBRAYADO_SIMPLE = "single";
    this.SUBRAYADO_DOBLE = "double";
    //--
    this.ALINEACION_H_GENERAL = "general";
    this.ALINEACION_H_LEFT = "left";
    this.ALINEACION_H_CENTER = "center";
    this.ALINEACION_H_RIGHT = "right";
    this.ALINEACION_H_FILL = "fill";
    this.ALINEACION_H_JUSTIFY = "justify";
    this.ALINEACION_H_CENTER_CONTINUOUS = "centerContinuous";
    this.ALINEACION_H_DISTRIBUTED = "distributed";
    //--
    this.ALINEACION_V_TOP = "top";
    this.ALINEACION_V_CENTER = "center";
    this.ALINEACION_V_BOTTOM = "bottom";
    this.ALINEACION_V_JUSTIFY = "justify";
    this.ALINEACION_V_DISTRIBUTED = "distributed";
    //--
    this.BORDER_NONE = "none";
    this.BORDER_THIN = "thin";
    this.BORDER_MEDIUM = "medium";
    this.BORDER_DASHED = "dashed";
    this.BORDER_DOTTED = "dotted";
    this.BORDER_THICK = "thick";
    this.BORDER_DOUBLE = "double";
    this.BORDER_HAIR = "hair";
    this.BORDER_MEDIUM_DASHED = "mediumDashed";
    this.BORDER_DASHDOT = "dashDot";
    this.BORDER_MEDIUM_DASHDOT = "mediumDashDot";
    this.BORDER_DASHDOTDOT = "dashDotDot";
    this.BORDER_MEDIUM_DASHDOTDOT = "mediumDashDotDot";
    this.BORDER_SLANT_DASHDOT = "slantDashDot";
    //--
    this.FORMATO_DECIMAL2 = "0.00";
    this.FORMATO_PORCENTAJE = "0.00%";//2
    this.FORMATO_CONTABILIDAD = 43; //'_-* #.##0,00 _€_-;-* #.##0,00 _€_-;_-* "-"?? _€_-;_-@_-'; // 43
    this.FORMATO_FECHA = 14;
    this.FORMATO_PORCENTAJE2 = 10;
    this.FORMATO_NEGATIVOS_PARENTESIS ="0#. ##; (#. ##)";

}
var armarContenidoCelda = function (texto, estilo, formula) {
    var celda = {value: texto};
    var metadata = {};
    var sx = false;
    if (estilo) {
        sx = true;
        metadata.style = estilo.id;
    }
    if (formula) {
        sx = true;
        metadata.type = 'formula';
    }
    if (sx)
        celda.metadata = metadata;
    return celda;
};
//necesita datepicker y r_validator
// ver despues como hacerlo independiente
var armarContenidoCeldaFecha = function (date, estilo) {
    if (validate_fecha(date || "")) {
        return {
            value: $.datepicker.parseDate('dd/mm/yy', date).getTime(),
            metadata: {style: estilo.id, type: "date"}
        };
    } else
        return armarContenidoCelda("", estilo);

};
var rellenarCelda = function (fila, celdaI, celdaF, estilo) {
    for (; celdaI <= celdaF; celdaI++) {
        fila.push(armarContenidoCelda("", estilo));
    }
};

/*
 * 1..n
 */
/**
 * 
 * @param {Number} columna 1 .. n
 * @returns {String} columna del excel
 */
var columnaToLetra = function (columna) {
    // A: 65 
    // Z: 90
    var ini = 64;
    var modulo = 26;
    var col = columna;
    var res = "";
    var c;
    while (col > 0) {
        c = col % modulo;
        col = (col / modulo >> 0);
        if (c == 0) {
            c = 26;
            col--;
        }
        res = String.fromCharCode(ini + c) + res;

    }
    return res;
};


/*
 alineacion_vertical: center | rigth | left
 alineacion_horizontal: center | rigth | left
 border : top, bottom, left, rigth // falta estilo y color
 color: FFFFFFFF
 relleno: FFFFFFFF
 negrilla: true | false
 cursiva: true | false
 subrayado: single| double
 tamano : 0 .. n
 fuente: Arial
 
 */

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i)
        view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
