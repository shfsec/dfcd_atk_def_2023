import { DataTypes, Model } from 'sequelize'
import sequelize from './connect.js'

class Task extends Model { }

Task.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  desc: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  result: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
}, { sequelize, initialAutoIncrement: 1 })

export default Task