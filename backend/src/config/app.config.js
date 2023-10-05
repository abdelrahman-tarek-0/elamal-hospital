const _path = require('path')

module.exports = {
   port: 8989,
   isDev: true,
   DB: _path.join(process.cwd(), 'database', 'database.db'),
}
