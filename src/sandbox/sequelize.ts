import { Sequelize } from 'sequelize'

const db = new Sequelize({
  dialect: 'postgres',
  host: '127.0.0.1',
  port: 5101,
  username: 'dbcore',
  password: 'dbcore',
  database: 'nest',
})

db.query('select id, "firstName" from users u limit 5').then(([rows, result]) => {
  console.log('rows', rows)

  console.log('result', result)
})
