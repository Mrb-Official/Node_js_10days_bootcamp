const mongoose = require("mongoose")

const MenueSchema = new mongoose.Schema({
    name: {
      type: String,
      require: true
    },
    price: {
      type: Number,
      require: true
    },
    tast: {
      type: String,
      enum: ['spicy','sweet','hot'],
      require: true
    },
    is_drink: {
      type: Boolean,
      default: false
    },
    ingredience: {
      type: [String],
      default: []
    },
    num_salse: {
      type: Number,
      default: 0
    }
  });
const menue_Items = mongoose.model("menue_Items", MenueSchema);
module.exports = menue_Items;