const { user, product, monitors } = require('../../../models/modelsInitialization');

const monitoringAdd = async (session, productId) => {
  
  const monitorsFound = await monitors.find();

  const userId = session.user._id;

  let exist = false;

  monitorsFound.forEach((item) => {
    if ( item.userId == userId && item.productId == productId ) {
      exist = true;
    }
  });

  if ( exist ) { 
    console.log('interaction already exist');
  } else { 

    console.log('interaction did not exist');

    const monitoring = new monitors({
      userId,
      productId,
    });
  
    monitoring.save()
      .then(() => console.log('monitoring added'))
      .catch(err => console.log(err));

  }

}

module.exports = {
  monitoringAdd,
}