'use strict';

module.exports = (sequelize, DataTypes) => {
	const accounts = sequelize.define(
		'accounts',
		{
			fullName: DataTypes.STRING,
			email: DataTypes.STRING,
			phone: DataTypes.STRING,
			password: DataTypes.STRING,
		},
		{
      modelName: 'accounts',
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
    }
  );

	accounts.associate = function (models) {
		accounts.hasMany(models.rides, { foreignKey: 'accountId' });
	};

	return accounts;
};
