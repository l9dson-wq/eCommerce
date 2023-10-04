if (window.location.search.includes("qna=true")) {
    no_stock_available();
  }


function no_stock_available() {
  // show message
    Swal.fire(
        'No disponible',
        'El articulo no tiene mas productos de este disponibles',
        'alert'
    );

}

document.addEventListener('DOMContentLoaded', function() {
    const addToCartButton = document.getElementById('add-to-cart-button');
    const form = document.getElementById('form_add_to_cart_button');
  
    addToCartButton.addEventListener('click', function(event) {
      event.preventDefault(); // Evitar la acción predeterminada de enviar el formulario
  
      const productId = form.querySelector('input[name="product_id"]').value;
  
      // Realizar una solicitud AJAX al controlador add_to_cart
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/add_to_cart', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onload = function() {
        if (xhr.status === 200) {
          // La solicitud se completó correctamente, puedes actualizar la página o realizar otras acciones necesarias

          Swal.fire({
            title: 'Tu articulo ha sido agregado a tu carro de compras',
            confirmButtonText: 'Entendido!',
            icon: 'success',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              location.reload(); // Recargar la página para reflejar los cambios en el carrito
            }
          });

          
        } else {
          Swal.fire(
            'No disponible',
            'No hay suficiente stock disponible para este producto.',
            'alert'
          );
        }
      };
      xhr.send(`product_id=${productId}`);
    });
  });
  