const { user, product, monitors } = require('../../../models/modelsInitialization');

const userRecommendations = async (session) => {

  if ( session.user ) {

    const currentUser = session.user._id;

    const monitorsIds = await monitors.find();

    const monitorsUserIds = monitorsIds.map(item => item.userId);

    console.log(monitorsUserIds);

  }

};

module.exports = {
  userRecommendations,
};