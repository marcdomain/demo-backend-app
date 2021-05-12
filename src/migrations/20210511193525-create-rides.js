'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        'rides',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          accountId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'accounts',
              key: 'id',
            },
          },
          paymentMethod: {
            type: Sequelize.ENUM('CASH', 'CARD'),
            allowNull: false,
            defaultValue: 'CASH',
          },
          promoCode: {
            type: Sequelize.STRING,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          deletedAt: {
            type: Sequelize.DATE,
          },
        },
        { transaction },
      );
      await queryInterface.addIndex('rides', ['accountId'], { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('rides');
  }
};
