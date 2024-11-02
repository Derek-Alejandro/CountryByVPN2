<?php
// Habilitar CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'IpService.php'; 

// Crear instancia del servicio de IP
$ipService = new IpService();
header('Content-Type: application/json');

// Obtener la IP del cliente
$ip = $ipService->getIPSingle();

// Define tu API key aquí
$apiKey = "98a767b10da94cef92922f5a2b0271ad";

// Obtener la geolocalización
$location = get_geolocation($apiKey, $ip);
$decodedLocation = json_decode($location, true);

// Devolver la respuesta en formato JSON
echo json_encode($decodedLocation);

function get_geolocation($apiKey, $ip, $lang = "en", $fields = "*", $excludes = "") {
    $url = "https://api.ipgeolocation.io/ipgeo?apiKey=" . $apiKey . "&ip=" . $ip . "&lang=" . $lang . "&fields=" . $fields . "&excludes=" . $excludes;
    $cURL = curl_init();

    curl_setopt($cURL, CURLOPT_URL, $url);
    curl_setopt($cURL, CURLOPT_HTTPGET, true);
    curl_setopt($cURL, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($cURL, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Accept: application/json',
        'User-Agent: ' . $_SERVER['HTTP_USER_AGENT']
    ));

    return curl_exec($cURL);
}

