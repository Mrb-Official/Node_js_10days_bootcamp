const mongoose = require('mongoose')
const auth = require("../auth");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: false
  },
  work: {
    type: String,
    enum: ["schef", "waiter", "manager"],
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

personSchema.pre("save", async function(next){
  const person = this;

  if(!person.isModified("password"))  return next();
  try{
    const salt = await bcrypt.genSalt(10);
    const Hash_Password = await bcrypt.hash(person.password, salt);

    person.password = Hash_Password;
    next();

  }catch(err){
    return next(err);
  }
});

personSchema.methods.comparePassword = async function(password){
  try{
  const compared_password = await bcrypt.compare(password, this.password);
  return compared_password;
  }catch(err){
    throw (err);
  }
}

const person = mongoose.model('person', personSchema);
module.exports = person;