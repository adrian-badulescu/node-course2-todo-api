let mongoose = require('mongoose');


let User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    }
});

// let newUser = new User({
//     email: 'adrianb2104@gmail.com '
// });

// newUser.save()
//     .then((doc) => {
//         console.log(`Document saved as => ${doc}`)
//     })
//     .catch((err) => {
//         console.log(`Error => ${err} <= occured when saving document`)
//     })


module.exports = { User };