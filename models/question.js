const mongoose = require('mongoose');



const questionSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    options:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option'
    }]
},{ versionKey: false });

module.exports = mongoose.model('Question', questionSchema);
