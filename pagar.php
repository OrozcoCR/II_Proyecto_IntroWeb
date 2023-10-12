<?php

require __DIR__ . "/vendor/autoload.php";

$stripe_secret_key = "sk_test_51O08SuDMviWOtvqdDrhXDTXawNOJuFu8xxtmMfyag8yDMe4Wdsaxue91HSXnXPPIaTOqD0s6AOcoqPxZxcaIBJu900ZAbR0ngG";

\Stripe\Stripe::setApiKey($stripe_secret_key);

$checkout_session = \Stripe\Checkout\Session::create([
    "mode" => "payment",
    "success_url" => "http://localhost/II_Proyecto_IntroWeb/pagoExitoso.html", 
    "cancel_url" => "http://localhost/II_Proyecto_IntroWeb/index.html",
    "locale" => "auto",
    "line_items" => [
        [
            "quantity" => 1,
            "price_data" => [
                "currency" => "usd",
                "unit_amount" => 2000,
                "product_data" => [
                    "name" => "T-shirt"
                ]
            ]
        ],
        [
            "quantity" => 2,
            "price_data" => [
                "currency" => "usd",
                "unit_amount" => 700,
                "product_data" => [
                    "name" => "Hat"
                ]
            ]
        ]        
    ]
]);

http_response_code(303);
header("Location: " . $checkout_session->url);