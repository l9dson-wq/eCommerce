const { user, product, imagesCollection } = require("../../models/modelsInitialization");
const fs = require("fs");
const session = require("express-session");
const generarCodigoAleatorio = require("../helpers/product_code_generator");

const inserProduct = async (req, res) => {

  const userId = req.session.user._id.toString();

  const files = req.files;
  const { name, price, rate, quantity, category, companyName, description } = req.body;

  //transformar a price de texto a numerico valido
  let newPrice = price;
  newPrice = price.replace(/[^0-9.,]/g, '');
  newPrice = price.replace(/,/g, '.'); //convertir de comas a solo puntos

  // Crear un objeto auxiliar para asignar las rutas de archivo
  const imagePaths = {};

  // Recorrer el arreglo de archivos y asignar las rutas de archivo al objeto auxiliar
  files.forEach((file, index) => {
    const imagePathProperty = `imagePath${index + 1}`;
    const rutaArchivo = `uploads/` + file.originalname;

    fs.rename(file.path, "public/uploads/" + file.originalname, (err) => {
      if (err) throw err;
    });

    imagePaths[imagePathProperty] = rutaArchivo;
  });

  // Crear el objeto insertImagesCollection con las rutas de archivo
  const insertImagesCollection = new imagesCollection({
    imagePath1: imagePaths.imagePath1,
    imagePath2: imagePaths.imagePath2,
    imagePath3: imagePaths.imagePath3,
    imagePath4: imagePaths.imagePath4,
  });

  insertImagesCollection.save()
    .then(() => console.log('Images collection added successfully!'))
    .catch(error => console.log(error));

  const productInformation = new product({
    name,
    userId,
    price: newPrice,
    rate,
    category,
    quantity,
    companyName,
    description,
    code: generarCodigoAleatorio(),
    available: 'yes',
  });

  productInformation
    .save()
    .then(() => {
      //return res.redirect('/products?productSuccessfullyAdded=true');
      console.log('Product added successfully!');
      console.log(productInformation);
    })
    .catch((err) => console.log(err));

    const gettingNewProduct = await product.find({ _id: productInformation._id });
    const gettingNewImagesCollection = await imagesCollection.find({ _id: insertImagesCollection._id });
    
  // Agrega un retraso de 2 segundos antes de ejecutar las siguientes sentencias
    if(gettingNewProduct[0]._id != undefined){
      setTimeout(async () => {
        await product.findByIdAndUpdate(
          gettingNewProduct[0]._id,
          { imagePath: insertImagesCollection._id },
          { new: true },
        );
      
        await imagesCollection.findByIdAndUpdate(
          gettingNewImagesCollection[0]._id,
          { productId: gettingNewProduct[0]._id },
          { new: true },
        );
      }, 1000); // 2000 milisegundos (2 segundos)
    }

  return res.redirect('/products?productSuccessfullyAdded=true');
};

module.exports = inserProduct;
