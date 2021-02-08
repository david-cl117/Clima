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

    //Conectar
    $conn = mysqli_connect($server, $username, $password, $database);

    //Revisar conexion
    if($conn->connect_error){
        die("Connection failed: ". $conn->connect_error);
    }

    //echo "Se conecto a la base de datos correctamente!";
    else {

        if (isset($_SESSION['id'])){
            //$sql = "SELECT texto, transmisor, fecha FROM chats WHERE usuarioP = '$usuarioP' AND usuarioT = '$usuarioT' AND usuarioA = '$usuarioA' ORDER BY fecha ASC";
            //$result = mysqli_query($conn, $sql);

            $sql = mysqli_prepare($conn, "SELECT texto, transmisor, fecha FROM chats WHERE usuarioP = ? AND usuarioT = ? AND usuarioA = ? ORDER BY fecha ASC");
            mysqli_stmt_bind_param($sql, 'sss', $usuarioP, $usuarioT, $usuarioA);
            mysqli_stmt_execute($sql);
            mysqli_stmt_bind_result($sql, $texto, $tr, $date);
            mysqli_stmt_store_result($sql);
            $num = mysqli_stmt_num_rows($sql); 

            if ($num > 0){
                while (mysqli_stmt_fetch($sql)) {
                    $row = array($texto, $tr, $date);
                    echo json_encode($row);
                }
                $sql -> free_result();
                mysqli_stmt_close($sql);      
            }

            else{
                echo "";
            }     
        }
        
        else {
            echo "No ha iniciado sesion";
        }
           
    }

    mysqli_close($conn);
?>