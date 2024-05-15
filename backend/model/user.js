
const mongoose=require("mongoose")


const userSchema = new mongoose.Schema({
  // userId: {
  //   type: Number,
  //   unique: true,
  //   index: true,
  // },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roleType: {
    type: String,
    enum: ['buyer', 'seller'],
    default:'buyer'
  }
  });



  const User = mongoose.model('User', userSchema);

module.exports = User;

