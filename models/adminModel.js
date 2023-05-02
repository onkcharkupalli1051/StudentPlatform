const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name Is Required']
    },
    email:{
        type: String,
        required: [true, 'Email Is Required']
    },
    adminid:{
        type: String,
        required: [true, 'Admin ID Is Required']
    },
    password:{
        type: String,
        required: [true, 'Password Is Required']
    },
    isAdmin:{
        type: Boolean,
        default: true,
    },
    isUser:{
        type: Boolean,
        default: false,
    },
    notification:{
      type: Array,
      default: [],
    },
    seennotification:{
      type: Array,
      default: [],
    },
})

const adminModel = mongoose.model('admins', adminSchema)

module.exports = adminModel;