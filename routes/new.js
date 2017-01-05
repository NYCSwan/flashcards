/* GET New Flashcard page. */
	router.get('/new', function(req, res) {
	    res.render('flashcards/new', { title: 'Add New Flashcard' });
	});

	// route middleware to validate :id
	router.param('id', function(req, res, next, id) {
	    mongoose.model('Flashcard').findById(id, function (err, flashcard) {
	        if (err) {
	            console.log(id + ' was not found');
	            res.status(404)
	            var err = new Error('Not Found');
	            err.status = 404;
	            res.format({
	                html: function(){
	                    next(err);
	                 },
	                json: function(){
	                       res.json({message : err.status  + ' ' + err});
	                 }
	            });
	        } else {
	           console.log(flashcard);
	            req.id = id;
	            next(); 
	        } 
	    });
	});
	module.exports = router;