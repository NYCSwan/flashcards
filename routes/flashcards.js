var express= require('express'),
		router = express.Router(),
		mongoose = require('mongoose'),
		bodyParser = require('body-parser'),
		methodOverride = require('method-override')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

router.route('/')
	.get(function(req, res, next) {
			mongoose.model('Flashcard').find({}, function(err, flashcards) {
				if (err) {
					return console.error(err);
				} else {
					res.format({
						html: function(){
							res.render('flashcards/index', {
								title: "Interview Flashcards",
								"flashcards": flashcards
							});
						},
						json: function() {
							res.json(infophotos);
						}
					});
				}
			});
	}).post(function(req, res){
		  var question = req.body.question;
  		var type= req.body.type;
  		var hint= req.body.hint;
  		var answer= req.body.answer;
  		var created_at = req.body.created_at;
  		var correct= req.body.correct;

  		mongoose.model('Flashcard').create({ 
  			 question : question
  			 type : type,
  			 hint : hint,
  			 answer : answer, 
  			 created_at : created_at,
  			 correct : correct})
	}), function(err, flashcard){
		 if (err) {
      	res.send("There was a problem adding the information to the database.");
     } else {
      	console.log('POST creating new flashcard: ' + flashcard);
        res.format({
        	html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("flashcards");
                        // And forward to success page
                        res.redirect("/flashcards");
                    },
                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(flashcard);
                    }
                });
              }
        }
    };
	