const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../../models/User');
const Auth = require('../../utils').Auth;

router.use((req,res,next) => {
  next();
})

router.get('*', (req, res, next) => {
  res.contentType('application/json');
  res.send(JSON.stringify({ message: "invalid API Route" }));
})

router.post('', (req, res, next) => {
  res.contentType("application/json");
  let authInfo = null;
  User.findOne({ username: new RegExp(`^${req.body.username}$`, 'i') }, (err, account) => {
    if (err) throw err;

    if (account == undefined || account == null) {
      res.send(JSON.stringify({ message: "Invalid Credentials" }));
    } else if (account.password === req.body.password) {
      authInfo = {
        _id: account._id,
        username: account.username,
        role: account.user_role
      };

      let payload = { "_id": account._id, "role": account.user_role }
      let authType = account.user_role === "admin" ? 1 : 0;
      authInfo.authToken = Auth.generateToken(payload, authType);
      res.send(JSON.stringify(authInfo));
      console.log(`[EVENT] ${authInfo.username} has logged in.`);
    }
  });
});

module.exports = router;