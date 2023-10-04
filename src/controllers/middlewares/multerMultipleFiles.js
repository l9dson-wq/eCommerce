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


const uploadMultiple = multer({ storage: storage }).array("images", 6);

module.exports = uploadMultiple;