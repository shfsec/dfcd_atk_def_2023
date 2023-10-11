import User from './user.model.js'
import Task from './task.model.js'
import Role from './role.model.js'
import Passwd from './passwd.model.js'

export default function (sequelize) {
  User.Tasks = User.hasMany(Task, {
    as: 'tasks',
    foreignKey: {
      name: 'UserId'
    }
  })

  User.Role = User.belongsTo(Role, {
    foreignKey: {
      name: 'RoleId'
    }
  })

  Task.Owner = Task.belongsTo(User, {
    as: 'owner',
    foreignKey: {
      name: 'UserId'
    }
  })

  User.Passwds = User.hasMany(Passwd, {
    as: 'passwds',
    foreignKey: {
      name: 'UserId'
    }
  })
}