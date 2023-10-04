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

const uploadSingle = multer({ storage: storage }).single("image");

module.exports = uploadSingle;