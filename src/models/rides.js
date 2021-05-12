'use strict';

module.exports = (sequelize, DataTypes) => {
	const rides = sequelize.define(
		'rides',
		{
			accountId: DataTypes.INTEGER,
			paymentMethod: {
				type: DataTypes.ENUM,
				values: ['CASH', 'CARD'],
				defaultValue: 'CASH',
				allowNull: false,
			},
			promoCode: DataTypes.STRING,
		},
		{
      modelName: 'rides',
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
    }
	);

	rides.associate = function (models) {
		rides.belongsTo(models.accounts, { foreignKey: 'accountId' });
	};

	return rides;
};
