const Question = require('../models/question');
const Option = require('../models/option');

//delete an option
module.exports.delete = async function (req, res) {
    try {
        const id = req.params.id;
        //find the option
        const option = await Option.findById(id);
        //delete if no votes
        if (option.votes == 0) {
            //remove it from question and delete
            const questionId = option.question;
            option.remove();
            const question = await Question.findByIdAndUpdate(questionId,{$pull:{options:id}});
            return res.status(200).json('Option deleted');
        }
        else{
            return res.status(405).json('Operation not allowed as option have non zero vote count!');
        }
    }

    catch (e) {
        console.log('Error: ',e);
    }
}

//add vote
module.exports.addVote = async function (req, res) {
    try {
        //get the option
        const id = req.params.id;
        const option = await Option.findById(id);
        //increment vote count
        option.votes = option.votes + 1;
        option.save();
        return res.status(200).json('vote registered!');
    }
    catch (e) {
        console.log('Error: ', e);
    }
}