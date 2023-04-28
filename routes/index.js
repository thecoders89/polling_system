const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
    return res.status(200).json({
        "/questions":"To view all question",
        "/questions/create":" To create a question - use POST method and key 'title'" ,
        "/questions/:id/options/create":"To create option for a particular question - use POST method and key 'title'",
        "/options/:id/delete":"To delete a option using DELETE http method",
        "/options/:id/add_vote":"To add vote for an option - Use PATCH method",
        "/questions/:id":"To view a particular question"
    });
});
router.use('/questions',require('./question'));
router.use('/options',require('./option'));

module.exports = router;