<?php

    session_start();
    //Variables para conectarse a la base de datos
    $server = "localhost";
    $database = "clima";
    $username = "root";
    $password = "password";

    //id del alumno
    $idAlumno = $_POST["id"];
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

            //Cambiamos el link de planes.
            //$sql = "UPDATE planes SET link = '$linkP' WHERE id_Alumno = '$idAlumno' ";
            //$result = mysqli_query($conn, $sql);
            //$result -> free_result();

            $sql = mysqli_prepare($conn, "UPDATE planes SET link = ? WHERE id_Alumno = ?");
            mysqli_stmt_bind_param($sql, 'ss', $linkP, $idAlumno);
            mysqli_stmt_execute($sql);
            mysqli_stmt_close($sql); 
        }
        
        else {
            echo "No ha iniciado sesion";
        }
           
    }

    mysqli_close($conn);
?>