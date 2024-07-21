module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('emails', {
      email_id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      subject: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      body: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      sender_user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id',
        }
      },
      recipient_user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id',
        }
      },
      sent_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      read: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      folder_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'folders',
          key: 'folder_id',
        }
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('emails');
  }
};