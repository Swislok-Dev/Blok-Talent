const mongoose = require('mongoose')

const connectAtlasDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error, 'Error occured in the backend/confing/atlasDB.js')
    process.exit(1)
  }
}

module.exports = connectAtlasDB
