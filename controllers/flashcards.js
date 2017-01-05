var express = require("express");
var Flashcards = require("../models/flashcards");
var router = express.Router();

router.route("/")
	.get(function(req, res) {
		Flashcards.find(function(err, flashcards) {
			if (err) return res.status(500).send("error: " + err);
			res.send(flashcards);
		});
	})
	.post(function(req, res) {
		Flashcards.create(req.body, function(err, flashcard) {
			if (err) return res.status(500).send(err);
			res.send(flashcard);
		});
	});

router.route("/:id")
	.get(function(req, res) {
		Flashcards.findById(req.params.id, function(err, flashcard) {
			if (err) return res.status(500).send(err);
			res.send(flashcard);
		});
	})
	.put(function(req, res) {
		console.log(req.body);
		Flashcards.findByIdAndUpdate(req.params.id, req.body, function(err, flashcard) {
			if (err) return res.status(500).send(err);
			res.send({'message': 'success'});
		});
	})
	.delete(function(req, res) {
		Flashcards.findByIdAndRemove(req.params.id, function(err, flashcard) {
			if (err) return res.status(500).send(err);
			res.send({'message': 'success'});
		});
	});

	module.exports = router;