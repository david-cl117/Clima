//Variable proveniente del anterior JS
var user = localStorage.getItem("user");

//Datos de grupos
var nombreG;
var idG;
var idGrupo;

//Funcion para cargar elementos en el html de terapeuta
function cargar(){
    //Datos del Administrador
    var nombreAd;
    var apPAd;
    var apMAd;


    //sacamos datos del administrador
    $.post("/Clima/php/administrador.php", {user: user})
    .done(function(datosAd){
        if(datosAd!=""){

            if(datosAd == "No ha iniciado sesion"){
                alert ("No ha iniciado sesión");
                document.getElementById("sesion").value = "Iniciar Sesión";
            }

            else{
                datosAdmin = eval(datosAd);
                //Sacamos nombre y apellido de admin
                nombreAd = datosAdmin[0];
                apPAd = datosAdmin[1];
                apMAd = datosAdmin[2];

                //Poner datos del terapeuta
                document.getElementById('nombre').innerHTML = "Administrador: " + nombreAd + " " + apPAd + " " + apMAd;
            }
        }

        else{
            alert("No se encontro al Administrador");
        }
    });//Aqui termina Jquery para sacar info del Administrador

    loadGroups();
}

//Funcion para cargar grupos.
function loadGroups(){

    $(".grupos").remove();

    //Sacar grupos
    $.post("/Clima/php/grupos.php", {user: user})
    .done(function(groups){
        if(groups!=""){

            grouparray = groups.split("][").join("],[");
            var grupo = eval("["+grouparray+"]");
             //For para acceder al array de dos dimensiones.
            for(i=0; i<grupo.length; i++){
                for(j=0; j<grupo[i].length; j++){
                    idG = (grupo[i][0]); //id del grupo
                    nombreG = (grupo[i][1]); //nombre

                } 

                //Creacion de elementos HTML
                //Div del grupo
                var divG = document.createElement("div");
                divG.className = "grupos";
                divG.id = idG;

                //Texto
                var textG = document.createElement("h3");
                var TG = document.createTextNode(nombreG);
                textG.appendChild(TG);
                textG.className = "hnombreG";

                //Boton
                var botonMas = document.createElement("button");
                botonMas.className = "mas";
                //Icono de boton
                var iconMas = document.createElement("i");
                iconMas.className = "fa fa-ellipsis-h";

                botonMas.appendChild(iconMas);

                //Div desplegable de opciones
                var opc = document.createElement("div");
                opc.className = "divMas";

                //Divs hijos de opc
                var editar = document.createElement("div");
                editar.className = "edit";
                var eliminar = document.createElement("div");
                eliminar.className = "delete";
                opc.appendChild(editar);
                opc.appendChild(eliminar);

                //Texto de hijos
                var textEdit = document.createElement("h5");
                var textE = document.createTextNode("Editar grupo");
                textEdit.appendChild(textE);
                editar.appendChild(textEdit);

                var textDelete = document.createElement("h5");
                var textD = document.createTextNode("Eliminar grupo");
                textDelete.appendChild(textD);
                eliminar.appendChild(textDelete);

                divG.appendChild(textG);
                divG.appendChild(botonMas);
                divG.appendChild(opc);
                document.getElementById("group").appendChild(divG);

                //Estilo de texto editar
                textEdit.style.position = "relative";
                textEdit.style.top = "-10px";

                //Estilo de texto eliminar
                textDelete.style.position = "relative";
                textDelete.style.top = "-10px";

                 //Estilo div editar
                 editar.style.position = "absolute";
                 editar.style.backgroundColor = "rgba(255, 255, 255, 1)";
                 editar.style.width = "150px";
                 editar.style.height = "39px";
                 editar.style.zIndex = "10000";
                 editar.style.borderBottom = "1px solid lightgray";
                 editar.style.textAlign = "center";

                 //Estilo div eliminar
                 eliminar.style.position = "absolute";
                 eliminar.style.backgroundColor = "rgba(255, 255, 255, 1)";
                 eliminar.style.top = "40px";
                 eliminar.style.width = "150px";
                 eliminar.style.height = "39px";
                 eliminar.style.zIndex = "10000";
                 eliminar.style.borderBottom = "1px solid lightgray";
                 eliminar.style.textAlign = "center";


                //Estilo div de opciones
                opc.style.position = "absolute";
                opc.style.backgroundColor = "rgb(230, 230, 230)";
                opc.style.right = "40px";
                opc.style.top = "40px";
                opc.style.width = "150px";
                opc.style.height = "80px";
                opc.style.zIndex = "10000";
                opc.style.display = "none";

                //Estilo del boton
                botonMas.style.position = "absolute";
                botonMas.style.right = "40px";
                botonMas.style.top = "16px";
                botonMas.style.backgroundColor = "transparent";
                botonMas.style.width = "45px";
                botonMas.style.height = "25px";
                botonMas.style.border = "none";
                botonMas.style.outline = "none";
                botonMas.style.fontSize = "35px";
                botonMas.style.color = "rgba(0,0,0,0.8)";

                //Estilo del texto
                //textAl.style.lineHeight = "50px";
                textG.style.position = "absolute"
                textG.style.marginLeft = "30px";
                //textG.style.color = "rgb(0, 28, 91)";
                textG.style.fontSize = "20px";
                textG.style.display = "inline-block";
                textG.style.bottom = "3px";

                //Estilo de los div
                divG.style.position = "relative";
                divG.style.width = "100%";
                divG.style.height = "70px";
                divG.style.textAlign = "left";
                divG.style.top = "0px";
                divG.style.display = "flex";
                divG.style.opacity = "0.9";
               // divG.style.zIndex = "10";

                if (i%2 == 0){
                    divG.style.backgroundColor = "rgba(166, 207, 247, 0.9)";
                    textG.style.color = "rgb(0, 28, 91)";
                }

                else{
                    divG.style.backgroundColor = "rgba(0, 28, 91,0.9)";
                    textG.style.color = "white";
                }

                //Hoover de los divs
                $(".grupos").hover(function(){
                    $(this).css("opacity", "1");
                    $(this).css("cursor", "pointer");
                    $(this).children(".hnombreG").css("text-decoration", "underline");

                    
                    }, function(){
                    $(this).css("opacity", "0.9");
                    $(this).children(".hnombreG").css("text-decoration", "none");
                });

                //Click en los div
                $("#"+idG).click(function(e){
                    e.preventDefault();

                    var div_id = this.id;
                    localStorage.setItem("idGrupo", div_id);
                    localStorage.setItem("user", user);
                    window.open('/Clima/grupoAd.html', '_self');
                });

                //Hoover de boton de opciones
                $(".mas").hover(function(){
                    $(this).css("opacity", "1");
                    $(this).css("cursor", "pointer");
                    $(this).siblings(".divMas").css("display", "block");
                    }, function(){
                    $(this).css("opacity", "0.9");
                    $(this).siblings(".divMas").css("display", "none");
                });

                //Hoover de boton de opciones
                $(".divMas").hover(function(){
                    $(this).css("opacity", "1");
                    $(this).css("cursor", "pointer");
                    $(this).css("display", "block");
                    }, function(){
                    $(this).css("opacity", "0.9");
                    $(this).css("display", "none");
                });

                //Hoover de editar
                $(".edit").hover(function(){
                    $(this).css("backgroundColor", "rgba(230, 230, 230, 1)");
                    $(this).css("cursor", "pointer");

                    }, function(){
                    $(this).css("backgroundColor", "rgba(255, 255, 255, 1)");

                });

                //Hoover de eliminar
                $(".delete").hover(function(){
                    $(this).css("backgroundColor", "rgba(230, 230, 230, 1)");
                    $(this).css("cursor", "pointer");

                    }, function(){
                    $(this).css("backgroundColor", "rgba(255, 255, 255, 1)");

                });

            }

            //click en editar.
            $(".edit").click(function(){
                event.stopPropagation();
                idGrupo = $(this).parent().parent().attr("id");
                abrirPopEditar();
            });

            //click en editar.
            $(".delete").click(function(){
                event.stopPropagation();
                idGrupo = $(this).parent().parent().attr("id");
                abrirPopDelete();
            });
        }

        else{
            alert("No se encontraron grupos");
        }
    });//Aqui termina Jquery para sacar grupos
}

