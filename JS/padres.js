//Variable proveniente del anterior JS
var idA = localStorage.getItem("idAlumno");
var user = localStorage.getItem("user");

//Variables de terapeuta
var usuarioT;
var nombreT;
var apT;

//Variables del admin
var userA;
var nombreA;
var apA;

function cargar(){

    //Variables del alumno:
    var nombre;
    var apP;
    var apM;
    var grupo;
    var idGrupo;

    //Variables de la observacion
    var observacion;
    var fecha_obs;

    //hs y divs para agregar al html
    var h;
    var div;

    //Variables de notas
    var nombre_nota;
    var link_nota;
    var fecha_nota;
    var id_nota;

    var idAdmin = 1;
    
    //Pasamos id del alumno con metodo post al archivo php
    //Para obtener nombre y grupo de los alumnos
    $.post("/Clima/php/papas.php", {id: idA})
    .done(function(data){//Recolectamos la informacion del php

        if(data!=""){

            if(data == "No ha iniciado sesion"){
                alert ("No ha iniciado sesión");
                document.getElementById("sesion").value = "Iniciar Sesión";
                document.getElementById("up").disabled = true;
                document.getElementById("up").style.backgroundColor = "gray";
                document.getElementById("conf").disabled = true;
                document.getElementById("conf").style.color = "gray";
            }

            else{
                info = eval(data);
            
                nombre = info[0];
                apP = info[1];
                apM = info[2];
                grupo = info[3];
                idGrupo = info[4];
                
                //Poner nombre completo del alumno en el html
                document.getElementById('nombre').innerHTML = "Alumn@: " + nombre + " " + apP + " " + apM;
                //alert("Alumno: " + nombre + " " + apP + " " + apM);
                
                //Poner nombre del grupo en el html.
                document.getElementById('grupo').innerHTML = "Grupo: " + grupo;

                //PARA OBTENER EL USUARIO DEL TERAPEUTA
                $.post("/Clima/php/terapeutas.php", {id: idGrupo})
                .done(function(ter){

                    if(ter!=""){
                        terapeuta = eval(ter);
                        //Sacamos nombre y apellido de terapeuta
                        usuarioT = terapeuta[0];
                        nombreT = terapeuta[1];
                        apT = terapeuta[2];

                        //sacamos usuario del administrador
                        $.post("/Clima/php/admin.php", {id: idAdmin})
                        .done(function(adm){
                            if(adm!=""){

                                admincito = eval(adm);
                                //Sacamos nombre y apellido de admin
                                userA = admincito[0];
                                nombreA = admincito[1];
                                apA = admincito[2];

                            }

                            else{
                                alert("No se encontro al administrador");
                            }
                        });
                    }

                    else{
                        
                        alert ("No se encontro al terapeuta");
                    }

                });
            }
            
        }

        else{
            alert("Error: No se encontro al alumno");
        }
        
    });//Aqui termina jquery para obtener informacion del alumno

    loadNotes();

    loadObs();

}

