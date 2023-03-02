import mongoose from 'mongoose'

const {
  MONGODB_ROOT_USERNAME,
  MONGODB_ROOT_PASSWORD,
  MONGODB_HOST,
  MONGODB_PORT
} = process.env

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  
 * To implement this, place the following string into the `.env` file
 * 
 * MONGO_URI=mongodb://<user>:<password>@localhost:27017/database_name?retryWrites=true&w=majority
 */
function mountMongoURI (username, password, hostname, port = 27017) {
  let authPart = ''
  if (username && password) {
    authPart = `${username}:${password}@`
  }

  return `mongodb://${authPart}${hostname}:${port}/`
}

const MONGO_URI = mountMongoURI(
  MONGODB_ROOT_USERNAME,
  MONGODB_ROOT_PASSWORD,
  MONGODB_HOST,
  MONGODB_PORT,
)

const connection = mongoose.createConnection(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

const UserSchema = new mongoose.Schema({
  username: String,
  admin: Boolean,
  hash: String,
  salt: String,
})

/* TODO organize /models */
const User = connection.model('User', UserSchema)

export default connection
