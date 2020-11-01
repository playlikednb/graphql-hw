import users from './../mocks/user'
import { databaseProviders } from '../database/database.providers'

async function mockUsers() {
  const db = await databaseProviders[0].useFactory()
  db.query('TRUNCATE users CASCADE')
  db.model('User').bulkCreate(users)
}

mockUsers()
