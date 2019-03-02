const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');

var apiRoutes = {
    //Ex.: routeName: require('routes/path/to/route/file'),
};
// require the main route for the app
// the main route will be used to render the index.html to all routes besides apiRoutes
var appRoute = require('./routes/main');

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, '../client/public'));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

// MongoDb Connection
//mongoose.connect(process.env.DB_KEY,  { useNewUrlParser: true });

// Apply Express routes below
// Ex.: app.use('/routeCategory/routeName', routeRequireVar);
// Note: when applying API routes, make sure it is done
//       before applying the appRoute itself
app.use('/', appRoute);

module.exports = app;
