const mongoose = require('mongoose')

const connectLocalDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.LOCAL_MONGO_URI)

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error, 'Error occurred in the backend/config/localMongoDB.js')
    process.exit(1)
  }
}

module.exports = connectLocalDB