//Funcion para cargar las observaciones
function loadObs(){
    //Para obtener observaciones de los alumnos 
    $.post("/Clima/php/obs.php", {id: idA})
    .done(function(obs){
        if (obs!=""){
            obsarray = obs.split("][").join("],[");
            var info2 = eval("["+obsarray+"]");

            //For para acceder al array de dos dimensiones.
            for(i=0; i<info2.length; i++){
                for(j=0; j<info2[i].length; j++){
                    observacion = decodeURIComponent(info2[i][0]); //DecodeURI para caracteres especiales
                    fecha_obs = (info2[i][1]);
                }
                
                //Para poner la fecha de publicacion.
                h = document.createElement("h4");
                var text = document.createTextNode("Fecha de publicación: " + fecha_obs);
                h.appendChild(text);
                document.getElementById('transparente').appendChild(h);
                //Estilo de h
                h.style.position = "relative";
                h.style.color = "rgb(0, 28, 91)";
                h.style.top = "20px";
                h.style.left = "-80px";
                h.style.display = "none";

                //Para poner la observacion en un div
                div = document.createElement("div");
                var parr = document.createElement("p");
                var textobs = document.createTextNode(observacion);
                parr.appendChild(textobs)
                div.appendChild(parr);
                //Estilo de div
                div.style.position = "relative";
                div.style.backgroundColor = "white";
                div.style.height = "150px"; 
                div.style.width = "550px";
                div.style.top = "20px";
                div.style.left = "275px";
                div.style.borderRadius = "50px";
                div.style.wordWrap = "break-word";
                div.style.overflowY = "scroll";
                div.style.display = "none";
                div.className = "obser";
                div.style.marginBottom = "50px";
                div.style.textAlign = "left";

                //Estilo del parrafo
                parr.style.position = "relative";
                parr.style.top = "5px";
                parr.style.marginLeft = "40px";
                parr.style.marginRight = "40px";
                parr.style.marginBottom = "10px";

                document.getElementById('transparente').appendChild(div);

                //Ponemos un salto de linea
                //var salto = document.createElement("br");
                //var salto2 = document.createElement("br");
                var separador = document.createElement("hr");

                //document.getElementById('transparente').appendChild(salto);
                //document.getElementById('transparente').appendChild(salto2);
                document.getElementById('transparente').appendChild(separador);

                //Estilo de separador
                separador.style.width = "500px";
                separador.style.position = "relative";
                separador.style.left = "5px";
                separador.style.borderWidth = "0px";
                separador.style.height = "1px";
                separador.style.backgroundColor = "lightgray";
                separador.style.display = "none";
                separador.style.marginBottom = "30px";
            }
            
            //boton para cargar mas observaciones
            var load = document.createElement("button");
            load.appendChild(document.createTextNode("Ver mas"));
            document.getElementById('transparente').appendChild(load);
            load.id = 'load';

            //Estilo del boton
            load.style.position = "relative";
            load.style.backgroundColor = "rgb(4, 47, 172)";
            load.style.border = "none";
            load.style.color = "white";
            load.style.width = "70px";
            load.style.height = "30px";
            load.style.fontSize = "14px";
            load.style.borderRadius = "10px";
            load.style.cursor = "pointer";
            load.style.outline = "none";



             //Mostramos las primeras dos observaciones
             $(".obser").slice(0,2).show();
             $("h4").slice(0,2).show();
             $("hr").slice(0,2).show();

             //Si se presiona el boton se cargan dos observaciones mas
             $("#load").click(function(e){
                e.preventDefault();
                $(".obser:hidden").slice(0,2).show();
                $("h4:hidden").slice(0,2).show();
                $("hr:hidden").slice(0,2).show();

                //Si ya no hay mas observaciones, se deshabilita el boton
                if($(".obser:hidden").length == 0){
                    load.disabled = true;
                    load.style.backgroundColor = "gray";
                }
             });    
            
        }
        
        //Si no hay observaciones
        else{
            //alert("No hay observaciones");
             //alert("No se encontraron notas");
             var noObs = document.createElement("h3");
             var textNoObs = document.createTextNode("No se encontraron observaciones.");
             noObs.appendChild(textNoObs);
 
             //Metemos el mensaje en el menu desplegable.
             document.getElementById('transparente').appendChild(noObs);
 
             //Estilo del mensaje.
             noObs.style.position = "relative";
             noObs.style.top = "230px";
             noObs.style.left = "400px";
        }
    }); //Aqui termina jquery para obtener observaciones
}

