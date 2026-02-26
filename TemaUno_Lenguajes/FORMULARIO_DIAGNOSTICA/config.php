<?php
// Configuración de la base de datos
define('DB_HOST', 'sql210.infinityfree.com');
define('DB_USER', 'if0_41106202'); // Cambia esto por tu usuario de MySQL
define('DB_PASS', '4TP5xkISDt'); // Cambia esto por tu contraseña de MySQL
define('DB_NAME', 'if0_41106202_XXX');

// Crear conexión
function getDBConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    // Verificar conexión
    if ($conn->connect_error) {
        die("Error de conexión: " . $conn->connect_error);
    }
    
    // Establecer charset UTF-8
    $conn->set_charset("utf8mb4");
    
    return $conn;
}
?>