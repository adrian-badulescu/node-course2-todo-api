const expect = require('expect');
const request = require('supertest');
const _ = require('lodash');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { ObjectID } = require('mongodb');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
    Todo.remove({})
        .then(() => {
            return Todo.insertMany(todos);
        })
        .then(() => {
            done();
        })
});


describe('POST /todos', () => {
    it('Should create a new todo', (done) => {
        let text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                };

                Todo.find({ text })
                    .then((todos) => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    })
                    .catch((e) => {
                        done(e);
                    });

            });
    });

    it('should not create todo with invalid data', (done) => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return (done(err));
                };
                Todo.find()
                    .then((todos) => {
                        expect(todos.length).toBe(2);
                        done();
                    })
                    .catch((e) => {
                        done(e);
                    });
            });


    });

    describe('GET /todos', () => {
        it('it should get all todos', (done) => {
            request(app)
                .get('/todos')
                .expect(200)
                .expect((res) => {
                    expect(res.body.todos.length).toBe(2)
                })
                .end(done);
        });
    });


});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done);

    });

    it('should return 404 if todo not found', (done) => {
        let hexId = new ObjectID().toHexString()

        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done)
    });

    it('should return 400 for non-objects ids', (done) => {
        request(app)
            .get(`/todos/123`)
            .expect(400)
            .end(done)
    });
});


describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        let hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                // query DB using findById to see that ID exists

                Todo.findById(hexId)
                    .then((todo) => {
                        expect(todo).toBeFalsy();
                        done();
                    })
                    .catch((e) => {
                        done(e);
                    })
            });
    })

    it('should return a 400 if a query is malformed', (done) => {
        request(app)
            .get(`/todos/123`)
            .expect(400)
            .end(done)
    })

    it('should return a 404 if the document don\'t exist', (done) => {
        let hexId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done)
    })
})

describe('PATCH /todos/:id', () => {
    it('should return a 200 and update a todo item', (done) => {
        let hexId = todos[1]._id.toHexString();
        let text = 'The new text';

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: true,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBeTruthy();
                expect(typeof (res.body.todo.completedAt)).toBe('number');
            })
            .end(done)





    })

    it('should clear completedAt when todo is not completed', (done) => {
        let hexId = todos[1]._id.toHexString();
        let text = 'The new text';

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: false,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBeFalsy();
                expect(res.body.todo.completedAt).toBeNull();
            })
            .end(done)
    })

    // it('should return 404 if an id is not found', (done) => {

    // })
}) 