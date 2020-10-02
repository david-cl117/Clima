<?php
    session_start();

    //unset al session variables.
    $_SESSION = array();

    session_destroy();
    session_write_close();
    
    header('Location: /Clima/inicio.html');
    exit(0);
?>