const db = require('./db_connect')

module.exports.getAllTodos = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  console.log('getAllTodos')

  db.getAll('"Estudiante"')
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res)
      })
    })
    .catch(e => {
      console.log(e)
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Error: Could not find Estudiante: ' + e
      })
    })
}

module.exports.getTodo = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
 /* db.query('select * from public."Estudiante" ' +
    'where codigo  = $1', event.pathParameters.id) */
    db.getById('"Estudiante"', event.pathParameters.id)
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res)
      })
    })
    .catch(e => {
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Could not find Estudiante: ' + e
      })
    })
}
module.exports.createTodo = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);
  db.insert('"Estudiante"', data)
    .then(res => {
      callback(null,{
        statusCode: 200,
        body: "Todo Created!" + res
      })
    })
    .catch(e => {
      callback(null,{
        statusCode: e.statusCode || 500,
        body: "Could not create Todo " + e
      })
    })
};

module.exports.updateTodo = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);
  db.updateById('"Estudiante"', event.pathParameters.id, data)
    .then(res => {
      callback(null,{
        statusCode: 200,
        body: "Todo Updated!" + res
      })
    })
    .catch(e => {
      callback(null,{
        statusCode: e.statusCode || 500,
        body: "Could not update Todo" + e
      })
    })
};
module.exports.deleteTodo = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  db.deleteById('"Estudiante"', event.pathParameters.id)
    .then(res => {
      callback(null,{
        statusCode: 200,
        body: "Todo Deleted!"
      })
    })
    .catch(e => {
      callback(null,{
        statusCode: e.statusCode || 500,
        body: "Could not delete Todo" + e
      })
    })
};
