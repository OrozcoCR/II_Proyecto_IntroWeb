var product;

function displayProducto() {
  // Obtener el id del producto del parametro la url
  const urlParams = new URLSearchParams(window.location.search);
  const productDataJSON = urlParams.get("id");

  // Crear una instancia de XMLHttpRequest
  var xhr = new XMLHttpRequest();

  console.log(xhr.readyState);
  // Configurar la solicitud AJAX
  xhr.open("GET", "vistaProducto.php?id=" + productDataJSON, true);
  console.log(xhr.readyState);

  xhr.onreadystatechange = () => {
    console.log(xhr.readyState);
  };

  // Configurar el manejo de la respuesta
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Parsear la respuesta JSON
      product = JSON.parse(xhr.responseText);
      // Añadir los detalles del producto a la página
      const productDetailContainer = document.getElementById(
        "product-detail-container"
      );

      const detailContainer = document.createElement("div");
      detailContainer.className = "product-details";

      const productName = document.createElement("h2");
      productName.textContent = product.name;

      const productDescription = document.createElement("p");
      productDescription.textContent = product.description;

      const productPrice = document.createElement("p");
      productPrice.className = "price";
      productPrice.textContent = `Precio: $${product.price}`;

      const addToCart = document.createElement("button");
      addToCart.className = "add-to-cart-button";
      addToCart.innerHTML = "Agregar al carrito";
      addToCart.onclick = function () {
        agregarAlCarrito(); // Llama a la función que maneja la acción de agregar al carrito
      };

      const productImage = document.createElement("img");
      productImage.className = "product-image";
      productImage.src = product.thumbnail;

      // Agrega los elementos al container
      productDetailContainer.appendChild(productImage);
      detailContainer.appendChild(productName);
      detailContainer.appendChild(productPrice);
      detailContainer.appendChild(productDescription);
      detailContainer.appendChild(addToCart);
      productDetailContainer.appendChild(detailContainer);
    } else {
      console.error("Error en la solicitud: " + xhr.status);
    }
  };
  // Enviar la solicitud AJAX
  xhr.send();
}
