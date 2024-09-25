module.exports = (sequelize, Sequelize) => {
  const Core = sequelize.define("core", {
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
    },    
    measurement: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Core;
};
