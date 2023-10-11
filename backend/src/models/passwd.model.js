import { DataTypes, Model } from 'sequelize'
import sequelize from './connect.js'

class Passwd extends Model { }

Passwd.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  url: {
    type: DataTypes.STRING(1024),
    allowNull: false,
    unique: false,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: false,
  },
  password: {
    type: DataTypes.STRING(1024),
    allowNull: false,
  },

}, { sequelize, initialAutoIncrement: 1 })

export default Passwd