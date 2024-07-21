module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('folders', {
      folder_id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      folder_name: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id',
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('folders');
  }
};