//Variable proveniente del anterior JS
var idGrupo = localStorage.getItem("idGrupo");
var user = localStorage.getItem("user");

//Datos del alumno
var nombreA;
var apPA;
var apMA;
var idAl;

//Grupo
var nombreG;

//Funcion para cargar elementos en el html de terapeuta
function cargar(){
    //Datos del terapeuta
    var nombreTer;
    var apPTer;
    var apMTer;

    $(".regisT").remove();
    //sacamos datos del terapeuta
    $.post("/Clima/php/terapeutas.php", {id: idGrupo})
    .done(function(datosTer){
        if(datosTer!=""){

            //Si el terapeuta existe, se pueden agregar alumnos
            document.getElementById("AddAl").style.display = "block";

            if(datosTer == "No ha iniciado sesion"){
                alert ("No ha iniciado sesión");
                document.getElementById("sesion").value = "Iniciar Sesión";
            }

            else{
                datosTerapeuta = eval(datosTer);
                //Sacamos nombre y apellido de admin
                nombreTer = datosTerapeuta[1];
                apPTer = datosTerapeuta[2];
                apMTer = datosTerapeuta[3];

                

                //Poner datos del terapeuta
                document.getElementById('nombre').innerHTML = "Terapeuta: " + nombreTer + " " + apPTer + " " + apMTer;

            }
        }

        else{
            alert("No se encontro al Terapeuta. Registre al terapeuta de este grupo.");
            document.getElementById("AddAl").style.display = "none";

            //Creamos boton para agregar terapeuta
            var AgTer = document.createElement("button");

            AgTer.appendChild(document.createTextNode("Registrar Terapeuta"));
            document.getElementById('transparente').appendChild(AgTer);
            AgTer.className = "regisT";
            AgTer.id = "regT"

            //Estilo del boton
            AgTer.style.position = "absolute";
            AgTer.style.bottom = "30px";
            AgTer.style.left = "465px";
            AgTer.style.width = "170px";
            AgTer.style.height = "40px";
            AgTer.style.border = "none";
            AgTer.style.color = "white";
            AgTer.style.backgroundColor = "rgba(235, 64, 52, 0.8)";
            AgTer.style.fontSize = "17px";
            AgTer.style.borderRadius = "15px";
            AgTer.style.outline = "none";

             //Hover boton
             $(".regisT").hover(function(){
                $(this).css("background-color", "rgba(235, 64, 52, 1)");
                $(this).css("cursor", "pointer");
                }, function(){
                $(this).css("background-color", "rgba(235, 64, 52, 0.8)");
            });

             //Click registrar terapeuta
             $(".regisT").click(function(){
                abrirPopAT();
                
            });

        }
    });//Aqui termina Jquery para sacar info del Administrador

    //Nombre del grupo
    //sacamos datos del grupo
    $.post("/Clima/php/grupo.php", {id: idGrupo})
    .done(function(datosG){
        if(datosG!=""){     
                datosGrupo = eval(datosG);
                //Sacamos nombre del grupo
                nombreG = datosGrupo[0];

                //Poner nombre del grupo
                document.getElementById('titulo').innerHTML = "Grupo: " + nombreG;
        }

        else{
            alert("No se encontro el grupo");
        }
    });//Aqui termina Jquery para sacar info del grupo

    loadStudents();

    
}