//Funcion para cargar las notas
function loadNotes(){
    //Para ontener las notas del alumno
    $.post("/Clima/php/notas.php", {id: idA})
    .done(function(notes){//Recolectamos la informacion del php

        if(notes!=""){
            notesarray = notes.split("][").join("],[");
            var notas = eval("["+notesarray+"]");
            
             //For para acceder al array de dos dimensiones.
             for(i=0; i<notas.length; i++){
                for(j=0; j<notas[i].length; j++){
                    nombre_nota = (notas[i][0]); //Archivo de la nota
                    fecha_nota = (notas[i][1]); //nombre de la nota
                    id_nota = (notas[i][2]); //fecha de la nota
                }    
                
                //h para la fecha
                var hfecha = document.createElement("h5");
                var text_fecha = document.createTextNode(fecha_nota);
                hfecha.appendChild(text_fecha);
                //Metemos la fecha en el menu desplegable.
                document.getElementById("menu").appendChild(hfecha);

                //Estilo de la fecha
                hfecha.style.position = "relative";
                hfecha.style.top = "100px";
                hfecha.style.left = "-90px";
                hfecha.style.color = "rgb(0, 28, 91)";

                //creamos div para cada nota
                var div_nota = document.createElement("div");
                div_nota.className = "notes";
                div_nota.id = id_nota;

                //var notita = "nota" + id_nota;
                //Metemos el div en el menu desplegable.
                document.getElementById("menu").appendChild(div_nota);

                //Estilo de divs
                div_nota.style.position = "relative";
                div_nota.style.width = "260px";
                div_nota.style.height = "70px";
                div_nota.style.backgroundColor = "lightgray";
                div_nota.style.top = "90px";
                div_nota.style.left = "20px";
                div_nota.style.borderRadius = "10px";
                div_nota.style.marginBottom = "40px";

                //Icono de archivo
                var icono = document.createElement("i");
                icono.className = "fa fa-file";
                //Insertamos icono en el div
                div_nota.appendChild(icono);

                //Estilo de la nota
                $(".fa.fa-file").css("position", "relative");
                $(".fa.fa-file").css("left", "-95px");
                $(".fa.fa-file").css("top", "5px");
                $(".fa.fa-file").css("fontSize", "60px");
                $(".fa.fa-file").css("color", "rgba(0, 28, 91, 0.8)");

                //Nombre delarchivo
                var noteName = document.createElement("h3");
                noteName.className = "noteN";
                var text_note = document.createTextNode(nombre_nota);
                noteName.appendChild(text_note);
                div_nota.appendChild(noteName);

                noteName.style.position = "relative";
                noteName.style.top = "-55px";
                noteName.style.left = "20px";
                noteName.style.color = "rgba(0, 28, 91, 0.8)";

                //Hoover de los divs
                $(".notes").hover(function(){
                    $(this).css("background-color", "white");
                    $(this).css("transition", "0.3s ease-in");
                    $(this).css("cursor", "pointer");
                    $(this).children(".fa.fa-file").css("color", "rgba(0, 28, 91, 1)");
                    $(this).children(".fa.fa-file").css("transition", "0.3s ease-in");
                    $(this).children(".noteN").css("color", "rgba(0, 28, 91, 1)");
                    $(this).children(".noteN").css("transition", "0.3s ease-in");
                    $(this).children(".noteN").css("text-decoration", "underline");
                    }, function(){
                    $(this).css("background-color", "lightgray");
                    $(this).css("transition", "0.3s ease-out");
                    $(this).children(".fa.fa-file").css("color", "rgba(0, 28, 91, 0.8)");
                    $(this).children(".fa.fa-file").css("transition", "0.3s ease-out");
                    $(this).children(".noteN").css("color", "rgba(0, 28, 91, 0.8)");
                    $(this).children(".noteN").css("transition", "0.3s ease-out");
                    $(this).children(".noteN").css("text-decoration", "none");
                  });

                //Click en las notas
                $("#"+id_nota).click(function(e){
                    e.preventDefault();

                    var div_id = this.id;
                    
                    //Para obtener el link de las notas
                    $.post("/Clima/php/linknota.php", {id_nota: div_id})
                    .done(function(link){//Recolectamos la informacion del php

                        var linkarr = eval(link);
                        var pathFolder = linkarr[0];
                        var nombreNote = linkarr[1];

                        var linkNote = pathFolder+nombreNote;
                        if(link!=""){
                            
                            window.open(linkNote);

                        }

                        else{
                            alert("Error: No se encontró la nota seleccionada");
                        }
                        
                    });
                });
            }
  
        }


        //Si el query no encuentra notas 
        else{
            //alert("No se encontraron notas");
            var noNotas = document.createElement("h3");
            var textNoNotas = document.createTextNode("No se encontraron notas.");
            noNotas.appendChild(textNoNotas);

            //Metemos el mensaje en el menu desplegable.
            document.getElementById("menu").appendChild(noNotas);

            //Estilo del mensaje.
            noNotas.style.position = "relative";
            noNotas.style.top = "130px";
        }
        
    });//Aqui termina jquery para obtener notas
}

