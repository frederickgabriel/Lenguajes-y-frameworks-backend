<?php
// Habilitar CORS si es necesario
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Incluir archivo de configuración
require_once 'config.php';

// Verificar que sea una petición POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Obtener datos del formulario
$data = json_decode(file_get_contents('php://input'), true);

// Validar que se recibieron los datos
if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'No se recibieron datos']);
    exit;
}

// Validar campos requeridos
$required_fields = ['firstName', 'lastName', 'email', 'queryType', 'message', 'consent'];
foreach ($required_fields as $field) {
    if (empty($data[$field]) && $field !== 'consent') {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "El campo $field es requerido"]);
        exit;
    }
}

// Validar email
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email inválido']);
    exit;
}

// Validar query type
if (!in_array($data['queryType'], ['general', 'support'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Tipo de consulta inválido']);
    exit;
}

// Validar consentimiento
if (!$data['consent']) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Debe dar su consentimiento']);
    exit;
}

try {
    // Obtener conexión a la base de datos
    $conn = getDBConnection();
    
    // Preparar consulta SQL
    $stmt = $conn->prepare("INSERT INTO contacts (first_name, last_name, email, query_type, message, consent) VALUES (?, ?, ?, ?, ?, ?)");
    
    // Bind de parámetros
    $consent = $data['consent'] ? 1 : 0;
    $stmt->bind_param(
        "sssssi",
        $data['firstName'],
        $data['lastName'],
        $data['email'],
        $data['queryType'],
        $data['message'],
        $consent
    );
    
    // Ejecutar consulta
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Formulario enviado exitosamente',
            'id' => $stmt->insert_id
        ]);
    } else {
        throw new Exception("Error al insertar datos: " . $stmt->error);
    }
    
    // Cerrar statement y conexión
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error del servidor: ' . $e->getMessage()
    ]);
}
?>