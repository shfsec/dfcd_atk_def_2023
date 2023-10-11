import { DataTypes, Model } from 'sequelize'
import sequelize from './connect.js'

class Role extends Model { }

Role.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, { sequelize, initialAutoIncrement: 1 })

export default Role