const session = require('express-session');
const { user, product, imagesCollection, category, viewCount, brand } = require('../../models/modelsInitialization');
const get_cart_quantity = require('../helpers/cart_quantity');

const renderSearch = async (req, res) => {

  let productGot = '';

  //OBTENER LOS FILTROS SOLICITADOS
  const categoryFiltered = req.query.categoryFiltered;
  console.log("🚀 ~ file: renderSearch.js:10 ~ renderSearch ~ categoryFiltered:", categoryFiltered);

  const priceFiltered = req.query.priceFiltered;
  console.log("🚀 ~ file: renderSearch.js:12 ~ renderSearch ~ priceFiltered:", priceFiltered);
  
  //OBTENER EL VALOR BUSCADO POR EL USUARIO
  const searchedValue = req.query.dataSearched;
  console.log("🚀 ~ file: renderSearch.js:16 ~ renderSearch ~ searchedValue:", searchedValue);

  // FILTRO INICIAL
  const filter = { 
    $or: [{ name: { $regex: searchedValue, $options: 'i' } }, 
    { companyName: { $regex: searchedValue, $options: 'i' } }] 
  };

  if (categoryFiltered !== undefined) {
    filter.category = categoryFiltered;
  }

  if (priceFiltered !== undefined) {
    filter.price = { $lte: priceFiltered };
  }

  const product_list = await product.find();

  // EJECUTO LA CONSULTA
  productGot = await product.find(filter);
  
  // now we only want those product with available stock
  productGot = productGot.filter(product => product.available === 'yes');

  //OBTENER TODA LA INFORMACION DEL VENDEDOR
  const sellerInformation = await user.find();

  //OBTENER TODAS LAS CATEGORIAS
  const categoiresGot = await category.find();

  //TRAER LAS IMAGENES
  const imagesCollectionGot = await imagesCollection.find();

  //obtener la cantidad en el carrito de compras
  let totalQuantity = 0;

  if ( req.session.user ) {
      totalQuantity = await get_cart_quantity(req.session.user._id);
  }

  //get all products views
  const product_views = await viewCount.find();

  //getting all brands
  const getAllBrands = await brand.find();

  res.render('search/search', {
    title: 'search', 
    layout: 'layouts/main',
    productList: productGot,
    sellerInformation,
    imagesCollectionGot,
    categoiresGot,
    cart_items: totalQuantity,
    views: product_views,
    products: product_list,
    price_filter: priceFiltered,
    category_filter: categoryFiltered,
    brands: getAllBrands,
  });

};

module.exports = renderSearch;