<?php

    session_start();
    //Variables para conectarse a la base de datos
    $server = "localhost";
    $database = "clima";
    $username = "root";
    $password = "password";

    //id del alumno
    $grupo = $_POST["nameG"];
    $pathN = $_POST["linkN"];
    $pathP = $_POST["linkP"];

    //Conectar
    $conn = mysqli_connect($server, $username, $password, $database);

    //Revisar conexion
    if($conn->connect_error){
        die("Connection failed: ". $conn->connect_error);
    }

    //echo "Se conecto a la base de datos correctamente!";
    else {

        if (isset($_SESSION['id'])){

            mkdir($_SERVER["DOCUMENT_ROOT"].$pathN, 0777);
            mkdir($_SERVER["DOCUMENT_ROOT"].$pathP, 0777);

            //$sql = "INSERT INTO grupos (nombre_Grupo) VALUES ('$grupo')";
            //$result = mysqli_query($conn, $sql);

            $sql = mysqli_prepare($conn, "INSERT INTO grupos (nombre_Grupo) VALUES (?)");
            mysqli_stmt_bind_param($sql, 's', $grupo);
            mysqli_stmt_execute($sql);
            mysqli_stmt_fetch($sql);
            mysqli_stmt_close($sql);
        }
        
        else {
            echo "No ha iniciado sesion";
        }
           
    }

    mysqli_close($conn);
?>