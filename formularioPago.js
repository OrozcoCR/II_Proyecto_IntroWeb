// Client-Side (JavaScript)
function pagar() {
    const carritoData = localStorage.getItem('carrito');

    if (!carritoData) {
        alert('Carrito de compras vacío. Agregue productos al carrito antes de pagar.');
        return;
    }

    // Send a request to the server to initiate the payment
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'pagar.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(carritoData);

    xhr.onload = function () {
        if (xhr.status === 200) {
            // Redirect to the payment success URL received from the server
            const response = JSON.parse(xhr.responseText);
            localStorage.clear();
            window.location.href = response.success_url;
        } else {
            console.error('Error en la solicitud: ' + xhr.status);
        }
    };
}
