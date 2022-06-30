const mongoose = require('mongoose')

const connectLocalDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.LOCAL_MONGO_URI)
    const db = conn.connection

    console.log(`MongoDB connected on ${db.host}:${db.port}/${db.name}`.cyan.underline)
  } catch (error) {
    console.log(error, 'Error occurred in the backend/config/localMongoDB.js')
    process.exit(1)
  }
}

module.exports = connectLocalDB
