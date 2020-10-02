<?php

    session_start();
    //Variables para conectarse a la base de datos
    $server = "localhost";
    $database = "clima";
    $username = "root";
    $password = "password";

    //Variables del formulario
    $usuario = $_POST["usr"];
    $pass = $_POST["pss"];
    $tipo_U = $_POST["tipoU"];

    //Variables de sesion.
    $_SESSION['id'] = $_POST["idS"];

    //Conectar
    $conn = mysqli_connect($server, $username, $password, $database);

    //Revisar conexion
    if($conn->connect_error){
        die("Connection failed: ". $conn->connect_error);
    }

    //echo "Se conecto a la base de datos correctamente!";
    else {

        //Validar que el usuario y contraseña son correctos ADMIN
        if($tipo_U == "Admin"){
            $sql = mysqli_prepare($conn, "SELECT nombre FROM administrador WHERE usuarioA = ? AND password = ?");
            mysqli_stmt_bind_param($sql, 'ss', $usuario, $pass);
            mysqli_stmt_bind_result($sql, $result);
            mysqli_stmt_execute($sql);
            mysqli_stmt_fetch($sql);
        
            if (!empty($result)){
                //Variables de sesion.
                $_SESSION['id'] = 1;
                
                echo $result;
                
                $sql -> free_result();
                mysqli_stmt_close($sql);
            }

            else{
                echo "";
            }          
        }

        //Validar que el usuario y contraseña son correctos PADRES
        else if($tipo_U == "Padre"){
            $sql = mysqli_prepare($conn, "SELECT id_alumno FROM padres WHERE usuarioP = ? AND password = ?");
            mysqli_stmt_bind_param($sql, 'ss', $usuario, $pass);
            mysqli_stmt_bind_result($sql, $result);
            mysqli_stmt_execute($sql);
            mysqli_stmt_fetch($sql);
        
            if (!empty($result)){
                //Variables de sesion.
                $_SESSION['id'] = 1;
                
                echo $result;
                
                $sql -> free_result();
                mysqli_stmt_close($sql);
            }

            else{
                echo "";
            }          
        }

        //Validar que el usuario y contraseña son correctos TERAPEUTAS
        else if($tipo_U == "Ter"){
            $sql = mysqli_prepare($conn, "SELECT id_Grupo FROM terapeutas WHERE usuarioT = ? AND password = ?");
            mysqli_stmt_bind_param($sql, 'ss', $usuario, $pass);
            mysqli_stmt_bind_result($sql, $result);
            mysqli_stmt_execute($sql);
            mysqli_stmt_fetch($sql);
        
            if (!empty($result)){
                //Variables de sesion.
                $_SESSION['id'] = 1;
                
                echo $result;
                
                $sql -> free_result();
                mysqli_stmt_close($sql);
            }

            else{
                echo "";
            }         
        }       
      
    }

    mysqli_close($conn);
?>