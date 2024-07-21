module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      user_id: {
        type: Sequelize.Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.Sequelize.DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      email_address: {
        type: Sequelize.Sequelize.DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};