<?php

    session_start();
    //Variables para conectarse a la base de datos
    $server = "localhost";
    $database = "clima";
    $username = "root";
    $password = "password";

    //usuario 
    $User = $_POST["usr"];
    $nuevoPass = $_POST["pss"];
    $table = $_POST["table"];
    $tipoU = $_POST["type"];
    $pass = "password";

    //Conectar
    $conn = mysqli_connect($server, $username, $password, $database);

    //Revisar conexion
    if($conn->connect_error){
        die("Connection failed: ". $conn->connect_error);
    }

    //echo "Se conecto a la base de datos correctamente!";
    else {

        if (isset($_SESSION['id'])){
            //$sql = "UPDATE $table SET password = '$nuevoPass' WHERE $tipoU = '$User' ";
            //$result = mysqli_query($conn, $sql); 
            
            //Para evitar SQL injection - Query parametrizado
            $sql = mysqli_prepare($conn, "UPDATE $table SET password = ? WHERE $tipoU = ?");
            mysqli_stmt_bind_param($sql, 'ss', $nuevoPass, $User);
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