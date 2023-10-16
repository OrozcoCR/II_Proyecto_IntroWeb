<?php
//Endpoint que maneja la búsqueda de productos, obteniendolos del archivo JSON

$archivo = 'menu.json'; // Nombre del archivo JSON

// Abre el archivo en modo lectura ('r')
$manejador = fopen($archivo, 'r');

if (isset($_GET['search'])==false) 
{
    die ("Error debe indicar el id del artículo");
}
$searchTerm = $_GET['search'];

if ($manejador) 
{
    // Lee el contenido del archivo JSON en una variable
    $json_data = fread($manejador, filesize($archivo));

    // Cierra el archivo
    fclose($manejador);

    // Decodifica la cadena JSON en un array de PHP
    $datos = json_decode($json_data, true);

    // Realizar la búsqueda en los datos del menú
    $results = [];

    foreach ($datos as $item) {
        // Comprobar si el nombre del artículo contiene el término de búsqueda (insensible a mayúsculas y minúsculas)
        if (stripos($item['name'], $searchTerm) !== false) {
            $results[] = $item;
        }
    }
    
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($results);

} else {
    echo 'Error al abrir el archivo JSON.';
}

?>