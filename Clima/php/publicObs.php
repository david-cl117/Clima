<?php

    session_start();
    //Variables para conectarse a la base de datos
    $server = "localhost";
    $database = "clima";
    $username = "root";
    $password = "password";

    $usuarioT = $_POST["terapeuta"];
    $texto = $_POST["texto"];
    $idAlumno = $_POST["idal"];

    //Conectar
    $conn = mysqli_connect($server, $username, $password, $database);

    //Revisar conexion
    if($conn->connect_error){
        die("Connection failed: ". $conn->connect_error);
    }

    //echo "Se conecto a la base de datos correctamente!";
    else {

        if (isset($_SESSION['id'])){
            $sql = "INSERT INTO observaciones (id_Alumno, usuarioT, observacion) VALUES ('$idAlumno', '$usuarioT', '$texto')";
            $result = mysqli_query($conn, $sql);
        }
        
        else {
            echo "No ha iniciado sesion";
        }
           
    }

    mysqli_close($conn);
?>