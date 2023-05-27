const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const hbs = require('handlebars')
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config()
const db = require('./config/db')
const route = require('./routes')
const passport = require('passport');
const expressWs = require('express-ws');
expressWs(app);

// Middleware for parsing JSON data
app.use(bodyParser.json());

const clients = [];

// WebSocket route
app.ws('/ws', (ws, req) => {
    // Add the new client to the clients array
    clients.push(ws);

    // WebSocket connection established
    console.log('WebSocket connection established');

    // Handle WebSocket events
    ws.on('message', (data) => {
        // get json data from client side
        const { UserId, message, avatar } = JSON.parse(data);

        // Broadcast the message to all connected clients
        clients.forEach((client) => {
            client.send(JSON.stringify({ UserId, message, avatar }));
        });
    });

    // Close the WebSocket connection
    ws.on('close', () => {
        // Remove the client from the clients array
        const index = clients.indexOf(ws);
        if (index !== -1) {
            clients.splice(index, 1);
        }

        console.log('WebSocket connection closed');
    });
});

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

hbs.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

hbs.registerHelper('times', function (from, to, block) {
    var accum = '';
    for (var i = from; i <= to; i++) {
        block.data.index = i;
        accum += block.fn(i);
    }

    return accum;
});

hbs.registerHelper('join', function (items, block) {
    var delimiter = block.hash.delimiter || ",",
        start = start = block.hash.start || 0,
        len = items ? items.length : 0,
        end = block.hash.end || len,
        out = "";

    if (end > len) end = len;

    if ('function' === typeof block) {
        for (i = start; i < end; i++) {
            if (i > start)
                out += delimiter;
            if ('string' === typeof items[i])
                out += items[i];
            else
                out += block(items[i]);
        }
        return out;
    } else {
        return [].concat(items).slice(start, end).join(delimiter);
    }
});

//use session
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

//Auth Google
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

// HTTP logger
app.use(morgan('combined'))

// Templete engine
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Routes init
route(app)

//Connect to DB
try {
    db.connect();
    console.log('Connect database successfully!')
} catch (error) {
    console.log('Connect database fail!')
}

app.listen(process.env.PORT || 3000, function () {
    console.log("Access at http://localhost:%d in %s mode", this.address().port, app.settings.env);
});