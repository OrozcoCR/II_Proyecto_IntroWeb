<?php
// Endpoint que maneja la pasarela de pago, generando la url correspondiente
require __DIR__ . "/vendor/autoload.php";

$stripe_secret_key = "sk_test_51O08SuDMviWOtvqdDrhXDTXawNOJuFu8xxtmMfyag8yDMe4Wdsaxue91HSXnXPPIaTOqD0s6AOcoqPxZxcaIBJu900ZAbR0ngG";
\Stripe\Stripe::setApiKey($stripe_secret_key);

$jsonData = file_get_contents('php://input');

if (!$jsonData) {
    http_response_code(400); // Bad Request
    die('Datos incorrectos o faltantes.');
}

/* Se obtienen los productos del carrito y se convierten al formato 
aceptado por la pasarela de pago */
$cartContent = json_decode($jsonData, true);
$line_items = [];
foreach ($cartContent as $product) {
    $line_items[] = [
        'quantity' => $product['cantidad'], 
        'price_data' => [
            'currency' => 'usd',
            'unit_amount' => $product['price'] * 100, 
            'product_data' => [
                'name' => $product['name'],
                'description' => $product['description'],
                'images' => [$product['thumbnail']],
            ],
        ],
    ];
}


//  Se crea la sesión de pago con los line_items (productos formateados)
$checkout_session = \Stripe\Checkout\Session::create([
    "mode" => "payment",
    "success_url" => "http://localhost/II_Proyecto_IntroWeb/pagoExitoso.html", 
    "cancel_url" => "http://localhost/II_Proyecto_IntroWeb/index.html",
    "locale" => "auto",
    "line_items" => $line_items
]);

// Se envia la url de la página de pago resultante
$response = [
    'success_url' => $checkout_session->url,
];

echo json_encode($response);
?>