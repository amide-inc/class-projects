const router = require('express').Router();
const Todo = require('../models/todo');

router.post('/', (req, res) => {
    const todo = new Todo({
        name: req.body.name,
        about: req.body.about,
        date: req.body.date
    })

    todo.save()
        .then((result) => {
            res.json({ success: true, message: "Data has been created" })
        })
        .catch((err) => {
            res.json({ success: false, message: "error" })
        })

})


router.get('/', (req, res) => {
    Todo.find({})
        .exec()
        .then((result) => {
            res.json({ success: true, data: result });
        })
        .catch((err) => {
            res.json({ success: false, message: "Error" })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Todo.findOne({ _id: id })
        .exec()
        .then((result) => {
            res.json({ success: true, data: result });
        })
        .catch((err) => {
            res.json({ success: false, message: "Error" })
        })
})

router.patch('/:id', (req, res) => {
    const id = req.params.id;
    Todo.updateOne({ _id: id }, { $set: req.body })
        .exec()
        .then((_) => {
            res.json({ success: true, message: "todo has been updated" });
        })
        .catch((err) => {
            res.json({ success: false, message: "Error" })
        })
})
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Todo.deleteOne({ _id: id })
        .exec()
        .then((_) => {
            res.json({ success: true, message: "todo has been deleted" });
        })
        .catch((err) => {
            res.json({ success: false, message: "Error" })
        })
})

module.exports = router;