//Funcion para abrir el chat
function abrir(){
    document.getElementById("up").style.display = "none";
    document.getElementById("chat").style.display = "block";   
    getMessages();
}

//Funcion para obtener mensajes
function getMessages(){
    $(".msj").remove();
    $(".nombreTer").remove();
    $(".nombreAd").remove();
    $(".tu").remove();
    $(".fechis").remove();

    //Obtener mensajes
    $.post("/Clima/php/mensajes.php", {adminis: userA, terapeuta: usuarioT, papa: user})
    .done(function(mens){
        if(mens!=""){
            mensarray = mens.split("][").join("],[");
            var mensajes = eval("["+mensarray+"]");
            loadMessages(mensajes);       
        }

        else{
            alert("No se encontro al administrador");
        }
    });//Aqui termina el jquery para mensajes
}


//Funcion para cargar los mensajes.
function loadMessages(mensajes){

    //Variables de mensaje
    var texto;
    var transmisor;
    var fecha_men;

     //For para acceder al array de dos dimensiones.
     for(i=0; i<mensajes.length; i++){
        for(j=0; j<mensajes[i].length; j++){
            texto = (mensajes[i][0]); //Archivo de la nota
            transmisor = (mensajes[i][1]); //nombre de la nota
            fecha_men = (mensajes[i][2]); //fecha de la nota
        } 

        //Mensaje
        var div_msj = document.createElement("div");
        div_msj.className = "msj";
        var text_msj = document.createTextNode(texto);

        //Nombre de terapeuta
        var hT = document.createElement("p");
        var textT = document.createTextNode(nombreT + " " + apT + " dice:");
        hT.appendChild(textT);
        hT.className = "nombreTer";

        //Nombre del admin
        var hA = document.createElement("p");
        var textA = document.createTextNode(nombreA + " " + apA + " dice:");
        hA.appendChild(textA);
        hA.className = "nombreAd";

        //Tu
        var htu = document.createElement("p");
        var textTu = document.createTextNode( "Tu:");
        htu.appendChild(textTu);
        htu.className = "tu";

        //Fecha
        var TFecha = document.createElement("p");
        var textF = document.createTextNode(fecha_men);
        TFecha.appendChild(textF);
        TFecha.className = "fechis";

        //Estilo hT
        hT.style.position = "relative";
        hT.style.top = "0px";
        hT.style.fontSize = "11px";
        hT.style.left = "5px";
        hT.style.marginTop = "10px";
        hT.style.marginBottom = "0px";

        //Estilo hA
        hA.style.position = "relative";
        hA.style.top = "0px";
        hA.style.fontSize = "11px";
        hA.style.left = "5px";
        hA.style.marginTop = "10px";
        hA.style.marginBottom = "0px";

        //Estilo hTu
        htu.style.position = "relative";
        htu.style.top = "0px";
        htu.style.fontSize = "11px";
        htu.style.left = "240px";
        htu.style.marginTop = "10px";
        htu.style.marginBottom = "0px";

        //Estilo fecha
        TFecha.style.position = "relative";
        TFecha.style.top = "0px";
        TFecha.style.fontSize = "11px";      
        TFecha.style.marginTop = "0px";
        TFecha.style.marginBottom = "20px";

        //Estilo del div de mensajes
        div_msj.style.position = "relative";
        div_msj.style.width = "230px";
        div_msj.style.paddingBottom = "10px";
        div_msj.style.paddingTop = "10px";
        div_msj.style.paddingLeft = "10px";
        div_msj.style.paddingRight = "10px";

        //Si el mensaje pertenece al padre
        if(transmisor == user){
            div_msj.style.backgroundColor = "rgb(122, 192, 245)";
            div_msj.style.left = "17px";
            div_msj.style.borderRadius = "25px";
            div_msj.style.borderBottomRightRadius = "0px";

            TFecha.style.left = "160px";

            document.getElementById("chat").appendChild(htu);
            
        }

        //Si el mensaje es del terapeuta
        else if(transmisor == usuarioT){
            div_msj.style.backgroundColor = "rgb(185, 195, 201)";
            div_msj.style.left = "3px";
            div_msj.style.borderRadius = "25px";
            div_msj.style.borderTopLeftRadius = "0px";

            TFecha.style.left = "15px";

            document.getElementById("chat").appendChild(hT);
        }

        //Si el mensaje es del administrador
        else if(transmisor == userA){
            div_msj.style.backgroundColor = "rgb(227, 131, 129)";
            div_msj.style.left = "3px";
            div_msj.style.borderRadius = "25px";
            div_msj.style.borderTopLeftRadius = "0px";

            TFecha.style.left = "15px";

            document.getElementById("chat").appendChild(hA);
        }

        div_msj.appendChild(text_msj);

        document.getElementById("chat").appendChild(div_msj);
        document.getElementById("chat").appendChild(TFecha);
        
        
    }
    
    //Para posicionar el scroll del div hasta abajo
    var objDiv = document.getElementById("chat");
    objDiv.scrollTop = objDiv.scrollHeight;
}

