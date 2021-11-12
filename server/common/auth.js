var jwt = require("jsonwebtoken");

exports.checkLogin = function (req, res, next) {
  let auth = req.headers.authorization
  let token = ''
  try {
    token = auth.split(' ')[1]
  }catch(e){
    res.json({msg: 'err token', detail: e})
  }
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
      if (err) {
        res.json({ msg: "err sai token" });
      } else {
        next();
      }
    });
  } else {
    res.json({ msg: "err không có token" });
  }
};
