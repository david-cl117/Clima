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
    $pathNNuevo = $_POST["notaNuevo"];
    $pathPNuevo = $_POST["planNuevo"];
    $idGrupo = $_POST["idG"];


    //Conectar
    $conn = mysqli_connect($server, $username, $password, $database);

    //Revisar conexion
    if($conn->connect_error){
        die("Connection failed: ". $conn->connect_error);
    }

    //echo "Se conecto a la base de datos correctamente!";
    else {

        if (isset($_SESSION['id'])){

            rename($_SERVER["DOCUMENT_ROOT"].$pathN, $_SERVER["DOCUMENT_ROOT"].$pathNNuevo);
            rename($_SERVER["DOCUMENT_ROOT"].$pathP, $_SERVER["DOCUMENT_ROOT"].$pathPNuevo);
            //$sql = "UPDATE grupos SET nombre_Grupo = '$grupo' WHERE id_Grupo = '$idGrupo'";
            //$result = mysqli_query($conn, $sql);

            $sql = mysqli_prepare($conn, "UPDATE grupos SET nombre_Grupo = ? WHERE id_Grupo = ?");
            mysqli_stmt_bind_param($sql, 'ss', $grupo, $idGrupo);
            mysqli_stmt_execute($sql);
        }
        
        else {
            echo "No ha iniciado sesion";
        }
           
    }

    mysqli_close($conn);
?>