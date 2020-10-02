<?php

    session_start();
    //Variables para conectarse a la base de datos
    $server = "localhost";
    $database = "clima";
    $username = "root";
    $password = "password";

    //id de la nota
    $idNota = $_POST["id_nota"];

    //Conectar
    $conn = mysqli_connect($server, $username, $password, $database);

    //Revisar conexion
    if($conn->connect_error){
        die("Connection failed: ". $conn->connect_error);
    }

    //echo "Se conecto a la base de datos correctamente!";
    else {

        if (isset($_SESSION['id'])){
            $sql = "SELECT link, nombre_Nota FROM notas WHERE id_Nota = '$idNota'";
            $result = mysqli_query($conn, $sql);

            if ($result->num_rows > 0){
                while ($row = $result -> fetch_row()) {
                        echo json_encode($row);
                    }
                    $result -> free_result();
            }

            else{
                echo "";
            }  
        }
        
        else{
            echo "No ha iniciado sesion";
        }
           
    }

    mysqli_close($conn);
?>