const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const mongoose = require('mongoose');
// Load input validation
const utility = require("../../validation/register");


// Load User model
const User = require("../../models/User");
const Subdomain = require("../../models/SubDomains");
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/create", (req, res) => {
    // Form validation
  
     const { serrors, sisValid } = utility.validateSubdomain(req.body);

     if (!sisValid) {
         console.log('jj'+ serrors);
        return res.status(400).json(serrors);
      }
     const { errors, isValid } = utility.validateRegisterInput(req.body);

     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
    // Check validation
    // isValid = true;
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          return res.status(400).json({ email: "Email already exists" });
        } 
        else {
            Subdomain.findOne({ rwa: req.body.rwa }).then(sub => {
                if (sub) {
                    
                   return res.status(400).json({ Subdomain: "Subdomain already exists" });
                } else {
                  saveSubdomain(req,res);
                //   saveUser(req,res);
                  
                }
                
              });
        }
    });
    

    function saveSubdomain(req,res){
        const newSubDomain = new Subdomain({
            name: req.body.name,
            rwa: req.body.rwa,
          email: req.body.email,
          planType : req.body.planType
        
        });
        newSubDomain
        .save()
        .then(saveUser(req,res))
        .catch(err => console.log(err));
    }
    function saveUser(req,res){
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin : true,
            domain : req.body.rwa
          });
    
          // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
    }


  });
  
 
  
  module.exports = router;
  