import { DataTypes, Model } from 'sequelize'
import sequelize from './connect.js'
import password from '../password.js'
import md5 from '../md5.js'

class User extends Model { }

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  uuid: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

}, { sequelize, initialAutoIncrement: 1 })

User.beforeCreate(async i => {
  i.password = await password.hash(i.password)
  i.uuid = md5(String(Date.now()) + String(Math.random()))
})
export default User