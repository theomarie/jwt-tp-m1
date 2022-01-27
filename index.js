const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const cors = require('cors');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const _ = require('lodash');
require('dotenv').config();


/**
 * 
 * @param {*} string 
 * @returns 
 
function verifyToken(string) {
    try {
        const legit = jwt.verify(string, SECRET_KEY);
        console.log("Is good token ?", legit);
        return legit;
    } catch (error) {
        return null
    }
}

function signToken(payload) {
    return jwt.sign(payload, SECRET_KEY);

}

function decodeToken(token) {
    if (token != null) {
        let [header, payload, signature] = token.split('.');
        let payloadBuffer = Buffer.from(payload, 'base64');
        return payloadBuffer.toString();
    }

}

*/

var morgan = require('morgan')
var logger = morgan('combined');

const db = require('./mongo');

/*
function isAuthenticated(req, res, next){
    
    var authheader = req.headers.authorization;
    console.log(req.headers);
    
    if (!authheader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err)
    }
    
    var auth = new Buffer.from(authheader.split(' ')[1],
    'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    
    if (user == 'admin' && pass == 'password') {
        
        // If Authorized user
        next();
    } else {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }
    
    return true;
}
*/
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cookieParser());


    // jwt
   // app.get('*', checkUser);
    app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
    });

db.init().then(() => {
    
    const SECRET_KEY = process.env.SECRET_KEY;
    app.use(express.json());
    app.use(function (req, res, next) {
        logger(req, res, function (err) {
            if (err) return done(err)
        })
        next();
    });
    
    app.use('/api/user', userRoutes);

    
    
    
    
    const PORT = process.env.NODE_DOCKER_PORT;
    
    app.listen(PORT, () => {
        console.log(`Listening at http://localhost:${PORT}`)
    })
}).catch((err) => {
    console.error(err);
});

/*Promise.resolve((async () => {
    const response = await prompts({
      type: 'text',
      name: 'value',
      message: 'What your username?',
    });
    return response.value;
  })()

).then((sub) => {
    const token = signToken({sub});
    console.log({
        verified: verifyToken(token),
        decoded: decodeToken(token),
        toJson: JSON.parse(decodeToken(token)),
    });

});*/





