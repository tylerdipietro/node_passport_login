        const mongoose = require('mongoose');
        const Schema = mongoose.Schema;


        const schema = new Schema({
            text: {type: String, required: true},
            start_date: {type: Date, required: true},
            end_date:	{type: Date, required: true},
            user: {type: Schema.Types.ObjectId, ref: 'User', required: true}

        });

        const calendar = mongoose.model('calendar', schema);

        module.exports = calendar;