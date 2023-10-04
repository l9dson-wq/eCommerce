//AJAX CODE
// Agrega este código para evitar que los enlaces `<a>` realicen la acción predeterminada de recargar la página al hacer clic en ellos
document.addEventListener('DOMContentLoaded', function() {
    const reduceLinks = document.getElementsByClassName('reduce-cart');
    const addLinks = document.getElementsByClassName('add-to-cart');
  
    // Manejar el clic en los enlaces de reducir
    for (let i = 0; i < reduceLinks.length; i++) {
      reduceLinks[i].addEventListener('click', function(event) {
        event.preventDefault(); // Evitar la acción predeterminada de recargar la página
  
        // Realizar una solicitud AJAX al controlador reduce_cart
        const cartId = this.getAttribute('href').split('/').pop(); // Obtener el ID del carrito desde el atributo href
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/reduce_cart/${cartId}`, true);
        xhr.onload = function() {
          if (xhr.status === 200) {
            // La solicitud se completó correctamente, puedes actualizar la página o realizar otras acciones necesarias
            location.reload(); // Recargar la página para reflejar los cambios en el carrito
          }
        };
        xhr.send();
      });
    }
  
    // Manejar el clic en los enlaces de agregar
    for (let i = 0; i < addLinks.length; i++) {
      addLinks[i].addEventListener('click', function(event) {
        event.preventDefault(); // Evitar la acción predeterminada de recargar la página
    
        // Obtener el ID del producto desde el atributo data-product-id
        const productId = this.getAttribute('data-product-id');
    
        // Realizar una solicitud AJAX al controlador add_to_cart
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/add_to_cart', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
          if (xhr.status === 200) {
            // La solicitud se completó correctamente, puedes actualizar la página o realizar otras acciones necesarias
            location.reload(); // Recargar la página para reflejar los cambios en el carrito
          }
        };
        xhr.send(`product_id=${productId}`);
      });
    }
});

const confirm_order_button = document.getElementById('confirm_cart_order');

confirm_order_button.addEventListener('click', async () => {
  const res = await fetch('/payment', {
    method: "POST",
  });
  const data = await res.json();
  // console.log(data);
  window.location.href = data.url;
});