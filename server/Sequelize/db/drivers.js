
const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define(
    "Driver",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        driver_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        driver_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        car_weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        weather_temp: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        weather_code: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: "drivers",
        timestamps: true,
        underscored: true,
    }
);

module.exports = User;
