document.addEventListener('DOMContentLoaded', function() {

    var modal = document.getElementById('category_modal_id');
    var addButton = document.getElementById('category_top_add_button');
    var cancelButton = document.getElementById('category_cancel_button');
    
    addButton.onclick = function() {
      modal.style.display = 'block';
    }
  
    cancelButton.onclick = function() {
      console.log('El boton funciona');
      modal.style.display = 'none';
    }
  
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    }
  
    
    if (window.location.search.includes("categoryAdded=true")) {
      Swal.fire({
        title: 'Agregada!',
        icon: 'success',
        text: 'Marca agregada exitosamente!',
        confirmButtonText: 'ok',
      }).then((result) => {
        if (result.isConfirmed) {
          setTimeout(function () {
            window.location.href = "/brands";
          }, 0); // Ajusta el tiempo de espera según la duración de la animación CSS
        }
      });
    }
  
  });