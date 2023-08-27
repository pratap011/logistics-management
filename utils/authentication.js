const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET_KEY;


module.exports = {

  //The functino for generating the jwt and signing it.
  generateToken: (user) => {
    return jwt.sign(user, SECRET, { expiresIn: '10000000000' });
  },

  // The optional authentication is set because initally when a user is registering authentication need not happen
  optionalAuthenticate: (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      try {
        const decodedToken = jwt.verify(token, SECRET);
        req.user = decodedToken;
      } catch (error) {
      }
    }

    next();
  },

  authenticate: (req, res, next) => {

    //The authentication using jwt.verify and storing the user id in the request body before passing it to the controller.
    
    const token = req.headers.authorization;
    if(token=="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGViNWUzOWM0YzVkMGEwNTVkOTRiOGYiLCJpYXQiOjE2OTMxNDY2ODEsImV4cCI6MTcwMzE0NjY4MX0.QzUBztdIZ_5mgSmCyOJhCDyD3FsQh1q4dKPBYUZqM_E"){
      console.log("Yes");
    }
    else{
      console.log("No")
    }


    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
      const token1 = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token1, SECRET);
      req.user = decodedToken;
      console.log(req.user);
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  }
};

