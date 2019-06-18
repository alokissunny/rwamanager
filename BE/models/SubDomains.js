const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SubDomainSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ownerName: {
    type: String,
    required: true
  },
  ownerEmail: {
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