//funcion para cerrar el chat
function cerrar(){
    document.getElementById("up").style.display = "block";
    document.getElementById("chat").style.display = "none";
}

//Funcion para abrir menu lateral.
function abrirmenu(){
    document.getElementById("menu").style.width = "350px";
    document.getElementById("hamb").style.opacity = "0";
}

//funcion para cerrar menu
function cerrarmenu(){
    document.getElementById("menu").style.width = "0px";
    document.getElementById("hamb").style.opacity = "1";
}


//Presionar enter para mandar mensaje.
function enter(e){
    if(e.which == 13 && !e.shiftKey){
        $('#send').click();
        e.preventDefault();
    }
}

//Funcion para enviar mensaje
function enviar(){
    var area_texto = document.getElementById("msj");
    var transmisorPapa = user;

    //Si el area de texto tiene algo escrito
    if(area_texto.value.length > 0){

        //Para mandar el mensaje
        $.post("/Clima/php/enviar.php", {adminis: userA, terapeuta: usuarioT, papa: user, transmiter: transmisorPapa, texto: area_texto.value});
        //Aqui termina el jquery para mensajes
        setTimeout(function(){
            abrir();
        }, 1000);


        area_texto.value = "";
    }

    //si el area de texto está vacia
    else {
        alert("No has escrito ningun mensaje");
    }
    
}

//Funcion para abrir pop-up
function abrirPop(){
    document.getElementById("popup").style.display = "block";
}

//Funcion para cerrar pop-up
function cerrarPop(){
    document.getElementById("popup").style.display = "none";
    document.getElementById("PActual").value = "";
    document.getElementById("PNueva").value = "";
    document.getElementById("PNueva2").value = "";
}

//Funcion para cambiar contraseña
function cambiarC(){
    var pass = document.getElementById("PActual").value;
    var nuevopass = document.getElementById("PNueva").value;
    var nuevopass2 = document.getElementById("PNueva2").value;
    var tabla = "padres";
    var tipo = "usuarioP";

    //Validar para que el usuario no deje campos vacios.
    if(pass == "" || nuevopass == "" || nuevopass2 == ""){
        alert("No dejes campos vacíos.");
    }

    else if(nuevopass != nuevopass2){
        alert("La nueva contraseña es distinta en los dos campos, asegurese de introducir la misma contraseña en los dos campos");
    }

    else{
        //Por seguridad validamos que la contraseña actual sea la correcta.
        $.post("/Clima/php/changeP.php", {usr: user, pss: pass, table: tabla, type: tipo})
        .done(function(password){
            if(password!=""){

                //Se cambia el password
                $.post("/Clima/php/cambioP.php", {usr: user, pss: nuevopass, table: tabla, type: tipo});
               
                alert("La contraseña ha sido actualizada exitosamente. ");
                cerrarPop();
            
            }

            else{
                alert("La contraseña actual es incorrecta, vuelva a introducirla correctamente");
            }
        });
    }
}
