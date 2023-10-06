const Supply = require('../supplies/supplies.model')
const Session = require('../sessions/sessions.model')

const syncAssociations = () => {
   Supply.belongsToMany(Session, { through: 'SessionSupply' })
   Session.belongsToMany(Supply, { through: 'SessionSupply' })
}

module.exports = syncAssociations