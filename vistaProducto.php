<?php
$archivo = 'menu.json'; // Nombre del archivo JSON

// Abre el archivo en modo lectura ('r')
$manejador = fopen($archivo, 'r');

if (isset($_GET['id'])==false) 
{
    die ("Error debe indicar el id del artículo");
}
$id=$_GET['id'];

if ($manejador) 
{
    // Lee el contenido del archivo JSON en una variable
    $json_data = fread($manejador, filesize($archivo));

    // Cierra el archivo
    fclose($manejador);

    // Decodifica la cadena JSON en un array de PHP
    $datos = json_decode($json_data, true);

    $cont=0;
    while ($cont<count($datos))
    {
        if ($datos[$cont]['id']==$id)
        {
            // Configurar la cabecera para indicar que la respuesta es JSON
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($datos[$cont]);
        }
        $cont++;
    }
    

} else {
    echo 'Error al abrir el archivo JSON.';
}

?>
