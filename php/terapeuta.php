<?php

    session_start();

    //Variables para conectarse a la base de datos
    $server = "localhost";
    $database = "clima";
    $username = "root";
    $password = "password";


    $userT = $_POST["user"];
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
            $sql = "SELECT nombre, ap_Paterno, ap_Materno, nombre_Grupo FROM terapeutas LEFT JOIN grupos USING(id_Grupo)  WHERE usuarioT = '$userT' AND id_Grupo = '$idGrupo'";
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
        
        else {
            echo "No ha iniciado sesion";
        }
           
    }

    mysqli_close($conn);
?>