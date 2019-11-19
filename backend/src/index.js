const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// this is where you get access to other stuff in MIDDLEWARE

server.express.use(cookieParser());

server.express.use((req, res, next ) => {
  const { token } =req.cookies;
  if( token ) {
    const { userId } = jwt.verify( token, process.env.APP_SECRET );
    req.userId = userId;
  }
  next();
});

//without this other content will not show up on the screen, additional navigation
server.express.use(async (req, res, next) => {
  if (!req.userId) return next();
  const user = await db.query.user(
    { where: { id: req.userId } },
    '{ id, permissions, email, name }'
  );
  req.user = user;
  next();
});

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