//Funcion para agregar grupo.
function agregaG(){
    var nombreGrupo = document.getElementById("grupis").value;
    var folderName = nombreGrupo.split(" ").join("_");
    var PathNotas = "/Clima/uploads/Notas/"+folderName;
    var PathPlans = "/Clima/uploads/Planes/"+folderName;

    //Si el area de texto tiene algo escrito
    if(nombreGrupo.length > 0){
        
        //Para subir grupo
        $.post("/Clima/php/agregarGrup.php", {nameG: nombreGrupo, linkN: PathNotas, linkP: PathPlans});
        //Aqui termina el jquery para subir grupo
        alert("El grupo se registró exitosamente.");

        cerrarPopG()
        //Esperamos un segundo y ejecutamos la funcion para cargar grupos
        setTimeout(function(){
            loadGroups();
        }, 1000);
        


        nombreGrupo = "";
    }

    //si el area de texto está vacia
    else {
        alert("No has escrito el nombre del grupo");
    }
}

//Funcion para abrir pop-up password
function abrirPop(){
    document.getElementById("popup").style.display = "block";
}

//Funcion para cerrar pop-up password
function cerrarPop(){
    document.getElementById("popup").style.display = "none";
    $("#PActual").val("");
    $("#PNueva").val("");
    $("#PNueva2").val("");
}

