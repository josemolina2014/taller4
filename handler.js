const db = require('./db_connect')

module.exports.getAllEstudiantes = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  console.log('getAllEstudiantes')

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

module.exports.getEstudiante = (event, context, callback) => {
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
module.exports.createEstudiante = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);
  db.insert('"Estudiante"', data)
    .then(res => {
      callback(null,{
        statusCode: 200,
        body: "Estudiante Created!" + res
      })
    })
    .catch(e => {
      callback(null,{
        statusCode: e.statusCode || 500,
        body: "Could not create Estudiante " + e
      })
    })
};

module.exports.updateEstudiante = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);
  db.updateById('"Estudiante"', event.pathParameters.id, data)
    .then(res => {
      callback(null,{
        statusCode: 200,
        body: "Estudiante Updated!" + res
      })
    })
    .catch(e => {
      callback(null,{
        statusCode: e.statusCode || 500,
        body: "Could not update Estudiante" + e
      })
    })
};
module.exports.deleteEstudiante = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  db.deleteById('"Estudiante"', event.pathParameters.id)
    .then(res => {
      callback(null,{
        statusCode: 200,
        body: "Estudiante Deleted!"
      })
    })
    .catch(e => {
      callback(null,{
        statusCode: e.statusCode || 500,
        body: "Could not delete Estudiante" + e
      })
    })
};