//Funcion para cargar alumnos.
function loadStudents(){
    $(".alumnos").remove();
    
    //Sacar alumnos del grupo
    $.post("/Clima/php/alumno.php", {idG: idGrupo})
    .done(function(alms){
        if(alms!=""){

            almsarray = alms.split("][").join("],[");
            var alumnos = eval("["+almsarray+"]");
             //For para acceder al array de dos dimensiones.
            for(i=0; i<alumnos.length; i++){
                for(j=0; j<alumnos[i].length; j++){
                    idAl = (alumnos[i][0]); //id del alumno
                    nombreA = (alumnos[i][1]); //nombre
                    apPA = (alumnos[i][2]); //ap paterno
                    apMA = (alumnos[i][3]); //ap materno
                } 

                //Creacion de elementos HTML
                var divAl = document.createElement("div");
                divAl.className = "alumnos";
                divAl.id = idAl;

                var textAl = document.createElement("h3");
                var TA = document.createTextNode(nombreA + " " + apPA + " " + apMA);
                textAl.appendChild(TA);
                textAl.className = "hnombre";

                //boton mas
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
                var textE = document.createTextNode("Mover alumno");
                textEdit.appendChild(textE);
                editar.appendChild(textEdit);

                var textDelete = document.createElement("h5");
                var textD = document.createTextNode("Eliminar alumno");
                textDelete.appendChild(textD);
                eliminar.appendChild(textDelete);

                divAl.appendChild(textAl);
                divAl.appendChild(botonMas);
                divAl.appendChild(opc);
    
                document.getElementById("group").appendChild(divAl);

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
                textAl.style.position = "absolute"
                textAl.style.marginLeft = "30px";
                textAl.style.color = "rgb(0, 28, 91)";
                textAl.style.fontSize = "20px";
                textAl.style.display = "inline-block";
                textAl.style.bottom = "3px";

                //Estilo de los div
                divAl.style.position = "relative";
                divAl.style.width = "100%";
                divAl.style.height = "70px";
                divAl.style.textAlign = "left";
                divAl.style.top = "0px";
                divAl.style.display = "flex";
                divAl.style.opacity = "0.8";


                if (i%2 == 0){
                    divAl.style.backgroundColor = "rgba(166, 207, 247, 0.9)";
                    textAl.style.color = "rgb(0, 28, 91)";
                }

                else{
                    divAl.style.backgroundColor = "rgba(0, 28, 91,0.9)";
                    textAl.style.color = "white";
                }

                //Hoover de los divs
                $(".alumnos").hover(function(){
                    $(this).css("opacity", "1");
                    $(this).css("cursor", "pointer");
                    $(this).children(".hnombre").css("text-decoration", "underline");
                    }, function(){
                    $(this).css("opacity", "0.9");
                    $(this).children(".hnombre").css("text-decoration", "none");
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

                //Click en los div
                $("#"+idAl).click(function(e){
                    e.preventDefault();

                    var div_id = this.id;
                    localStorage.setItem("idAlumno", div_id);
                    localStorage.setItem("user", user);
                    window.open('/Clima/alumnoAd.html', '_self');
                });


            }

            //Click eliminar alumno
            $(".delete").click(function(){
                event.stopPropagation();
                idAl = $(this).parent().parent().attr("id");
                abrirPopDA();
                
            });

             //click en mover alumno.
             $(".edit").click(function(){
                event.stopPropagation();
                idAl = $(this).parent().parent().attr("id");
                abrirPopMover();
            });
        }

        else{
            alert("No se encontraron alumnos");
        }
    });//Aqui termina Jquery para sacar info de los alumnos
}

//Funcion para abrir pop-up
function abrirPop(){
    document.getElementById("popup").style.display = "block";
}

//Funcion para cerrar pop-up
function cerrarPop(){
    document.getElementById("popup").style.display = "none";
    $("#PActual").val("");
    $("#PNueva").val("");
    $("#PNueva2").val("");
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

//Funcion para abrir pop-up para agregar alumnos
function abrirPopA(){
    document.getElementById("popupA").style.display = "block";
}

//Funcion para cerrar pop-up para agregar alumnos
function cerrarPopA(){
    document.getElementById("popupA").style.display = "none";
}

//Funcion para agregar alumno
function agregarA(){
    var nombreAlumno = document.getElementById("textName").value;
    var paternoA = document.getElementById("textPat").value;
    var maternoA = document.getElementById("textMat").value;
    var birth = document.getElementById("textDate").value;
    var cents = document.getElementById("cents").value;

    //Sacamos iniciales del alumno 
    var inicialN = nombreAlumno.charAt(0);
    var inicialP = paternoA.charAt(0);
    var inicialM = maternoA.charAt(0);
    var iniciales = inicialN+inicialP+inicialM;

    //Carpeta del grupo.
    var GroupFolder = nombreG.split(" ").join("_");

    //Nombre de la carpeta del alumno (iniciales del alumno + id)
    var carpeta = iniciales+"-"+cents;

    //Path para crear las carpetas
    var PathNotas = "/Clima/uploads/Notas/"+GroupFolder+"/"+carpeta;
    var PathPlans = "/Clima/uploads/Planes/"+GroupFolder+"/"+carpeta;


    //Validamos si no hay campos vacios
    if(nombreAlumno != "" && paternoA != "" && maternoA != "" && birth != ""){
        
        //Se registra al alumno en la base de datos y se crea una carpeta para el alumno en el servidor
        $.post("/Clima/php/regisAl.php", {name: nombreAlumno, apPat: paternoA, apMat: maternoA, fecha: birth, idG: idGrupo, pathN: PathNotas, pathP: PathPlans, idA: cents});
        
        cerrarPopA();
        alert("Se ha registrado al alumno. \nHaga click en el alumno " + nombreAlumno + " " + paternoA + " " + maternoA + " para crear la cuenta de su padre o tutor.");

        setTimeout(function(){
            loadStudents();
        }, 1000);
    }

    else{
        alert("Para continuar llene todos los campos con los datos del alumno.");
    }
    
}

//Funcion para abrir pop-up para eliminar alumnos
function abrirPopDA(){
    document.getElementById("popupDA").style.display = "block";

    //Sacamos nombre del alumno
    $.post("/Clima/php/papas.php", {id: idAl})
    .done(function(nameAl){
        if(nameAl!=""){
            currname = eval(nameAl);
            //Sacamos nombre del alumno
            var nameAlum = currname[0];
            var app = currname[1];
            var apm = currname[2];

            var text = document.createElement("h4");
            var textnode = document.createTextNode("¿Seguro que deseas dar de baja al alumno " + nameAlum + " " + app + " " + apm + "?");
            text.appendChild(textnode);
            text.className = "textDeleteA";

            document.getElementById("elmA").appendChild(text);

            //Estilo de texto
            text.style.position = "relative";
            text.style.top = "100px";
           // textnode.style.textAlign = "center";
            text.style.textAlign = "center";
        
        }

        else{
            alert("Error el alumno no se encuentra en la base de datos");
        }
    });   
}

//Funcion para cerrar pop-up para eliminar alumnos
function cerrarPopDA(){
    document.getElementById("popupDA").style.display = "none";
    $(".textDeleteA").remove();
}

//Funcion para eliminar alumno
function eliminarAl(){

    //Sacamos iniciales del alumno 
    var inicialN;
    var inicialP;
    var inicialM;
    var iniciales;

    //Carpeta del grupo.
    var GroupFolder = nombreG.split(" ").join("_");

    //Sacamos nombre del alumno
    $.post("/Clima/php/papas.php", {id: idAl})
    .done(function(nameAl){
        if(nameAl!=""){
            currname = eval(nameAl);
            //Sacamos nombre de la nota
            var nameAlum = currname[0];
            var app = currname[1];
            var apm = currname[2];

            inicialN = nameAlum.charAt(0);
            inicialP = app.charAt(0);
            inicialM = apm.charAt(0);
            iniciales = inicialN+inicialP+inicialM;

            //Nombre de la carpeta del alumno
            var carpeta = iniciales+"-"+idAl;

            //Path para crear las carpetas
            var PathNotas = "/Clima/uploads/Notas/"+GroupFolder+"/"+carpeta;
            var PathPlans = "/Clima/uploads/Planes/"+GroupFolder+"/"+carpeta;

            $.post("/Clima/php/deleteAlm.php", {linkN: PathNotas, linkP: PathPlans, idA:idAl});

            alert("Se ha dado de baja al alumno exitosamente.");

            cerrarPopDA();
            //Esperamos un segundo y ejecutamos la funcion para cargar alumnos
            setTimeout(function(){
                loadStudents();
            }, 1000);
        
        }

        else{
            alert("Error la nota no está");
        }
    });   
}

//Funcion para abrir popup para registrar terapeuta
function abrirPopAT(){
    document.getElementById("popupTer").style.display = "block";
}

//Funcion para cerrar popup para registrar terapeuta
function cerrarPopAT(){
    document.getElementById("popupTer").style.display = "none";

    document.getElementById("NameTer").value = "";
    document.getElementById("PaternoT").value = "";
    document.getElementById("MaternoT").value = "";
}

//Funcion para agregar terapeuta
function agregarTer(){
    //Leemos datos del padre
    var nombreTer = document.getElementById("NameTer").value;
    var apellido_P = document.getElementById("PaternoT").value;
    var apellido_M = document.getElementById("MaternoT").value;
    var nac = document.getElementById("fechaTer").value;

    //Validamos que todos os campos estén llenos
    if(nombreTer != "" && apellido_P != "" && apellido_M != "" && nac != ""){
        //Sacamos iniciales del alumno para crear usuario del padre
        var inicialN = nombreTer.charAt(0);
        var inicialP = apellido_P.charAt(0);
        var inicialM = apellido_M.charAt(0);
        var iniciales = inicialN + inicialP + inicialM;

        //Iniciales del grupo
        arrayGrupo = nombreG.split(" ");
        var inicialesGarr = [];

        for(i=0; i<arrayGrupo.length; i++){
            inicialesGarr[i] = arrayGrupo[i].charAt(0);
        }

        var inicialesG = (inicialesGarr.toString()).split(",").join("");

        //Usuario
        var usuarioTer = "T-"+iniciales+inicialesG;

    
        //Registramos al Terapeuta
        $.post("/Clima/php/registrarTer.php", {usr: usuarioTer, name: nombreTer, apP: apellido_P, apM: apellido_M, pass: nac, idG: idGrupo});
        alert("El terapeuta se ha registrado, su nombre de usuario es: " + usuarioTer + " y la contraseña es la fecha de nacimiento del terapeuta en el siguiente formato: DD-MM-AAAA" );

        cerrarPopAT();
        //Esperamos un segundo y ejecutamos la funcion para cargar informacion
        setTimeout(function(){
            cargar();
        }, 1000);
    }

    //Si faltan campos por llenar
    else{
        alert("Favor de llenar todos los campos");
    }
   
}

//Funcion para abrir popup para mover alumno
function abrirPopMover(){
    document.getElementById("popupMA").style.display = "block";

    //sacamos los nombres de los grupos.
    //Sacamos nombre del alumno
    $.post("/Clima/php/grupos.php", {id: idAl})
    .done(function(grupos){
        if(grupos!=""){
        
            grouparray = grupos.split("][").join("],[");
            var grupo = eval("["+grouparray+"]");
        
            for(i=0; i<grupo.length; i++){
                for(j=0; j<grupo[i].length; j++){
                    idGNew = (grupo[i][0]); //id del grupo
                    nombreGrupo = (grupo[i][1]); //nombre grupo

                } 

                //Creacion de elementos HTML
                //Opciones
                var opc = document.createElement("option");
                var textOpc = document.createTextNode(nombreGrupo);
                opc.value = nombreGrupo;
                opc.className = "opcGrups";

                opc.appendChild(textOpc);

                document.getElementById("gru").appendChild(opc);

                //Si el grupo es el actual, la opcion se inhabilita
                if(opc.value == nombreG){
                    opc.disabled = true;
                }
            }
        }

        else{
            alert("Error la nota no está");
        }
    });   
}

//Funcion para cerrar popup para mover alumno
function cerrarPopMover(){
    $(".opcGrups").remove();
    document.getElementById("popupMA").style.display = "none";
    document.getElementById("gru").value = ""; //valor predeterminado
}

//funcion para mover alumno de grupo
function moverAl(){
    //Nombre del grupo a donde se moverá el alumno
    var SelectedGroup = document.getElementById("gru").value;
    //Nombre del grupo actual
    var nowGroup = nombreG;

    //Folder del grupo a donde se moverá el alumno
    var newFolder = SelectedGroup.split(" ").join("_");
    //Folder actual 
    var oldFolder = nowGroup.split(" ").join("_");

    //Variable para el usuario del padre
    var userP;
    
    //Id del grupo a donde se moverá el alumno
    var idGNew;
    
    //Validacion para que el usuario no deje el campo vacío
    if(SelectedGroup != ""){

        //PARA OBTENER EL USUARIO DEL PADRE (NOMBRE DEl FOLDER)
        $.post("/Clima/php/padre.php", {id: idAl})
        .done(function(padre){

            if(padre!=""){
                papa = eval(padre);
                //Sacamos nombre de usuario del padre
                userP = papa[0];

                //paths a los folders nuevos de notas y planes
                var newPathN = "/Clima/uploads/Notas/"+newFolder+"/"+userP;
                var newPathP = "/Clima/uploads/Planes/"+newFolder+"/"+userP;

                //paths a los folders viejos de notas y planes
                var oldPathN = "/Clima/uploads/Notas/"+oldFolder+"/"+userP;
                var oldPathP = "/Clima/uploads/Planes/"+oldFolder+"/"+userP;

                var linkNote = "/Clima/uploads/Notas/"+newFolder+"/"+userP+"/";
                var linkPlan = "/Clima/uploads/Planes/"+newFolder+"/"+userP+"/";

                //Query para sacar id del grupo
                $.post("/Clima/php/idGrupo.php", {nameG: SelectedGroup})
                .done(function(idGr){

                    if(idGr!=""){
                       idGrupito = eval(idGr);
                       idGNew = idGrupito[0];

                        //Query para mover al alumno y mover las carpetas de grupo
                        $.post("/Clima/php/moveA.php", {id: idAl, pathN: oldPathN, pathP: oldPathP, newNotes: newPathN, newPlans: newPathP, idG: idGNew, linkN: linkNote, linkP: linkPlan});

                        //Query para cambiar link de notas
                        $.post("/Clima/php/changeLinkN.php", {linkN: linkNote, id: idAl});
                        //Query para cambiar link de planes
                        $.post("/Clima/php/changeLinkP.php", {linkP: linkPlan, id: idAl});
                        //Para eliminar los mensajes.
                        $.post("/Clima/php/borrarMens.php", {usrP: userP});

                    
                        cerrarPopMover();
                        alert("El alumno ha sido movido al grupo " + SelectedGroup + " exitosamente.");

                        //Esperamos un segundo y ejecutamos la funcion para cargar informacion
                        setTimeout(function(){
                            cargar();
                        }, 1000);
                       
                    }

                    else{     
                        alert ("No se encontro el grupo");
                    }

                });

            }

            else{     
                alert ("No se encontro al padre, asegurese de que el padre del alumno esté registrado.");
            }

        });

    }

    else{
        alert("Elija un grupo para mover al alumno");
    }
}