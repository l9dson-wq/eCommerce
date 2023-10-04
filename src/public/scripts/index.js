// Obtener todos los elementos con las clases "card_image_side_favorites" y "card_image_side_favorites_added"
var favoriteLinks = document.querySelectorAll('.card_image_side_favorites, .card_image_side_favorites_added');

// Función para mostrar el mensaje flotante
function showFloatingMessage(message) {
  var floatingMessage = document.getElementById('floatingMessage');
  floatingMessage.innerText = message;
  floatingMessage.classList.add('show-message');
  setTimeout(function() {
    floatingMessage.classList.remove('show-message');
  }, 3000);
}

// Función para manejar el evento de click en los enlaces de favoritos
function handleFavoriteClick(event) {
  event.preventDefault(); // Evitar la acción predeterminada del enlace

  // Obtener el ID del producto desde el atributo "data-productid"
  var productId = this.getAttribute('data-productid');

  // Verificar si el enlace tiene la clase "card_image_side_favorites" o "card_image_side_favorites_added"
  var isFavorite = this.classList.contains('card_image_side_favorites_added');

  // Realizar una solicitud AJAX al servidor
  var xhr = new XMLHttpRequest();
  var url = isFavorite ? '/delete_favorite' : '/add_favorite';
  var params = 'productId=' + productId;
  xhr.open('GET', url + '?' + params, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log('Favorite ' + (isFavorite ? 'deleted' : 'added'));
      // Puedes realizar cualquier acción adicional después de agregar o eliminar el producto de favoritos
      // Por ejemplo, cambiar la apariencia del enlace según sea necesario
      if (isFavorite) {
        favoriteLinks.forEach(function(link) {
          if (link.getAttribute('data-productid') === productId) {
            link.classList.remove('card_image_side_favorites_added');
            link.classList.add('card_image_side_favorites');
          }
        });
        showFloatingMessage('Producto eliminado de favoritos');
      } else {
        favoriteLinks.forEach(function(link) {
          if (link.getAttribute('data-productid') === productId) {
            link.classList.add('card_image_side_favorites_added');
          }
        });
        showFloatingMessage('Producto agregado a favoritos');
      }
    }
  };
  xhr.send();
}

// Asignar el evento de click a cada enlace de favoritos
favoriteLinks.forEach(function(link) {
  link.addEventListener('click', handleFavoriteClick);
});

function scrollContentToLeft(){
  const left = document.querySelector('.cover_product_elements');
  left.scrollBy(450, 0);
}

function scrollContentToRight(){
  const left = document.querySelector('.cover_product_elements');
  left.scrollBy(-450, 0);
}
