<?php

    session_start();
    //Variables para conectarse a la base de datos
    $server = "localhost";
    $database = "clima";
    $username = "root";
    $password = "password";

    //id del alumno
    $usuario = $_POST["usr"];
    $nombre = $_POST["name"];
    $apPaterno = $_POST["apP"];
    $apMaterno = $_POST["apM"];
    $pass = $_POST["pass"];
    $idAlumno = $_POST["idA"];

    //Conectar
    $conn = mysqli_connect($server, $username, $password, $database);

    //Revisar conexion
    if($conn->connect_error){
        die("Connection failed: ". $conn->connect_error);
    }

    //echo "Se conecto a la base de datos correctamente!";
    else {

        if (isset($_SESSION['id'])){

            $sql = "INSERT INTO padres (usuarioP, nombre, ap_Paterno, ap_Materno, password, id_Alumno) VALUES ('$usuario', '$nombre', '$apPaterno', '$apMaterno', '$pass', '$idAlumno')";
            $result = mysqli_query($conn, $sql);
        }
        
        else {
            echo "No ha iniciado sesion";
        }
           
    }

    mysqli_close($conn);
?>