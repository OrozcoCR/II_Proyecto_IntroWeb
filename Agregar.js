var product;
var carrito = obtenerCarrito() || [];


function displayProducto() {
    // Get the product data from the URL parameter (assuming it's passed as a JSON string)
    const urlParams = new URLSearchParams(window.location.search);
    const productDataJSON = urlParams.get('id');

    // Crear una instancia de XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // Configurar la solicitud AJAX
    xhr.open('GET', 'vistaProducto.php?id=' + productDataJSON, true);

    // Configurar el manejo de la respuesta
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Parsear la respuesta JSON
            product = JSON.parse(xhr.responseText);
            // Mostrar los artículos en la página
            const productDetailContainer = document.getElementById('product-detail-container');

            const detailContainer = document.createElement('div');
            detailContainer.className = 'product-details';

            const productName = document.createElement('h2');
            productName.textContent = product.name;

            const productDescription = document.createElement('p');
            productDescription.textContent = product.description;

            const productPrice = document.createElement('p');
            productPrice.className = 'price';
            productPrice.textContent = `Precio: $${product.price}`;

            // Append elements to the container
            productDetailContainer.appendChild(productName);
            detailContainer.appendChild(productDescription);
            detailContainer.appendChild(productPrice);
            productDetailContainer.appendChild(detailContainer);
        } else {
            console.error('Error en la solicitud: ' + xhr.status);
        }
    };
    // Enviar la solicitud AJAX
    xhr.send();
}


function agregarAlCarrito() {
    if (product) {
        const productoExistente = carrito.find(item => item.id === product.id);

        if (productoExistente) {
            // Si el producto ya está en el carrito, aumenta la cantidad
            productoExistente.cantidad += 1;
        } else {
            // Si no existe, agrega el producto al carrito con cantidad 1
            carrito.push( product );
        }

        // Actualiza el carrito en Local Storage
        guardarCarrito(carrito);
    }
}


// Función para obtener el carrito desde Local Storage
function obtenerCarrito() {
    const carritoJSON = localStorage.getItem('carrito');
    return carritoJSON ? JSON.parse(carritoJSON) : null;

}

// Función para guardar el carrito en Local Storage
function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log(carrito);
}

