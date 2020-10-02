<?php

    session_start();
    //Variables para conectarse a la base de datos
    $server = "localhost";
    $database = "clima";
    $username = "root";
    $password = "password";

    $pathP = $_POST["linkP"];
    $idPlan = $_POST["id_plan"];


    //Conectar
    $conn = mysqli_connect($server, $username, $password, $database);

    //Revisar conexion
    if($conn->connect_error){
        die("Connection failed: ". $conn->connect_error);
    }

    //echo "Se conecto a la base de datos correctamente!";
    else {

        if (isset($_SESSION['id'])){

            $sql = "DELETE FROM planes WHERE id_Plan = '$idPlan'";
            $result = mysqli_query($conn, $sql);
            unlink($_SERVER["DOCUMENT_ROOT"].$pathP);
        }
        
        else {
            echo "No ha iniciado sesion";
        }
           
    }

    mysqli_close($conn);
?>