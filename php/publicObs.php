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
            //$sql = "INSERT INTO observaciones (id_Alumno, usuarioT, observacion) VALUES ('$idAlumno', '$usuarioT', '$texto')";
            //$result = mysqli_query($conn, $sql);

            //Para evitar SQL injection - Query parametrizado
            $sql = mysqli_prepare($conn, "INSERT INTO observaciones (id_Alumno, usuarioT, observacion) VALUES (?, ?, ?)");
            mysqli_stmt_bind_param($sql, 'sss', $idAlumno, $usuarioT, $texto);
            mysqli_stmt_bind_result($sql, $result);
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