module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('attachments', {
      attachment_id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'emails',
          key: 'email_id',
        }
      },
      file_name: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      file_size: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      file_type: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      s3_url: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('attachments');
  }
};