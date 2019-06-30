const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SubDomainSchema = new Schema({
  rwa: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },

  creationDate: {
    type: Date,
    default: Date.now
  },
  planType : {
      type : String,
      required : false
  }
});

module.exports = SubDomain = mongoose.model("SubDomain", SubDomainSchema);
