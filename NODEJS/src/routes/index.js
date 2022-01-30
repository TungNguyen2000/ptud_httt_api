const siteRouter = require('./sites');
const siteBuyer = require('./buyer')
const siteShiper =require('./shipper')

function route(app) {
    app.use('/', siteBuyer);
    app.use('/', siteRouter);
    app.use('/', siteShiper);
}

module.exports = route;