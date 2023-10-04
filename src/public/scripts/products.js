// JavaScript (products.js)
document.addEventListener("DOMContentLoaded", function () {
  const deleteButtons = document.querySelectorAll(
    ".product_card_delete_button"
  );
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
  const confirmDeleteModal = document.getElementById("confirmDeleteModal");
  const editLinks = document.querySelectorAll(".edit_card_link");

  deleteButtons.forEach(function (deleteButton) {
    deleteButton.addEventListener("click", function (event) {
      event.preventDefault();
      const productId = this.getAttribute("data-product-id");
      confirmDeleteModal.setAttribute("data-product-id", productId);
      // confirmDeleteModal.style.display = "block";

      Swal.fire({
        title: 'Cuidado',
        icon: 'warning',
        text: 'Esta seguro de que desea eliminar este producto?',
        showCancelButton: true,
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.isConfirmed) {
          deleteProductEvent();
        } else {
          Swal.fire('No se realizo ningun cambio', '', 'info');
        }
      });

    });
  });

  function deleteProductEvent() {
    const productId = confirmDeleteModal.getAttribute("data-product-id");

    confirmDeleteModal.style.display = "none";

    // Realizar la acción de eliminación del producto
    const productCard = document.querySelector(
      `.product_card_delete_button[data-product-id="${productId}"]`
    ).closest(".product_child_card");
    productCard.classList.add("slide-left");

    // Esperar a que termine la animación antes de eliminar el producto
    Swal.fire({
      title: 'Hecho',
      icon: 'success',
      text: 'Producto eliminado exitosamente!',
      confirmButtonText: 'ok',
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(function () {
          window.location.href = "/delete_product?productId=" + productId;
        }, 500); // Ajusta el tiempo de espera según la duración de la animación CSS
      }
    });
  }

  cancelDeleteBtn.addEventListener("click", function () {
    confirmDeleteModal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === confirmDeleteModal) {
      confirmDeleteModal.style.display = "none";
    }
  });

  // Agregar evento de clic para redireccionar a la página de edición del producto
  editLinks.forEach(function (editLink) {
    editLink.addEventListener("click", function (event) {
      event.preventDefault();
      const productId = this.getAttribute("href").split("=")[1];
      window.location.href = "/editProduct?productId=" + productId;
    });
  });

  if (window.location.search.includes("productSuccessfullyAdded=true")) {
    productAddedSucccessfully();
  }
  
  function productAddedSucccessfully() {
    Swal.fire({
      title: 'Hecho!',
      icon: 'success',
      text: 'Producto Agregado exitosomente!',
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(function () {
          window.location.href = "/products";
        }, 0);
      }
    });
  }

});