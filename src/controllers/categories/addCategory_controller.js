const { category } = require('../../models/modelsInitialization');
const session = require('express-session');

const addCategory = async (req, res) => {
  const name = req.body.category_name_data;
  const userId = req.session.user._id;

  const categoryFound = await category.find({ name });

  if ( categoryFound.length !== 0 ) {
    return res.redirect('/category');
  }

  const newCategory = new category({
    name,
    createdBy: userId,
  });

  newCategory.save()
    .then(() => {
      console.log('Category added');
      return res.redirect('/category?categoryAdded=true');
    })
    .catch((error) => console.log(error));
};

module.exports = addCategory;