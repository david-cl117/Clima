<?php

    session_start();
    //Variables para conectarse a la base de datos
    $server = "localhost";
    $database = "clima";
    $username = "root";
    $password = "password";

    //id del alumno
    $usuarioA = $_POST["adminis"];
    $usuarioP = $_POST["papa"];
    $usuarioT = $_POST["terapeuta"];
    $transmisor = $_POST["transmiter"];
    $texto = $_POST["texto"];

    //Conectar
    $conn = mysqli_connect($server, $username, $password, $database);

    //Revisar conexion
    if($conn->connect_error){
        die("Connection failed: ". $conn->connect_error);
    }

    //echo "Se conecto a la base de datos correctamente!";
    else {

        if (isset($_SESSION['id'])){
            $sql = "INSERT INTO chats (texto, usuarioP, usuarioT, usuarioA, transmisor) VALUES ('$texto', '$usuarioP', '$usuarioT', '$usuarioA', '$transmisor')";
            $result = mysqli_query($conn, $sql);
        }
        
        else {
            echo "No ha iniciado sesion";
        }
           
    }

    mysqli_close($conn);
?>