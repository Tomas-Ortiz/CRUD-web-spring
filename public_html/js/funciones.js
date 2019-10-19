$(function () {

    var TallerAvanzada = {};

    (function (app) {

        app.init = function () {

            app.buscarPersonas();
            app.oyentes();

        };

        app.oyentes = function () {

            $("#agregarPersona").click(function () {

                //Se setea a 0 para indicar que se va a agregar y no modificar

                app.limpiarModal();
                //id = 0
                $("#tituloModal").html("Nueva persona");
                $("#modalPersona").modal({show: true});

            });


            $("#guardar").click(function () {

                if ($("#id").val() == 0) {

                    app.guardarRegistro();

                } else {
                    app.modificarRegistro();
                }

            });

            $("#cuerpoTabla").on('click', '.editar', function () {

                //se establece el id del registro a modificar
                $("#id").val($(this).attr("data-id_persona"));

                //se setean los campos del modal, dichos valores se sacan de la tabla
                $("#nombre").val($(this).parent().parent().children().first().html());
                $("#apellido").val($(this).parent().parent().children().first().next().html());
                $("#edad").val($(this).parent().parent().children().first().next().next().html());
                $("#cuil").val($(this).parent().parent().children().first().next().next().next().html());
                $("#calle").val($(this).parent().parent().children().first().next().next().next().next().html());
                $("#numero").val($(this).parent().parent().children().first().next().next().next().next().next().html());

                $("#tituloModal").html("Editar Persona");

                $("#modalPersona").modal({show: true});

            });

            $("#cuerpoTabla").on('click', '.eliminar', function () {

                app.eliminarPersona($(this).attr("data-id_persona"));

            });


        };

        app.buscarPersonas = function () {

            var url = "http://localhost:9000/api/v1/persona/";

            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',

                //devuelve objeto js
                success: function (personas) {

                    app.rellenarTabla(personas);

                },
                error: function () {
                    alert("Error");
                }
            });
        };

        app.guardarRegistro = function () {

            var url = "http://localhost:9000/api/v1/persona/";

            var persona = {
                'nombre': $('#nombre').val(),
                'apellido': $('#apellido').val(),
                'edad': $('#edad').val(),
                'cuil': $('#cuil').val(),
                'calle': $('#calle').val(),
                'numero': $('#numero').val()
            };


            $.ajax({
                url: url,
                method: 'post',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(persona),

                //devuelve un objeto js
                success: function (personaAgregada) {

                    var id = $('#id').val();

                    $("#modalPersona").modal('hide');

                    //se agrega el nuevo registro a la tabla y se limpia el modal
                    app.actualizarTabla(personaAgregada, id);
                    app.limpiarModal();

                },
                error: function (datosRecibidos) {
                    alert(datosRecibidos);
                }
            });
        };

        app.modificarRegistro = function () {

            var id = $("#id").val();

            var url = "http://localhost:9000/api/v1/persona/" + id;


            var persona = {
                'nombre': $("#nombre").val(),
                'apellido': $("#apellido").val(),
                'edad': $("#edad").val(),
                'cuil': $("#cuil").val(),
                'calle': $("#calle").val(),
                'numero': $("#numero").val()
            };

            $.ajax({
                url: url,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(persona),
                success: function (persona) {

                    $("#modalPersona").modal('hide');

                    app.actualizarTabla(persona, id);
                    app.limpiarModal();

                },
                error: function (error) {
                    alert(error);
                }

            });

        };

        app.eliminarPersona = function (id) {

            if (confirm("¿Seguro deseas eliminar el registro?")) {

                var url = "http://localhost:9000/api/v1/persona/" + id;

                $.ajax({
                    url: url,
                    method: 'DELETE',
                    dataType: 'json',
                    success: function (datosRecibidos) {

                        app.borrarFila(id);

                        alert("Registro eliminado.");

                    },
                    error: function (datosRecibidos) {
                        alert("Error");
                    }



                });
            }

        };


        app.borrarFila = function (id) {
            $("#cuerpoTabla").find("a[data-id_persona='" + id + "']").parent().parent().remove();
        };


        app.rellenarTabla = function (personas) {

            var linea = "";

            //each es un iterador jquery para recorrer elementos
            $.each(personas, function (index, value) {

                linea += "<tr>" +
                        "<td>" + value.nombre + "</td>" +
                        "<td>" + value.apellido + "</td>" +
                        "<td>" + value.edad + "</td>" +
                        "<td>" + value.cuil + "</td>" +
                        "<td>" + value.calle + "</td>" +
                        "<td> " + value.numero + "</td>" +
                        "<td>" +
                        '<a class="pull-left editar" data-id_persona="' + value.id + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_persona="' + value.id + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        "</td>" +
                        "</tr>";
            });

            $('#cuerpoTabla').html(linea);

        };

        app.actualizarTabla = function (persona, id) {

            var linea = "";

            //si se agrega un nuevo registro
            if (id == 0) {
                linea = "<tr>" +
                        "<td>" + persona.nombre + "</td>" +
                        "<td>" + persona.apellido + "</td>" +
                        "<td>" + persona.edad + "</td>" +
                        "<td>" + persona.cuil + "</td>" +
                        "<td>" + persona.calle + "</td>" +
                        "<td> " + persona.numero + "</td>" +
                        "<td>" +
                        '<a class="pull-left editar" data-id_persona="' + persona.id + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_persona="' + persona.id + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        "</td>" +
                        "</tr>";

                $("#cuerpoTabla").append(linea);

                //si se modifica un registro existente
            } else {

                //se encuentra la fila de la tabla del registro a modificar

                var fila = $("#cuerpoTabla").find("a[data-id_persona='" + id + "']").parent().parent();

                linea =
                        "<td>" + persona.nombre + "</td>" +
                        "<td>" + persona.apellido + "</td>" +
                        "<td>" + persona.edad + "</td>" +
                        "<td>" + persona.cuil + "</td>" +
                        "<td>" + persona.calle + "</td>" +
                        "<td> " + persona.numero + "</td>" +
                        "<td>" +
                        '<a class="pull-left editar" data-id_persona="' + persona.id + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_persona="' + persona.id + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        "</td>";

                //se modifica el registro de esa fila
                fila.html(linea);
            }

        };


        app.limpiarModal = function () {

            $("#id").val(0);
            $("#nombre").val("");
            $("#apellido").val("");
            $("#cuil").val("");
            $("#edad").val("");
            $("#calle").val("");
            $("#numero").val("");
        };

        app.init();

    })(TallerAvanzada);






});

