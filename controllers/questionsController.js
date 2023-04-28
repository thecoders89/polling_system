const Question = require('../models/question');
const Option = require('../models/option');

//home controller
module.exports.home = function (req, res) {
    Question.find({}).populate('options').exec(function (err, questions) {
        return res.status(200).json(questions);
    });
}

//view a question by id
module.exports.view = async function (req, res) {

    const id = req.params.id;
    const question = await Question.findById(id).populate('options').exec(function (err, question) {
        if (err) {
            console.log('error: ', err);
        }
        return res.status(200).json(question);
    })
}

//create a question
module.exports.createQuestion = function (req, res) {
    Question.create({
        title: req.body.title,
        options: []
    }, function (err, question) {
        if (err) {
            console.log('error in creating question: ', err);
        }
        return res.status(200).json("question created");
    })
}


//add option
module.exports.createOption = async function (req, res) {

    try {

        const id = req.params.id;
        //find the question by id
        let question = await Question.findById(id);
        //if question is found 
        if (question) {
            const option = await Option.create({
                title: req.body.title,
                question: id,
                votes: 0,
                link_to_vote:""
            });
            option.link_to_vote = "http://localhost:8000/options/"+option._id+"/add_vote";
            await option.save();
            question.options.push(option);
            await question.save();
            return res.status(200).send('Option created');
        }
        //else
        else {
            return res.status(404).send('Question not found');
        }

    }
    catch (e) {
        console.log('Error: ', e);
    }

}


//delete a question
module.exports.delete = async function (req, res) {

    try{
        const id = req.params.id;
        const question = await Question.findById(id).populate('options');
        for(let option of question.options){
            if(option.votes>=1){
                return res.status(405).json('Deletion Not allowed as one of the options have non zero vote count!');
            }
        }
        await question.remove();
        return res.status(200).json('Question removed!');
    }
    catch(e){
        console.log('Error: ',e);
    } 
}