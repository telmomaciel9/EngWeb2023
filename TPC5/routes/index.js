var express = require('express');
var router = express.Router();
var Task = require('../controllers/task')

/* GET home page. */
router.get('/', function(req, res, next) {
			Task.list()
				.then(tasks => {
					res.render("index", {tasks:tasks, t:null})
				})
				.catch(error => {
					res.render("error", {error:error, message:"Error obtaining task list"})
				})
});

router.get('/markdone/:taskID', function(req, res, next) {
	Task.getTask(req.params.taskID)
		.then(task => {
			task.state = "done"
			Task.editTask(task)
				.then(answer => {
					res.redirect("/")
				})
				.catch(error => {
					res.render("error", {error:error, message:"Error deleting task from database"})
				})
		})
		.catch(error => {
			res.render("error", {error:error, message:"Error deleting task from database"})
		})
});

router.get('/edit/:taskID', function(req, res, next) {
			Task.list()
				.then(tasks => {
					var t = tasks.find(t => t.id == req.params.taskID)
					res.render("index", {tasks:tasks, t:t})
				})
				.catch(error => {
					res.render("error", {error:error, message:"Error obtaining task list"})
				})
});


router.post('/', function(req, res, next) {
		req.body.state = "due"
		Task.addTask(req.body)
			.then(task => {
				res.redirect("/")
			})
			.catch(error => {
				res.render("error", {error:error, message:"Error adding task to database"})
			})
})

router.post('/edit/:taskID', function(req, res, next) {
	req.body.state = "due"
	Task.editTask(req.body)
		.then(task => {
			res.redirect("/")
		})
		.catch(error => {
			res.render("error", {error:error, message:"Error editing task"})
		})
})

module.exports = router;