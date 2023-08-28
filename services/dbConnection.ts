import mongoose from 'mongoose'

export const dbConnection = async () => {
  const { MONGODB_URI = '' } = process.env
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to db')
  } catch (error) {
    console.log('Error connecting to db', error)
  }
}
