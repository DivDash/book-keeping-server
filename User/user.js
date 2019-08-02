const express = require("express");
const user = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const checkLoginDetails = require("../config/login");
const checkRegstrationDetails = require("../config/register");

const { User } = require("./schema");

//User Login
user.post("/login", checkLoginDetails, (req, res, next) => {
  const email = req.body.email.toLowerCase()
  const password = req.body.password;

  //Find user in database
  User.findOne({ email }).then(user => {
    
    //if user is not found
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    
  
  //if user found , check password is correct
  bcrypt.compare(password, user.password)
    .then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name
        };

        // Generate a sign in token using jwt
        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 31556926 
        }, (err, token )=>{
            res.status(200).json({
                success: true,
                token: "Bearer " + token,
                name: user.name,
                role: user.role,
                date: user.date
            })
        })
      } else{
          return res.status(400)
          .json({
              passwordincorrect: "Password Incorrect"
          })
      }
    });
  });
});

//Add new User
user.post("/sign-up", checkRegstrationDetails, (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const name = req.body.name;
  const role = req.body.role;
  User.findOne({ email }).then(user => {
    if (user) {
      res.status(400).json({ email: "Email already Exists" });
    } else {
      const newUser = new User({
        name, email, role,
        date: new Date(), // Date of user creation
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
          }
          newUser.password = hash;
          newUser
            .save()
            .then(status => {
              res.status(201).json({
                status,
                token: 'TODO: Usman, this should be generated like when signing in'
              });
            })
            .catch(rej => {
              res.status(400).json(rej);
            });
        });
      });
    }
  });
});

module.exports.user = user;
