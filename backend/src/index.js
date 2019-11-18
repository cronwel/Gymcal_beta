const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

<<<<<<< HEAD
server.express.use(cookieParser());

server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if ( token ) {
    const { userId } = jwt.verify( token , process.send.APP_SECRET );
    req.userId = userId;
  }
  next();
});

=======
// this is where you get access to other stuff in MIDDLEWARE

server.express.use(cookieParser());

>>>>>>> 19225f52a26f3518ef74f63235944b43b27154e4
server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  deets => {
    console.log(`Server is now running on port http:/localhost:${ deets.port }`);
  }
);
