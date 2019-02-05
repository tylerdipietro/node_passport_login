
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      },
      calendar: {
        type: Schema.Types.ObjectId, ref: 'calendar'
      }
    });

    const User = mongoose.model('player', UserSchema);

    module.exports = User;