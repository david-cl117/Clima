//Variable proveniente del anterior JS
var idGrupo = localStorage.getItem("idGrupo");
var user = localStorage.getItem("user");

//Funcion para cargar elementos en el html de terapeuta
function cargar(){
    //Datos del terapeuta
    var nombreT;
    var apPT;
    var apMT;

    //Grupo
    var nombreG;

    //Datos del alumno
    var nombreA;
    var apPA;
    var apMA;
    var idAl;

    //sacamos datos del terapeuta
    $.post("/Clima/php/terapeuta.php", {user: user, idG: idGrupo})
    .done(function(datosT){
        if(datosT!=""){

            if(datosT == "No ha iniciado sesion"){
                alert ("No ha iniciado sesión");
                document.getElementById("sesion").value = "Iniciar Sesión";
            }

            else{
                datosTer = eval(datosT);
                //Sacamos nombre y apellido de admin
                nombreT = datosTer[0];
                apPT = datosTer[1];
                apMT = datosTer[2];
                nombreG = datosTer[3];

                //Poner datos del terapeuta
                document.getElementById('nombre').innerHTML = "Terapeuta: " + nombreT + " " + apPT + " " + apMT;
                document.getElementById('titulo').innerHTML = "Grupo: " + nombreG;
            }
        }

        else{
            alert("No se encontro al terapeuta");
        }
    });//Aqui termina Jquery para sacar info del terapeuta

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

                divAl.appendChild(textAl);
                document.getElementById("group").appendChild(divAl);

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

                //Click en los div
                $("#"+idAl).click(function(e){
                    e.preventDefault();

                    var div_id = this.id;
                    localStorage.setItem("idAlumno", div_id);
                    localStorage.setItem("user", user);
                    window.open('/Clima/alumnoTer.html', '_self');
                });
            }
        }

        else{
            alert("No se encontraron alumnos");
        }
    });//Aqui termina Jquery para sacar info del terapeuta
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
    var tabla = "terapeutas";
    var tipo = "usuarioT";

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