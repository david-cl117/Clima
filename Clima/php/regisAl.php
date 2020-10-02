<?php

    session_start();
    //Variables para conectarse a la base de datos
    $server = "localhost";
    $database = "clima";
    $username = "root";
    $password = "password";

    //id del alumno
    $nombre = $_POST["name"];
    $apPaterno = $_POST["apPat"];
    $apMaterno = $_POST["apMat"];
    $birth = $_POST["fecha"];
    $idGrupo = $_POST["idG"];
    $PathN = $_POST["pathN"];
    $PathP = $_POST["pathP"];
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
            //Se cran las carpetas de planes y notas para el alumno
            mkdir($_SERVER["DOCUMENT_ROOT"].$PathN, 0777);
            mkdir($_SERVER["DOCUMENT_ROOT"].$PathP, 0777);

            $sql = "INSERT INTO alumnos (id_Alumno, nombre, ap_Paterno, ap_Materno, id_Grupo, nacimiento) VALUES ('$idAlumno', '$nombre', '$apPaterno', '$apMaterno', '$idGrupo', '$birth')";
            $result = mysqli_query($conn, $sql);
        }
        
        else {
            echo "No ha iniciado sesion";
        }
           
    }

    mysqli_close($conn);
?>