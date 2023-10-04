const multer = require("multer");

// Configurar multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); // Carpeta donde se guardará la imagen
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Nombre de archivo único
  },
});

// Configurar multer con diferentes nombres para cada campo de archivo
const uploadMultipleWithDifferentNames = multer({ storage: storage }).fields([
  { name: "image1" },
  { name: "image2" },
  { name: "image3" },
  { name: "image4" },
]);

module.exports = uploadMultipleWithDifferentNames;