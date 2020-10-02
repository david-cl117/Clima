
var id;//Variable global para pasar el id a otro js.

//Para que el boton de login cumpla su funcion cuando le den enter
$(document).ready(function(){
    $('#pass').keypress(function(e){
        if(e.keyCode == 13){
            $('#login').click();
        }
    });

    $('#user').keypress(function(e){
        if(e.keyCode == 13){
            $('#login').click();
        }
    });
});

//Funcion para validar que el usuario no deje campos vacios
function pag(){
    //Variables
    var tipo_U = document.getElementById("tipo").value;
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;

    if (user == "" && pass == ""){
        alert("No dejes campos vacios, introduce tus datos");
        return false;
    }

    else if (user == ""){
        alert("No dejes campos vacios, escribe tu nombre de usuario");
        return false;
    }

    else if (pass == ""){
        alert("No dejes campos vacios, escribe tu contraseña");
        return false;
    }

    else if (tipo_U == ""){
        alert("Elige tipo de usuario");
        return false;
    }

    //Si no deja campos vacios
    else {
        //Pasamos datos del usuario con metodo post al archivo php
        $.post("/Clima/php/inicio.php", {usr: user, pss: pass, tipoU: tipo_U})
        .done(function(data){//Recolectamos la informacion del php
            
            //Si el usuario existe:
            if(data!=""){
                if(tipo_U == "Admin"){  
                    localStorage.setItem("user", user);
                    window.open('/Clima/inicioA.html', '_self');
                    
                }

                else if(tipo_U == "Padre"){               
                    window.open('/Clima/inicioP.html', '_self');
                    id = data;    
                    localStorage.setItem("idAlumno", id);     
                    localStorage.setItem("user", user);
                }

                else if(tipo_U == "Ter"){
                    id = data;
                    localStorage.setItem("idGrupo", id);     
                    localStorage.setItem("user", user);
                    window.open('/Clima/inicioT.html', '_self');
                }
                
            }

            //Si el usuario no existe
            else {
                alert("Usuario o contraseña incorrectos")
            }
            
        });
        true;
    }
}