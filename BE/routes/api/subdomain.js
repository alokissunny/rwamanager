const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
// const validateRegisterInput = require("../../validation/register");
// const validateLoginInput = require("../../validation/login");

// Load User model
const Subdomain = require("../../models/SubDomains");
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/create", (req, res) => {
    // Form validation
  
    // const { errors, isValid } = validateSubdomain(req.body);
  
    // Check validation
    isValid = true;
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    Subdomain.findOne({ name: req.body.name }).then(sub => {
      if (sub) {
        return res.status(400).json({ Subdomain: "Subdomain already exists" });
      } else {
        const newSubDomain = new Subdomain({
            name: req.body.name,
            ownerName: req.body.ownerName,
          ownerEmail: req.body.ownerEmail,
        
        });
        newSubDomain
        .save()
        .then(sub => res.json(sub))
        .catch(err => console.log(err));
        // Hash password before saving in database
        // bcrypt.genSalt(10, (err, salt) => {
        //   bcrypt.hash(newUser.password, salt, (err, hash) => {
        //     if (err) throw err;
        //     newUser.password = hash;
        //     newUser
        //       .save()
        //       .then(user => res.json(user))
        //       .catch(err => console.log(err));
        //   });
        // });
      }
    });
  });
  
  // @route POST api/users/login
  // @desc Login user and return JWT token
  // @access Public
//   router.post("/login", (req, res) => {
//     // Form validation
  
//     const { errors, isValid } = validateLoginInput(req.body);
  
//     // Check validation
//     if (!isValid) {
//       return res.status(400).json(errors);
//     }
  
//     const email = req.body.email;
//     const password = req.body.password;
  
//     // Find user by email
//     User.findOne({ email }).then(user => {
//       // Check if user exists
//       if (!user) {
//         return res.status(404).json({ emailnotfound: "Email not found" });
//       }
  
//       // Check password
//       bcrypt.compare(password, user.password).then(isMatch => {
//         if (isMatch) {
//           // User matched
//           // Create JWT Payload
//           const payload = {
//             id: user.id,
//             name: user.name
//           };
  
//           // Sign token
//           jwt.sign(
//             payload,
//             keys.secretOrKey,
//             {
//               expiresIn: 31556926 // 1 year in seconds
//             },
//             (err, token) => {
//               res.json({
//                 success: true,
//                 token: "Bearer " + token
//               });
//             }
//           );
//         } else {
//           return res
//             .status(400)
//             .json({ passwordincorrect: "Password incorrect" });
//         }
//       });
//     });
//   });
  
  module.exports = router;
  