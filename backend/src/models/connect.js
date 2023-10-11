import { Sequelize } from 'sequelize'
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const sequelize = new Sequelize(
  // 'postgres://user:pass@example.com:5432/dbname'
  'mysql://web:local_password@db:3306/local_db'
  // 'sqlite::memory:'
  , {
    define: {
      underscored: true,
    },
    logging: false
  })

while (true) {
  try {
    await sequelize.authenticate()
    break
  } catch (e) {
    // console.error(e)
  }
  await delay(2000)
}
console.log('Database is ready..')

export default sequelize
