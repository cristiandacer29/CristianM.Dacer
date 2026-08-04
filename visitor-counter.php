<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    // Send a 405 Method Not Allowed header
    http_response_code(405);
    
    // Optional: Tell the client which method IS allowed
    header('Allow: POST');
    
    // Terminate script execution immediately
    die('Method Not Allowed. This endpoint only accepts POST requests.');
}

//validate user input for name
$name_pattern = "/^[a-zA-Z\s\-\'\p{L}]+$/u";


//for single submission verification
if (!isset($_POST['submit_token']) || !isset($_SESSION['submit_token'])) {
    die("Error: Form has already been submitted or session expired.");
}

if (!hash_equals($_SESSION['submit_token'], $_POST['submit_token'])) {
    die("Error: Invalid submission token.");
}
unset($_SESSION['submit_token']);
//----------------------------------------------------

isset($_POST['name']) ? $name = $_POST['name'] : $name = "Guest";
//convert the name to a safe string to prevent XSS attacks
$cleanName = trim(filter_var($name, FILTER_SANITIZE_SPECIAL_CHARS));
if (empty($cleanName)){
    die('no Name provided');
}
if (strlen($cleanName) < 2 || strlen($cleanName) > 50) {
    http_response_code(400);
    die("Name must be between 2 and 50 characters long.");
}
if (!preg_match($name_pattern, $cleanName)) {
    http_response_code(400);
    die("Invalid name format. Only letters, spaces, hyphens, and apostrophes are allowed.");
}
//----------------------------------------------------

//save the name in a cookie for 30 minutes
setcookie('visitor_name987654321', $cleanName, [
    'expires' => time() + 1800,
    'path' => '/',
    'secure' => true,      // Only sent over HTTPS
    'httponly' => true,    // Prevent JavaScript access!
    'samesite' => 'Strict' // Protects against CSRF attacks
]);
//----------------------------------------------------

//save name in json file
$jsonFile = 'json/counter-record.json';

// Read existing data
if (file_exists($jsonFile)) {
    $jsonData = file_get_contents($jsonFile);
    $visitors = json_decode($jsonData, true);
} else {
    $visitors = [];
}

// Update visitor count
$visitors[] = [
    'name' => $cleanName,
    'timestamp' => time()
];

// Save updated data
file_put_contents($jsonFile, json_encode($visitors));

header('Location: index.html');
//----------------------------------------------------
