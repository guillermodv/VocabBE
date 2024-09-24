module.exports = (sequelize, Sequelize) => {
  const Core = sequelize.define("core", {
    userId: {
      type: Sequelize.STRING,
    },    
    measurement: {
      type: Sequelize.STRING,
    },
  });

  return Core;
};