//Funcion para abrir pop-up grupo
function abrirPopG(){
    document.getElementById("popupG").style.display = "block";
}

//Funcion para cerrar pop-up grupo
function cerrarPopG(){
    document.getElementById("popupG").style.display = "none";
    document.getElementById("grupis").value = "";
}

//Funcion para cambiar contraseña
function cambiarC(){
    var pass = document.getElementById("PActual").value;
    var nuevopass = document.getElementById("PNueva").value;
    var nuevopass2 = document.getElementById("PNueva2").value;
    var tabla = "administrador";
    var tipo = "usuarioA";

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
               
                cerrarPop();
                alert("La contraseña ha sido actualizada exitosamente.");
            
            }

            else{
                alert("La contraseña actual es incorrecta, vuelva a introducirla correctamente");
            }
        });
    }
}

//Funcion para abrir pop-up editar
function abrirPopEditar(){
    document.getElementById("popupEditar").style.display = "block";
    //alert("Editar " + idGrupo);
}

//Funcion para cerrar pop-up grupo
function cerrarPopEditar(){
    document.getElementById("popupEditar").style.display = "none";
    document.getElementById("grupoEditar").value = "";
}

//Funcion paa editar el nombre de un grupo
function Editar(){
    var texto = document.getElementById("grupoEditar").value;
    var nombreActual;
    var folderActual;


    if (texto.length > 0){ 

        //Sacamos nombre actual del grupo para editar el folder actual
        $.post("/Clima/php/grupo.php", {id: idGrupo})
        .done(function(nameGroup){
            if(nameGroup!=""){
                currname = eval(nameGroup);
                //Sacamos nombre del grupo
                nombreActual = currname[0];

                folderActual = nombreActual.split(" ").join("_");
                folderNuevo = texto.split(" ").join("_");
                var PathNotas = "/Clima/uploads/Notas/"+folderActual;
                var PathPlans = "/Clima/uploads/Planes/"+folderActual;
                var PathNotasNuevo = "/Clima/uploads/Notas/"+folderNuevo;
                var PathPlansNuevo = "/Clima/uploads/Planes/"+folderNuevo;

                //Query ara editar el nombre del grupo y el folder
                $.post("/Clima/php/editGrup.php", {nameG: texto, linkN: PathNotas, linkP: PathPlans, notaNuevo: PathNotasNuevo, planNuevo: PathPlansNuevo, idG:idGrupo});

                alert("El grupo se editó correctamente.");

                cerrarPopEditar();
                //Esperamos un segundo y ejecutamos la funcion para cargar grupos
                setTimeout(function(){
                    loadGroups();
                }, 1000);
            
            }

            else{
                alert("Error el grupo no está");
            }
        });

    }

    else {
        alert("No has escrito nada");
    }
    
}

//Funcion para abrir pop-up delete
function abrirPopDelete(){
    document.getElementById("popupDelete").style.display = "block";

     //Sacamos nombre actual del grupo
     $.post("/Clima/php/grupo.php", {id: idGrupo})
     .done(function(nameGroup){
         if(nameGroup!=""){
             currname = eval(nameGroup);
             //Sacamos nombre del grupo
             nombreActual = currname[0];

             var text = document.createElement("h4");
             var textnode = document.createTextNode("¿Seguro que deseas eliminar el grupo " + nombreActual + "?");
             text.appendChild(textnode);
             text.className = "textDelete";

             document.getElementById("elm").appendChild(text);

             //Estilo de texto
             text.style.position = "relative";
             text.style.top = "110px";
         
         }

         else{
             alert("Error el grupo no está");
         }
     });   
}

//Funcion para cerrar pop-up delete
function cerrarPopDelete(){
    document.getElementById("popupDelete").style.display = "none";
    $(".textDelete").remove();
}

//Funcion para eliminar un grupo.
function eliminarG(){
    var nombreActual;
    var folderActual;
    //Sacamos nombre actual del grupo
    $.post("/Clima/php/grupo.php", {id: idGrupo})
    .done(function(nameGroup){
        if(nameGroup!=""){
            currname = eval(nameGroup);
            //Sacamos nombre del grupo
            nombreActual = currname[0];

            folderActual = nombreActual.split(" ").join("_");
            var PathNotas = "/uploads/Notas/"+folderActual;
            var PathPlans = "/uploads/Planes/"+folderActual;

            $.post("/php/deleteGrup.php", {nameG: nombreActual, linkN: PathNotas, linkP: PathPlans, idG:idGrupo});

            alert("El grupo se eliminó correctamente.");

            cerrarPopDelete();
            //Esperamos un segundo y ejecutamos la funcion para cargar grupos
            setTimeout(function(){
                loadGroups();
            }, 1000);
        
        }

        else{
            alert("Error el grupo no está");
        }
    });
}