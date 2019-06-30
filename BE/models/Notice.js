const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NoticeSchema = new Schema({
    id : Number,
    issuerName : String,
    issuerId : String,
    domain : String,
    content : String,
    creationDate: {
    type: Date,
    default: Date.now
  },


});
module.exports = Notice = mongoose.model("Notice", NoticeSchema);