<?php

    session_start();
    //Variables para conectarse a la base de datos
    $server = "localhost";
    $database = "clima";
    $username = "root";
    $password = "password";

    //id del alumno
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
            //$sql = "SELECT id_Alumno, nombre, ap_Paterno, ap_Materno FROM alumnos WHERE id_Grupo = '$idGrupo' ORDER BY ap_Paterno";
            //$result = mysqli_query($conn, $sql);

            $sql = mysqli_prepare($conn, "SELECT id_Alumno, nombre, ap_Paterno, ap_Materno FROM alumnos WHERE id_Grupo = ? ORDER BY ap_Paterno");
            mysqli_stmt_bind_param($sql, 's', $idGrupo);
            mysqli_stmt_execute($sql);
            mysqli_stmt_bind_result($sql, $ida, $name, $app, $apm);
            mysqli_stmt_store_result($sql);
            $num = mysqli_stmt_num_rows($sql); 

            if ($num > 0){
                while (mysqli_stmt_fetch($sql)) {
                    $row = array($ida, $name, $app, $apm);
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