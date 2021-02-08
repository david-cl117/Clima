<?php

    session_start();
    //Variables para conectarse a la base de datos
    $server = "localhost";
    $database = "clima";
    $username = "root";
    $password = "password";

    //id del alumno
    $idAlumno = $_POST["id"];
    $idGrupoNew = $_POST["idG"];
    $PathN = $_POST["pathN"];
    $PathP = $_POST["pathP"];
    $newPathN = $_POST["newNotes"];
    $newPathP = $_POST["newPlans"];
    $linkN = $_POST["linkN"];
    $linkP = $_POST["linkP"];

    //Conectar
    $conn = mysqli_connect($server, $username, $password, $database);

    //Revisar conexion
    if($conn->connect_error){
        die("Connection failed: ". $conn->connect_error);
    }

    //echo "Se conecto a la base de datos correctamente!";
    else {

        if (isset($_SESSION['id'])){
            //Mover carpetas de los alumnos
            rename($_SERVER["DOCUMENT_ROOT"].$PathN, $_SERVER["DOCUMENT_ROOT"].$newPathN);
            rename($_SERVER["DOCUMENT_ROOT"].$PathP, $_SERVER["DOCUMENT_ROOT"].$newPathP);

            //Cambiamos id del alumno
            $sql = "UPDATE alumnos SET id_Grupo = '$idGrupoNew' WHERE id_Alumno = '$idAlumno' ";
            $result = mysqli_query($conn, $sql);
            $result -> free_result();

            //Cambiamos el link de notas.
            $sql = "UPDATE notas SET link = '$linkN' WHERE id_Alumno = '$idAlumno' ";
            $result = mysqli_query($conn, $sql);
            $result -> free_result();

            //Cambiamos el link de planes.
            $sql = "UPDATE planes SET link = '$linkP' WHERE id_Alumno = '$idAlumno' ";
            $result = mysqli_query($conn, $sql);
            $result -> free_result();
        }
        
        else {
            echo "No ha iniciado sesion";
        }
           
    }

    mysqli_close($conn);
?>