<?php

    session_start();
    //Variables para conectarse a la base de datos
    $server = "localhost";
    $database = "clima";
    $username = "root";
    $password = "password";

   // $filename = $_POST["nombre"];
    $destino = $_POST["dest"];
    $idAlumno = $_POST["id"];
    $filename = $_POST["filename"];
    $link = $destino.$filename;

    //Conectar
    $conn = mysqli_connect($server, $username, $password, $database);

    
    //Revisar conexion
    if($conn->connect_error){
        die("Connection failed: ". $conn->connect_error);
    }

    //echo "Se conecto a la base de datos correctamente!";
    else {

        if (isset($_SESSION['id'])){

           if (isset($_FILES['userfileP'])){

                $targetfolder = $_SERVER["DOCUMENT_ROOT"] . $destino . basename($_FILES["userfileP"]["name"]);
                //formato del archivo.
                $type = $_FILES["userfileP"]["type"];

                //validar que el archivo es pdf
                if($type == "application/pdf" || $type == "application/msword" || $type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
                    //mover archivo a folder destino
                    if (move_uploaded_file($_FILES["userfileP"]["tmp_name"], $targetfolder)){
                        
                        $sql = "INSERT INTO planes (nombre_Plan, link, id_alumno) VALUES ('$filename', '$destino', '$idAlumno')";
                        $result = mysqli_query($conn, $sql);
                        echo "succes";
                    }

                    else{
                        echo "uploadError";
                    }
                }

                else{
                    echo "formatError";
                }
              
           }

           else{
               echo "NoFile";
           }

           
        }
        
        else {
            echo "No ha iniciado sesion";
        }
           
    }

    mysqli_close($conn);
?>