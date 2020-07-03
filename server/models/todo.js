let mongoose = require('mongoose');



let Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true

    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});



// let newTodo = new Todo({
//     text: 'Coosck dasd'
// })


// let myOwnTodo = new Todo({
//     text: 'To clean the room',
//     completed: false,
//     completedAt: 1312313425245
// })

// myOwnTodo.save()
//     .then((doc) => {
//         console.log(`Document saved as => ${doc}`)
//     })
//     .catch((err) => {
//         console.log(`Error => ${err} <= occured when saving document`)
//     });


module.exports = { Todo };