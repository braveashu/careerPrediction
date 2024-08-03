const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const arraySchema = new Schema({
  items: {
    type: [Number],
    required: true,
    validate: [arrayLimit, '{PATH} exceeds the limit of 6']
  }
});

function arrayLimit(val) {
  return val.length <= 6;
}

const ArrayModel = mongoose.model('Array', arraySchema);
