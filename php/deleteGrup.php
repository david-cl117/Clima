<?php

    session_start();
    //Variables para conectarse a la base de datos
    $server = "localhost";
    $database = "clima";
    $username = "root";
    $password = "password";

    //id del alumno
    $grupo = $_POST["nameG"];
    $pathN = $_POST["linkN"];
    $pathP = $_POST["linkP"];
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

            //$sql = "DELETE FROM grupos WHERE id_Grupo = '$idGrupo'";
            //$result = mysqli_query($conn, $sql);

            $sql = mysqli_prepare($conn, "DELETE FROM grupos WHERE id_Grupo = ?");
            mysqli_stmt_bind_param($sql, 's', $idGrupo);
            mysqli_stmt_execute($sql);
            mysqli_stmt_close($sql); 

            Delete($_SERVER["DOCUMENT_ROOT"].$pathN);
            Delete($_SERVER["DOCUMENT_ROOT"].$pathP);
        }
        
        else {
            echo "No ha iniciado sesion";
        }
           
    }

    function Delete($path)
    {
        if (is_dir($path) === true)
        {
            $files = array_diff(scandir($path), array('.', '..'));

            foreach ($files as $file)
            {
                Delete(realpath($path) . '/' . $file);
            }

            return rmdir($path);
        }

        else if (is_file($path) === true)
        {
            return unlink($path);
        }

        return false;
    }

    mysqli_close($conn);
?>