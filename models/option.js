const mongoose = require('mongoose');


const optionSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    votes:{
        type: Number,
        default: 0
    },
    question:{
        type: mongoose.Schema.Types.ObjectId,
    },
    link_to_vote: String
},{ versionKey: false });


module.exports = mongoose.model('Option', optionSchema);
