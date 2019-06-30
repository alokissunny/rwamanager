const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const mongoose = require('mongoose');

const notice = require('../../validation/notice');
const Notice = require('../../models/Notice');
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/create", (req, res) => {

    let isValid = notice.validNotice(req.body)
    if(isValid)
    {
       let newNotice = new Notice({
           issuerName : req.body.issuerName,
           issuerId : req.body.issuerId,
           domain : req.body.domain,
           content : req.body.content
       }) ;
       newNotice
       .save()
       .then(res.status(200).json(newNotice))
       .catch( res.status(500).json({ Notice: 'Failure' }))
    }
    else {
        res.status(400).json({ Notice: 'Failure' });
    }

}
)
module.exports = router;