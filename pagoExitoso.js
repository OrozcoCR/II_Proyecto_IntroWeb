// Función para actualizar el contador y redirigir a la página principal
function actualizarContador() {
  const countdownElement = document.getElementById("countdown");
  let seconds = parseInt(countdownElement.innerText);
  if (seconds === 1) {
    // Cuando el contador llega a 1 segundo, redirige a la página de inicio
    countdownElement.innerText = "0";
    window.location.href = "index.html";
  } else {
    seconds -= 1;
    countdownElement.innerText = seconds;
    setTimeout(actualizarContador, 1000); // Llama a esta función nuevamente después de 1 segundo
  }
}

// Inicia el contador cuando se carga la página
setTimeout(actualizarContador, 1000);
