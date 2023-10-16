var productos;

/* Función que obtiene la información de los productos desde el backend,
   genera y muestra las cards dinamicamente */
function cargarProductos() {
  // Se actualiza la información del carrito al cargar la página
  const carrito = obtenerCarrito();
  counterCarrito();
  console.log(carrito);

  // Crear una instancia de XMLHttpRequest
  var xhr = new XMLHttpRequest();
  console.log(xhr.readyState);

  // Configurar la solicitud AJAX
  xhr.open("GET", "listarArticulos.php?id=1", true);
  console.log(xhr.readyState);

  xhr.onreadystatechange = () => {
    console.log(xhr.readyState);
  };

  // Configurar el manejo de la respuesta
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Parsear la respuesta JSON
      productos = JSON.parse(xhr.responseText);
      // Mostrar los artículos en la página
      let contenedorProductos = document.getElementById("card-container");
      productos.forEach(function (producto) {
        var card = document.createElement("div");
        card.className = "card";

        var imagenProd = document.createElement("img");
        imagenProd.className = "product-image";
        imagenProd.src = producto.thumbnail;

        var productName = document.createElement("h2");
        productName.textContent = producto.name;

        var productPrice = document.createElement("p");
        productPrice.textContent = "Precio: $" + producto.price;

        card.appendChild(imagenProd);
        card.appendChild(productName);
        card.appendChild(productPrice);

        card.onclick = () => {
          // Se añade la función que maneja el click a cada card
          console.log(producto);
          const productDataJSON = JSON.stringify(producto.id);
          window.location.href = `vistaProducto.html?id=${encodeURIComponent(
            productDataJSON
          )}`;
        };
        contenedorProductos.appendChild(card);
      });
    } else {
      console.error("Error en la solicitud: " + xhr.status);
    }
  };
  // Enviar la solicitud AJAX
  xhr.send();
}

/* Función que maneja la búqueda de productos, genera y muestra las cards 
   dinamicamente */
function buscarProductos() {
  const searchItem = document.getElementById("search").value;

  // Crear una instancia de XMLHttpRequest
  var xhr = new XMLHttpRequest();

  console.log(xhr.readyState);
  // Configurar la solicitud AJAX
  xhr.open("GET", "busqueda.php?search=" + searchItem, true);
  console.log(xhr.readyState);

  xhr.onreadystatechange = () => {
    console.log(xhr.readyState);
  };

  // Configurar el manejo de la respuesta
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Parsear la respuesta JSON
      productos = JSON.parse(xhr.responseText);
      // Mostrar los artículos en la página
      let contenedorProductos = document.getElementById("card-container");
      contenedorProductos.innerHTML = "";
      productos.forEach(function (producto) {
        var card = document.createElement("div");
        card.className = "card";

        var imagenProd = document.createElement("img");
        imagenProd.className = "product-image";
        imagenProd.src = producto.thumbnail;

        var productName = document.createElement("h2");
        productName.textContent = producto.name;

        var productPrice = document.createElement("p");
        productPrice.textContent = "Precio: $" + producto.price;

        card.appendChild(imagenProd);
        card.appendChild(productName);
        card.appendChild(productPrice);

        card.onclick = () => {
          console.log(producto);
          const productDataJSON = JSON.stringify(producto.id);
          window.location.href = `vistaProducto.html?id=${encodeURIComponent(
            productDataJSON
          )}`;
        };
        contenedorProductos.appendChild(card);
      });
    } else {
      console.error("Error en la solicitud: " + xhr.status);
    }
  };
  // Enviar la solicitud AJAX
  xhr.send();
}

function counterCarrito() {
  // Obtener el carrito desde localStorage
  const cartData = localStorage.getItem("carrito");
  // Parsear a formato JSON
  const cart = JSON.parse(cartData);
  
  if (cart != null) {
    // Calcular la cantidad total de productos en el carrito
    const totalItems = cart.reduce((total, item) => total + item.cantidad, 0);
    // Actualizar el contador en el icono del carrito
    let cartCount = document.getElementById("cart-count");
    cartCount.textContent = totalItems;
  }
}
