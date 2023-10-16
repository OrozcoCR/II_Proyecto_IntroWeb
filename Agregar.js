var product;
var carrito = obtenerCarrito() || [];

//Manejo del carrito de compras
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

