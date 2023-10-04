function showPreview(event, previewId) {
  const fileInput = event.target;
  const preview = document.getElementById(previewId);
  const file = fileInput.files[0]; // Obtener el primer archivo seleccionado

  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      preview.src = reader.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}