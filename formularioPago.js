/* Función que maneja el proceso de pago, activando y redireccionando 
   a la página de la pasarela */

function pagar() {
    // Se obtiene el carrito desde localStorage
    const carritoData = localStorage.getItem('carrito');

    // Se muestra una alerta en caso de que el carrito este vacío
    if (!carritoData) {
        alert('Carrito de compras vacío. Agregue productos al carrito antes de pagar.');
        return;
    }

    // Se envia la petición de pago al endpoint correspondiente
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'pagar.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(carritoData);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            localStorage.clear(); // El carrito se hace vacío
            // Redirecciona a la página de pago obtenida del endpoint
            window.location.href = response.success_url;
        } else {
            console.error('Error en la solicitud: ' + xhr.status);
        }
    };
}
