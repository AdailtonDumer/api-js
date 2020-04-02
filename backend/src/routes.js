const express = require('express')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router( )

//efetuar login na aplicação
routes.post('/sessions', SessionController.create)

//rota para listagem de ongs
routes.get('/ongs', OngController.index)
//rota para cadastro de ongs
routes.post('/ongs', OngController.create)

//listar apenas os casos de uma ong
routes.get('/profilelist', ProfileController.index)

//rota para listagem de casos
routes.get('/incidents',IncidentController.index)
//rota para cadastro dos casos
routes.post('/incidents',IncidentController.create)
//apagar o incidente
routes.delete('/incidents/:id', IncidentController.delete)


 module.exports = routes