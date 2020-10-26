const bcrypt = require('bcrypt');

const saltRounds = 10;

signUpUser = (req, res, next) => {
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      req.models.Users.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      }).then((user) => {
        return res.status(201).send({
			"credentials": user,
			"authorized": true,
			"authenticated": false,
			"message": `${user.name} successfully signed up:)`
		});
      }).catch((error) => {
        next(error);
		return res.send({
			"error": error
		});
      })
    });
});
}

signInUser = (req, res, next) => {
  req.models.Users.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result == true) {
          res.send({
			  "authorized": true,
			  "authenticated": true,
			  "message": `${user.email} successfully logged in:)`
			});
        } else {
          res.send({
			  "authorized": true,
			  "authenticated": false,
			  "message": `You entered wrong password?`
			});
        }
      });
    } else {
      return res.send({
		  "authorized": false,
		  "authenticated": false,
		  "message": `${req.body.email} not exists!`
		});
    }
  }).catch((error) => {
        next(error);
		return res.send({
			"error": error
		});
	})
}

signOutUser = (req, res, next) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        return next(error);
      } else {
        return res.send({
			"authorized": true,
			"authenticated": false,
			"message": `Logout successful:)`
		});
      }
    });
  }
}

module.exports = {
  signUpUser,
  signInUser,
  signOutUser
};
